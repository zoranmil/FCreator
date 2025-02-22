const
{
	ipcMain
	, ipcRenderer
	, shell
} = require('electron');
var ffprobeStatic = require('ffprobe-static');
var ffprobe = require('ffprobe');
const ffmpeg = require('fluent-ffmpeg');
const pathToFfmpeg = require('ffmpeg-static')
const fs = require('fs');
const
{
	writeFile
} = require('fs/promises');
var exec = require('child_process').exec;
const path = require('path');
const
{
	FFScene
	, FFImage
	, FFText
	, FFVideo
	, FFCreator
} = require('ffcreatorlite');
const
{
	createCanvas
	, Canvas
	, loadImage
	, registerFont
	, Image
	, CanvasRenderingContext2D
} = require('canvas');
FFCreator.setFFprobePath(ffprobeStatic.path);
let scenaid = 0;
let appsetings = {
	'width': 1280
	, 'height': 720,
	'audio':null
};
ipcRenderer.on('save-files', (event, file) =>
{
	fs.writeFile(file, JSON.stringify(allscenes), (err) =>
	{});
});
ipcRenderer.on('old-config', (event, config) =>
{
	let start = 0;
	allscenes = config;
	appsetings.width = allscenes[0].width;
	appsetings.height = allscenes[0].height;
	appsetings.audio= allscenes[0].audio;
	items.clear();
	for (var i = 0; i < allscenes.length; i++)
	{
		items.add(editTimeline(i, start, start + allscenes[i].time));
		if (allscenes[i].effects !== undefined)
		{
			if (allscenes[i].effects != null)
			{
				obj = {
					group: 1
					, start: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time - 1)
					, end: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time + 1)
					, content: addDiv(i)
				};
				items.add(obj);
			}
		}
		start = start * 1 + allscenes[i].time;
	}
	if(appsetings.audio!=null){
		obj = {
			group: 2
			, start: new Date(2010, 1, 1, 0, 0, 0)
			, end: new Date(2010, 1, 1, 0, 0, start)
			, content: addAudioDiv()
		};
		items.add(obj);
	}
});
ipcRenderer.on('main-config', (event, config) =>
{
	scenaid = config.appsetings.scena;
	id = scenaid - 1;
	allscenes[id] = config.appsetings;
	allscenes[id].appdata = config.appdata;
	$("#add-effects").removeAttr("disabled");
	$("#del-scene").removeAttr("disabled");
	$("#edit-scene").removeAttr("disabled");
	$("#go-sto-scene").removeAttr("disabled");
});
ipcRenderer.on('config', (event, config) =>
{
	appsetings = config;
});

function saveProject()
{
	ipcRenderer.send('save-file');
}

function createScene()
{
	if ($("#zzzz").hasClass("open"))
	{
		$("#zzzz").removeClass("open");
		return;
	}
	$("#add-effects").attr("disabled", "disabled");
	$("#del-scene").attr("disabled", "disabled");
	$("#edit-scene").attr("disabled", "disabled");
	$("#go-sto-scene").attr("disabled", "disabled");
	let start = 0;
	$("#zzzz").addClass("open");
	$("#ostalo").html(SceneEdit);
	$("#vremetrajanja").val(0);
	$("#btnvreme").html("Dodaj novu scenu");
	$("#btnvreme").on("click", function()
	{
		$("#zzzz").removeClass("open");
	})
	document.querySelector('#color').style.background = "#FFFFFF";
	const parent = document.querySelector('#color');
	const picker = new Picker(parent);
	picker.onChange = function(color)
	{
		parent.style.background = color.hex();
	};
	$("#btnvreme").on("click", function()
	{
		if ($("#vremetrajanja").val() == "0" || $("#vremetrajanja").val() == "")
		{
			Notifymsg("Ubaveštenje", "Odaberite vreme trajanja anomacije");
			return;
		}
		obj = {};
		obj.time = parseInt($("#vremetrajanja").val());
		obj.background = parent.style.background;
		obj.width = appsetings.width;
		obj.height = appsetings.height;
		obj.audio =appsetings.audio;
		obj.effects = null;
		obj.appdata = [];
		allscenes.push(obj);
		items.clear();
		for (var i = 0; i < allscenes.length; i++)
		{
			items.add(editTimeline(i, start, start + allscenes[i].time));
			if (allscenes[i].effects !== undefined)
			{
				if (allscenes[i].effects != null)
				{
					obj = {
						group: 1
						, start: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time - 1)
						, end: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time + 1)
						, content: addDiv(i)
					};
					items.add(obj);
				}
			}
			start = start * 1 + allscenes[i].time;

		}
		if(appsetings.audio!=null){
			obj = {
				group: 2
				, start: new Date(2010, 1, 1, 0, 0, 0)
				, end: new Date(2010, 1, 1, 0, 0, start)
				, content: addAudioDiv()
			};
			items.add(obj);
		}
		scenaid = allscenes.length;
		$("#add-effects").removeAttr("disabled");
		$("#del-scene").removeAttr("disabled");
		$("#edit-scene").removeAttr("disabled");
		$("#go-sto-scene").removeAttr("disabled");
		$("#zzzz").removeClass("open");
	})
}

