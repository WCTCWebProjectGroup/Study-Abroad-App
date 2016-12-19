// Load contacts
var loadingMsg = document.querySelector(".loadingMsg");
loadingMsg.innerHTML = "Loading more contacts...";

db.CTrip
        .toArray(function(a){
            return a[0].uid;
        }).then(function(cuid){
            db.Trips
                .where("uid")
                .equals(cuid)
                .first(function(entry){
                    entry.members.forEach (function (mem) {
                        db.Users
                            .where("uid")
                            .equals(mem.toString())
                            .first(function (e) {
                                var el = document.getElementById("contactCardT");
                                var clone = document.importNode(el.content, true);

                                //console.log(e);
                                clone.querySelector(".contactName").innerHTML = (e.fname + " " + e.lname);
                                clone.querySelector(".contactEmail").innerHTML = (e.email);
                                clone.querySelector(".contactPhoneNos").innerHTML = (e.phoneNo);
                                clone.querySelector("img").setAttribute("src", e.photo);
                                
                                document.getElementById("groupContacts").appendChild(clone);
                            }).catch(function (err) {
                                console.log("Error: A user doesn't exist!");
                                console.log(err);
                            });
                    });
                    entry.owners.forEach(function (own) {
                        db.Users
                            .where("uid")
                            .equals(own.toString())
                            .first(function (e) {
                                var el = document.getElementById("contactCardT");
                                var clone = document.importNode(el.content, true);

                                //console.log(e);
                                clone.querySelector(".contactName").innerHTML = (e.fname + " " + e.lname);
                                clone.querySelector(".contactEmail").innerHTML = (e.email);
                                clone.querySelector(".contactPhoneNos").innerHTML = (e.phoneNo);
                                clone.querySelector("img").setAttribute("src", e.photo);
                                
                                document.getElementById("groupContacts").appendChild(clone);
                            }).catch(function (err) {
                                console.log("Error: A user doesn't exist!");
                                console.log(err);
                            });
                        
                });
            }).then(function () {
                doneLoadingContacts();
            });
        });

function doneLoadingContacts () {
    document.querySelector(".loadingMsg").style.display = "none";
    console.log("Done loading contacts");
}