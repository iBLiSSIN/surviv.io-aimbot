
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function getPosFromAngle(angle) {
	//var y = Math.sin(toRadians(angle));
	//var x = Math.sqrt(1-Math.pow(y, 1));
	var rad = toRadians(angle);
	var x = Math.cos(rad);
	var y = Math.sin(rad);

	if (angle == 360)
		angle = 0;
	if (angle == 0) {
		x = 1;
		y = 0
	}
	if (angle == 90) {
		y = 1;
		x = 0;
	} else if (angle == 180) {
		x = -1;
		y = 0;
	} else if (angle == 270) {
		y = -1;
		x = 0;

	}

	return {
		x : x,
		y : y
	}
}

function getCameraCenter() {
	return {
		x : game.camera.screenWidth / 2,
		y : game.camera.screenHeight / 2
	}
}

function setAngle(angle) {

	//angle -= 90;
	var cameraAdd = getPosFromAngle(angle);
	var centerPos = getCameraCenter();

	game.input.mousePos.x = centerPos.x + (cameraAdd.x);
	game.input.mousePos.y = centerPos.y + (cameraAdd.y);

}



function turnTo(x, y) {
	var distanceX = x - game.camera.pos.x;
	var distanceY = y - game.camera.pos.y;

	var rad = Math.atan(distanceY/distanceX);
	var deg = toDegrees(rad);

	//console.log(deg);

	//if (deg > 270 && deg < 420)
	//	deg -= 180;

	if (deg > 360)
		deg -= 360;

	deg = 360 - deg;

	if (game.camera.pos.x-x  > 0) {
		//deg = 90-deg;
		//console.log('bad aim', deg);
		if (deg > 360)
			deg -= 360;
		deg = 180 - deg;
		deg = - deg;
	}




	//if (deg < 0)
	//	deg = 360 - Math.abs(deg);


	setAngle(deg);
}


function findDistance(pos1, pos2) {
	var x1 = pos1.x;
	var x2 = pos2.x;
	var y1 = pos1.y;
	var y2 = pos2.y;
	//sqrt((x1-x2)^2 + (y1-y2)^2)
	return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}




var newPlayerCounter = 0;
var closestPlayerIndex = -1;

function findClosestEnemy() {

	var currPlayerPos = game.camera.pos;

	var players = game.playerBarn.playerPool.pool;

	var minPlayerDistance = 1000000;
	var minPlayerIndex = -1;


	if (newPlayerCounter++ == 10 ||  closestPlayerIndex == -1) {
		newPlayerCounter = 0;
	}
	else
		return players[closestPlayerIndex].pos;

	for (var i in players) {
		var player = players[i];
		if (player.downed || !player.active)
			continue;

		var playerPos = player.pos;
		var distance = findDistance(currPlayerPos, playerPos);
		if (distance > 0.5 && distance < 60) {
			if (distance < minPlayerDistance) {
				minPlayerDistance = distance;
				minPlayerIndex = i;
			}
		}
	}

	closestPlayerIndex = minPlayerIndex;

	if (minPlayerIndex == -1)
		return -1;

	return players[minPlayerIndex].pos;
}



var botLoopC = 0;



function botLoop() {



	var closestPlayer = findClosestEnemy();

	//console.log('loop', closestPlayer, game.camera.pos);
	if (closestPlayer != -1) {
		//slowlyMoveTo(closestPlayer.x, y);
		turnTo(closestPlayer.x, closestPlayer.y);
		//game.input.mousePos.x = closestPlayer.x;
		//game.input.mousePos.y = closestPlayer.y;
	}
	botLoopC++;

	//if (botLoopC < 200)
		setTimeout(botLoop, 30);
}
//botLoop();


////////////////////



var _angle = 0;
function testAngle() {
	if (_angle < 360) {
		setAngle(_angle);
		_angle += 1;
		setTimeout(testAngle, 10);
	}
}
//testAngle();

function testLocation() {
	console.log(game.camera.pos);
	setTimeout(testLocation, 100);
}//testLocation();


