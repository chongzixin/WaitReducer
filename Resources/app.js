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
	/*
	var GA = require('analytics.google');
	GA.debug = true;
	var tracker = GA.getTracker("UA-39676089-1");
	tracker.trackScreen("ui/common/CreateNewMeetupWindow");
	*/
	var deviceToken
	CloudPush.debug = true;
	CloudPush.enabled = true;
	CloudPush.showTrayNotificationsWhenFocused = true;
	CloudPush.focusAppOnPush = true;
	Cloud.debug = true;
	// optional; if you add this line, set it to false for production
	CloudPush.retrieveDeviceToken({
		success : function deviceTokenSuccess(e) {
			//alert('Device Token: ' + e.deviceToken);
			deviceToken = e.deviceToken
			loginDefault();
		},
		error : function deviceTokenError(e) {
			alert('Failed to register for push! ' + e.error);
		}
	});

	function loginDefault(e) {
		//Create a Default User in Cloud Console, and login
		Cloud.Users.login({
			login : 'daniel',
			password : '1234'
		}, function(e) {
			if (e.success) {
				var user = e.users[0];
				alert("Daniel login successful!");
				defaultSubscribe();
			} else {
				error(e);
				alert(e);
			}
		});
	}

	function defaultSubscribe() {
		Cloud.PushNotifications.subscribe({
			channel : 'daniel',
			device_token : deviceToken,
			type : 'android'
		}, function(e) {
			if (e.success) {

			} else {
				alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}

	//Used to slow down push notification redirect
	function redirect(e) {
		return function() {
			//alert("e: "+ e);
			var NavigationController = require("NavigationController");
			var navController = new NavigationController();
			var ViewMeetupWindow = require("ui/common/ViewMeetupWindow");
			var viewMeetupWindow = new ViewMeetupWindow(navController);
			viewMeetupWindow.fireEvent('meetupSelected', {
				id : e
			});
			navController.open(viewMeetupWindow);

			/*
			 var NavigationController = require("NavigationController");
			 var navController = new NavigationController();
			 var ViewMeetupWindow = require("ui/common/NewMeetupRequestWindow");
			 var viewMeetupWindow = new ViewMeetupWindow(navController);
			 navController.open(viewMeetupWindow);
			 */
		}
	}

	function updateAcceptance(e) {
              var data = e.split(" ");
              var eventId = data[0];
              var status = parseInt(data[1]);
              var custom = JSON.stringify({
                     "status" : status
              });
              
              Cloud.Events.update({
                     event_id : eventId,
                     custom_fields : custom
              }, function(e) {
                     if (e.success) {
                //           alert("success");
                     } else {
               //            alert("error");
                     }
              });
              
       }

       //Push notification for determining page to load
       CloudPush.addEventListener('callback', function(evt) {
			
              var data = evt.payload
              var jsonObj = JSON.parse(data);
              var alertObj = jsonObj.android;
              var alertMsg = alertObj.alert;
              var alertHeader = alertObj.title;
              var alertTitle = alertHeader.split(" ");
              var title = alertTitle[0].toString();
              var selectedId = alertTitle[1];

             // alert(title + ": " + alertMsg);
              var meetUp = 'Meetup';
              var arrival = 'Arrival';
              var accept = 'Accepted';
              var decline = 'Declined';

              if (meetUp == title) {
                     setTimeout(redirect(selectedId), 3000);
              } else if (arrival == title) {
                     setTimeout(redirect(selectedId), 3000);
              } else if (accept == title) {
                     var idNstatus = selectedId + " 1";
                     updateAcceptance(idNstatus);
              } else if (decline == title) {
                     var idNstatus = selectedId + " 2";
                     updateAcceptance(idNstatus);
              }

       });


	CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
		//Ti.API.info('Tray Click Launched App (app was not running)');
	});

	CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
		//Ti.API.info('Tray Click Focused App (app was already running)');
	});

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
