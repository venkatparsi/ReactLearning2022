import './ScrollablePanel.css'
const ScrollablePanel = (props) => {
    //console.log("props",props.height)
    var height = props.height;  
   
    if(!height) height = "20%"
    return(
        <div className="scroll" style={{height: height}}>
            {props.children}
        </div>
    );
}
export default ScrollablePanel;