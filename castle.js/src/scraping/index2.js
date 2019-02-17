var michelin =  require ( './michelin.js' );
var jsonfile =  require ( 'jsonfile' );

jsonfile.readFile('output/Restaurants.json',function(err,restaurants){

  michelin.getAllAddresses(restaurants);
});
