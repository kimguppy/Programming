function init() {
    createTable('#target', tableData);
    drawTable();
}

$(document).ready(function () {
    init();
});

var properties = ['num', 'location', 'name', 'division', 'lodgment'];

function createTable(target, tableData) {
    const targetId = $(target);
    tableData.forEach(function (item) {
        const row = document.createElement('div');
        row.setAttribute('class', 'table-row');
        Object.values(item).forEach(function (values) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'table-data');
            row.append(cell);
        });
        targetId.append(row);
    });
}

function drawTable() {
    var row = $(".table-row");
    var cell = $(".table-data");
    var rowLng = row.length;
    var cellLng = cell.length / rowLng;
    for(var k = 0; k < cell.length; k+=5){
        var slim1 = cell[k + 1];
        var slim2 = cell[k + 2];
        var slim3 = cell[k + 3];
        slim1.classList.add("location")
        slim2.classList.add("name")
        slim3.classList.add("division")
    }
    for (var i = 0; i < rowLng; i++) {
        for (var j = 0; j < cellLng; j++) {
            row[i].getElementsByClassName("table-data")[j].innerHTML = Object.values(tableData[i])[j];
        }
    }
}