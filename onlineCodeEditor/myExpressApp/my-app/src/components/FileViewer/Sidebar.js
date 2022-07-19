import React, {useContext} from 'react';
import styled from 'styled-components';
import produce from 'immer';
import Directory from './Directory';
import File from './File';
import { openFile } from './FileViewer.helpers';
import { FileContext } from './FileViewer';

function generateChildren(allFiles,items, props, slugPrefix = '') {
  //console.log(allFiles,items,props,slugPrefix)
  return items.map((item) => {
    const slug = `${slugPrefix}/${item.name}`;
    if (item.type === 'directory') {
      return (
        <Directory
          allfiles={allFiles}
          key={slug}
          slug={slug}
          name={item.name}
          isExpanded={item.isExpanded}
          onClick={props.handleToggleDirectory}
        >
          {generateChildren(allFiles,
            item.contents,
            { ...props, isExpanded: item.isExpanded },
            slug
          )}
        </Directory>
      );
    } else {
      return (
        <File
          key={slug}
          file={item}
          slug={slug}
          openEditors={props.openEditors}
          onOpenEditorsChange={props.onOpenEditorsChange}
          onClick={props.handleSelectFile}
          isExpanded={props.isExpanded}
        />
      );
    }
  });
}
const FileSidebar = ({ files, setFiles,onOpenEditorsChange,openEditors }) => {
  const allFiles = useContext(FileContext);
  console.log("All Files:::::",allFiles)
  function handleToggleDirectory(directorySlug) {
    const paths = directorySlug.slice(1).split('/');

   var updatedState = JSON.parse(JSON.stringify(files));
   let reference = { contents: updatedState }; 
   //console.log("directorySlug,files",directorySlug,files); 
   while (paths.length) {
     let currentPath = paths.shift();

     if (currentPath) {
      // console.log("Current referencedir",reference)
       reference = reference.contents.find((item) => {
         return item.name === currentPath;
       });
     }
   }
   reference.isExpanded = !reference.isExpanded;
   setFiles(updatedState);    
  }

  function handleSelectFile(fileSlug) {
    setFiles((f) => {
      console.log("FileSlug:",fileSlug,f);
      let output = produce(f, (draftFiles) => {
        openFile(draftFiles, fileSlug);
      });
      console.log("Output:",output)
      return output;
    });
  }
  const children = generateChildren(allFiles,files, {
    handleToggleDirectory,
    handleSelectFile,
    onOpenEditorsChange,
    openEditors
  });
  return <Wrapper>{children}</Wrapper>;
};
const Wrapper = styled.div`
  --row-height: 1.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: auto;
  padding: 0 16px 0 12px;
  margin-top: -0.25rem;
`;
export default FileSidebar;