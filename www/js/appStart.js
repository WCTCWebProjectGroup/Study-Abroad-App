// This function will first read the json file located in js/TripInfo/Trip.json
// and create a js object from it, delete the database (if it exists) and create
// a new database with the information from the js object. Once it finishes it
// calls the funcition 'finished()' which will navigate the user to the
// itinerary page.
function firstTimeSetUp ()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(xhttp.responseText);
            let userList = res.userList;
            let groupInfo = res.groupInfo;
    
            db.delete()
                .then(function(){DB_init();})
                .then(function(){return addTrip(groupInfo);})
                .then(function(){return addUsers(userList);})
                .then(function(){return finished();})
                .catch(function (e) {
                    console.log(e);
                });
        }
    };

    xhttp.open("GET", "js/TripInfo/Trip.json", true);
    xhttp.send();
}

// This function navigates the user to the itinerary
function finished()
{
    console.log("finished");
    window.location.assign("itinerary.html");
}

// Displays a loading screen and begins the function to load the json file
// into the database.
function afterPageLoad ()
{
    toggleOnLoadingScreen();
    firstTimeSetUp();
}

window.addEventListener("load", afterPageLoad());