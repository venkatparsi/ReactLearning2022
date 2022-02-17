import React from "react";
import { Link } from "react-router-dom";
import './App.css'


function Navbar(props){
    var navItems = props.navItems;
    console.log(navItems)
    var navlist= navItems.map( (navItem) =>{
           return (<li className="links"  key={navItem.route}> 
                    <Link to={navItem.route}>{navItem.name}</Link>
                    </li>)
        })    
    return (
        <>
        <div className="Navbar">
        <h1 className="title" >Notes</h1><br />
            <div className="leftSide">
                {navlist}
            </div>
            <div className="rightSide">
            </div>
        </div></>)
}



export default Navbar;