function dodajEfect(id, tid)
{
	let newt = [];
	allscenes[tid - 1].effects = id;
	$("#zzzz").removeClass("open");
	items.clear();
	let start = 0;
	for (var i = 0; i < allscenes.length; i++)
	{
		// console.log(i+' '+start+' '+(allscenes[i].time*1))
		items.add(editTimeline(i, start, start + allscenes[i].time));
		if (allscenes[i].effects !== undefined)
		{
			if (allscenes[i].effects != null)
			{
				console.log(i + ' ' + start + ' ' + allscenes[i].effects)
				obj = {
					group: 1
					, start: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time - 1)
					, end: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time + 1)
					, content: addDiv(i)
				};
				items.add(obj);
			}
		}
		start = start * 1 + allscenes[i].time;
	}
	if(appsetings.audio!=null){
		obj = {
			group: 2
			, start: new Date(2010, 1, 1, 0, 0, 0)
			, end: new Date(2010, 1, 1, 0, 0, start)
			, content: addAudioDiv()
		};
		items.add(obj);
	}
}

function Deleffect(id)
{
	allscenes[id].effects = null;
	items.clear();
	let start = 0;
	for (var i = 0; i < allscenes.length; i++)
	{
		items.add(editTimeline(i, start, start + allscenes[i].time));
		if (allscenes[i].effects !== undefined)
		{
			if (allscenes[i].effects != null)
			{
				obj = {
					group: 1
					, start: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time - 1)
					, end: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time + 1)
					, content: addDiv(i)
				};
				items.add(obj);
			}
			start = start * 1 + allscenes[i].time;
		}
	}
	if(appsetings.audio!=null){
		obj = {
			group: 2
			, start: new Date(2010, 1, 1, 0, 0, 0)
			, end: new Date(2010, 1, 1, 0, 0, start)
			, content: addAudioDiv()
		};
		items.add(obj);
	}
}
function DelAudio(){
	appsetings.audio=null;
	items.clear();
	let start = 0;
	for (var i = 0; i < allscenes.length; i++)
	{
		allscenes[i].audio=null;
		items.add(editTimeline(i, start, start + allscenes[i].time));
		if (allscenes[i].effects !== undefined)
		{
			if (allscenes[i].effects != null)
			{
				obj = {
					group: 1
					, start: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time - 1)
					, end: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time + 1)
					, content: addDiv(i)
				};
				items.add(obj);
			}
			start = start * 1 + allscenes[i].time;
		}
	}
}
function addAudioDiv(){
	let html = '<button class = "scene-button"   onclick = "DelAudio();" > \
 <span class = "app-console-menu-button__icon" > \
  <svg width = "18px" height = "18px"   xmlns = "http://www.w3.org/2000/svg"\
 xmlns: xlink = "http://www.w3.org/1999/xlink" > \
  <use xlink: href = "#delete-all" > </use>\
   </svg> </span>\
   </button>';
	return html;
}
function addDiv(id)
{
	let html = '<img src = "img/' + allscenes[id].effects + '.gif"   style = "width:32px;" >'
	html += '<button class = "scene-button"   onclick = "Deleffect(' + id + ');" > \
 <span class = "app-console-menu-button__icon" > \
  <svg width = "18px" height = "18px"   xmlns = "http://www.w3.org/2000/svg"\
 xmlns: xlink = "http://www.w3.org/1999/xlink" > \
  <use xlink: href = "#delete-all" > </use>\
   </svg> </span>\
   </button>';
	return html;
}

