import React from 'react'
import Icon from './Icon.component'

export const  IconInCircle = ({ iconName,
    circleSize, 
    borderWidth = 2, 
    borderColor = 'black', 
    isCircle = true,
    backgroundColor = 'green',
    count='0',
    ...props}) => {
      console.log("ICON IN CIRCLe",props);
      if(!isCircle){
        return <Icon iconName={iconName} {...props} />
      }                         
        return (                           
          <CircleBorder
          size={circleSize}
          borderWidth={borderWidth}
          borderColor={borderColor}
          backgroundColor={backgroundColor}
        > 
        <Icon iconName={iconName} {...props} />                                                    
        </CircleBorder>                           
      )
    } 

const CircleBorder = ({ size, borderWidth, borderColor, backgroundColor='lightgray', children }) => (
      <span
      style={{
        width: size,
        height: size,
        borderRadius: 0.5 * size,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor:borderColor,
      borderStyle:"solid",
      borderWidth,     
      backgroundColor:backgroundColor,
      }}>
      {children}
      </span>
);