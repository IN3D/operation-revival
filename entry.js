let angular = require('angular')

angular.module('MekManager', [])
  .factory('characterFactory', require('./apps/mechwarrior4/factories/character.js'))
  .controller('characterController', require('./apps/mechwarrior4/controllers/character.js'))
