(function () {
    var translate = {
        "1" : "/path/to/one.png",
        "2" : "/path/to/two.png",
        "3" : "/path/to/three.png",
        "4" : "/path/to/four.png"
    }

    for (i = 1; i < 4; i++) {
        if (translate.hasOwnProperty(i)) {
            pendo.dom('._pendo-number-scale-poll-' + i).html('<img src="' + translate[i] + '" style="height: 43px; width: 43px;" alt="' + i + '">');
        }
    }
})();