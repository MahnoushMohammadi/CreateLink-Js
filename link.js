/*mahnoush & Fatma
*For forget password; checks if the email exists in the database
*/
window.checkEmail= function () {
  var emailUser= $("#updateEmail").val();

  if (emailUser == "" ) {
   alert("please enter your email address");
  }
  else { 
   $("#updateEmail").val();
   $.post("scripts/database/checkEmail.php", { 'emailUser' : emailUser },function (data){    
   var data = JSON.parse(data);
   var Id = data.userId;
   var email = data.userEmail;
   
   if (Id == 0){
   alert("This email does not exist in database");
   }else{

   var timestamp = new Date().getTime();
   var key = timestamp + "-" + Id;
   var encodekey = b64EncodeUnicode(key); 
   //var url = 'http://159.203.1.85/~mahnoush/cpi/app/#newpassword';
   var urlemail = "?key=" + encodekey;
   //var getP =  getParameterByName('key'); 
  // var decodekey= b64DecodeUnicode('encodekey '); 

   $.post("scripts/database/AddKey.php", {'email' : email , 'key' : encodekey },function (data){
   
 //  var urluser = getParameterByName('urlemail'); 
   $.post("scripts/database/email-changepassword.php", {'email' : email , 'url' : urlemail , 'keyemail' : encodekey } ,function (data){
   alert("Please check your email for your reset password link");
   window.location.href = '#login';
   document.getElementById("updateEmail").value = "";
   }); 
   });     
     }
   });    
  }
}


function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}


function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/*mahnoush
*Submitt new password
* Checks that the password and confirmpasword are filled and goes to log in page
* Expects #newPassword & #cfmPassword input fields are filled
* Alerts user when passwords do not match
* No output or return value on success
*/


window.updatePassword=function(){

var pass = $("#newPassword").val();  
var email = $("#updatePassIDUser").val();  
if (pass == "" || email ==""){
  alert("Please complete the form.")
}else{
  
  var getkey = getParameterByName('key');
  var pass = $("#newPassword").val();  
 
  var timeSent = b64DecodeUnicode(getkey);
 timeSent = timeSent.substr(0, timeSent.indexOf('-'));
 var oneDay = 24 *60 * 60 * 1000; // hours * minutes * seconds * milliseconds
 if (oneDay < (new Date().getTime() - timeSent)) {
   alert("More than one day has passed since you requested a password change. You must request a 'Reset Password' again");
   return;
 } 

  //var newInfo = {"pass" : pass , "id" : id , "getkey" : getkey} ;
  var newInfo = {"pass" : pass ,"getkey" : getkey} ;
    $.post("scripts/database/updatePassword.php", newInfo, function(data){
      
      alert(data);
      
      window.location.href = '#login';
      document.getElementById("frmNewPassword").reset();
  });
  }
}











 


  

