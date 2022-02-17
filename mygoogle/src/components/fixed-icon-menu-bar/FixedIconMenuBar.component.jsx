import React from 'react'
import './FixedIconBar.style.scss'
import IconMenuItem from './IconMenuItem.component';
import {FaChevronCircleLeft,FaChevronCircleRight} from "react-icons/fa"



const FixedIconMenuBar = (props) => {  
   
    const closeIconMenu = () => {
        document.getElementById('iconbar').style.width  = "5%";
        document.getElementById('menus').style.display = "none"; 
        document.getElementById('chevronLeft').style.display = "none"; 
        document.getElementById('chevronRight').style.display = "inline";               
    }   
    const openIconMenu = () => {
        document.getElementById('iconbar').style.width = '4pc';        
        document.getElementById('menus').style.display = "inline"; 
        document.getElementById('chevronLeft').style.display = "inline"; 
        document.getElementById('chevronRight').style.display = "none";    
    }  
    return (
     //  console.log("FIXED ICON PROPS DATA:",props),
    <div>      
        <div id='iconbar' className="iconbar" style={{color:'white',backgroundColor:'black'}}>   
        <span id='chevronLeft' onClick={()=>{closeIconMenu()}} style={{color:'white',display:'none'}}><FaChevronCircleLeft /></span> 
        <span id='chevronRight' onClick={()=>{openIconMenu()}}
        style={{color:'white',display:'inlilne'}}><FaChevronCircleRight /></span>
        <span id='menus' style={{display:"none"}}>     
        { 
            props.menuData && (           
                props.menuData.map((mn, index) => ( 
                    <IconMenuItem key={mn.id} 
                    iconName={mn.iconName} 
                    iconTitle={mn.iconTitle}
                    bgcolor={mn.bgcolor} 
                    color={mn.color} 
                    size={mn.size} 
                    tagline={mn.tagline}
                    link={mn.link}
                    /> 
                ))
            )
        }
        </span>    
        </div>
    </div>
    ) 
}

export default FixedIconMenuBar
