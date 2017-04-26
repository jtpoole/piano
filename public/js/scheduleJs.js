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

function showLessons(){
	for(var item of arr){
		lessonsListDiv.innerHTML += `<div class="row">
			<div class="col-md-3 text-center">
				<h3>${lesson.date}</h3>
			</div> 
			<div class="col-md-3 text-center">
				 <h3>${lesson.time}</h3> 
			</div>
			<div class="col-md-3 text-center">
				<h3>${lesson.available}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<button class="btn btn-primary">Schedule</button>
			</div>
			</div>`;

	}

}

function registerButtonEvents() {
	let buttons = document.getElementsByTagName("button");
	for(let i=0; i<arr.length; i++) {
		buttons[i].addEventListener("click", function () {
			addToCart(i);
		});
	}
	let number = localStorage.getItem("number");
	if (number == null)
		number = 0;
	document.getElementById("numItems").innerHTML = number;
}