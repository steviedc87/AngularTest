'use strict';

app.factory('Post',function($firebase,FIREBASE_URL,User){
	var ref = new Firebase(FIREBASE_URL + 'posts');
	var posts = $firebase(ref).$asArray();
	 var Post = {

	 	all:posts,
	 	create: function(post)
	 	{
	 		if(User.signedIn()){
	 			var user = User.getCurrent();
	 			console.log(user.username);
	 			post.owner = user.username;

	 			return posts.$add(post).then(function(ref){
	 				var postId = ref.name();
	 				User.posts(user.username).$set(postId,postId);
	 				return postId;
	 			});
	 		}
	 		
	 	},
	  find: function (postId) {
	  	var post = $firebase(ref.child(postId)).$asObject();
	   return post;

       
      },
	 	delete: function(post){
	 		if(User.signedIn())
	 		{
	 			//console.log(postId+" In Delete factory")

	 			//var post = Post.find(postId)
	 			console.log(post.title+" in deletePost factory");
	 			var user = User.getCurrent();
	 			if(user.username === post.owner)
	 			{
	 				posts.$remove(post).then(function(){
	 					User.posts(user.username).$remove(post.$id);
	 				});
	 			}
	 		}
	 		
	 	},
	 	comments: function(postId)
	 	{
	 		return $firebase(new Firebase(FIREBASE_URL + 'comments/'+postId));

	 	},
	 	addComment: function(postId, comment){
	 		if(User.signedIn()){
	 			var user = User.getCurrent();
	 			comment.username = user.username;
	 			Post.comments(postId).$push(comment).then(function(ref){
	 				var commentId = ref.name();
	 				console.log(commentId + ' in post.comments.push function '+user.username);
	 				User.comments(user.username).$set(commentId,postId);
	 			});
	 		}
	 	},
	 	deleteComment: function(postId,comment){
	 		if(User.signedIn()){
	 			var user = User.findByUsername(comment.username);

	 			var commentId = comment.$id;
	 			console.log(commentId + " id om te verwijderen in deleteComment")

	 			Post.comments(postId).$remove(commentId).then(function(){
	 				User.comments(user.username).$remove(commentId);
	 			});
	 		}
	 	}
	 };
	 return Post;
});


