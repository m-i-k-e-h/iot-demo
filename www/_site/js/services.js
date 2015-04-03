angular.module('starter.services', [])

.factory('Temperatures', function($firebaseArray) {

  var ref = new Firebase('https://iotdemo.firebaseio.com/temperature/');
  var refHalfHourly = new Firebase('https://iotdemo.firebaseio.com/temperatureHalfhourly/');
  var refHourly = new Firebase('https://iotdemo.firebaseio.com/temperatureHourly/');
  
  return {
    getData: function(callback) {
        ref.orderByKey().limitToLast(72).once("value", function(snapshot) {
     		callback(snapshot);
  		});
    },
    getDayData: function(callback) {
        refHalfHourly.orderByKey().limitToLast(48).once("value", function(snapshot) {
     		callback(snapshot);
  		});
    },
    getWeekData: function(callback) {
        refHourly.orderByKey().limitToLast(168).once("value", function(snapshot) {
     		callback(snapshot);
  		});
    },
    getCurrentData: function(callback) {
        ref.orderByKey().limitToLast(1).once("value", function(snapshot) {
        	// We know there is only one but angularfire doesn't!
        	snapshot.forEach(function(data) {
     			callback(data);
        	});
  		});
    }
  };
});
