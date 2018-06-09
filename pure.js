
function addRowTable1() {

    if($("#number1").is(":invalid")){
        if($("#selectG1 option:selected").val() != $('input#number1').val()) {
            alert("Left input have incorrect value");
            return;
        }
    }

    if($("#number2").is(":invalid")){
        if($("#selectG2 option:selected").val() != $('input#number2').val()) {
            alert("Right input have incorrect value");
            return;
        }
    }

    $("#ModalW8").css("display","none");

    var col1_f = $('input#number1').val();
    var col1_s = $('input#number2').val();

    //var col2 = $('input[name=baz]:checked').val();
    var col2 = $('select#selpol2 option:checked').val();
    var col3 = $("select#selpol option:checked" ).val();

    if($('button[name = "buttonAddW8"]').text().indexOf("Изменить") != -1){
        var tdata = $("#tablepol1I tr.selected").children('td');
        tdata[0].innerText = col1_f + '>' + col1_s;
        tdata[1].innerText = col2;
        tdata[2].innerText = col3;
    }
    else {
        var strRow = '<tr><td>' + col1_f + '>' + col1_s +'</td><td>' + col2 + '</td><td>' + col3 + '</td></tr>';
        var indexRow = $("#tablepol1I tr.selected").index();

        if(indexRow == 0)
            $('#tablepol1I > tbody > tr:first').before(strRow);
        else if(indexRow > 0)
            $('#tablepol1I > tbody > tr:nth-child(' + indexRow + ')').after(strRow);
        else
            $('#tablepol1I > tbody').append(strRow);
        eventChangeRows();
        }
}

function addRowTable2() {

   /* $("#ModalW9").css("display","none");*/

    var col1 = $('input#number3').val();
    var thas = false;


    $('#tablegr1 tbody tr td:nth-child(1)').each( function(){
      if(col1 == $(this).text()) thas = true;
    });

    var col2 = $('input#number4').val();

    var optionValues = [];

    var index = $("#selectG3 option:selected").index();

    $("#selectG3 option").each(function() {
        optionValues.push($(this).val());
    });

    optionValues[index] = col2;

    var stext = optionValues.join(',');

    if($('button[name = "buttonAddW9"]').text().indexOf("Изменить") != -1){
        var tdata = $("#tablegr1 tr.selected").children('td');
        tdata[0].innerText = col1;
        tdata[1].innerText = stext;
        createListForGroup();
    }
    else {
        if(thas == true) alert("Группа с таким именем уже существует");
        else {
            $('#tablegr1 tbody').append('<tr><td>' + col1 + '</td><td>' + col2 + '</td>');
            eventChangeRows();
        }
    }

}

function changeCSS() {

    var tmp = $('body').css("font-size"); // Default 16px

    var th1 = $(".column").css("height") == "352px" ? "35em" : "22em";

    var tz = $(".column").css("height");

    var tls = (th1 == "22em") ? "15em" : "28em";

    $(".column, .colbutton").css("height", th1);

    $("#tablepol1I  > tbody, #tablegr1 > tbody").css("height", tls);
}

function changeHelp(name) {
    var text = name.innerText;

    $('#DivFlow3').html('<span class="close" onclick="baseDivHelp()">' +
        '&times;</span>' +
        '<strong>' + text + '</strong>');
}

function baseDivHelp() {
    $('#DivFlow3').html('<strong>Окно контекстной подсказки</strong> - всплывает по щелчку на сущность, если к ней есть подсказка. <br>\n' +
        '                                              Если щелкнуть по другой сущности с контекстной подсказкой, то новое окно должно появиться вместо текущего.');
}

function checkE1(ele) {
    var id = ele.id;

    var synL1 = "radioe1_1";
    var synL2 = "radioe1_2";
    var synL3 = "radioe1_3";

    var synR1 = "radioe1_upats_1";
    var synR2 = "radioe1_upats_2";
    var synR3 = "radioe1_upats_3";

    var temp = id == synL1 ? synR2 : (id == synL2 || id == synL3) ? synR1 : id == synR1 ? synL2 : synL1;
    document.getElementById(temp).checked = true;
}

function checkNet(ele) {

    var id = ele.id;

    var netL1 = "radioe1_4";
    var netL2 = "radioe1_5"

    var netR1 = "radioe1_upats_4";
    var netR2 = "radioe1_upats_5";

    var temp = id == netL1 ? netR2 : id == netL2 ? netR1 : id == netR1 ? netL2 : netL1;

    document.getElementById(temp).checked = true;
}

