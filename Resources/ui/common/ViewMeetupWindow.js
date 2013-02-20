function ViewMeetupWindow(navController) {
	var self = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : 'white'
	});
	
	var lblYouAreMeeting = Ti.UI.createLabel({
		color : 'black',
		text : 'You are meeting Daniel at Plaza Singapura.',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblYouAreMeeting);
	
	var lblMAP = Ti.UI.createLabel({
		color : 'grey',
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
