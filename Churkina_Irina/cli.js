#!/usr/bin/env node

const fs = require('fs');
var path = require("path");

const [,, ...args] = process.argv;

// first - executable path, srcond - path to file being executed
// args[0] is supposed to be name

if(!args[0]){
	throw "Put future component's name right after 'create-component command'";
}

let componentName = args[0].toLowerCase() + '';
componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

const componentsDir = './components';

const componentBody = 
`import React, {Component} from 'react';

export default class ${componentName} extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>${componentName} component works!</div>
		)
	}

}

export default ${componentName};
`;

if (!fs.existsSync(componentsDir)){
    fs.mkdirSync(componentsDir);
}

if (!fs.existsSync(`${componentsDir}/${componentName}`)){
    fs.mkdirSync(`${componentsDir}/${componentName}`);
}

fs.writeFile(`${path.resolve(__dirname)}/Components/${componentName}/${componentName}.jsx`, componentBody, function (err) {
  if (err) throw err;
  console.log(`Component ${componentName} has been saved!`);
});

fs.writeFile(`${path.resolve(__dirname)}/Components/${componentName}/index.js`, `export default from './${componentName}.jsx';`, function (err) {
	if (err) throw err;
	console.log(`Index file for Component ${componentName} has been saved!`);
});

fs.writeFile(`${path.resolve(__dirname)}/Components/${componentName}/${componentName}.css`, `/* put your styles here */`, function (err) {
	if (err) throw err;
	console.log(`Styles file for Component ${componentName} has been saved!`);
});