var direBonjour = function(){
	console.log('Salut !');
}

var direAuRevoir = function(){
	console.log('Au revoir !');
}

exports.direBonjour = direBonjour;
exports.direAuRevoir = direAuRevoir;

exports.dire = function(message){
	console.log(message);
}