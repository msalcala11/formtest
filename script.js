var name = $('#name').val();
var age = $('#age').val();
var dataString = 'Name: ' + name + 'Age: ' + age;

console.log('running script');

$('#myForm').submit(function(event){
    $.ajax({  
	type: "POST",  
	url: "/formhandler",  
	data: dataString,  
	success: function() {  
	    //display message back to user here  
	}  
    });  
    event.preventDefault();
//    return false;
});