function addEffects()
{
	if ($("#zzzz").hasClass("open"))
	{
		$("#zzzz").removeClass("open");
		return;
	}
	id = scenaid;
	$("#zzzz").addClass("open");
	$("#ostalo").html(VideoEffects(id));
}

function appclose()
{
	$("#zzzz").removeClass("open");
	$("#ostalo").html('');
}
let allscenes = [];
let scenes = [];
var container = document.getElementById('timeline');
let obj = {};
addTimeline();
var options = {
	stack: true
	, editable: true
	, width: '100%'
	, height: '320px'
	, selectable: false
	, autoResize: false
	, showMajorLabels: false
	, showMajorLabels: false
	, showCurrentTime: false
	, margin:
	{
		item: 0
		, axis: 40
	}
	, editable:
	{
		add: true
		, remove: true
		, updateGroup: false
		, updateTime: true
		, overrideItems: false
	}
};
var groups = new timeline.DataSet([
	{
		id: 2
		, content: 'Audio'
		, value: 1
	},{
		id: 1
		, content: 'Effect'
		, value: 1
	}


	, {
		id: 0
		, content: 'Scena'
		, value: 2
	},

              ]);
var items = new timeline.DataSet(scenes);
var timeline = new timeline.Timeline(container);
timeline.setOptions(options);
timeline.setGroups(groups);
timeline.setItems(items);
timeline.on('select', function(properties)
{
	//  alert('selected items: ' + properties.nodes);
});
Number.prototype.between = function(a, b)
{
	var min = Math.min(a, b)
		, max = Math.max(a, b);
	return this > min && this < max;
};
$(document).ready(function()
{
	$("#add-effects").attr("disabled", "disabled");
	$("#del-scene").attr("disabled", "disabled");
	$("#edit-scene").attr("disabled", "disabled");
	$("#go-sto-scene").attr("disabled", "disabled");

});

function EditSetings()
{
	id = scenaid;
	if ($("#zzzz").hasClass("open"))
	{
		$("#zzzz").removeClass("open");
		return;
	}
	$("#zzzz").addClass("open");
	$("#ostalo").html(SceneEdit);
	$("#vremetrajanja").val(allscenes[id - 1].time);
	document.querySelector('#color').style.background = allscenes[id - 1].background;
	const parent = document.querySelector('#color');
	const picker = new Picker(parent);
	picker.onChange = function(color)
	{
		allscenes[id - 1].background = color.hex();
		parent.style.background = color.hex();
	};
	$("#btnvreme").on("click", function()
	{
		allscenes[id - 1].time = parseInt($("#vremetrajanja").val());
		allscenes[id - 1].background = parent.style.background;
		items.clear();
		let start = 0;
		for (var i = 0; i < allscenes.length; i++)
		{
			items.add(editTimeline(i, start, start + allscenes[i].time));
			if (allscenes[i].effects !== undefined)
			{
				if (allscenes[i].effects != null)
				{
					obj = {
						group: 1
						, start: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time - 1)
						, end: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time + 1)
						, content: addDiv(i)
					};
					items.add(obj);
				}
			}
			start = start * 1 + allscenes[i].time;
		}
		if(appsetings.audio!=null){
			obj = {
				group: 2
				, start: new Date(2010, 1, 1, 0, 0, 0)
				, end: new Date(2010, 1, 1, 0, 0, start)
				, content: addAudioDiv()
			};
			items.add(obj);
		}
		$("#zzzz").removeClass("open");
	})
}

