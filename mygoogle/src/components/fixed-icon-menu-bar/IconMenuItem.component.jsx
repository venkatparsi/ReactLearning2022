import React from 'react'
import { withRouter } from 'react-router-dom';
import { Icon } from '../Icon.component';



const IconMenuItem = (props) => {
   // console.log(props);
    return (
        <div className="iconbar-item ripple" style={{ backgroundColor:props.bgcolor}} 
        onClick = {()=> props.history.push(`${props.match.url}${props.link}`)}> 
       {/** <Link to={props.link} style={{textDecoration:'none',color: props.color}} >  */}
                <Icon iconName = {props.iconName} 
                      color = {props.color} 
                      size = {props.size}                      
                /> 
                <span className="menu-name" style={{ fontSize: 14}}>{props.iconTitle}</span>
                <span className = "tagline">{props.tagline}</span>       
         {/**</Link>       */}     
        </div>
    )
} 

export default withRouter(IconMenuItem);
