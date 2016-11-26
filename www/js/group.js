// Note: Use templates to create more nodes
/*
 * 
 */

function group()
{
    this.name = "WCTC Travel Group";
    this.desc = "Group Description: This is a the description of the group. It will eventually be replaced with a rich text editor... But for now this is it.";
    this.owners = [
        "ALex Hayes",
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
        "Some UID"
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
    foreach (uid in obj)
    {
        var el = document.getElementById("contactCardT");
        var clone = document.importNode(el.content, true);

        // Populate template
        // Create obj from DB look-ups

        var contact = contact(uid); 

        document.getElementById("groupContacts").appendChild(clone);
    }
}

function setGroupInfo ()
{
    var obj = group();

    // Set group name
    document.getElementById("gname").innerHTML = obj.name;

    // Set group desc
    document.getElementById("gdesc").innerHTML = obj.desc;

    // Set group owners
    foreach (owner in obj.owners)
    {
        var liObj = document.createElement("li");
        liObj.innerHTML = owner;
        document.getElementById("groupOwn").appendChild(liObj);
    }

    // Set group emergency contacts
    foreach (emer in obj.emergency)
    {
        liObj = document.createElement("li");
        liObj.innerHTML = emer;
        document.getElementById("emergency").appendChild(liObj);
    }

    lazyLoadContacts(obj.contacts);
}

setGroupInfo();