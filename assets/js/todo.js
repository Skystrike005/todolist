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