function createListGroup() {

    var items = [], options=[];

    $('#tablegr1 tbody tr td:nth-child(1)').each( function(){
        //add item to array
        items.push( $(this).text() );
    });

    //restrict array to unique items
    var items = $.unique( items );

    //iterate unique array and build array of select options
    $.each( items, function(i, item){
        options.push('<option value="' + item + '">' + item + '</option>');
    })

    //finally empty the select and append the items from the array
    $('#selectG1, #selectG2').empty().append( options.join() );
}

function createListForGroup() {

    var items = [], options=[];

    $('#tablegr1 tbody tr.selected td:nth-child(2)').text().split(',').forEach(function (item) {

        items.push(item);
    })

    //restrict array to unique items
    var items = $.unique( items );

    //iterate unique array and build array of select options
    $.each( items, function(i, item){
        options.push('<option value="' + item + '">' + item + '</option>');
    })

    //finally empty the select and append the items from the array
    $('#selectG3').empty().append( options.join() );
}

function createPanelChannels(){
    var divX = document.getElementById("contentleft");

    for(var j=0; j < 31 ; j++) {

        var divChild = document.createElement("div");
        divChild.className = "centralAndClear";
        divChild.id = "div_content_" + j;

        var divPF = document.createElement("p");
        divPF.className = "pcontext";

        var text=j;
        if(j<10) text = '\xa0' + j;
        if(j==0) text = "Порт";

        var t = document.createTextNode(text);
        divPF.appendChild(t);

        var divCircle_F = document.createElement("div");
        divCircle_F.className = "circleBase typeC";

        var divLeft = document.createElement("i");
        divLeft.className = (j!=0) ? "left" : "left hiding";

        var divLine = document.createElement("div");
        divLine.className = (j!=0) ? "line" : "line hiding";

        var divRight = document.createElement("i");
        divRight.className = (j!=0) ? "right" : "right hiding";

        var divCircle_S = document.createElement("div");
        divCircle_S.className = "circleBase typeC";

        var divPS = document.createElement("p");
        divPS.className = "pcontext";

        var t = document.createTextNode(text);
        divPS.appendChild(t);

        divChild.appendChild(divPF);

        divChild.appendChild(divCircle_F);
        divChild.appendChild(divLeft);
        divChild.appendChild(divLine);
        divChild.appendChild(divRight);
        divChild.appendChild(divCircle_S);
        divChild.appendChild(divPS);
        divX.appendChild(divChild);
    }

    var divHR = document.createElement("hr");
    divX.appendChild(divHR);

    for(var j = 0; j < 4; j++) {

        var divChild = document.createElement("div");

        divChild.className = "centralAndClear";

        divChild.style.cssFloat = "left";
        divChild.style.left = "20%";


        var divPF = document.createElement("p");
        divPF.className = "pcontext";
        var text = (j==0) ? "Канал свободен" : (j==1) ? "Канал занят" : (j==2) ? "Нарушение" : "Канал не активен";


        var t = document.createTextNode(text);
        divPF.appendChild(t);

        var circleClass = "circleBase typeC dLegend";
        if(j == 1) circleClass += " greenCircle";
        else if(j == 2) circleClass += " redCircle";
        else if(j == 3) circleClass += " grayCircle";

        var divCircle_F = document.createElement("div");
        divCircle_F.className = circleClass;

        var divPS = document.createElement("p");
        divPS.className = "pcontext";
        var t = document.createTextNode(text);

        divPS.appendChild(t);
        divChild.appendChild(divCircle_F);
        divChild.appendChild(divPF);
        divX.appendChild(divChild);
    }
}

