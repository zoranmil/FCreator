const Settings=`<div class="row">
<div class="col-md-12" style="padding-top:10px;text-align: left;padding-left:30px;">
     <div class="">Dimenzije videa</div>
      </div>
  <div class="col-md-12" style="padding-top:10px;text-align: right;padding-right:30px;padding-left:30px;">
<button type="button" class="app-select__face" id="app-select__face">
  <span class="app-select__active-font">
    <div  class="app-console-aspect-ratio-picker-item app-console-aspect-ratio-picker-item--dense">
      <svg   class="app-svg-symbol" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <use xlink:href="#canvas-aspect-ratio-square"></use>
      </svg>
      <span  class="app-console-aspect-ratio-picker-item__name">1280 x 720</span>
    </div>
  </span>
  <span class="app-select__arrows">
    <svg class="app-svg-symbol" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <use xlink:href="#select-arrows"></use>
    </svg>
  </span>
</button>
<div class="app-select-dropdown hide" id="app-select-dropdown">
    <div class="app-select-dropdown__option" data-width="1280" data-height="720">
      <button class="app-select-option" style="justify-content: flex-start; font-size: 12px;">
        <span class="app-select-option__text">
          <div  class="app-console-aspect-ratio-picker-item" variant="options-item">
            <svg  class="app-svg-symbol  " width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#canvas-aspect-ratio-square"></use>
            </svg>
            <span  class="app-console-aspect-ratio-picker-item__name">1280 x 720</span>
          </div>
        </span>
        <span class="app-select-option__check">
          <svg class="app-svg-symbol" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <use xlink:href="#option-check"></use>
          </svg>
        </span>
      </button>
    </div>
    <div class="app-select-dropdown__option" data-width="960" data-height="540">
      <button class="app-select-option app-select-option--variant-aspect-ratio  " style="justify-content: flex-start; font-size: 12px;">
        <span class="app-select-option__text">
          <div  class="app-console-aspect-ratio-picker-item" variant="options-item">
            <svg  class="app-svg-symbol  " width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#canvas-aspect-ratio-landscape"></use>
            </svg>
            <span  class="app-console-aspect-ratio-picker-item__name">960 x 540</span>
          </div>
        </span>
        <span class="app-select-option__check">
        </span>
      </button>
    </div>
    <div class="app-select-dropdown__option"   data-width="800" data-height="600">
      <button class="app-select-option app-select-option--variant-aspect-ratio  " style="justify-content: flex-start; font-size: 12px;">
        <span class="app-select-option__text">
          <div  class="app-console-aspect-ratio-picker-item" variant="options-item">
            <svg  class="app-svg-symbol  " width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#canvas-aspect-ratio-ultrawide"></use>
            </svg>
            <span  class="app-console-aspect-ratio-picker-item__name">800 X 600</span>
          </div>
        </span>
        <span class="app-select-option__check">
        </span>
      </button>
    </div>
    <div class="app-select-dropdown__option" data-width="624" data-height="468">
      <button class="app-select-option app-select-option--variant-aspect-ratio  " style="justify-content: flex-start; font-size: 12px;">
        <span class="app-select-option__text">
          <div  class="app-console-aspect-ratio-picker-item" variant="options-item">
            <svg  class="app-svg-symbol  " width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#canvas-aspect-ratio-landscape"></use>
            </svg>
            <span  class="app-console-aspect-ratio-picker-item__name">624 x 468</span>
          </div>
        </span>
        <span class="app-select-option__check">
        </span>
      </button>
    </div>

    <div class="app-select-dropdown__option"  data-width="600" data-height="400">
      <button class="app-select-option app-select-option--variant-aspect-ratio  " style="justify-content: flex-start; font-size: 12px;">
        <span class="app-select-option__text">
          <div  class="app-console-aspect-ratio-picker-item" variant="options-item">
            <svg  class="app-svg-symbol  " width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#canvas-aspect-ratio-landscape-post"></use>
            </svg>
            <span  class="app-console-aspect-ratio-picker-item__name">600 X 400</span>
          </div>
        </span>
        <span class="app-select-option__check">
        </span>
      </button>
    </div>
    <div class="app-select-dropdown__option"  data-width="405" data-height="720">
      <button class="app-select-option app-select-option--variant-aspect-ratio  " style="justify-content: flex-start; font-size: 12px;">
        <span class="app-select-option__text">
          <div  class="app-console-aspect-ratio-picker-item" variant="options-item">
            <svg  class="app-svg-symbol  " width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#canvas-aspect-ratio-portrait"></use>
            </svg>
            <span  class="app-console-aspect-ratio-picker-item__name">405 X 720</span>
          </div>
        </span>
        <span class="app-select-option__check">
        </span>
      </button>
    </div>
    <div class="app-select-dropdown__option"  data-width="288" data-height="360">
      <button class="app-select-option app-select-option--variant-aspect-ratio  " style="justify-content: flex-start; font-size: 12px;">
        <span class="app-select-option__text">
          <div  class="app-console-aspect-ratio-picker-item" variant="options-item">
            <svg  class="app-svg-symbol  " width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#canvas-aspect-ratio-vertical"></use>
            </svg>
            <span  class="app-console-aspect-ratio-picker-item__name">288 X 360</span>

          </div>
        </span>
        <span class="app-select-option__check">
        </span>
      </button>
    </div>
</div>
 <div class="col-md-12" style="padding-top:10px;text-align: left;padding-left:10px;">
  <div class="button" id="color"   data-color="#fff"  ></div>
  Boja pozadine    </div>
 <div  class="col-md-12"   style="padding-top:10px;text-align: left;padding-left:10px;">
   <label>Vreme trajanja</label>

   <input id="vremetrajanja" type="number" value="0" min="0"  > s
  </div>
   <div  class="col-md-12"   style="padding-top:10px;text-align: left;padding-left:10px;">
   <button id="btnvreme"     style="width:132px;height:30px;border-radius:4px 4px 4px 4px;">Promeni vreme trajanja</button>
   </div>
</div>
</div> `;
