'use strict';

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _angularMocks = require('angular-mocks');

var mocks = _interopRequireWildcard(_angularMocks);

var _constants = require('../../config/constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<flickr-gallery>', function () {

  var element = void 0,
      $scope = void 0,
      ctrl = void 0;
  beforeEach(function () {
    _angular2.default.mock.module('mocked-templates');
    _angular2.default.mock.module(_constants.appName + '.main');
    _angular2.default.mock.module('decorators');
  });

  beforeEach(inject(function ($compile, $rootScope) {
    $scope = $rootScope.$new();
    $scope.images = [{
      title: 'foo'
    }, {
      title: 'bar'
    }];
    element = _angular2.default.element('<flickr-gallery data="images"></flickr-gallery>');
    element = $compile(element)($scope);
    $scope.$digest();
    ctrl = element.controller('flickrGallery');
  }));

  it('should have a $scope', function () {
    expect(ctrl.$scope).toBe(element.isolateScope());
  });

  it('should get data', function () {
    expect(ctrl.getData()).toBe($scope.images);
  });
});
//# sourceMappingURL=flickr-gallery-directive.spec.js.map
