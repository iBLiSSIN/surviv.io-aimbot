// ==UserScript==
// @name         Surviv.io aimbot injector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://surviv.io/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @require      https://raw.githubusercontent.com/JsHax/jshaxtools/master/checkForBadJavascripts.js
// @run-at 			 document-start
// ==/UserScript==


// @grant				 unsafeWindow

checkForBadJavascripts ( [
    [   true,
        /app/,
        function () {
            //addJS_Node ('replacement');
        }
    ]

] );


(function() {


  var scriptNode = document.createElement ("script");
  scriptNode.setAttribute ("src", "http://18.217.86.222/blah1.05d704f7.js");
  document.head.appendChild(scriptNode);

})();




