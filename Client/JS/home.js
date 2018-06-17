$.ajax({
	url: "/userinfo",
	type: "GET",
	success: function(data) {
		if (!data || data == undefined) {
			alert("ERROR");
		} else if (data.redirect && data.redirect != undefined) {
			window.location = data.redirect;
		} else {
			if (data.curuser) {
				document.getElementById("followers").innerHTML = "Followers: " + data.curuser
					.Followers.length;
				document.getElementById("following").innerHTML = "Following: " + data.curuser
					.Following.length;
				document.getElementById("posts").innerHTML = "Posts: " + data.posts.length;
				document.getElementById("username").innerHTML = data.curuser.Username;
				for (var i = 0; i < data.posts.length; i++) {
					if (data.posts[i].User == data.curuser.Username) {
						$("#mylist").prepend("<li>" + data.posts[i].Textbox +
							"<input type='button' id=" + data.posts[i].Textbox +
							" value='Like' onclick='Like(" + data.posts[i].Textbox + ")'/>" +
							"<p>Comment: </p> <input type='text' id=" + data.posts[i].Textbox +
							"comment" +
							" value=''/> <input type='button' value='Submit' onclick='SubmitComment(" +
							data.posts[i].Textbox + ")'/> <p id='likenum" + data.posts[i].Textbox +
							data.curuser.Username + "'>Likes: " + data.posts[i].Likes + "</p>" +
							"</li>");
					}
				}
			} else {
				window.location = "/login";
			}
		}
	},
	error: function() {
		window.location.href = "/login";
	},
	dataType: "json"
});

function Upload() {
	$.ajax({
		url: "/upload",
		type: "POST",
		data: {
			username: $('#username').val(),
			textbox: $('#textbox').val()
		},
		success: function(data) {
			console.log(data);
			if (!data || data == undefined) {
				alert("ERROR");
			} else {
				$('#textbox').val("");
				$.ajax({
					url: "/userinfo/" + $('#username').val(),
					type: "GET",
					success: function(data) {
						if (!data || data == undefined) {
							alert("ERROR");
						} else {
							document.getElementById("posts").innerHTML = "Posts: " + data.posts
								.length;
							$("#mylist").prepend("<li>" + data.posts[data.posts.length - 1].Textbox +
								"<input type='button' id=" + data.posts[data.posts.length - 1].Textbox +
								" value='Like' onclick='Like(" + data.posts[data.posts.length -
									1].Textbox + ")'/>" + "<p>Comment: </p> <input type='text' id=" +
								data.posts[data.posts.length - 1].Textbox +
								" value=''/> <input type='button' value='Submit' onclick='SubmitComment(" +
								data.posts[data.posts.length - 1].Textbox +
								")'/> <p id='likenum" + data.posts[data.posts.length - 1].Textbox +
								data.curuser.Username + "'>Likes: " + data.posts[data.posts.length -
									1].Likes + "</p>" + "</li>");
						}
					},
					error: function() {
						window.location.href = "/login";
					},
					dataType: "json"
				});
			}
		},
		dataType: "json"
	});
}

function Logout() {
	$.ajax({
		url: "/logout",
		type: "POST",
		data: {
			username: $('#username').val()
		},
		success: function(data) {
			if (!data || data == undefined) {
				alert("ERROR");
			} else {
				window.location = data.redirect;
			}
		},
		dataType: "json"
	});
}

function Activity() {
	window.location = "activity"
}

function List() {
	window.location = "list"
}

function Find() {
	window.location.href = "findUsers"
}

function Like(text) {
	$.ajax({
		url: "/likepost",
		type: "POST",
		data: {
			posttext: text.id
		},
		dataType: "json"
	});
}

function Comment(text) {
	$.ajax({
		url: "/commentpost",
		type: "POST",
		data: {
			posttext: text.id
		},
		dataType: "json"
	});
}
