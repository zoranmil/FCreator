"use strict";
const {
	ipcMain
	, ipcRenderer
	, shell
} = require('electron');
var ffprobeStatic = require('ffprobe-static');
var ffprobe = require('ffprobe');
const ffmpeg = require('fluent-ffmpeg');
const pathToFfmpeg = require('ffmpeg-static')
const {
	writeFile
} = require('fs/promises');
var exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const {
	FFScene
	, FFImage
	, FFText
	, FFVideo
	, FFCreator
} = require('ffcreatorlite');
const {
	createCanvas
	, Canvas
	, loadImage
	, registerFont
	, Image
	, CanvasRenderingContext2D
} = require('canvas');
FFCreator.setFFprobePath(ffprobeStatic.path);
const getAppDataPath = function(folder) {
	switch (process.platform) {
		case "darwin": {
			return path.join(process.env.HOME, "Library", "Application Support", folder);
		}
		case "win32": {
			return path.join(process.env.APPDATA, folder);
		}
		case "linux": {
			return path.join(process.env.HOME, "." + folder);
		}
		default: {
			console.log("Unsupported platform!");
			process.exit(1);
		}
	}
}
var workdir = getAppDataPath("FCreator");
const savepath = "";
var masterDir = workdir + "/master";
let sendtype = "";
const cacheDir = path.join(masterDir, './cache/');
const outputDir = path.join(masterDir, './output/');
const tmpDir = path.join(masterDir, './videotmp/');
if (!fs.existsSync(workdir)) {
	fs.mkdirSync(workdir);
}
if (!fs.existsSync(masterDir)) {
	fs.mkdirSync(masterDir);
}
if (fs.existsSync(masterDir)) {
	if (!fs.existsSync(workdir)) {
		fs.mkdirSync(workdir);
	}
	//  if(!fs.existsSync(tmpDir)) {fs.mkdirSync(tmpDir);}
}
ffmpeg.setFfmpegPath(pathToFfmpeg);
class Scene extends FFScene {
	addBackGroundImage(img, x, y, w, h, scale) {
		const fimg = new FFImage({
			path: img
		});
		fimg.setWH(w, h);
		fimg.setXY(x, y);
		fimg.setScale(scale);
		this.addChild(fimg);
	}
}
const saveProject = function() {
	ipcRenderer.send('save-file');
}
const createFolder = function(f) {
	if (!fs.existsSync(f)) {
		fs.mkdirSync(f);
	} else {
		fs.rm(f, {
			recursive: true
			, force: true
		}, err => {
			if (err) {
				throw err;
			}
			createFolder(f);
		});
	}
}

