'use strict';
module.exports = function(app) {
  var letterController = require('./controllers/letter.controller.js');
  var sesController = require('./controllers/ses.controller.js');

  // routes
  app.route('/create').post(letterController.create);
  app.route('/retrieve/:id').get(letterController.retrieve);
  app.route('/send').post(sesController.send);
};