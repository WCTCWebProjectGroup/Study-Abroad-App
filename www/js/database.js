// Database functions and vars
// The app will use only ONE database, for now it will be called TripMySchoolDB
// Needs to be included before index.js!

// *The database currently has the tables; 'Users', 'Trips', 'CUser'.
// *The entry in the 'CUsers' table is the user who logged in. 

// ----- New API using Dexie ----- //
// Global Vars - TODO: Put in function
var db;

// Return the database name
function DB_name () {
    return "TripMySchoolDB";
}

// Return an array of all the tables to be used - I don't think this is needed
function DB_Tables () {
    var tables = [
        "Users",
        "Trips",
        "CUser",
        "CTrip",
        "Invitations"
    ];
}

function DB_init () {
    db = new Dexie(DB_name());

    db.version(1).stores({
        Users: 'uid, lastUpdate, fname, lname, phoneNo, email, school, photo, password',
        Trips: 'uid, lastUpdate, name, desc, members, owners, emergency, activeInvitations, events',
        CUser: 'uid',
        CTrip: 'uid',
        Invitations: 'uid, status'
    });
}

// Returns a Group_user obj of the currently logged in user
function getCurrentUser() {
    var cuser = {};
    return db.CUser
        .toArray(function (list) {
            if(list[0] !== undefined)
                return db.Users.get(list[0].uid);
            else
                return null; 
        });
}

// Sets the current users info. Returns false if the user already
// exists and returns true if the operation succeeded.
function setCurrentUser(user) {
    return db.transaction("rw", db.Users, db.CUser, function() {
        db.CUser
            .clear()
            .then(function () {
                db.CUser.add({ uid: user.uid });
                var cusrReg = false;
                
                return db.Users.get(user.uid)
                    .then(function (obj) {
                        if (obj === undefined) {
                            db.Users.add({
                                uid: user.uid,
                                lastUpdate: user.lastUpdate,
                                fname: user.fname,
                                lname: user.lname,
                                phoneNo: user.phoneNo,
                                email: user.email,
                                school: user.school,
                                photo: user.photo,
                                password: user.password == null ? "" : user.password
                            });
                        } else {
                            console.log("Don't need to add the user to table Users because it already exists");
                        }
                    }).catch(function (err) {
                        console.log("Error: " + err);
                    });
            });
    }).then(function() {
        // TODO: Add another promise here for checking to see if the
        // server then also approves the new account.
        console.log("Logged in successfully");
        (function() {document.getElementsById("logout").style.display = "block"});
        return true;
    }).catch(function(error) {
        console.log("Error: " + error);
        (function() {document.getElementsById("logout").style.display = "none"});
        if (error == "ConstraintError: Key already exists in the object store.") {
            alert("The user already exists");
        }
        return false;
    });
}

// This will log the user out and clear the database
function logout() {
    db.CUser.clear();
    console.log("Logged Out.");
    console.log("Navigating to the login page");
    window.location.assign("login.html");
}

// Add trip obj to database
function DB_addTrip (trip) {
    db.transaction("rw", db.Trips, function() {
        db.Trips.add({
            uid: trip.uid,
            lastUpdate: trip.lastUpdate,
            name: trip.name,
            desc: trip.desc,
            members: trip.members,
            owners: trip.owners,
            activeInvitations: trip.activeInvitations,
            events: trip.events
        }).then(function () {
            console.log("Added a trip");
        });
    });
}

// ----- Level 0 - No Dependencies ----- //

// Simple NON-SECURE hash function (for storing passwords) // TODO: Replace with secure hash function
String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

// Returns the user by their uid
function getUserByUid (uid) {
    return db.Users
        .where("uid")
        .equals(uid)
        .first(function (usr) {
            // console.log (usr);
            return usr;
        });
}

// Another function which checks if a user exists. The parameter is the uid of the user.
function checkIfUsrExists (uid) {
    return db.Users
        .where("uid")
        .equals(uid)
        .count()
        .then(function(co) {
            return co > 0 ? true : false;
        });    
}

