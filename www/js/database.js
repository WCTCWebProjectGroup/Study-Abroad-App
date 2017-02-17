// Database functions and vars
// The app will use only ONE database, for now it will be called TripMySchoolDB
// Needs to be included before index.js!

// *The database currently has the tables; 'Users', 'Trips'

// ----- New API using Dexie ----- //
// Global Vars - TODO: Put in anon-function

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
    ];
}

// This is the function that sets up the database schema
function DB_init () {
    db = new Dexie(DB_name());

    return db.version(1).stores({
        Users: 'uid, fname, lname, phoneNo, email, photo',
        Trips: 'name, desc, members, supervisors, emergencyContacs, events'
    });
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
            supervisors: trip.supervisors,
            activeInvitations: trip.activeInvitations,
            events: trip.events
        }).then(function () {
            console.log("Added a trip");
        });
    });
}

// Improved function for adding trips to the db
function DB_addTripV2 (trip) {
    return db.transaction("rw", db.Trips, function() {
        db.Trips.add({
            name: trip.name,
            desc: trip.desc,
            members: trip.members,
            emergencyContacts: trip.emergencyContacts,
            supervisors: trip.supervisors,
            events: trip.events
        }).then(function () {
            console.log("Added a trip");
        });
    });
}

// ----- Level 0 - No Dependencies ----- //

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

// ----- Level 1 - One Dependency ----- //

// Add user obj to database
function DB_addUser (user) {
    return db.transaction("rw", db.Users, function() {
        db.Users.add({
            uid: user.uid,
            fname: user.fname,
            lname: user.lname,
            phoneNo: user.phoneNo,
            email: user.email,
            photo: user.photo,
            funFacts: user.funFacts
        }); 
    }).then(function() {
        console.log("Added a user");
    });
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
function Group_trip (name, desc, supervisors) {
    this.uid = "";
    this.name = name;
    this.desc = desc;        
    this.supervisors = supervisors;
    this.emergencyContacts = [];
    this.members = [];
    this.events = [];
}

function Group_event (name, desc, startTimeStamp, endTimeStamp, location) {
    this.name = name;
    this.desc = desc;
    this.startTimeStamp = startTimeStamp;
    this.endTimeStamp = endTimeStamp;
    this.location = location;
}

// ----- Test functions ----- //

// This is the function which stores the array of users to the database
function addUsers (userList) {
    var bunchOfUsers = [];
    var bunchOfUsersPromises = [];
    var i = 0;
    userList.forEach ( function (user) {
        bunchOfUsers[i] = new Group_user(
            user.fname,
            user.lname,
            user.phoneNo,
            user.email,
            user.pictureUrl,
            user.school,
            user.funFacts
        );
        bunchOfUsers[i].password = user.password;
        bunchOfUsers[i].uid = user.uid;
        i++;
    });

    bunchOfUsers.forEach(function(user) {
        bunchOfUsersPromises.push(DB_addUser(user));
    });

    return Promise.all(bunchOfUsersPromises);
}

// Wipes all entries in the user table
function clearUserTables () {
    db.Users.clear();
}

// This function is for development purposes, it prints out all entries in the user table to the log
function printOutUsers () {
    db.Users
        .toArray(function (person) {
            person.forEach(function (entry) {
                console.log(entry.fname + " " + entry.lname);
            });
        });
}

// This is the function that enters the group info from the json object
function addTrip (groupInfo) {
    var cleanTrip = new Group_trip (
        groupInfo.name,
        groupInfo.desc,
        groupInfo.supervisors
    );
    cleanTrip.members = groupInfo.members;
    cleanTrip.events = groupInfo.events;
    cleanTrip.emergencyContacts = groupInfo.emergencyContacts;

    return DB_addTripV2(cleanTrip);
}

// Wipes all entries from the trip table
function clearTripsTable () {
    db.Trips.clear();
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

// ----- Initialize the database ----- //

DB_init();