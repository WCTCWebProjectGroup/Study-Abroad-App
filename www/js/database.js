// Database functions and vars
// The app will use only ONE database, for now it will be called KickMySchoolDB
// Needs to be included before index.js!

// *The database currently has two tables; 'Users' and 'Trips'.
// *The first entry in the 'Users' table is the user who logged in. Their 'uid' is 1 

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
        "Trips"
    ];
}

function DB_init () {
    db = new Dexie(DB_name());

    db.version(1).stores({
        Users: 'uid, lastUpdate, fname, lname, phoneNo, email, school, photo',
        Trips: 'uid, lastUpdate, name, desc, members, owners, activeInvitations, events'
    });
}

function getCurrentUser() {
    if (db === undefined)
        DB_init();

    return db.Users
        .where('uid')
        .equals(0)
        .toArray()
        .then(function(entry){
            // console.log(entry);
            return entry[0] === undefined ? null : entry[0];
        });
}

// Sets/updates the current users info
function setCurrentUser(user) {
    if (db === undefined)
        DB_init();

    db.transaction("rw", db.Users, function() {
        db.Users.add({
            uid: 1,
            lastUpdate: user.lastUpdate,
            fname: user.fname,
            lname: user.lname,
            phoneNo: user.phoneNo,
            email: user.email,
            school: user.school,
            photo: user.photo
        });
    }).then(function() {
        return true;
    }).catch(function(error) {
        console.log("Error: " + error);
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

    return db.transaction("rw", db.Users, db.Trips, function() {
        db.Users.clear();
        db.Trips.clear();
    }).then(function() {
        console.log("Finished clearing the tables.");
    });
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
    this.lastUpdate = Date.now();
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