var app=angular.module('PublicTransportation', ['ngMaterial', 'ngMessages','md.data.table']);

app.controller('appCtrl', function($scope, $rootScope, $mdToast, $document, $timeout, $q, $element, $window) {
  console.log("I've entered the app controller");
  $scope.selected = "";
  $scope.globalDate = new Date();
  $scope.globalDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
  $scope.agencyCode = 'LACMTA';
  $scope.trainStops = [];
  $scope.trainStopTimes = [];
  $scope.results = [];
  $scope.dbName = "myTrainDb13_in";
  $scope.search = {};
  $scope.stopNames = [];
  $scope.toStopNames = [];
  $scope.fromStopName = "";
  $scope.toStopName = "";
  $scope.startTime = new Date(1970, 0, 1, new Date().getHours(), new Date().getMinutes(), 0);
  $scope.buttonText = 'Getting Ready';
  $scope.buttonReady = false;
  $scope.online = 'Offline';
  $scope.connectionImg = 'icons/ic_signal_wifi_off_white_24px.svg';
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
  $scope.tableText = "";

  $scope.finalResults = [];
  if (navigator.onLine) {
    $scope.online = 'Online';
    $scope.connectionImg = 'icons/ic_signal_wifi_4_bar_white_24px.svg';
  } else {
    $scope.online = 'Offline';
    $scope.connectionImg = 'icons/ic_signal_wifi_off_white_24px.svg';
  }

  $window.addEventListener("offline", function() {
    $scope.online = 'Offline';
    $scope.connectionImg = 'icons/ic_signal_wifi_off_white_24px.svg'
    $scope.$apply();
    if (($scope.search.dName != '') && ($scope.search.dId != '') && ($scope.search.aName != '') && ($scope.search.aId != '') && ($scope.search.sTime != '')) {
      $scope.searchTrains();
    }
  }, false);

  $window.addEventListener("online", function() {
    $scope.online = 'Online';
    $scope.connectionImg = 'icons/ic_signal_wifi_4_bar_white_24px.svg'
    $scope.$apply();
    if (($scope.search.dName != '') && ($scope.search.dId != '') && ($scope.search.aName != '') && ($scope.search.aId != '') && ($scope.search.sTime != '')) {
      $scope.searchTrains();
    }
  }, false);

  var promise2 = new Promise(function(resolve, reject) {
    $.getScript("js/data6.js")
      .done(function() {
          resolve("Stuff worked!");
      })
      .fail(function() {
          reject(Error("It broke"));
      });
  });

  promise2.then(function(result) {
    $scope.trainStops = stopsString;
    for (index in $scope.trainStops) {
      $scope.stopNames.push($scope.trainStops[index].stopName+"_"+$scope.trainStops[index].stopId);
      $scope.$apply();
    }
  }, function(err) {
    console.log(err); // Error: "It broke"
  });

  var promise1 = new Promise(function(resolve, reject) {
    $.getScript("js/data3.js")
      .done(function() {
        resolve("Stuff worked!");
      })
      .fail(function() {
        reject(Error("It broke"));
      });
  });

  promise1.then(function(result) {
    createDatabase();
  }, function(err) {
    console.log(err); // Error: "It broke"
  });

  function createDatabase() {
      var request = window.indexedDB.open($scope.dbName);
      request.onerror = function(event) {
        alert('open error');
      };
      request.onsuccess = function(event) {
          $scope.buttonText = 'Trip Planner';
          $scope.buttonReady = true;
          $scope.$apply();
      };
      request.onupgradeneeded = function (e) {
          $scope.buttonText = 'Loading FirstTime Data';
          $scope.$apply();
          var database = e.target.result;
          var oOptions = { keyPath : "RecordID", autoIncrement : true };
          try {
              database.deleteObjectStore("TrainStopTimes");
          } catch(err) {
              console.log('err');
          }
          try {
                 oStore = database.createObjectStore("TrainStopTimes", oOptions );
                 var oIxOptions = { unique: false, multientry: false };
                 oStore.createIndex( "tripIdTrainStopTimes", "tripId", oIxOptions );
                 oStore.createIndex( "arrivalTimeTrainStopTimes", "arrivalTime", oIxOptions );
                 oStore.createIndex( "departureTimeTrainStopTimes", "departureTime", oIxOptions );
                 oStore.createIndex( "stopIdTrainStopTimes", "stopId", oIxOptions );
                 oStore.createIndex( "stopSequenceTrainStopTimes", "stopSequence", oIxOptions );
                 oStore.createIndex( "compound1", ["tripId","stopId"], oIxOptions );
                 for (var i in stopTimes) {
                   var request = oStore.add(stopTimes[i]);
                 }
          } catch(err) {
              console.log('someError');
          }
      };
  }
  $scope.fromStopNameSelected = function() {
    var flag = 0;
    $scope.toStopName = "";
    for (index in $scope.stopNames) {
      if ($scope.stopNames[index] == $scope.fromStopName) {
        flag = 1;
      }
    }
    if (flag == 0) {
      $scope.fromStopName = "";
    } else {
      $scope.toStopNames = [];
      for (i in $scope.trainStops) {
        var tempName = $scope.trainStops[i].stopName+"_"+$scope.trainStops[i].stopId
        if (tempName == $scope.fromStopName) {
          for (j in $scope.trainStops[i].children) {
              $scope.toStopNames.push($scope.trainStops[i].children[j].stopName+"_"+$scope.trainStops[i].children[j].stopId);
          }
        }
      }
    }
    //$scope.$apply();
  }

  $scope.toStopNameSelected = function() {
    var flag = 0;
    for (index in $scope.stopNames) {
      if ($scope.stopNames[index] == $scope.toStopName) {
        flag = 1;
      }
    }
    if (flag == 0) {
      $scope.toStopName = "";
    }
    //$scope.$apply();
  }

  $scope.searchTrains = function() {
    $scope.search = {
      dName: $scope.fromStopName.split('_')[0],
      dId: $scope.fromStopName.split('_')[1],
      aName: $scope.toStopName.split('_')[0],
      aId: $scope.toStopName.split('_')[1],
      sTime: $scope.startTime
    };
    if ($scope.online == 'Offline') {
      $scope.tableText = "Showing offline data - Application Offline";
      populateOfflineTable();
    }
    if ($scope.online == 'Online') {
      var time1 = new Date(new Date().toLocaleDateString()+" "+$scope.startTime.toLocaleTimeString());
      if (time1.getHours() >= $scope.globalDate.getHours()) {
        var difference = time1.getTime() - $scope.globalDate.getTime();
        var resultInMinutes = Math.round(difference / 60000);
        if (resultInMinutes < 90) {
          $scope.tableText = "Showing realtime data";
          populateOnlineTable();
        } else {
          $scope.tableText = "Showing offline data - departure time not in the realtime range(current time + 90 mins)";
          populateOfflineTable();
        }
      } else {
        $scope.tableText = "Showing offline data - departure time not in the realtime range(current time + 90 mins)";
        populateOfflineTable();
      }
    }
  }

  function populateOfflineTable() {
    $scope.results = [];
    $scope.finalResults = [];
    var request = window.indexedDB.open($scope.dbName);
    request.onsuccess = function(event) {
      var db = event.target.result;
      var transaction = db.transaction(["TrainStopTimes"]);
      var objectStore = transaction.objectStore("TrainStopTimes");
      var index = objectStore.index("stopIdTrainStopTimes");
      index.getAll($scope.search.dId).onsuccess = function(event) {
          for (index in event.target.result) {
            var time1 = new Date(new Date().toLocaleDateString()+" "+$scope.startTime.toLocaleTimeString());
            var time2 = new Date(new Date().toLocaleDateString()+" "+event.target.result[index].departureTime);
            if (time2 > time1) {
              var difference = time2.getTime() - time1.getTime();
              var resultInMinutes = Math.round(difference / 60000);
              if (resultInMinutes < 60) {
                  $scope.results.push(event.target.result[index]);
              }
            }
          }
          if ($scope.results.length == 0) {
            var node = {
              tripId: " ",
              departureTime: "There are no available trains for this route in the next 60 minutes",
              FinalDestArrival: " ",
              TravelDuration: " "
            };
            $scope.finalResults.push(node);
            $scope.$apply();
          } else {
            getDestination();
          }
      };
    };
  }
  function getDestination() {
    var request = window.indexedDB.open($scope.dbName);
    request.onsuccess = function(event) {
      var db = event.target.result;
      var transaction = db.transaction(["TrainStopTimes"]);
      var objectStore = transaction.objectStore("TrainStopTimes");
      for (i in $scope.results) {
        $scope.results[i]['FinalDestName'] = $scope.search.aName;
        $scope.results[i]['FinalDestId'] = $scope.search.aId;
        $scope.results[i]['FinalDestArrival'] = "";
        objectStore.index("compound1").get([$scope.results[i].tripId,$scope.search.aId]).onsuccess = function(event) {
          for(j in $scope.results) {
            if (event.target.result.tripId == $scope.results[j].tripId) {
              $scope.results[j]['FinalDestArrival'] = event.target.result.arrivalTime;
              var time1 = new Date(new Date().toLocaleDateString()+" "+$scope.results[j]['departureTime']);
              var time2 = new Date(new Date().toLocaleDateString()+" "+$scope.results[j]['FinalDestArrival']);
              var difference = time2.getTime() - time1.getTime();
              var resultInMinutes = Math.round(difference / 60000);
              $scope.results[j]['TravelDuration'] = resultInMinutes;
              $scope.finalResults.push($scope.results[j]);
              $scope.$apply();
            }
          }
        };
      }
      $scope.$apply();
    };
  }


  function HttpClient(url) {
    return new Promise(function(resolve, reject) {
      var anHttpRequest = new XMLHttpRequest();
      anHttpRequest.open('GET', url);
      anHttpRequest.onload = function() {
        if (anHttpRequest.status == 200) {
          resolve(anHttpRequest.response);
        }
        else {
          reject(Error(anHttpRequest.statusText));
        }
      };
      anHttpRequest.onerror = function() {
        reject(Error("Network Error"));
      };
      anHttpRequest.send();
    });
  }


  function compileOnlineFinalResults(inde,aObject) {
      var now = new Date();
      now.setMinutes(now.getMinutes() + parseInt(dObject[inde].minutes));
      var flag = 0;
      for (index2 in aObject) {
          if (dObject[inde].block_id == aObject[index2].block_id) {
            var now2 = new Date();
            now2.setMinutes(now2.getMinutes() + parseInt(aObject[index2].minutes));
            var node = {
              tripId: dObject[inde].block_id,
              departureTime: now.toLocaleTimeString(),
              FinalDestArrival: now2.toLocaleTimeString(),
              TravelDuration: parseInt(aObject[index2].minutes) - parseInt(dObject[inde].minutes)
            };
            flag = 1;
            $scope.finalResults.push(node);
            $scope.$apply();
          }
      }
  }
  var dObject = [];
  var aObject = [];
  function populateOnlineTable() {
    dObject = [];
    aObject = [];
    $scope.finalResults = [];
    var sequence = Promise.resolve();
    var dUrl = 'http://api.metro.net/agencies/lametro/stops/'+$scope.search.dId+'/predictions/';
    var aUrl = 'http://api.metro.net/agencies/lametro/stops/'+$scope.search.aId+'/predictions/';
    HttpClient(dUrl).then(function(response) {
      dObject = JSON.parse(response).items;
      HttpClient(aUrl).then(function(response2) {
        aObject = JSON.parse(response2).items;
        for (index in dObject) {
          compileOnlineFinalResults(index,aObject);
        }
        if ($scope.finalResults.length == 0) {
          var node = {
            tripId: " ",
            departureTime: "There are no available trains for this route in the next 90 minutes",
            FinalDestArrival: " ",
            TravelDuration: " "
          };
          $scope.finalResults.push(node);
          $scope.$apply();
        }
      }, function(error) {
        alert("Failed! 2");
      });
    }, function(error) {
      alert("Failed! 1");
    });
  }

});
