// Load contacts
var loadingMsg = document.querySelector(".loadingMsg");
loadingMsg.innerHTML = "Loading more contacts...";

db.Users
        .each(function(e){
            var el = document.getElementById("contactCardT");
            var clone = document.importNode(el.content, true);

            //console.log(e);
            clone.querySelector(".contactName").innerHTML = (e.fname + " " + e.lname);
            clone.querySelector(".contactEmail").innerHTML = (e.email);
            clone.querySelector(".contactEmail").setAttribute("href", "mailto:" + e.email);
            clone.querySelector(".contactPhoneNos").innerHTML = (e.phoneNo);
            clone.querySelector(".contactPhoneNos").setAttribute("href", "tel:" + e.phoneNo);
            clone.querySelector("img").setAttribute("src", e.photo);
            
            document.getElementById("groupContacts").appendChild(clone);
        }).then(function () {
                doneLoadingContacts();
        });

function doneLoadingContacts () {
    document.querySelector(".loadingMsg").style.display = "none";
    console.log("Done loading contacts");
}