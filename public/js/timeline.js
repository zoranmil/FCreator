var outlineContainer = document.getElementById('outline-container');
var playing = false;
var playStep = 50;
var trackTimelineMovement = false;
var timelineModel = generateModel();
const  timeline = new timelineModule.Timeline();
timeline.initialize({ id: 'timeline', headerHeight: 30,stepPx:20,stepVal:1000 }, timelineModel);
initPlayer();
generateHTMLOutlineListNodes(timelineModel.rows);
document.addEventListener('keydown', function (args) {
    if (args.which === 65 && timeline._controlKeyPressed(args)) {
        timeline.selectAllKeyframes();
        args.preventDefault();
    }
});

 function outlineMouseWheel(event) {
     if (timeline) {
   this.timeline._handleWheelEvent(event);
     }
 }
function generateModel() {

	return { 	rows: [] };
}

function initPlayer() {
    setInterval(() => {
        if (playing) {
            if (timeline) {
                timeline.setTime(timeline.getTime() + playStep);
                moveTimelineIntoTheBounds();
            }
        }
    }, playStep);
}
function moveTimelineIntoTheBounds() {
    if (timeline) {
        if (timeline._startPosMouseArgs || timeline._scrollAreaClickOrDragStarted) {
            // User is manipulating items, don't move screen in this case.
            return;
        }
        const fromPx = timeline.scrollLeft;
        const toPx = timeline.scrollLeft + timeline.getClientWidth();

        let positionInPixels = timeline.valToPx(timeline.getTime()) + timeline._leftMargin();
        // Scroll to timeline position if timeline is out of the bounds:
        if (positionInPixels <= fromPx || positionInPixels >= toPx) {
            this.timeline.scrollLeft = positionInPixels;
        }
    }
}


function removeKeyframe() {
    if (timeline) {
        // Add keyframe
        const currentModel = timeline.getModel();
        if (currentModel && currentModel.rows) {
            currentModel.rows.forEach((row) => {
                if (row.keyframes) {
                    row.keyframes = row.keyframes.filter((p) => !p.selected);
                }
            });


            timeline.setModel(currentModel);
        }
    }
}
function addKeyframe(naziv,id ,toval,min=0,max=0) {

    if (timeline) {
        // Add keyframe
  console.log(min+' '+max)
				let timelineModel =  	{ };
				timelineModel.title=naziv;
				timelineModel.id=id;
				timelineModel.style= {
						height: 40,
						keyframesStyle: {
								shape: 'rect',
								width: 4,
								height: 30,
						},
				};
				timelineModel.keyframes= [
						{
								val:min,
						}
				];
				var tonj={};
        	tonj.val=parseInt(toval)*1000;
        if(max!=0){
          	tonj.val=parseInt(max);
        }

				tonj.max=parseInt(toval)*1000;

				timelineModel.keyframes.push(tonj);
        console.log(timelineModel.keyframes)
				const currentModel = timeline.getModel();
				if (!currentModel) {
						return;
				}
let modell={};
    modell.rows=[]
        currentModel.rows.push(timelineModel);
        currentModel.rows.forEach((row) => {
            if(!deleted.includes(row.id)){
        modell.rows.push(row)

            }

        });
        timeline.setModel(modell);

        // Generate outline list menu
        generateHTMLOutlineListNodes(modell.rows);
    }
}
function showActivePositionInformation() {
    if (timeline) {
        var fromPx = timeline.scrollLeft;
        var toPx = timeline.scrollLeft + timeline.getClientWidth();
        var fromMs = timeline.pxToVal(fromPx - timeline._leftMargin());
        var toMs = timeline.pxToVal(toPx - timeline._leftMargin());
        var positionInPixels = timeline.valToPx(timeline.getTime()) + timeline._leftMargin();
        var message = 'Timeline in ms: ' + timeline.getTime() + 'ms. Displayed from:' + fromMs.toFixed() + 'ms to: ' + toMs.toFixed() + 'ms.';
        message += 'Timeline in px: ' + positionInPixels + 'px. Displayed from: ' + fromPx + 'px to: ' + toPx + 'px';

    }
}
function onPlayClick(event) {
    playing = true;
    trackTimelineMovement = true;
    if (timeline) {
        this.moveTimelineIntoTheBounds();
        timeline.setOptions({ timelineDraggable: false });
    }
}
function onPauseClick(event) {
    playing = false;
    if (timeline) {
        timeline.setOptions({ timelineDraggable: true });
    }
}
function generateHTMLOutlineListNodes(rows) {
    var options = timeline.getOptions();
    var headerElement = document.getElementById('outline-header');
    if (!headerElement) {
        return;
    }
    headerElement.style.maxHeight = headerElement.style.minHeight = options.headerHeight + 'px';
    // headerElement.style.backgroundColor = options.headerFillColor;
    if (!outlineContainer) {

        return;
    }
    outlineContainer.innerHTML = '';

    rows.forEach(function (row, index) {
    //deleted.push(row.id);
    if(!deleted.includes(row.id)){
      var div = document.createElement('div');
      div.classList.add('outline-node');
      const h = (row.style ? row.style.height : 0) || (options.rowsStyle ? options.rowsStyle.height : 0);
      div.style.maxHeight = div.style.minHeight = h + 'px';
      div.style.marginBottom = ((options.rowsStyle ? options.rowsStyle.marginBottom : 0) || 0) + 'px';
      div.innerText = row.title || 'Track ' + index;
      div.id = div.innerText;
      var alreadyAddedWithSuchNameElement = document.getElementById(div.innerText)
      // Combine outlines with the same name:
      if (alreadyAddedWithSuchNameElement) {
          var increaseSize = Number.parseInt(alreadyAddedWithSuchNameElement.style.maxHeight) + h;
          alreadyAddedWithSuchNameElement.style.maxHeight = alreadyAddedWithSuchNameElement.style.minHeight = increaseSize + 'px';

          return
      }
      if (outlineContainer) {
          outlineContainer.appendChild(div);
      }
    }


    });
}
timeline.onTimeChanged(function (event) {
			resizer.hide();
			 let from=0;
			 let to=0;
       let vid  ;
			let parent=parseInt(event.val);

  let all=resizer.get();
			 for (var i = 0; i < all.length; i++) {
       if($("#"+all[i].options.objid).prop("data-deleted")=="1"){
                 continue;
               }
           from=parseInt(	$("#"+all[i].options.objid).prop("data-movefrom"));
				   to=parseInt(	$("#"+all[i].options.objid).prop("data-moveto"));

					 if( parent.between(from, to)){
              if(all[i].options.type == "video"){
                 document.getElementById(all[i].options.videiId).currentTime =parent/1000;
                //document.getElementById(files[i].childId).play();
              }
					let eanimation=	$("#"+all[i].options.objid).prop('data-animate')

					if( eanimation!=""){
						//console.log(parent)
						//	console.log(from)
						if((from+200)==parent ){
							 elementAnimate($("#"+all[i].options.objid)[0],eanimation,$("#"+files[i].objId).prop('data-duration'));

								$("#"+all[i].options.objid).css("display","block");
						}else{

								$("#"+all[i].options.objid).css("display","block");
						}

					}else{
							$("#"+all[i].options.objid).css("display","block");
					}
				 }else{
           if(all[i].options.type == "video"){
              document.getElementById(all[i].options.videiId).currentTime =0;
           }
						  	$("#"+all[i].options.objid).css("display","none");
					 }


			 }
       if(parent>(vremeTrajanja*1000)){

         onPauseClick(event);
         return;
       }
    showActivePositionInformation();
});
timeline.onSelected(function (obj) {
    logMessage('Selected Event: (' + obj.selected.length + '). changed selection :' + obj.changed.length, 2);
});

