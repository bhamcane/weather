app.directive('weatherInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'js/directives/weatherInfo.html' 
  }; 
});