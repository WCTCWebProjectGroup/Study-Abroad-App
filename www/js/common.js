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

function openAlerts () {
    document.getElementById("drawerContent").style.display = "none";
    document.querySelector("#sideNav .alerts").style.display = "block";
    document.getElementById("sideNav").style.left = "0";
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

// This function will be what populates the nav
// AKA decides if the 'login' or 'logout' entry appears in the nav
(function () {
    getCurrentUser()
        .then(function(entry){
            if (entry !== null) {
                document.getElementById("loginNAV").style.display = "none";
                console.log("Currently logged in as " + entry.fname + " " + entry.lname);
                if (window.location.pathname == "/login.html") {
                    console.log("Since logged in, going to groups.html");
                    // window.location.assign("groups.html");
                }
            } else {
                // If the user is null then this is first time setup
                console.log("Not currently logged in");
                document.getElementById("logoutNAV").style.display = "none";
                document.getElementById("openDrawerContainer").style.display = "none";
                document.getElementById("openAlertContainer").style.display = "none";
                // if (window.location.pathname != "/login.html")
                //     window.location.assign("login.html");
            }
        }).catch(function(e) {
            console.log("The nav elements are not available on this page");
        });
})();

function hashCode () {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

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