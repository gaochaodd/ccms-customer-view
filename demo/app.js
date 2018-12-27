angular
    .module('ccms', ['ccms.components', 'ccms.customerView', 'gridManager'])
    .controller('testCustomerView', function($scope){
        $scope.uniId = 'uniId';
        $scope.envName = '';
    });