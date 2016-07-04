let angular = require('angular')
let mechwarrior4 = require('./apps/mechwarrior4')

angular.module('MekManager', [])
  .factory('characterFactory', mechwarrior4.factories.character)
  .controller('characterController', mechwarrior4.controllers.character)
