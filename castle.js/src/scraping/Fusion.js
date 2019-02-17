var fs = require('fs');
var hotel_resto = require('./output/Hotel_Restaurant.json');
var resto = require('./output/Restaurants_list.json'); 
var json_final=[];
	// now compare their keys and values
	for(var i=0;i<hotel_resto.length;i++){
		for(var j=0; j<resto.length; j++) {
			if(hotel_resto[i].name===resto[j].name) {
				json_final.push({"hotel Name ": hotel_resto[i].name,"hotel Price":hotel_resto[i].price,"Resaurant":resto[j]})
		}

	}
}

fs.writeFileSync('output/Final_List.json',JSON.stringify(json_final));
console.log(json_final);