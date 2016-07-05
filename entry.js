let angular = require('angular')
let mechwarrior4 = require('./apps/mechwarrior4')

angular.module('MekManager', [])
  .factory('characterFactory', mechwarrior4.factories.character)
  .factory('affiliationFactory', mechwarrior4.factories.affiliation)
  .controller('characterController', mechwarrior4.controllers.character)
