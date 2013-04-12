//CreateNewMeetUpView Component Constructor
function CreateNewMeetupWindow(navController) {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	var self = Ti.UI.createWindow({
		layout : 'composite',
		backgroundColor : 'white'
	});
	var contactsField = Ti.UI.createLabel({
		top : 5,
		left : 20,
		width : Ti.UI.FILL,
		height : 70,
		textAlign : 10,
		text : 'Contact Name',
		color : '#336699',
		font : {
			fontSize : 26
		},
	});
	self.add(contactsField);
	var btnContacts = Ti.UI.createButton({
		top : 5,
		right : 0,
		height : 65,
		width : 80,
		backgroundImage : '/images/search.png'
	});
	self.add(btnContacts);
	var friendMobile;
	btnContacts.addEventListener('click', function() {
		var params = {
			fields : ['phone']
		};

		params.selectedPerson = function(e) {
			//alert('e: ' + JSON.stringify(e));
			if (e.person.phone) {
				for (type in e.person.phone) {
					if (e.person.phone[type].length > 0) {
						//contactsField.value = e.person.phone[type][0];
						contactsField.text = e.person.fullName;
						friendMobile = e.person.phone[type][0];
					}
				}
			} else {
				Ti.API.info('no email on contact');
				contactsField.text = '';
			}
		}
		Ti.Contacts.showContacts(params);
	});

	var locationField = Ti.UI.createLabel({
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		top : 76,
		color : '#336699',
		left : 20,
		width : Ti.UI.FILL,
		height : 70,
		text : 'Location',
		font : {
			fontSize : 26
		},
	});
	self.add(locationField);
	var btnLocation = Ti.UI.createButton({
		top : 76,
		right : 0,
		height : 65,
		width : 80,
		backgroundImage : '/images/search.png'
	});
	self.add(btnLocation);

	var locationId = '';
	btnLocation.addEventListener('click', function() {
		var SelectLocationWindow = require("ui/common/SelectLocationWindow");
		var selectLocationWindow = new SelectLocationWindow(navController);
		selectLocationWindow.addEventListener('locationSelected', function(e) {
			//alert('location selected event');
			locationField.text = e.location;
			locationId = e.id;
		});
		navController.open(selectLocationWindow);
	});

	var descriptionField = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		top : 147,
		left : 5,
		color : '#336699',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		hintText : 'Description (e.g.: Taxi Stand)'
	});
	self.add(descriptionField);

	var lblNotifyMe = Ti.UI.createLabel({
		color : '#999999',
		font : {
			fontSize : 30
		},
		top : 218,
		text : 'Notify me when s/he is',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : Ti.UI.SIZE,
		height : 70
	});
	self.add(lblNotifyMe);

	var picker = Ti.UI.createPicker({
		top : 289,
		useSpinner : true,
		backgroundColor : 'black'
	});
	picker.selectionIndicator = true;

	var tens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var ones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	var column1 = Ti.UI.createPickerColumn();

	for (var i = 0, ilen = tens.length; i < ilen; i++) {
		var row = Ti.UI.createPickerRow({
			title : tens[i],
		});
		column1.addRow(row);
	}

	var column2 = Ti.UI.createPickerColumn();

	for (var i = 0, ilen = ones.length; i < ilen; i++) {
		var row = Ti.UI.createPickerRow({
			title : ones[i],
		});
		column2.addRow(row);
	}

	picker.add([column1, column2]);

	self.add(picker);

	// end picker

	var lblNotifyMeEnd = Ti.UI.createLabel({
		top : 470,
		color : '#999999',
		font : {
			fontSize : 30
		},
		text : 'minutes away.',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	self.add(lblNotifyMeEnd);

	var column1SelectedValue = '';
	var column2SelectedValue = '';
	var proximityTime = '';
	picker.addEventListener('change', function(e) {
		column1SelectedValue = parseInt(e.selectedValue[0]);
		column2SelectedValue = parseInt(e.selectedValue[1]);
	});
	var btnGo = Ti.UI.createButton({
		title : 'Send Meetup Request',
		top : 520,
		font : {
			fontSize : 25
		},
		width : 300,
		backgroundColor : '#00cc00',
		color : 'white',
		borderRadius : 8,
		height : 70,
	});

	btnGo.addEventListener('click', function() {
		proximityTime = parseInt((column1SelectedValue * 10) + (column2SelectedValue));
		if (proximityTime < 0) {
			proximityTime = parseInt(3);
		}
		// create new event
		var eventName = contactsField.text + " @ " + locationField.text;
		var custom = JSON.stringify({
			"friendName" : contactsField.text,
			"status" : 0,
			"time" : proximityTime,
			"inRange" : false,
			"lat" : "1.29229",
			"lng" : "103.84955"
		});
		//alert(custom);
		var data = {
			name : eventName,
			start_time : new Date(Date.parse("Dec 31, 2015")),
			details : descriptionField.value,
			place_id : locationId,
			custom_fields : custom
		};

		Cloud.Events.create(data, function(e) {
			if (e.success) {
				//alert(data);
				Cloud.PushNotifications.notify({
					channel : 'sally',
					payload : {
						title : 'Meetup '+ e.events[0].id,
						alert : 'You have recieved a new meet up from Daniel!'
					}
				}, function(d) {
					if (e.success) {
					//	alert('MeetUp Notification sent successfully to Sally!');
					} else {
					//	alert('Error:\\n' + ((d.error && d.message) || JSON.stringify(d)));
					}
				});

				var RequestSentWindow = require("ui/common/RequestSentWindow");
				var requestSentWindow = new RequestSentWindow(navController);
				requestSentWindow.fireEvent('meetupSelected', {
					id : e.events[0].id,
					friendName : contactsField.text
				});
				navController.open(requestSentWindow);
			} else {
				//error(e);
				//alert(e.toString());
			}
		});
	});
	self.add(btnGo);

	return self;
};

module.exports = CreateNewMeetupWindow;
