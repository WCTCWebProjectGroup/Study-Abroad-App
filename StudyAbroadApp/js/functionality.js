$(function(){
	$('#wctcInstructorB').hide();
	$('#wctcStudentB').hide();
	$('#madisonInstructorB').hide();
	$('#madisonStudentB').hide();
	$('#wctcStudents').hide();
	$('#wctcInstructors').hide();
	$('#madisonStudents').hide();
	$('.madisonStudent').hide();
	$('.madisonStudentBtn').hide();
	$('.madisonInstructor').hide();
	$('.madisonInstructorBtn').hide();
	$('.wctcInstuctorBtn').hide();
	$('.wctcInstructor').hide();
	$('.wctcStudent').hide();
	$('.wctcStudentBtn').hide();
	
	//WCTC School Button
	$('#wctcBtn').click(function(){
		$('#wctcInstructorB').toggle("slow");
		$('#wctcStudentB').toggle("slow");
		$('#madisonInstructorB').hide("slow");
		$('#madisonStudentB').hide("slow");
		$('#wctcStudents').hide("slow");
		$('#wctcInstructors').hide("slow");
		$('#madisonStudents').hide();
		$('.madisonStudentBtn').hide("slow");
		$('.madisonStudent').hide("slow");
		$('.madisonInstructorBtn').hide("slow");
		$('.madisonInstructor').hide("slow");
		$('.wctcStudentBtn').hide("slow");
		$('.wctcStudent').hide("slow");
		$('.wctcInstuctor').hide("slow");
		$('.wctcInstuctorBtn').hide("slow");
	});
	
	//Madison School Button
	$('#madisonBtn').click(function(){
		$('#madisonInstructorB').toggle("slow");
		$('#madisonStudentB').toggle("slow");
		$('#wctcInstructorB').hide("slow");
		$('#wctcStudentB').hide("slow");
		$('#wctcStudents').hide("slow");
		$('#wctcInstructors').hide("slow");
		$('#madisonStudents').hide();
		$('.madisonStudentBtn').hide("slow");
		$('.madisonStudent').hide("slow");
		$('.madisonInstructorBtn').hide("slow");
		$('.madisonInstructor').hide("slow");
		$('.wctcStudentBtn').hide("slow");
		$('.wctcStudent').hide("slow");
		$('.wctcInstuctor').hide("slow");
		$('.wctcInstuctorBtn').hide("slow");
	});
	
	//WCTC Instuctors Button
	$('#wctcInstructorB').click(function(){
		console.log("WCTC Insuctor");
		$('#wctcInstructors').toggle("slow");
		$('#wctcStudents').hide("slow");
		$('#madisonInstructorB').hide("slow");
		$('#madisonStudentB').hide("slow");
		$('.madisonStudents').hide("slow");
		$('.wctcInstructor').hide("slow");
		$('.wctcStudent').hide("slow");
		$('.wctcStudentBtn').hide("slow");
		$('.wctcInstuctorBtn').toggle("slow");
	});
	
	//Individual WCTC Insctuctors
	$('.wctcInstuctorBtn').click(function(){
		var thisId = this.id.substring(0, this.id.length-1);
		console.log(thisId);
		var visible = $('#' + thisId).is(":visible");
		$('.wctcStudent').hide("slow");
		$('.wctcInstructor').hide("slow");
		if(visible){
			$('#' + thisId).hide("slow");
		}else{
			$('#' + thisId).show("slow");
		}
	});
	
	//WCTC Student Button
	$('#wctcStudentB').click(function(){
		console.log("click");
		$('#wctcStudents').toggle("slow");
		$('#wctcInstructors').hide("slow");
		$('.wctcInstructorBtn').hide("slow");
		$('.wctcStudent').hide("slow");
		$('.wctcStudentBtn').toggle("slow");
	});
	
	//Individual Student Buttons
	$('.wctcStudentBtn').click(function(){
		var thisId = this.id.substring(0, this.id.length-1);
		console.log(thisId);
		var visible = $('#' + thisId).is(":visible");
		$('.wctcStudent').hide("slow");
		if(visible){
			$('#' + thisId).hide("slow");
		}else{
			$('#' + thisId).show("slow");
		}
		$('.wctcInstructor').hide("slow");
		$('.wctcInstructorBtn').hide("slow");
	});
	
	//Madison Instuctors Button
	$('#madisonInstructorB').click(function(){
		console.log("Madison INsuctor");
		$('#wctcInstructorB').hide("slow");
		$('#wctcStudentB').hide("slow");
		$('#madisonStudents').hide("slow");
		$('.madisonInstructor').hide("slow");
		$('.madisonStudent').hide("slow");
		$('.madisonStudentBtn').hide("slow");
		$('.madisonInstructorBtn').toggle("slow");
	});
	
	//Individual Madison Instuctors
	$('.madisonInstructorBtn').click(function(){
		var thisId = this.id.substring(0, this.id.length-1);
		console.log(thisId);
		var visible = $('#' + thisId).is(":visible");
		$('.madisonStudent').hide("slow");
		$('.madisonInstructor').hide("slow");
		if(visible){
			$('#' + thisId).hide("slow");
		}else{
			$('#' + thisId).show("slow");
		}
	});
	
	//Madison Student Buttons
	$('#madisonStudentB').click(function(){
		$('.madisonInstructor').hide("slow");
		$('.madisonInstructorBtn').hide("slow");
		$('.madisonStudent').hide("slow");
		$('.madisonStudentBtn').toggle("slow");
	});
	
	//Individual Madison Student Buttons
	$('.madisonStudentBtn').click(function(){
		var thisId = this.id.substring(0, this.id.length-1);
		console.log(thisId);
		var visible = $('#' + thisId).is(":visible");
		$('.madisonStudent').hide("slow");
		if(visible){
			$('#' + thisId).hide("slow");
		}else{
			$('#' + thisId).show("slow");
		}
		$('.madisonInstructor').hide("slow");
		$('.madisonInstructorBtn').hide("slow");
	});
	
});

