function ViewAllMeetupWindow(navController) {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	var self = Ti.UI.createWindow({
		backgroundColor : 'white'
	});

	var table = Ti.UI.createTableView({
		data : [{
			title : 'Loading, please wait...'
		}]
	});
	var selectedEventId;
	table.addEventListener('click', function(e) {
		var ViewMeetupWindow = require("ui/common/ViewMeetupWindow");
		var viewMeetupWindow = new ViewMeetupWindow(navController);
		viewMeetupWindow.fireEvent('meetupSelected', {
			id : e.row.id
		});
		navController.open(viewMeetupWindow);
	});

	table.addEventListener('longpress', function(e) {
		if (e.row != null) {
			selectedEventId = e.row.id;
			dialog.show();
		} // end if
	});
	// end long press event listener

	// create options dialog
	var opts = {
		cancel : 2,
		options : ['Edit', 'Delete', 'Cancel'],
		selectedIndex : 0,
		title : "Action"
	};


	var dialog = Ti.UI.createOptionDialog(opts);
	dialog.addEventListener('click', function(evt) {
		switch(evt.index) {
			case 0:
				Titanium.API.info('Edit');
				var EditMeetup = require("ui/common/EditMeetup");
				var editMeetup = new EditMeetup(navController);
				editMeetup.fireEvent('editMeetup', {
					id : selectedEventId
				});
				navController.open(editMeetup);
				break;

			case 1:
				Titanium.API.info('Delete');
				deleteEvent();
				break;

			default:
				break;
		} // end switch
	});
	// end dialog event listener

	self.add(table);

	function deleteEvent() {
		var alert = Titanium.UI.createAlertDialog({
			title : 'Delete data',
			message : "Are you sure you want to delete the event?",
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});

		alert.addEventListener('click', function(e) {
			Titanium.API.info('e = ' + JSON.stringify(e));
			if (e.cancel === e.index || e.cancel === true) {
				return;
			}
			//now you can use parameter e to switch/case
			switch (e.index) {
				case 0:
					Titanium.API.info('Clicked button 0 (YES)');
					Cloud.Events.remove({
						event_id : selectedEventId
					}, function(e) {
						if (e.success) {
							queryEvents();
						} else {
							alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
						}
					});
					break;

				//This will never be reached, if you specified cancel for index 1
				case 1:
					Titanium.API.info('Clicked button 1 (NO)');
					break;

				default:
					break;
			}
		
		});
		alert.show();

	}

	function queryEvents() {
		Cloud.Events.query(function(e) {
			if (e.success) {
				if (e.events.length == 0) {
					table.setData([{
						title : 'No events'
					}]);
				} else {
					var data = [];
					for (var i = 0, l = e.events.length; i < l; i++) {
						var event = e.events[i];
						var row = Ti.UI.createTableViewRow({
							title : event.name,
							id : event.id
						});
						data.push(row);
					}
					table.setData(data);
				}
			} else {
				table.setData([{
					title : (e.error && e.message) || e
				}]);
				error(e);
			}
		})
	}


	self.addEventListener('open', queryEvents);

	return self;
};

module.exports = ViewAllMeetupWindow;
