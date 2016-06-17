'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

var _decorators = require('../../config/decorators');

var _constants = require('../../config/constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* jshint ignore:end */


/* jshint ignore:start */
var FlickrGallery = (_dec = (0, _decorators.directive)({
  restrict: 'E',
  scope: {
    data: '='
  },
  templateUrl: _constants.baseURL + 'components/main/flickr-gallery.html'
}), _dec2 = (0, _decorators.inject)('$scope'), _dec(_class = _dec2(_class = function () {
  function FlickrGallery($scope) {
    _classCallCheck(this, FlickrGallery);

    this.$scope = $scope;
  }

  _createClass(FlickrGallery, [{
    key: 'getData',
    value: function getData() {
      return this.data;
    }
  }]);

  return FlickrGallery;
}()) || _class) || _class);
exports.default = FlickrGallery;
//# sourceMappingURL=flickr-gallery-directive.js.map
