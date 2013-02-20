function HomeView(navController) {
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		layout:'vertical'
	});
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Wait Reducer Logo',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontWeight : 'bold',
			fontSize : 50
		},
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	self.add(label);
	
	var button = Ti.UI.createButton({
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		title:'Create New Meetup'
	});
	
	button.addEventListener('click', function() {
		var CreateNewMeetupWindow = require("ui/common/CreateNewMeetupWindow");
		navController.open(new CreateNewMeetupWindow(navController));
	});
	self.add(button);
	
	var btnViewAllMeetups = Ti.UI.createButton({
		title : 'View All Meet-ups',
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL
	});

	// view all meet ups button
	btnViewAllMeetups.addEventListener('click', function() {
		var ViewAllMeetupWindow = require("ui/common/ViewAllMeetupWindow");
		navController.open(new ViewAllMeetupWindow(navController));
	});
	self.add(btnViewAllMeetups);
	
	return self;
};

module.exports = HomeView;
