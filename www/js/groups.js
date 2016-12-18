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
    db.Trips
        .toArray(function(e){
            if (e.length > 0) {
                document.getElementById("noGroupsMsg").style.display = "none";
                e.forEach(function(entry) {
                    console.log(entry);
                    let elem = document.getElementById("groupsT");
                    let clone = document.importNode(elem.content, true);

                    clone.querySelector(".gname").innerHTML = entry.name;
                    clone.querySelector(".gdesc").innerHTML = entry.desc;
                    clone.querySelector("a").setAttribute("onclick", "setCTripAndGoToTrip(\"" + entry.uid + "\");");

                    document.getElementById("groupContainer").appendChild(clone);
                });
            }
        });
}

loadGroups();

function setCTripAndGoToTrip (newUid) {
    db.CTrip
        .clear()
        .then(function () {
            db.CTrip.add({uid: newUid})
        }).then(function () {
            window.location.assign("group.html");
        });
}