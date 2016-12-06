function testDB () {
    var db = new Dexie("KickMySchool");

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
                db.Users.add({
                    uid: "123ABC1",
                    lastUpdate: Date.now(),
                    fname: "Alex",
                    lname: "Hayes",
                    phoneNo: "262421666",
                    email: "alex.c.hayes08@gmail.com",
                    school: "WCTC",
                    photo: "testUrl"
                });
            } else {
                user.forEach(function (entry) {
                    console.log(entry);
                });
            }
        });
}