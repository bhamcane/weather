app.controller('weatherController', ['$scope', 'Forecast', function($scope, Forecast) {

  $scope.isSearchActive = false;


  $scope.getForecast = function() {
    $scope.error = '';
    $scope.tenDay = [];
    
    var successFunc = function(data) {
      if (data)
        $scope.tenDay = data.forecast.txt_forecast.forecastday;
      else
        $scope.error = 'Invalid Zip Code';
    };

    var errorFunc = function(err) {
      $scope.error = err;
    }

    $scope.isSearchActive = true;
    Forecast.getForecast($scope.zip, successFunc, errorFunc);
  }

}]);