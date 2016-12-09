var expectedReplies = 0; // This is a counter that assures that all replies are recieved 
        var replies = []; // This stores the replies
        var updatesInstalled = 0; // Counter that checks to see if all the replies have been handeled before proceeding

        function isFirstTimeSet()
        {
            // Later this function will check if a file exists to determine
            // if this really is the first time this program is being run.
            // This function MUST return a boolean.
            // return true;
            console.log("Hopefully this is called after the page is loaded.");
            set();
            var tableExists = get("SELECT * from [Users]");
            if (tableExists === null)
                return true;
            else
                return false;
        }

        function firstTimeSetUp ()
        {
            // TODO: Message saying first time setup
            window.location.assign("login.html");
        }

        // This function is called on each reply once it finishes downloading. It is
        // responsible for updating the local client with the information in replies.
        function updateLocal(newData)
        {
            console.log("Updating the local DB.");
            console.log("New info = " + newData);

            // At the end of this function increment updatesInstalled var
            updatesInstalled++;
            checkIfDone();
        }

        function checkIfDone() 
        {
            console.log("Is this running?");
            if (updatesInstalled == expectedReplies && updatesInstalled != 0)
            {
                finished();
            }
        }

        function httpGetAsync (url, position)
        {
            var http = new XMLHttpRequest();
            http.onreadystatechange = function() {
                if (http.readyState == 4 && http.status == 200)
                {
                    // recievedReplies++;
                    replies[position] = http.responseText;
                    updateLocal(replies[position]);
                }
            }
            http.open("GET", url, true);
            http.send(null);
        }

        function checkForUpdates () 
        {
            // TODO: Read usrGroupFile
            // Until then use parsedGroupFile in dummyJSON.js
            expectedReplies = parsedGroupFile.groups.length; // This is how many replies the client will recieve
            console.log(`Expecting ${expectedReplies} replies.`);

            for (var i = 0; i < expectedReplies; i++)
            {
                httpGetAsync("index.html", i);
            }

            document.getElementById("startMsg").innerHTML = "Updating";
        }

        function finished()
        {
            window.location.assign("groups.html");
        }

        function afterPageLoad ()
        {
            // Test SQLitePlugin
            testDB();
            // If it's first time, go to login page, else login & check for updates
            if (isFirstTimeSet())
                firstTimeSetUp();
            else
            {
                console.log("Not first time running application.");
                // There should exist a file that contains the uid
                // for each group this user is a member of.
                // Parse that file and run a GET request to check if
                // the hashed time stamps match up. 
                console.log("Now checking for updates.")
                setTimeout(checkForUpdates,2000);
            }
            // 
        } 

        //window.addEventListener("load", afterPageLoad());