// ==UserScript==
// @name     	Surviv.io_esp
// @namespace    http://tampermonkey.net/
// @version  	1
// @grant    	unsafeWindow
// @author       https://github.com/rpasta42
// @match        http://surviv.io/*
// @require      http://code.jquery.com/jquery-3.3.1.js 
// ==/UserScript==

//http://code.jquery.com/jquery-1.12.4.min.js
var player = Object.keys(game[obfuscate.playerBarn][obfuscate.playerInfo]);;

   names(player) {
        if (!player) return
        if (
            !player.nameText._text ||
            player.nameText._text == "" ||
            player.nameText._text.length < 1
        )
            return

        player.nameText.tint = 0xff0000

        player.nameText.visible = true
    }

    draw(enemies, activePlayer, data, dataAccessor) {
        if(!enemies || !activePlayer)  {
            return;
        }
        let points = enemies.map(enemy => {
            return {
                x: (dataAccessor.GetPlayerPosition(enemy).x - dataAccessor.GetPlayerPosition(activePlayer).x) * 16,
                y: (dataAccessor.GetPlayerPosition(activePlayer).y - dataAccessor.GetPlayerPosition(enemy).y) * 16,
                img: enemy.img || false,
                type: enemy.__type,
                id: enemy.__id,
                layer: dataAccessor.GetPlayerLayer(enemy),
            }
        });
        let pixi = this.values.pixi
        if(!pixi) {
            pixi = new window.PIXI.Graphics();
            this.values.pixi = pixi;
            activePlayer.container.addChild(pixi);
            activePlayer.container.setChildIndex(pixi, 0);
        }
        if(!pixi.graphicsData) {
            return;
        }
        pixi.clear();
        points.forEach(point => {
            if(point.type == 2 && point.layer !== dataAccessor.GetPlayerLayer(activePlayer)) {
                return;
            }
            pixi.lineStyle(this.option("width"), 0xff0000, 0.5);
            if(point.layer !== dataAccessor.GetPlayerLayer(activePlayer)) {
                pixi.lineStyle(this.option("width"), 0xffffff, 0.5);
            }
            if(point.type == 2) {
                pixi.lineStyle(this.option("width"), 0xffff00, 0.5);
            }
            pixi.moveTo(0, 0);
            pixi.lineTo(point.x, point.y);
        if(data.aimPred) {
            pixi.lineStyle(2, 0xffffff, 0.5);
            pixi.moveTo(0, 0);
            pixi.lineTo(
                (data.aimPred.x - dataAccessor.GetPlayerPosition(activePlayer).x) * 16,
                (dataAccessor.GetPlayerPosition(activePlayer).y - data.aimPred.y) * 16
            )
        }
        enemies.forEach(n => {
            if(n.__type == 1) { 
                this.names(n); 
            }
        })
})();
