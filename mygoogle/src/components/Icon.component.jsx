import React from 'react'
import * as FontAwesome from "react-icons/fa";
import {IconContext} from "react-icons";

export const Icon = iconProps => {
   
    var props = {...iconProps};
   // console.log("ICON_COMP",props,iconProps);
   if(props.position === undefined) props.position = 'relative';
   if(props.display === undefined) props.display = 'inline-block';
   if(props.top === undefined) props.top = 0;
   if(props.left === undefined) props.left = 0;
    if(props.size === undefined) props.size = 20; 
    if(props.iconName === undefined) props.iconName = 'FaUsb'
    if(props.color === undefined) props.color = 'black'
    if(props.width === undefined) props.width = props.size+13;
    if(props.height === undefined) props.height = props.size +13 ;
    var icon = React.createElement(FontAwesome[props.iconName]);
    
    return (
    <div className='fa-icon' style={{   
                  position: props.position,    
                  top: props.top, 
                  left:props.left,                 
                  display: props.display,
                  fontSize: props.size+'px', 
                  color: props.color ,                   
                  borderRadius: props.showCircle ? props.width * .5 : 0,
                  borderWidth: '1px',
                  borderStyle: props.showBorder? 'solid': 'none',
                  borderColor: props.borderColor,
                  backgroundColor: props.backgroundColor,   
                  width      : props.width+'px', 
                  height : props.height+'px'
                 }}> 
          <IconContext.Provider value={{ color: props.color ,
          
           }} >
                  {icon}  
          </IconContext.Provider>     
    </div>);
  };
  
export default Icon;
