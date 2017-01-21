//let promiseToCleanTheRoom = new Promise(function(resolve, reject){
//
//	// Cleaning the room
//	
//	let isClean = true;
//
//	if (isClean) {
//		resolve('clean');
//	} else {
//		reject('not clean');
//	}
//});

//promiseToCleanTheRoom.then(function (fromResolve) {
//	console.log('the room is ' + fromResolve);
//}).catch(function (fromReject) {
//	console.log(fromReject);
//});


// Sequential promises
let cleanRoom = function() {
	return new Promise (function(resolve, reject) {
		resolve('Cleaned the room');
	});
};

let removeGarbage = function (p) {
	return new Promise (function(resolve, reject) {
		resolve(p + 'Remove garbage');
	});
};

let winIceCream = function (p) {
	return new Promise (function(resolve, reject) {
		resolve(p + 'Won icecream');
	});
};

//cleanRoom().then(function (result) {
//	console.log(result);
//	return removeGarbage(result);
//}).then(function (result) {
//	console.log(result);
//	return winIceCream(result);
//}).then(function (result) {
//	console.log(result);
//	console.log('finished');
//});


// Parallel promises
//Promise.all([cleanRoom(), removeGarbage(), winIceCream()]).then(function () {
//	console.log('all finished');
//});

// Race promise - callback is called as soon as one of the promises finishes (aka a race)
Promise.race([cleanRoom(), removeGarbage(), winIceCream()]).then(function () {
	console.log('one of the promises finished');
});
