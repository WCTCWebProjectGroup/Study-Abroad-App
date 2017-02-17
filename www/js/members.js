// Load contacts
var loadingMsg = document.querySelector(".loadingMsg");
loadingMsg.innerHTML = "Loading more contacts...";

db.Users
    .toArray(function(entries){
        entries.forEach(function (e) {
            let el = document.getElementById("contactCardT");
            let clone = document.importNode(el.content, true);

            clone.querySelector(".contactName").innerHTML = (e.fname + " " + e.lname);
            clone.querySelector("img").setAttribute("src", e.photo);
            
            document.getElementById("groupContacts").appendChild(clone);

            let usrInfo = {
                fullName: e.fname + " " + e.lname,
                image: e.photo,
                email: e.email,
                phoneNo: e.phoneNo,
                funFacts: e.funFacts
            }
            document.querySelector(".contact:last-child").addEventListener("click", function() {
                showUsrPanel(usrInfo);
            });
        });
}).then(function () {
    doneLoadingContacts();
});
