var startAt = RocketMobileApplication.getEntity("supportCasesStart");
var offset = parseInt(startAt.getValue());
var supportCases = RocketMobileApplication.getEntity("SupportCases");
var response = supportCases.getProperty("response");
var total = response.total;

var previousButton = RocketMobileApplication.getEntity("PreviousButton");
if (offset > 0) {
	previousButton.setProperty("enabled", true);
} else {
	previousButton.setProperty("enabled", false);
}


var nextButton = RocketMobileApplication.getEntity("NextButton");

if (total <= offset + 10) {	
	nextButton.setProperty("enabled", false);
} else{
	nextButton.setProperty("enabled", true);	
}


