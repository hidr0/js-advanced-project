const Sequelize = require('sequelize');

const sequelize = new Sequelize('multisnake','dummy','123456', {
    dialect: 'postgres',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});

sequelize.models = {
    User: require('../models/user')(sequelize, Sequelize),
    Room: require('../models/room')(sequelize, Sequelize)
};

sequelize.sync().then(()=>{
    console.log("DB sync complete.");
});

module.exports.models = sequelize.models;
