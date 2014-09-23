'use strict';

/**
 * @ngdoc function
 * @name angularHighchartsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularHighchartsApp
 */
angular.module('angularHighchartsApp')
  .controller('MainCtrl', [
    '$scope', 
    '$log',
    '$http',
    function($scope, $log, $http) {
      // Accordion setting
      $scope.accordion = {
        chartStatus: true,
        settingsStatus: false,
        seriesStatus: false
      };
      
      $scope.chartTypes = [{
        "id": "line", "title": "Line"
      }, {
        "id": "spline", "title": "Smooth line"
      }, {
        "id": "area", "title": "Area"
      }, {
        "id": "areaspline", "title": "Smooth area"
      }, {
        "id": "column", "title": "Column"
      }, {
        "id": "bar", "title": "Bar"
      }, {
        "id": "pie", "title": "Pie"
      }, {
        "id": "scatter", "title": "Scatter"
      }];

      $scope.chartConfig = {
        options: {
          chart: {
            type: 'areaspline'
          },
          plotOptions: {
            series: {
              stacking: ''
            }
          }
        },
        series: $scope.chartSeries,
        title: {
          text: 'Sample Chart'
        },
        credit: {
          enabled: false
        },
        loading: false,
        size: {}
      };

      $scope.reflow = function(e) {
        $log.debug('* reflow');
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        $scope.$broadcast('highchartsng.reflow');
      };

      (function() {
        $http({ method: 'GET', url: '/data/series.json' })
          .success(function(data) {
            $log.debug(data);
            $scope.chartConfig.series = data;
          })
          .error(function(data, status) {
            $log.debug('Failed to fetch series data: %s', status);
          });
      })();
    }]);
