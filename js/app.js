var app = angular.module('store', []);

app.controller('FirstCtrl', function ($scope, $http) {  
	$scope.data = {message: "Hello"};
	$scope.result = "hello OAuth";

	$scope.testOAuth = function(){
		var key = '9Zb6AtZKt8Efkwbnv6',
		secret = 'jBecvag26av3WGvBcL2ZgesNR2894C8c';
		
		var oauth = OAuth({
		    consumer: {
		        public: key,
		        secret: secret
			},
			signature_method: 'HMAC-SHA1'
		});

		var token = {
		    public: '9Zb6AtZKt8Efkwbnv6',
		    secret: 'jBecvag26av3WGvBcL2ZgesNR2894C8c'
		};

		var request_data = {
		    url: 'https://bitbucket.org/api/1.0/oauth/request_token',
		    method: 'POST',
		    data:{
		    	oauth_callback: 'http://localhost/scm-management/'
		    }
		};

		$http.post({
			url: request_data.url,
			data: oauth.authorize(request_data, token)
		}).success(function(data, status, headers, config){
			$scope.error = status;
			$scope.result = data;

		}).error(function(data, status, headers, config){
			$scope.error = status;
			$scope.result = data;
		});

		$scope.result = "";
	}

	$scope.testOAuth();
});

