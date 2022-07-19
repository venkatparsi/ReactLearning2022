import React, { useEffect, createContext, Children } from 'react';
import styled from 'styled-components';
import FileSidebar from './Sidebar';
import FileContent from './FileContent';
import { getFile } from './FileViewer.helpers';
import './FileViewer.css'
export const FileContext = createContext();
const FileViewer = ({ initialFiles }) => {
  const [files, setFiles] = React.useState(initialFiles);
  const activeFile = getFile(
    files,
    (file) => !!file.isSelected
  );
  //console.log("files:",files)

  useEffect(() => {
    console.log("Changed files....");
  }, [files]);
  return (

    <Wrapper className='fileViewer'>
      <FileContext.Provider value={files}>
        <FileSidebar
          files={files}
          setFiles={setFiles}
        />
        <FlexedFileContent
          contents={activeFile.contents}
        />
      </FileContext.Provider>
    </Wrapper>
  );
};

const fileWrapper= ({className},props)=> {
  <div className={className}>
    {props.Children}
  </div>

}

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  padding-left: 4px;
  margin: 0 -32px;
  border: 1px solid var(--color-gray-100);
`;


const FlexedFileContent = styled(FileContent)`
  flex: 1;
`
export default FileViewer;