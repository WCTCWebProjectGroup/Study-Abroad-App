// Note: Use templates to create more nodes
/*
 * 
 */

// Global Vars, FIXME: Eventually remove all global vars, using them now for convenience
var NoContacts = 0;

function group(uid)
{
    // TODO: Look up group info on the uid from the DB

    this.uid = uid;
    this.name = "WCTC Travel Group";
    this.desc = "Group Description: This is a the description of the group. It will eventually be replaced with a rich text editor... But for now this is it.";
    this.owners = [
        "Alex Hayes",
        "Bob Doe"
    ];

    this.emergency = [
        {
            name: "Police",
            number: "911"
        },
        {
            name: "U.S. Consulate General Belfast",
            number: "011-44-207499-9000"
        }
    ];

    this.contacts = [
        "Some UID",
        "Another UID",
        "Another UID",
        "Another UID",
        "Another UID",
        "Another UID",
        "Another UID",
        "Another UID",
        "Another UID"
    ];
}

// TODO: Function that generates the contact list from the db
function contact (uid)
{
    // TODO: Look up user info from UID

    this.uid = uid;
    this.fname = "Alex";
    this.lname = "Hayes";
    this.emails = [
        "alex.c.hayes08@gmail.com",
        "ahayes13@my.wctc.edu"
    ];
    this.phoneNos = [
        "2624421666"
    ];
}

function lazyLoadContacts(obj)
{
    NoContacts = obj.length;

    var loadingMsg = document.querySelector(".loadingMsg");
    loadingMsg.innerHTML = "Loading more contacts...";

    obj.forEach ( function(uid)
    {
        var el = document.getElementById("contactCardT");
        var clone = document.importNode(el.content, true);

        // Populate template
        // Create obj from DB look-ups
        console.log(uid);
        var person = new contact(uid.toString());

        clone.querySelector(".contactName").innerHTML = (person.fname.toString() + " " + person.lname.toString());
        clone.querySelector(".contactEmail").innerHTML = (person.emails[0].toString());
        clone.querySelector(".contactPhoneNos").innerHTML = (person.phoneNos[0].toString());

        document.getElementById("groupContacts").appendChild(clone);
        doneLoadingContacts();
    });
}

function setGroupInfo ()
{

    // Set group emergency contacts
    // obj.emergency.forEach (function (emer)
    // {
    //     liObj = document.createElement("li");
    //     liObj.innerHTML = emer.name.toString() + " : " + emer.number.toString();
    //     document.getElementById("emergency").appendChild(liObj);
    // });

    db.CTrip
        .toArray(function(a){
            return a[0].uid;
        }).then(function(cuid){
            db.Trips
                .where("uid")
                .equals(cuid)
                .first(function(entry){
                    // Set gname and gdesc
                    document.getElementById("gname").innerHTML = entry.name.toString();
                    document.getElementById("gdesc").innerHTML = entry.desc.toString();

                    // Set gowners
                    entry.owners.forEach (function (per) {
                        db.Users
                            .where("uid")
                            .equals(per)
                            .first(function (o) {
                                let el = document.getElementById("contactCardT");
                                let clone = document.importNode(el.content, true);
                                clone.querySelector(".contactName").innerHTML = o.fname + " " + o.lname;
                                document.getElementById("groupOwn").appendChild(clone);
                                let usrInfoObj = {
                                    fullName: o.fname + " " + o.lname,
                                    image: o.photo,
                                    email: o.email,
                                    phoneNo: o.phoneNo,
                                    funFacts: o.funFacts
                                };

                                document.querySelector("#groupOwn .contact:last-child").addEventListener("click", function () {
                                    showUsrPanel(usrInfoObj)
                                });
                            });
                    });

                    entry.events.forEach (function (eve) {
                        let el = document.getElementById("eventT");
                        let clone = document.importNode(el.content, true);

                        clone.querySelector(".ename").innerHTML = eve.name;
                        clone.querySelector(".eloc").innerHTML = eve.location;
                        clone.querySelector(".etimestamp").innerHTML = eve.timestamp;

                        document.getElementById("eventContainer").appendChild(clone);
                    });

                    // entry.emergency.forEach (function (emer) {
                    //     var liObj = document.createElement("li");
                    //     liObj.innerHTML = emer.name.toString() + " : " + emer.number.toString();
                    // });
                });
        });
}

setGroupInfo();