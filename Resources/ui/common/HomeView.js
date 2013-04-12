function HomeView(navController) {
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		layout:'vertical',
	});
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml

	var image = Ti.UI.createImageView({
  	image:'/images/logo.png'
	});
	self.add(image);
	self.open();
	
	var button = Ti.UI.createButton({
		width: 275,
		top:0,
		font: { fontSize:25 },
		backgroundColor: '#003366',
		color: 'white',
		borderRadius: 8,
		height:60,
		title:'Create New Meetup',
	});
	
	button.addEventListener('click', function() {
		var CreateNewMeetupWindow = require("ui/common/CreateNewMeetupWindow");
		navController.open(new CreateNewMeetupWindow(navController));
	});
	self.add(button);
	
	var btnViewAllMeetups = Ti.UI.createButton({
		title : 'View All Meetups',
		top: 50,
		width: 275,
		font: { fontSize:25 },
		backgroundColor: '#003366',
		color: 'white',
		height:60,
		borderRadius: 8,
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
