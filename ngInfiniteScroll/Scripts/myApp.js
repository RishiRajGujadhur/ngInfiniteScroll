//A module is a collection of services, directives, controllers, filters, and configuration information. The module is a container for the different parts of an application. The module is a container for the application controllers.
// Create a new module
var app = angular.module('myApp', []);
//Scope as Data-Model
//Scope is the glue between application controller and the view. During the template linking phase the directives set up $watch expressions on the scope. 
//Both controllers and directives have reference to the scope, but not to each other. 
//This arrangement isolates the controller from the directive as well as from the DOM. 
app.controller('InfinityScrollController', ['$scope', '$http', function ($scope, $http) {
    

    $scope.CurrentPage = 1;
    $scope.TotalPage = 0;
    $scope.EmployeeList = [];

    function GetEmployeeData(page) {
        $scope.IsLoading = true;
        //The $http service is a core Angular service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.
        $http({
            method: 'GET',
            url: '/home/getEmployeeData',
            params: { 'page': page }
        }).then(function (response) {
            //Invokes the iterator function once for each item in obj collection, which can be either an object or an array. The iterator function is invoked with iterator(value, key, obj), where value is the value of an object property or an array element, key is the object property key or array element index and obj is the obj itself. Specifying a context for the function is optional.
            angular.forEach(response.data.List, function (value) {
                //The push() method adds new items to the end of an array, and returns the new length. (JavaScript code)
                $scope.EmployeeList.push(value);
            });
            $scope.TotalPage = response.data.totalPage;
            $scope.IsLoading = false;
        }, 
        function () {
            $scope.IsLoading = false;
        })
    }

    //Using the function we previously created
    GetEmployeeData($scope.CurrentPage);
 
    $scope.NextPage = function () {
        if ($scope.CurrentPage < $scope.TotalPage) {
            $scope.CurrentPage += 1;
            GetEmployeeData($scope.CurrentPage);
        }
    }
}]);
//Much like controllers, directives are registered on modules. 
//AngularJS lets you extend HTML with new attributes called Directives. AngularJS directives are extended HTML attributes with the prefix ng-.
app.directive('infinityscroll', function () {
    return {
            //By adding a restrict property with the value "A", the directive can only be invoked by attributes:
            //The legal restrict values are: E for Element name, A for Attribute, C for Class and M for Comment
            //By default the value is EA, meaning that both Element names and attribute names can invoke the directive.
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('scroll', function () {
                if ((element[0].scrollTop + element[0].offsetHeight) == element[0].scrollHeight) {
                        
                            //This is just a traditional async function with a $scope.$apply() called at the end, to tell AngularJS that an asynchronous event just occurred
                            //scroll reach to end
                            scope.$apply(attrs.infinityscroll) //close to the async event binding
                        }
                });
            }
            }
    });

 


 