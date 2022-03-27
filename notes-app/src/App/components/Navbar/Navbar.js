import React from "react";
import { Link } from "react-router-dom";
import '../../App.css'
import { useTranslation } from "react-i18next";




function Navbar(props) {

  //Calling t and i18n method from useTranslation hook 
  const { t, i18n } = useTranslation();
  var navItems = props.navItems;
  //console.log(navItems)
  var navlist = navItems.map((navItem) => {
    return (<li className="links" key={navItem.route}>
      <Link to={navItem.route}>{navItem.name}</Link>
    </li>)
  })
  //Creating a method to change the language onChnage from select box
  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }
  return (
    <>
      <div className="Navbar">
        <h1 className="title" >Notes</h1>
        <div className="leftSide">
          {navlist}
        </div>
        <div className="rightSide">
          {/* Select box to change language */}
          <select className="custom-select" style={{ width: 200 }} onChange={changeLanguageHandler}>
            <option value="en" >English</option>
            <option value="hn" >Hindi</option>
            <option value="te" >Telugu</option>
          </select>
        </div>
      </div></>)
}



export default Navbar;