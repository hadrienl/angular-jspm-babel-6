import {DecoratorsModule} from './decorators-module';

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
export function inject (...components) {
  if (typeof components[0] === 'object') {
    let key = components[1];

    return {
        get: () => {
          try {
            return DecoratorsModule.$injector.get(key);
          } catch (err) {
            throw new Error(`${key} cannot be injected as a property. Inject it in the class level.`);
          }
        }
      };
  } else {
    return function decorate (target, key, property) {
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
export function injectAs (dep) {
  return function decorate (target, key, descriptor) {
    return {
        get: () => {
          try {
            return DecoratorsModule.$injector.get(dep);
          } catch (err) {
            throw new Error(`${key} cannot be injected as a property. Inject it in the class level.`);
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
export function directive (opts = {}) {
  return function decorate (Target) {
    let name = opts.name || getTargetName(Target);
    name = name.substring(0,1).toLowerCase() + name.substring(1);
    function factory(...deps) {
      let inject = Target.$inject || [],
        controller;
      let directiveDefinitionObject = {
        priority: opts.priority,
        template: opts.template,
        templateUrl: opts.templateUrl,
        transclude: opts.transclude,
        restrict: opts.restrict,
        templateNamespace: opts.templateNamespace,
        scope: opts.scope,
        controller: [...inject, function (...deps) {
          controller = new Target(...deps);
          return controller;
        }],
        controllerAs: opts.scope ? opts.controllerAs || 'ctrl' : null,
        bindToController: true,
        require: opts.require,
        replace: opts.replace,
        compile: function compile (...args) {
          let compileFn;
          if (Target.compile) {
            compileFn = Target.compile(...args);
          }
          return function link (scope, element, attrs, requires) {
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
    DecoratorsModule.directive(name, factory);
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
export function register (opts) {
  return function decorate(target) {
    if(opts.inject) {
      target.$inject = opts.inject;
    }

    let name = opts.name || getTargetName(target);
    DecoratorsModule[opts.type](name, target);
  };
}

/**
 * @exemple
 *  import {controller} from './decorators';
 *
 *  @controller
 *  export class MyController {}
 */
export function controller (target) {
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
export function filter (Target) {
  let name = getTargetName(Target);
  name = name.substring(0,1).toLowerCase() + name.substring(1);
  let deps = Target.$inject || [];
  DecoratorsModule.filter(name, [...deps, function (...deps) {
    let instance = new Target();
    return function (...args) { return instance.filter(...args); };
  }]);
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
export function constant (Target) {
  let name = getTargetName(Target);
  name = name.substring(0,1).toLowerCase() + name.substring(1);
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
export function value (Target) {
  return register({ type: 'value', name: getTargetName(Target) })(new Target());
}
/**
 * @exemple
 *  import {factory} from './decorators';
 *
 *  @controller
 *  export class MyFactory {}
 */
export function factory (target) {
  return register({ type: 'factory' })(target);
}
/**
 * @exemple
 *  import {service} from './decorators';
 *
 *  @controller
 *  export class MyService {}
 */
export function service (target) {
  return register({ type: 'service' })(target);
}
/**
 * @exemple
 *  import {provider} from './decorators';
 *
 *  @controller
 *  export class Myprovider {}
 */
export function provider (target) {
  let name = target.name.replace('Provider', '');
  return register({ type: 'provider', name: name })(target);
}


export function getTargetName (o) {
  if (o.name) {
    return o.name;
  }
  // IE sux
  return o.toString().match(/function\s?(.*)\s?\(/)[1];
}
