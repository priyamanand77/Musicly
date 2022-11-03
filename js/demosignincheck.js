function democheck(uname, pass) {

  if (uname == "priyam" && pass == "priyam") {
    document.getElementById("form1").action = "landingpage.html";
  } else {
    // document.getElementById('form1').action = 'signin.html';
    document.getElementById("errormsg").style.display = "inline";
    document.getElementById("form1").action = "signin.html";
  }
}
