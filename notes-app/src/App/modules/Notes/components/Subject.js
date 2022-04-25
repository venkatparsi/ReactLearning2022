import "./Notes.css";
import CircularTextButton from "../../../../shared/components/circularTextButton";

const subjectClicked = (props) =>{
  console.log("SUBJECT CLICKED<<<<<<<<<<<",props)
}

const Subject = (props) => {
   return (
    <>     
        <div href="#0" className="button-green note mt-2 " style={{borderTop:"1px solid gray", borderRight:"1px solid gray"}}>
        <span className="section"></span>
        <div className="row-lay" >
          <CircularTextButton bgcolor="#FF0000" {...props} value={props.id} link={props?.link} handleOnClick={subjectClicked}
           className="col-1"></CircularTextButton>
          <div className="column-lay title">           
            <span title={props.title}>{props.title.substring(0,20)}</span>
            <span title={props?.about} style={{fontStyle:"italic"}}>
                {props?.about.substring(0,20)}..
            </span>
          </div>        
        </div>
      </div>
    </>
  );
};

export default Subject;
