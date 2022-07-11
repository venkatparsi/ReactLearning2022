import { useState } from 'react';
import appStyles from './App.css';
//import Editor from "@monaco-editor/react";
import Navbar from './components/Navbar';
import Axios from 'axios';
import spinner from './spinner.svg';
import { Allotment } from "allotment";




//import { LayoutPriority } from "../src/split-view";////
//import styles from "./advanced.stories.module.css";
import { ActivityBar } from "./components/activity-bar";
import VisualStudioCode from './components/advanced.stories';
//import { AuxiliaryBar } from "./components/auxiliary-bar";
//import { Editor } from "./components/editor";
//import { Panel } from "./components/panel";
//import { Sidebar } from "./components/sidebar";


function App() {

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

	const options = {
		fontSize: fontSize
	}

	// Function to call the compile endpoint
	function compile() {
		setLoading(true);
		if (userCode === ``) {
			return
		}

		// Post request to compile endpoint
		Axios.post(`http://localhost:3000/compile`, {
			code: userCode,
			language: userLang,
			input: userInput
		}).then((res) => {
			setUserOutput(res.data.output);
		}).then(() => {
			setLoading(false);
			window.location.reload();
		})

		window.location.reload();
	}

	// Function to clear the output screen
	function clearOutput() {
		setUserOutput("");
	}

	return (
		<div className="App" >
			
					<VisualStudioCode></VisualStudioCode>
				
		</div>
	);
}

export default App;
