// zoom in out of cells / snap to viewing single one
// mouse is focus
// solaris
// undefeated stanislov

var canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d');

document.body.appendChild(canvas)

var boxes = []
var BOX_WIDTH = 100,
	BOX_HEIGHT = 200
var space = 20

for (var i = 0; i < 100; i++) {
	boxes.push({
		x: Math.random()*2000 - 1000,
		y: Math.random()*2000 - 1000,
		width: BOX_WIDTH,
		height: BOX_HEIGHT
	})
}

var zoom = 1, 
	mouse = {
		x: 0,
		y: 0,
		dragging: false,
	},
	offset = {
		x: 1000,
		y: 1000,
	}


function screenX(x){
	return (x - offset.x) * zoom + canvas.width/2
}

function worldX(x){
	return (x - canvas.width/2) / zoom + offset.x
}

function screenY(y){
	return (y - offset.y) * zoom + canvas.height/2
}

function worldY(y){
	return (y - canvas.height/2) / zoom + offset.y
}

function drawBox(box){
	ctx.fillStyle = box.color
	ctx.strokeRect(
		screenX(box.x),
		screenY(box.y),
		box.width*zoom,
		box.height*zoom)

	var grd=ctx.createLinearGradient(screenX(box.x),
		screenY(box.y),
		screenX(box.x) + box.width*zoom,
		screenY(box.y) + box.height*zoom);
	grd.addColorStop(0,"black");
	grd.addColorStop(1,"white");

	ctx.fillStyle=grd;
	ctx.fillRect(
		screenX(box.x),
		screenY(box.y),
		box.width*zoom,
		box.height*zoom)

	if(box === mouse.focus){
		// var s = (box.width*zoom)/2 / parseInt(editor.style.width)
		// editor.style.transform = 'translate('+ screenX(box.x)/2  +'px, '+ screenY(box.y)/2 +'px)  scale('+ s +', '+ s +')'
		// editor.style.height = box.height * zoom / 2 / s+ 'px'
	}
}


function drawMarker(box){
	ctx.fillRect(
		screenX(box.x) - box.width/2,
		screenY(box.y) - box.height/2,
		box.width,
		box.height)
}

function contains(box, point){
	return point.x >= box.x
		&& point.x <= box.x + box.width
		&& point.y >= box.y
		&& point.y <= box.y + box.height;
}


function sigmoid(x){
	return 1 / (1 + Math.exp(-x))
}
var lasttick
function tick(t){
	requestAnimationFrame(tick)
	var dt = t - lasttick

	canvas.width = window.innerWidth * 2
	canvas.height = window.innerHeight * 2
	canvas.style.width = window.innerWidth + 'px'
	canvas.style.height = window.innerHeight + 'px'

	// editor.style.width = window.innerWidth - 200 + 'px'
	// editor.style.height = '400px'


	if(!mouse.dragging){
		mouse.focus = boxes.find(box => contains(box, mouse))	
	}
	
	if(mouse.focus) mouse.focus.color = 'red'

	// for (var i = boxes.length - 1; i >= 0; i--) {
	// 	drawBox(boxes[i])
	// 	boxes[i].color = 'rgba(0,0,0,0.8)'


	// 	if(mouse.focus === boxes[i] && mouse.dragging) continue;
	// 	var damp = 0.9;
	// 	var newX = Math.round(boxes[i].x / (BOX_WIDTH + space)) * (BOX_WIDTH + space),
	// 		newY = Math.round(boxes[i].y / (BOX_HEIGHT + space)) * (BOX_HEIGHT + space)

	// 	boxes[i].x = boxes[i].x * damp + newX * (1- damp);
	// 	boxes[i].y = boxes[i].y * damp + newY * (1- damp);
	// }



	function distort(x, y){
		// return [
		// 	(x - offset.x) * zoom + canvas.width/2, 
		// 	(y - offset.y) * zoom + canvas.height/2
		// ]

		var aspect_ratio = innerHeight / innerWidth;

		var dx = (i - offset.x) * aspect_ratio,
			dy = (j - offset.y),
			r = Math.sqrt(dx*dx + dy*dy),
			theta = Math.atan2(dy, dx);

		// var s = sigmoid(100 - r)
		// var r_ = Math.pow(r, 1/zoom) * zoom;
		// var r_ = r * zoom;
		if(zoom < 1){
			var r_ = r * zoom;
		}else{
			var r_ = (r < 100) ? (r * zoom) : (100*zoom+r-100)	
		}
		
		return [
			r_ * Math.cos(theta) / aspect_ratio + canvas.width/2,
			r_ * Math.sin(theta) + canvas.height/2
		]
	}


	
	for(var i = 0; i < 2000; i+=50){
		ctx.beginPath()
		// ctx.moveTo(...distort(i, 0))
		for(var j = 0; j < 2000; j+=50){
			ctx.lineTo(...distort(i, j))
		}
		ctx.stroke()
	}
	


	
	for(var j = 0; j < 2000; j+=50){
		// ctx.moveTo(...distort(0, j))
		ctx.beginPath()
		for(var i = 0; i < 2000; i+=50){	
			ctx.lineTo(...distort(i, j))
		}
		ctx.stroke()
	}

	// for(var i = 0; i < 2000; i+=50){
	// 	for(var j = 0; j < 2000; j+=50){

	// 		var dx = i - offset.x,
	// 			dy = j - offset.y;
	// 		var r = Math.sqrt(dx*dx + dy*dy);
	// 		var theta = Math.atan2(dy, dx);

	// 		var frac = sigmoid(r / 100);
	// 		var r_ = frac * r * zoom + (1 - frac) * 1;
	// 		ctx.fillRect(
	// 			// screenX(i),
	// 			// screenY(j),
	// 			// (i - offset.x) * zoom + canvas.width/2,
	// 			// (j - offset.y) * zoom + canvas.height/2,
	// 			r_ * Math.cos(theta) + canvas.width/2,
	// 			r_ * Math.sin(theta) + canvas.height/2,
	// 			20 * zoom,
	// 			20 * zoom)
	// 	}
	// }

	// if(!mouse.focus){
	// 	editor.style.display = 'none'
	// } else {
	// 	editor.style.display = 'block'
	// }

	// snapOffset(.8)
	updateMouse()


	// drawBox({
	// 	x: 0,
	// 	y: 0,
	// 	width: 2000,
	// 	height: 2000
	// })

	// ctx.fillStyle='red'
	// drawMarker({
	// 	x: mouse.x,
	// 	y: mouse.y,
	// 	width: 20,
	// 	height: 20
	// })

	// ctx.fillStyle='blue'
	// drawMarker({
	// 	x: offset.x,
	// 	y: offset.y,
	// 	width: 20,
	// 	height: 20
	// })

}


