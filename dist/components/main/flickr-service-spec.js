'use strict';

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _angularMocks = require('angular-mocks');

var mocks = _interopRequireWildcard(_angularMocks);

var _constants = require('../../config/constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FlickrService', function () {

  var service, $httpBackend;
  beforeEach(function () {
    _angular2.default.mock.module(_constants.appName);
  });

  beforeEach(mocks.default.inject(function (_$httpBackend_, _FlickrService_) {
    service = _FlickrService_;
    $httpBackend = _$httpBackend_;

    $httpBackend.whenJSONP(/http:\/\/api.flickr.com/).respond({
      "title": "Fake response",
      "link": "http://fakelink.com",
      "description": "",
      "modified": "1970-01-01T01:01:01Z",
      "generator": "FakeGenerator",
      "items": [{
        "title": "TEST",
        "link": "http://FakeImageLing",
        "media": { "m": "http://fakeImage.jpg" },
        "date_taken": "1970-01-01T12:05:34-08:00",
        "description": "FakeDescription",
        "published": "1970-01-01T22:59:45Z",
        "author": "fake@unittest.com",
        "author_id": "F@K3",
        "tags": "fake tags for testing"
      }]
    });
  }));

  it("should perform a request against Flickr", function () {
    $httpBackend.expectJSONP(/http:\/\/api.flickr.com/);
    service.loadImages('AngularJS');
    $httpBackend.flush();
  });

  it("should contain result with items", function () {
    $httpBackend.expectJSONP(/http:\/\/api.flickr.com/);
    service.loadImages('AngularJS').then(function () {
      expect(service.numberOfHits()).toBe(1);
    });
    $httpBackend.flush();
  });
});
//# sourceMappingURL=flickr-service-spec.js.map
