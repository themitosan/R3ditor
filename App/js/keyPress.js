/*
	R3ditor - keyPress.js
	Por mitosan/mscore/misto_quente/mscorehdr
	I'm still kicking!
*/
function R3_START_KEYPRESS(){
	window.onkeyup = function(key){
		console.info(key);
		if (RE3_LIVE_keyPress_enable === true){
			// Keys
			if (MEM_JS_requreSucess === true){
				// F2 = to go title
				if (key.keyCode === 113){
					RE3_LIVE_gotoTitleScreen();
				}
				// Esc = Close RE3 Live
				if (key.keyCode === 27){
					RE3_LIVE_closeForm();
				}
			}
		}
		// (F1) Open RE3 Livestatus
		if (key.keyCode === 112){
			RE3_LIVE_openForm();
		}
		// (F5) Run RE3 (Mod)
		if (key.keyCode === 116){
			checkCanPlay(1, 1);
		}
		// (F6) Run MERCE (Mod)
		if (key.keyCode === 117){
			checkCanPlay(1, 0);
		}
		// (F7) Run RE3
		if (key.keyCode === 118){
			checkCanPlay(0, 1);
		}
		// (F8) Run MERCE
		if (key.keyCode === 119){
			checkCanPlay(0, 0);
		}
		// (F9) Run RE3 Mod + Open Livestatus
		if (key.keyCode === 120){
			checkCanPlay(1, 1);
			RE3_LIVE_openForm();
		}
	}
	// Mouse press
	window.onmousedown = function(mClick){
		// console.info(mClick.button);
		/*
			Left Side Buttons
		*/
		// Down
		if (mClick.button === 3){
			R3_MOUSECLICK(0);
		}
		// Up
		if (mClick.button === 4){
			R3_MOUSECLICK(1);
		}
	}
}