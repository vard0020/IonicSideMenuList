var app = angular.module('starter.SettingController', [])

app.controller('SettingController', function ($scope, LocalStorage) {
	//Get settings from local storage
	$scope.setting = LocalStorage.getSettings();
    
	//update setting
	$scope.settingsChanged = function() {
		LocalStorage.updateSettings($scope.setting);
  	};	
});

//1. store the value of toggle button in local storage 
//2. When value is changef , update local storage 
//3. And when app launches , get toggle value and update setting.html accordingly 
