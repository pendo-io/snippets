(function () {
    var translate = {
        "1" : "/path/to/one.png",
        "2" : "/path/to/two.png",
        "3" : "/path/to/three.png",
        "4" : "/path/to/four.png"
    }

    // Replace every number listed in translate (the old loop stopped before "4")
    Object.keys(translate).forEach(function (number) {
        pendo.dom('._pendo-number-scale-poll-' + number).html('<img src="' + translate[number] + '" style="height: 43px; width: 43px;" alt="' + number + '">');
    });
})();