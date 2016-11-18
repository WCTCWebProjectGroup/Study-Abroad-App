//var user[];
var user = {
	uid: "ABC123",
	hashkey: "123ABC",
	username: "alex.c.hayes08@gmail.com",
	fname: "Alex",
	lname: "Hayes",
	phoneNo: [
		2624421666,
		2526508372
	],
	pictureUrl: "http://img3.wikia.nocookie.net/__cb20130513005553/glee/images/5/5f/Bloo.jpg",
	school: "WCTC",
	groups: [
		"EFG123",
		"HIJ123",
		"KLM23"
	]
};

//var userdocument;
var userdocument = "user";
userdocument.info = user;

userdocument.user_title_el = document.createElement("div");
userdocument.user_title_el.innerHTML = userdocument.info.fname + " " + userdocument.info.lname;
document.getElementById("userInfo").appendChild(userdocument.user_title_el);

document.getElementById("userInfo");
