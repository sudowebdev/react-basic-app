# React 1.0: Basic React App

## Step 1: Initialise your App

	npm init
	npm install --save express
 
After installing the dependencies, create a new file **server.js** in your root directory.

**server.js**

	const express = require("express");
	const app = express();

	app.listen(3000, function() {
	    console.log("Listening on port 3000")
	});

