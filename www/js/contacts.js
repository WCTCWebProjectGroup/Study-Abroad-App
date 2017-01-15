// Load contacts
var loadingMsg = document.querySelector(".loadingMsg");
loadingMsg.innerHTML = "Loading more contacts...";

db.Users
        .each(function(e){
                var el = document.getElementById("contactCardT");
                var clone = document.importNode(el.content, true);

                //console.log(e);
                clone.querySelector(".contactName").innerHTML = (e.fname + " " + e.lname);
                // clone.querySelector(".contactEmail").innerHTML = ("Email: <a href=mailto:" + e.email + ">" + e.email + "</a>");
                // clone.querySelector(".contactPhoneNos").innerHTML = ("Phone: <a href=mailto:" + e.phoneNo + ">" + e.phoneNo + "</a>");
                clone.querySelector("img").setAttribute("src", e.photo);

                document.getElementById("groupContacts").appendChild(clone);

                var usrInfo = {
                        fullName: e.fname + " " + e.lname,
                        image: e.photo,
                        email: e.email,
                        phoneNo: e.phoneNo,
                        funFacts: e.funFacts
                }
                document.querySelector(".contact:last-child").addEventListener("click", function() {
                        showUsrPanel(usrInfo);
                });
        }).catch(function (err) {
                console.log("Error: A user doesn't exist!");
                console.log(err);
        }).then(function () {
                doneLoadingContacts();
        });

function doneLoadingContacts () {
    document.querySelector(".loadingMsg").style.display = "none";
    console.log("Done loading contacts");
}