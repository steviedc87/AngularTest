


app.controller('PostsCtrl',function($scope,$location,Post){
	if($location.path()==='/'){
			$scope.posts= Post.all;
	}



	$scope.post = {url: 'http://',title:''};


	

	$scope.deletePost = function(post){
		console.log(post.title+" in deletePost controller");
		Post.delete(post);
	};


});