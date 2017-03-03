// zoom in out of cells / snap to viewing single one
// mouse is focus
// solaris
// undefeated stanislov

var editor = document.createElement('textarea')
var canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d');

document.body.appendChild(canvas)
document.body.appendChild(editor)
editor.className = 'editor'

editor.innerText = `INFINITE JEST by David Foster Wallace
YEAR OF GLAD
I am seated in an office, surrounded by heads and bodies. My posture is consciously congruent to the shape of my hard chair. This is a cold room in University Administration, wood-walled, Remington-hung, double-windowed against the November heat, insulated from Administrative sounds by the reception area outside, at which Uncle Charles, Mr. deLint and I were lately received.
I am in here.
Three faces have resolved into place above summer-weight sportcoats and half-Windsors across a polished pine conference table shiny with the spidered light of an Arizona noon. These are three Deans — of Admissions, Academic Affairs, Athletic Affairs. I do not know which face belongs to whom.
I believe I appear neutral, maybe even pleasant, though I've been coached to err on the side of neutrality and not attempt what would feel to me like a pleasant expression or smile.
I have committed to crossing my legs I hope carefully, ankle on knee, hands together in the lap of my slacks. My fingers are mated into a mirrored series of what manifests, to me, as the letter X. The interview room's other personnel include: the University's Director of Composition, its varsity tennis coach, and Academy prorector Mr. A. deLint. C.T. is beside me; the others sit, stand and stand, respectively, at the periphery of my focus. The tennis coach jingles pocket-change. There is something vaguely digestive about the room's odor. The high-traction sole of my complimentary Nike sneaker runs parallel to the wobbling loafer of my mother's half-brother, here in his capacity as Headmaster, sitting in the chair to what I hope is my immediate right, also facing Deans.
The Dean at left, a lean yellowish man whose fixed smile nevertheless has the impermanent quality of something stamped into uncooperative material, is a personality-type I've come lately to appreciate, the type who delays need of any response from me by relating my side of the story for me, to me. Passed a packet of computer-sheets by the shaggy lion of a Dean at center, he is speaking more or less to these pages, smiling down.
'You are Harold Incandenza, eighteen, date of secondary-school graduation approximately one month from now, attending the Enfield Tennis Academy, Enfield, Massachusetts, a boarding school, where you reside.' His reading glasses are rectangular, court- shaped, the sidelines at top and bottom. 'You are, according to Coach White and Dean [unintelligible], a regionally, nationally, and continentally ranked junior tennis player, a potential O.N.A.N.C.A.A. athlete of substantial promise, recruited by Coach White via correspondence with Dr. Tavis here commencing .. . February of this year.' The top page is removed and brought around neatly to the bottom of the sheaf, at intervals. 'You have been in residence at the Enfield Tennis Academy since age seven.’
I am debating whether to risk scratching the right side of my jaw, where there is a wen.
'Coach White informs our offices that he holds the Enfield Tennis Academy's program and achievements in high regard, that the University of Arizona tennis squad has profited from the prior matriculation of several former E.T.A. alumni, one of whom was one Mr. Aubrey F. deLint, who appears also to be with you here today. Coach White and his staff have given us —’
The yellow administrator's usage is on the whole undistinguished, though I have to admit he's made himself understood. The Director of Composition seems to have more than the normal number of eyebrows. The Dean at right is looking at my face a bit strangely.
Uncle Charles is saying that though he can anticipate that the Deans might be predisposed to weigh what he avers as coming from his possible appearance as a kind of cheerleader for E.T.A., he can assure the assembled Deans that all this is true, and that the Academy has presently in residence no fewer than a third of the continent's top thirty juniors, in age brackets all across the board, and that I here, who go by 'Hal,' usually, am 'right up there among the very cream.' Right and center Deans smile professionally; the heads of deLint and the coach incline as the Dean at left clears his throat:
'— belief that you could well make, even as a freshman, a real contribution to this University's varsity tennis program. We are pleased,' he either says or reads, removing a page, 'that a competition of some major sort here has brought you down and given us the chance to sit down and chat together about your application and potential recruitment and matriculation and scholarship.’
'I've been asked to add that Hal here is seeded third, Boys' 18-and-Under Singles, in the prestigious WhataBurger Southwest Junior Invitational out at the Randolph Tennis Center —' says what I infer is Athletic Affairs, his cocked head showing a freckled scalp.
'Out at Randolph Park, near the outstanding El Con Marriott,' C.T. inserts, 'a venue the whole contingent's been vocal about finding absolutely top-hole thus far, which —’
'Just so, Chuck, and that according to Chuck here Hal has already justified his seed, he's reached the semifinals as of this morning's apparently impressive win, and that he'll be playing out at the Center again tomorrow, against the winner of a quarterfinal game tonight, and so will be playing tomorrow at I believe scheduled for 0830 —’
'Try to get under way before the godawful heat out there. Though of course a dry heat.’
'— and has apparently already qualified for this winter's Continental Indoors, up in Edmonton, Kirk tells me —' cocking further to look up and left at the varsity coach, whose smile's teeth are radiant against a violent sunburn — 'Which is something indeed.' He smiles, looking at me. 'Did we get all that right Hal.’
C.T. has crossed his arms casually; their triceps' flesh is webbed with mottle in the air-conditioned sunlight. 'You sure did. Bill.' He smiles. The two halves of his mustache never quite match. 'And let me say if I may that Hal's excited, excited to be invited for the third year running to the Invitational again, to be back here in a community he has real affection for, to visit with your alumni and coaching staff, to have already justified his high seed in this week's not unstiff competition, to as they say still be in it without the fat woman in the Viking hat having sung, so to speak, but of course most of all to have a chance to meet you gentlemen and have a look at the facilities here. Everything here is absolutely top-slot, from what he's seen.’
There is a silence. DeLint shifts his back against the room's panelling and recenters his weight. My uncle beams and
straightens a straight watchband. 62.5% of the room's faces are directed my way, pleasantly expectant. My chest bumps like a dryer with shoes in it. I compose what I project will be seen as a smile. I turn this way and that, slightly, sort of directing the expression to everyone in the room.
There is a new silence. The yellow Dean's eyebrows go circumflex. The two other Deans look to the Director of Composition. The tennis coach has moved to stand at the broad window, feeling at the back of his crewcut. Uncle Charles strokes the forearm above his watch. Sharp curved palm-shadows move slightly over the pine table's shine, the one head's shadow a black moon.
'Is Hal all right, Chuck?' Athletic Affairs asks. 'Hal just seemed to ... well, grimace. Is he in pain? Are you in pain, son?’
'Hal's right as rain,' smiles my uncle, soothing the air with a casual hand. 'Just a bit of a let's call it maybe a facial tic, slightly, at all the adrenaline of being here on your impressive campus, justifying his seed so far without dropping a set, receiving that official written offer of`

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


