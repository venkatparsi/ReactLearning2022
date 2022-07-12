import classNames from "classnames";
import { useState } from 'react';

import MonacoEditor from "@monaco-editor/react";
import styles from "./editor-group-container.module.css";

export const EditorGroupContainer = ({
  document,
  onClose,
  onSplitEditor,
}) => {
  // State variable to set users source code
  const [userCode, setUserCode] = useState(``);
 
  // State variable to set editors default language
  const [userLang, setUserLang] = useState("java");
 
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
  return (
    <div className={styles.editorGroupContainer}>
      <div className={styles.title}>
        <div className={styles.tabList}>
          <div
            className={classNames(
              styles.iconLabel,
              document.icon === "ts"
                ? styles.typescriptReactFileIcon
                : styles.cssLangFileIcon
            )}
          >
            <div className={styles.iconLabelContainer}>
              <a className={styles.labelName}>{document.title}</a>
            </div>
          </div>
          <div className={styles.tabActions}>
            <a
              className={classNames(
                "codicon codicon-close",
                styles.actionLabel
              )}
              role="button"
              title="Close (⌘W)"
              onClick={onClose}
            />
            <a
              className={classNames(
                "codicon codicon-split-horizontal",
                styles.actionLabel
              )}
              role="button"
              title="Split Editor Right (⌘\)
[⌥] Split Editor Down"
              onClick={onSplitEditor}
            />
          </div>
        </div>
        <div className={styles.editorActions}></div>
      </div>
      <div className={styles.editorContainer}>

      <MonacoEditor
              options={options}
              height="calc(100vh - 50px)"
              width="100%"
              theme={userTheme}
              language={userLang}
              defaultLanguage="python"
              defaultValue="# Enter your code here"
              onChange={(value) => { setUserCode(value) }}
            />
      </div>
    </div>
  );
};