function editTimeline(tid, time, end)
{
	let pocetak = new Date(2010, 1, 1, 0, 0, time);
	let kraj = new Date(2010, 1, 1, 0, 0, end);
	return {
		group: 0
		, start: pocetak
		, end: kraj
		, content: ' <div cless = "row" > \
               <div class = "col-md-12" > Scena ' + (tid + 1) + '\
                <button class = "scene-button"   onclick = "osvezi(' + (tid + 1) + ');" > \
               <span class = "app-console-menu-button__icon" > \
                <svg width = "18px" height = "18px"   xmlns = "http://www.w3.org/2000/svg"\
               xmlns: xlink = "http://www.w3.org/1999/xlink" > \
                <use xlink: href = "#edit-all" > </use>\
                 </svg> </span>\
                 </button>\
                  </div> </div>'
	};
}

function addTimeline()
{
	obj = {
		group: 0
		, start: new Date(2010, 1, 1, 0, 0, 0)
		, end: new Date(2010, 1, 1, 0, 0, 0)
		, content: ''
	};
	scenes.push(obj);
}

function osvezi(id)
{
	scenaid = id;
	$("#add-effects").removeAttr("disabled");
	$("#del-scene").removeAttr("disabled");
	$("#edit-scene").removeAttr("disabled");
	$("#go-sto-scene").removeAttr("disabled");
}

function gotoScene(id)
{
	id = scenaid - 1;
	allscenes[id].scena = scenaid;
	ipcRenderer.send('send-to-animation-config', allscenes[id]);
}

function deleteScene()
{
	id = scenaid - 1;
	scenaid = 0;
	$("#add-effects").attr("disabled", "disabled");
	$("#del-scene").attr("disabled", "disabled");
	$("#edit-scene").attr("disabled", "disabled");
	$("#go-sto-scene").attr("disabled", "disabled");
	if (allscenes.length == 1)
	{
		allscenes = [];
		items.clear();
		addTimeline();
		return;
	}
	let news = [];
	for (var i = 0; i < allscenes.length; i++)
	{
		if (i != id)
		{
			news.push(allscenes[i]);
		}
	}
	allscenes = news;
	items.clear();
	let start = 0;
	for (var i = 0; i < allscenes.length; i++)
	{
		items.add(editTimeline(i, start, start + allscenes[i].time));
		if (allscenes[i].effects !== undefined)
		{
			if (allscenes[i].effects != null)
			{
				obj = {
					group: 1
					, start: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time - 1)
					, end: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time + 1)
					, content: addDiv(i)
				};
				items.add(obj);
			}
		}
		start = start * 1 + allscenes[i].time;
	}
	if(appsetings.audio!=null){
		obj = {
			group: 2
			, start: new Date(2010, 1, 1, 0, 0, 0)
			, end: new Date(2010, 1, 1, 0, 0, start)
			, content: addAudioDiv()
		};
		items.add(obj);
	}
}

function Notifymsg(t, opis)
{
	vNotify.info(
	{
		text: opis
		, title: t
		, position: "center"
		, visibleDuration: 3000
	});
}
const getAppDataPath = function(folder)
{
	switch (process.platform)
	{
		case "darwin":
		{
			return path.join(process.env.HOME, "Library", "Application Support", folder);
		}
		case "win32":
		{
			return path.join(process.env.APPDATA, folder);
		}
		case "linux":
		{
			return path.join(process.env.HOME, "." + folder);
		}
		default:
		{
			console.log("Unsupported platform!");
			process.exit(1);
		}
	}
}
var workdir = getAppDataPath("FCreator");
const savepath = "";
var masterDir = workdir + "/master";
const cacheDir = path.join(masterDir, './cache/');
const outputDir = path.join(masterDir, './output/');
const tmpDir = path.join(masterDir, './videotmp/');

