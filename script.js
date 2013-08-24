
console.log('running script');

$('#myForm').submit(function(event){
    var name = $('#name').val();
    var age = $('#age').val();
    var dataString = 'Name: ' + name + ' Age: ' + age;

    $.ajax({  
	type: "POST",  
	url: "/formhandler",  
	data: {"name":name, "age": age},  
//	contentType: "application/json",
//	dataType: "json",
//	data: "{'name':'" + name + "', 'age':'" + age + "'}",
	success: function() {  
	    //display message back to user here  
	}  
    });  
    event.preventDefault();
//    return false;
});
