'use strict';

app.factory('User',function($firebase,FIREBASE_URL,$rootScope,Auth){

	var ref = new Firebase(FIREBASE_URL+'users');
	var user = $firebase(ref);

	var User = {
	
	create: function (authUser, username) {

      users.$update(username, {
        md5_hash: authUser.md5_hash,
        username: username,
        priority: authUser.uid
      });
  },
		posts:function(username)
		{
			return $firebase(new Firebase(FIREBASE_URL+'user_posts/'+username));
		},
		findByUsername: function(username){
			if(username){
				return $firebase(ref.child(username)).$asObject();
			}
		},
		getCurrent: function(){
			return $rootScope.currentUser;
		},
		signedIn: function(){
			return $rootScope.currentUser !== null;
		},
		comments: function(username){
			console.log("in Comments user.js");
			return $firebase(new Firebase(FIREBASE_URL+'user_comments/'+username));
		}
	
	};
	function setCurrentUser (username) {
    $rootScope.currentUser = User.findByUsername(username);
  }

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid)).$asArray();

    query.$loaded(function () {
      setCurrentUser(query[0].username);
    });
  });

  $rootScope.$on('$firebaseSimpleLogin:Logout', function () {
    delete $rootScope.currentUser;
  });
	return User;
})
