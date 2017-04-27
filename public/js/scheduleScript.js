let arr = [];

function createSchedule(){
	var jqxhr=$.ajax("/getScheduledLessons")
	.done(function(docs) {
		for(doc of docs)
			arr.push(doc);
		showLessons();
	})
	.fail(function() {
		alert("Try Again!");
	})
}

function createReserved(){
	var jqxhr=$.ajax("/getScheduledLessons")
	.done(function(docs) {
		for(doc of docs)
			arr.push(doc);
		showReserved();
	})
	.fail(function() {
		alert("Try Again!");
	})
}

function showLessons(){
	arr.sort(function(a, b) {
    	return parseFloat(a.id) - parseFloat(b.id);
	});
	for(var item of arr){
		lessonsListDiv.innerHTML += 
		`<h3>${item.date} ---- ${item.time} pm ----<span> ${item.avail} </span> ----<button class="btn btn-primary">Reserve</button></h3>  <br>`;

	}
	registerButtonEvents();

}

function registerButtonEvents() {
	let buttons = document.getElementsByTagName("button");
	for(let i=0; i<arr.length; i++) {
		buttons[i].addEventListener("click", function () {
			addToReserved(i);
			changeStatus(i);
		});
	}
	
}

function registerButtonEvents2() {
	let buttons = document.getElementsByTagName("button");
	for(let i=0; i<arr.length; i++) {
		buttons[i].addEventListener("click", function () {
			moveSingle(i);
		});
	}
	
}

function moveSingle(i) {
	var reserve = localStorage.getItem("reserve");
	reserve=reserve.split(",");
	reserve.splice(i,1);
	if(reserve.length==0)
		clearReserved();
	else
		localStorage.setItem("reserve", reserve);
	resetStatus(i+1);
	showReserved();
	showSchedule();

}

function changeStatus(i){
	id = i+1;
	name = document.getElementById("studName").value;
	console.log(name);
	var num = {"id": id, "name": name};
	$.ajax({
		method:"post",
		url:"changeAvail",
		data: num
	})
	.done(function(result){
		if (result)
			$("#result").html("Reserve Updated");
		else
			$("#result").html("Broken");
	})
}

function resetStatus(i){
	id = i;
	var num = {"id": id};
	$.ajax({
		method:"post",
		url:"resetAvail",
		data: num
	})
	.done(function(result){
		if (result)
			$("#result").html("Reserve Updated");
		else
			$("#result").html("Broken");
	})
}

function changeAll(){
	for(i=arr.length; i>0; i--)
	{
		resetStatus(i);
	}	
}

function addToReserved(pId) {
	alert("Reserved");
	window.location.href = "./main.html";
	let reserveJ = localStorage.getItem("reserve");
	let reserve;
	if (reserveJ ==null) 
		reserve = [];
	else
		reserve = reserveJ.split(",");
	reserve.push(pId);
	
	localStorage.setItem("reserve", reserve.toString());
}


function showReserved(){
	let reserveJ = localStorage.getItem("reserve");
	let info="";
	if (reserveJ == null)
		document.getElementById("reservedLessons").innerHTML="<h2>No lessons have yet been reserved.</h2>";
	else{
		reserve = reserveJ.split(",");

			for (i in reserve) {
				item = arr[reserve[i]];
				info += `<h3>${item.date} ---- ${item.time} pm ---- ${item.user} ----<button class="btn btn-primary">Cancel</button><br>`;
			}
			document.getElementById("reservedLessons").innerHTML = info;
			registerButtonEvents2();
		}
		//document.getElementById("reservedLessons").innerHTML = info;
}

function clearReserved(){
	localStorage.removeItem("reserve");
	changeAll();
	window.location.href = "./main.html";


}