// Modifies an entry in the Users table
function installUserUpdates (latestUsrJsonObj) {
    db.transaction("rw", db.Users, function() {
        db.Users
            .where("uid")
            .equals(latestUsrJsonObj.uid)
            .modify({
                lastUpdate: latestUsrJsonObj.lastUpdate,
                fname: latestUsrJsonObj.fname,
                lname: latestUsrJsonObj.lname,
                phoneNo: latestUsrJsonObj.phoneNo,
                email: latestUsrJsonObj.email,
                pictureUrl: latestUsrJsonObj.pictureUrl,
                school: latestUsrJsonObj.school,
                funFacts: latestUsrJsonObj.funFacts
            });
            console.log("Updated user " + latestUsrJsonObj.uid);
    });
}

// Checks if user exists in the database - WIP
function usrExists (usrUid, resolve, reject) {
    return db.Users
        .where("uid")
        .equals(usrUid)
        .count(function (o) {
            if (o > 0)
                reject();
            else
                resolve();
        }).catch(function (e) {
            console.log("Error: " + e);
        });
}

// ----- Level 1 - One Dependency ----- //

// Add user obj to database
function DB_addUser (user) {
    usrExists(user.uid, addUsr, null);

    function addUsr () {
        db.transaction("rw", db.Users, function() {
            db.Users.add({
                uid: user.uid,
                lastUpdate: user.lastUpdate,
                fname: user.fname,
                lname: user.lname,
                phoneNo: user.phoneNo,
                email: user.email,
                school: user.school,
                photo: user.photo,
                funFacts: user.funFacts
            }); 
        }).then(function() {
            console.log("Added a user");
        });
    }

    function failed () {
        console.log("Failed to add user to the database");
    }
}

// ----- Level 2 - Two Dependencies ----- //

// Adds a user from a json file
function getAndAddUsrFromJson (formdata) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
            console.log("Finished downloading the json file.");
            var jsonObj = JSON.parse(req.responseText);
            console.log(jsonObj);

            DB_addUser(jsonObj);
        }
    };

    req.open('GET', 'http://sitec.localdomain/js/alex.json', true);
    req.send(formdata);
}

// Checks if updates are needed
function checkUsrForUpdates () { 
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
            console.log("Finished downloading latest");

            var jsonObj = JSON.parse(req.responseText);
            
            db.transaction("rw", db.Users, function() {
                db.Users
                    .where("uid")
                    .equals(jsonObj.uid)
                    .each(function (o) {
                        console.log("Local lastUpdate: " + o.lastUpdate + " Server lastUpdate: " + jsonObj.lastUpdate)
                        if (o.lastUpdate != jsonObj.lastUpdate) {
                            console.log("Update needed for uid " + jsonObj.uid);
                            installUserUpdates(jsonObj);
                        } else {
                            console.log("No updated needed");
                        }
                    });
            });
        }
    }

    req.open('GET', 'http://sitec.localdomain/js/alexV2.json', true);
    req.send(null);
}

// ----- Constructors for objects ----- //

// User object
function Group_user (fname, lname, phoneNo, email, photo, school, funFactsAboutUsr) {
    this.uid = "";
    this.lastUpdate = Date.now();
    this.fname = fname;
    this.lname = lname;
    this.phoneNo = phoneNo;
    this.email = email;
    this.photo = photo;
    this.school = school;
    this.password = "";
    this.funFacts = funFactsAboutUsr;
}

// Trip
function Group_trip (name, desc, ownerUid) {
    this.uid = "";
    this.lastUpdate = Date.now();
    this.name = name;
    this.desc = desc;
    this.ownerUid = ownerUid;
    this.lastUpdate = Date.now();
    // this.members = [ownerUid];
    this.owners = [ownerUid];
    this.invitations = []; 
}

function Group_event (name, desc, startTimeStamp, endTimeStamp, location) {
    this.name = name;
    this.desc = desc;
    this.startTimeStamp = startTimeStamp;
    this.endTimeStamp = endTimeStamp;
    this.location = location;
}

// ----- Test functions ----- //

function testDB () {
    getCurrentUser()
        .then(function(entry){
            if (entry !== null)
                console.log("Currently logged in as " + entry.fname + " " + entry.lname);
            else
                console.log("Not currently logged in");
        });
}

