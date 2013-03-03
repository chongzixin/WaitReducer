function ViewMeetupWindow(navController) {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	
	var self = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : 'white'
	});

	self.addEventListener('meetupSelected', function(e) {
		//alert('location selected event');
		eventId = e.id;

		Cloud.Events.show({
			event_id : eventId
		}, function(e) {
			lblYouAreMeeting.text = "You are meeting " + e.events[0].name;
			lblDetails.text = "Details: " + e.events[0].details;
		});
	});

	var lblYouAreMeeting = Ti.UI.createLabel({
		color : 'black',
		text : 'Now Loading...',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblYouAreMeeting);
	
	var lblDetails = Ti.UI.createLabel({
		color : 'black',
		text : 'Details...',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblDetails);

	var lblMAP = Ti.UI.createLabel({
		color : 'green',
		text : 'MAP VIEW IS HERE!',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontWeight : 'bold',
			fontSize : 50
		},
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblMAP);

	var lblStatus = Ti.UI.createLabel({
		color : 'blue',
		text : 'Status: Not in Range',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblStatus);

	var lblStatusMsg = Ti.UI.createLabel({
		color : 'black',
		text : 'Your friend is not within the specified range. Check back again later!',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblStatusMsg);

	var btnEdit = Ti.UI.createButton({
		title : 'Edit',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	btnEdit.addEventListener('click', function() {
		// Check console
		Ti.API.info('User clicked the button ');
		//var RequestSentWindow = require("ui/common/RequestSentWindow");
		//navController.open(new RequestSentWindow(navController));
	});
	self.add(btnEdit);

	return self;
};

module.exports = ViewMeetupWindow;
