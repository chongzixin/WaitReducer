function NewMeetupRequest(navController) {
	var self = Ti.UI.createWindow({
		title: 'New Meet-up Request',
		layout : 'vertical',
		backgroundColor : 'white'
	});
	
	var lblContact = Ti.UI.createLabel({
		color : 'blue',
		text : 'Sally',
		font : {
			fontWeight : 'bold',
			fontSize : 50
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblContact);
	
	var lblRequestMsg = Ti.UI.createLabel({
		color : 'black',
		text : 'has requested to meet you at',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblRequestMsg);
	
	var lblContact = Ti.UI.createLabel({
		color : 'blue',
		text : 'Plaza Singapura',
		font : {
			fontWeight : 'bold',
			fontSize : 50
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblContact);
	
	var lblStatusMsg = Ti.UI.createLabel({
		color : 'black',
		text : 'and wants to be notified when you are 10 mins away.',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblStatusMsg);

	var btnDecline = Ti.UI.createButton({
		title : 'Decline',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	btnDecline.addEventListener('click', function() {
		// Check console
		Ti.API.info('User clicked the button ');
		//var RequestSentWindow = require("ui/common/RequestSentWindow");
		//navController.open(new RequestSentWindow(navController));
	});
	self.add(btnDecline);
	
	var btnAccept = Ti.UI.createButton({
		title : 'Accept',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	btnAccept.addEventListener('click', function() {
		// Check console
		Ti.API.info('User clicked the button ');
		//var RequestSentWindow = require("ui/common/RequestSentWindow");
		//navController.open(new RequestSentWindow(navController));
	});
	self.add(btnAccept);

	return self;
};

module.exports = NewMeetupRequest;
