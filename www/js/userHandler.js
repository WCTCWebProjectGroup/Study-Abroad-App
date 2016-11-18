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
			"KLM23"
		]
};

var groupList = [
	{
		guid: "ASDF789ASD0F8ASDF8A",
		hashkey: "68ASD4F3AS1DFA68DF4",
		name: "Placeholder Group A",
		desc: "This is a tmp group. And this is its description.",
		owners: [
			"ABC124"
		],
		members: [
			"ABC123",
			"ABC125"
		],
		school: "WCTC"
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

function getUserByUID(uid)
{
	for (var entry in userList)
	{
		if (userList[entry].uid == uid)
			return userList[entry];
	}
}

function group(jsonObj)
{
	this.el = document.createElement("div");
	this.el.setAttribute("class", "group");
	var members = document.createElement("div");
	members.innerHTML = "Members: ";
	document.getElementById("groups").appendChild(this.el);
	this.el.appendChild(members);
	for (var prop in jsonObj)
	{
		switch (prop)
		{
			case "name":
				this.el_name = document.createElement("div");
				this.el_name.innerHTML = prop + ": " + jsonObj[prop];
				this.el.appendChild(this.el_name);
				break;
			case "members":
				console.log(jsonObj[prop]);
				
				for (var memId in jsonObj[prop])
				{
					console.log(getUserByUID(jsonObj[prop][memId]));
					var us = new user(getUserByUID(jsonObj[prop][memId]));
				}
				break;
			default:
				break;
		}
	}
}

function user(jsonObj)
{
	this.el = document.createElement("div");
	this.el.setAttribute("class", "user");
	for (var prop in jsonObj)
	{
		switch (prop)
		{
			case "fname":
				this.el_fname = document.createElement("div");
				this.el_fname.innerHTML = prop + ": " + jsonObj[prop];
				this.el.appendChild(this.el_fname);
				break;
			case "lname":
				this.el_lname = document.createElement("div");
				this.el_lname.innerHTML = prop + ": " + jsonObj[prop];
				this.el.appendChild(this.el_lname);
				break;
			case "pictureUrl":
				this.el_picture = document.createElement("img");
				this.el_picture.innerHTML = prop + ": " + jsonObj[prop];
				this.el_picture.setAttribute("src", jsonObj[prop]);
				this.el.appendChild(this.el_picture);
				break;
			case "phoneNo":
				this.el_phoneNo = document.createElement("div");
				var list = document.createElement("ul");
				for (var no in jsonObj[prop])
				{
					var entry = document.createElement("li");
					entry.innerHTML = prop + ": " + jsonObj[prop][no];
					list.appendChild(entry);
				}
				this.el_phoneNo.appendChild(list);
				this.el.appendChild(this.el_phoneNo);
				break;
			case "username":
				this.el_username = document.createElement("div");
				this.el_username.innerHTML = prop + ": " + jsonObj[prop];
// 				this.el_username.setAttribute("src", jsonObj[prop]);
				this.el.appendChild(this.el_username);
				break;
			default:
				break;
		}
	}
	document.querySelector(".group:last-child").appendChild(this.el);
}
//var userdocument;
// var userdocument = "user";
// userdocument.info = user;

// userdocument.user_title_el = document.createElement("div");
// userdocument.user_title_el.innerHTML = userdocument.info.fname + " " + userdocument.info.lname;
//document.getElementById("userInfo").appendChild(userdocument.user_title_el);

//document.getElementById("userInfo");
for (var i in groupList)
	var n_group = new group(groupList[i]);
