


var myApp = angular.module("myApp", ["ngRoute"]);





   myApp.config(['$routeProvider', function($routeProvider) {
     $routeProvider
		.when("/home", {
			templateUrl: "templates/home.html",
			controller: "homeController"
		})
		.when('/about', {
			templateUrl: "templates/about.html",
			controller: "aboutController"
		})
		.when('/contact', {
			templateUrl: "templates/contact.html",
			controller: "contactController"
		})
		.when('/membership', {
			templateUrl: "templates/membership.html",
		//	controller: "membershipController"
		})
		.when('/form', {
			templateUrl: "templates/form.html",
			controller: "formController"
		})
		.when('/register', {
			templateUrl: "templates/register/register.html",
			controller: "registerController"
		})
		.when('/theropistdata', {
			templateUrl: "templates/theropistdata/theropistdata.html",
			controller: "theropistdataController"
		})
		.when('/patients', {
			templateUrl: "templates/patients.html",
			//template:"<div><h1>this a patients list page</h1></div>",
			controller: "patientsController"
		})
		.otherwise({redirectTo:'/home'});
}]);
myApp.controller("homeController", function ($scope) {
	$scope.message = "home";
});
myApp.controller("RegisterController", function ($scope) {

});
myApp.controller('aboutController', function ($scope) {
	$scope.message = "home";
});
myApp.controller('contactController', function ($scope) {
	$scope.message = "home";
});
myApp.controller('theropistdata', function ($scope) {
	$scope.message = "theropistdata";
})
.service("patientsService",function($http,$q){
	var deferred = $q.defer();
	$http.get('https://api.mlab.com/api/1/databases/speach-theropy/collections/Patient?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw').then(function(data){
		deferred.resolve(data);
	});
	this.getPatients = function(){
		return deferred.promise;
	}
})


.controller('patientsController',function($scope,$rootScope,$http,$q,patientsService){
	var promise = patientsService.getPatients();
	promise.then(function(data){
 		$scope.patients = data.data;
		//console.log("this is my data",$scope.patients);
	});
	
	function resetItem(){
	   $scope.patient = {
		  firstName : '',
		  lastName : '',
		  phone : '',
		  EMail : ''
	   };              
	   $scope.displayForm = '';
	   
	}
	resetItem();
	
	$scope.addItem = function () {
	   resetItem();
	   $scope.displayForm = true;
	 };
	 
	 
	 
	 
	 
	 $scope.editItem = function (data) { 
            console.log("eddit");	 
			$scope.patient = data;
			$scope.displayForm2 = true;
			console.log("eddit2");
	};
		 
    $scope.create = function() {
        $http.post('https://api.mlab.com/api/1/databases/speach-theropy/collections/Patient?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw', { 'firstName': $scope.patient.firstName, 'lastName': $scope.patient.lastName, 'phone': $scope.patient.phone, 'EMail': $scope.patient.EMail })
            .then(function(response) {
                console.log("data entered");
				$('#myModal').modal('hide');
				$scope.patient = data;
	          });
           
    };
	
	$scope.update = function(id) {
		 
		var tbd = id.$oid;
        $http.put('https://api.mlab.com/api/1/databases/speach-theropy/collections/Patient/' + tbd + '?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw', { 'firstName': $scope.patient.firstName, 'lastName': $scope.patient.lastName, 'phone': $scope.patient.phone, 'EMail': $scope.patient.EMail })
            .success(function(response) {
                console.log('updated');
				//$scope.displayForm2 = false;
            });
    }
	
	
		
		
	
    $scope.removeItem = function(id) {
		console.log(id.$oid);
		var tbd = id.$oid;
		console.log(tbd);
		if (confirm('האם אתה בטוח שאתה רוצה למחוק?')){
        $http['delete']('https://api.mlab.com/api/1/databases/speach-theropy/collections/Patient/' + tbd + '?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw')
            .then(function(response) {
				$scope.patients.splice($scope.patient, 1);
                console.log('Deleted');
            });
		   
		   
		   //$http.post('/auth/delete', $scope.patient).then(function(response) {
			   //console.log('Deleted');
		   //});
		}
    }
		
		
	  $scope.removeModal= function(){
         // $('.modal').modal('hide');
          $scope.displayForm = false;		 		  
      };
	  
	  $scope.removeModal2= function(){
         // $('.modal').modal('hide');
          $scope.displayForm2 = false;		 		  
      };
	
});



