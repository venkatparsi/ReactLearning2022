import "./Notes.css";
import CircularTextButton from "../../../../shared/components/circularTextButton";
const Note = (props) => {
 // console.log("Note props",props)

    var dd = props.note.dd ? props.note.dd:"0";
    var hh = props.note.hh? props.note.hh:"0";
    var mm = props.note.mm? props.note.mm:"0";

    let timerDD = "00",timerMM="00",timerHH="00";

  return (
    <>
     
      <div href="#0" style={{ marginTop:"0px"}} >
        <span className="section"></span>
        <div className="row-lay" >
          <CircularTextButton bgcolor="#FF0000" value={props.note.id} link={props.note.link} className="col-1"></CircularTextButton>
          <div className="column-lay title">           
            <span title={props.note.title}>{props.note.title.substring(0,20)}</span>
            <span title={props.note.about} style={{fontStyle:"italic"}}>{props.note.about.substring(0,20)}..</span>
          </div>
          <div className="price column-lay timer shadow ">
            <div className="blink-bg">
              {timerDD}:{timerHH}:{timerMM}
            </div>
            <div className="row-lay flex-space-evenly">
              <i
                className="bi-alarm "
                style={{ fontSize: "large", fontWeight: "bold" }}
              ></i>
              <span style={{fontSize:".8rem",whiteSpace:"nowrap",marginLeft:-8,padding:0}}>
              {dd?dd+'d':''}{hh?hh+'h':''}{mm?mm+'m':''}
                </span>
            </div>
          </div>
        </div>
      </div>


     
    </>
  );
};

export default Note;
