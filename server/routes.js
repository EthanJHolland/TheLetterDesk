'use strict';
module.exports = function(app) {
  var letterController = require('./controllers/letter.controller.js');

  // routes
  app.route('/test').get(letterController.test); //for testing if the api is running
  app.route('/retrieve/:id').get(letterController.retrieve); //for retrieving letters
  app.route('/send').post(letterController.send); //for sending letters

  app.route('/retrieve/:id').post(letterController.retrieveWithPassword); //retreve a password protected letter
};