import "./circularTextButton.css";

const CircularTextButton = (props) => {
  return (
   
      <div className="rounded-button" style={{minWidth:"50px"}}>
        <div className="tri"></div>
        <div className="num">12</div>
      </div>
  );
};

export default CircularTextButton;
