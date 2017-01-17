var express = require('express')
var app = express()

const groupList = [
	{
		uid: "ASDF789ASD0F8ASDF8A",
		hashkey: "68ASD4F3AS1DFA68DF4",
		name: "WCTC Travel Group",
		desc: "This is a tmp group. And this is its description.",
		owners: [
			1482102828139,
			1482102985259
		],
		members: [
			1482101447778,
			1482101688776,
			1482101882960,
			1482101998652,
			1482102107219,
			1482102215109,
			1482102339901,
			1482102444285,
			1482102570872,
			1482102704374
		],
		school: "WCTC",
		events: [
			{
				name: "Meet at the Airport",
				desc: "Meet at the Airport",
				location: "General Mitchell International Airport",
				timestamp: "1/5/2017 9:00 am"
			},
			{
				name: "Check-In at Hotel",
				desc: "Check-In at Hotel",
				location: "Le General Hotel",
				timestamp: "1/5/2017 5:00 pm"
			},
			{
				name: "Visit Eiffel Tower",
				desc: "Visit Eiffel Tower",
				location: "Eiffel Tower, Avenue Anatole France, Paris, France",
				timestamp: "1/6/2017 3:00 pm"
			},
			{
				name: "Movie",
				desc: "Movie",
				location: "Le Grand Rex",
				timestamp: "1/6/2017 6:00 pm"
			},
		]
	},
	{
		uid: "ASDF789ASD0F8ASDF8B",
		hashkey: "68ASD4F3AS1DFA68DF4",
		name: "Madison Travel Group",
		desc: "This is a tmp group. And this is its description.",
		owners: [
			"ABC124"
		],
		members: [
			"ABC123",
			"ABC125"
		],
		school: "Madison",
		
	},
	{
		uid: "ASDF789ASD0F8ASDF8C",
		hashkey: "68ASD4F3AS1DFA68DF4",
		name: "Platteville Travel Group",
		desc: "This is a tmp group. And this is its description.",
		owners: [
			"ABC124"
		],
		members: [
			"ABC123",
			"ABC125"
		],
		school: "Platteville"
	}
];


