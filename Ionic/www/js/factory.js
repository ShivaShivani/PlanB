/**
 * Created by akhilagaddala on 10/26/15.
 */
angular.module('PlanB.factory', [])
    .factory('Events', function () {
        var events = [];

        return {
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
    });