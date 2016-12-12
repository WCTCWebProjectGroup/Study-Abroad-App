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
    document.getElementById("sideNav").style.width = "80%";
}

function closeDrawer() {
    document.getElementById("sideNav").style.width = "0";
}

function openAlerts () {
    document.getElementById("drawerContent").style.display = "none";
    document.querySelector("#sideNav .alerts").style.display = "block";
    document.getElementById("sideNav").style.width = "80%";
} 

function toggleOnLoadingScreen () {
    document.getElementById("loadingBg").style.display = "block";
}

function toggleOffLoadingScreen () {
    document.getElementById("loadingBg").style.display = "none";
}

// This function will be what populates the nav
// AKA decides if the 'login' or 'logout' entry appears in the nav
(function () {
    getCurrentUser()
        .then(function(entry){
            if (entry !== null) {
                document.getElementById("loginNAV").style.display = "none";
                console.log("Currently logged in as " + entry.fname + " " + entry.lname);
                // finished();
            } else {
                // If the user is null then this is first time setup
                console.log("Not currently logged in");
                document.getElementById("logoutNAV").style.display = "none";
            }
        });
})();