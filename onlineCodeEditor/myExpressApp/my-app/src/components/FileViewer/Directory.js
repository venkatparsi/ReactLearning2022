import React from 'react';
import styled from 'styled-components';
import { ChevronRight,Folder } from 'react-feather';
import { motion } from 'framer-motion';
import Expander from './Expander';
function Directory({ allfiles,name, slug, isExpanded, onClick, children }) {
  //console.log("Directory .",slug,isExpanded)
  return (
    <Wrapper>
      <Header onClick={() => onClick(slug,allfiles)}>
        <Expander />
        <IconWrapper animate={{ rotate: isExpanded ? 90 : 0 }}>
          <ChevronRight size={14} />
        </IconWrapper>
        <IconWrapper>
          <Folder size={14}/>
        </IconWrapper>
        {name}
      </Header>
      <Files
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
          overflow: isExpanded ? undefined : 'hidden',
        }}
        style={{}}
      >
        {children}
      </Files>
    </Wrapper>
  );
}
const Wrapper = styled.div``;
const Header = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  height: var(--row-height);
  background:transparent;
  cursor:pointer;
  color: inherit;
`;
const Files = styled(motion.div)`
  padding-left: calc(16px + 4px);
  height: 0px;
`;
const IconWrapper = styled(motion.div)`
  svg {
    display: block;
  }
`;
export default Directory;