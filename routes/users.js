  const express = require("express");
  const router = express.Router();
  const data = require("../data");
  const postData = data.users;

var authenticateduser;

  router.get("/", async (req, res) => {
    if(req.cookies.AuthCookie===undefined)
      res.render("login/static");
    else
      res.redirect("/private")
  });


  router.post("/login", async (req, res) => {
  if(req.cookies.AuthCookie===undefined)
  {
  let operation = req.body;
  var username = operation.username;
  var passwd = operation.password;
  var correctuser = await postData.checkLogin(username,passwd)
  
 

if(correctuser!=false)
{
  authenticateduser = correctuser;

  res.cookie("AuthCookie",authenticateduser.HashedUsername);
  
   res.redirect("/private")
}

else
{
    res.render("login/static" , {err : "Invalid Username/Password"})
}
  }
  else{
    res.redirect("/private")
  }
});

router.get("/private", async (req, res) => {
  if(req.cookies.AuthCookie===undefined)
  {
    res.status(403).render("login/error")
  }
  else
  res.render("login/result",authenticateduser);
});

router.get("/logout", async (req, res) => {
res.clearCookie("AuthCookie");
res.render("login/error")

});
module.exports = router;
