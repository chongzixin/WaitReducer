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

	table.addEventListener('click', function(e) {
		//alert(e.rowData.id+":"+e.rowData.title);
		var ViewMeetupWindow = require("ui/common/ViewMeetupWindow");
		var viewMeetupWindow = new ViewMeetupWindow(navController);
		viewMeetupWindow.fireEvent('meetupSelected', {id : e.row.id});
		navController.open(viewMeetupWindow);
	});
	
	self.add(table);

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
