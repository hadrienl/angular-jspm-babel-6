import angular from 'angular';
import {appName} from '../../config/constants';
import MainController from './main-controller';
import FlickrGallery from './flickr-gallery-directive';
import FlickrService from './flickr-service';

export let MainComponent = angular.module(`${appName}.main`, []);
