'use strict';

// load angular app after the Google Maps API
function onGoogleReady() {
    console.log("Google maps api initialized.rr");
    angular.bootstrap(document.getElementById("map"), ['doc.ui-map']);
}

angular.module('TweetMap', ['ngRoute', 'ui.map', 'SocketService'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'TweetCtrl'
            }).otherwise({
                redirectTo: '/'
            });
    }])

    .controller('TweetCtrl', ['$scope', 'socket', function ($scope, socket) {
        var LIMIT_TWEETS = 1000;

        // A google.maps namespaced objects for ease-of-access
        var Marker = google.maps.Marker;
        var LatLng = google.maps.LatLng;

        $scope.copyrightDate = new Date();
        $scope.tweets = [];
        $scope.tweetMarkers = [];
        $scope.totalTweets = 0;

        socket.on('tweets', function (tweet) {
            if ($scope.totalTweets >= LIMIT_TWEETS) {
                // disconnect socket connection when total of Irish tweets reach 1000 tweets
                socket.disconnect();
            } else {
                addTweet(tweet);
            }
        });

        //Map setup
        $scope.mapOptions = {
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new LatLng(53.34, -6.26) // focus on Ireland (Dublin)
        };

        $scope.openMarkerInfo = function (marker) {
            $scope.currentMarker = marker;
            $scope.currentMarkerLat = marker.getPosition().lat();
            $scope.currentMarkerLng = marker.getPosition().lng();
            $scope.user = marker.getTitle();
            $scope.image = marker.getIcon();
            $scope.myInfoWindow.open($scope.tweetMap, marker);
        };

        $scope.clearAllTweets = function () {
            $scope.tweets.length = 0;
            $scope.tweetMarkers.length = 0;
            $scope.totalTweets = 0;
            // TODO: (martin) add code here that will remove markers from google map when user click "Clear all tweet" button. Find how angular can access google map and remove markers from GUI
        }

        // TODO: (martin) move below functions to a service layer
        var addTweet = function (tweet) {
            $scope.tweets.unshift(new Tweet(tweet.user, tweet.text, tweet.image, tweet.geo, tweet.latitude, tweet.longitude));
            addMarker(tweet);
            $scope.totalTweets++;
        }

        // TODO: (martin) not happy with this as I can't pass User details to the marker - "find better solution for this"
        var marker_for = function (lat, lng, user, image) {
            var marker = new Marker({
                position: new LatLng(lat, lng),
                draggable: false,
                animation: google.maps.Animation.DROP,
                map: $scope.tweetMap,
                title: user
            });
            return marker;
        };

        var addMarker = function (tweet) {
            var marker = marker_for(tweet.latitude, tweet.longitude, tweet.user, tweet.image);
            $scope.tweetMarkers.push(marker);
        };
    }])


