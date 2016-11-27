// JS for groups.html

// Load groups into template from dummyJSON parsedGroupFile var
function group () {
    this.id = "1234";
    this.name = "WCTC Travel Group";
    this.desc = "Group Description: This is a the description of the group. It will eventually be replaced with a rich text editor... But for now this is it.";
}

function invitation (sender) {
    this.name = sender;
}

function loadGroups() {
    parsedGroupFile.groups.forEach( function(entry) {
        // console.log(entry);

        // TODO: Create group obj from DB calls
        var newGroup = new group();

        var elem = document.getElementById("groupsT");
        var clone = document.importNode(elem.content, true);

        clone.querySelector(".gname").innerHTML = newGroup.name;
        clone.querySelector(".gdesc").innerHTML = newGroup.desc;

        document.getElementById("groupContainer").appendChild(clone);
    });
}

function loadInvites() {
    invitations.forEach( function (inv) {
        var el = document.getElementById("invitationT");
        var clone = document.importNode(el.content, true);

        clone.querySelector(".gname").innerHTML = inv.name;

        document.getElementById("invitations").appendChild(clone);
    });
}

loadGroups();
loadInvites();