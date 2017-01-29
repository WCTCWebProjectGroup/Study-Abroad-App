/* JS that will be present on ALL pages will be moved here eventually.
 * 
 * TODO: Handle alerts here and updates.
 * 
 * 
 * Files to be moved
 * 
 * database.js - May keep it seperate, still deciding whether to move it or not
 * 
 * 
 * Files moved
 * 
 * drawer.js
 * loadingScreen.html (contains a script to toggle the loading screen on/off)
 * nav.js (never moved to the repo but contained scripts for showing what appeared in the nav - was never finished also)
 * 
 */

function openDrawer() {    
    document.querySelector("#sideNav .alerts").style.display = "none";
    document.getElementById("drawerContent").style.display = "block";
    document.getElementById("sideNav").style.left = "0";
}

function closeDrawer() {
    document.getElementById("sideNav").style.left = "-100%";
}

function toggleOnLoadingScreen () {
    document.getElementById("loadingBg").style.display = "block";
}

function toggleOffLoadingScreen () {
    document.getElementById("loadingBg").style.display = "none";
}

function closeEvent () {
    document.getElementById("eventPanel").style.top = "100%";
    document.querySelectorAll("#eventContainer .event").forEach(function(htmlEvent) {
        htmlEvent.style.display = "none";
    });
}

function showUsrPanel(usrInfoObj) {
    let panel = document.getElementById("usrPanel");
    document.getElementById("usrName").innerHTML = usrInfoObj.fullName;
    document.getElementById("usrImage").setAttribute("src", usrInfoObj.image);
    document.getElementById("usrEmail").setAttribute("href", "tel:" + usrInfoObj.email);
    document.getElementById("usrEmail").querySelector("button").innerHTML = usrInfoObj.email;
    document.getElementById("usrPhoneNo").innerHTML = "";
    usrInfoObj.phoneNo.forEach(function (number) {
        let el = document.createElement("a");
        el.setAttribute("href", "tel:" + number);        
        let btn = document.createElement("button");
        btn.innerHTML = number
        btn.setAttribute("class", "MButtonFaint");
        el.appendChild(btn);
        document.getElementById("usrPhoneNo").appendChild(el);
    });
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

function doneLoadingContacts () {
    document.querySelector(".loadingMsg").style.display = "none";
    console.log("Done loading contacts");
}

function filterContacts() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("searchContacts");
    filter = input.value.toUpperCase();
    table = document.getElementById("groupContacts");
    tr = table.querySelectorAll(".contact");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].querySelector(".contactName");
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function setCTripAndGoToTrip (newUid) {
    db.CTrip
        .clear()
        .then(function () {
            db.CTrip.add({uid: newUid})
        }).then(function () {
            window.location.assign("group.html");
        });
}