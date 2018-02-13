'use strict';
module.exports = function(app) {
  var letterController = require('./controllers/letter.controller.js');

  // routes
  app.route('/test').get(letterController.test); //for testing if the api is running
  app.route('/retrieve/:id').get(letterController.retrieve);
  app.route('/send').post(letterController.send);
};