'use strict';

app.controller('PostViewCtrl',function($scope,$routeParams,Post){

	$scope.post = Post.find($routeParams.postId);

	$scope.comments = Post.comments($routeParams.postId).$asArray();

	$scope.addComment = function(){
		Post.addComment($routeParams.postId,$scope.comment);
		$scope.comment = '';
	};
	$scope.removeComment = function(comment){

		Post.deleteComment($routeParams.postId, comment);
		console.log('remove comment '+comment.$id+' from '+$routeParams.postId);
	};
});


