import './iconBar.css'
const IconBar = () => {
    return(
        <div className="icon-bar" style="display: flex; flex-wrap: wrap; justify-content: center; padding-bottom: 2px;">  
    <a href="#" className="item-special"><i className="bi bi-pen"></i></a>
    <a href="#" className="item-special"><i className="bi bi-paperclip"></i></a> 
    <a href="#" className="item-special"><i className="bi bi-lightning"></i></a>
    <a href="#" className="item"><i className="bi bi-card-text"></i></a>
    <a href="#" className="item"><i className="bi bi-arrow-repeat"></i></a> 
    <a href="#" className="item"><i className="bi bi-check2-circle"></i></a> 
    <a href="#" className="item"><i className="bi bi-play"></i></a> 
    <a href="#" className="item youtube"><i className="bi bi-x-circle"></i></a> 
  </div>
    )
};
export default IconBar;