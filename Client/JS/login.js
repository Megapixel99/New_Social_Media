function submitClicked() {
$.post('/login', {username: $('#username').val() , password: $('#password').val()}, successSubmit);
}
function signupClicked() {
window.location.href = "/signup";
}
function successSubmit(data){
  if(data != null){
    window.location.href = data.redirect;
  }
}