const createFolder = function(f)
{
	if (!fs.existsSync(f))
	{
		fs.mkdirSync(f);
	}
	else
	{
		fs.rm(f
		, {
			recursive: true
			, force: true
		}, err =>
		{
			if (err)
			{
				throw err;
			}
			createFolder(f);
		});
	}
}
const hexToRGB = function(rgb) {
   if (typeof rgb === "undefined") {
     rgb='' ;
   }
    if( rgb==''){
      return  rgb;
    }
    console.log(rgb)
   let str=  rgb.split("#");
    if( str.length>1){
      return  rgb;
    }
	var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
	var result, r, g, b, hex = "";
	if ((result = rgbRegex.exec(rgb))) {
		r = componentFromStr(result[1], result[2]);
		g = componentFromStr(result[3], result[4]);
		b = componentFromStr(result[5], result[6]);
		hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
	return hex;
}
function componentFromStr(numStr, percent) {
	var num = Math.max(0, parseInt(numStr, 10));
	return percent ? Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}
function KreateVideo()
{
	ipcRenderer.send('save-video-file');
}
ipcRenderer.on('save-video-files', (event, file) =>
{
	saveVideo(file)
})
ipcRenderer.on('AudioFile', (event, file) =>
{
	appsetings.audio=file;
	for (var i = 0; i < allscenes.length; i++)
	{
  	allscenes[i].audio=file;
	}
	start=0;
	items.clear();
	for (var i = 0; i < allscenes.length; i++)
	{
		items.add(editTimeline(i, start, start + allscenes[i].time));
		if (allscenes[i].effects !== undefined)
		{
			if (allscenes[i].effects != null)
			{
				obj = {
					group: 1
					, start: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time - 1)
					, end: new Date(2010, 1, 1, 0, 0, start + allscenes[i].time + 1)
					, content: addDiv(i)
				};
				items.add(obj);
			}
		}
		start = start * 1 + allscenes[i].time;

	}
	if(appsetings.audio!=null){
		obj = {
			group: 2
			, start: new Date(2010, 1, 1, 0, 0, 0)
			, end: new Date(2010, 1, 1, 0, 0, start)
			, content: addAudioDiv()
		};
		items.add(obj);
	}
})
function addAudio(){
	ipcRenderer.send('get-audio-file');
}
function closePopap(id)
{
	$("#" + id).hide();
}
FFCreator.setFFprobePath(ffprobeStatic.path);
FFCreator.setFFmpegPath(pathToFfmpeg);
ffmpeg.setFfmpegPath(pathToFfmpeg);
function getAnimationName(name) {
	let animation = "";
	switch (name) {
		case 'slideInRight':
			animation = "moveInRight";
			break;
		case 'slideInLeft':
			animation = "moveInLeft";
			break;
		case 'bounceInDown':
			animation = "moveInUpBack";
			break;
		case 'bounceInUp':
			animation = "moveInBottomBack";
			break;
		default:
			animation = name;
	}
	console.log(animation);
	return animation;
}
function getTransition(id){
	id=parseInt(id);
	let fades="fade fadeblack fadewhite distance wipeleft wiperight wipeup wipedown slideleft slideright slideup slidedown";
	fades+=" smoothleft smoothright smoothup smoothdown circlecrop rectcrop circleclose circleopen horzclose horzopen ";
	fades+="vertclose vertopen diagbl diagbr diagtl diagtr hlslice hrslice vuslice vdslice dissolve pixelize radial hblur";
	fades+="wipetl wipetr wipebl wipebr fadegrays squeezev squeezeh zoomin";
	let sss=fades.split(" ");

		if (sss[id-1] !== undefined)
	  	{
				if(sss[id-1]!=""){
					console.log(sss[id-1])
			    	return sss[id-1];
				}else{
						return 'fade';
				}

			}else{
					return 'fade';
			}

}

