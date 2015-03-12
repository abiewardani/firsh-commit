var http = require('http');
var url = require('url');
var interval = "";


function renderView(request,response){	
	interval = setInterval(function(i) {   
       responseInterval(i);
    }, 1000);
	response.end();
}

function responseInterval(i){
	var request = require("request"); 
	request("http://localhost/test/abi.php", function(error, response, body) {
	  var info = JSON.parse(body);
	  console.log(info.message);
	  if(info.message == "succes") deleteInterval(); 
	});
}

function deleteInterval(){
	clearInterval(interval);
}

function render404(request,response){
	response.writeHead(404);
	response.end("Page not found");
}

var server = http.createServer(function(request,response){
	var newPost = new RegExp('^/post/new/?$');
	var pathname = url.parse(request.url).pathname;
	if(newPost.test(pathname)){
		renderView(request,response)
	}else{
		render404(request,response);
	}
})

server.listen(8000);
console.log('Listening on http://127.0.0.1:8000')