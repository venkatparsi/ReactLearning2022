import React from 'react'
import ReactJson from 'react-json-view'

const handleClick = (tabName, evt) => {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    var elem = document.getElementById(tabName);
    elem.style.display = "block";
    //document.getElementById(tabName).style.display = "block";
    evt.target.className += " active";
    console.log("tabName is ", tabName, evt.target.className);
  }


const tabcomponent = () => {
    return (
        <div>
              <div>
            <div className="row">   
       
       <div className="col pt-2 panel-container panel-container__right">

         <div class="tab">
           <button className="tablinks" onClick={(evt) => handleClick('Tab1', evt)}>My Google</button>
           <button className="tablinks" onClick={(evt) => handleClick('Tab2', evt)}>Muchhata</button>
           <button className="tablinks" onClick={(evt) => handleClick('Tab3', evt)}>My Tasks</button>
         </div>

         <div id="Tab1" className="tabcontent">
           <h3>My Google</h3>
            <ReactJson src={jsonData} theme="monokai" 
             onEdit={(e) => { console.log('editing')}}
             onAdd={(e) => console.log('add New')}
             />
         </div>

         <div id="Tab2" className="tabcontent">
           <iframe className="panel-container" width="90%" height="90%" src="https://cellular-sylph-323602.firebaseapp.com" title="Muchhhata"></iframe>
         </div>

         <div id="Tab3" className="tabcontent">
           <h3>My Tasks</h3>
         </div>


       </div>
     </div>
        </div> 
        </div>
    )
}

export default tabcomponent