function saveVideo(file)
{
 var  creator ;

	if (allscenes.length == "0")
	{
		Notifymsg("Ubaveštenje", "Kreirajte anomaciju");
		return;
	}

let ext=path.extname(file).slice(1);
if(ext=="gif"){
	file=file.replace(".gif",".mp4");
}
//	if(allscenes.length==1){
if(appsetings.audio!=null){
	if (fs.existsSync(appsetings.audio))
	{
	creator = new FFCreator(
	{
		cacheDir
		, width: appsetings.width
		, height: appsetings.height
		, log: true
		, output: file,
			audio:  appsetings.audio,
	});
}else{
	creator = new FFCreator(
	{
		cacheDir
		, width: appsetings.width
		, height: appsetings.height
		, log: true
		, output: file,
	});
}
}else{
	creator = new FFCreator(
	{
		cacheDir
		, width: appsetings.width
		, height: appsetings.height
		, log: true
		, output: file,
	});
}

		for (var i = 0; i < allscenes.length; i++)
		{
			allobject = allscenes[i].appdata;
			if (allobject.length)
			{
	     creator.addChild(fcreateScene(allobject,allscenes[i] ,i));
			}

		}
		creator.start();
		creator.openLog();
		$("#video-svojstava").show();
		creator.on('start', () => {
			$("#start-video").html("FCreator start");
			console.log(`FFCreatorLite start`);
		});
		creator.on('error', e => {
				console.log(e)
			$("#start-video").html(`FCreator error `+ e.error);
		});
		creator.on('progress', e => {
			$("#start-video").html(`FCreator progress: ${(e.percent * 100) >> 0}%`);
		$('#progress-video').css('width',e.percent * 100+"%")
			console.log(`FFCreatorLite progress: ${(e.percent * 100) >> 0}%`);
		});
		creator.on('complete', e => {
			$("#start-video").html(`FCreator zavrsio:  ${e.useage} `);
			$("#video-svojstava").hide();
			 createFolder(cacheDir);
			 if(ext=="gif"){
				ffmpeg()
					.input(file)
					.complexFilter([
						'fps=10, scale=360:-1'
					])
					.save(file.replace(".mp4",".gif"))
					.on('end',function(){
						fs.unlink(file,   (err => {     if (err) console.log(err);   }));
					} );
			 }
		});

}

