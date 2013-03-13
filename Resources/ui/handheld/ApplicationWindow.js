function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title : title,
		backgroundColor : 'white'
	});

	var NavigationController = require('NavigationController')
	var HomeView = require("ui/common/HomeView");

	var controller = new NavigationController();
	var homeView = new HomeView(controller);
	controller.open(homeView);

	return self;
};

module.exports = ApplicationWindow;
