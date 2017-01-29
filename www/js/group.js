function setGroupInfo ()
{

    // Set group emergency contacts
    db.Trips
        .toCollection()
        .first(function(trip) {
            // Set group name
            document.getElementById("gname").innerHTML = trip.name;

            // Set group description
            document.getElementById("gdesc").innerHTML = trip.desc;

            // Set emergency contacts
            trip.emergencyContacts.forEach(function (eContact) {
                let el = document.getElementById("emegencyContactCardT");
                let clone = document.importNode(el.content, true);
                clone.querySelector(".contactName").innerHTML = eContact.name;
                clone.querySelector(".contactPhoneNo").innerHTML = eContact.phoneNo;
                clone.querySelector(".contactPhoneNo").setAttribute("href", "tel:" + eContact.phoneNo)
                document.getElementById("emergency").appendChild(clone);
            });

            // Set events
            trip.events.forEach(function (event) {
                let el = document.getElementById("eventT");
                let clone = document.importNode(el.content, true);
                document.getElementById("eventContainer").appendChild(clone);
                document.querySelector("#eventContainer .event:last-child .ename").innerHTML = event.name;
                document.querySelector("#eventContainer .event:last-child .edesc").innerHTML = event.desc;
                document.querySelector("#eventContainer .event:last-child .eloc").innerHTML = event.location;
                document.querySelector("#eventContainer .event:last-child .etimestamp").innerHTML = event.timestamp;
            });

            // Set group supervisors
            return trip.supervisors;
        }).then(function(contactIDs) {
            contactIDs.forEach(function (sContactID) {
                db.Users
                    .where("uid")
                    .equals(sContactID.toString())
                    .each(function (sContact) {
                        let el = document.getElementById("contactCardT");
                        let clone = document.importNode(el.content, true);
                        clone.querySelector(".contactName").innerHTML = sContact.fname + " " + sContact.lname;
                        clone.querySelector("img").setAttribute("src", sContact.photo);

                        document.getElementById("groupOwn").appendChild(clone);

                        let usrInfoObj = {
                            fullName: sContact.fname + " " + sContact.lname,
                            image: sContact.photo,
                            email: sContact.email,
                            phoneNo: sContact.phoneNo,
                            funFacts: sContact.funFacts
                        };

                        document.querySelector("#groupOwn .contact:last-child").addEventListener("click", function () {
                            showUsrPanel(usrInfoObj)
                        });
                    })
            });
        });
}

setGroupInfo();