function fcreateScene(allobject,allscenes,i ){
	let  text, timgpath = "", Options, cic, out, stream, image, canvas, textBlock, fvideo, scene, appdata,background,scale;

			scene = new FFScene();

			scene.setBgColor(hexToRGB( allscenes.background));

			for (var m = 0; m < allobject.length; m++)
			{
       	console.log(allobject[m].dataMoveTo)

				if (allobject[m].type == "text")
				{
					 background=hexToRGB( allobject[m].backgroundColor);
					if( background=="")  {
							background= "transparent";
					}
					Options = {
						fontSize: allobject[m].fontsize.replace("px", "") * 1
						, lineHeight: allobject[m].fontsize.replace("px", "") * 1 + 6
						, padding: allobject[m].padding.replace("px", "") * 1
						, backgroundColor:background
						, color: hexToRGB(allobject[m].color)
					};
					if (allobject[m].fontname != '')
					{
						Options.fontFamily = allobject[m].fontname;
					}
					timgpath = path.join(tmpDir, '/tekst' + i + '-' + m + '.png');
				 canvas = createCanvas(allobject[m].width.replace("px", "") * 1 + 10 + 2 * allobject[m].padding.replace("px", ""), allobject[m].height.replace("px", "") * 1 + 10 + 2 * allobject[m].padding.replace("px", ""));
					textBlock = new CanvasTextBlock(canvas, 0, 0, allobject[m].width.replace("px", ""), allobject[m].height.replace("px", ""), Options);
					textBlock.setText(allobject[m].html.toString());
					Options = {
						src: canvas.toBuffer()
						, rotation: allobject[m].rotation
					};
					cic = rotateimg(Options);
					out = fs.createWriteStream(timgpath);
					stream = cic.createPNGStream();
					stream.pipe(out);
					image= new FFImage({
						path: timgpath
						, x: allobject[m].left.replace("px", "")
						, y: allobject[m].top.replace("px", "")
					});
					if (allobject[m].animate != '') {

						image.addEffect({
							type: getAnimationName(allobject[m].animate)
							, time: allobject[m].dataMoveFrom/1000
							, delay: allobject[m].duration
						});

					}else{
								if( allobject[m].dataMoveFrom/1000>0.5){
							image.addEffect('fadeIn', allobject[m].dataMoveFrom/1000, 1);
						}
					}
					if (allobject[m].endanimate != '') {
             image.addEffect(allobject[m].endanimate,(allobject[m].dataMoveTo/1000-allobject[m].endduration)-0.5, allobject[m].endduration);

					}else{
						if((allscenes.time-1)> allobject[m].dataMoveTo/1000){
						 image.addEffect('show',allobject[m].dataMoveTo/1000, 0.5)
								}
					}

				 scene.addChild(image);
			 }else 	if (allobject[m].type == "image"){
				 timgpath = path.join(tmpDir, '/image' + i + '-' + m + '.png');
				 Options = {
					src: fs.readFileSync(allobject[m].url.replace("file://", ""))
					, rotation: allobject[m].rotation
				};
				cic = rotateimg(Options);
				out = fs.createWriteStream(timgpath);
				stream = cic.createPNGStream();
				stream.pipe(out);
				image= new FFImage({
					path: timgpath
					, x: allobject[m].left.replace("px", "")
					, y: allobject[m].top.replace("px", "")
				});

				scale=allobject[m].height.replace("px", "")/allobject[m].height_orig.replace("px", "")
					if(scale!=0){
						image.setScale(scale);
					}
					if (allobject[m].animate != '') {

						image.addEffect({
							type: getAnimationName(allobject[m].animate)
							, time: allobject[m].dataMoveFrom/1000
							, delay: allobject[m].duration
						});

					}else{
						if( allobject[m].dataMoveFrom/1000>0.5){
								image.addEffect('fadeIn', allobject[m].dataMoveFrom/1000, 1);
						}

					}
					if (allobject[m].endanimate != '') {
             image.addEffect(allobject[m].endanimate,(allobject[m].dataMoveTo/1000-allobject[m].endduration)-0.5, allobject[m].endduration);

					}else{
						if((allscenes.time-1)> allobject[m].dataMoveTo/1000){
						 image.addEffect('show',allobject[m].dataMoveTo/1000, 0.5);
								}
					}
			 scene.addChild(image);
		 }else if (allobject[m].type == "video") {
			 scale=allobject[m].height.replace("px", "")/allobject[m].height_orig.replace("px", "")

			 fvideo = new FFVideo({
				 path: allobject[m].url.replace("file://", "")
				 , audio: false
				 , x: allobject[m].left.replace("px", "")
				 , y: allobject[m].top.replace("px", "")
			 });

			 if(scale!=0){
					fvideo.setScale(scale);
				}
				if (allobject[m].animate != '') {

					fvideo.addEffect({
						type: getAnimationName(allobject[m].animate)
						, time: allobject[m].dataMoveFrom/1000
						, delay: allobject[m].duration
					});

				}else{
							if( allobject[m].dataMoveFrom/1000>0.5){
						fvideo.addEffect('fadeIn', allobject[m].dataMoveFrom/1000, 1);
					   }
				}
				if (allobject[m].endanimate != '') {
					 fvideo.addEffect(allobject[m].endanimate,(allobject[m].dataMoveTo/1000-allobject[m].endduration)-0.5, allobject[m].endduration);

				}else{
					if((allscenes.time-1)> allobject[m].dataMoveTo/1000){
					 fvideo.addEffect('show',allobject[m].dataMoveTo/1000, 0.5)
							}
				}
				 scene.addChild(fvideo);
		 }
			}

			scene.setDuration(allscenes.time);


			if(allscenes.effects!=null){

			   scene.setTransition(getTransition(allscenes.effects), 1.5);
			}
		return scene;
}
