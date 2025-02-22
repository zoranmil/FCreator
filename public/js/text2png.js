function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(" ");
  var line = "";
  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + " ";
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth) {
      context.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

const text2png = (text, options = {}) => {

  // Options

  options = parseOptions(options);


  // Register a custom font

  if (options.localFontPath && options.localFontName) {

    GlobalFonts.registerFromPath(options.localFontPath, options.localFontName)

  }


  let canvas = createCanvas(1, 1);

  let ctx = canvas.getContext("2d");


  const max = {

    left: 0,

    right: 0,

    ascent: 0,

    descent: 0

  };


  let lastDescent;

  const lineProps = text.split("\n").map(line => {

    ctx.font = options.font;

    const metrics = ctx.measureText(line);


    const left = -1 * metrics.actualBoundingBoxLeft;

    const right = metrics.actualBoundingBoxRight;

    const ascent = metrics.actualBoundingBoxAscent;

    const descent = metrics.actualBoundingBoxDescent;


    max.left = Math.max(max.left, left);

    max.right = Math.max(max.right, right);

    max.ascent = Math.max(max.ascent, ascent);

    max.descent = Math.max(max.descent, descent);

    lastDescent = descent;


    return { line, left, right, ascent, descent };

  });


  const lineHeight = max.ascent + max.descent + options.lineSpacing;


  const contentWidth = max.left + max.right;

  const contentHeight =

    lineHeight * lineProps.length -

    options.lineSpacing -

    (max.descent - lastDescent);


  canvas.width =

    contentWidth +

    options.borderLeftWidth +

    options.borderRightWidth +

    options.paddingLeft +

    options.paddingRight;


  canvas.height =

    contentHeight +

    options.borderTopWidth +

    options.borderBottomWidth +

    options.paddingTop +

    options.paddingBottom;


  canvas = createCanvas(canvas.width, canvas.height);

  ctx = canvas.getContext("2d");


  const hasBorder =

    false ||

    options.borderLeftWidth ||

    options.borderTopWidth ||

    options.borderRightWidth ||

    options.borderBottomWidth;


  if (hasBorder) {

    ctx.fillStyle = options.borderColor;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

  }


  if (options.backgroundColor) {

    ctx.fillStyle = options.backgroundColor;

    ctx.fillRect(

      options.borderLeftWidth,

      options.borderTopWidth,

      canvas.width - (options.borderLeftWidth + options.borderRightWidth),

      canvas.height - (options.borderTopWidth + options.borderBottomWidth)

    );

  } else if (hasBorder) {

    ctx.clearRect(

      options.borderLeftWidth,

      options.borderTopWidth,

      canvas.width - (options.borderLeftWidth + options.borderRightWidth),

      canvas.height - (options.borderTopWidth + options.borderBottomWidth)

    );

  }


  ctx.font = options.font;

  ctx.fillStyle = options.textColor;

  ctx.antialias = "gray";

  ctx.textAlign = options.textAlign;

  ctx.lineWidth = options.strokeWidth;

  ctx.strokeStyle = options.strokeColor;


  let offsetY = options.borderTopWidth + options.paddingTop;

  lineProps.forEach(lineProp => {

    // Calculate Y

    let x = 0;

    let y = max.ascent + offsetY;


    // Calculate X

    switch (options.textAlign) {

      case "start":

      case "left":

        x = lineProp.left + options.borderLeftWidth + options.paddingLeft;

        break;


      case "end":

      case "right":

        x =

          canvas.width -

          lineProp.left -

          options.borderRightWidth -

          options.paddingRight;

        break;


      case "center":

        x = contentWidth / 2 + options.borderLeftWidth + options.paddingLeft;

        break;

    }


    ctx.fillText(lineProp.line, x, y);


    if ( options.strokeWidth > 0 ) {

      ctx.strokeText(lineProp.line, x, y);

    }


    offsetY += lineHeight;

  });


  switch (options.output) {

    case "buffer":

      return canvas.toBuffer();

    case "stream":

      return Readable.from(canvas.toBuffer().toString());

    case "dataURL":

      return canvas.toDataURL("image/png");

    case "canvas":

      return canvas;

    default:

      throw new Error(`output type:${options.output} is not supported.`);

  }

};


function parseOptions(options) {

  return {

    font: or(options.font, "30px sans-serif"),

    textAlign: or(options.textAlign, "left"),

    textColor: or(options.textColor, options.color, "black"),

    backgroundColor: or(options.bgColor, options.backgroundColor, null),

    lineSpacing: or(options.lineSpacing, 0),


    strokeWidth: or(options.strokeWidth, 0),

    strokeColor: or(options.strokeColor, "white"),


    paddingLeft: or(options.paddingLeft, options.padding, 0),

    paddingTop: or(options.paddingTop, options.padding, 0),

    paddingRight: or(options.paddingRight, options.padding, 0),

    paddingBottom: or(options.paddingBottom, options.padding, 0),


    borderLeftWidth: or(options.borderLeftWidth, options.borderWidth, 0),

    borderTopWidth: or(options.borderTopWidth, options.borderWidth, 0),

    borderBottomWidth: or(options.borderBottomWidth, options.borderWidth, 0),

    borderRightWidth: or(options.borderRightWidth, options.borderWidth, 0),

    borderColor: or(options.borderColor, "black"),


    localFontName: or(options.localFontName, null),

    localFontPath: or(options.localFontPath, null),


    output: or(options.output, "buffer")

  };

}


function or() {

  for (let arg of arguments) {

    if (typeof arg !== "undefined") {

      return arg;

    }

  }

  return arguments[arguments.length - 1];

}
function CanvasTextWrapper(canvas, text, options) {
    'use strict';

    var defaults = {

      font: '18px Arial, sans-serif',

      sizeToFill: false,

      maxFontSizeToFill: false,

      lineHeight: 1,

      allowNewLine: true,

      lineBreak: 'auto',

      textAlign: 'left',

      verticalAlign: 'top',

      justifyLines: false,

      paddingX: 0,

      paddingY: 0,

      fitParent: false,

      strokeText: false,

      renderHDPI: true,

      textDecoration: 'none',
      localFontName: "",

      localFontPath: "",
    };


    var opts = {};


    for (var key in defaults) {

      opts[key] = options.hasOwnProperty(key) ? options[key] : defaults[key];

    }

    if (options.localFontPath!="" && options.localFontName!="") {

      GlobalFonts.registerFromPath(options.localFontPath, options.localFontName);

    }
    var context = canvas.getContext('2d');

    context.font = opts.font;

    context.textBaseline = 'bottom';


    var scale = 1;

    var devicePixelRatio = (typeof global !== 'undefined') ? global.devicePixelRatio : root.devicePixelRatio;


    if (opts.renderHDPI && devicePixelRatio > 1) {

      var tempCtx = {};


      // store context settings in a temp object before scaling otherwise they will be lost

      for (var key in context) {

        tempCtx[key] = context[key];

      }


      var canvasWidth = canvas.width;

      var canvasHeight = canvas.height;

      scale = devicePixelRatio;


      canvas.width = canvasWidth * scale;

      canvas.height = canvasHeight * scale;

      canvas.style.width = canvasWidth * scale * 0.5 + 'px';

      canvas.style.height = canvasHeight * scale * 0.5 + 'px';


      // restore context settings

      for (var key in tempCtx) {

        try {

          context[key] = tempCtx[key];

        } catch (e) {


        }

      }


      context.scale(scale, scale);

    }


    var EL_WIDTH = (!opts.fitParent ? canvas.width : canvas.parentNode.clientWidth) / scale;

    var EL_HEIGHT = (!opts.fitParent ? canvas.height : canvas.parentNode.clientHeight) / scale;

    var MAX_TXT_WIDTH = EL_WIDTH - (opts.paddingX * 2);

    var MAX_TXT_HEIGHT = EL_HEIGHT - (opts.paddingY * 2);


    var fontSize = opts.font.match(/\d+(px|em|%)/g) ? +opts.font.match(/\d+(px|em|%)/g)[0].match(/\d+/g) : 18;

    var textBlockHeight = 0;

    var lines = [];

    var newLineIndexes = [];

    var textPos = {x: 0, y: 0};

    var lineHeight = 0;

    var fontParts;

    var multiNewLineDelimiter = '\u200B';


    text = handleMultipleNewline(text);

    setFont(fontSize);

    setLineHeight();

    validate();

    render();


    function handleMultipleNewline (text) {

      do {

        text = text.replace(/\n\n/g, '\n' + multiNewLineDelimiter + '\n');

      } while (text.indexOf('\n\n') > -1);

      return text;

    }



    function setFont(fontSize) {

      if (!fontParts) fontParts = (!opts.sizeToFill) ? opts.font.split(/\b\d+px\b/i) : context.font.split(/\b\d+px\b/i);

      context.font = fontParts[0] + fontSize + 'px' + fontParts[1];

    }


    function setLineHeight() {

      if (!isNaN(opts.lineHeight)) {

        lineHeight = fontSize * opts.lineHeight;

      } else if (opts.lineHeight.toString().indexOf('px') !== -1) {

        lineHeight = parseInt(opts.lineHeight);

      } else if (opts.lineHeight.toString().indexOf('%') !== -1) {

        lineHeight = (parseInt(opts.lineHeight) / 100) * fontSize;

      }

    }


    function render() {

      if (opts.sizeToFill) {

        var wordsCount = text.trim().split(/\s+/).length;

        var newFontSize = 0;

        var fontSizeHasLimit = opts.maxFontSizeToFill !== false;


        do {

          if (fontSizeHasLimit) {

            if (++newFontSize <= opts.maxFontSizeToFill) {

              adjustFontSize(newFontSize);

            } else {

              break;

            }

          } else {

            adjustFontSize(++newFontSize);

          }

        } while (textBlockHeight < MAX_TXT_HEIGHT && (lines.join(' ').split(/\s+/).length == wordsCount));


        adjustFontSize(--newFontSize);

      } else {

        wrap();

      }


      if (opts.justifyLines && opts.lineBreak === 'auto') {

        justify();

      }


      setVertAlign();

      setHorizAlign();

      drawText();

    }


    function adjustFontSize(size) {

      setFont(size);

      lineHeight = size;

      wrap();

    }


    function wrap() {

      if (opts.allowNewLine) {

        var newLines = text.trim().split('\n');

        for (var i = 0, idx = 0; i < newLines.length - 1; i++) {

          idx += newLines[i].trim().split(/\s+/).length;

          newLineIndexes.push(idx)

        }

      }


      var words = text.trim().split(/\s+/);

      checkLength(words);

      breakText(words);


      textBlockHeight = lines.length * lineHeight;

    }


    function checkLength(words) {

      var testString, tokenLen, sliced, leftover;


      words.forEach(function (word, index) {

        testString = '';

        tokenLen = context.measureText(word).width;


        if (tokenLen > MAX_TXT_WIDTH) {

          for (var k = 0; (context.measureText(testString + word[k]).width <= MAX_TXT_WIDTH) && (k < word.length); k++) {

            testString += word[k];

          }


          sliced = word.slice(0, k);

          leftover = word.slice(k);

          words.splice(index, 1, sliced, leftover);

        }

      });

    }


    function breakText(words) {

      lines = [];

      for (var i = 0, j = 0; i < words.length; j++) {

        lines[j] = '';


        if (opts.lineBreak === 'auto') {

          if (context.measureText(lines[j] + words[i]).width > MAX_TXT_WIDTH) {

            break;

          } else {

            while ((context.measureText(lines[j] + words[i]).width <= MAX_TXT_WIDTH) && (i < words.length)) {


              lines[j] += words[i] + ' ';

              i++;


              if (opts.allowNewLine) {

                for (var k = 0; k < newLineIndexes.length; k++) {

                  if (newLineIndexes[k] === i) {

                    j++;

                    lines[j] = '';

                    break;

                  }

                }

              }

            }

          }

          lines[j] = lines[j].trim();

        } else {

          lines[j] = words[i];

          i++;

        }

      }

    }


    function justify() {

      var maxLen, longestLineIndex, tokenLen;

      for (var i = 0; i < lines.length; i++) {

        tokenLen = context.measureText(lines[i]).width;


        if (!maxLen || tokenLen > maxLen) {

          maxLen = tokenLen;

          longestLineIndex = i;

        }

      }


      // fill lines with extra spaces

      var numWords, spaceLength, numOfSpaces, num, filler;

      var delimiter = '\u200A';

      for (i = 0; i < lines.length; i++) {

        if (i === longestLineIndex) continue;


        numWords = lines[i].trim().split(/\s+/).length;

        if (numWords <= 1) continue;


        lines[i] = lines[i].trim().split(/\s+/).join(delimiter);


        spaceLength = context.measureText(delimiter).width;

        numOfSpaces = (maxLen - context.measureText(lines[i]).width) / spaceLength;

        num = numOfSpaces / (numWords - 1);


        filler = '';

        for (var j = 0; j < num; j++) {

          filler += delimiter;

        }


        lines[i] = lines[i].trim().split(delimiter).join(filler);

      }

    }


    function underline(text, x, y) {

      var width = context.measureText(text).width;


      switch (context.textAlign) {

        case 'center':

          x -= (width / 2);

          break;

        case 'right':

          x -= width;

          break;

      }


      context.beginPath();

      context.moveTo(x, y);

      context.lineTo(x + width, y);

      context.stroke();

    }


    function drawText() {

      var skipLineOnMatch = multiNewLineDelimiter + ' ';

      for (var i = 0; i < lines.length; i++) {

        textPos.y = parseInt(textPos.y) + lineHeight;

        if (lines[i] !== skipLineOnMatch) {

          context.fillText(lines[i], textPos.x, textPos.y);



          if (opts.strokeText) {

            context.strokeText(lines[i], textPos.x, textPos.y);

          }


          if (opts.textDecoration.toLocaleLowerCase() === 'underline') {

            underline(lines[i], textPos.x, textPos.y);

          }

        }

      }

    }


    function setHorizAlign() {

      context.textAlign = opts.textAlign;


      if (opts.textAlign == 'center') {

        textPos.x = EL_WIDTH / 2;

      } else if (opts.textAlign == 'right') {

        textPos.x = EL_WIDTH - opts.paddingX;

      } else {

        textPos.x = opts.paddingX;

      }

    }


    function setVertAlign() {

      if (opts.verticalAlign == 'middle') {

        textPos.y = (EL_HEIGHT - textBlockHeight) / 2;

      } else if (opts.verticalAlign == 'bottom') {

        textPos.y = EL_HEIGHT - textBlockHeight - opts.paddingY;

      } else {

        textPos.y = opts.paddingY;

      }

    }


    function validate() {

      if (typeof text !== 'string')

        throw new TypeError('The second parameter must be a String.');


      if (isNaN(fontSize))

        throw new TypeError('Cannot parse "font".');


      if (isNaN(lineHeight))

        throw new TypeError('Cannot parse "lineHeight".');


      if (opts.textAlign.toLocaleLowerCase() !== 'left' && opts.textAlign.toLocaleLowerCase() !== 'center' && opts.textAlign.toLocaleLowerCase() !== 'right')

        throw new TypeError('Property "textAlign" must be set to either "left", "center", or "right".');


      if (opts.verticalAlign.toLocaleLowerCase() !== 'top' && opts.verticalAlign.toLocaleLowerCase() !== 'middle' && opts.verticalAlign.toLocaleLowerCase() !== 'bottom')

        throw new TypeError('Property "verticalAlign" must be set to either "top", "middle", or "bottom".');


      if (typeof opts.justifyLines !== 'boolean')

        throw new TypeError('Property "justifyLines" must be a Boolean.');


      if (isNaN(opts.paddingX))

        throw new TypeError('Property "paddingX" must be a Number.');


      if (isNaN(opts.paddingY))

        throw new TypeError('Property "paddingY" must be a Number.');


      if (typeof opts.fitParent !== 'boolean')

        throw new TypeError('Property "fitParent" must be a Boolean.');


      if (opts.lineBreak.toLocaleLowerCase() !== 'auto' && opts.lineBreak.toLocaleLowerCase() !== 'word')

        throw new TypeError('Property "lineBreak" must be set to either "auto" or "word".');


      if (typeof opts.sizeToFill !== 'boolean')

        throw new TypeError('Property "sizeToFill" must be a Boolean.');


      if (typeof opts.strokeText !== 'boolean')

        throw new TypeError('Property "strokeText" must be a Boolean.');


      if (typeof opts.renderHDPI !== 'boolean')

        throw new TypeError('Property "renderHDPI" must be a Boolean.');


      if (opts.textDecoration.toLocaleLowerCase() !== 'none' && opts.textDecoration.toLocaleLowerCase() !== 'underline')

        throw new TypeError('Property "textDecoration" must be set to either "none" or "underline".');

    }


    return(lines);

  }
  (function (global, factory) {

      typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :

      typeof define === 'function' && define.amd ? define(factory) :

      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CanvasTextBlock = factory());

  })(this, (function () { 'use strict';


      /******************************************************************************

      Copyright (c) Microsoft Corporation.



      Permission to use, copy, modify, and/or distribute this software for any

      purpose with or without fee is hereby granted.



      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH

      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY

      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,

      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM

      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR

      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR

      PERFORMANCE OF THIS SOFTWARE.

      ***************************************************************************** */

      /* global Reflect, Promise, SuppressedError, Symbol */



      var extendStatics = function(d, b) {

          extendStatics = Object.setPrototypeOf ||

              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||

              function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };

          return extendStatics(d, b);

      };



      function __extends(d, b) {

          if (typeof b !== "function" && b !== null)

              throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

          extendStatics(d, b);

          function __() { this.constructor = d; }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());

      }



      var __assign = function() {

          __assign = Object.assign || function __assign(t) {

              for (var s, i = 1, n = arguments.length; i < n; i++) {

                  s = arguments[i];

                  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];

              }

              return t;

          };

          return __assign.apply(this, arguments);

      };



      function __spreadArray(to, from, pack) {

          if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {

              if (ar || !(i in from)) {

                  if (!ar) ar = Array.prototype.slice.call(from, 0, i);

                  ar[i] = from[i];

              }

          }

          return to.concat(ar || Array.prototype.slice.call(from));

      }



      typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {

          var e = new Error(message);

          return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;

      };


      /**

       * https://developer.mozilla.org/en-US/docs/Web/CSS/font

       */

      var composeFontString = function (fontSize, fontFamily, weight) {

          return "".concat(weight, " ").concat(fontSize, "px ").concat(fontFamily);

      };


      var calculateNextLineYPos = function (yPos, LineActualBoundingBoxAscent, lineHeight, index) {

          return yPos + LineActualBoundingBoxAscent / 2 + lineHeight * index;

      };


      var appendEllipsisToLine = function (context, line, lineMaxWidth) {

          for (var i = 0; i < line.length; i++) {

              var possibleLine = line.substr(0, line.length - i) ;

              var possibleLineWidth = context.measureText(possibleLine).width;

              if (possibleLineWidth < lineMaxWidth) {

                  return possibleLine;

              }

          }

        ///  throw new Error("Could not add ellipsis");

      };


      var defaultOptions = {

          color: "#fff",

          fontFamily: "arial",

          fontSize: 16,

          lineHeight: 24,

          padding: 0,

          weight: "normal",

          ellipsis: true,

          overflow: false,

          backgroundColor: "transparent",

      };


      var WidthLargerThanCanvasWidthError = /** @class */ (function (_super) {

          __extends(WidthLargerThanCanvasWidthError, _super);

          function WidthLargerThanCanvasWidthError() {

              var _this = _super.call(this) || this;

              _this.message =

                  "The specified width can not be larger than the canvas width";

              _this.name = "WidthLargerThanCanvasWidthError";

              return _this;

          }

          return WidthLargerThanCanvasWidthError;

      }(Error));


      var HeightLargerThanCanvasHeightError = /** @class */ (function (_super) {

          __extends(HeightLargerThanCanvasHeightError, _super);

          function HeightLargerThanCanvasHeightError() {

              var _this = _super.call(this) || this;

              _this.message =

                  "The specified height can not be larger than the canvas height";

              _this.name = "HeightLargerThanCanvasHeightError";

              return _this;

          }

          return HeightLargerThanCanvasHeightError;

      }(Error));


      var XPositionOutOfRangeError = /** @class */ (function (_super) {

          __extends(XPositionOutOfRangeError, _super);

          function XPositionOutOfRangeError() {

              var _this = _super.call(this) || this;

              _this.message = "The x position specified is out of range";

              _this.name = "XPositionOutOfRangeError";

              return _this;

          }

          return XPositionOutOfRangeError;

      }(Error));


      var YPositionOutOfRangeError = /** @class */ (function (_super) {

          __extends(YPositionOutOfRangeError, _super);

          function YPositionOutOfRangeError() {

              var _this = _super.call(this) || this;

              _this.message = "The y position specified is out of range";

              _this.name = "YPositionOutOfRangeError";

              return _this;

          }

          return YPositionOutOfRangeError;

      }(Error));


      var CanvasContextIsNullError = /** @class */ (function (_super) {

          __extends(CanvasContextIsNullError, _super);

          function CanvasContextIsNullError() {

              var _this = _super.call(this) || this;

              _this.message = "The canvas needs a 2d context!";

              _this.name = "CanvasContextIsNullError";

              return _this;

          }

          return CanvasContextIsNullError;

      }(Error));


      var CanvasTextBlock = /** @class */ (function () {

          function CanvasTextBlock(canvas, x, y, width, height, options) {

              var _this = this;

              this.getTextBlockMaxWidth = function () {

                  var maxWidth = _this.width;

                  if (_this.options.padding !== 0) {

                      maxWidth = maxWidth - _this.options.padding * 2;

                  }

                  return maxWidth;

              };

              this.getOptions = function () {

                  return _this.options;

              };

              this.getMaxLineCount = function () {

                  var height = _this.height;

                  if (_this.options.padding !== 0) {

                      height = height - _this.options.padding * 2;

                  }

                  return Math.floor(height / _this.options.lineHeight);

              };

              this.setBackgroundColor = function () {

                  if (_this.options.backgroundColor !== "transparent") {

                      _this.context.fillStyle = _this.options.backgroundColor;

                      _this.context.fillRect(_this.x, _this.y, _this.width, _this.height);

                  }

              };

              this.getStartingLineXPos = function () {

                  var xPos = _this.x;

                  if (_this.options.padding !== 0) {

                      xPos = _this.x + _this.options.padding;

                  }

                  return xPos;

              };

              this.getStartingLineYPos = function () {

                  var yPos = _this.y;

                  if (_this.options.padding !== 0) {

                      yPos = _this.y + _this.options.padding;

                  }

                  return yPos;

              };

              this.setText = function (text) {

                  var lines = _this.getLinesFromText(text);

                  // Loop through each line and render then to the canvas.

                  lines.map(function (line, index) {

                      _this.context.fillStyle = _this.options.color;

                      _this.context.font = composeFontString(_this.options.fontSize, _this.options.fontFamily, _this.options.weight);

                      /**

                       * TODO: I'd like to be able to define the text align in settings,

                       * but more work needs to be done here before that can happen.

                       */

                      _this.context.textAlign = "left";

                      _this.context.textBaseline = "top";

                      var textMeasurements = _this.context.measureText(line);

                      /**

                       * Render each line on the x,y cords based on the line index, line height

                       * font size, etc.

                       */

                      _this.context.fillText(line, _this.getStartingLineXPos(), calculateNextLineYPos(_this.getStartingLineYPos(), textMeasurements.actualBoundingBoxAscent, _this.options.lineHeight, index));

                  });

              };

              this.getLinesFromText = function (text) {

                  var words = text.split(" ");

                  // Find all words with new lines and make them their own word.

                  for (var i = 0; i < words.length - 1; i++) {

                      if (words[i].includes("\n")) {

                          var newWords = words[i].split(/(\n)/g);

                          words.splice.apply(words, __spreadArray([i, 1], newWords, false));

                          i = i + newWords.length - 1;

                      }

                  }

                  var lines = [];

                  var currentLine = words[0];

                  // Loop through each word and build lines for the text block

                  for (var i = 1; i < words.length; i++) {

                      var word = words[i];

                      _this.context.font = composeFontString(_this.options.fontSize, _this.options.fontFamily, _this.options.weight);

                      // If the word is a new line, append a new line.

                      if (word === "\n") {

                          lines.push(currentLine);

                          currentLine = "";

                          continue;

                      }

                      var currentLineWithWordWidth = _this.context.measureText("".concat(currentLine, " ").concat(word)).width;

                      // When the current line with the new word is less width than the max width.

                      if (currentLineWithWordWidth < _this.getTextBlockMaxWidth()) {

                          // Append a space before the previous word if the previous

                          // word is not a new line.

                          if (words[i - 1] && words[i - 1] === "\n") {

                              currentLine += word;

                          }

                          else {

                              currentLine += " ".concat(word);

                          }

                      }

                      else {

                          lines.push(currentLine);

                          // If the word is wider than the block width, break it up into fragments

                          var wordLength = _this.context.measureText(word).width;

                          if (wordLength > _this.width) {

                              var fragments = [];

                              var currentFragment = "";

                              var splitWord = word.split("");

                              for (var i_1 = 0; i_1 < splitWord.length; i_1++) {

                                  var currentFragmentWidth = _this.context.measureText("".concat(currentFragment).concat(splitWord[i_1], "-")).width;

                                  if (currentFragmentWidth > _this.getTextBlockMaxWidth()) {

                                      fragments.push("".concat(currentFragment, "-"));

                                      currentFragment = splitWord[i_1];

                                  }

                                  else {

                                      currentFragment += splitWord[i_1];

                                  }

                              }

                              lines.push.apply(lines, fragments);

                              currentLine = currentFragment;

                          }

                          else {

                              currentLine = word;

                          }

                      }

                  }

                  lines.push(currentLine);

                  if (lines.length > _this.getMaxLineCount()) {

                      // Clip the amount of lines to render depending on the overflow value

                      if (!_this.options.overflow) {

                          lines = lines.slice(0, _this.getMaxLineCount());

                          // Add ellipsis to the last line if needed

                          if (_this.options.ellipsis && lines.length >= _this.getMaxLineCount()) {

                              var lastLine = appendEllipsisToLine(_this.context, lines[lines.length - 1], _this.width);

                              lines[lines.length - 1] = lastLine;

                          }

                      }

                  }

                  return lines;

              };

              this.canvas = canvas;

              var _context = this.canvas.getContext("2d");

              if (!_context) {

                  throw new CanvasContextIsNullError();

              }

              this.context = _context;

              this.x = x;

              this.y = y;

              this.width = width;

              this.height = height;
            this.canvas.width=this.width;
             this.canvas.height=this.height;
              if (this.width > this.canvas.width) {

              //    throw new WidthLargerThanCanvasWidthError();

              }

              if (this.height > this.canvas.height) {

              //    throw new HeightLargerThanCanvasHeightError();

              }

              if (this.x < 0 || this.x > this.canvas.width) {

                //  throw new XPositionOutOfRangeError();

              }

              if (this.y < 0 || this.y > this.canvas.height) {

                //  throw new YPositionOutOfRangeError();

              }

              if ((options === null || options === void 0 ? void 0 : options.fontSize) && !options.lineHeight) {

                  // If the font size is provided without a line height, set it to 1.25

                  options.lineHeight = options.fontSize * 1.25;

              }

              this.options = __assign(__assign({}, defaultOptions), options);

              if (this.options.backgroundColor !== "transparent") {

                  this.setBackgroundColor();

              }

          }

          return CanvasTextBlock;

      }());


      return CanvasTextBlock;


  }));
