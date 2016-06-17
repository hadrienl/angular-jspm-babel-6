'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.inject = inject;
exports.injectAs = injectAs;
exports.directive = directive;
exports.register = register;
exports.controller = controller;
exports.filter = filter;
exports.constant = constant;
exports.value = value;
exports.factory = factory;
exports.service = service;
exports.provider = provider;
exports.getTargetName = getTargetName;

var _decoratorsModule = require('./decorators-module');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @exemple
 *  import {inject} from './decorators';
 *
 *  @inject('$scope', '$http')
 *  class MyController {
 *    constructor($scope, $http) {
 *      this.$scope = $scope;
 *      this.$http = $http;
 *    }
 *  }
 *
 *  class MyOtherController {
 *    @inject $http = null;
 *    @inject MyService = null;
 *    doSomething () {
 *      this.MyService.doServiceTask();
 *    }
 *  }
 */
function inject() {
  for (var _len = arguments.length, components = Array(_len), _key = 0; _key < _len; _key++) {
    components[_key] = arguments[_key];
  }

  if (_typeof(components[0]) === 'object') {
    var _ret = function () {
      var key = components[1];

      return {
        v: {
          get: function get() {
            try {
              return _decoratorsModule.DecoratorsModule.$injector.get(key);
            } catch (err) {
              throw new Error(key + ' cannot be injected as a property. Inject it in the class level.');
            }
          }
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return function decorate(target, key, property) {
      target.$inject = components;
    };
  }
}

/**
 * @exemple
 *  import {injectAs} from './decorators';
 *
 *  class MyController {
 *    @injectAs('MyService') service = null;
 *    constructor() {
 *      this.service.doSomething();
 *    }
 *  }
 */
function injectAs(dep) {
  return function decorate(target, key, descriptor) {
    return {
      get: function get() {
        try {
          return _decoratorsModule.DecoratorsModule.$injector.get(dep);
        } catch (err) {
          throw new Error(key + ' cannot be injected as a property. Inject it in the class level.');
        }
      }
    };
  };
}

/**
 * @exemple
 *  import {directive, inject} from './decorators';
 *  import {baseUrl} from './constants';
 *
 *  @directive({
 *    priority: 42,
 *    templateUrl: `${baseUrl}/components/myComponent/myView.html`,
 *    restrict: 'E',
 *    require: '^parentDirective',
 *    // etc
 *  })
 *  @inject('$scope', '$element', '$attrs')
 *  class MyView {
 *    constructor($scope, $element, '$attrs') {
 *      $element.on('click', e => console.log('click'));
 *    }
 *
 *    // If you want to use link function :
 *    static link (scope, element, attrs) {
 *      element.on('click', e => console.log('click'));
 *    }
 *  }
 */
function directive() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function decorate(Target) {
    var name = opts.name || getTargetName(Target);
    name = name.substring(0, 1).toLowerCase() + name.substring(1);
    function factory() {
      for (var _len2 = arguments.length, deps = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        deps[_key2] = arguments[_key2];
      }

      var inject = Target.$inject || [],
          controller = void 0;
      var directiveDefinitionObject = {
        priority: opts.priority,
        template: opts.template,
        templateUrl: opts.templateUrl,
        transclude: opts.transclude,
        restrict: opts.restrict,
        templateNamespace: opts.templateNamespace,
        scope: opts.scope,
        controller: [].concat(_toConsumableArray(inject), [function () {
          for (var _len3 = arguments.length, deps = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            deps[_key3] = arguments[_key3];
          }

          controller = new (Function.prototype.bind.apply(Target, [null].concat(deps)))();
          return controller;
        }]),
        controllerAs: opts.scope ? opts.controllerAs || 'ctrl' : null,
        bindToController: true,
        require: opts.require,
        replace: opts.replace,
        compile: function compile() {
          var compileFn = void 0;
          if (Target.compile) {
            compileFn = Target.compile.apply(Target, arguments);
          }
          return function link(scope, element, attrs, requires) {
            if (compileFn) {
              if (controller) {
                compileFn.call(controller, scope, element, attrs, requires);
              } else {
                compileFn(scope, element, attrs, requires);
              }
            }

            if (Target.link) {
              return Target.link(scope, element, attrs, requires);
            }
            if (controller) {
              controller.$scope = scope;
              controller.$element = element;
              controller.$attrs = attrs;
              controller.$requires = requires;
              if (controller.link) {
                return controller.link(scope, element, attrs, requires);
              }
            }
          };
        }
      };
      return directiveDefinitionObject;
    }
    _decoratorsModule.DecoratorsModule.directive(name, factory);
  };
}

/**
 * @exemple
 *  import {register} from './decorators';
 *
 *  @register({
 *    type: 'controller'
 *  })
 *  export class MyController {}
 */
function register(opts) {
  return function decorate(target) {
    if (opts.inject) {
      target.$inject = opts.inject;
    }

    var name = opts.name || getTargetName(target);
    _decoratorsModule.DecoratorsModule[opts.type](name, target);
  };
}

/**
 * @exemple
 *  import {controller} from './decorators';
 *
 *  @controller
 *  export class MyController {}
 */
function controller(target) {
  return register({ type: 'controller' })(target);
}
/**
 * @exemple
 *  import {filter, inject} from './decorators';
 *
 *  @filter
 *  @inject('$http')
 *  export class MyFilter {
 *    constructor($http) {
 *      this.$http = $http;
 *    }
 *    filter (input) {
 *      return input.toUpperCase();
 *    }
 *  }
 */
function filter(Target) {
  var name = getTargetName(Target);
  name = name.substring(0, 1).toLowerCase() + name.substring(1);
  var deps = Target.$inject || [];
  _decoratorsModule.DecoratorsModule.filter(name, [].concat(_toConsumableArray(deps), [function () {
    var instance = new Target();
    return function () {
      return instance.filter.apply(instance, arguments);
    };
  }]));
}
/**
 * @exemple
 *  import {constant} from './decorators';
 *
 *  @controller
 *  export class MyConstant {
 *    constructor(...deps) {
 *      return () => {};
 *    }
 *  }
 */
function constant(Target) {
  var name = getTargetName(Target);
  name = name.substring(0, 1).toLowerCase() + name.substring(1);
  return register({ type: 'constant', name: name })(new Target());
}
/**
 * @exemple
 *  import {value} from './decorators';
 *
 *  @controller
 *  export class MyValue {
 *    constructor(...deps) {
 *      return () => {};
 *    }
 *  }
 */
function value(Target) {
  return register({ type: 'value', name: getTargetName(Target) })(new Target());
}
/**
 * @exemple
 *  import {factory} from './decorators';
 *
 *  @controller
 *  export class MyFactory {}
 */
function factory(target) {
  return register({ type: 'factory' })(target);
}
/**
 * @exemple
 *  import {service} from './decorators';
 *
 *  @controller
 *  export class MyService {}
 */
function service(target) {
  return register({ type: 'service' })(target);
}
/**
 * @exemple
 *  import {provider} from './decorators';
 *
 *  @controller
 *  export class Myprovider {}
 */
function provider(target) {
  var name = target.name.replace('Provider', '');
  return register({ type: 'provider', name: name })(target);
}

function getTargetName(o) {
  if (o.name) {
    return o.name;
  }
  // IE sux
  return o.toString().match(/function\s?(.*)\s?\(/)[1];
}
//# sourceMappingURL=decorators-angular.js.map