var userList = [
	{
		uid: "1482024710156",
		lastUpdate: "1482024710156",
		username: "test@gmail.com",
		password: "1216985755",
		fname: "Test",
		lname: "McTester",
		phoneNo: [
			2624421666,
			2526508372,
			1234567890
		],
		email: [
			"test@gmail.com"
		],
		pictureUrl: "img/Bloo.jpg",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "22 years old"
			},
			{
				title: "From",
				body: "Waukesha, WI"
			},
			{
				title: "Program",
				body: "Web and Digital Media Design"
			},
			{
				title: "Hobbies",
				body: "Video games, photography"
			},
			{
				title: "Favorite Book",
				body: "Hunger Games"
			}
		]
	},
	{
		uid: "1482024762447",
		lastUpdate: "1482024762447",
		username: "bob@gmail.com",
		password: "",
		fname: "Bob",
		lname: "Doe",
		phoneNo: [
			2624421666,
			2526508372
		],
		email: [
			"Bob@gmail.com"
		],
		pictureUrl: "",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "22 years old"
			},
			{
				title: "From",
				body: "Waukesha, WI"
			},
			{
				title: "Program",
				body: "Web and Digital Media Design"
			},
			{
				title: "Hobbies",
				body: "Video games, photography"
			},
			{
				title: "Favorite Book",
				body: "Hunger Games"
			}
		]
	},
	{
		uid: "1482024775993",
		lastUpdate: "1482024775993",
		username: "tim1@gmail.com",
		password: "",
		fname: "Tim",
		lname: "Doe",
		phoneNo: [
			2624421666,
			2526508372
		],
		email: [
			"tim1@gmail.com"
		],
		pictureUrl: "",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "22 years old"
			},
			{
				title: "From",
				body: "Waukesha, WI"
			},
			{
				title: "Program",
				body: "Web and Digital Media Design"
			},
			{
				title: "Hobbies",
				body: "Video games, photography"
			},
			{
				title: "Favorite Book",
				body: "Hunger Games"
			}
		]
	},
	{
		uid: "1482024793118",
		lastUpdate: "1482024793118",
		username: "tim2@gmail.com",
		password: "",
		fname: "Joe",
		lname: "Doe",
		phoneNo: [
			2624421666,
			2526508372
		],
		email: [
			"Joe@gmail.com"
		],
		pictureUrl: "",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "22 years old"
			},
			{
				title: "From",
				body: "Waukesha, WI"
			},
			{
				title: "Program",
				body: "Web and Digital Media Design"
			},
			{
				title: "Hobbies",
				body: "Video games, photography"
			},
			{
				title: "Favorite Book",
				body: "Hunger Games"
			}
		]
	},
	{
		uid: "1482024806110",
		lastUpdate: "1482024806110",
		username: "tim3@gmail.com",
		password: "",
		fname: "Clark",
		lname: "Doe",
		phoneNo: [
			2624421666,
			2526508372
		],
		email: [
			"Clark@gmail.com"
		],
		pictureUrl: "",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "22 years old"
			},
			{
				title: "From",
				body: "Waukesha, WI"
			},
			{
				title: "Program",
				body: "Web and Digital Media Design"
			},
			{
				title: "Hobbies",
				body: "Video games, photography"
			},
			{
				title: "Favorite Book",
				body: "Hunger Games"
			}
		]
	},
	{
		uid: "1482024818559",
		lastUpdate: "1482024818559",
		username: "tim4@gmail.com",
		password: "",
		fname: "Charlie",
		lname: "Brown",
		phoneNo: [
			2624421666,
			2526508372
		],
		email: [
			"Charlie@gmail.com"
		],
		pictureUrl: "",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "22 years old"
			},
			{
				title: "From",
				body: "Waukesha, WI"
			},
			{
				title: "Program",
				body: "Web and Digital Media Design"
			},
			{
				title: "Hobbies",
				body: "Video games, photography"
			},
			{
				title: "Favorite Book",
				body: "Hunger Games"
			}
		]
	},
	{
		uid: "1482101447778",
		lastUpdate: "1482101447778",
		username: "chelsey@gmail.com",
		password: "",
		fname: "Chelsey",
		lname: "Wambach",
		phoneNo: [
			14147041673
		],
		email: [
			"chelsey@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/chelsey.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "22 years old"
			},
			{
				title: "From",
				body: "Waukesha, WI"
			},
			{
				title: "Program",
				body: "Web and Digital Media Design"
			},
			{
				title: "Hobbies",
				body: "Video games, photography"
			},
			{
				title: "Favorite Book",
				body: "Hunger Games"
			}
		]
	},
	{
		uid: "1482101688776",
		lastUpdate: "1482101688776",
		username: "charles@gmail.com",
		password: "",
		fname: "Charles",
		lname: "Russel",
		phoneNo: [
			12628394158
		],
		email: [
			"charles@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/charles.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "27 years old"
			},
			{
				title: "From",
				body: "Mukwonago, WI"
			},
			{
				title: "Program",
				body: "Network Specialist"
			},
			{
				title: "Hobbies",
				body: "Reading, computer security"
			},
			{
				title: "Favorite Book",
				body: "The Reckoners Trilogy"
			}
		]
	},
	{
		uid: "1482101882960",
		lastUpdate: "1482101882960",
		username: "beth@gmail.com",
		password: "",
		fname: "Beth",
		lname: "Bryant",
		phoneNo: [
			12628394158
		],
		email: [
			"beth@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/beth.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "21 years old"
			},
			{
				title: "From",
				body: "Sussex, WI"
			},
			{
				title: "Program",
				body: "Marketing"
			},
			{
				title: "Hobbies",
				body: "Student"
			},
			{
				title: "Favorite Book",
				body: "Yes, Please By Amy Poehler"
			}
		]
	},
	{
		uid: "1482101998652",
		lastUpdate: "1482101998652",
		username: "david@gmail.com",
		password: "",
		fname: "David",
		lname: "Green",
		phoneNo: [
			14149164266
		],
		email: [
			"david@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/david.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "27 years old"
			},
			{
				title: "From",
				body: "Elm Grove, WI"
			},
			{
				title: "Program",
				body: "Web and Software Development"
			},
			{
				title: "Hobbies",
				body: "Video games"
			},
			{
				title: "Favorite Book",
				body: "The Hitchhiker's Guide to the Galaxy"
			}
		]
	},
	{
		uid: "1482102107219",
		lastUpdate: "1482102107219",
		username: "andy@gmail.com",
		password: "",
		fname: "Andy",
		lname: "Nellen",
		phoneNo: [
			14149164266
		],
		email: [
			"andy@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/andy.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "36 years old"
			},
			{
				title: "From",
				body: "Brookfield, WI"
			},
			{
				title: "Program",
				body: "Network Specialist"
			},
			{
				title: "Hobbies",
				body: "Woodwork, guitars, fishing, tinkering"
			},
			{
				title: "Favorite Book",
				body: "Animal Farm"
			}
		]
	},
	{
		uid: "1482102215109",
		lastUpdate: "1482102215109",
		username: "arron@gmail.com",
		password: "",
		fname: "Aaron",
		lname: "Gehrt",
		phoneNo: [
			12624422501
		],
		email: [
			"aaron@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/aaron.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "23 years old"
			},
			{
				title: "From",
				body: "Waukesha, WI"
			},
			{
				title: "Program",
				body: "Network Specialist"
			},
			{
				title: "Hobbies",
				body: "Computer games, building things, adventures"
			},
			{
				title: "Favorite Book",
				body: "LOTR Series, HP"
			}
		]
	},
	{
		uid: "1482102339901",
		lastUpdate: "1482102339901",
		username: "chris@gmail.com",
		password: "",
		fname: "Christopher",
		lname: "Hampel",
		phoneNo: [
			12624422501
		],
		email: [
			"chris@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/chris.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "24 years old"
			},
			{
				title: "From",
				body: "Wauwatosa, WI"
			},
			{
				title: "Program",
				body: "Marketing"
			},
			{
				title: "Hobbies",
				body: "Running, computer games"
			},
			{
				title: "Favorite Book",
				body: "The Hitchhiker's Guide to the Galaxy"
			}
		]
	},
	{
		uid: "1482102444285",
		lastUpdate: "1482102444285",
		username: "joshua@gmail.com",
		password: "",
		fname: "Joshua",
		lname: "Strait",
		phoneNo: [
			14144160443
		],
		email: [
			"joshua@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/josh.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "19 years old"
			},
			{
				title: "From",
				body: "Franklin, WI"
			},
			{
				title: "Program",
				body: "Web and Software Development"
			},
			{
				title: "Hobbies",
				body: "Making models, solving mental puzzles"
			},
			{
				title: "Favorite Book",
				body: "War of the Worlds By H.G. Wells"
			}
		]
	},
	{
		uid: "1482102570872",
		lastUpdate: "1482102570872",
		username: "jessica@gmail.com",
		password: "",
		fname: "Jessica",
		lname: "Currey",
		phoneNo: [
			2623647001
		],
		email: [
			"jessica@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/jess.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "28 years old"
			},
			{
				title: "From",
				body: "Sussex, WI"
			},
			{
				title: "Program",
				body: "IT Network"
			},
			{
				title: "Hobbies",
				body: "TV shows, GW2, cooking, sun tan, beach, research, new things"
			},
			{
				title: "Favorite Book",
				body: "Harry Potter"
			}
		]
	},
	{
		uid: "1482102704374",
		lastUpdate: "1482102704374",
		username: "john@gmail.com",
		password: "",
		fname: "John",
		lname: "Selas",
		phoneNo: [
			14147042606
		],
		email: [
			"john@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/john.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "24 years old"
			},
			{
				title: "From",
				body: "Brookfield, WI"
			},
			{
				title: "Program",
				body: "Web and Software Development"
			},
			{
				title: "Hobbies",
				body: "Gaming, comics, soccer/football, cars"
			},
			{
				title: "Favorite Book",
				body: "Hitchhiker's Guide to the Galaxy"
			}
		]
	},
	{
		uid: "1482102828139",
		lastUpdate: "1482102828139",
		username: "matt@gmail.com",
		password: "",
		fname: "Matt",
		lname: "Green",
		phoneNo: [
			4147329820
		],
		email: [
			"matt@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/matt.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "Old enough to have two daughters in HS"
			},
			{
				title: "From",
				body: "Wauwatosa, WI"
			},
			{
				title: "Program",
				body: "BIT"
			},
			{
				title: "Hobbies",
				body: "Cooking (Grilling, Baking, Brewing)"
			},
			{
				title: "Favorite Book",
				body: "Amusing Ourselves to Death: Public Discourse in the Age of Show Business by Neil Postman"
			}
		]
	},
	{
		uid: "1482102985259",
		lastUpdate: "1482102985259",
		username: "kathleen@gmail.com",
		password: "",
		fname: "Kathleen",
		lname: "Brown",
		phoneNo: [
			12623649435
		],
		email: [
			"kathleen@gmail.com"
		],
		pictureUrl: "img/ProfilePictures/kathy.png",
		school: "WCTC",
		funFacts: [
			{
				title: "Age",
				body: "Too young to be old"
			},
			{
				title: "From",
				body: "Franksville, WI"
			},
			{
				title: "Program",
				body: "BIT"
			},
			{
				title: "Hobbies",
				body: "Golfing, working out"
			},
			{
				title: "Favorite Book",
				body: "Memoirs of a Geisha"
			}
		]
	},
];

var router = express.Router();

app.get('/api/gettrip', function (req, res) {
	res.json(groupList)
})

app.get('/api/gettravellers', function (req, res) {
	res.send(userList)
})

var port = process.env.PORT || 8080;
app.listen(port);
