var xhttp = new XMLHttpRequest();

//Check off specific todo by clicking
$("ul").on("click", "li",  function(){

	$(this).toggleClass("completed");
	var status = $(this).hasClass("completed");
	
	xhttp.open("POST", "/"+$(this).children("span").attr("id")+"/"+status, true);
	xhttp.send();
	
})

//Click X to remove item
$("ul").on("click", "li span", function(event){
	$(this).parent().fadeOut(500, function(){
		xhttp.open("DELETE", "/"+$(this).children("span").attr("id"), true);
		xhttp.send();
		$(this).remove();
	});
	event.stopPropagation();
})

// $("input[type='text']").keypress(function(event){
// 	if(event.which === 13){
// 		var todoText = $(this).val();
// 		$("ul").append("<li><span><i class='fa fa-trash'></i></span> "+todoText+"</li>");
// 		$(this).val("");
// 	}
// })

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
})

$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});
