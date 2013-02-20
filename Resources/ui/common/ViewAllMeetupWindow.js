function ViewAllMeetupWindow(navController) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white'
	});

	var tableData = [{
		title : 'Daniel @ Plaza Sing'
	}, {
		title : 'Zi Xin @ SOB:SMU'
	}, {
		title : 'Lionel @ Food For Thought'
	}, {
		title : 'Joanna @ La La Land'
	}];

	var table = Ti.UI.createTableView({
		data : tableData
	});
	
	self.add(table);
	
	table.addEventListener('click', function(e) {
		//alert(e.rowData.id+":"+e.rowData.title);
		var ViewMeetupWindow = require("ui/common/ViewMeetupWindow");
		navController.open(new ViewMeetupWindow(navController));
	});
	
	return self;
};

module.exports = ViewAllMeetupWindow;
