function ViewMeetupWindow(navController) {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	var self = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : 'white'
	});

	function notifyAccept(e) {
		Cloud.PushNotifications.notify({
			channel : 'sally',
			to_ids : '5163edda3aaf9b61680ebac6',
			payload : {
				'title' : 'Accepted' + " " + e.toString(),
				'alert' : 'MeetUp Accepted by Daniel'
			}
		}, function(d) {
			if (e.success) {

			} else {
				//	alert('Error:\\n' + ((d.error && d.message) || JSON.stringify(d)));
			}
		});
	}

	function notifyDecline(e) {
		Cloud.PushNotifications.notify({
			channel : 'sally',
			to_ids : '5163edda3aaf9b61680ebac6',
			payload : {
				'title' : 'Declined ' + e,
				'alert' : 'MeetUp Declined by Daniel'
			}
		}, function(d) {
			if (e.success) {

			} else {
				//	alert('Error:\\n' + ((d.error && d.message) || JSON.stringify(d)));
			}
		});

	}

	var eventId = '';
	var meetingMessage='vvv';
	self.addEventListener('meetupSelected', function(e) {
		//alert('location selected event');
		eventId = e.id;
		Cloud.Events.show({
			event_id : eventId
		}, function(e) {
			statusId = e.events[0].id;
			var user = e.events[0].user.id;
			var wholeDetail = e.events[0].name;
			var detail = wholeDetail.split(" @ ");
			var meetingPerson = detail[0].toString();
			var place = detail[1].toString();
			if (user == '5163edc23aaf9b61680eba6e'){		
				meetingMessage = wholeDetail;
			}
			else{
				meetingMessage = "Sally@" + place;
			}
			lblYouAreMeeting.text = meetingMessage;
			lblDetails.text = "Details: " + e.events[0].details;
			var status = e.events[0].custom_fields.status;
			if ((status == 0) && (user == '5163edda3aaf9b61680ebac6')) {
				var statusAlert = Titanium.UI.createAlertDialog({
					title : 'Accept/Decline',
					message : "Sally@" + place + " with proximity time of " + e.events[0].custom_fields.time + " minutes.",
					buttonNames : ['Accept', 'Decline'],
					cancel : 2
				});

				statusAlert.addEventListener('click', function(e) {
					Titanium.API.info('e = ' + JSON.stringify(e));
					//	if (e.cancel === e.index || e.cancel === true) {
					//	return;
					//}
					//now you can use parameter e to switch/case
					switch(e.index) {
						case 0:
							Titanium.API.info('Clicked button 0 (Yes)');
							//alert("accept");
							notifyAccept(eventId);
							break;
						case 1:
							notifyDecline(eventId);
							break;

						default:
							break;

					}
				});
				statusAlert.show();
			}

			addAnno = Titanium.Map.createAnnotation({
				latitude : e.events[0].place.latitude,
				longitude : e.events[0].place.longitude,
				title : e.events[0].place.name,
				subtitle : e.events[0].place.details,
				pincolor : Titanium.Map.ANNOTATION_RED,
				animate : true,
				draggable : false
			});
			mapview.addAnnotation(addAnno);
			mapview.selectAnnotation(addAnno);
			annoAdded = true;

			var inRange = e.events[0].custom_fields.inRange;

			if (inRange) {
				lblStatus.text = "Status: In Range";
				lblStatusMsg.text = "Your friend is now in range. Please proceed to the meeting point soon."

				friendAnno = Titanium.Map.createAnnotation({
					latitude : e.events[0].custom_fields.lat,
					longitude : e.events[0].custom_fields.lng,
					title : e.events[0].custom_fields.friendName,
					pincolor : Titanium.Map.ANNOTATION_BLUE,
					animate : true,
					draggable : false
				});
				mapview.addAnnotation(friendAnno);
			}
		});

		var lblYouAreMeeting = Ti.UI.createLabel({
			color : 'black',
			top : 5,
			font : {
				fontSize : 23
			},
			text : 'Now Loading...',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		});
		self.add(lblYouAreMeeting);

		var lblDetails = Ti.UI.createLabel({
			color : 'black',
			text : 'Details...',
			font : {
				fontSize : 18
			},
			top : 7,
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		});
		self.add(lblDetails);

		var mapview = Titanium.Map.createView({
			mapType : Titanium.Map.STANDARD_TYPE,
			region : {
				latitude : 1.29686,
				longitude : 103.85220,
				latitudeDelta : 0.01,
				longitudeDelta : 0.01
			},
			animate : true,
			width : Ti.UI.FILL,
			top : 10,
			height : 390,
			regionFit : false,
			userLocation : true
		});
		self.add(mapview);

		var lblStatus = Ti.UI.createLabel({
			top : 7,
			font : {
				fontSize : 32,
				fontWeight : 'bold'
			},
			color : 'blue',
			text : 'Status: Not in Range',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		});
		self.add(lblStatus);

		var lblStatusMsg = Ti.UI.createLabel({
			color : 'black',
			font : {
				fontSize : 18
			},
			top : 7,
			text : 'Your friend is not within the specified range. Check back again later!',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		});
		self.add(lblStatusMsg);

		var btnEdit = Ti.UI.createButton({
			title : 'Edit',
			font : {
				fontSize : 25
			},
			width : 150,
			top : 7,
			backgroundColor : '#003366',
			color : 'white',
			borderRadius : 8,
			height : 60,
		});

		btnEdit.addEventListener('click', function() {
			// Check console
			Ti.API.info('User clicked the button ');
			var EditMeetup = require("ui/common/EditMeetup");
			var editMeetup = new EditMeetup(navController);
			editMeetup.fireEvent('editMeetup', {
				id : eventId
			});
			navController.open(editMeetup);
		});

		self.add(btnEdit);

	});
	return self;
};

module.exports = ViewMeetupWindow;