requestAnimationFrame( t => {
	lasttick = t
	requestAnimationFrame(tick)
})


function updateMouse(e){
	if(e){
		mouse.screen = {
			x: e.clientX*2,
			y: e.clientY*2
		}		
	}
	if(mouse.screen){
		mouse.x = worldX(mouse.screen.x)
		mouse.y = worldY(mouse.screen.y)
	}
	// console.log(mouse)
}

function setOffset(x, y){
	offset.x = x
	offset.y = y
}

// function snapOffset(r){
// 	r = r || 0
// 	if(mouse.focus){
// 		offset.x = r * offset.x + (1-r) * clamp(offset.x,
// 			mouse.focus.x + mouse.focus.width + (100 - canvas.width/2) / zoom,
// 			mouse.focus.x - (100  - canvas.width/2) / zoom)
// 	}
// }

function adjustOffset(dx, dy){
	setOffset(
		offset.x - dx / zoom,
		offset.y - dy / zoom)
}

window.addEventListener('mousedown', e => {
	if( mouse.focus){
		mouse.dragging = true
	}
})

window.addEventListener('mouseup', e => {
	mouse.dragging = false

})

window.addEventListener('mousemove', e => {
	updateMouse(e)
	if(mouse.dragging){
		// adjustOffset(e.movementX * 2 , e.movementY * 2)
		mouse.focus.x += e.movementX * 2 / zoom
		mouse.focus.y += e.movementY * 2 / zoom
	}
})

function clamp(v, min, max){
	return Math.min( Math.max(v, min), max)
}

function adjustScaleWithPin(x, y, ratio) {
	// console.log(ratio, (x - offset.x),(x - offset.x) * (1 - ratio))


	var oxcandidate = (offset.x - (1-ratio)*x) /ratio
	var oycandidate = (offset.y - (1-ratio)*y) /ratio

	// if(ratio > 1){
	// 	// r * z * mbw = cw - 20
	// 	if
	// 	ratio = Math.min(ratio, (canvas.width - 200) / (zoom * mouse.focus.width) )
	// }

	// console.log('oxcandidate', oxcandidate)

	// offset.x -= (x - offset.x) * (1 - ratio)
	// offset.y -= (y - offset.y) * (1 - ratio)
	
	var mxwidth = mouse.focus ? mouse.focus.width : BOX_WIDTH
	zoom = Math.min(zoom*ratio, (canvas.width - 200) / mxwidth)

	// if(ratio > 1) {
	// 	oxcandidate = clamp(oxcandidate,
	// 		mouse.focus.x + mouse.focus.width + (100 - canvas.width/2) / zoom,
	// 		mouse.focus.x - (100  - canvas.width/2) / zoom)
	// }

	setOffset(oxcandidate, oycandidate)
	// offset.x = oxcandidate
	// offset.y = oycandidate
	// snapOffset()

	updateMouse()

}


window.addEventListener('wheel', e => {
	if(e.metaKey || e.ctrlKey){
		adjustScaleWithPin(mouse.x, mouse.y, Math.pow(0.98, e.deltaY))
	} else {
		adjustOffset(-e.deltaX, -e.deltaY)
		updateMouse()
	}

	e.preventDefault()
})