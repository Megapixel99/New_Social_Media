function submitClicked() {
  console.log($("#username").val());
$.post('/signup', {username: $('#username').val() , password: $('#password').val()}, successSubmit);
}
function loginClicked() {
window.location.href = "/login";
}
function successSubmit(data){
  if(data != null){
    if (!data.redirect)
    {
      $('#text').text(data.username + " has already been chosen as a username please choose a different username");
    }
     window.location.href = data.redirect;
  }
}
