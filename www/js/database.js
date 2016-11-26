// Database functions and vars
// The app will use only ONE database, for now it will be called kickmyschool.db
// Needs to be included before index.js!

// Test sqlitePlugin function
function testDB()
{
    window.sqlitePlugin.openDatabase({ name: 'hello-world.db', location: 'default' }, function (db) {
        db.executeSql("select length('tenletters') as stringlength", [], function (res) {
            var stringlength = res.rows.item(0).stringlength;
            console.log('got stringlength: ' + stringlength);
            document.getElementById('deviceready').querySelector('.received').innerHTML = 'stringlength: ' + stringlength;
        });
    });
}

function openDB ()
{
    var db = null;
    document.addEventListener('deviceready', function() {
        db = window.sqlitePlugin.openDatabase({name: 'kickmyschool.db', location: 'default'});
    });

    return db;
}

// Need functions for inserting, removing, modifying, and fetching.
function get(queryString) {
    var db = openDB();
    db.transaction(function(tx) {
        tx.executeSql(queryString, [], function(tx, rs) {
            console.log(rs.rows);
            return rs.rows;
        }, function(tx, error) {
            console.log('Error: ' + error.message);
        });
    });
}

// set will insert, update
function set(/*dbName, columns, values*/) {
    var db = openDB();
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Users (UID, LUK, Name)');
        tx.executeSql('INSERT INTO Users VALUES (?,?,?)', [123, 'today', 'Alice']);
        tx.executeSql('INSERT INTO Users VALUES (?,?,?)', [123, 'today', 'Betty']);
    }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function() {
        console.log('Populated database OK');
    });
}

function remove(dbName, queryString) {
    
}