var User = (function () {
    // Instance stores a reference to the Singleton
    var instance;

    function init() {
        // Singleton
        // Private methods and variables
        function privateMethod() {
            console.log("I am private");
        }

        var privateVariable = "Im also private";

        return {
            // Public methods
            fullName: function () {
                return instance.firstName + " " + instance.lastName;
            },
            setData: function(data) {
                angular.copy(data, this.data);
            },
            //Public Properties
            firstName: "Pradyumna",
            lastName: "Doddala",
            data: {}
        };
    }

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();