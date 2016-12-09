// Database functions and vars
// The app will use only ONE database, for now it will be called KickMySchoolDB
// Needs to be included before index.js!

// *The database currently has the tables; 'Users', 'Trips', 'CUser'.
// *The entry in the 'CUsers' table is the user who logged in. 

// ----- New API using Dexie ----- //
// Global Vars - TODO: Put in function
var db;

// Return the database name
function DB_name () {
    return "KickMySchoolDB";
}

// Return an array of all the tables to be used - I don't think this is needed
function DB_Tables () {
    var tables = [
        "Users",
        "Trips",
        "CUser"
    ];
}

function DB_init () {
    db = new Dexie(DB_name());

    db.version(1).stores({
        Users: 'uid, lastUpdate, fname, lname, phoneNo, email, school, photo',
        Trips: 'uid, lastUpdate, name, desc, members, owners, activeInvitations, events',
        CUser: 'uid'
    });
}

function getCurrentUser() {
    if (db === undefined)
        DB_init();

    // FIXME!
    // This should first check to see if
    db.transaction("r", db.Users, db.CUser, function () {
        return db.Users
            .where('uid')
            .equals(
                db.CUser.first(function (entry) {
                    console.log("The current users id is - " + entry.uid);
                    return entry.uid;
                }))
            .toArray()
            .then(function(entry){
                // console.log(entry);
                return entry[0] === undefined ? null : entry[0];
            });
    });
}

// Sets the current users info. Returns false if the user already
// exists and returns true if the operation succeeded.
function setCurrentUser(user) {
    if (db === undefined)
        DB_init();

    db.transaction("rw", db.Users, db.CUser, function() {
        db.CUser.add({ uid: 123 });
        var cusrReg = false;
        var tmp = db.Users.get(123)
            .then(function () {
                console.log("Don't need to add the user to table Users because it already exists");
            }).catch(function (err) {
            db.Users.add({
                uid: 123,
                lastUpdate: user.lastUpdate,
                fname: user.fname,
                lname: user.lname,
                phoneNo: user.phoneNo,
                email: user.email,
                school: user.school,
                photo: user.photo
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
    if (db === undefined)
        DB_init();

    db.CUser.clear();
    console.log("Finished clearing CUser.");
}

// Add user obj to database
function DB_addUser (user) {
    if (db === undefined)
        DB_init();

    db.transaction("rw", db.Users, function() {
        db.Users.add({
            uid: user.uid,
            lastUpdate: user.lastUpdate,
            fname: user.fname,
            lname: user.lname,
            phoneNo: user.phoneNo,
            email: user.email,
            school: user.school,
            photo: user.photo
        }); 
    }).then(function() {
        console.log("done");
    });
}

// Add trip obj to database
function DB_addTrip (trip) {
    if (db === undefined)
        DB_init();

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
        });
    });
}

// ----- Constructors for JS objects ----- //

// User object
function Group_user (fname, lname, phoneNo, email, photo, school) {
    this.uid = "";
    this.lastUpdate = Date.now();
    this.fname = fname;
    this.lname = lname;
    this.phoneNo = phoneNo;
    this.email = email;
    this.photo = photo;
    this.school = school;
}

// Trip
function Group_trip (name, desc, ownerUid) {
    this.uid = "";
    this.lastUpdate = Date.now();
    this.name = name;
    this.desc = desc;
    this.ownerUid = ownerUid;
    this.lastUpdate = Date.now();
    this.members = [ownerUid];
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
    DB_init();

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
            "http://",
            user.school
        );
        bunchOfUsers[i].uid = i;
        i++;
    });

    bunchOfUsers.forEach(function(user) {
        DB_addUser(user);
    });
}

function clearUserTables () {
    if (db === undefined)
        DB_init();

    db.Users.clear();
}

function printOutUsers () {
    if (db === undefined)
        DB_init();

    db.Users
        .toArray(function (person) {
            person.forEach(function (entry) {
                console.log(entry.fname + " " + entry.lname);
            });
        });
}

function searchUsers () {
    if (db === undefined)
        DB_init();

    var fname = document.getElementById("testInp4").value;
    db.Users
        .where("fname")
        .anyOfIgnoreCase(fname)
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
        i++;
    });

    // Working block
    bunchOfTrips.forEach(function(trip) {
        DB_addTrip(trip);
    });
}

function clearTripsTable () {
    if (db === undefined)
        DB_init();

    db.Trips.clear();
}

function printOutTrips () {
    if (db === undefined)
        DB_init();

    db.Trips
        .toArray(function (person) {
            person.forEach(function (entry) {
                console.log(entry.name);
            });
        });
}

function searchTrips () {
    if (db === undefined)
        DB_init();

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
    var new_usr = new Group_user("Darth", "Vader", "2624421666", "test@gmail.com", "~/Pictures/test.svg", "WCTC");
    setCurrentUser(new_usr);
}

function testGetCUserInfo () {
    if (db === undefined)
        DB_init();

    if (db.CUser.toArray.length == 1) {
        db.CUser
            .toArray(function (list) {
                list.forEach(function (entry) {
                    console.log(entry.uid);
                    db.Users
                        .get(entry.uid, function (cuserObj) {
                            console.log(cuserObj);
                        });
                });
            });
    } else {
        console.log("Unable to print usr info because not logged in");
    }
}