class Dragable {
	constructor( target, options) {
	this.target = target;
	this.defaultOptions = {
		minWidth: 30,
		minHeight: 30,
		aspectRatio: true,
		resizeFromCenter: false,
		onDragStart: null,
		onDragging: null,
		onDragEnd: null,
		onResizeStart: null,
		onClicked: null,
		onResizeEnd: null,
		onRotateStart: null,
		onRotating: null,
		onRotateEnd: null,
		onResizerShown: null,
		onResizerHide: null,
		isHideOnResize: true,
		isHoverLine: true,
		boundWithContainer: false,
		angle:0,
		resizers: {
			n: true,
			s: true,
			e: true,
			w: true,
			ne: true,
			nw: true,
			se: true,
			sw: true,
			r: false,
		},
     	};
	  this.config  = Object.assign({}, this.defaultOptions, options || {});
  }
	createImg(){
		this.config.resizers= {
			n: false,
			s: false,
			e: false,
			w: false,
			ne: true,
			nw: true,
			se: true,
			sw: true,
			r: true,
		};
		this.config.onResizing=function(){
		},
		resizer.add(this.target, { ...this.config, ...{ resizeFromCenter: true } });
		resizer.hide();
	}
	createVideo(){
		this.config.resizers= {
			n: false,
			s: false,
			e: false,
			w: false,
			ne: true,
			nw: true,
			se: true,
			sw: true,
			r: false,
		};
		this.config.onResizing=function(){

		},

			resizer.add(this.target, { ...this.config, ...{ resizeFromCenter: true } });
			resizer.hide();
   }
	 createTaxt(){
		 this.config.onResizing=function(){

		 },
		 this.config.resizers= {
			 n:true,
			 s:true,
			 e:true,
			 w:true,
			 ne:false,
			 nw:false,
			 se:false,
			 sw: false,
			 r:true,
		 };
		 resizer.add(this.target, { ...this.config, ...{ resizeFromCenter: true,aspectRatio: false,boundWithContainer: true } });
		 resizer.hide();
	 }
}
