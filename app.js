//require Node modules

var https = require('https');
var querystring = require('querystring');
var express = require('express');
var bodyparser = require('body-parser');




app.use(bodyparser.urlencoded({extended: false}))





app.post('/formdata', function(req, next) {

	var postData = querystring.stringify({
    'email': req.body.email,
    'firstname': req.body.firstname,
    'lastname': req.body.lastname,
    'hs_context': JSON.stringify({
        "hutk": req.cookies.hubspotutk,
        "ipAddress": req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        "pageUrl": "http://www.example.com/form-page",
        "pageName": "Example Title"
    })
});

// set the post options, changing out the HUB ID and FORM GUID variables.

var options = {
	hostname: 'forms.hubspot.com',
	path: '/uploads/form/v2/2548142/40077838-f9ba-4e1f-913f-ad1bf73d0005',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
	}
}

// set up the request

var request = https.request(options, function(response){
	console.log("Status: " + response.statusCode);
	console.log("Headers: " + JSON.stringify(response.headers));
	response.setEncoding('utf8');
	response.on('data', function(chunk){
		console.log('Body: ' + chunk)
	});
});

request.on('error', function(e){
	console.log("Problem with request " + e.message)
});

// post the data

request.write(postData);
request.end();

 });


app.listen(3000, ()=> console.log('listening on port 3000'))
