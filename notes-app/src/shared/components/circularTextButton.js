import "./circularTextButton.css";

const CircularTextButton = (props) => {
  return (
   
      <div className="rounded-button" style={{minWidth:"50px"}}>
        <div className="tri"></div>
        <div className="num">{props.value}</div>
      </div>
  );
};

export default CircularTextButton;
