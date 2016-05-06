app.factory('Forecast', ['$http', function($http) {
	return {
		getForecast : function(zip, onSuccess, onFailure) {
			var request = {
				method: 'Get',
				url:   'http://bhm-ms-dev-34:3000/weather/forecast?zip=' + zip,
				data: zip
			};

			return $http(request)
				.success(function(data) {
					onSuccess(data);
				})
				.error(function(err) {
					onFailure(err);
				});
		}
	}
}]);