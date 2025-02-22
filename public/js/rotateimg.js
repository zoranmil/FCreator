
const rotateimg =function({ src, rotation = 0 }) {


 const sourceImage = new Image();
    sourceImage.src = src;

    const radians = (Math.PI/180) * rotation;
    const {
      width: imageWidth,
      height: imageHeight,
    } = sourceImage;
    const {
      width,
      height,
    } = getBoundingDimensions(imageWidth, imageHeight, radians);

    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.translate(width/2, height/2);
    ctx.rotate(radians);
    ctx.translate(-width/2, -height/2);
    ctx.drawImage(
      sourceImage,
      (width/2) - (imageWidth/2),
      (height/2) - (imageHeight/2),
      imageWidth,
      imageHeight
    );
   return canvas;

};
const getBoundingDimensions=function(width, height, rotation) {
 const {
   cos,
   sin,
   abs,
 } = Math;

 const widthAfterRotation = abs(width * sin(rotation)) + abs(height * cos(rotation));
 const heightAfterRotation = abs(width * cos(rotation)) + abs(height * sin(rotation));
 /* eslint-enable max-len */

 return {
   height: widthAfterRotation,
   width: heightAfterRotation,
 };
};