const sendtoipcForImage = function() {
	ipcRenderer.send('file-request');
}
const sendtoipcForVideo = function() {
	ipcRenderer.send('video-request');
}
$(document).ready(function() {
	createFolder(outputDir);
	createFolder(cacheDir);
})
ipcRenderer.on('save-files', (event, file) => {
	let all = resizer.get();
	let json_files = {};
	let json_obj = {};
	let text, rect;
	json_files.appsetings = appsetings;
	json_files.appdata = [];
	for (var i = 0; i < all.length; i++) {
		if (all[i].options.type == "text") {
			if (all[i].target.getAttribute('data-deleted') == "1") {
				continue;
			}
			json_obj = {}
			json_obj.type = all[i].options.type;
			json_obj.multi = all[i].options.multi;
			json_obj.multi = all[i].options.multi;
			json_obj.objid = all[i].options.objid;
			json_obj.broj = all[i].options.broj;
			json_obj.animate = all[i].target.getAttribute('data-animate');
			json_obj.duration = all[i].target.getAttribute('data-duration');
			son_obj.endanimate = all[i].target.getAttribute('data-endanimate');
			json_obj.emdduration = all[i].target.getAttribute('data-endduration');
			json_obj.dataMoveFrom = all[i].target.getAttribute('data-movefrom');
			json_obj.dataMoveTo = all[i].target.getAttribute('data-moveto');
			json_obj.rotation = all[i].target.angle;
			json_obj.html = all[i].target.innerHTML.replace(/[\r\n]/g, "");
			text = all[i].target.style;
			json_obj.left = text.left;
			json_obj.top = text.top;
			json_obj.width = text.width;
			json_obj.height = text.height;
			json_obj.fontname = text.fontFamily ;
			json_obj.fontsize = text.fontSize;
			if (text.color != '') {
				json_obj.color = hexToRGB(text.color);
			} else {
				json_obj.color = '#000000';
			}
			if (text.backgroundColor != '') {
				json_obj.backgroundColor = hexToRGB(text.backgroundColor);
			} else {
				if (text.background != "") {
					json_obj.backgroundColor = hexToRGB(text.background);
				} else {
					json_obj.backgroundColor = "";
				}
			}
			if (text.padding != '') {
				json_obj.padding = text.padding;
			} else {
				json_obj.padding = 0;
			}
		}
		if (all[i].options.type == "image") {
			json_obj = {}
			json_obj.type = all[i].options.type;
			json_obj.objid = all[i].options.objid;
			json_obj.broj = all[i].options.broj;
			json_obj.animate = all[i].target.getAttribute('data-animate');
			json_obj.duration = all[i].target.getAttribute('data-duration');
			son_obj.endanimate = all[i].target.getAttribute('data-endanimate');
			json_obj.emdduration = all[i].target.getAttribute('data-endduration');
			json_obj.dataMoveFrom = all[i].target.getAttribute('data-movefrom');
			json_obj.dataMoveTo = all[i].target.getAttribute('data-moveto');
			json_obj.childId = all[i].options.obj.childId;
			json_obj.height_orig = all[i].options.obj.height_orig;
			json_obj.width_orig = all[i].options.obj.width_orig;
			json_obj.url = all[i].options.obj.url;
			text = all[i].target.style;
			json_obj.left = text.left;
			json_obj.top = text.top;
			json_obj.width = text.width;
			json_obj.height = text.height;
			json_obj.rotation = all[i].target.angle;
		}
		if (all[i].options.type == "video") {
			json_obj = {}
			json_obj.type = all[i].options.type;
			json_obj.objid = all[i].options.objid;
			json_obj.broj = all[i].options.broj;
			json_obj.animate = all[i].target.getAttribute('data-animate');
			json_obj.duration = all[i].target.getAttribute('data-duration');
			son_obj.endanimate = all[i].target.getAttribute('data-endanimate');
			json_obj.emdduration = all[i].target.getAttribute('data-endduration');
			json_obj.dataMoveFrom = all[i].target.getAttribute('data-movefrom');
			json_obj.dataMoveTo = all[i].target.getAttribute('data-moveto');
			json_obj.childId = all[i].options.obj.childId;
			json_obj.height_orig = all[i].options.obj.height_orig;
			json_obj.width_orig = all[i].options.obj.width_orig;
			json_obj.url = all[i].options.obj.url;
			text = all[i].target.style;
			json_obj.left = text.left;
			json_obj.top = text.top;
			json_obj.width = text.width;
			json_obj.height = text.height;
			json_obj.rotation = all[i].target.angle;
			json_obj.video_duration = all[i].options.obj.duration;
		}
		json_files.appdata.push(json_obj);
	}
	fs.writeFile(file, JSON.stringify(json_files), (err) => {});
});
ipcRenderer.on('VideoFile', (event, file) => {
	ffprobe(file, {
		path: ffprobeStatic.path
	}).then(function(info) {
		let $width_orig = info.streams[0].width;
		let $height_orig = info.streams[0].height;
		let $ratio_orig = $width_orig / $height_orig;
		let $width = 300;
		let $height = 300;
		if ($width / $height > $ratio_orig) {
			$width = $height * $ratio_orig;
		} else {
			$height = $width / $ratio_orig;
		}
		obj = {};
		obj.height_orig = $height_orig + "px";
		obj.width_orig = $width_orig + "px";
		obj.type = "video";
		obj.url = 'file://' + file;
		obj.left = "0px";
		obj.top = "0px";
		obj.width = $width + "px";
		obj.height = $height + "px";
		obj.duration = info.streams[0].duration;
		obj.childId = "video-" + (files.length + 1) + "-" + (files.length + 1);
		obj.objId = "video-" + (files.length + 1);
		files.push(obj);
		html = '<div id="' + obj.objId + '" data-child="' + obj.childId + '" data-endanimate="" data-endduration="0" data-animate="" data-width="' + $width_orig + '" data-url="' + obj
			.url + '" data-deleted="0"  data-duration="0" data-video-duration="' + info.streams[0].duration +
			'" data-movefrom="0" data-moveto="' + (info.streams[0].duration * 1000) + '" class="target" style="top:' + obj.top + ';left:' + obj
			.top + ';width:' + obj.width + ';height:' + obj.height + ';" isLocked="false" isDisabled="false">\
  <video  id="' + obj.childId + '" style="width:' + obj.width + ';height:' + obj.height + ';"  src="' + obj.url + '">\
  <source src="' + obj.url + '" type="video/mp4">\
</video>\
  </div>';
		$("#container").append(html);
		new Dragable($('#' + obj.objId)[0], {
			type: "video"
			, objid: obj.objId
			, broj: (files.length + 1)
			, obj: obj
			, url: obj.url
			, videiId: obj.childId
			, childId: obj.childId
			, onClicked: function(type, elem, target, opt) {
				other(type, elem, target, opt);
			}
			, width_orig: $width_orig
		, }).createVideo();
		addKeyframe("video " + files.length, obj.objId, obj.duration);
		$("#zzzz").removeClass("open");
	}).catch(function(err) {
		console.error(err);
	})
});
ipcRenderer.on('ImgFile', (event, file) => {
	ffprobe(file, {
		path: ffprobeStatic.path
	}).then(function(info) {
		let image = "file://" + file;
		let $width_orig = info.streams[0].width;
		let $height_orig = info.streams[0].height;
		let $ratio_orig = $width_orig / $height_orig;
		let $width = 300;
		let $height = 300;
		if ($width / $height > $ratio_orig) {
			$width = $height * $ratio_orig;
		} else {
			$height = $width / $ratio_orig;
		}
		obj = {};
		obj.type = "image";
		obj.url = image;
		obj.left = "0px";
		obj.top = "0px";
		obj.height_orig = $height_orig + "px";
		obj.width_orig = $width_orig + "px";
		obj.height = $height + "px;";
		obj.width = $width + "px";
		obj.height = $height + "px;";
		obj.childId = "image-" + (files.length + 1) + "-" + (files.length + 1);
		obj.objId = "image-" + (files.length + 1);
		files.push(obj);
		let css = '';
		let imgcss = '';
		if (typeof obj.left !== "undefined") {
			css += 'left:' + obj.left + ";";
		}
		if (typeof obj.top !== "undefined") {
			css += 'top:' + obj.top + ";";
		}
		if (typeof obj.width !== "undefined") {
			css += 'width:' + obj.width + ";";
			imgcss += 'width:' + obj.width + ";";
		}
		if (typeof obj.height !== "undefined") {
			css += 'height:' + obj.height + ";";
			imgcss += 'height:' + obj.height + ";";
		}
		if (typeof obj.transform !== "undefined") {
			css += 'transform:' + obj.transform + ";";
		}
		css = css.replace(";;", ";");
		imgcss = imgcss.replace(";;", ";");
		html = '<div id="' + obj.objId + '" class="target" style="' + css + '" data-url="' + obj.url + '"  data-width="' + $width_orig +
			'"  data-endanimate="" data-endduration="0" data-animate="" data-deleted="0"  data-duration="0" data-movefrom="0" data-moveto="' + (vremeTrajanja * 1000) + '"  isLocked="false" isDisabled="false">\
    <img id="' + obj.childId + '" src="' + obj.url + '" style="' + imgcss + '">\
   		 </div>';
		$("#container").append(html);
		new Dragable(document.querySelector('#' + obj.objId), {
			type: "image"
			, objid: obj.objId
			, broj: (files.length + 1)
			, obj: obj
			, imageId: document.querySelector('#' + obj.childId)
			, onClicked: function(type, elem, target, opt) {
				other(type, elem, target, opt);
			}
			, width_orig: $width_orig
		, }).createImg();
		addKeyframe("image " + files.length, obj.objId, vremeTrajanja);
		$("#zzzz").removeClass("open");
	}).catch(function(err) {
		console.error(err);
	})
});

function KreateVideo() {
	ipcRenderer.send('save-video-file');
}


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
	return animation;
}