// for(var i = 0; i < 10; i++){
// 	for(var j = 0; j < 10; j++){
// 		if(Math.random() < 0.4) continue;
// 		boxes.push({
// 			x: i*(BOX_WIDTH+space),
// 			y: j*(BOX_HEIGHT+space),
// 			width: BOX_WIDTH,
// 			height: BOX_HEIGHT
// 		})
// 	}
// }


var zoom = 1, 
	mouse = {
		x: 0,
		y: 0,
		dragging: false,
	},
	offset = {
		x: 200,
		y: 200,
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

var editorWidth = 400
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
		var s = (box.width*zoom)/2 / parseInt(editor.style.width)
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

var lasttick
function tick(t){
	requestAnimationFrame(tick)
	var dt = t - lasttick

	canvas.width = window.innerWidth * 2
	canvas.height = window.innerHeight * 2
	canvas.style.width = window.innerWidth + 'px'
	canvas.style.height = window.innerHeight + 'px'

	editor.style.width = window.innerWidth - 200 + 'px'
	// editor.style.height = '400px'


	if(!mouse.dragging){
		mouse.focus = boxes.find(box => contains(box, mouse))	
	}
	
	if(mouse.focus) mouse.focus.color = 'red'

	for (var i = boxes.length - 1; i >= 0; i--) {
		drawBox(boxes[i])
		boxes[i].color = 'rgba(0,0,0,0.8)'


		if(mouse.focus === boxes[i] && mouse.dragging) continue;
		var damp = 0.9;
		var newX = Math.round(boxes[i].x / (BOX_WIDTH + space)) * (BOX_WIDTH + space),
			newY = Math.round(boxes[i].y / (BOX_HEIGHT + space)) * (BOX_HEIGHT + space)

		boxes[i].x = boxes[i].x * damp + newX * (1- damp);
		boxes[i].y = boxes[i].y * damp + newY * (1- damp);
	}

	if(!mouse.focus){
		editor.style.display = 'none'
	} else {
		editor.style.display = 'block'
	}

	snapOffset(.8)
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

function snapOffset(r){
	r = r || 0
	if(mouse.focus){
		offset.x = r * offset.x + (1-r) * clamp(offset.x,
			mouse.focus.x + mouse.focus.width + (100 - canvas.width/2) / zoom,
			mouse.focus.x - (100  - canvas.width/2) / zoom)
	}
}

function adjustOffset(dx, dy){
	setOffset(
		offset.x - dx / zoom,
		offset.y - dy / zoom)
}

window.addEventListener('mousedown', e => {
	if(e.target != editor && mouse.focus){
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

	console.log('oxcandidate', oxcandidate)

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
	snapOffset()

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