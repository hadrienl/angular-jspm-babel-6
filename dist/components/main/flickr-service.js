'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2, _descriptor;

var _decorators = require('../../config/decorators');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

/* jshint ignore:start */

/* jshint ignore:end */

var FlickrService = (0, _decorators.service)(_class = (_class2 = function () {
  function FlickrService() {
    _classCallCheck(this, FlickrService);

    _initDefineProp(this, '$http', _descriptor, this);

    this.images = [];
  }

  _createClass(FlickrService, [{
    key: 'numberOfHits',

    /* jshint ignore:end */

    value: function numberOfHits() {
      return this.images.length;
    }
  }, {
    key: 'loadImages',
    value: function loadImages(searchTag) {
      var _this = this;

      var URL = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + searchTag + '&tagmode=any&format=json&jsoncallback=JSON_CALLBACK';

      return this.$http.jsonp(URL).then(function (response) {
        _this.images = response.data.items;
      });
    }
  }]);

  return FlickrService;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, '$http', [_decorators.inject], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class;

exports.default = FlickrService;
//# sourceMappingURL=flickr-service.js.map
