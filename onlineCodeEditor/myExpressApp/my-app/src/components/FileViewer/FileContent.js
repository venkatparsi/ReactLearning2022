import React, { useEffect } from 'react';
import styled from 'styled-components';
import Paper from "@material-ui/core/Paper";
import Prism from "prismjs";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
//import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css'; //Example style, you can use another

const FileContent = ({ contents, ...delegated }) => {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  useEffect(()=>{
    setCode(contents);
  },[contents])
  return (
    <Wrapper {...delegated}>
     <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
    </Wrapper>
  );
};
const Wrapper = styled(Paper)`
  background: white;
  border-radius: 4px;
  padding: 16px;
  overflow: auto;
  min-height: 420px;
`;
const CodeWrapper = styled.div`
  font-size: 0.875rem;
  color: black;
`;

export default FileContent;