﻿
korgie.controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.openSettings = function () {
        $('.section-event-page').hide();
        $('.section-settings-page').show();
        $('#events').removeClass("btn--raised");
        $('#events').addClass("btn--flat");
        $('#settings').removeClass("btn--icon");
        $('#settings').addClass("btn--fab");
    }
    $scope.openEvents = function () {
        $('.section-event-page').show();
        $('.section-settings-page').hide();
        $('#events').removeClass("btn--flat");
        $('#events').addClass("btn--raised");
        $('#settings').removeClass("btn--fab");
        $('#settings').addClass("btn--icon");
    }
}]);