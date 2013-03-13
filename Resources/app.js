/*
* A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.
* A starting point for tab-based application with multiple top-level windows.
* Requires Titanium Mobile SDK 1.8.0+.
*
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*
*/

//bootstrap and check dependencies
if (Ti.version < 1.8) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	var Cloud = require('ti.cloud');
	var CloudPush = require('ti.cloudpush');
	var deviceToken
	CloudPush.debug = true;
    CloudPush.enabled = true;
	CloudPush.showTrayNotificationsWhenFocused = true;
    CloudPush.focusAppOnPush = false;
	Cloud.debug = true;
	// optional; if you add this line, set it to false for production
		CloudPush.retrieveDeviceToken({
		        success: function deviceTokenSuccess(e) {
		        alert('Device Token: ' + e.deviceToken);
		        deviceToken = e.deviceToken
		        loginDefault();
		    },
		        error: function deviceTokenError(e) {
		            alert('Failed to register for push! ' + e.error);
			}
		});
	
	
	function loginDefault(e){
   	//Create a Default User in Cloud Console, and login
    Cloud.Users.login({
        login: 'sally',
        password: '1234'
    }, function (e) {
        if (e.success) {
			var user = e.users[0];
<<<<<<< HEAD
			//alert('Logged in! You are now logged in as ' + user.id);
		} else {
			error(e);
=======
        	alert("Login success");
            defaultSubscribe();
        } else {
            error(e);
>>>>>>> week 10 commit
			alert(e);
            }
        });
    }
    function defaultSubscribe(){
                Cloud.PushNotifications.subscribe({
                    channel: 'alert',
	                device_token: deviceToken,
	                type: 'android'
            	}, function (e){
	                if (e.success) {
	                   alert('Subscribed for Push Notification!');
	                }else{
	                    alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
	                }
                });
    }	

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

	var Window;
	if (isTablet) {
		//Window = require('ui/tablet/ApplicationWindow');
		//new Window().open();
		
		var NavigationController = require("NavigationController");
		var HomeView = require("ui/common/HomeView");
		var controller = new NavigationController();
		controller.open(new HomeView(controller));
	} else {
		var NavigationController = require("NavigationController");
		var HomeView = require("ui/common/HomeView");
		var controller = new NavigationController();
		controller.open(new HomeView(controller));

		//var NewMeetupRequestWindow = require("ui/common/NewMeetupRequestWindow");
		//controller.open(new NewMeetupRequestWindow(controller));
	}
})();