function createTableP(id) {
    var last = id.slice(-1);
    var nameTable1 = 'tablePolitic_1_P' + last;
    var nameTable2 = 'tablePolitic_2_P' + last;
    var nameRem1 = 'remRow1P' + last;
    var nameRem2 = 'remRow2P' + last;
    var nameEdit1 = 'editRow1';
    var nameEdit2 = 'editRow2';
    var nameup1 = 'up1';
    var nameup2 = 'up2';
    var namedown1 = 'down1';
    var namedown2 = 'down2';
    var classnameRem1 = "\"buttons child tooltip " + nameRem1 + "\"";
    var classnameEdit1 = "\"buttons child tooltip " + nameEdit1 + "\"";
    var classnameUp1 = "\"buttons child tooltip " + nameup1 + "\"";
    var classnameDown1 = "\"buttons child tooltip " + namedown1 + "\"";

    var idDivTablePIn  = "divtableP" + last + "I";
    var idDivTablePOut = "divtableP" + last + "O";

    var idDivTableG = "divtableG" + last;

    var nametabs = "tabsnew" + last;
    var nameinput1 = "tabnew1" + last;
    var nameinput2 = "tabnew2" + last;
    var namesection1 = "contentN1" + last;
    var namesection2 = "contentN2" + last;

    var result = '' +
        '<div class="column">' +
        '<p style="text-align: center; font-size: 1.1em">Политики</p>\n' +
        '     <div class=' + nametabs + '>\n' +
        '    <input id=' + nameinput1 +  ' type="radio" name=' + nametabs +' checked>\n' +
        '    <label for='+ nameinput1 + '>Входящие</label>\n' +
        '\n' +
        '    <input id=' + nameinput2 +' type="radio" name='+ nametabs + ' >\n' +
        '    <label for=' + nameinput2 +'>Исходящие</label>\n' +
        '\n' +
        '    <sectionP id=' + namesection1  + '><div id=' +  + '></div></sectionP>\n' +
        '\n' +
        '    <sectionP id= ' + namesection2 + '><div id=' +  + '></div></sectionP>\n' +
        '</div>' +
        '<p style="float: right; height: 1.6em; ">\n' +
        '    Политика по умолчанию\n <strong>Заперетить</strong>' +
        '<label class="switch" style="width: 3.2em; ">\n' +
        '    <input type="checkbox" checked>\n' +
        '    <span class="sliderDefPol round"></span>\n' +
        '</label>\n' +
        '     <strong>Разрешить</strong></p>                                                      <div class="parent">\n' +
        '                                                          <button class="buttons child addRow" id="BtnModal8" >+</button>\n' +
        '\n' +
        '                                                          <div id="ModalW8" class="modal">\n' +
        '\n' +
        '                                                              <div class="row" style="width: 33% ; margin: auto; background-color: indianred " >\n' +
        '\n' +
        '                                                                      <p id="pAddPolitice" class="font_sizing_m">Добавление новой политики</p><hr>\n' +
        '\n' +
        '                                                                      <p class="fieldgroup2">Номера\n' +
        '                                                                          <input style="width: 25%; margin-left: 4em" id="number1" pattern="((\x5b\\d-\\d\x5d)|(\x2A)|(\x2B)|(\\d)|(\x3F))*"/>\n' +
        '                                                                          <select name="footerLayout" id="selectG1" style="width: 10%"></select>>\n' +
        '\n' +
        '                                                                          <input  style="width: 25%" id="number2" pattern="((\x5b\\d-\\d\x5d)|(\x2A)|(\x2B)|(\\d)|(\x3F))*"/>\n' +
        '                                                                          <select name="footerLayout" id="selectG2" style="width: 10%"></select>\n' +
        '                                                                      </p>\n' +
        '\n' +
        '                                                                      <div>\n' +
        '                                                                          <p class="fieldgroup2">Направление</p>\n' +
        '                                                                              <select id="selpol2">\n' +
        '                                                                                  <option value="ТфОП > УПАТС" selected="selected">ТфОП > УПАТС</option>\n' +
        '                                                                                  <option value="УПАТС > ТфОП">УПАТС > ТфОП</option>\n' +
        '                                                                              </select>\n' +
        '                                                                          <form style="display: none" id="formpol">\n' +
        '\n' +
        '                                                                              <div class="fieldgroup2">\n' +
        '                                                                                  <input type="radio" name="baz" id="radiop1" checked="checked" value="ТфОП > УПАТС">ТфОП > УПАТС\n' +
        '                                                                              </div>\n' +
        '                                                                              <div class="fieldgroup2">\n' +
        '                                                                                  <input type="radio" name="baz" id="radiop2" value="УПАТС > ТфОП">УПАТС > ТфОП\n' +
        '                                                                              </div>\n' +
        '                                                                          </form>\n' +
        '                                                                      </div>\n' +
        '                                                                      <div style="clear: both">\n' +
        '                                                                          <p class="fieldgroup2">Действие\n' +
        '                                                                              <select id="selpol"  style="margin-left: 3em">\n' +
        '                                                                                  <option value="Разрешить">Разрешить</option>\n' +
        '                                                                                  <option value="Запретить">Запретить</option>\n' +
        '                                                                              </select>\n' +
        '                                                                          </p>\n' +
        '                                                                      </div>\n' +
        '\n' +
        '                                                                      <div style="clear: both">\n' +
        '                                                                          <div><button class="closeModals" value=\'ModalW8\' style="float: left; width: 30%;">Отмена</button>\n' +
        '                                                                              <button name = "buttonAddW8" value=\'ModalW8\' style="float: right; width: 30%;"\n' +
        '                                                                                      onclick="addRowTable1()">Добавить</button>\n' +
        '                                                                          </div>\n' +
        '                                                                      </div>\n' +
        '                                                              </div>\n' +
        '                                                          </div>\n' +
        '                                                          <button class='+ classnameRem1  + '>    -   <span id="tooltiptext1">   Выберите строку!</span></button>\n' +
        '                                                          <button class='+ classnameEdit1 + '>&#x270E;<span class="tooltiptext"> Выберите строку!</span></button>\n' +
        '                                                          <button class='+ classnameUp1 + '>  &#x2191;<span class="tooltiptext"> Выберите строку!</span></button>\n' +
        '                                                          <button class='+ classnameDown1 + '>&#x2193;<span class="tooltiptext"> Выберите строку!</span></button>\n' +
        '                                                          <input type="text" id="myInput" class="child_search" onkeyup="myFunctionFinder(\'myInput\',\'tablepol1I\')" placeholder="Поиск по номеру..">\n' +
        '                                                      </div>\n' +
        '                                                  </div>\n' +
        '\n' +
        '                                        <!--          <button class="colbutton" onclick="changeCSS()"><strong>&#8597;</strong></button> -->\n' +
        '\n' +
        '                                                  <div class="column right_column" style="width: 47%"><p style="text-align: center; font-size: 1.1em">Группы</p>\n' +
        '                                                      <div id=' + idDivTableG + '  style="margin-top: 2.6em"></div>\n' +
        '                                                      <div class="parent">\n' +
        '                                                          <button class="buttons child addRow2" id="BtnModal9">+</button>\n' +
        '                                                          <button class="buttons child remRow2">-</button>\n' +
        '                                                          <button class="buttons child editRow2">&#x270E;</button>\n' +
        '                                                          <input type="text" id="myInput2" class="child_search" onkeyup="myFunctionFinder(\'myInput2\',\'tablegr1\')" placeholder="Search for number.." title="Type in a name">\n' +
        '                                                      </div>\n' +
        '                                                  </div>';
    document.getElementById(id).innerHTML = result;
    return true;
}

