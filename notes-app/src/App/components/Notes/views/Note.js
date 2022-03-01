import "./Notes.css";
import CircularTextButton from "../../../../shared/components/circularTextButton";
const Note = () => {
  let hh = "00",
    mm = "00",
    ss = "00";
  return (
    <>
      <div href="#0" className="button-green note" >
        <span className="section"></span>
        <div className="row-lay" >
          <CircularTextButton className="col-1"></CircularTextButton>
          <div class="column-lay title">
            <span>Section 1: Getting Started ehat this is really working welll in this scenario.</span>
            <span>⓵ exp: Mar 12, 2013 </span>
          </div>
          <div className="price column-lay timer shadow ">
            <div className="blink-bg">
              {hh}:{mm}:{ss}
            </div>
            <div className="row-lay flex-space-evenly">
              <i
                className="bi-alarm "
                style={{ fontSize: "large", fontWeight: "bold" }}
              ></i>
              <span>30m</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
