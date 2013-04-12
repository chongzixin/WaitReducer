//CreateNewMeetUpView Component Constructor
function RequestSentWindow(navController) {
	var self = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor:'white'
	});

	var image = Ti.UI.createImageView({
  	image:'/images/successTick.png'
	});
	self.add(image);
	
	var lblRequestSent = Ti.UI.createLabel({
		color : 'black',
		text : 'Request Sent!',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontWeight : 'bold',
			fontSize : 40
		},
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblRequestSent);
	
	var lblRequestSentMsg = Ti.UI.createLabel({
		top:40,
		color : 'black',
		text : '',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontWeight : 'bold',
			fontSize : 20
		},
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblRequestSentMsg);

	var btnViewMeetup = Ti.UI.createButton({
		title : 'View Meetup Details',
		width: 275,
		top:30,
		font: { fontSize:25 },
		backgroundColor: '#003366',
		color: 'white',
		borderRadius: 8,
		height:70,
	});
	
	// get event id from CreateNewMeetupWindow
	var eventId;
	self.addEventListener('meetupSelected', function(e) {
		eventId = e.id;
		lblRequestSentMsg.text = "Your request has been sent to " + e.friendName + ".";
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
		top: 50,
		width: 275,
		font: { fontSize:25 },
		backgroundColor: '#003366',
		color: 'white',
		height:70,
		borderRadius: 8,
	});

	// bring user back home
	btnHome.addEventListener('click', function() {
		navController.home();
	});
	self.add(btnHome);

	return self;
};

module.exports = RequestSentWindow;
