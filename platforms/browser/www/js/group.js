function setGroupInfo ()
{

    // Set group emergency contacts
    db.Trips
        .toCollection()
        .first(function(trip) {
            // Set group name
            document.getElementById("gname").innerHTML = trip.name;

            // Set group description
            document.getElementById("gdesc").innerHTML = trip.desc;

            // Set emergency contacts
            trip.emergencyContacts.forEach(function (eContact) {
                let el = document.getElementById("emegencyContactCardT");
                let clone = document.importNode(el.content, true);
                clone.querySelector(".contactName").innerHTML = eContact.name;
                clone.querySelector(".contactPhoneNo").innerHTML = eContact.phoneNo;
                clone.querySelector(".contactPhoneNo").setAttribute("href", "tel:" + eContact.phoneNo)
                document.getElementById("emergency").appendChild(clone);
            });

            // Set events
            trip.events.forEach(function (event) {
                let el = document.getElementById("eventT");
                let clone = document.importNode(el.content, true);
                document.getElementById("eventContainer").appendChild(clone);
                document.querySelector("#eventContainer .event:last-child .ename").innerHTML = event.name;
                document.querySelector("#eventContainer .event:last-child .edesc").innerHTML = event.desc;
                document.querySelector("#eventContainer .event:last-child .eloc").innerHTML = event.location;
                document.querySelector("#eventContainer .event:last-child .etimestamp").innerHTML = event.timestamp;
            });

            // Set group supervisors
            return trip.supervisors;
        }).then(function(contactIDs) {
            contactIDs.forEach(function (sContactID) {
                db.Users
                    .where("uid")
                    .equals(sContactID.toString())
                    .each(function (sContact) {
                        let el = document.getElementById("contactCardT");
                        let clone = document.importNode(el.content, true);
                        clone.querySelector(".contactName").innerHTML = sContact.fname + " " + sContact.lname;
                        clone.querySelector("img").setAttribute("src", sContact.photo);

                        document.getElementById("groupOwn").appendChild(clone);

                        let usrInfoObj = {
                            fullName: sContact.fname + " " + sContact.lname,
                            image: sContact.photo,
                            email: sContact.email,
                            phoneNo: sContact.phoneNo,
                            funFacts: sContact.funFacts
                        };

                        document.querySelector("#groupOwn .contact:last-child").addEventListener("click", function () {
                            showUsrPanel(usrInfoObj)
                        });
                    })
            });
        });
}

setGroupInfo();

// Event listener functions for pig-nose calendar when it switches months
// needs to reload the event listeners

$(function() {

    function popup (theEventsDate) {
        // Using the events date/time, lookup the event from the db
        if(theEventsDate === null)
            return;
        var panel = document.getElementById("eventPanel");
        panel.style.top = "5%";
        document.querySelectorAll("#eventContainer .event").forEach(function(htmlEvent) {
            // console.log(theEventsDate.detail);
            var selectedDate = new Date(theEventsDate.toDate());
            var eventsDate = new Date(htmlEvent.querySelector(".etimestamp").innerHTML.split(" ")[0]);
            //console.log(eventsDate);
            // Check to see if the year/month/day are equal
            if (selectedDate.getFullYear() == eventsDate.getFullYear() &&
                selectedDate.getMonth() == eventsDate.getMonth() &&
                selectedDate.getDate() == eventsDate.getDate())
                {
                    htmlEvent.style.display = "block";
                }
        });
    };

    $('#wrapper .version strong').text('v' + pignoseCalendar.VERSION);
    function onClickHandler(date, obj) {
        /**
         * @date is an array which be included dates(clicked date at first index)
         * @obj is an object which stored calendar interal data.
         * @obj.calendar is an element reference.
         * @obj.storage.activeDates is all toggled data, If you use toggle type calendar.
         */

        var $calendar = obj.calendar;
        var $box = $calendar.parent().siblings('.box').show();
        var text = 'You choose date ';

        if(date[0] !== null) {
            text += date[0].format('YYYY-MM-DD');
        }

        if(date[0] !== null && date[1] !== null) {
            text += ' ~ ';
        } else if(date[0] === null && date[1] == null) {
            text += 'nothing';
        }

        if(date[1] !== null) {
            text += date[1].format('YYYY-MM-DD');
        }

        $box.text(text);

        popup(date[0]);
    }

    var goodDates = [];

    db.Trips
        .toCollection()
        .first(function(entry){
            var i = 0;
            entry.events.forEach (function (eve) {
                let theDate = new Date(eve.timestamp);
                let theDateStr = "";
                theDateStr += theDate.getFullYear() + "-";
                let theMonth = (theDate.getMonth() + 1).toString();
                if (theMonth.length == 1)
                    theMonth = "0" + theMonth;
                theDateStr += theMonth + "-";
                let theDay = theDate.getDate().toString();
                if (theDay.length == 1)
                    theDay = "0" + theDay;
                theDateStr += theDay;
                goodDates[i] = theDateStr;
                i++;
            });
            createCalendar();
        });

    function createCalendar() {
        // Default Calendar
        $('.calendar').pignoseCalendar({
            select: onClickHandler,
            enabledDates: goodDates
        });

        //document.querySelector(".pignose-calendar-top-next").addEventListener("click", setEventPopups());
        //document.querySelector(".pignose-calendar-top-prev").addEventListener("click", setEventPopups());

        // Calendar event popup
        // function setEventPopups ()
        // {
        //     var events = document.querySelectorAll(".pignose-calendar-unit-date:not(.pignose-calendar-unit-disabled)");
        //     events.forEach(function (e) {
        //         // console.log(e);
        //         var d = e.getAttribute("data-date");
        //         // console.log(d);
        //         // Custom js event for each event
        //         // var newClickEvent = new Event("eventClicked");
        //         var dateEvent = new CustomEvent('dateEvent', {'detail': d});
        //         // Emit dateEvent with data from elem
        //         e.querySelector("a").addEventListener('click', function() {
        //             // console.log("Fired event");
        //             e.dispatchEvent(dateEvent);
        //         });
        //         e.addEventListener('dateEvent', function (theEventsDate) {
        //             // Using the events date/time, lookup the event from the db
        //             var panel = document.getElementById("eventPanel");
        //             panel.style.top = "5%";
        //             document.querySelectorAll("#eventContainer .event").forEach(function(htmlEvent) {
        //                 // console.log(theEventsDate.detail);
        //                 var selectedDate = new Date(theEventsDate.detail);
        //                 var eventsDate = new Date(htmlEvent.querySelector(".etimestamp").innerHTML.split(" ")[0]);
        //                 //console.log(eventsDate);
        //                 // Check to see if the year/month/day are equal
        //                 if (selectedDate.getFullYear() == eventsDate.getFullYear() &&
        //                     selectedDate.getMonth() == eventsDate.getMonth() &&
        //                     selectedDate.getDate() + 1 == eventsDate.getDate())
        //                     {
        //                         htmlEvent.style.display = "block";
        //                     }
        //             });
        //             // console.log("Caught event");
        //         });
            // });
        }
        
    }) // End of function createCalendar