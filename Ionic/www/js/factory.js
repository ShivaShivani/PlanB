/**
 * Created by akhilagaddala on 10/26/15.
 */
angular.module('PlanB.factory', [])
    .factory('Events', function () {
        var events = [];

        return {
            copy: function(allEvents) {

                events = allEvents;
            },
            create: function (event) {
                events.push(event);
            },
            all: function () {
                return events;
            },
            remove: function (event) {
                events.splice(events.indexOf(event));
            },
            get: function (eventId) {
                for (var i = 0; i < events.length; i++) {
                    if (events[i].id == eventId) {
                        return events[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Friends', function () {
        var friends = [];

        return {
            copy: function(allFriends) {

                friends = allFriends;
            },
            create: function (friend) {
                friends.push(friend);
            },
            all: function () {
                return friends;
            },
            remove: function (friend) {
                friends.splice(friends.indexOf(friend));
            },
            get: function (friendId) {
                for (var i = 0; i < friends.length; i++) {
                    if (friends[i].id == friendId) {
                        return friends[i];
                    }
                }
                return null;
            }
        };
    });