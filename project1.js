
  let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');


function removeBlueAndGreen(robot){
  let image = robot.copy();
  for (let i = 0; i < image.width; ++i) {
    for (let j = 0; j < image.height; ++j) {
    image.setPixel(i, j, [robot.getPixel(i,j)[0], 0.0, 0.0]);
    } 
  }
  image.show();
  return image;
}

  
function makeGrayscale(robot){
  let image = robot.copy();
  for (let i = 0; i < image.width; ++i) {
    for (let j = 0; j < image.height; ++j) {
      let r = robot.getPixel(i,j)[0];
      let g = robot.getPixel(i,j)[1];
      let b = robot.getPixel(i,j)[2];
      let m = (r+g+b)/3;
      image.setPixel(i,j, [m,m,m])
    } 
  }
  image.show();
  return image;
}


function highlightEdges(robot){
  let image = robot.copy();
  for (let i = 0; i < image.width; ++i) {
    let i_length = i+1;
    if (i === image.width-1){i_length = i}

    for (let j = 0; j < image.height; ++j) {  
      let j_length = j+1;
      if (j === image.height-1){j_length = j}
      
      let r = robot.getPixel(i,j)[0];
      let g = robot.getPixel(i,j)[1];
      let b = robot.getPixel(i,j)[2];
      let m1 = (r+g+b)/3;
      let r2 = robot.getPixel(i_length,j_length)[0];
      let g2 = robot.getPixel(i_length,j_length)[1];
      let b2 = robot.getPixel(i_length,j_length)[2];
      let m2 = (r2+g2+b2)/3;

      image.setPixel(i,j,[Math.abs(m1-m2),Math.abs(m1-m2),Math.abs(m1-m2)])

    }
  }
  image.show();
  return image;
}

function blur(robot){
  let image = robot.copy();
  for (let i = 0; i < image.width; ++i) {

    for (let j = 0; j < image.height; ++j) {
      let mean = [0,0,0];
      let toLeft = i - 5;
      if(toLeft < 0){
         toLeft *= -1;
      }
      let toRight = i + 5;
      if (toRight >= image.width){
         toRight = toRight-5;
      }
      for(let val = toLeft;val <= toRight; ++val){
        mean[0]+= robot.getPixel(val,j)[0];
        mean[1]+= robot.getPixel(val,j)[1];
        mean[2]+= robot.getPixel(val,j)[2];
      }
      mean[0]/= 11;
      mean[1]/= 11;
      mean[2]/= 11;
    image.setPixel(i, j, mean);
    } 
  }
  image.show();
  return image;
}

