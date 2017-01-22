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