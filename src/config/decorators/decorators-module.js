import angular from 'angular';
import uiRouter from 'angular-ui-router';

export let DecoratorsModule = angular.module('decorators', [uiRouter]);

DecoratorsModule.run(_$injector_ => {
  DecoratorsModule.$injector = _$injector_;
});
