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

function doneLoadingContacts ()
{
    var NoLoaded = document.querySelectorAll("#groupContacts > div").length;
    if (NoLoaded == NoContacts)
    {
        document.querySelector(".groupContacts .loadingMsg").style.display = "none";
        console.log("Done loading contacts");
    }
}

function lazyLoadContacts(obj)
{
    NoContacts = obj.length;

    var loadingMsg = document.querySelector(".groupContacts");
    loadingMsg = loadingMsg.querySelector(".loadingMsg");
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
    var obj = new group("123456789");

    // Set group name
    document.getElementById("gname").innerHTML = obj.name.toString();

    // Set group desc
    document.getElementById("gdesc").innerHTML = obj.desc.toString();

    // Set group owners
    obj.owners.forEach (function(owner)
    {
        var liObj = document.createElement("li");
        liObj.innerHTML = owner.toString();
        document.getElementById("groupOwn").appendChild(liObj);
    });

    // Set group emergency contacts
    obj.emergency.forEach (function (emer)
    {
        liObj = document.createElement("li");
        liObj.innerHTML = emer.name.toString() + " : " + emer.number.toString();
        document.getElementById("emergency").appendChild(liObj);
    });

    lazyLoadContacts(obj.contacts);
}

setGroupInfo();