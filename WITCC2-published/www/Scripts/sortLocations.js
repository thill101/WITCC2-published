(function() {

	function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
				+ Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
				* Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return Math.round(d);
	}

	function getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
				+ Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
				* Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return Math.round(d / 1.609);
	}
	function deg2rad(deg) {
		return deg * (Math.PI / 180)
	}

	function compare(a, b) {
		return a.distance - b.distance;
	}

	function round(a) {
		return Math.round(a * 10) / 10;
	}

	var geolocationService = RocketMobileApplication.getEntity("Geolocation");

	function callback() {
		var currentLocation = {
			lat : RocketMobileApplication.getEntity("Geolocation").getProperty(
					'latitude'),
			lon : RocketMobileApplication.getEntity("Geolocation").getProperty(
					'longitude')
		};
		var officeLocationsVar = RocketMobileApplication
				.getEntity("officeLocations");
		var officeLocations = officeLocationsVar.getValue();
		var myLocation = currentLocation;
		var myLon = myLocation.lon, myLat = myLocation.lat;
		for (var i = 0; i < officeLocations.length; i++) {
			var lat = officeLocations[i].Lat;
			var lon = officeLocations[i].Lon;
			officeLocations[i].distance = round(getDistanceFromLatLonInMiles(
					myLat, myLon, lat, lon));
			officeLocations[i].display = officeLocations[i].Name + " ("
					+ officeLocations[i].distance + " mi)";
		}
		officeLocations.sort(compare);
		officeLocationsVar.setValue(officeLocations);
		fillListItems(officeLocations);		
		geolocationService.setProperty("watchPosition", false);		
	}

	var callbackFunction = function() {
		callback();
	}
	
	function fillListItems(officeLocations) {				
		var titles = [];
		var subtitles = [];
		for (var i = 0; i < officeLocations.length; i++) {
			titles[i] = officeLocations[i].display;
			subtitles[i] = officeLocations[i].Address1;
		}				
		RocketMobileApplication.getEntity("List1").setProperty("itemTitles",
				titles);
		RocketMobileApplication.getEntity("List1").setProperty("itemSubtitles",
				subtitles);
	}

	if (geolocationService.getProperty("errorCode") == -1) {
		callback();
	} else {
		var officeLocationsVar = RocketMobileApplication
				.getEntity("officeLocations");
		var officeLocations = officeLocationsVar.getValue();
		for (var i = 0; i < officeLocations.length; i++) {
			officeLocations[i].display = officeLocations[i].Name;
		}
		officeLocationsVar.setValue(officeLocations);
		fillListItems(officeLocations);
		geolocationService.once("update", callbackFunction);
	}

})();
