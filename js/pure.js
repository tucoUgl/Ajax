var GLOBALTABLE;
function addRowTable1() {

    var tableName = GLOBALTABLE;

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

    var col1 = $('input#number1').val();
    var col2 = $('input#number2').val();

    //var col2 = $('input[name=baz]:checked').val();
    var col3 = $("select#selpol option:checked" ).val();

    if($('button[name = "buttonAddW8"]').text().indexOf("Изменить") != -1){
        var tdata = $(tableName + " tr.selected").children('td');
        tdata[0].innerText = col1;
        tdata[1].innerText = col2;
        tdata[2].innerText = col3;
    }
    else {
        var strRow = '<tr><td>' + col1 +'</td><td>' + col2 + '</td><td>' + col3 + '</td></tr>';
        var indexRow = $(tableName + " tr.selected").index();

        if(indexRow == 0)
            $(tableName + ' > tbody > tr:first').before(strRow);
        else if(indexRow > 0)
            $(tableName + ' > tbody > tr:nth-child(' + indexRow + ')').after(strRow);
        else
            $(tableName + ' > tbody').append(strRow);
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


var ElementArray = [];


function createListGroup() {

    var items = [], options=[];

     $('#tablegr1 tbody tr td:nth-child(1)').each( function(){
        //add item to array
        var text =  $(this).text();
        items.push( text );
        ElementArray.push({ id: text, label: text});
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

function date_time(id) {
    date = new Date;
    year = date.getFullYear();
    month = date.getMonth();
    months = new Array('Янв', 'Фев', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек');
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
    result =  '<span style="font-size: 1.2em">' + h+':'+m + '</span>'  + '      ' +  '<span style="font-size: 0.8em">'  + d  + ' '+ months[month]  + ' ' + year + '</span>';
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

function syncDate() {
    var state = !document.getElementById("syncCheckBox").checked;
    document.getElementById("autosyncf").disabled = state;
    $('#datetime').prop('disabled', state);
    /*
    $('#ip1').css("pointer-events", state);
    $('#buttondate1').css("pointer-events", state);
    */
}

function eventChangeRows(){
    $(".tableP tbody tr, .tableG tbody tr").click(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        var value=$(this).find('td:first').html();
        var table = (this).closest('table');
        if(table.id == "tablepol1I"){
            eventTooltipHide_1("In1");
        }
        if(table.id == "tablepol2I"){
            eventTooltipHide_1("In2");
        }
        if(table.id == "tablepol3I"){
            eventTooltipHide_1("In3");
        }
        if(table.id == "tablepol4I"){
            eventTooltipHide_1("In4");
        }
        if(table.id == "tablepol1O"){
            eventTooltipHide_1("Out1");
        }
        if(table.id == "tablepol2O"){
            eventTooltipHide_1("Out2");
        }
        if(table.id == "tablepol3O"){
            eventTooltipHide_1("Out3");
        }
        if(table.id == "tablepol4O"){
            eventTooltipHide_1("Out4");
        }
    });
}

function eventTooltipHide_1(name){
    $(".remRow" + name).children().hide();
    $(".editRow" + name).children().hide();
    $(".up" + name).children().hide();
    $(".down" + name).children().hide();
}

function eventTooltipShow_1(name){
    $(".remRow" + name).children().show();
    $(".editRow" + name).children().show();
    $(".up" + name).children().show();
    $(".down" + name).children().show();
}

function funcDocumentReady() {

    createListGroup();

    $(":input").inputmask();

    window.onload = date_time('#clock');

    $("#syncCheckBox").click();

    $("#BtnModal9").click(function(){
        createListForGroup();
    })

  /*  $('#tablepol1I tr:last').after('<tr>...</tr><tr>...</tr><tr>...</tr>');*/

    $(".remRowIn1").click(function() {

        var indexRow = $("#tablepol1I tr.selected").index();

        if(indexRow != -1) {
            $("#tablepol1I tr.selected").remove();
        }
        eventTooltipShow_1("In1");
    });
    $(".remRowIn2").click(function() {

        var indexRow = $("#tablepol2I tr.selected").index();

        if(indexRow != -1) {
            $("#tablepol2I tr.selected").remove();
        }
        eventTooltipShow_1("In2");
    });
    $(".remRowIn3").click(function() {

        var indexRow = $("#tablepol3I tr.selected").index();

        if(indexRow != -1) {
            $("#tablepol3I tr.selected").remove();
        }
        eventTooltipShow_1("In3");
    });
    $(".remRowIn4").click(function() {

        var indexRow = $("#tablepol4I tr.selected").index();

        if(indexRow != -1) {
            $("#tablepol4I tr.selected").remove();
        }
        eventTooltipShow_1("In4");
    });

    $(".remRowOut1").click(function() {

        var indexRow = $("#tablepol1O tr.selected").index();

        if(indexRow != -1) {
            $("#tablepol1O tr.selected").remove();
        }
        eventTooltipShow_1("Out1");
    });
    $(".remRowOut2").click(function() {

        var indexRow = $("#tablepol2O tr.selected").index();

        if(indexRow != -1) {
            $("#tablepol2O tr.selected").remove();
        }
        eventTooltipShow_1("Out2");
    });
    $(".remRowOut3").click(function() {

        var indexRow = $("#tablepol3O tr.selected").index();

        if(indexRow != -1) {
            $("#tablepol3O tr.selected").remove();
        }
        eventTooltipShow_1("Out3");
    });
    $(".remRowOut4").click(function() {

        var indexRow = $("#tablepol4O tr.selected").index();

        if(indexRow != -1) {
            $("#tablepol4O tr.selected").remove();
        }
        eventTooltipShow_1("Out4");
    });

    $(".remRow2").click(function() {
        $("#tablegr1 tr.selected").remove();
    });

    $(".upIn1,.downIn1").click(function () {

        var table = (this).closest('table');

        var row = $("#tablepol1I tr.selected");

        if($(this).is('.upIn1')){
            row.insertBefore(row.prev());
        }
        else{
            row.insertAfter(row.next());
        }
    });

    $(".upIn2,.downIn2").click(function () {

        var row = $("#tablepol2I tr.selected");

        if($(this).is('.upIn2')){
            row.insertBefore(row.prev());
        }
        else{
            row.insertAfter(row.next());
        }
    });

    $(".upIn3,.downIn3").click(function () {

        var row = $("#tablepol3I tr.selected");

        if($(this).is('.upIn3')){
            row.insertBefore(row.prev());
        }
        else{
            row.insertAfter(row.next());
        }
    });

    $(".upIn4,.downIn4").click(function () {

        var row = $("#tablepol4I tr.selected");

        if($(this).is('.upIn4')){
            row.insertBefore(row.prev());
        }
        else{
            row.insertAfter(row.next());
        }
    });

    $(".upOut1,.downOut1").click(function () {

        var row = $("#tablepol1O tr.selected");

        if($(this).is('.upOut1')){
            row.insertBefore(row.prev());
        }
        else{
            row.insertAfter(row.next());
        }
    });
    $(".upOut2,.downOut2").click(function () {

        var row = $("#tablepol2O tr.selected");

        if($(this).is('.upOut2')){
            row.insertBefore(row.prev());
        }
        else{
            row.insertAfter(row.next());
        }
    });
    $(".upOut3,.downOut3").click(function () {

        var row = $("#tablepol3O tr.selected");

        if($(this).is('.upOut3')){
            row.insertBefore(row.prev());
        }
        else{
            row.insertAfter(row.next());
        }
    });
    $(".upOut4,.downOut4").click(function () {

        var row = $("#tablepol4O tr.selected");

        if($(this).is('.upOut4')){
            row.insertBefore(row.prev());
        }
        else{
            row.insertAfter(row.next());
        }
    });

    $(".addRowIn1, .editRowIn1, .addRowIn2, .editRowIn2 ,.addRowIn3, .editRowIn3, .addRowIn4, .editRowIn4, " +
        ".addRowOut1, .editRowOut1, .addRowOut2, .editRowOut2 ,.addRowOut3, .editRowOut3, .addRowOut4, .editRowOut4").click(function () {
        if($(this).is('.addRowIn1, .addRowIn2, .addRowIn3, .addRowIn4,.addRowOut1, .addRowOut3, .addRowOut3, .addRowOut4')) {
            $('button[name = "buttonAddW8"]').text("Добавить");
            $('#pAddPolitice').text("Добавление новой политики");
        }
        else {
            $('button[name = "buttonAddW8"]').text("Изменить");
            $('#pAddPolitice').text("Изменение политики");
        }
        if($(this).is('.addRowIn1, .editRowIn1')) GLOBALTABLE = "#tablepol1I";
        if($(this).is('.addRowIn2, .editRowIn2')) GLOBALTABLE = "#tablepol2I";
        if($(this).is('.addRowIn3, .editRowIn3')) GLOBALTABLE = "#tablepol3I";
        if($(this).is('.addRowIn4, .editRowIn4')) GLOBALTABLE = "#tablepol4I";
        if($(this).is('.addRowOut1, .editRowOut1')) GLOBALTABLE = "#tablepol1O";
        if($(this).is('.addRowOut2, .editRowOut2')) GLOBALTABLE = "#tablepol2O";
        if($(this).is('.addRowOut3, .editRowOut3')) GLOBALTABLE = "#tablepol3O";
        if($(this).is('.addRowOut4, .editRowOut4')) GLOBALTABLE = "#tablepol4O";
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

    jQuery.expr[':'].regex = function(elem, index, match) {
        var matchParams = match[3].split(','),
            validLabels = /^(data|css):/,
            attr = {
                method: matchParams[0].match(validLabels) ?
                    matchParams[0].split(':')[0] : 'attr',
                property: matchParams.shift().replace(validLabels,'')
            },
            regexFlags = 'ig',
            regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
        return regex.test(jQuery(elem)[attr.method](attr.property));
    }


    $(".addRowIn1, .addRowIn2 ,.addRowIn3 ,.addRowIn4 ,.addRowOut1 ,.addRowOut2 ,.addRowOut3 ,.addRowOut4").click(function () {
        $("#ModalW8").css("display","block");
    });


    $(".editRowIn1, .editRowIn2 ,.editRowIn3 ,.editRowIn4 ,.editRowOut1 ,.editRowOut2 ,.editRowOut3 ,.editRowOut4").click(function () {

        var nameTable;

        if($(this).is('.editRowIn1')) nameTable = "#tablepol1I";
        if($(this).is('.editRowIn2')) nameTable = "#tablepol2I";
        if($(this).is('.editRowIn3')) nameTable = "#tablepol3I";
        if($(this).is('.editRowIn4')) nameTable = "#tablepol4I";
        if($(this).is('.editRowOut1')) nameTable = "#tablepol1O";
        if($(this).is('.editRowOut2')) nameTable = "#tablepol2O";
        if($(this).is('.editRowOut3')) nameTable = "#tablepol3O";
        if($(this).is('.editRowOut4')) nameTable = "#tablepol4O";

        var tdata = $(nameTable + " tr.selected").children('td');

        var str1 = tdata[0].innerText;

        var str2 = tdata[1].innerText;

        //$('input[name=baz]').filter(function(){return this.value === temp; }).attr('checked', true);  WHY NOT WORK!? :(

        $('input#number1').val(str1);
        $('input#number2').val(str2);
        $("#selpol").val(tdata[2].innerText);

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

    var dateControl = document.querySelector('input[type="date"]');
    dateControl.defaultValue = '2017-06-01';

    {
        var arr = [];
        var am = "ModalW";
        var btn = "BtnModal";
        var countModals = 10;

        for (var i = 1; i <= countModals; i++) {
            if(i != 8) {
                arr.push({
                    key: am + i,
                    mbutton: btn + i
                });
            }
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

       // var sliderA = document.getElementById("sliderA");
        var inputRight = document.getElementById("lineA");
        inputRight.value = sliderA.value;

        var prevValue = inputRight.value;

        sliderA.oninput = function () {
            inputRight.value = this.value;
        }

        inputRight.oninput = function () {
            /*var strP =  /^0[1-9] | 10/);

            var strPattern = /^\d+(\.\d)?$/;//(\.\d{1})?';
            if(this.value.match(strP)) {
                prevValue = sliderA.value = this.value;
            }
            this.value = prevValue;*/
           // $.isNumeric( inputRight.value);
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
        var countInputDTMF = document.getElementById("countDTMF");
        countInputDTMF.oninput = function () {
            this.value=this.value.replace(/[^0-9]/g,'');
            if (this.value == '') this.value = 0;
            if (this.value < 0) this.value = 0;
            if (this.value > 255) this.value = Number(this.value.toString().slice(0,-1));
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

}

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

