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
        toggleOnLoadingScreen();
        var req = new XMLHttpRequest();
        var formData = new FormData(form);

        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE) {
                console.log(req.responseText);
                var jsonObj = JSON.parse(req.responseText);
                if (jsonObj.credentialsValid)
                    loginSuccesful();
                else
                    loginFailed();
            }
        };

        req.open('POST', 'http://sitec.localdomain/loginVal.php', true);
        // req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        req.send(formData);
    }

    // TODO
    function loginAsNewUser () {

    }

    // TODO
    function loginAsLocalUser () {

    }

    function loginSuccesful () {
        console.log("woot woot!");
        window.location.assign("groups.html");
        toggleOffLoadingScreen();
    }

    function loginFailed () {
        console.log("boo...");
        form.reset();
        toggleOffLoadingScreen();
    }
})();