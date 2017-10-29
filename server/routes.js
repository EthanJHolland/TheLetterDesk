'use strict';
module.exports = function(app) {
  var letterController = require('./controllers/letter.controller.js');
  var sesController = require('./controllers/ses.controller.js');
  var senderController =  require('./controllers/sender.controller.js');

  // routes
  app.route('/create').post(letterController.create);
  app.route('/retrieve/:id').get(letterController.retrieve);
  app.route('/send').post(sesController.send);
  app.route('/envelope/send').post(senderController.create);
  app.route('/envelope/retrieve/:id').get(senderController.retrieve);
};