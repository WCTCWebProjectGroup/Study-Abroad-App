/*
 * This file emulates loading json.
 * 
 */

// parsedGroupFile should contain the uid of the user, and an array containing objects
// containing the id of each group they're in and the hashkey of the last update the client
// recieved. Also this file should only be created once the user has logged in, is a hidden file,
// and can exist for multiple users
var parsedGroupFile = {
    uid:"ABC125", // The user requesting the update
    groups: [
        {
            uid: "EFG123", // The uid of the group
            hashkey: "68ASD4F3AS1DFA68DF4" // The hashkey of the group, this could also just be a timestamp. hashing is a little overkill 
        },
        {
            uid: "HIJ123",
			haskey: "68ASD4F3AS1DFA68DF4"
        },
		{
            uid: "KLM123",
			haskey: "68ASD4F3AS1DFA68DF4"
        }
    ]
};

// This is a representation of the SQL database containing the accepted values.
// parsedGroupFile's values should be tested against these values. 
var serverSideGroupFile = [
	{
		uid: "EFG123",
		hashkey: "68ASD4F3AS1DFA68DF4"
	},
	{
		uid: "HIJ123",
		hashkey: "68ASD4F3AS1DFA68DF4"
	},
	{
		uid: "KLM123",
		hashkey: "68ASD4F3AS1DFA68DF4"
	}
]

var cUser = {
	uid: "ABC125",
		hashkey: "123ABC",
		username: "Joe@gmail.com",
		fname: "Joe",
		lname: "Doe",
		phoneNo: [
			2624421666,
			2526508372
		], 
		pictureUrl: "",
		school: "WCTC",
		groups: [
			"EFG123",
			"HIJ123",
			"KLM123"
		]
};

var groupList = [
	{
		guid: "ASDF789ASD0F8ASDF8A",
		hashkey: "68ASD4F3AS1DFA68DF4",
		name: "WCTC Travel Group",
		desc: "This is a tmp group. And this is its description.",
		owners: [
			"ABC124"
		],
		members: [
			"ABC123",
			"ABC125"
		],
		school: "WCTC"
	},
	{
		guid: "ASDF789ASD0F8ASDF8A",
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
		school: "Madison"
	},
	{
		guid: "ASDF789ASD0F8ASDF8A",
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
		uid: "ABC123",
		hashkey: "123ABC",
		username: "alex.c.hayes08@gmail.com",
		fname: "Alex",
		lname: "Hayes",
		phoneNo: [
			2624421666,
			2526508372,
			1234567890
		],
		pictureUrl: "",
		school: "WCTC",
		groups: [
			"EFG123",
			"HIJ123",
			"KLM23"
		]
	},
	{
		uid: "ABC124",
		hashkey: "123ABC",
		username: "bob@gmail.com",
		fname: "Bob",
		lname: "Doe",
		phoneNo: [
			2624421666,
			2526508372
		],
		pictureUrl: "",
		school: "WCTC",
		groups: [
			"EFG123",
			"HIJ123",
			"KLM23"
		]
	},
	{
		uid: "ABC125",
		hashkey: "123ABC",
		username: "tim@gmail.com",
		fname: "Tim",
		lname: "Doe",
		phoneNo: [
			2624421666,
			2526508372
		],
		pictureUrl: "",
		school: "WCTC",
		groups: [
			"EFG123",
			"HIJ123",
			"KLM23"
		]
	}
];