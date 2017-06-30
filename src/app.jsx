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