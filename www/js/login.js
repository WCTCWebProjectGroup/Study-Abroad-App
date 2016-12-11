//var evtSource = new EventSource("loginVal.php");

// evtSource.onmessage = function(e) {
//     var jsonObj = JSON.parse(e);
//     if (jsonObj.credentialsValid)
//         loginSuccesful();
//     else
//         loginFailed();
// }

(function () {
    var formSubmitBtn = document.getElementById("loginButton");
    document.getElementById("loginButton").addEventListener("click", submitForm);

    var form = document.getElementById("loginForm");    

    function submitForm () {
        var req = new XMLHttpRequest();
        var formData = new FormData(form);

        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE) {
                console.log(req.responseText);
            }
        };

        req.open('POST', 'http://sitec.localdomain/loginVal.php', true);
        req.send(formData);
    }

    function loginSuccesful () {
        console.log("woot woot!");
    }

    function loginFailed () {
        console.log("boo...");
        formSubmitBtn.reset();
    }
})();