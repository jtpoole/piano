var userReady = false;
var emailReady = false;
var passReady = false;

var app = angular.module('userCheck', []);
	app.controller('userCtrl', function($scope) 
	{
		$scope.newUser="";
		$scope.newPass="";
		$scope.confPass="";
		$scope.confEmail="";

		$scope.isUserAvailable = function(){

			//check database to see if user is available
			var test = document.getElementById("username").value;

			if(test != "big hit club"){
				document.getElementById("username").style = "border-right: 8px solid #00FF7F;";
				document.getElementById("output1").innerHTML="";
				userReady = true;
			}
			else{
				document.getElementById("username").style = "border-right: 8px solid #CD5C5C;";
				document.getElementById("output1").innerHTML="- Username Taken";
				userReady = false;
			}
			if(test == ""){
  				document.getElementById("username").style = "border: 1px solid #d9d9d9; border-top: 1px solid #c0c0c0;";
  				document.getElementById("output1").innerHTML="";
  				userReady = false;
			}

		}
		$scope.isEmailValid = function() {
			let testEmail = document.getElementById("email").value;

  			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  			if(re.test(testEmail)== true) 
  			{
  				document.getElementById("email").style = "border-right: 8px solid #00FF7F;";
  				document.getElementById("output2").innerHTML="";
  				emailReady = true;
  			}
  			else{
  				document.getElementById("email").style = "border-right: 8px solid #CD5C5C;";
  				document.getElementById("output2").innerHTML="- Invalid Email Address Syntax";
  				emailReady = false;
  			}
  			if(testEmail == ""){
  				document.getElementById("email").style = "border: 1px solid #d9d9d9; border-top: 1px solid #c0c0c0;";
  				document.getElementById("output2").innerHTML="";
  				emailReady = false;
  			}
		}

		$scope.isPassValid = function(){
			
			let testPass = document.getElementById("newPass").value;
			let validPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
			let a = testPass.match(validPass);

			if(validPass.test(testPass)==true){
				document.getElementById("newPass").style = "border-right: 8px solid #00FF7F;";
				document.getElementById("output3").innerHTML="";
			}
		
			else{
				document.getElementById("newPass").style = "border-right: 8px solid #CD5C5C;";
				document.getElementById("output3").innerHTML="- Invalid Password";
				passReady = false;	
			}
			

			let confirm = document.getElementById("pwd").value;

			if(confirm == testPass)
			{
				document.getElementById("output4").innerHTML="- Passwords Match";
				document.getElementById("pwd").style = "border-right: 8px solid #00FF7F;";
			}
			else
			{
				document.getElementById("output4").innerHTML="- Passwords Do Not Match";
				document.getElementById("pwd").style = "border-right: 8px solid #CD5C5C;";
				passReady = false;	
			}
			if(testPass == ""){
				document.getElementById("newPass").style = "border: 1px solid #d9d9d9; border-top: 1px solid #c0c0c0;";
				document.getElementById("output3").innerHTML="";
				passReady = false;	
			}
			if(confirm == ""){
  				document.getElementById("pwd").style = "border: 1px solid #d9d9d9; border-top: 1px solid #c0c0c0;";
  				document.getElementById("output4").innerHTML="";	
  				passReady = false;	
			}
			if(validPass.test(testPass)==true && length >= 8 && confirm == testPass)
			{
				passReady = true;
			}

		}

	});




function submitUser() {
	username = document.getElementById("username").value;
	pwd = document.getElementById("pwd").value;
	fullName = document.getElementById("fn").value +"."+ document.getElementById("ln").value;
	var user = {"username":username, "pwd":pwd, "fullName":fullName};
	$.ajax({
		method:"post",
		url:"signupServer",
		data: user
	})
	.done(function(result){
		if (result)
			$("#result").html("User Submitted");
		else
			$("#result").html("Username already taken. Please choose another.");
	})

}