function date_time(id) {
    date = new Date;
    year = date.getFullYear();
    month = date.getMonth();
    months = new Array('Янв', 'Фев', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек');
    d = date.getDate();
    day = date.getDay();
    days = new Array('Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота');
    h = date.getHours();
    if(h<10)
    {
        h = "0"+h;
    }
    m = date.getMinutes();
    if(m<10)
    {
        m = "0"+m;
    }
    s = date.getSeconds();
    if(s<10)
    {
        s = "0"+s;
    }
    result =  '<span style="font-size: 1.2em">' + h+':'+m + '</span>'  + '      ' +  '<span style="font-size: 0.8em">'  + months[month] + ' ' + d + '</span>';
    document.getElementById(id).innerHTML = result;
    setTimeout('date_time("'+id+'");','1000');
    return true;
}

function myFunctionFinder(nameinput, nametable) {
    var input, filter, table, tr, td, i;
    input = document.getElementById(nameinput);
    filter = input.value.toUpperCase();
    table = document.getElementById(nametable);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sortTable(n, name) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(name);
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function syncDate(ele) {
    document.getElementById("autosyncf").disabled = !ele.checked;
    var state = ele.checked == false ? "auto" : "none";
    $('#datetime').prop('disabled', ele.checked);
    /*
    $('#ip1').css("pointer-events", state);
    $('#buttondate1').css("pointer-events", state);
    */
}

function eventChangeRows(){
    $(".tableP tbody tr").click(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        var value=$(this).find('td:first').html();
        var table = (this).closest('table');
        if(table.id == "tablepol1I"){
            eventTooltipHide_1();
        }
    });
}

function eventTooltipHide_1(){
    $(".remRow1P1").children().hide();
    $('.editRow1').children().hide();
    $('.up1').children().hide();
    $('.down1').children().hide();
}

function eventTooltipShow_1(){
    $(".remRow1P1").children().show();
    $('.editRow1').children().show();
    $('.up1').children().show();
    $('.down1').children().show();
}

$(document).ready(function () {

    createTableP("#rowP1");
    createTableP("#rowP2");
    createTableP("#rowP3");

    createListGroup();

    $(":input").inputmask();

    window.onload = date_time('#clock');

    $("#syncCheckBox").click();

    $("#BtnModal9").click(function(){
        createListForGroup();
    })

  /*  $('#tablepol1I tr:last').after('<tr>...</tr><tr>...</tr><tr>...</tr>');*/

    $(".remRow1P1").click(function() {

        var indexRow = $("#tablepol1I tr.selected").index();

        if(indexRow != -1) {
            $("#tablepol1I tr.selected").remove();
        }
        eventTooltipShow_1();
    });

    $(".remRow2").click(function() {
        $("#tablegr1 tr.selected").remove();
    });

    $(".up1,.down1").click(function () {

        var table = (this).closest('table');

        var row = $("#tablepol1I tr.selected");

        if($(this).is('.up1')){
            row.insertBefore(row.prev());
        }

        else{
            row.insertAfter(row.next());
        }

    });

    $(".addRow, .editRow1").click(function () {
        if($(this).is('.addRow')) {
            $('button[name = "buttonAddW8"]').text("Добавить");
            $('#pAddPolitice').text("Добавление новой политики");
        }
        else {
            $('button[name = "buttonAddW8"]').text("Изменить");
            $('#pAddPolitice').text("Изменение политики");
        }
    })

    $(".addRow2, .editRow2").click(function () {
        if($(this).is('.addRow2')) {
            $('button[name = "buttonAddW9"]').text("Добавить");
            $('#pAddGroup').text("Добавление новой группы");
        }
        else {
            $('button[name = "buttonAddW9"]').text("Изменить");
            $('#pAddGroup').text("Изменение группы");
        }
    })

    $(".editRow1").click(function () {

        var tdata = $("#tablepol1I tr.selected").children('td');

        var str = tdata[0].innerText;

        var indexs = tdata[0].innerText.indexOf('>');

        var str1 = str.substring(0 ,indexs);

        var str2 = str.substring(indexs + 1);

        var strcheck = tdata[1].innerText;

        var selpol2 = tdata[1].innerText[0] == "У" ? "УПАТС > ТфОП" : "ТфОП > УПАТС";

        document.getElementById((strcheck[0] == 'У') ? "radiop2" : "radiop1").checked = true;

        //$('input[name=baz]').filter(function(){return this.value === temp; }).attr('checked', true);  WHY NOT WORK!? :(

        $('input#number1').val(str1);
        $('input#number2').val(str2);
        $("#selpol").val(tdata[2].innerText);
        $("#selpol2").val(selpol2);

        $("#ModalW8").css("display","block");
    })

    $(".editRow2").click(function () {

        var sd = $('#tablegr1 tbody tr.selected td');

        if(!sd.length)return;

        var str1 = $('#tablegr1 tbody tr.selected td:nth-child(1)').text();

        $('input#number3').val(str1);

        createListForGroup();

        var str2 = $('#selectG3')[0].innerText.split(',' , 1);

        $('input#number4').val(str2);

        $("#ModalW9").css("display","block");
    })

    $('#selectG1, #selectG2, #selectG3').change(function() {
        var selector = $(this).val(); //Create selector

        if($(this).is('#selectG1'))
            $('input#number1').val(selector);

        else if($(this).is('#selectG2'))
             $('input#number2').val(selector);

        else{$('input#number4').val(selector);}
    });

    $('#saveconfig, #cancelconfig').click(function () {
        $('#DivConf').css("display", "none");
    })

    eventChangeRows();

    {
        var arr = [];
        var am = "ModalW";
        var btn = "BtnModal";
        var countModals = 9;

        for (var i = 1; i <= countModals; i++) {
            arr.push({
                key: am + i,
                mbutton: btn + i
            });
        }

        arr.forEach(function (value) {
            // Get the modal
            var modal = document.getElementById(value.key);
            var btn = document.getElementById(value.mbutton);

            btn.onclick = function () {
                modal.style.display = "block";
            }
        });

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            var modals = document.getElementsByClassName("modal");
            mLen = modals.length;
            for(i = 0; i < mLen;i++){
                if (event.target == modals[i]) {
                    modals[i].style.display = "none";
                }
            }
        }

        var buttonsC = document.getElementsByClassName("closeModals");
        bLen = buttonsC.length;
        for (i = 0; i < bLen; i++) {
            buttonsC[i].onclick = function() {
                document.getElementById(this.value).style.display = "none";
            }
        }

        var sliderA = document.getElementById("sliderA");
        var outputA = document.getElementById("lineA");
        outputA.value = sliderA.value;

        sliderA.oninput = function () {
            this.value=this.value.replace(/[^0-9]/g,'');
            // this.value=this.value.replace(/\d+(\.\d{1,2})?/g,'');
            // if (this.value == '') this.value = 3;
            // if (this.value < 1) this.value = 3;
            // if (this.value > 10) this.value = Number(this.value.toString().slice(0,-1));
            outputA.value = this.value;
        }
        outputA.oninput = function () {
            sliderA.value = this.value;
        }

        var sliderB = document.getElementById("sliderB");
        var outputB = document.getElementById("lineB");
        outputB.value = sliderB.value;

        sliderB.oninput = function () {
            outputB.value = this.value;
        }
        outputB.oninput = function () {
            this.value=this.value.replace(/[^0-9]/g,'');
            if (this.value == '') this.value = 1;
            if (this.value < 1) this.value = 1;
            if (this.value > 10) this.value = Number(this.value.toString().slice(0,-1));
            sliderB.value = this.value;
        }
    }


    /* THIS 'Inputmask.extendAliases' is just to override the paths
    to 'phone-codes.js' that are hardcoded in the 'jquery.inputmask.bundle.min.js'. */
    /*
    var maskList = [];
    var ajaxRes = $.ajax({
        url: "https://bowercdn.net/c/jquery.inputmask-3.2.5/extra/phone-codes/phone-codes.js",
        async: !1,
        dataType: "json",
        success: function(response) {
            maskList = response;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            // alert(thrownError + " - " + opts.url);
        }
    });




    //Inputmask('phone').mask('#forinputmask');
    $('#forinputmask').inputmask("phone", {
        onKeyValidation: function () {
            if( $('#forinputmask').inputmask('unmaskedvalue') ) {
                $('.phone-country').text($(this).inputmask("getmetadata")["cd"]);
                var countryCode = String($(this).inputmask("getmetadata")["cc"].toLowerCase()),
                    link = "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/1.0.0/flags/4x3/"+countryCode+".svg";
                $('.flag').css({display:'inline-block','background-image':"url('"+link+"')"});
            }
        },
        "oncleared": function(){
            $('.phone-country').text('');
            $('.flag').css({'background-image':"none"});
        }
    });
    */

});

