$.ajax({
  url: "/activity",
  type: "POST",
  success: function(data) {
    console.log(data);
    if (!data || data == undefined) {
      alert("ERROR");
    } else {
      if (data.length > 50) {
        for (var i = 0; i < 50; i++) {
          $("#list").prepend("<li>" + data[i].Notif + "</li>");
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          $("#list").prepend("<li>" + data[i].Notif + "</li>");
        }
      }
    }
  },
  error: function() {
    window.location.href = "/";
  },
  dataType: "json"
});

function Home() {
  window.location = "/";
}
