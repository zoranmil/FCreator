function ImagePreview( options) {
 this.defaultOptions = {
	 el:null,
   naslov:'Previci sliku ovde ili klikni za upload',
   noimage:"Nije validna slika ",
   image:'',
   dataurl:''
 }
	this.config  = Object.assign({}, this.defaultOptions, options || {});
	if(this.config.el===null){
		return ;
	}
  this.dataurl='';
  this.imageid='';
  this.imageName='';
  this.FileFulPath='';
  this.imageext='';
  this.file='';
	  this.selectElement = typeof this.config.el === 'string' ?  document.querySelector(this.config.el) : this.config.el;
   this.create();
};
ImagePreview.prototype.clear = function() {
 document.querySelector('.dropify-render').innerHTML='';
  $("#"+this.imageid).val('');
  this.dataurl='';
  this.imageid='';
  this.imageName='';
  this.FileFulPath='';
  this.imageext='';
  this.file='';
};
ImagePreview.prototype.add= function(file,imageName,iFulPath) {
  this.FileFulPath=iFulPath;
  this.imageName=imageName;
  this.imageext=imageName.split('.').pop();
  this.file=file;
return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          this.dataurl = reader.result;

      };
      reader.onerror = reject;
    });
};

ImagePreview.prototype.getBase64= function() {
  return   this.dataurl;
};
ImagePreview.prototype.getExt= function() {
  return   this.imageext;
};
ImagePreview.prototype.getName= function() {
  return  this.imageName;
};
ImagePreview.prototype.getFile= function() {
  return  this.file;
};
ImagePreview.prototype.getFileFulPath= function() {
  return  this.FileFulPath;
};
ImagePreview.prototype.create = function() {
  if(this.config.el===null){
		return ;
	}
  let  name = this.selectElement[0].getAttribute('name');
  this.imageid = this.selectElement[0].getAttribute('id');
  let template='<div class="dropify-wrapper">\
		<div class="dropify-message message'+this.imageid+'">\
		 <p>'+this.config.naslov+'</p>\
	 </div>\
	<span class="dropify-render render'+this.imageid+'">';
  if(this.config.image!=''){
    template+='<img src="'+this.config.image+'" >';
  }
  template+='</span>\
	 <input type="file" id="'+this.imageid+'" name="'+name+'" accept="image/png, image/gif, image/jpeg, image/webp" >\
</div>';

let element = document.createElement('div');
element.innerHTML = template;
this.selectElement[0].replaceWith(element);
$this=this;
$("#"+this.imageid).on("change", function(e){

     var file = e.target.files[0] || e.dataTransfer.files[0];
      var imageName = file.name;
      let id=$(this).attr('id');
      var isGood = (/\.(?=gif|jpg|png|jpeg|webp)/gi).test(imageName);
        if (isGood) {

      $('.render'+id).html("<img src='"+URL.createObjectURL(file)+"' id='img"+id+"' alt='"+imageName+"'>");
      $('.message'+id).html("");
        $('.message'+id).html("");
        let  iFulPath=$(this).val();
        $this.add(file,imageName,iFulPath);


        }else{
          $(this).val("");
            $('.message'+id).html(imageName);
            $('.render'+id).html("");
        }
    });

};

(function ($) {
	$.prototype.ImagePreview = function (options) {
    defaultOptions ={el:this };
    config  = Object.assign({},defaultOptions, options || {});
  return new 	ImagePreview(config);
	}
})(JaJS);
const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))
