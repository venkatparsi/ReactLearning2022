import React from 'react'
import Icon from '../Icon.component';
import './actionlinlk.style.css';

const ActionLink = (actionProps) => { 
   // console.log("ACTION_LINK:",actionProps) ;
    return ( 
        <span>
                <a className="action-link" onClick={(e)=>actionProps.onClick(e)}>
                    <Icon iconName = {actionProps.iconName}
                      color = {actionProps.color}
                      size = {actionProps.size}
                      borderColor = {actionProps.borderColor}
                      width = {actionProps.width}
                      height = {actionProps.height}
                      showCircle = {actionProps.showCircle}
                      showBorder = {actionProps.showBorder}
                      backgroundColor = {actionProps.backgroundColor}                             
                      marginBottom= {actionProps.marginBottom}
                     />
                    <span style={{margin:"1px"}}>{actionProps.count}</span>
                </a>
        </span>       
    )
}

export default ActionLink; 