/*
Inputmask.extendAliases({

        onUnMask: function (value)
        {
            var exp = /(\x5b9-9\x5d)|(\x2A)|(\x2B)|(9)|(\x3F)/g;
            return value.replace ( exp, '' );
        },

        oncomplete: function() {
           // do something
        },
        onincomplete: function() {
           // do something
        }
    }
});
*/

Inputmask.extendAliases({
    'numeric': {
        "prefix":"Rp",
        "digits":0,
        "digitsOptional":false,
        "decimalProtect":true,
        "groupSeparator":",",
        "radixPoint":".",
        "radixFocus":true,
        "autoGroup":true,
        "autoUnmask":true,
        "removeMaskOnSubmit":true
    }
});

Inputmask.extendAliases({
    'extendAliasIP': {

        definitions: {
            '*': {
                validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                casing: "lower"
            },
            't': {
                validator: "[1-9]|1[0-2]"
            },

            '2': {
                validator: "[0-2]"
            },

            '8': {
                validator: "[6-8]"
            }

        },

        mask: "8|2",

        oncomplete: function() {
            alert("Not full");// do something
        },
        onincomplete: function() {
            alert("You are Good!Man!");// do something
        }

    }
});

Inputmask.extendAliases({
    'ip':{
        placeholder:''
    }
})

/*

ko.validation.rules['phone-inputmask'] = {
    validator: function (val, otherVal) {
            return Inputmask.isValid(val, { alias: 'phone'})
    },
    message: 'Incorrect or incomplete phone'
};



ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null,
    decorateInputElement: true,
    errorElementClass: 'form-error',
    errorsAsTitle: true
}, true);

var myVM = {
    phone: ko.observable().extend({'phone-inputmask': {params: 'phone'}, rateLimit: { timeout: 200, method: "notifyWhenChangesStop" } }),
    email: ko.observable().extend({ email: {params: true, message: "Incorrect email"} })
};

ko.applyBindings(myVM);

*/

