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
				lblStatusMsg.text = "Your friend is now in range. Proceed to meeting point soon."

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
		height : 400,
		regionFit : false,
		userLocation : true
	});
	self.add(mapview);

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
		var EditMeetup = require("ui/common/EditMeetup");
		var editMeetup = new EditMeetup(navController);	
		editMeetup.fireEvent('editMeetup', {id : eventId});
		navController.open(editMeetup);	
	});
	
	self.add(btnEdit);
});
	return self;
};

module.exports = ViewMeetupWindow;