function addDummyUsers () {
    var bunchOfUsers = [];
    var i = 0;
    userList.forEach ( function (user) {
        bunchOfUsers[i] = new Group_user(
            user.fname,
            user.lname,
            user.phoneNo[0],
            user.email[0],
            user.pictureUrl,
            user.school,
            user.funFacts
        );
        bunchOfUsers[i].password = user.password;
        bunchOfUsers[i].uid = user.uid;
        i++;
    });

    bunchOfUsers.forEach(function(user) {
        DB_addUser(user);
    });
}

function clearUserTables () {
    db.Users.clear();
}

function printOutUsers () {
    db.Users
        .toArray(function (person) {
            person.forEach(function (entry) {
                console.log(entry.fname + " " + entry.lname);
            });
        });
}

function searchUsers () {
    var fname = document.getElementById("testInp4").value;
    db.Users
        .where("fname")
        .startsWith(fname)
        .toArray(function (list) {
            list.forEach(function (entry) {
                console.log(entry.email);
            });
        });
}

function addDummyTrips () {
    var bunchOfTrips = [];
    var i = 0;
    groupList.forEach (function (trip) {
        bunchOfTrips[i] = new Group_trip (
            trip.name,
            trip.desc,
            userList[i].uid
        );
        bunchOfTrips[i].uid = i + "ABC";
        bunchOfTrips[i].members = trip.members;
        bunchOfTrips[i].events = trip.events;
        i++;
    });

    // Working block
    bunchOfTrips.forEach(function(trip) {
        DB_addTrip(trip);
    });
}

function clearTripsTable () {
    db.Trips.clear();
}

function printOutTrips () {
    db.Trips
        .toArray(function (person) {
            person.forEach(function (entry) {
                console.log(entry.name);
            });
        });
}

function searchTrips () {
    var fname = document.getElementById("testInp9").value;
    db.Trips
        .where("name")
        .startsWith(fname)
        .toArray(function (list) {
            list.forEach(function (entry) {
                console.log(entry.name);
            });
        });
}

function testLogin () {
    console.log("Demo login");
    var new_usr = new Group_user("Tester", "McTester", "2624421666", "test@gmail.com", "img/Bloo.jpg", "WCTC", [{title: "Favorite Book", body: "Hunger Games"}]);
    new_usr.uid = "1482024710156";
    new_usr.password = "1216985755";
    setCurrentUser(new_usr)
        .then(function (e) {
            // window.location.assign("groups.html");
            window.location.assign("group.html");
        });
}

function testGetCUserInfo (resolve, reject) {
    // var tmp = db.CUser.toArray();
    db.CUser
        .toArray(function (list) {
            if (list.length > 0) {
                list.forEach(function (entry) {
                    console.log(entry.uid);
                    db.Users
                        .get(entry.uid, function (cuserObj) {
                            console.log(cuserObj);
                            //resolve(cuserObj);
                        });
                });
            } else {
                console.log("Unable to print usr info because not logged in");
                //reject();
            }
        });
}

function updateCUserName () {
    var newFname = document.getElementById("testInp16").value;
    db.CUser
        .toArray(function (list) {
            list.forEach(function (entry) {
                db.Users
                    .where("uid") //{uid: entry.uid, fname: "Charlie"});
                    .equals(entry.uid)
                    .modify({fname: newFname});
            });
        }).then(testGetCUserInfo);
} 

function getTripMembers () {
    db.Trips.get('0ABC')
        .then(function (trip) {
            console.log(trip.members);
            trip.members.forEach(function (entry) {
                db.Users.get(entry)
                    .then(function (usr) {
                        console.log(usr);
                    });
            });
        });
}

function checkTripsForUpdates () {
    db.Trips.get('0ABC')
}

function getTripLastUpdate(uid) {
    //XMLHttpRequest();
    serverLU = 123456;
    return serverLU;
}

function testingCheckIfUsrExists () {
    var uid = parseInt(document.getElementById("testInp20").value);
    checkIfUsrExists(uid).then(function(e){console.log(e);});
}

// ----- Initialize the database ----- //

DB_init();