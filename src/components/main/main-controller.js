import {controller, inject, injectAs} from '../../config/decorators';

@controller
@inject('$scope')
export class MainCtrl {
  @injectAs('FlickrService') service = null;
  constructor($scope) {
    this.searchTag = 'AngularJS';
    console.log('COIN COIN');
  }
}
