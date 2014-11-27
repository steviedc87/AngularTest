'use restrict';

app.controller('AuthCtrl',function($scope,$location, Auth, User){
	if(Auth.signedIn()){
		$location.path('/');
	}
	$scope.login = function(){
		Auth.login($scope.user).then(function(){
			$location.path('/');
		},
		function(error)
		{
			$scope.error = error.toString();
		});
	};
   $scope.register = function() {
      Auth.register($scope.user).then(function (authUser) {
         console.log("SHIT",authUser);
        User.create(authUser, $scope.user.username);
        $location.path('/');
      }, function (error) {
        $scope.error = error.toString();
      });
    };
  }
);
