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

## Step 2: Webpack environment setup  

We'll now install Babel dependencies into our project.  
Babel is mainly used for 2 purposes here:  
1. For transpiling ES6 to ES5 (as some browsers don't support ES6 syntax yet).  
2. For transpiling JSX to React.  

Q. What is **Transpilation**?  
A. Transpilation is similar to compilation, but instead of converting a high-language to a machine-language (which is done in case of compilation), **transpilation converts source code written in one high-level language to another high-level language**.  


So let's install the required dependencies:  
	
	npm install --save-dev babel-cli babel-core babel-preset-es2015 babel-preset-react

Here we have used --save-dev in place of --save. This is done because we only need the babel for the development purposes. After the transpilation we'll have the ES5 and React code that will be used for production purpose.  

Let's discuss what each of them does, one-by-one:  
1. **babel-cli**: Used for providing a command-line interface for Babel.  
2. **babel-core**: Provides the core functionality of Babel.  
3. **babel-preset-es2015** and **babel-preset-react**:  

Babel does the transpilation with the help of presets. These presets act just like plugins, providing the necessary external support for transpilation.  
i)  **babel-preset-es2015**: Used for transpiling ES6 to ES5 (2015 is another name for ES6).  
ii) **babel-preset-react** : Used for transpiling JSX code to React (will be discussed later).  

Now, we'll use what is known as webpack and babel-loader:  

	npm install --save-dev webpack babel-loader  

Q. What is webpack?  
A. The simplest and complete answer to this is: **Webpack is a module bundler**.  

If you want to dive into what is webpack. You can go in **[here](https://web-design-weekly.com/2014/09/24/diving-webpack/)**  

Q. What is babel-loader?  
A. babel-loader is another npm-package that let us call babel from within the webpack. This way, we don't need to call babel again and again. We'll only call webpack, and it will first transpile the code with babel and then bundle all the modules (it's own functionality).  


Now, let's setup a config file for **webpack**. For that:  
Create a new file in your root-directory **webpack.config.js** with the contents:  

	var webpack = require('webpack');
	var path = require('path');

	//specifying the path for BUILD_DIR. Where the bundled file output of bundle.js will go.
	var BUILD_DIR = path.resolve(__dirname, 'static/'); 
	
	//specifying the path for APP_DIR. Where all our source code will be.
	var APP_DIR = path.resolve(__dirname, 'src/');  
	
	/*
		path.resolve is used to append the second argument onto the first one with a forward slash (/).
		For more, refer to: https://stackoverflow.com/a/35048865/5733330
	*/

	var config = {

		//specifying the entry point for webpack
	    entry : APP_DIR + '/app.jsx',

	    output: {
	    //specifying the path and filename where the output of webpack will get written.
	
	        path: BUILD_DIR,
	        filename: 'bundle.js'
	    },
	    
	    module : {
		//already discussed earlier. Used for calling the babel functionality from within the webpack.	
	        loaders : [
	            {
	                test : /\.jsx?/,
	                include : APP_DIR,
	                loader : "babel-loader",
	                query: {
	                	//specifiying the presets that we need to use
	                    presets: ['react', 'es2015'] 
	                }
	            }
	        ]
	    },

	    resolve: {
	        // you can now import('file) or require('file') instead of import or require('file.js or file.jsx')
	        extensions: ['.js', '.jsx']
	    }


	};

	module.exports = config;  

The environment setup is almost done. What is left now is to create a new folder **static** in your root-directory, where the bundled output of the webpack (bundle.js) will be placed after we run the webpack.  

Now, create a new file in the **static** folder **index.html**, where we can include the bundle.js to see what it does.  

**index.html** 

	<!DOCTYPE html>
	<html>
	<head>
		<title>Basic React App</title>
	</head>
	<body>
	<div id="app"></div>
	</body>
	</html>  

The environment setup is all done now. The steps discussed till now needs to be done each time to create a new react app. So, instead of doing all this again and again, just keep a copy of all this in a seaprate folder so that you can copy and paste all the things before you start your next react app.  

You can now check if your webpack is running fine or not by typing the following command in your terminal (opened at the root directory of the project):  

	./node_modules/.bin/webpack

If it shows something like this (don't mind the error):  
	
	Hash: 3aea6d8a27453c0be041
	Version: webpack 3.0.0
	Time: 31ms

Then your webpack is up and running. If not, then you have to do the above steps again.  

## Step 3: Creating your first React Component

1. Create a new folder **src** in the root-directory. (our BUILD_DIR is **src/**).  
2. Create a new file (in src) with the name **app.jsx** as we have mentioned the same in the **entry** field in **webpack.config.js**  
3. Now we have to install 2 more dependencies: react and react-dom  

Install the dependencies by writing the following command in your terminal:

	npm install --save react react-dom
 
4. Now, type the following code in your **app.jsx** file.

**app.jsx**

	import React from 'react';
	import ReactDOM from 'react-dom';
	
	class App extends React.Component{
		render(){
			return (<div>Hello World</div>);
		}
	}

	var element = <App />;
	var node = document.getElementById('app');

	ReactDOM.render(element, node); 

5. Finally, include bundle.js in your index.html (just above the closing <body> tag)  

Now, run the webpack command:  
	
	./node_modules/.bin/webpack

We run our command like this because we have only installed webpack locally in our project.  
For installing it globally, run:  

For Windows users  
		
	npm install --global webpack

For Linux users...  

	sudo npm install --global webpack


Now, the command:  

	webpack

will do the work as expected.  

Now, the only thing left is to start your server:

	node server

You can now see your first React-App (**showing Hello World**) by opening **localhost:3000** in your web-browser.

##### TA-DAA! You have just made your first React App!!


If you need an e-book for reference, then do refer [this](https://www.fullstackreact.com/assets/media/sGEMe/MNzue/30-days-of-react-ebook-fullstackio.pdf)  
For the documentation part, [click here](https://facebook.github.io/react/docs/hello-world.html)


**Please Note**: There is another way for setting up your environment for React using the create-react-app command. But this command adds a whole lot of code which I don't consider as necessary. Anyhow, if you want to try that way, then [click here](https://facebook.github.io/react/docs/installation.html) to see how. The answer to how is mentioned in the **Create a New App** tab.  

A little-bit more about create-react-app. [Click here](https://medium.com/@diamondgfx/learning-react-with-create-react-app-part-1-a12e1833fdc){:target="_blank"}




