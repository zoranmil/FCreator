const AnimateAdd=`<div class="row" >
<div class="col-md-12" style="padding-top:10px;text-align: right;padding-right:30px;">
<a href="javascript:close();"  >\
    <svg  width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\
        <use xlink:href="#search-clear"></use>\
    </svg>\
</a>\
  </div>
  <div class="col-md-12" style="padding-top:10px">Animacija na početku</div>
    <div class="col-md-12" style="padding-top:10px">
        <select id="anim" class="form-control">
       <option  value="">Animacija</option>
       <option DNAME="moveInRight" value="slideInRight">Pomeri od desne strane</option>
       <option DNAME="moveInLeft" value="slideInLeft">Pomeri od leve strane</option>
       <option DNAME="moveInUpBack" value="bounceInDown">Pomeri od odozgo na dole</option>
      <option DNAME="moveInBottomBack" value="bounceInUp">Pomeri od dole na gore</option>
       <option  value="fadeIn">Pojavljuje se</option>
         <option DNAME="rotateIn" value="rotateIn">Rotiraj</option>
       <option DNAME="zoomIn" value="zoomIn">Zumiraj </option>

       </select>
 </div>
 <div class="col-md-12" style="padding-top:10px" >
 Vreme animacije <input id="timeb" type="number" value="0.5" min="0" step="0.1"  > s
 </div>

 <div class="col-md-12" style="padding-top:10px" style="display:none">
 Animacija na kraju
 </div>
 <div class="col-md-12" style="padding-top:10px" style="display:none">
<select id="endanim" class="form-control">
 <option  value="">Animacija</option>

    <option  value="fadeOut">Nestaje</option>
 <option  value="moveOutRight">Vrati se desno</option>
   <option  value="zoomOut">Vrati zumiranje</option>
   <option  value="moveOutLeft">Vrati se na levo</option>
   <option  value="moveOutBottom">Vrati se na dno</option>
   <option  value="moveOutRightBack">Vrati se na desno</option>

     </select>
 </select>
 </div>
 <div class="col-md-12" style="padding-top:10px;display:none">
 Vreme animacije <input id="timebk" type="number" value="1.5" min="0" step="0.1"  > s
 </div>
 <div class="col-md-6" style="padding-left:20px;padding-top:10px;">
<button id="btnanimation"     style="width:132px;height:30px;border-radius:4px 4px 4px 4px;">Promeni Animaciju</button>
</div>
  </div>
    `;
