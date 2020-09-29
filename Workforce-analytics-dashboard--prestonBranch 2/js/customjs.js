(function () {
    var app = angular.module('myApp', []);
    app.controller('MyController', ['$scope', myController]);
    var name='';
    var email='';

    var excelJsonObj = [];
    function myController($scope) {
        $scope.uploadExcel = function () {
            var myFile = document.getElementById('file');
            var input = myFile;
            var reader = new FileReader();
            reader.onload = function () {
                var fileData = reader.result;
                var workbook = XLSX.read(fileData, { type: 'binary' });

                var sheet0 = workbook.Sheets[workbook.SheetNames[0]];
                var str = XLSX.utils.sheet_to_json(sheet0);
                for (var i in str) {
                    name = str[i].NAME;
                    email = str[i].EMAIL;
                    if(name==null){
                        alert("Please check the file content!");
                        break;
                    }
                    $('.myTable tbody:last-child').append("<tr><td>" + "<input class =\"checkbox\" type=\"checkbox\" name=\"smallbox\"/></td><td class=\"myname\">"+ name + "</td><td class=\"myemail\">" + email + "</td></tr>");
                }
            };
            reader.readAsBinaryString(input.files[0]);
        };
    }
})();

