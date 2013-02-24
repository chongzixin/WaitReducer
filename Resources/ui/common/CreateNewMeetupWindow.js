//CreateNewMeetUpView Component Constructor
function CreateNewMeetupWindow(navController) {
	var self = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : 'white'
	});

	var contactsField = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		hintText : 'Select Contact'
	});
	self.add(contactsField);
	
	var btnContact = Ti.UI.createButton({
		title : 'Select Contact',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	contactsField.addEventListener('click', function() {
		var params = {
			fields : ['phone']
		};

		params.selectedPerson = function(e) {
			alert('e: ' + JSON.stringify(e));
			if (e.person.phone) {
				for (type in e.person.phone) {
					if (e.person.phone[type].length > 0) {
						contactsField.value = e.person.phone[type][0];
					}
				}
			} else {
				Ti.API.info('no email on contact');
				contactsField.value = '';
			}
		}
		Ti.Contacts.showContacts(params);
	});
	
	var locationField = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		hintText : 'Select Location'
	});
	self.add(locationField);

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
		// Check console
		Ti.API.info('User clicked the button ');
		var RequestSentWindow = require("ui/common/RequestSentWindow");
		navController.open(new RequestSentWindow(navController));
	});
	self.add(btnGo);

	return self;
};

module.exports = CreateNewMeetupWindow;
