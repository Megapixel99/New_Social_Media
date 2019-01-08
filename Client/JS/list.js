$.ajax({
  url: "/list",
  type: "POST",
  success: function(data) {
    console.log(data);
    if (!data || data == undefined) {
      alert("ERROR");
    } else if (data.redirect && data.redirect != undefined) {
      window.location = data.redirect;
    } else {

      for (var i = 0; i < data.posts.length; i++) {
        $("#list").prepend("<li>" + data.posts[i].User + ": " + data.posts[
          i].Textbox + "<p id='likenum" + data.posts[data.posts.length - 1].Textbox +
          "'> Likes: " + data.posts[data.posts.length - 1].LikedBy.length + "</p> <input type='button' id=" +
          data.posts[data.posts.length - 1].Textbox + " value='Like' onclick='Like("
          + data.posts[data.posts.length - 1].Textbox + ")'/> </li>");
      }
    }
  },
  dataType: "json"
});

function Like(text) {
	$.ajax({
		url: "/likepost",
		type: "POST",
		data: {
			posttext: text.id
		},
		success: function(data) {
			var l = parseFloat(data.post.LikedBy.length + 1);
      console.log(l);
			$("#likenum" + data.post.Textbox).text("Likes: " + l );
		},
		dataType: "json"
	});
}
function Home() {
  $.ajax({
    url: "/userInfo",
    type: "GET",
    success: function(data) {
      window.location = "/";
    },
    dataType: "json"
  });
}
