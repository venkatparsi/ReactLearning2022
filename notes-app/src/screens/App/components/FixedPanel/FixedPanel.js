
const FixedPanel = (props) => {

return (<div className="p-fixed w-100p" style={props.style} >
    {props.children}
</div>)
}
export default FixedPanel;