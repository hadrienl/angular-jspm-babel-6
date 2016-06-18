Angular 1.x JSPM Babel 6 starter
================================

This boilerplate help to start a new Angular 1.x app with modern ECMAscript. Inspired by [angular_es6](https://github.com/zewa666/angular_es6) which is inspired by [Aurelia](http://aurelia.io) and updated with [babel-jspm-karma-jasmine-istanbul](https://github.com/gunnarlium/babel-jspm-karma-jasmine-istanbul), you can build your app with decorators and async/await in ES6 coding style, loading dependancies with JSPM, testing your code with jasmine and have code coverage report. Finally, you can build your app and deploy it on your production environnement.


Install
=======

	$ npm install -g jspm karma-cli gulp
	$ npm install

Start developping
=================

You'll find all your Angular app code in the `src` folder. You should only have to add code in `components` folder and sometimes in `app.js`. The app is configured to work with ui-router but you should hack `src/config/decorators/decorators-router.js` if you want to use another one. Styles are compiled with SASS and are located in `src/styles`.

When you are ready to make your app work, just start the app :

	$ npm start

And load [http://localhost:9000](http://localhost:9000) in your browser. Your code will be watched and the browser will be automatically reloaded when you change a file.

Testing your code
=================

	$ npm test

Your code will be tested in PhantomJS and you'll have a code coverage report.

Deploy your code
================

	$ npm run build

Your app will be bundled in the `bundle` folder that you'll just copy on your remote server.

Coding Style with Decorators
============================

## Using decorators

There is a base decorator called `@register` which performs generic component registrations. In order to
save work you may use one of the following concrete implementations, which allow you to omit the type
information. In fact, the class will be registered as a constant/value/factory/whatever in the `decorartors` angular module which is loaded in the app module creation (see `src/app.js`).

### Constants

```js
import {constant} from './path/to/config/decorators';

@constant
export default class MyConstant {
  constructor () {
    return 'my-constant';
  }
}
```

### Values

```js
import {value} from './path/to/config/decorators';

@value
export default class MyValue {
  constructor () {
    return 'my-value';
  }
}
```

### Factories

```js
import {factory} from './path/to/config/decorators';

@factory
export default class MyFactory {
  constructor (/* dependancies */) { }
}
```

### Services

```js
import {service} from './path/to/config/decorators';

@service
export default class MyService {
  constructor (/* dependancies */) { }
}
```

### Providers

```js
import {provider} from './path/to/config/decorators';

@provider
export default class MyProvider {
  constructor (/* dependancies */) { }
}
```

### Controllers

```js
import {controller} from './path/to/config/decorators';

@controller
export default class MyController {
  constructor (/* dependancies */) { }
}
```

### Directives

```js
import {directive} from './path/to/config/decorators';
import {baseURL} from './path/to/config/constants';

@directive({
  restrict: 'E',
  templateUrl: `${baseURL}/path/to/the/template.html`
})
export default class MyController {
  constructor (/* dependancies */) {
    this.foo = 'bar';
  }
}

// In template.html :

<p>{{ ctrl.foo }} will display "bar"</p>
```

### Filters

```js
import {filter} from './path/to/config/decorators';

@filter
export default class MyFilter {
  constructor (/* dependancies */) { }
  filter (input) {
    return input.toUpperCase();
  }
}
```

### Injections

In order to inject existing components/services into your new component you can leverage the following
decorator as depicted in the example below.

```js
import {inject} from './path/to/config/decorators';

@controller
@inject('$http', 'MyService')
export default class MyController {
  constructor ($http, MyService) { }
}
```

### Injection as a property

Let's say you want to inject a component/service but use it with a different property name. In order to do so use the
`injectAs` decorator

```js
import {inject, injectAs} from './path/to/config/decorators';

@controller
export default class MyController {
  @inject $http = null;
  @inject MyService = null;
  @injectAs('$q') Promise = null;
  doSomething () {
    return this.Promise((resolve, reject) {
      $http.get(this.MyService.path)
        .success(data => resolve(data)
        .error(err => reject(err));
    });
  }
}
```

That doesn't work with local injections like `$scope` or `$element`. You'll have to use `@inject` and load them in the constructor.
