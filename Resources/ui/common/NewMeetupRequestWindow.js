function NewMeetupRequest(navController) {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	
	var self = Ti.UI.createWindow({
		title: 'New Meet-up Request',
		layout : 'vertical',
		backgroundColor : 'white'
	});
	
	
	var lblContact = Ti.UI.createLabel({
		color: '#003366',
		top:50,
		text : 'Sally',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontWeight : 'bold',
			fontSize : 40
		},width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblContact);
	
	var lblRequestMsg = Ti.UI.createLabel({
		color : 'black',
		text : 'has requested to meet you at',
		font: { fontSize:22 },
		top:15,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblRequestMsg);
	
	var lblContact = Ti.UI.createLabel({
				color: '#003366',
		top:15,
		text : 'Plaza Singapura',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontWeight : 'bold',
			fontSize : 40
		},
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	self.add(lblContact);

	function notifyAccept(){
		Cloud.PushNotifications.notify({
		 channel: 'sally',
   		 to_ids: '5131902446b9426028043bfc',
	     payload: { 'title': 'Accepted',
	    	 		'alert': 'MeetUp Accepted by Daniel'
	    	 	  } 
		}, function (d) {
	    			if (e.success) {
	        		
	    	} else {
	        	alert('Error:\\n' +
	           	((d.error && d.message) || JSON.stringify(d)));
	    	}
		});
	}
	
	function notifyDecline(){
		Cloud.PushNotifications.notify({
		 channel: 'sally',
   		 to_ids: '5131902446b9426028043bfc',
	     payload: { 'title': 'Accepted',
	    	 		'alert': 'MeetUp Declined by Daniel'
	    	 	  } 
		}, function (d) {
	    			if (e.success) {
	        		
	    	} else {
	        	alert('Error:\\n' +
	           	((d.error && d.message) || JSON.stringify(d)));
	    	}
		});
		
	}


	var lblStatusMsg = Ti.UI.createLabel({
	color : 'black',
		text : 'and wants to be notified when you are 10 minutes away.',
		font: { fontSize:22 },
		top:15,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
		});
	self.add(lblStatusMsg);

	
	
	var btnAccept = Ti.UI.createButton({
		title : 'Accept',
		top: 70,
		width: 275,
		font: { fontSize:25 },
		backgroundColor: '#00cc00',
		color: 'white',
		height:60,
		borderRadius: 8,
	});


	btnAccept.addEventListener('click', function() {
		// Check console
		Ti.API.info('User clicked the button ');
		notifyAccept();
		var ViewAllMeetupWindow = require("ui/common/ViewAllMeetupWindow");
		navController.open(new ViewAllMeetupWindow(navController));
		//var RequestSentWindow = require("ui/common/RequestSentWindow");
		//navController.open(new RequestSentWindow(navController));
	});
	self.add(btnAccept);

var btnDecline = Ti.UI.createButton({
	title : 'Decline',
		top: 40,
		width: 275,
		font: { fontSize:25 },
		backgroundColor: '#cc0033',
		color: 'white',
		height:60,
		borderRadius: 8,
	});

	btnDecline.addEventListener('click', function() {
		// Check console
		Ti.API.info('User clicked the button ');
		notifyDecline();
		var ViewAllMeetupWindow = require("ui/common/ViewAllMeetupWindow");
		navController.open(new ViewAllMeetupWindow(navController));
		//var RequestSentWindow = require("ui/common/RequestSentWindow");
		//navController.open(new RequestSentWindow(navController));
	});
	self.add(btnDecline);

	return self;
};

module.exports = NewMeetupRequest;
