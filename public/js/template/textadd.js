const TextAdd='  <label>\
                    <div class="row">\
                    <div class="col-md-12" style="padding-top:10px;text-align: right;padding-right:30px;">\
                    <a href="javascript:close();"  >\
                        <svg  width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\
                            <use xlink:href="#search-clear"></use>\
                        </svg>\
                    </a>\
                      </div>\
                    <div class="col-md-6" style="padding-top:10px">\
                  <select id="fontName" class="form-control">\
                    <option value="arial">Arial</option>\
                    <option value="courier">Courier New</option>\
                    <option value="georgia">Georgia</option>\
                    <option value="helvetica">Helvetica</option>\
                    <option value="tahoma">Tahoma</option>\
                    <option value="times" >Times New Roman</option>\
                    <option value="trebuchet">Trebuchet MS</option>\
                    <option value="verdana">Verdana</option>\
                  </select>\
                    </div>\
                    <div class="col-md-6" style="padding-top:10px">\
                      <select id="fontSize" class="form-control">\
          							<option disabled>Size</option>\
          							<option value="10">10</option>\
          							<option value="13">13</option>\
          							<option value="16" selected>16</option>\
          							<option value="18">18</option>\
          							<option value="22">22</option>\
                        <option value="24">24</option>\
                        <option value="28">28</option>\
          							<option value="32">32</option>\
                        <option value="34">34</option>\
                        <option value="38">38</option>\
                        <option value="42">42</option>\
                        <option value="44">44</option>\
          							<option value="48">48</option>\
          						</select>\
                    </div>\
             <div class="col-md-12" style="padding-top:10px">  <div class="button" id="color"   data-color="#fff"  ></div> Boja slova    </div>\
              <div class="col-md-12" style="padding-top:10px">  <div class="button" id="bgcolor"   data-color="#fff"  ></div> Boja   pozadine slova    </div>\
                <div class="col-md-12" style="padding-left:20px;padding-top:10px;">\
Razmak  <input id="padding" type="number" value="0" min="0" placeholder="Unesite tekst" > px\
                </div>\
                  <div class="col-md-11">\
                    <label>Tekst</label>\
              	<textarea   style="height:150px;"  id="textc" class="form-control" placeholder="Unesite tekst" > </textarea>\
                   </div>\
                     <div class="col-md-6" style="padding-left:20px;padding-top:10px;">\
                       <button  id="addtextc"  style="width:132px;height:30px;border-radius:4px 4px 4px 4px;">\
<svg class="app-svg-symbol" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#option-check"></use></svg>\
                             Dodaj Tekst\
                         </button>\
                          </div>\
                           <div class="col-md-6" style="padding-left:20px;padding-top:10px;">\
                        <button id="btntextc"   disabled="disabled"  style="width:132px;height:30px;border-radius:4px 4px 4px 4px;">Promeni text</button>\
                     </div>\
                  </div>\
  </label>\
                  <div class="app-console-media-import-bar">\
                  </div>'
