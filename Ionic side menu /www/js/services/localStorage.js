angular.module('starter.localStorageService', [])

.factory("LocalStorage", function LocalStorageFactory(localStorageService){
    
    return {
        
        addDefaultSettings: function(){
          
            var setting = localStorageService.get("AppSetting");
            if(setting) return;
            
            //default setting
            var setting = {};
			setting.isVibrate = true;
			setting.isNotify = true;
			//update settings
			localStorageService.set("AppSetting", setting);
        },
        
        getItems: function (id) {
            var list = localStorageService.get(id); 
            if(!list)
            {
                list=[];
            }
            return list;
		},
        
        
        addItem: function(id, inputItem){
            var list = this.getItems(id);
            var item={};
            item.title=inputItem;
            item.done=false;
            list.push(item);
            localStorageService.set(id,list );
            return list;
        },
        
        removeItem: function(id, $index)
        {
            var list = this.getItems(id);
            list.splice($index, 1);
            localStorageService.set(id,list );
            return list;
        },
        
        markDone: function (id, $index) {
			var list = this.getItems(id);
			var item = list[$index];
			item.done = !item.done;
			localStorageService.set(id,list); 
			return list;
		},
        
        //get settings 
        getSettings: function () {
			var setting = localStorageService.get("AppSetting");
			return setting;
		},
        
        //updateSettings
        updateSettings: function (varSetting) {
			var setting = {};
			setting.isVibrate = varSetting.isVibrate;
			setting.isNotify = varSetting.isNotify;
			
			//update settings			
			localStorageService.set("AppSetting", setting);
			
			return;
		}
		
    }
});




