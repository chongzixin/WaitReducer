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
		text : '',
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
	
	// get event id from CreateNewMeetupWindow
	var eventId;
	self.addEventListener('meetupSelected', function(e) {
		eventId = e.id;
		lblRequestSentMsg.text = "Your request has been sent to " + e.friendName;
	});

	btnViewMeetup.addEventListener('click', function() {
		var ViewMeetupWindow = require("ui/common/ViewMeetupWindow");
		var viewMeetupWindow = new ViewMeetupWindow(navController);
		viewMeetupWindow.fireEvent('meetupSelected', {id : eventId});
		navController.open(viewMeetupWindow);
	});
	self.add(btnViewMeetup);
	
	var btnHome = Ti.UI.createButton({
		title : 'Home',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	// bring user back home
	btnHome.addEventListener('click', function() {
		navController.home();
	});
	self.add(btnHome);

	return self;
};

module.exports = RequestSentWindow;
