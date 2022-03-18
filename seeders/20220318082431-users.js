/* eslint-disable no-unused-vars */
'use strict';
const brypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: await brypt.hashSync('password', 10),
        profession: 'admin',
        role: 'admin',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: 'user',
        email: 'user@gmail.com',
        password: await brypt.hashSync('password', 10),
        profession: 'backend developer',
        role: 'user',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
