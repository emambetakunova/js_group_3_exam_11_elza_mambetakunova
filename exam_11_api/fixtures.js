const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Item = require('./models/Item');
const Category = require('./models/Category');

const run = async () => {
    await mongoose.connect(config.dbURL, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const user = await User.create(
        {
            username: 'John Doe',
            password: '123',
            token: 'token',
            displayName: 'John Doe',
            phoneNumber: '+996 555 555 555'
        },
        {
            username: 'Adele Adkins',
            password: '123',
            token: 'token1',
            displayName: 'Adele Adkins',
            phoneNumber: '+996 777 777 777'
        }
    );

    const categories = await Category.create(
        {title: 'Women', description: 'Clothes for Woman'},
        {title: 'Men', description: 'Clothes for Man'},
        {title: 'Kids', description: 'Clothes for Kids'}
    );

    await Item.create(
        {
            title: 'Skirt Zara',
            description: ' Short skirt in stretch cotton twill with contrasting seams. High waist, zip fly with button, and large patch pockets. Cotton content is partly organic.',
            image: 'skirt.jpeg',
            price: 1200,
            category: categories[0]._id,
            user: user[0]._id
        },
        {
            title: 'T-shirts Slim fit',
            description: 'Crew-neck T-shirts in jersey made from a cotton blend. Slim fit.',
            image: 'tshirt.jpeg',
            price: 800,
            category: categories[1]._id,
            user: user[1]._id
        },
        {
            title: 'Patterned Jersey Dress',
            description: 'Sleeveless dress in soft cotton jersey with a printed pattern. ',
            image: 'dress.jpeg',
            price: 1800,
            category: categories[0]._id,
            user: user[0]._id
        },
        {
            title: 'Jumpsuit',
            description: 'Jumpsuit in soft cotton jersey with a printed motif. Narrow ribbing at neckline, snap fasteners at shoulders, and snap fasteners at gusset. ',
            image: 'jumpsuit.jpeg',
            price: 300,
            category: categories[2]._id,
            user: user[1]._id
        }
    );

    await connection.close();

};

run().catch(error => {
    console.error('Something went wrong', error);
});