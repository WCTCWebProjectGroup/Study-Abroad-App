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
                                // clone.querySelector(".contactEmail").innerHTML = (e.email);
                                // clone.querySelector(".contactPhoneNos").innerHTML = (e.phoneNo);
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

function showUsrPanel(usrInfoObj) {
    let panel = document.getElementById("usrPanel");
    document.getElementById("usrName").innerHTML = usrInfoObj.fullName;
    document.getElementById("usrImage").setAttribute("src", usrInfoObj.image);
    document.getElementById("usrEmail").setAttribute("href", "tel:" + usrInfoObj.email);
    document.getElementById("usrEmail").querySelector("button").innerHTML = usrInfoObj.email;
    document.getElementById("usrPhoneNo").setAttribute("href", "tel:" + usrInfoObj.phoneNo);
    document.getElementById("usrPhoneNo").querySelector("button").innerHTML = usrInfoObj.phoneNo;
    let funFactsEl = document.getElementById("usrFunFacts");
    if (usrInfoObj.funFacts != null)
    {
        usrInfoObj.funFacts.forEach(function(fact) {
        let row = document.createElement("tr");
        let col1 = document.createElement("td");
        let col2 = document.createElement("td");

        col1.innerHTML = fact.title
        col2.innerHTML = fact.body

        row.appendChild(col1);
        row.appendChild(col2);
        document.getElementById("usrFunFacts").appendChild(row);
    });
    }
    panel.style.top = "5%";
}

function closeUsrPanel () {
    let panel = document.getElementById("usrPanel");
    panel.style.top = "100%";
    let rows = document.querySelectorAll("#usrFunFacts tr");
    if (rows.length > 0)
    {
        rows.forEach(function (row) {
            document.getElementById("usrFunFacts").removeChild(row);
        })        
    }
}