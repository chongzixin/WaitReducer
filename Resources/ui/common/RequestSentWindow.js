//CreateNewMeetUpView Component Constructor
function RequestSentWindow(navController) {
	var self = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor:'white'
	});

	var lblRequestSent = Ti.UI.createLabel({
		color : 'black',
		text : 'Request Sent!',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontWeight : 'bold',
			fontSize : 25
		},
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblRequestSent);
	
	var lblRequestSentMsg = Ti.UI.createLabel({
		color : 'black',
		text : 'Your request has been sent to Daniel',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		font : {
			fontWeight : 'bold',
			fontSize : 18
		},
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblRequestSentMsg);

	var btnViewMeetup = Ti.UI.createButton({
		title : 'View Meetup',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	btnViewMeetup.addEventListener('click', function() {
		// Check console
		Ti.API.info('User clicked the button ');
		//navController.openFromHome(new TestWindow(navController));
	});
	self.add(btnViewMeetup);
	
	var btnHome = Ti.UI.createButton({
		title : 'Home',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	btnHome.addEventListener('click', function() {
		// Check console
		Ti.API.info('User clicked the button ');
		navController.home();
	});
	self.add(btnHome);

	return self;
};

module.exports = RequestSentWindow;
