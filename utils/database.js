const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_js_project', 'root', 'codelogicx101', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
