$(document).ready(function() {

    var x = document.getElementById("xval");
var r = document.getElementById("rval");
var y = document.getElementById("yval");
var coordinatesX;
var coordinatesY;

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function validateX() {
    if ($('.x-radio').is(':checked')) {
        // let xval = $('.x-radio:checked');
        $('.x-label').removeClass('box-error');
        document.getElementById("x-error").innerHTML = "";
        return true;
    } else {
        $('.x-label').addClass('box-error');
        document.getElementById("x-error").innerHTML = "Поле не может быть пустым";
        return false;
    }
}

function validateY() {
    const Y_MIN = -5;
    const Y_MAX = 3;

    // let yField = $('#y-textinput');
    // let yval = document.getElementById("y-textinput");
    //
    // let numY = yval.value.replace(',', '.');

    return true;
    // if (isNumeric(numY) && numY >= Y_MIN && numY <= Y_MAX)
    // {
    //     yField.removeClass('text-error');
    //     document.getElementById("y-error").innerHTML = "";
    //     return true;
    // } else {
    //     yField.addClass('text-error');
    //     document.getElementById("y-error").innerHTML = "Введите правильное значение.";
    //     return false;
    // }
}

function validateR() {
    const R_MIN = 2;
    const R_MAX = 5;

    let rField = $('#r-textinput');
    let rval = document.getElementById("r-textinput");
    let numR = rval.value.replace(',', '.');


    if (isNumeric(numR) && numR >= R_MIN && numR <= R_MAX)
    {
        rField.removeClass('text-error');
        document.getElementById("r-error").innerHTML = "";
        return true;
    } else {
        rField.addClass('text-error');
        document.getElementById("r-error").innerHTML = "Введите правильное значение.";
        return false;
    }
}

function validateForm() {
    return validateX() & validateY() & validateR();
}
function testInputs() {

    let ok = validateForm();
    if (ok){
        let xval = $('.x-radio:checked');
        let yval = document.getElementById("y-textinput");
        let rval = document.getElementById("r-textinput");
        setPoints((xval.val() * 120 / rval.value + 150), yval.value * -120 / rval.value + 150);
        try {
            sendRequest("no", xval.val(), yval.value, rval.value);
        }catch (e){
            console.log(e.message);
        }
    }
}
function sendToClearContext(){
    sendRequest("clear",0,0,0);
    unsetPoints();
}
function setPoints(){
    let point = document.getElementById("point");
    point.setAttribute('cx', coordinatesX)
    point.setAttribute('cy', coordinatesY)
    point.setAttribute("visibility","visible")
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    element.setAttribute('cx', coordinatesX)
    element.setAttribute('cy', coordinatesY)
    element.setAttribute("visibility","visible")
    element.setAttribute('r', "4")
    element.setAttribute('class', "points")
    document.getElementById("graph").appendChild(element);
}

function unsetPoints(){
    let pointsArray = document.querySelectorAll('.points');
    for( let i = 0; i < pointsArray.length; i++ ){
        pointsArray[i].setAttribute("visibility", "hidden");
    }

}


    $('#input-form').on('submit', function(event) {
        event.preventDefault();
        if (!testInputs()){
            return false;
        }

    })
document.getElementsByClassName("mySvg")[0].addEventListener("mousedown", function (e){
    if (!validateR()){
        alert("Выберите параметр R!");
        return;
    }
    r = document.getElementById("r-textinput").value;
    coordinatesX = e.offsetX;
    console.log(coordinatesX);
    coordinatesY = e.offsetY;
    setPoints();
    click()
});

    function sendRequest(check, x, y, r) {

        $.ajax({
            url: "./ControllerServlet",
            type: "GET",
            data: {"check": check, "x": x, "y": y, "r": r},
            success: function (response) {
                document.getElementById('tbody1').innerHTML = response;
                window.location.replace("result.jsp");
            },
            error: function () {
                alert("Ошибка при передаче данных!");
                window.location.replace("error-page.jsp");

                unsetPoints();
            }
        });
    }

function checkXArea(){
    return x <= 3 && x >= -5;
}

function checkYArea(){
    return y > -3 && y < 5;
}

function checkAreaCoordinates(){
    let errorMsg;
    if (checkXArea() && checkYArea()){
        return true;
    }
    if (!checkXArea()) {
        errorMsg = "X must be in range [-4;4]!";
    }
    if (!checkYArea()){
        alert(y);
        errorMsg = "Y must be in range (-3;5)!";
    }
    alert(errorMsg);
}

function click(){
    if (validateR()){
        convertCoordinates();
        if (checkAreaCoordinates()){
            sendRequest("no", x, y, r);
            return false;
        }
        else {
            unsetPoints();
            return false;
        }
    }
}

function changeCoordinates(){
    let centerX = 150;
    let centerY = 150;

    if (coordinatesX > centerX){
        coordinatesX = coordinatesX - centerX;
    }
    else {
        coordinatesX = -(centerX - coordinatesX);
    }

    if (coordinatesY > centerY){
        coordinatesY = -(coordinatesY - centerY);
    }
    else {
        coordinatesY = centerY - coordinatesY;
    }
}

function convertCoordinates(){
    changeCoordinates();
    x = (coordinatesX / 120)*r;
    console.log(r);
    console.log(x);
    y = (coordinatesY / 120)*r;
}
})

