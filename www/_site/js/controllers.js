angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, $filter, Temperatures) {
  	$scope.refreshDash = function() {
    console.log('Get CurrentData');
		Temperatures.getCurrentData(function(data) {
      console.log('Got CurrentData');
    	$timeout(function() {
            console.log('Timeout CurrentData');
      			$scope.currTemp = data.val().temp;
      			$scope.currTime = $filter('date')(data.val().time*1000,"dd MMM yyyy HH:mm");
   	 		});
  		});
  	};
  	$scope.refreshDash();
})

.controller('HistoryCtrl', function($scope, $timeout, $filter, Temperatures) {

	Chart.defaults.global.responsive = true;
	Chart.defaults.global.animation = false;
	Chart.defaults.global.showTooltips = false;
    Chart.defaults.Line.pointDot = false;

	$scope.refreshHist = function() {
		Temperatures.getData(function(data) {
			var todayLabels = [];
			var todayValues = [];

			data.forEach(function(sample) {
    			todayLabels.push($filter('date')(sample.val().time*1000,"HH:mm"));
    			todayValues.push(sample.val().temp);
        	});
			// If too many values set alternate empty
        	if(todayLabels.length > 10) {
        		for (i = 1; i < todayLabels.length; i++) {
    				if(i%10 != 0 ) todayLabels[i] = "";
				}
        	}

			$timeout(function() {
				$scope.chart = {
   					labels : todayLabels,
    				datasets : [
        			{
            			fillColor : "#94d8a3",
            			strokeColor : "#029622",
            			data : todayValues
        			}
    				]
				};
			});
		});
		Temperatures.getDayData(function(data) {
			var todayDayLabels = [];
			var todayDayValues = [];

			data.forEach(function(sample) {
    			todayDayLabels.push($filter('date')(sample.val().time*1000,"HH:mm"));
    			todayDayValues.push(sample.val().temp);
        	});
			// If too many values set alternate empty
        	if(todayDayLabels.length > 20) {
        		for (i = 1; i < todayDayLabels.length; i++) {
    				if(i%10 != 0) todayDayLabels[i] = "";
				}
        	}

			$timeout(function() {
				$scope.chartDay = {
   					labels : todayDayLabels,
    				datasets : [
        			{
            			fillColor : "#eeb787",
            			strokeColor : "#e67e22",
            			data : todayDayValues
        			}
    				]
				};
			});
		});
		Temperatures.getWeekData(function(data) {
			var todayWeekLabels = [];
			var todayWeekValues = [];

			data.forEach(function(sample) {
    			todayWeekLabels.push($filter('date')(sample.val().time*1000,"EEE HH:mm"));
    			todayWeekValues.push(sample.val().temp);
        	});
			// If too many values set alternate empty
        	if(todayWeekLabels.length > 20) {
        		for (i = 1; i < todayWeekLabels.length; i++) {
    				if(i%10 != 0) todayWeekLabels[i] = "";
				}
        	}

			$timeout(function() {
				$scope.chartWeek = {
   					labels : todayWeekLabels,
    				datasets : [
        			{
            			fillColor : "#817db4",
            			strokeColor : "#1e1490",
            			data : todayWeekValues
        			}
    				]
				};
			});
		});
 	};
  	$scope.refreshHist();
})

.controller('SettingsCtrl', function($scope) {
});
