'use strict';

app.controller('NavCtrl',function($scope, $location, Post, Auth){
	$scope.post = {url: 'http://', title: ''};

	$scope.signedIn = Auth.signedIn;
	$scope.logout = function(){
		Auth.logout();
	};

	$scope.submitPost = function(){
		//$scope.posts.push($scope.post);
		Post.create($scope.post).then(function(postId)
		{
			
			//$scope.posts[ref.name] = $scope.post;
			$scope.post = {url: 'http://',title: ''};
			$location.path('/posts/'+postId);
		});
	};
})