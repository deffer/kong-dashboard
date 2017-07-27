angular.module('app').controller("ConfigController", ["$scope", "Kong", "Alert", "$location", function ($scope, Kong, Alert, $location) {
    $scope.config = angular.copy(Kong.config);

    var first_setup = !$scope.config.url;
    if (first_setup){
        $scope.config.useproxy=true;
    }

    $scope.update = function() {
        if (!$scope.config.url) {
            $scope.config.url = "http://localhost:8001";
        }
        if ($scope.config.useproxy && $scope.config.url.toLowerCase().indexOf("http") == -1) {
            $scope.config.url = "http://" + $scope.config.url;
        }
        if (!$scope.config.useproxy){
            var len = $scope.config.url.length;
            if ($scope.config.url.charAt(len - 1) == '/') {
                $scope.config.url = $scope.config.url.substr(0, len - 1);
            }
        }

        Kong.setConfig($scope.config).then(function() {
            if (first_setup) {
                $location.path('/');
                first_setup = false;
            } else {
                // celebrate
                Alert.success('Saved!');
            }
        });
    }
}]);
