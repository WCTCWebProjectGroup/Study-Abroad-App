(function(){
    var loadingMsg = document.getElementById("loadingMsg");

    db.Trips
        .toArray(function(a){
            return a[0];
        }).then(function(entry){
            let d = new Date();
            var today = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            today = new Date(today);

            entry.events.forEach (function (eve) {
                let el = document.getElementById("eventT");
                let clone = document.importNode(el.content, true);

                clone.querySelector(".ename").innerHTML = eve.name;
                clone.querySelector(".eloc").innerHTML = eve.location;
                clone.querySelector(".etimestamp").innerHTML = eve.timestamp;

                let eventDate = new Date(eve.timestamp.split(" ")[0]);
                if (eventDate.toDateString() == today.toDateString()) {
                    document.getElementById("currentHoldingMsg").innerHTML = "";
                    document.getElementById("eventContainer").appendChild(clone);
                }
                else if (eventDate > today) {
                    document.getElementById("upcomingHoldingMsg").innerHTML = "";
                    document.getElementById("upcomingEvents").appendChild(clone);
                }
                else if (eventDate < today) {
                    document.getElementById("prevHoldingMsg").innerHTML = "";
                    document.getElementById("previousEvents").appendChild(clone);
                }
                else {
                    console.log("Error!");
                }

                loadingMsg.style.display = "none";
            })
        });
})();