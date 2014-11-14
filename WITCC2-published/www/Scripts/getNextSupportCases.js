var startAt = RocketMobileApplication.getEntity("supportCasesStart");
var offset = parseInt(startAt.getValue()) + 10;
startAt.setValue(offset);