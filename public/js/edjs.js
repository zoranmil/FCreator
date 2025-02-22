(function (){
	var $=window.$=function(s){
		return new JaJS(s);
	};
	JaJS=function(s){
		var i,n,t;
		if(typeof s==='string'){
			if ((/^#[\w-]+$/).test(s)) {
					var idShortcut = document.querySelector(s);
					if (idShortcut) {
							this[0] = idShortcut;
							this.length = 1;
					}
					return this;
			}
		else	if ((/^.[\w-]+$/).test(s)) {
					var idShortcut = document.querySelector(s);
					if (idShortcut) {
							this[0] = idShortcut;
							this.length = 1;
					}
					return this;
			}
		else	if ((/^[a-z]+$/).test(s)) {
       	var tags = document.getElementsByTagName(s);
					var tLen = tags.length;
					for (var i = 0; i < tLen; i++) {
							this[i] = tags[i];
					}
					this.length = tLen;
					return this;
			}
			else if ((/\[[^\]]+\]/).test(s)){
				var tags = document.querySelectorAll(s);
					var tLen = tags.length;
					for (var i = 0; i < tLen; i++) {
							this[i] = tags[i];
					}
					this.length = tLen;
					return this;
			}else{
				var tags = document.querySelectorAll(s);
					var tLen = tags.length;
					for (var i = 0; i < tLen; i++) {
							this[i] = tags[i];
					}
					this.length = tLen;
					return this;
			}

		}else if(typeof s==='object'){
			if(s instanceof Array){
			for(i=0,n=s.length;i<n;i++) this[i]=s[i];
			this.length=s.length;
			}else{
			this[0]=s;
			this.length=1;
			}
		}
	};

JaJS.prototype={
	ready:function(fn){
		if(document.attachEvent && document.readyState != 'loading'){
		document.attachEvent('onreadystatechange',function(){fn()});
		} else {
		document.addEventListener('DOMContentLoaded',fn);
		}
	},
	each:function(cb){
		for(var i=0;i<this.length;i++){
		cb.call(this[i],i,this);
		}
		return this;
	},
	serialize:function(){
		const k_r_submitter = /^(?:submit|button|image|reset|file)$/i;
		const k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;
			let result ='';
			const serializer = function (result, key, value) {
					value = value.replace(/(\r)?\n/g, '\r\n');
				 	value = encodeURIComponent(value);
				   value = value.replace(/%20/g, '+');
						return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
				};
				let elements = this[0] && this[0].elements ? this[0].elements : [];
	     	let  radio_store = Object.create(null);
		for (var i=0 ; i<elements.length ; ++i) {
				var element = elements[i];
				if (( element.disabled) || !element.name) {
						continue;
				}
				if (!k_r_success_contrls.test(element.nodeName) || 	k_r_submitter.test(element.type)) {
						continue;
				}
				var key = element.name;
				var val = element.value;
				if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
						val = undefined;
				}
						if (!val) {
								continue;
						}
				if (element.type === 'select-multiple') {
						val = [];
						var selectOptions = element.options;
						var isSelectedOptions = false;
						for (var j=0 ; j<selectOptions.length ; ++j) {
								var option = selectOptions[j];
								var allowedEmpty = !option.value;
								var hasValue = (option.value || allowedEmpty);
								if (option.selected && hasValue) {
										isSelectedOptions = true;
												result = serializer(result, key, option.value);
								}
						}
						continue;
				}
				result = serializer(result, key, val);
		}
		return result;
	},
	serializeForm:function(){
      let data = new FormData(this[0]);
			return data;
	},
	focus:function(){
		return this[0].focus();
	},
	text:function(txt){
		if(typeof txt === 'string') return this.each(function(){this.firstChild.nodeValue=txt;});
		else return this[0].firstChild.nodeValue;
	},
	animate:function (time, scale, rotate, rotateX, rotateY, translateX, translateY, skewX, skewY, opacity) {
		 let 	v= 'transition: all ' + time + 's ease-in-out; transform: scale(' + scale + ') rotate(' + rotate + 'deg) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translate(' + translateX + 'px, ' + translateY + 'px) skew(' + skewX + 'deg, ' + skewY + 'deg); opacity:' + opacity + ';';
		return this.each(function(){
		let prev_style=this.getAttribute("style");
		if (prev_style==undefined || prev_style==null) { prev_style="" }
       	this.setAttribute("style",prev_style.replace(v+";", ''));
			   prev_style=this.getAttribute("style");
					if (prev_style==undefined || prev_style==null) { prev_style="" }
			this.setAttribute("style",prev_style+v+";");
		});
		},
	html:function(html){
		var htm=null;
		if(typeof html==='object') htm=html[0].innerHTML;
		else if(typeof html==='string') htm=html;
		else return this[0].innerHTML;
		return this.each(function(){this.innerHTML=htm;});
	},
	val:function(v){
		if(typeof v !== "undefined") return this.each(function(){this.value=v;});
		else return this[0].value;
	},
	prop:function(atr,v){
		if(typeof v !== 'undefined') {return this.each(function(){this.setAttribute(atr,v);});}
	  	else{ return this[0].getAttribute(atr);}
	},
	removeAttr:function(atr){
		if(typeof atr!== 'undefined') return this.each(function(){this.removeAttribute(atr);});
	},
	attr:function(atr,v){
		if(typeof v !== 'undefined') return this.each(function(){this.setAttribute(atr,v);});
		else return this[0].getAttribute(atr);
	},
	css:function(name,v){

		if(typeof v !== 'undefined') {
			return this.each(function(){
				let css=''; let ell=[];
			prev_style=this.getAttribute("style");
			if (prev_style==undefined || prev_style==null) { prev_style="" }

			if( prev_style!=""){
           let orginal=prev_style.split(";")
					  for (var key in orginal) {
							ell=orginal[key].split(":");
							if(ell[0]!=name){
								 if( orginal[key]!=""){
									 	 css += orginal[key] + ";";
                      
								 }
							}
						}
			}

				this.setAttribute("style", css+name+":"+v+";");
		});
   	}
		else{
   if(typeof name === 'object'){
	   return this.each(function(){
		  	prev_style=this.getAttribute("style");

			 if (prev_style==undefined || prev_style==null) { prev_style="" }
			  let css='';
		      for (var key in name) {

					 css += key + ":" +  name[key] + ";";
					}
					let used=false;
						 let ell=[];
						  let orginal=prev_style.split(";")
					 for (var k in orginal) {
						 used=false;
	            ell=orginal[k].split(":")
						 for (var key in name) {
								if(key==ell[0]){  used=true;}
						 }
						 if(!used){
								css +=  orginal[k] + ";";
						 }

					 }

						this.setAttribute("style",css);
      	});
      }
	  }
	},
	remstyle:function(name){
		return this.each(function(){
			let css=''; let ell=[];
		prev_style=this.getAttribute("style");
		if (prev_style==undefined || prev_style==null) { prev_style="" }

		if( prev_style!=""){
				 let orginal=prev_style.split(";")
					for (var key in orginal) {
						ell=orginal[key].split(":");
						if(ell[0]!=name){
							 if( orginal[key]!=""){
									 css += orginal[key] + ";";

							 }
						}
					}
		}
			this.setAttribute("style", css);
		});
	},
	hasClass:function(cls){
		var cs=[];
		this.each(function(){
		cs=cs.concat(this.className.split(' '));
		});
		return $.inArray(cls,cs);
	},
	addClass:function(cls){
		return this.each(function(){
		var cs=this.className.split(' '),ar=[];
		for(var c in cs) {
		if(cs[c]!="") ar.push(cs[c]);
		}
		ar.push(cls);
		this.className=ar.join(' ');
		});
	},
	removeClass:function(cls){
		return this.each(function(){
		var cs=this.className.split(' '),cl=cls.split(' '),ar=[];
		for(var c in cs) {
		if(cs[c]!="" && !$.inArray(cs[c],cl)) ar.push(cs[c]);
		}
		this.className=ar.join(' ');
		});
	},
	show:function(){
		return this.each(function(){this.style.display='block';});
	},
	hide:function(){
		return this.each(function(){this.style.display='none';});
	},
	remove:function(){
		return this.each(function(){this.parentNode.removeChild(this);});
	},
	append:function(a){
		return this.each(function(){
		if(typeof a==='object') this.appendChild(a[0].cloneNode(true));
		else this.insertAdjacentHTML("beforeend",a);
		});
	},
	prepend:function(a){
		return this.each(function(){
		if(typeof a==='object') this.insertBefore(a[0].cloneNode(true),this.firstChild);
		else  this.insertAdjacentHTML("afterend",a);
		});
	},
	after:function(a){
		return this.each(function(){
		if(typeof a==='object') a=a[0];
		else if(typeof a==='string') a=_htmlToEl(a);
		this.parentNode.insertBefore(a.cloneNode(true), this.nextSibling);
		});
	},
	before:function(a){
		return this.each(function(){
		if(typeof a==='object') a=a[0];
		else if(typeof a==='string') a=_htmlToEl(a);
		this.parentNode.insertBefore(a.cloneNode(true), this);
		});
	},
	insertAfter:function(a){
		return this.each(function(){
		a=document.querySelector(a);
		a.parentNode.insertBefore(this.cloneNode(true), a.nextSibling);
		});
	},
	insertBefore:function(a){
		return this.each(function(){
		a=document.querySelector(a);
		this.parentNode.insertBefore(a.cloneNode(true), this);
		});
	},
	clone:function(v){
		return this.each(function(){this.cloneNode(v===true);});
	},
	_new:function(fn){
		var i,n,obj=fn.call(this);
		for(i=0;i<this.length;i++) delete this[i];
		this.length=obj.length;
		for(i=0,n=this.length;i<n;i++) this[i]=obj[i];
		return this;
	},
	eq:function(idx){
		return this._new(function(){
		return [this[idx]];
		});
	},
	find:function(v){
		return this._new(function(){
		var arr=[];
		this.each(function(){
		var t=document.querySelectorAll(v);
		for(var j=0,k=t.length;j<k;j++) arr.push(t[j]);
		});
		return arr;
		});
	},
	parent:function(){
		return this._new(function(){
		var arr=[];
		this.each(function(){
		var o=_in(this,'parentNode');
		if(o) arr.push(o);
		});
		return arr;
		});
	},
	parents:function(s){
		return this._new(function(){
		var els=[];
		this.each(function(){
		if(typeof s === 'undefined'){
		var el=this;
		for(;el && el !== document;el=_in(el,'parentNode')){
		if(el!=this && !$.inArray(el,els)) els.push(el);
		}
		}else{els=document.querySelectorAll(s);}
		});
		return els;
		});
	},
	next:function(){
		return this._new(function(){
		var arr=[];
		this.each(function(){
		var o=_in(this,'nextSibling');
		if(o) arr.push(o);
		});
		return arr;
		});
	},
	prev:function(){
		return this._new(function(){
		var arr=[];
		this.each(function(){
		var o=_in(this,'previousSibling');
		if(o) arr.push(o);
		});
		return arr;
		});
	},
	toggle:function(){
		return this.each(function(){this.style.display=(this.style.display==='none'?'block':'none');});
	},
	toggleClass:function(cls){
		return this.each(function(){
		var cs=this.className.split(' '),ar=[];
		if($.inArray(cls,cs)){
			for(var c in cs){if(cs[c]!="" && cs[c]!=cls) ar.push(cs[c]);}
		}else{
			for(var c in cs){if(cs[c]!="") ar.push(cs[c]);}
			ar.push(cls);
		}
		this.className=ar.join(' ');
		});
	},
	hover:function(fnOver,fnOut){
		this.on('mouseover',fnOver);
		this.on('mouseout',fnOut);
	},
	fadeIn:function(speed,fn){
		return this.each(function(){
		var op=0.1,el=this.style;
		el.display='block';
		if(typeof speed==='undefined') speed=500;
		var timer=setInterval(function(){
		if(op >= 1) {clearInterval(timer);if(typeof fn!=='undefined') fn.call(this);}
		el.opacity=op;
		el.filter='alpha(opacity='+op*100+')';
		op += op*0.1;
		}, speed/50);
		});
	},
	fadeOut:function(speed,fn) {
		return this.each(function(){
		var op=1,el=this.style;
		if(typeof speed==='undefined') speed=500;
		var timer=setInterval(function(){
		if(op <= 0.1){clearInterval(timer);el.display='none';if(typeof fn!=='undefined') fn.call(this);}
		el.opacity=op;
		el.filter='alpha(opacity='+op*100+')';
		op -= op*0.1;
		}, speed/50);
		});
	},
	on:function(ev,fn){
		return this.each(function(){this["on" + ev]=fn;});
	},
	off:function(ev,fn){
		return this.each(function(){this["on" + ev]=null;});
	},
	offset : function () {
	    var ele = this[0];
	    if (!ele)
	        return;
	    var rect = ele.getBoundingClientRect();
	    return {
	        top: rect.top + window.pageYOffset,
	        left: rect.left + window.pageXOffset
	    };
	},
	 prependTo:function(el) {
		 el.append(this);
		 this.remove();
	},
 prependTo:function(el) {
	 el.prepend(this);
	 this.remove();
 },
	};
	$.isArray=function(o){
		return (o instanceof Array);
	};
	$.inArray=function(key, arr){
		for(var i=0;i<arr.length;i++){
		if(arr[i] === key) return true;
		}
		return false;
	};
	$.isJson=function(str){
		 if(typeof str === "string"){ return false;}
	try {JSON.parse(JSON.stringify(str));} catch(e) {return false;}
	return true;
};
	$.extend=function(target, source) {
    if (source) {
        for(var prop in source) {
            if(source.hasOwnProperty(prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
	};

	$.ajax=function(opt){
		opt.type=(opt.type || 'GET').toUpperCase();
		opt.async=opt.async != null ? opt.async : true;
		opt.contentType=opt.contentType!= null ? opt.contentType : true; // za upload mora false
     	opt.dataType=opt.dataType != null ? opt.dataType : "html";
		var xhr=window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
		var status = xhr.status;
		if (status >= 200 && status < 300) {
			if( opt.dataType=='json'){
					opt.success && opt.success( JSON.parse(xhr.responseText), xhr.responseXML);
			  }else{
					opt.success && opt.success(xhr.responseText, xhr.responseXML);
		   	}
	   	} else {
			opt.fail && opt.fail(status);
		   }
		  }
		}
			if(opt.contentType){
	   	if($.isJson(opt.data)){
	    	var arr=[];
	    	for (var name in opt.data) arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(opt.data[name]));
	   	  opt.data = arr.join("&");
	  	 }
	   }
		if (opt.type == "GET") {
			xhr.open("GET", opt.url + "?" + opt.data, opt.async);
			xhr.send(null);
			} else if (opt.type == "POST") {
			xhr.open("POST", opt.url, opt.async);
			if(opt.contentType){
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			xhr.send(opt.data);
		}
	};
	$.get=function(url, data, success) {
		$.ajax({url:url,type:'GET',data:data,success:success});
	};
	$.post=function(url, data, success) {
		$.ajax({url:url,type:'POST',data:data,success:success});
	};
	$.getJSON=function(url,  success) {
		$.ajax({url:url,type:'GET',data:{},dataType:'json',success:success});
	};
	$.models=function($selector,$target,$dismis,fn) {
	fn();
		let modals=document.querySelectorAll($selector);
		[].forEach.call(modals,function(modal){

		modal.addEventListener('click',function(e){
		let modal_target=this.getAttribute($target);
		let tagetEl=document.getElementById(modal_target);
		tagetEl.style.display="none";
		if(this.tagName=='A') e.preventDefault();
		document.body.style.overflow="hidden";
		tagetEl.style.display="block";
		let dismiss=tagetEl.querySelectorAll($dismis);
		[].forEach.call(dismiss,function(dismis){
		dismis.addEventListener('click',function(e){
		document.body.style.overflow="auto";
		tagetEl.style.display="none";
		});
		});
		});
		});
	};
		$.tabe=function($selector) {
			let tabs=document.querySelectorAll($selector);
			[].forEach.call(tabs,function(tab){
			tab.addEventListener('click',function(e){
			e.preventDefault();
			let self=this;
			if(self.classList.contains('disabled')==false){
			[].forEach.call(self.parentNode.children,function(el){
			el.classList.remove('active');
			});
			self.classList.add('active');
			let id=e.target.getAttribute('href').replace(/.*(?=#[^\s]*$)/,'');
			let tabnext=self.parentNode.nextElementSibling;
			[].forEach.call(tabnext.children,function(el){
			el.style.display="none";
			});
			tabnext.querySelector(id).style.display="block";
			}
			});
			});
		};
	$.alert =function($selector){
		let alerts=document.querySelectorAll($selector);
		[].forEach.call(alerts,function(alert){
		alert.addEventListener('click',function(e){
		e.preventDefault();
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
		});
		});
	};
$.nav =function($selector,$navbar,$open) {
	let navs=document.querySelector(selector);
	if(navs!=null){
	navs.addEventListener('click',function(e){
	e.preventDefault();
	let navbars=document.querySelectorAll($navbar);
	[].forEach.call(navbars,function(navbar){
	navbar.classList.toggle($open);
	});
	});
	}
};
$.dropdown =function($selector,$open) {
	let nav_dds=document.querySelectorAll($selector);
	[].forEach.call(nav_dds,function(nav_dd){
	nav_dd.addEventListener('click',function(e){
	e.preventDefault();
	let nextEl=this.nextElementSibling;
	nextEl.classList.toggle($open);
	});
	});
}	;
	function _in(el,rel){
		el=el[rel];
		while(el && el.nodeType !== 1) el=el[rel];
		if(el) return el;
		return false;
	};
$.isWindow =function(value) {
	    return !!value && value === value.window;
	};
	$.isDocument =function(value) {
	    return !!value && value.nodeType === 9;
	}
 $.isDocumentFragment =function(value) {
	    return !!value && value.nodeType === 11;
	};
	$.isElement =function(value) {
	    return !!value && value.nodeType === 1;
	};
  $.isText =function(value) {
	    return !!value && value.nodeType === 3;
	};
  $.isBoolean =function(value) {
	    return typeof value === 'boolean';
	};
	 $.isFunction =function(value) {
	    return typeof value === 'function';
	};
	  $.isString =function(value) {
	    return typeof value === 'string';
	};
	  $.isUndefined=function(value) {
	    return value === undefined;
	};
	$.isNull=function(value) {
	    return value === null;
	};
 $.isNumeric=function(value) {
	    return !isNaN(parseFloat(value)) && isFinite(value);
	};
 $.isPlainObject=function(value) {
	    if (typeof value !== 'object' || value === null)
	        return false;
	    var proto = Object.getPrototypeOf(value);
	    return proto === null || proto === Object.prototype;
	};
})();
