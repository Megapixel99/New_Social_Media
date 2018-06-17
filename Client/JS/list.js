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
        $("#list").prepend("<li>" + data.posts[i].User + " " + data.posts[
          i].Textbox + "</li>");
      }
    }
  },
  dataType: "json"
});
