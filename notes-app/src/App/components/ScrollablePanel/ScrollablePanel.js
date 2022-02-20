import './ScrollablePanel.css'
const ScrollablePanel = (props) => {
    return(
        <div className="scroll">
            {props.children}
        </div>
    );
}
export default ScrollablePanel;