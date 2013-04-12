function DeleteMeetupWindow(navController) {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	var self = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : 'white'
	});	
	
	self.addEventListener('deleteMeetup', function(e) {
		alert(e.id);
		eventId = e.id;
		Cloud.Events.remove({
	   		event_id: eventId
		}, function (e) {
		    if (e.success) {
		      //  alert('Removed');
		        var ViewAllMeetupWindow = require("ui/common/ViewAllMeetupWindow");
				navController.open(new ViewAllMeetupWindow(navController));
		    } else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    };
		});    
	});

	return self;
	
};
module.exports = DeleteMeetupWindow;


