import React from 'react'
import './left-gap-right-layout.css'
const LeftGapRightLayout = (props) => {
    if(props.padding === undefined) props = {padding:"0.1rem",...props};
   // console.log("LEFT-GAP_REIGHT_LAYOUT:",props.padding," props:",props);
    return (
        <div className="left-gap-right-layout" 
             style={{padding:props.padding}}>
            {props.children}
        </div>
    )
}

export default LeftGapRightLayout;
