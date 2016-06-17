'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainComponent = undefined;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _constants = require('../../config/constants');

var _mainController = require('./main-controller');

var _mainController2 = _interopRequireDefault(_mainController);

var _flickrGalleryDirective = require('./flickr-gallery-directive');

var _flickrGalleryDirective2 = _interopRequireDefault(_flickrGalleryDirective);

var _flickrService = require('./flickr-service');

var _flickrService2 = _interopRequireDefault(_flickrService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainComponent = exports.MainComponent = _angular2.default.module(_constants.appName + '.main', []);
//# sourceMappingURL=main.js.map
