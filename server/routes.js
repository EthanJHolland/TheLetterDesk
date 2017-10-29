'use strict';
module.exports = function(app) {
  var controller = require('./controller');

  // routes
  app.route('/create').post(controller.create);
  app.route('/retrieve/:id').get(controller.retrieve);
};