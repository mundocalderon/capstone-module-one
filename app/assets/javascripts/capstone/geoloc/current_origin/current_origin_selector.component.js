(function() {
  "use strict";

  angular
    .module("spa-demo.geoloc")
    .component("sdCurrentOriginSelector", {
      templateUrl: templateUrl,
      controller: CurrentOriginSelectorController,
      //bindings: {},
    });


  templateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function templateUrl(APP_CONFIG) {
    return APP_CONFIG.current_origin_selector_html;
  }    

  CurrentOriginSelectorController.$inject = ["$scope",
                                              "capstone.geoloc.geocoder",
                                              "capstone.geoloc.currentOrigin",
                                              "capstone.geoloc.myLocation"];
  function CurrentOriginSelectorController($scope, geocoder, currentOrigin, myLocation) {
    var vm=this;
    vm.lookupAddress=lookupAddress;
    vm.getOriginAddress=getOriginAddress;
    vm.clearOrigin=clearOrigin;
    vm.isCurrentLocationSupported = myLocation.isCurrentLocationSupported;
    vm.useCurrentLocation=useCurrentLocation;

    vm.$onInit = function() {
      console.log("CurrentOriginSelectorController",$scope);
    }
    return;
    //////////////
    function lookupAddress() {
      console.log("lookupAddress for", vm.address);
      geocoder.getLocationByAddress(vm.address).$promise.then(
        function(location){
          currentOrigin.setLocation(location);
          console.log("location", location);
        });
    }

    function getOriginAddress() {
      return currentOrigin.getFormattedAddress();
    }
    function clearOrigin() {
      return currentOrigin.clearLocation();
    }

    function useCurrentLocation() {
      myLocation.getCurrentLocation().then(
        function(location){
          console.log("useCurrentLocation", location);
          currentOrigin.setLocation(location);
        });
    } 
        
  }
})(); 