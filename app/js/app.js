


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

.service("formsService",function($http,$q){
	var deferred = $q.defer();
	$http.get('https://api.mlab.com/api/1/databases/speach-theropy/collections/Form?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw').then(function(data){
		deferred.resolve(data);
	});
	this.getForms = function(){
		return deferred.promise;
	}
})

.controller('patientsController',function($scope,$http,$q,patientsService){
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
		 
    $scope.create = function(data) {
        $http.post('https://api.mlab.com/api/1/databases/speach-theropy/collections/Patient?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw', { 'firstName': $scope.patient.firstName, 'lastName': $scope.patient.lastName, 'phone': $scope.patient.phone, 'EMail': $scope.patient.EMail })
            .then(function(response) {
                console.log("data entered");
				$('#myModal').modal('hide');
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
	
	
		
		
	
    $scope.removeItem = function(id,patient) {
		
		console.log(id.$oid);
		var tbd = id.$oid;
		console.log(tbd);
		if (confirm('האם אתה בטוח שאתה רוצה למחוק?')){
        $http['delete']('https://api.mlab.com/api/1/databases/speach-theropy/collections/Patient/' + tbd + '?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw')
            .then(function(response) {
				console.log(patient.firstName);
				
				$scope.patients.splice($scope.patients.indexOf(patient), 1);
				
                console.log('Deleted');
            });
		   
		   
		   //$http.post('/auth/delete', $scope.patient).then(function(response) {
			   //console.log('Deleted');
		   //});
		}
	}
	
	$scope.addForm = function(id) {		 
		var tbd = id.$oid;
        $http.put('https://api.mlab.com/api/1/databases/speach-theropy/collections/Patient/' + tbd + '?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw', { 'EMail': $scope.patient.EMail })
            .success(function(response) {
                console.log('addForm');
            });
    }
	
    
	
	  $scope.removeModal= function(){
         // $('.modal').modal('hide');
          $scope.displayForm = false;		 		  
      };
	  
	  $scope.removeModal2= function(){
         // $('.modal').modal('hide');
          $scope.displayForm2 = false;		 		  
      };
	
})

.controller('formController',function($scope,$http,$q,formsService,patientsService){
	var promise = formsService.getForms();
	promise.then(function(data){
 		$scope.Form = data.data[0];
		console.log("this is my data",$scope.Form);
	});
	var promise2 = patientsService.getPatients();
	promise2.then(function(data){
 		$scope.patient = data.data[0];
		console.log("this is my data",$scope.patient);
	});
	
	function resetItem(){
	   $scope.Form = {
		  AdditionalDiagnostics : '',
		  Referrer : '',
		  causeReferral : '',
		  date : '',
		  HearingTest : '',
		  DateDiagnosis : '',
		  diagnosesName : '',
		  DiagnosticResults : '',
		  GettingTreatment : '',
		  eriesRegimen : '',
		  TotalActualTreatments : '',
		  background : '',
		  TherapeuticProgram : '',
		  ProgressDuringTreatment : '',
		  Recommendations : ''
		  
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
			$scope.Form = data;
			$scope.displayForm2 = true;
			console.log("eddit2");
	};
	
	 $scope.create = function(data) {
        $http.post('https://api.mlab.com/api/1/databases/speach-theropy/collections/Form?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw', { 'AdditionalDiagnostics': $scope.Form.AdditionalDiagnostics, 'Referrer': $scope.Form.Referrer, 'causeReferral': $scope.Form.causeReferral, 'date': $scope.Form.date, 'HearingTest': $scope.Form.HearingTest,  'DateDiagnosis': $scope.Form.DateDiagnosis, 'diagnosesName': $scope.Form.diagnosesName, 'DiagnosticResults': $scope.Form.DiagnosticResults, 'GettingTreatment': $scope.Form.GettingTreatment, 'eriesRegimen': $scope.Form.eriesRegimen, 'TotalActualTreatments': $scope.Form.TotalActualTreatments, 'background': $scope.Form.background, 'TherapeuticProgram': $scope.Form.TherapeuticProgram, 'ProgressDuringTreatment': $scope.Form.ProgressDuringTreatment,  'Recommendations': $scope.Form.Recommendations})
            .then(function(response) {
                console.log("data entered");
				$('#myModal').modal('hide');
	          });
           
    };
	
	$scope.update = function(id) {
		 
		var tbd = id.$oid;
        $http.put('https://api.mlab.com/api/1/databases/speach-theropy/collections/Form/' + tbd + '?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw', { 'AdditionalDiagnostics': $scope.Form.AdditionalDiagnostics, 'Referrer': $scope.Form.Referrer, 'causeReferral': $scope.Form.causeReferral, 'date': $scope.Form.date, 'HearingTest': $scope.Form.HearingTest,  'DateDiagnosis': $scope.Form.DateDiagnosis, 'diagnosesName': $scope.Form.diagnosesName, 'DiagnosticResults': $scope.Form.DiagnosticResults, 'GettingTreatment': $scope.Form.GettingTreatment, 'eriesRegimen': $scope.Form.eriesRegimen, 'TotalActualTreatments': $scope.Form.TotalActualTreatments, 'background': $scope.Form.background, 'TherapeuticProgram': $scope.Form.TherapeuticProgram, 'ProgressDuringTreatment': $scope.Form.ProgressDuringTreatment,  'Recommendations': $scope.Form.Recommendations})
            .success(function(response) {
                console.log('updated');
				//$scope.displayForm2 = false;
            });
    };
	
	

	
	 $scope.removeItem = function(id,Form) {
		
		console.log(id.$oid);
		var tbd = id.$oid;
		console.log(tbd);
		if (confirm('האם אתה בטוח שאתה רוצה למחוק?')){
        $http['delete']('https://api.mlab.com/api/1/databases/speach-theropy/collections/Form/' + tbd + '?apiKey=XvABGEjSRBRVhRBHAwKr5XvGS32ARJXw')
            .then(function(response) {
				console.log(patient.firstName);
				
				$scope.patients.splice($scope.Forms.indexOf(Form), 1);
				
                console.log('Deleted');
            });
		   
		   
		   //$http.post('/auth/delete', $scope.patient).then(function(response) {
			   //console.log('Deleted');
		   //});
		}
	}
	
	
});


