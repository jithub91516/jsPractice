let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg';
let robot = lib220.loadImageFromURL(url);

//Define imageMap 
function imageMap(robot, func){
  //Iterate over each pixel in image and apply func
  let image = robot.copy();
  for (let i = 0; i < image.width; ++i) {
    for (let j = 0; j < image.height; ++j) {
      image.setPixel(i,j,func(robot,i,j));
    }
  }
  return image;
}

imageMap(robot, function(img, x, y) {
const c = img.getPixel(x, y);
return [c[0], 0, 0];
}).show();

function imageMask(robot, func, maskValue){
  let qwe = imageMap(robot, function(img, i, j){
    if (func(img, i, j)){
      return maskValue;
    }else{
      return img.getPixel(i,j);
    }

  });
  return qwe;
}

imageMask(robot, function(img, x, y) {
return (y % 10 === 0);}, [1, 0, 0]).show();

function blurPixel(robot, x, y){
      let mean = [0,0,0];
      let toLeft = x - 5;
      if(toLeft < 0){
         toLeft =0;
      }
      let toRight = x + 5;
      if (toRight >= robot.width){
         toRight = robot.width -1;
      }
      for(let val = toLeft;val <= toRight; ++val){
        mean[0]+= robot.getPixel(val,y)[0];
        mean[1]+= robot.getPixel(val,y)[1];
        mean[2]+= robot.getPixel(val,y)[2];
      }
      mean[0]/= 11;
      mean[1]/= 11;
      mean[2]/= 11;
      let newMean = [mean[0], mean[1], mean[2]];
      return newMean;
  
}

function blurImage(image){
  return imageMap(image, blurPixel);
}
blurImage(robot).show();

function isDark(robot, x, y){
  let result = [0,0,0];
  result[0] = robot.getPixel(x,y)[0];
  result[1] = robot.getPixel(x,y)[1];
  result[2] = robot.getPixel(x,y)[2];
  if (result[0]< 0.5 && result[1]<0.5 && result[2]<0.5){
    return true;
  }else{
    return false;
  }
}

function darken(image){
  return imageMask(image, isDark, [0,0,0]);
}
darken(robot).show();

function isLight(robot, x, y){
  let result = [0,0,0];
  result[0] = robot.getPixel(x,y)[0];
  result[1] = robot.getPixel(x,y)[1];
  result[2] = robot.getPixel(x,y)[2];
  if (result[0] >= 0.5 && result[1] >= 0.5 && result[2] >= 0.5){
    return true;
  }else{
    return false;
  }
}

function lighten(image){
  return imageMask(image, isLight, [1,1,1]);
}
lighten(robot).show();

function lightenAndDarken(image){
 
  return imageMask(imageMask(image, isLight,[1,1,1]), isDark, [0,0,0]);
  
}
lightenAndDarken(robot).show();