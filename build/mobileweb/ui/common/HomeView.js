function HomeView(navController) {
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		layout:'vertical'
	});
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	var image = Ti.UI.createImageView({
  	image:'/images/logo.png'
	});
	self.add(image);
	self.open();
	
	var button = Ti.UI.createButton({
		width: 250,
		backgroundColor: '#003366',
		color: 'white',
		borderRadius: 7,
		height:150,
		title:'Create New Meetup'
	});
	
	button.addEventListener('click', function() {
		var CreateNewMeetupWindow = require("ui/common/CreateNewMeetupWindow");
		navController.open(new CreateNewMeetupWindow(navController));
	});
	self.add(button);
	
	var btnViewAllMeetups = Ti.UI.createButton({
		title : 'View All Meet-ups',
		width: 250,
		backgroundColor: '#003366',
		color: 'white',
		height:150,
		borderRadius: 7,
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
