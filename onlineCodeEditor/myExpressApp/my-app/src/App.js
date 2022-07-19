import { React,useState,useEffect } from 'react';
import appStyles from './App.css';
//import Editor from "@monaco-editor/react";
import Navbar from './components/Navbar';
import Axios from 'axios';
import spinner from './spinner.svg';
import { Allotment } from "allotment";
import FileViewer from './components/FileViewer/FileViewer';
import testData from './components/FileViewer/testData.json';

import Prism from 'prismjs';



//import { LayoutPriority } from "../src/split-view";////
//import { ActivityBar } from "./components/activity-bar";
import VisualStudioCode from './components/advanced.stories';
//import { AuxiliaryBar } from "./components/auxiliary-bar";
//import { Editor } from "./components/editor";
//import { Panel } from "./components/panel";
//import { Sidebar } from "./components/sidebar";

import RestApi from './api/RestApi';
import Counter from './components/Counter';
import { components } from 'react-select';
export function Code({ code, language }) {
	useEffect(() => {
	  Prism.highlightAll();
	}, []);
	return (
	  <div className="Code">
		<h2> Code Syntax Block {language}</h2>
		<pre>
		  <code className={`language-${language}`}>{code}</code>
		</pre>
	  </div>
	);
  }
function App() {

	const JSCode = `import Space from '@components/Space';
	import Sidebar from './Sidebar';
	import FileContent from './FileContent';
	import { getFile } from './FileViewer.helpers';
	const FileViewer = ({ initialFiles }) => {
	  const [files, setFiles] = React.useState(
		initialFiles
	  );
	  const activeFile = getFile(
		files,
		(file) => !!file.isSelected
	  );
	  return (
		<Wrapper>
		  <Sidebar
			files={files}
			setFiles={setFiles}
		  />
		  <FlexedFileContent
			contents={activeFile.contents}
		  />
		</Wrapper>
	  );
	};
	
	const FlexedFileContent = styled(FileContent)
	  flex: 1;
	;
	export default FileViewer;
	  `;
	  
	  const htmlCode = `
		  <div>
			<h1> PrismJS Tutorial </h1>
			<p>
			Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind.
			</p>
		  </div>
	  `;
	

	// State variable to set users source code
	const [userCode, setUserCode] = useState(``);

	// State variable to set editors default language
	const [userLang, setUserLang] = useState("python");

	// State variable to set editors default theme
	const [userTheme, setUserTheme] = useState("vs-dark");

	// State variable to set editors default font size
	const [fontSize, setFontSize] = useState(20);

	// State variable to set users input
	const [userInput, setUserInput] = useState("");

	// State variable to set users output
	const [userOutput, setUserOutput] = useState("");

	// Loading state variable to show spinner
	// while fetching data
	const [loading, setLoading] = useState(false);
	const [name,setName] = useState('Yuktha');
	const options = {
		fontSize: fontSize
	}

	const onResponse = (response) =>{
		if(response && response.status === 200){
			return response.json();
		}else {
			throw new Error(`${response.status}${response.statusText}`)
		}
	}
    const onJsonConverted = (result)=> {
		console.log("JSON Converted,",result);
		return result;
	}
	// Function to call the compile endpoint
	function compile() {
		console.log("Started compiling code...")
		setLoading(true);

        RestApi.createRestApi("helloworld",
		  "GET",
		  "/helloworld/:userName",
		  "`/helloworld/${params[0]}`",
		  1);

		  RestApi.createRestApi("compile",
		  "POST",
		  "/compile",
		  "`/compile`",
		  1);

		  console.log("invoking restapi...");

		  /*RestApi.invoke("helloworld","venkatparsi")
		  .then((result) => {
			console.log("Got rest api Result",
			JSON.parse(result.body));
		  });*/

		  let payload= {
		  code: userCode,
		  language: userLang,
		  input: userInput
	  };

		  RestApi.invoke("compile",payload)
		  .then(onResponse)
		  .then(onJsonConverted)
		  .catch((err)=>{
			alert("Failed to retrieve data.")
		  });

		/*if (userCode === ``) {
			console.log("Usercode is null-- returning.")
			return
		}*/
		console.log("Posting to server:");

		// Post request to compile endpoint
		/*Axios.post(`http://localhost:3000/compile`, {
			code: userCode,
			language: userLang,
			input: userInput
		}).then((res) => {
			setUserOutput(res.data);
			console.log(res.data);
		}).then(() => {
			setLoading(false);
			//window.location.reload();
		})*/

		//window.location.reload();
	}

	// Function to clear the output screen
	function clearOutput() {
		setUserOutput("");
	}
	
	return (
		<div className="App" >
			<div>
				<button className="run-btn" onClick={() => compile()}>
					Run
				</button>
			</div>
			
			<div style={{paddingTop:'10px'}}>
				<div style={{background:'white', width:'90vw',marginLeft:'40px'}}>
				
				
				<VisualStudioCode ></VisualStudioCode>
				</div>				
				
			</div>
		</div>
	);
}

export default App;
