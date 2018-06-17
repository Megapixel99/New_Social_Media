$.ajax({
  url: "/findUsers",
  type: "POST",
  success: function(data) {
    if (!data || data == undefined) {
      alert("ERROR");
    } else if (data.redirect && data.redirect != undefined) {
      window.location = data.redirect;
    } else {
      $.ajax({
        url: "/getfollowing",
        type: "POST",
        success: function(res) {
          if (!res || res == undefined) {
            alert("ERROR");
          } else {
            for (var i = 0; i < data.obj.length; i++) {
              if (res.curuser.Following.includes(data.obj[i].Username)) {
                $("#list").prepend("<li>" + data.obj[i].Username +
                  "<input type='button' id=" + data.obj[i].Username +
                  " value='Unfollow' onclick='Follow(" + data.obj[
                    i].Username + ")'/>" +
                  "<input type='button' value='Profile' onclick='ViewProfile(" +
                  data.obj[i].Username + ")'/> </li>");
              } else {
                $("#list").prepend("<li>" + data.obj[i].Username +
                  "<input type='button' id=" + data.obj[i].Username +
                  " value='Follow' onclick='Follow(" + data.obj[i]
                  .Username + ")'/>" +
                  "<input type='button' value='Profile' onclick='ViewProfile(" +
                  data.obj[i].Username + ")'/> </li>");
              }
            }
          }
        },
        dataType: "json"
      });
    }
  },
  error: function() {
    window.location.href = "/";
  },
  dataType: "json"
});

function Follow(User) {
  var u = User.id;
  if (User.value == "Unfollow") {
    User.value = "Follow";
    $.post('/unfollow', {
      username: u,
    });
  } else if (User.value == "Follow") {
    User.value = "Unfollow";
    $.post('/follow', {
      username: u
    });
  }
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
