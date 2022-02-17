function convertToPng(targetImgElemId){

  // Set the Width and Height you want your resized image to be
  var width = 1920; 
  var height = 1080; 
  console.log("start of the convert to png...:",targetImgElemId);
  
  var canvas = document.createElement('canvas');  // Dynamically Create a Canvas Element
  canvas.width  = width;  // Set the width of the Canvas
  canvas.height = height;  // Set the height of the Canvas
  var ctx = canvas.getContext("2d");  // Get the "context" of the canvas 
  var img = document.getElementById(targetImgElemId);  // The id of your image container
  img.crossOrigin = "anonymous";
  console.log(img);
  ctx.drawImage(img,0,0,width,height);  // Draw your image to the canvas
  
  
  var pngFileData = canvas.toDataURL("image/png"); // This will save your image as a 
   console.log("pngFile: ",pngFileData) ;       
   console.log("end  of the convert to png...");
   //jpeg file in the base64 format.
   img.src = pngFileData;

   document.getElementById(targetImgElemId)
  .setAttribute(
      'src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
  );

  document.getElementById(targetImgElemId)
  .setAttribute(
      'src', pngFileData
  );
}

function paste(imgElemId) {   
  
  var targetImgElemId = '';
  if(imgElemId){
    targetImgElemId = imgElemId;
  }else{
    targetImgElemId = document.getElementById("targetPasteImgElem").value; 
  }

  
  console.log("targetImgElemId: " + targetImgElemId);
  var imgElem = document.getElementById(targetImgElemId);
  console.log("Target image element",imgElem);
  var clipAvailable = false;
  navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
    // If permission to read the clipboard is granted or if the user will
    // be prompted to allow it, we proceed.
      if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.read().then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (!data[i].types.includes("image/png")) {
            alert("Clipboard contains non-image data. Unable to access it.");
          } else {
            data[i].getType("image/png").then((blob) => {
              var reader = new FileReader();
                reader.readAsDataURL(blob);                   
                reader.onloadend = function() {
                    base64data = reader.result;     
                    imgElem.src = base64data;     
                    cllipAvailable = true;                 
                    //console.log("After Pasting the clipboard data to imgElem.src:", imgElem.src);
                }   
              //imgElem.src = URL.createObjectURL(blob);
            });
          }
        }
      });
    }
  });
  if(clipAvailable)
    convertToPng(targetImgElemId);
}


function zoomIt(elem){
console.log("inside zoom it",elem);

console.log(elem.height, elem.width);
console.log(elem.naturalHeight, elem.naturalWidth);



if(elem.classList.contains('zoom-it')){
//elem.classList.remove('zoom-it');
// elem.parentNode.classList.remove('zoom-it-parent');
exitFullScreen();

return;
}
//elem.parentNode.classList.add('zoom-it-parent');
//elem.classList.add('zoom-it');
goFullScreen(elem);
}
//document.querySelector(".sample-item").addEventListener("click", zoomIt);
$('.sample-item').on('click', function (event) { 
console.log("calling zoomint....")
zoomIt(event);
}).children().on('click', function (event) {
event.stopPropagation();
//you can also use `return false;` which is the same as `event.preventDefault()` and `event.stopPropagation()` all in one (in a jQuery event handler)
});
console.log("End of loading image-utils");


function goFullScreen(elem){

//var elem = document.getElementById(elemId);

if(elem.requestFullscreen){
    elem.requestFullscreen();
}
else if(elem.mozRequestFullScreen){
    elem.mozRequestFullScreen();
}
else if(elem.webkitRequestFullscreen){
    elem.webkitRequestFullscreen();
}
else if(elem.msRequestFullscreen){
    elem.msRequestFullscreen();
}
}


function exitFullScreen(){

if(document.exitFullscreen){
    document.exitFullscreen();
}
else if(document.mozCancelFullScreen){
    document.mozCancelFullScreen();
}
else if(document.webkitExitFullscreen){
    document.webkitExitFullscreen();
}
else if(document.msExitFullscreen){
    document.msExitFullscreen();
}

}