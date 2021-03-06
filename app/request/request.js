angular.module('app.request', [])

.controller('RequestController', function($scope, $sce, request, speech) {
  $scope.data = {};
  $scope.home = 'Hi, I\'m kirk!';
  $scope.home2 = 'What can I do for you?';
  $scope.home3 = "Kyle Ian Rico Kevin"
  jQuery('#waves').show();
  jQuery('body').addClass('bg');
  record();
  setInterval(record, 5000);


  function record() {
    if (speech.checkRecognition()) {
      var recognition = speech.createRecognition();
      speech.speechToText(recognition, $scope.data, function(data) {

        request.sendRequest(data)
          .then(function(APIdata) {
            $scope.home = '';
            $scope.home2 = '';

            jQuery('#waves').hide();
            jQuery('body').removeClass('bg');
            $scope.APIdata = $sce.trustAsHtml(APIdata.data);
            $scope.home3 = '';
          })
          .catch(function (error) {
            console.error('Rendering HTML for APIdata unsuccessful ' + error);
          });

      });
    }
  }

});