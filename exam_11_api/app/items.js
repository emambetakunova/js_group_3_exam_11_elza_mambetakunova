const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const auth = require('../middleware/auth');

const Item = require('../models/Item');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', (req, res) => {
    if(req.query.category) {
        Item.find({category: req.query.category})
            .then(items => res.send(items))
            .catch(() => res.sendStatus(500));
    } else {
        Item.find().populate('category')
            .then(items => res.send(items))
            .catch(() => res.sendStatus(500));
    }
});

router.get('/:id', (req, res) => {
    Item.findById(req.params.id).populate('user').populate('category')
        .then(result => {
            if (result) return res.send(result);
            res.sendStatus(404);
        })
        .catch(() => res.sendStatus(500));
});

router.post('/', upload.single('image'), auth, (req, res) => {
    const itemData = req.body;
    if (req.file) {
        itemData.image = req.file.filename;
    }
    itemData.user = req.user._id;
    itemData.datetime = new Date().toISOString();

    const item = new Item(itemData);

    item.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});

router.delete('/:id', auth, async (req, res) => {

    const item = await Item.find(req.user._id);
    console.log(item);

    Item.deleteOne({_id: item._id})
        .then(() => res.send({message: "Success"}))
        .catch(() => res.sendStatus(500))
});

module.exports = router;