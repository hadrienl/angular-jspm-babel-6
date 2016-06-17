import {DecoratorsModule} from './decorators-module';
import {directive, getTargetName} from './decorators-angular';

/**
 * Specify a state route
 * @state('app.foo', {
 *   url: '/foo',
 *   template: `<p>Hello World</p>`,
 *   templateUrl: 'url.html',
 *   resolve: {
 *     bar: (Service) => Service.getSomething()
 *   }
 * })
 * class MyController {
 *   constructor () {
 *     // this.bar is set \o/
 *   }
 *  }
 */
export function state (stateName, opts = {}) {
  return function decorate (Target) {
    let inject = Target.$inject || [];
    if (opts.resolve) {
      for (let service of Object.keys(opts.resolve)) {
        inject.push(service);
      }
    }

    DecoratorsModule.config($stateProvider => {
      $stateProvider.state(stateName, {
        url: opts.url,
        template: opts.template,
        templateUrl: opts.templateUrl,
        resolve: opts.resolve,
        controller: [...inject, function (...deps) {
          let controller = new Target(...deps);
          if (opts.resolve) {
            for (let service of Object.keys(opts.resolve)) {
              controller[service] = deps[inject.indexOf(service)];
            }
          }
          return controller;
        }],
        controllerAs: 'ctrl'
      });
    });
  };
}

/**
 * Specify a component which would be displayed on a state route
 * @component('app.foo', {
 *  url: '/foo',
 *  resolve: {
 *    bar: () => 'bar'
 *  },
 *  templateUrl: 'path/to/foo.html',
 *  // template: '<p>{{ ctrl.bar }}</p>'
 *  scope: {
 *    bar: '='
 *  }
 * })
 * class MyDirective {
 *  link () {
 *    // this.bar === 'bar'
 *  }
 * }
 */
export function component (stateName, opts = {}) {
  return function decorate (Target) {
    let tag = classNameToDirective(getTargetName(Target)),
      template = `<${tag}${insertResolves(opts.resolve)}></${tag}>`;

    state(stateName, {
      url: opts.url,
      template: template,
      resolve: opts.resolve
    })(() => {});

    if (opts.resolve) {
      for (let service of Object.keys(opts.resolve)) {
        if (!opts.scope) {
          opts.scope = {};
        }
        if (!opts.scope[service]) {
          opts.scope[service] = '=';
        }
      }
    }

    directive(opts)(Target);
  };
}

function classNameToDirective (str) {
  return str.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase();
}

function insertResolves (resolves) {
  let output = '';

  if (resolves) {
    for (let key of Object.keys(resolves)) {
      output += ` ${key}="ctrl.${key}"`;
    }
  }

  return output;
}
