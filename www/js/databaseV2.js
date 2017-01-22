function testDB () {
    var db = new Dexie("KickMySchoolDB");

    db.version(1).stores({
        Users: 'uid, lastUpdate, fname, lname, phoneNo, email, school, photo',
        Trips: 'uid, lastUpdate, name, desc, members, owners, activeInvitations, events'
    });

    db.open().catch(function(error) {
        console.log("Error: " + error);
    });

    db.Users
		.where('fname').equalsIgnoreCase("alex")
        .toArray()
        .then(function (user) {
            if (user.length < 1)
            {
                db.transaction('rw', db.Users, function()
                {
                    db.Users.add({
                        uid: "1",
                        lastUpdate: Date.now(),
                        fname: "Alex",
                        lname: "Hayes",
                        phoneNo: "262421666",
                        email: "alex.c.hayes08@gmail.com",
                        school: "WCTC",
                        photo: "testUrl"
                    });
                    db.Users.add({
                        uid: "123ABC2",
                        lastUpdate: Date.now(),
                        fname: "John",
                        lname: "Doe",
                        phoneNo: "262421666",
                        email: "someEmail@gmail.com",
                        school: "WCTC",
                        photo: "testUrl"
                    });
                    db.Users.add({
                        uid: "123ABC3",
                        lastUpdate: Date.now(),
                        fname: "Another",
                        lname: "Person",
                        phoneNo: "262421666",
                        email: "someEmail@gmail.com",
                        school: "WCTC",
                        photo: "testUrl"
                    });
                });
            } else {
                user.forEach(function (entry) {
                    console.log(entry);
                });
            }
        });
}