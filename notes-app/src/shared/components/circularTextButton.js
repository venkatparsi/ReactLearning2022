import "./circularTextButton.css";
import { useDispatch } from 'react-redux';
import { setVideoLink } from '../../App/appUiReducerSlice';

const CircularTextButton = (props) => {
  var link = props.link;
  var bgcolor = props.bgcolor;
  const dispatch = useDispatch();

  const handleOnclick = (event) => {
    console.log("dispatching link...",link,bgcolor);
    dispatch(setVideoLink(link))
  }
  return (   
      <div className="rounded-button"  onClick={ props.handleOnClick?()=>{props.handleOnClick(props)}: handleOnclick} style={{minWidths:"50px",backgroundColor:{bgcolor}}} >
        <div className="triangle"></div>
        <div className="num">{props.value}</div>
      </div>
      )
     
};

export default CircularTextButton;
