﻿var korgie = angular.module('korgie', ['lumx']);

korgie.controller('EventsCtrl', ['$scope', '$http', '$q', 'korgieApi', 'LxDialogService', function ($scope, $http, $q, korgieApi, LxDialogService) {
    var today = new Date();
    $scope.month = today.getMonth();
    $scope.year = today.getFullYear();
    $scope.events;
    $scope.days;
    $scope.dayToShow;

    function getMonthDays() {
        var result = [];

        var prevMonth, prevYear;
        if ($scope.month > -1) {
            prevMonth = $scope.month - 1;
            prevYear = $scope.year;
        } else {
            prevMonth = 11
            prevYear = $scope.year - 1;
        }
        var firstWeekDay = (new Date($scope.year, $scope.month, 1).getDay() + 6) % 7;

        var lastDayPrev = 33 - new Date(prevYear, prevMonth, 33).getDate();
        for (var j = firstWeekDay; j > 0; j--) {
            result.unshift({
                id: j - 1,
                day: lastDayPrev--,
                events: []
            });
        }
        var lastDay = 33 - new Date($scope.year, $scope.month, 33).getDate(), i = firstWeekDay;
        for (; i < lastDay + firstWeekDay; i++) {
            var evs = $scope.events.filter(function (ev) {
                var date = ev.Start;
                return date.getMonth() == $scope.month && date.getDate() == i - firstWeekDay + 1;
            });
            result.push({
                id: i,
                day: i - firstWeekDay + 1,
                month: $scope.month,
                year: $scope.year,
                events: evs,
                types: korgieApi.getTypes(evs)
            });
        }
        for (; i % 7 != 0; i++) {
            result[i] = {
                id: i,
                day: i - lastDay - firstWeekDay + 1,
                events: []
            };
        }
        console.log(result);
        return result;
    }

    $http.get('/WebSite/GetEvents', { params: { month: parseInt($scope.month) + 1, year: $scope.year } }).then(function successCallback(response) {
        korgieApi.convertEvents(response.data).then(function (events) {
            $scope.events = events;
            $scope.days = getMonthDays();
        });
    }, function errorCallback(response) {
        console.log('getting events failed');
    });

    /*$(document).ready(function () {
        var divs = $('month-day').children();
        divs.forEach(function (div) {
            if (!div.attr('month', undefined)) {
                div.css('box-shadow', 'rgba(0, 0, 0, 0.5) 0 0 2px');
            }
        });
    });*/

    $scope.nextMonth = function () {
        if ($scope.month < 11) {
            $scope.month++;
        } else {
            $scope.month = 0;
            $scope.year++;
        }
        $scope.days = getMonthDays();
    }

    $scope.prevMonth = function () {
        if ($scope.month > 0) {
            $scope.month--;
        } else {
            $scope.month = 11;
            $scope.year--;
        }
        $scope.days = getMonthDays();
    }

    $scope.showDay = function (index) {
        if ($scope.days[index].month != undefined) {
            $scope.dayToShow = $scope.days[index];
        }
    }

    $scope.showTypeEvents = function (type) {
        console.log(type);

        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    $scope.showHideMenu = function () {
        $('.header').toggleClass('opened-menu');
        $('.content').toggleClass('opened-menu');
        $('.dark-div').toggleClass('opened-menu');
    }

    $scope.opendDialog = function (dialogId) {
        LxDialogService.open(dialogId);
    };

    $scope.closingDialog = function () {
        LxNotificationService.info('Dialog closed!');
    };
}]);