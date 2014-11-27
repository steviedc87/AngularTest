/* global app:true * /
/* export app * /
'use strict';

/**
 * @ngdoc overview
 * @name angularTestApp
 * @description
 * # angularTestApp
 *
 * Main module of the application.
 */
var app = angular
  .module('angNewsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'firebase',
    'ngSanitize',
    'ngTouch'

  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/posts/:postId',{
        templateUrl: 'views/showpost.html',
        controller: 'PostViewCtrl'
      })
      .when('/register',{
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .when('/login',{
        templateUrl:'views/login.html',
        controller:'AuthCtrl'
      })
      .when('/users/:username',{
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .constant('FIREBASE_URL','https://glowing-fire-856.firebaseio.com/');


    