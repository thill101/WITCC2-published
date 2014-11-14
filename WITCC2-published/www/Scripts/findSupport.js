(function () {

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }    
    
    function compare(a, b) {
    	return a.distance - b.distance;
    }
    
    function findSupportLocation() {
    	 var currentLocation = {
    		        lat: RocketMobileApplication.getEntity("Geolocation").getProperty('latitude'),
    		        lon: RocketMobileApplication.getEntity("Geolocation").getProperty('longitude')
    		    };    		    
    		    var geolocationService = RocketMobileApplication.getEntity("Geolocation").setProperty("watchPosition", false);    
    		    
    		    var supportNumbersVar = RocketMobileApplication.getEntity("supportNumbers"); 
    		    var officeLocations = supportNumbersVar.getValue();
    		    var myLocation = currentLocation;
    		    var myLon = myLocation.lon, myLat = myLocation.lat;
    		    for (var i = 0; i < officeLocations.length; i++) {
    		    	var lat = officeLocations[i].lat;
    		    	var lon = officeLocations[i].lon;
    		    	officeLocations[i].distance = getDistanceFromLatLonInKm(myLat, myLon, lat, lon);
    		    }
    		    officeLocations.sort(compare);
    		    supportNumbersVar.setValue(officeLocations);
    		    RocketMobileApplication.getEntity("favoriteSupportNumber").setValue(officeLocations[0]);
    		    var favoriteSupportNumber = RocketMobileApplication.getEntity("favoriteSupportNumber").getValue();
    		    RocketMobileApplication.getEntity("Label1").setProperty("value", '<span class=\"rocket-title\">' + favoriteSupportNumber.country + '</span>');
    		    RocketMobileApplication.getEntity("TollFree_Number_Label").setProperty("value", 'Toll-free: <a href="tel:' + favoriteSupportNumber.tollFreeNumber + '">' + favoriteSupportNumber.tollFreeNumber + '</a>');    		    
    		    RocketMobileApplication.getEntity("Local_Number_Label").setProperty("value", 'Local: <a href="tel:' + favoriteSupportNumber.localNumber + '">' + favoriteSupportNumber.localNumber + '</a>');
    		    if (favoriteSupportNumber.localNumber == '') {
    		    	RocketMobileApplication.getEntity("Local_Number_Label").hide();
    		    }
    }
    
    setTimeout(findSupportLocation, 500);
   
})();
