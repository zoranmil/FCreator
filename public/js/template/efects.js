const VideoEffects =function(id){
  let sel=0
if (allscenes[id-1].effects !== undefined ) {
   if ( allscenes[id-1].effects!=null){
  sel=allscenes[id-1].effects;
}
}
 html='<div style="overflow-y: scroll;height:590px;">';
  let style="";
  for (var i = 1; i < 45; i++) {
    style="margin:10px";
    // if(i==sel){
       style="width:40%;margin:10px;border: 5px solid #FFFFFF;";
    // }
   html+='<img src="img/'+i+'.gif"  style="'+ style+'"  onclick="dodajEfect('+i+','+id+')" >';
  }
  html+="</div>"
return  html;



}