timeline.onDragStarted(function (obj) {
    logDraggingMessage(obj, 'dragstarted');
});

timeline.onDrag(function (obj) {
    logDraggingMessage(obj, 'drag');
});

timeline.onKeyframeChanged(function (obj) {

});

timeline.onDragFinished(function (obj) {
    logDraggingMessage(obj, 'dragfinished');
});

timeline.onMouseDown(function (obj) {
    var type = obj.target ? obj.target.type : '';
    if (obj.pos) {
        logMessage('mousedown:' + obj.val + '.  target:' + type + '. ' + Math.floor(obj.pos.x) + 'x' + Math.floor(obj.pos.y), 2);
    }
});

timeline.onDoubleClick(function (obj) {
    var type = obj.target ? obj.target.type : '';
    if (obj.pos) {
        logMessage('doubleclick:' + obj.val + '.  target:' + type + '. ' + Math.floor(obj.pos.x) + 'x' + Math.floor(obj.pos.y), 2);
    }
});

timeline.onScroll(function (obj) {
    var options = timeline.getOptions();
    if (options) {
        if (outlineContainer) {
            outlineContainer.style.minHeight = obj.scrollHeight + 'px';
            const outlineElement = document.getElementById('outline-scroll-container');
            if (outlineElement) {
                outlineElement.scrollTop = obj.scrollTop;
            }
        }
    }
    showActivePositionInformation();
});

timeline.onScrollFinished(function (_) {
    logMessage('on scroll finished', 2);
});
var logMessage = function (message, logPanel = 1) {
    if (message) {
		///	console.log(message)

    }
};
var logDraggingMessage = function (object, eventName) {
    if (object.elements) {
			if(eventName=="dragfinished"){
				$("#"+object.elements[0].row.id).prop("data-moveto", object.elements[0].row.keyframes[1].val).prop("data-movefrom", object.elements[0].row.keyframes[0].val);
			}
    }
};
