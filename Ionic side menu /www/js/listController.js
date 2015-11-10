angular.module('starter.ListController', [])

.controller('ListController', function($scope,$stateParams, LocalStorage, AndroidUtils) {
  
    $scope.PageTitle=$stateParams.listId;
    var id = $stateParams.listId;
    $scope.listofItems = LocalStorage.getItems(id);
    $scope.listCanSwipe = true;
    
    LocalStorage.addDefaultSettings();
    

     
    //adding items into localstorage
    $scope.addItem = function()
    {
        $scope.listofItems = LocalStorage.addItem(id, this.userInputText);
        this.userInputText = "";
    }
    
    //removing items from localstorage
    $scope.removeItem = function($index)
    {
        $scope.listofItems = LocalStorage.removeItem(id, $index); 
        
        //Schedule notification if list is completed after deleting the last not                completed item
		var isCompleted = this.checkForCompletedList();
		if(isCompleted && $scope.setting.isNotify){
			AndroidUtils.schedleNotification($scope.listTitle);
		}
    }
    
    //mark item done
    $scope.markDone = function($index)
    {
		$scope.listofItems = LocalStorage.markDone(id, $index);
        //Vibrate device
		var item = $scope.listofItems[$index];
		
		if(item.done && $scope.setting.isVibrate){
			AndroidUtils.vibrate();
		}
		
		//Schedule notification if list completed
		var isCompleted = this.checkForCompletedList();
		if(isCompleted && $scope.setting.isNotify){
			AndroidUtils.schedleNotification($scope.listTitle);
		}
    }
    
    //Check if all list items are checked.
	$scope.checkForCompletedList = function () {
		var isCompleted=true;
		angular.forEach($scope.listofItems, function(item) {
			if(isCompleted){
				if(!item.done) isCompleted = false;
			}
		});
		return isCompleted;
	};
});