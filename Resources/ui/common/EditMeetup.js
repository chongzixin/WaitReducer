function EditMeetup(navController) {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	var self = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : 'white'
	});	
	
	var eventId;
	self.addEventListener('editMeetup', function(e) {
		//alert(e.id);
		eventId = e.id;
		
		Cloud.Events.show({
			event_id : eventId
		}, function(e) {
			var contactsField = Ti.UI.createTextField({
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			color : '#336699',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			value : e.events[0].custom_fields.friendName
		});
		self.add(contactsField);
		
		var btnContact = Ti.UI.createButton({
			title : 'Select Contact',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		});

		var friendMobile;
		contactsField.addEventListener('click', function() {
			var params = {
				fields : ['phone']
			};
	
			params.selectedPerson = function(e) {
				alert('e: ' + JSON.stringify(e));
				if (e.person.phone) {
					for (type in e.person.phone) {
						if (e.person.phone[type].length > 0) {
							//contactsField.value = e.person.phone[type][0];
							contactsField.value = e.person.fullName;
							friendMobile = e.person.phone[type][0];
						}
					}
				} else {
					Ti.API.info('no email on contact');
					contactsField.value = '';
				}
			}
			Ti.Contacts.showContacts(params);
		});
		
		var locationDetails = e.events[0].name;
		var locationName = locationDetails.split('@ ')[1];
		var locationField = Ti.UI.createTextField({
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			color : '#336699',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			value : locationName
		});
		
		var locationId = '';
		locationField.addEventListener('click', function() {
			var SelectLocationWindow = require("ui/common/SelectLocationWindow");
			var selectLocationWindow = new SelectLocationWindow(navController);
			selectLocationWindow.addEventListener('locationSelected', function(e) {
				locationField.value = e.location;
				locationId = e.id;
			});
			navController.open(selectLocationWindow);
		});
		self.add(locationField);

		var descriptionField = Ti.UI.createTextField({
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			color : '#336699',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			value : e.events[0].details
		});
		self.add(descriptionField);

		var lblNotifyMe = Ti.UI.createLabel({
			color : 'black',
			text : 'Notify me when s/he is',
			textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		});
		self.add(lblNotifyMe);

		// start picker
		var picker = Ti.UI.createPicker({
			top : 50,
			useSpinner : true
		});
		picker.selectionIndicator = true;
	
		var tens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		var ones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		var column1 = Ti.UI.createPickerColumn();
	
		for (var i = 0, ilen = tens.length; i < ilen; i++) {
			var row = Ti.UI.createPickerRow({
				title : tens[i]
			});
			column1.addRow(row);
		}

		var column2 = Ti.UI.createPickerColumn();
		for (var i = 0, ilen = ones.length; i < ilen; i++) {
			var row = Ti.UI.createPickerRow({
				title : ones[i]
			});
			column2.addRow(row);
		}
		picker.add([column1, column2]);
		self.add(picker);
		
		// end picker
		var btnGo = Ti.UI.createButton({
			title : 'Go',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		});
		
		btnGo.addEventListener('click', function() {
			// create new event
			var eventName = contactsField.value + " @ " + locationField.value;
			var custom = JSON.stringify({
				"friendName" : contactsField.value,
				"status" : 0,
				"time" : 10,
				"inRange" : false,
				"lat" : "1.29229",
				"lng" : "103.84955"
			});

			var data = {
				id : eventId,
				name : eventName,
				start_time : new Date(Date.parse("Dec 31, 2015")),
				details : descriptionField.value,
				place_id : locationId,
				custom_fields : custom
			};
	
			Cloud.Events.update({
				event_id: eventId, 
				name: eventName,
				start_time : new Date(Date.parse("Dec 31, 2015")),
				details : descriptionField.value,
				place_id : locationId,
				custom_fields : custom
			}, function (e){
				if (e.success) {
					var RequestSentWindow = require("ui/common/RequestSentWindow");
					var requestSentWindow = new RequestSentWindow(navController);
					requestSentWindow.fireEvent('meetupSelected', {id : e.events[0].id, friendName : contactsField.value});
					navController.open(requestSentWindow);
				} else {
					//error(e);
					alert(e.toString());
				}
			});
		});
		self.add(btnGo);
		
		});
	});
	return self;
	
};
module.exports = EditMeetup;


