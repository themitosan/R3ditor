/*
	R3ditor - Bio3.ini.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Can you give me a coffee? Pleeeeeease! ~wink~ ;)
*/
var INI_array = [];
var BIO3INI_arquivoBruto;
var BIO3INI_MAX_WIDTH = 7680;
var BIO3INI_MAX_HEIGHT = 5760;

// General
var BIO3INI_Save;
var BIO3INI_Movie;
var BIO3INI_Regist;
var BIO3INI_Rofs1;
var BIO3INI_Rofs2;
var BIO3INI_Rofs3;
var BIO3INI_Rofs4;
var BIO3INI_Rofs5;
var BIO3INI_Rofs6;
var BIO3INI_Rofs7;
var BIO3INI_Rofs8;
var BIO3INI_Rofs9;
var BIO3INI_Rofs10;
var BIO3INI_Rofs11;
var BIO3INI_Rofs12;
var BIO3INI_Rofs13;
var BIO3INI_Rofs14;
var BIO3INI_Rofs15;
/*
	Video Config
	Variaveis usadas para obter as configs de vídeo
*/
// True == On || False == Off
var BIO3INI_v_disableMovie = true;
var BIO3INI_v_disableAlpha = false;
var BIO3INI_v_disableLinear = false;
var BIO3INI_v_textureAdjust = false;
var BIO3INI_v_disableSpecular = true;
var BIO3INI_v_mode = 'Windowed';
// Windowed
var BIO3INI_w_BPP = 32;
var BIO3INI_w_width = 800;
var BIO3INI_w_height = 600;
var BIO3INI_w_driver = 'NULL';
var BIO3INI_w_device = '0ed36e48aa64fc1118f600000c0251e6'; // this is my gtx!
// FullScreen
var BIO3INI_f_BPP = 32;
var BIO3INI_f_width = 800;
var BIO3INI_f_height = 600;
var BIO3INI_f_driver = 'NULL';
var BIO3INI_f_device = '0ed36e48aa64fc1118f600000c0251e6'; // this is my gtx!
// Keyboard
var BIO3INI_kb_key1 = ''; // Up
var BIO3INI_kb_key2 = ''; // Down
var BIO3INI_kb_key3 = ''; // Left
var BIO3INI_kb_key4 = ''; // Right
var BIO3INI_kb_key5 = ''; // ???
var BIO3INI_kb_key6 = ''; // Cancel / Run
var BIO3INI_kb_key7 = ''; // View Map
var BIO3INI_kb_key8 = ''; // Change Target
var BIO3INI_kb_key9 = ''; // Draw Weapon (Enemy)
var BIO3INI_kb_keyA = ''; // Draw Weapon (Objects)
var BIO3INI_kb_keyB = ''; // ???
var BIO3INI_kb_keyC = ''; // Status Screen
var BIO3INI_kb_keyD = ''; // Select / Action
var BIO3INI_kb_keyE = ''; // ???
// Sound
var BIO3INI_sound_seVol = 65534;
var BIO3INI_sound_bgmVol = 65534;
var BIO3INI_sound_device = 'NULL';
// Data
var BIO3INI_data_00 = '';
var BIO3INI_data_01 = '';
var BIO3INI_data_02 = '';
var BIO3INI_data_03 = '';
var BIO3INI_data_10 = '';
var BIO3INI_data_complete = '';
/*
	Functions
*/
function INI_resetVars(){
	INI_array = [];
	BIO3INI_f_BPP = 32;
	BIO3INI_w_BPP = 32;
	BIO3INI_kb_key1 = '';
	BIO3INI_kb_key2 = '';
	BIO3INI_kb_key3 = '';
	BIO3INI_kb_key4 = '';
	BIO3INI_kb_key5 = '';
	BIO3INI_kb_key6 = '';
	BIO3INI_kb_key7 = '';
	BIO3INI_kb_key8 = '';
	BIO3INI_kb_key9 = '';
	BIO3INI_kb_keyA = '';
	BIO3INI_kb_keyB = '';
	BIO3INI_kb_keyC = '';
	BIO3INI_kb_keyD = '';
	BIO3INI_kb_keyE = '';
	BIO3INI_f_width = 800;
	BIO3INI_w_width = 800;
	BIO3INI_f_height = 600;
	BIO3INI_w_height = 600;
	BIO3INI_Save = undefined;
	BIO3INI_f_driver = 'NULL';
	BIO3INI_w_driver = 'NULL';
	BIO3INI_Movie = undefined;
	BIO3INI_Rofs1 = undefined;
	BIO3INI_Rofs2 = undefined;
	BIO3INI_Rofs3 = undefined;
	BIO3INI_Rofs4 = undefined;
	BIO3INI_Rofs5 = undefined;
	BIO3INI_Rofs6 = undefined;
	BIO3INI_Rofs7 = undefined;
	BIO3INI_Rofs8 = undefined;
	BIO3INI_Rofs9 = undefined;
	BIO3INI_Regist = undefined;
	BIO3INI_Rofs10 = undefined;
	BIO3INI_Rofs11 = undefined;
	BIO3INI_Rofs12 = undefined;
	BIO3INI_Rofs13 = undefined;
	BIO3INI_Rofs14 = undefined;
	BIO3INI_Rofs15 = undefined;
	BIO3INI_v_mode = 'Windowed';
	BIO3INI_v_disableMovie = true;
	BIO3INI_v_disableAlpha = false;
	BIO3INI_v_disableLinear = false;
	BIO3INI_v_textureAdjust = false;
	BIO3INI_v_disableSpecular = true;
	BIO3INI_f_device = '0ed36e48aa64fc1118f600000c0251e6';
	BIO3INI_w_device = '0ed36e48aa64fc1118f600000c0251e6';
}
function INI_reload(){
	if (ORIGINAL_FILENAME !== undefined){
		INI_CARREGAR_ARQUIVO(ORIGINAL_FILENAME);
	}
}
function INI_CARREGAR_ARQUIVO(file){
	ORIGINAL_FILENAME = file;
	BIO3INI_arquivoBruto = fs.readFileSync(ORIGINAL_FILENAME, 'utf-8');
	INI_resetVars();
	addLog('log', 'INFO - The file was loaded sucessfully! - File: ' + ORIGINAL_FILENAME);
	fs.readFileSync(file).toString().split('\n').forEach(function(line){ 
		INI_array.push(line); 
	});
	/*
		Video
	*/
	// Disable Movies
	if (INI_array.indexOf('DisableMovie=on') === -1){
		if (INI_array.indexOf('DisableMovie=off') === -1){
			BIO3INI_v_disableMovie = false;
		} else {
			BIO3INI_v_disableMovie = INI_convertToBool(INI_array[INI_array.indexOf('DisableMovie=off')].replace('DisableMovie=', ''), 0);
		}
	} else {
		BIO3INI_v_disableMovie = INI_convertToBool(INI_array[INI_array.indexOf('DisableMovie=on')].replace('DisableMovie=', ''), 0);
	}
	// Disable Alpha
	if (INI_array.indexOf('DisableAlpha=on') === -1){
		if (INI_array.indexOf('DisableAlpha=off') === -1){
			BIO3INI_v_disableAlpha = false;
		} else {
			BIO3INI_v_disableAlpha = INI_convertToBool(INI_array[INI_array.indexOf('DisableAlpha=off')].replace('DisableAlpha=', ''), 0);
		}
	} else {
		BIO3INI_v_disableAlpha = INI_convertToBool(INI_array[INI_array.indexOf('DisableAlpha=on')].replace('DisableAlpha=', ''), 0);
	}
	// Disable Linear
	if (INI_array.indexOf('DisableLinear=on') === -1){
		if (INI_array.indexOf('DisableLinear=off') === -1){
			BIO3INI_v_disableLinear = false;
		} else {
			BIO3INI_v_disableLinear = INI_convertToBool(INI_array[INI_array.indexOf('DisableLinear=off')].replace('DisableLinear=', ''), 1);
		}
	} else {
		BIO3INI_v_disableLinear = INI_convertToBool(INI_array[INI_array.indexOf('DisableLinear=on')].replace('DisableLinear=', ''), 1);
	}
	// Disable Alpha
	if (INI_array.indexOf('DisableAlpha=on') === -1){
		if (INI_array.indexOf('DisableAlpha=off') === -1){
			BIO3INI_v_disableAlpha = false;
		} else {
			BIO3INI_v_disableAlpha = INI_convertToBool(INI_array[INI_array.indexOf('DisableAlpha=off')].replace('DisableAlpha=', ''), 0);
		}
	} else {
		BIO3INI_v_disableAlpha = INI_convertToBool(INI_array[INI_array.indexOf('DisableAlpha=on')].replace('DisableAlpha=', ''), 0);
	}
	// Disable Specular
	if (INI_array.indexOf('DisableSpecular=on') === -1){
		if (INI_array.indexOf('DisableSpecular=off') === -1){
			BIO3INI_v_disableSpecular = false;
		} else {
			BIO3INI_v_disableSpecular = INI_convertToBool(INI_array[INI_array.indexOf('DisableSpecular=off')].replace('DisableSpecular=', ''), 0);
		}
	} else {
		BIO3INI_v_disableSpecular = INI_convertToBool(INI_array[INI_array.indexOf('DisableSpecular=on')].replace('DisableSpecular=', ''), 0);
	}
	// Texture Adjust
	if (INI_array.indexOf('TextureAdjust=on') === -1){
		if (INI_array.indexOf('TextureAdjust=off') === -1){
			BIO3INI_v_textureAdjust = false;
		} else {
			BIO3INI_v_textureAdjust = INI_convertToBool(INI_array[INI_array.indexOf('TextureAdjust=off')].replace('TextureAdjust=', ''), 0);
		}
	} else {
		BIO3INI_v_textureAdjust = INI_convertToBool(INI_array[INI_array.indexOf('TextureAdjust=on')].replace('TextureAdjust=', ''), 0);
	}
	// Window Mode
	if (INI_array.indexOf('Mode=Windowed') === -1){
		if (INI_array.indexOf('Mode=FullScreen') === -1){
			BIO3INI_v_mode = 'Windowed';
		} else {
			BIO3INI_v_mode = INI_array[INI_array.indexOf('Mode=FullScreen')].replace('Mode=', '');
		}
	} else {
		BIO3INI_v_mode = INI_array[INI_array.indexOf('Mode=Windowed')].replace('Mode=', '');
	}
	// Windowed (Modo janela)
	if (INI_array.indexOf('[Windowed]') !== -1){
		var indexSearch  = INI_array.indexOf('[Windowed]');
		BIO3INI_w_driver = INI_array[parseInt(indexSearch + 1)].replace('Driver=', '');
		BIO3INI_w_device = INI_array[parseInt(indexSearch + 2)].replace('Device=', '');
		BIO3INI_w_width  = parseInt(INI_array[parseInt(indexSearch + 3)].replace('Width=', ''));
		BIO3INI_w_height = parseInt(INI_array[parseInt(indexSearch + 4)].replace('Height=', ''));
		// Check Res.
		if (BIO3INI_CALC_RES(BIO3INI_w_width, 1) !== BIO3INI_w_height){
			addLog('warn', 'WARN - The Windowed mode have a invalid Res! (W: ' + BIO3INI_w_width + ', H: ' + BIO3INI_w_height + ')');
		}
	} else {
		BIO3INI_w_driver = 'NULL';
		BIO3INI_w_device = '';
		BIO3INI_w_width  = 800;
		BIO3INI_w_height = 600;
	}
	// FullScreen (Modo Tela cheia)
	if (INI_array.indexOf('[FullScreen]') !== -1){
		var indexSearch  = INI_array.indexOf('[FullScreen]');
		BIO3INI_f_driver = INI_array[parseInt(indexSearch + 1)].replace('Driver=', '');
		BIO3INI_f_device = INI_array[parseInt(indexSearch + 2)].replace('Device=', '');
		BIO3INI_f_width  = parseInt(INI_array[parseInt(indexSearch + 3)].replace('Width=', ''));
		BIO3INI_f_height = parseInt(INI_array[parseInt(indexSearch + 4)].replace('Height=', ''));
		BIO3INI_f_BPP    = parseInt(INI_array[parseInt(indexSearch + 5)].replace('BPP=', ''));
	} else {
		BIO3INI_f_driver = 'NULL';
		BIO3INI_f_device = '';
		BIO3INI_f_width  = 800;
		BIO3INI_f_height = 600;
		BIO3INI_f_BPP    = 32;
	}
	/*
		Sound
	*/
	if (INI_array.indexOf('[Sound]') !== -1){
		var indexSearch = INI_array.indexOf('[Sound]');
		BIO3INI_sound_device = INI_array[parseInt(indexSearch + 1)].replace('Device=', '');
		BIO3INI_sound_seVol  = parseInt(INI_array[parseInt(indexSearch + 2)].replace('SEvol=', ''));
		BIO3INI_sound_bgmVol = parseInt(INI_array[parseInt(indexSearch + 3)].replace('BGMvol=', ''));
	} else {
		BIO3INI_sound_device = 'NULL';
		BIO3INI_sound_bgmVol = 32767;
		BIO3INI_sound_seVol  = 32767;
	}
	/*
		Keyboard
	*/
	if (INI_array.indexOf('[Keyboard]') !== -1){
		var indexSearch = INI_array.indexOf('[Keyboard]');
		BIO3INI_kb_key1 =  INI_array[parseInt(indexSearch + 1)].replace('Key1=', '');
		BIO3INI_kb_key2 =  INI_array[parseInt(indexSearch + 2)].replace('Key2=', '');
		BIO3INI_kb_key3 =  INI_array[parseInt(indexSearch + 3)].replace('Key3=', '');
		BIO3INI_kb_key4 =  INI_array[parseInt(indexSearch + 4)].replace('Key4=', '');
		BIO3INI_kb_key5 =  INI_array[parseInt(indexSearch + 5)].replace('Key5=', '');
		BIO3INI_kb_key6 =  INI_array[parseInt(indexSearch + 6)].replace('Key6=', '');
		BIO3INI_kb_key7 =  INI_array[parseInt(indexSearch + 7)].replace('Key7=', '');
		BIO3INI_kb_key8 =  INI_array[parseInt(indexSearch + 8)].replace('Key8=', '');
		BIO3INI_kb_key9 =  INI_array[parseInt(indexSearch + 9)].replace('Key9=', '');
		BIO3INI_kb_keyA = INI_array[parseInt(indexSearch + 10)].replace('KeyA=', '');
		BIO3INI_kb_keyB = INI_array[parseInt(indexSearch + 11)].replace('KeyB=', '');
		BIO3INI_kb_keyC = INI_array[parseInt(indexSearch + 12)].replace('KeyC=', '');
		BIO3INI_kb_keyD = INI_array[parseInt(indexSearch + 13)].replace('KeyD=', '');
		BIO3INI_kb_keyE = INI_array[parseInt(indexSearch + 14)].replace('KeyE=', '');
	} else {
		BIO3INI_kb_key1 = '';
		BIO3INI_kb_key2 = '';
		BIO3INI_kb_key3 = '';
		BIO3INI_kb_key4 = '';
		BIO3INI_kb_key5 = '';
		BIO3INI_kb_key6 = '';
		BIO3INI_kb_key7 = '';
		BIO3INI_kb_key8 = '';
		BIO3INI_kb_key9 = '';
		BIO3INI_kb_keyA = '';
		BIO3INI_kb_keyB = '';
		BIO3INI_kb_keyC = '';
		BIO3INI_kb_keyD = '';
		BIO3INI_kb_keyE = '';
	}
	/*
		[Data]
	*/
	if (INI_array.indexOf('[Data]') !== -1){
		var indexSearch = INI_array.indexOf('[Data]');
		var c = indexSearch;
		while(c < INI_array.length){
			if (INI_array[c].indexOf('Complete=') !== -1){
				BIO3INI_data_complete = INI_array[c].replace('Complete=', '');
			}
			if (INI_array[c].indexOf('Data00=') !== -1){
				BIO3INI_data_00 = INI_array[c].replace('Data00=', '');
			}
			if (INI_array[c].indexOf('Data01=') !== -1){
				BIO3INI_data_01 = INI_array[c].replace('Data01=', '');
			}
			if (INI_array[c].indexOf('Data02=') !== -1){
				BIO3INI_data_02 = INI_array[c].replace('Data02=', '');
			}
			if (INI_array[c].indexOf('Data03=') !== -1){
				BIO3INI_data_03 = INI_array[c].replace('Data03=', '');
			}
			if (INI_array[c].indexOf('Data10=') !== -1){
				BIO3INI_data_10 = INI_array[c].replace('Data10=', '');
			}
			c++;
		}
	} else {
		BIO3INI_data_00 = '';
		BIO3INI_data_01 = '';
		BIO3INI_data_02 = '';
		BIO3INI_data_03 = '';
		BIO3INI_data_10 = '';
		BIO3INI_data_complete = '';
	}
	/*
		Path
	*/
	if (INI_array.indexOf('[General]') !== -1){
		var indexSearch = INI_array.indexOf('[General]');
		BIO3INI_Save 		 = INI_array[parseInt(indexSearch + 1)].replace('Save=', '');
		BIO3INI_Regist 		 = INI_array[parseInt(indexSearch + 2)].replace('Regist=', '');
		BIO3INI_Movie 		 = INI_array[parseInt(indexSearch + 3)].replace('Movie=', '');
		BIO3INI_Rofs1 		 = INI_array[parseInt(indexSearch + 4)].replace('Rofs1=', '');
		BIO3INI_Rofs2 		 = INI_array[parseInt(indexSearch + 5)].replace('Rofs2=', '');
		BIO3INI_Rofs3 		 = INI_array[parseInt(indexSearch + 6)].replace('Rofs3=', '');
		BIO3INI_Rofs4 		 = INI_array[parseInt(indexSearch + 7)].replace('Rofs4=', '');
		BIO3INI_Rofs5 		 = INI_array[parseInt(indexSearch + 8)].replace('Rofs5=', '');
		BIO3INI_Rofs6 		 = INI_array[parseInt(indexSearch + 9)].replace('Rofs6=', '');
		BIO3INI_Rofs7 		 = INI_array[parseInt(indexSearch + 10)].replace('Rofs7=', '');
		BIO3INI_Rofs8 		 = INI_array[parseInt(indexSearch + 11)].replace('Rofs8=', '');
		BIO3INI_Rofs9 		 = INI_array[parseInt(indexSearch + 12)].replace('Rofs9=', '');
		BIO3INI_Rofs10 		 = INI_array[parseInt(indexSearch + 13)].replace('Rofs10=', '');
		BIO3INI_Rofs11 		 = INI_array[parseInt(indexSearch + 14)].replace('Rofs11=', '');
		BIO3INI_Rofs12 		 = INI_array[parseInt(indexSearch + 15)].replace('Rofs12=', '');
		BIO3INI_Rofs13 		 = INI_array[parseInt(indexSearch + 16)].replace('Rofs13=', '');
		BIO3INI_Rofs14 		 = INI_array[parseInt(indexSearch + 17)].replace('Rofs14=', '');
		BIO3INI_Rofs15 		 = INI_array[parseInt(indexSearch + 18)].replace('Rofs15=', '');
	} else {
		BIO3INI_Save 		 = '';
		BIO3INI_Regist 		 = '';
		BIO3INI_Movie 		 = '';
		BIO3INI_Rofs1 		 = '';
		BIO3INI_Rofs2 		 = '';
		BIO3INI_Rofs3 		 = '';
		BIO3INI_Rofs4 		 = '';
		BIO3INI_Rofs5 		 = '';
		BIO3INI_Rofs6 		 = '';
		BIO3INI_Rofs7 		 = '';
		BIO3INI_Rofs8 		 = '';
		BIO3INI_Rofs9 		 = '';
		BIO3INI_Rofs10 		 = '';
		BIO3INI_Rofs11 		 = '';
		BIO3INI_Rofs12 		 = '';
		BIO3INI_Rofs13 		 = '';
		BIO3INI_Rofs14 		 = '';
		BIO3INI_Rofs15 		 = '';
	}
	INI_displayVarToForm();
	INI_showMenu(1);
	scrollLog();
}
function INI_displayVarToForm(){
	document.getElementById('INI_lbl_filePath').innerHTML = ORIGINAL_FILENAME;
	document.getElementById('INI_editSelectFullScreenBPP').value = BIO3INI_f_BPP;
	document.getElementById('INI_lbl_fileSize').innerHTML = getFileSize(ORIGINAL_FILENAME, 0) + ' Bytes';
	// Video
	document.getElementById('INI_lbl_videoMode').innerHTML = BIO3INI_v_mode;
	if (BIO3INI_v_mode === 'Windowed'){
		document.getElementById('INI_lbl_videoCard').innerHTML = BIO3INI_w_device.toUpperCase();
		document.getElementById('INI_lbl_videoDriver').innerHTML = BIO3INI_w_driver;
	}
	if (BIO3INI_v_mode === 'FullScreen'){
		document.getElementById('INI_lbl_videoCard').innerHTML = BIO3INI_f_device.toUpperCase();
		document.getElementById('INI_lbl_videoDriver').innerHTML = BIO3INI_f_driver;
	}
	var BPP = document.getElementById('INI_editSelectFullScreenBPP').value;
	document.getElementById('INI_edit_displayMode').value = BIO3INI_v_mode;
	document.getElementById('INI_rangeScaleWindow').value = BIO3INI_w_width;
	document.getElementById('INI_editNewWindowWidth').value = BIO3INI_w_width;
	document.getElementById('INI_editNewWindowHeigth').value = BIO3INI_w_height;
	document.getElementById('INI_rangeScaleFullScreen').value = BIO3INI_f_width;
	document.getElementById('INI_editNewFullScreenWidth').value = BIO3INI_f_width;
	document.getElementById('INI_editNewFullScreenHeigth').value = BIO3INI_f_height;
	document.getElementById('INI_lbl_windowRes').innerHTML = BIO3INI_w_width + 'x' + BIO3INI_w_height;
	document.getElementById('INI_lbl_newWindowRes').innerHTML =  BIO3INI_w_width + 'x' + BIO3INI_w_height;
	document.getElementById('INI_lbl_newFullScreenRes').innerHTML = BIO3INI_f_width + 'x' + BIO3INI_f_height + 'x' + BPP;
	document.getElementById('INI_lbl_fullScreenRes').innerHTML = BIO3INI_f_width + 'x' + BIO3INI_f_height + ' (' + BIO3INI_f_BPP + ' BPP)';
	// Game Assets
	document.getElementById('INI_edit_savePath').value   = BIO3INI_Save;
	document.getElementById('INI_edit_registPath').value = BIO3INI_Regist;
	document.getElementById('INI_edit_moviesPath').value = BIO3INI_Movie;
	document.getElementById('INI_edit_rofsPath_1').value = BIO3INI_Rofs1;
	document.getElementById('INI_edit_rofsPath_2').value = BIO3INI_Rofs2;
	document.getElementById('INI_edit_rofsPath_3').value = BIO3INI_Rofs3;
	document.getElementById('INI_edit_rofsPath_4').value = BIO3INI_Rofs4;
	document.getElementById('INI_edit_rofsPath_5').value = BIO3INI_Rofs5;
	document.getElementById('INI_edit_rofsPath_6').value = BIO3INI_Rofs6;
	document.getElementById('INI_edit_rofsPath_7').value = BIO3INI_Rofs7;
	document.getElementById('INI_edit_rofsPath_8').value = BIO3INI_Rofs8;
	document.getElementById('INI_edit_rofsPath_9').value = BIO3INI_Rofs9;
	document.getElementById('INI_edit_rofsPath_10').value = BIO3INI_Rofs10;
	document.getElementById('INI_edit_rofsPath_11').value = BIO3INI_Rofs11;
	document.getElementById('INI_edit_rofsPath_12').value = BIO3INI_Rofs12;
	document.getElementById('INI_edit_rofsPath_13').value = BIO3INI_Rofs13;
	document.getElementById('INI_edit_rofsPath_14').value = BIO3INI_Rofs14;
	document.getElementById('INI_edit_rofsPath_15').value = BIO3INI_Rofs15;
	// Audio
	document.getElementById('INI_lbl_audioDevice').innerHTML = BIO3INI_sound_device;
	document.getElementById('INI_lbl_audioBGMVol').innerHTML = parsePercentage(BIO3INI_sound_bgmVol, 65534) + '% (' + BIO3INI_sound_bgmVol + ' / 65534)';
	document.getElementById('INI_lbl_audioSEVol').innerHTML  = parsePercentage(BIO3INI_sound_seVol, 65534) + '% (' + BIO3INI_sound_seVol + ' / 65534)';
	document.getElementById('INI_editNewBGMVol').value = BIO3INI_sound_bgmVol;
	document.getElementById('INI_editNewSEVol').value = BIO3INI_sound_seVol;
	INI_updateRangeAudioVolume(0, 1);
	INI_updateRangeAudioVolume(1, 1);
	// Misc
	document.getElementById('INI_edit_checkbox_playMovie').checked = BIO3INI_v_disableMovie;
	document.getElementById('INI_edit_checkbox_voodoo2').checked = BIO3INI_v_disableSpecular;
	document.getElementById('INI_edit_checkbox_disableAlpha').checked = BIO3INI_v_disableAlpha;
	document.getElementById('INI_edit_checkbox_textureCorrection').checked = BIO3INI_v_textureAdjust;
	document.getElementById('INI_edit_checkbox_textureCompletion').checked = BIO3INI_v_disableLinear;
	document.getElementById('INI_lbl_miscTextureCorrection').innerHTML = BIO3INI_v_textureAdjust; 		// TextureAdjust
	document.getElementById('INI_lbl_miscTextureCompletion').innerHTML = BIO3INI_v_disableLinear; 		// DisableLinear
	document.getElementById('INI_lbl_miscDisableAlpha').innerHTML = BIO3INI_v_disableAlpha;		  		// DisableAlpha
	document.getElementById('INI_lbl_miscPlayMovies').innerHTML = BIO3INI_v_disableMovie;		  		// DisableMovie
	document.getElementById('INI_lbl_miscVoodoo2').innerHTML = BIO3INI_v_disableSpecular;		  		// Voodoo 2
	// Keyboard
	document.getElementById('INI_edit_Key5').value = BIO3INI_kb_key5;
	document.getElementById('INI_edit_KeyB').value = BIO3INI_kb_keyB;
	document.getElementById('INI_edit_KeyE').value = BIO3INI_kb_keyE;
	document.getElementById('INI_edit_input_keyboard_up').value = BIO3INI_kb_key1;
	document.getElementById('INI_edit_input_keyboard_map').value = BIO3INI_kb_key7;
	document.getElementById('INI_edit_input_keyboard_down').value = BIO3INI_kb_key2;
	document.getElementById('INI_edit_input_keyboard_left').value = BIO3INI_kb_key3;
	document.getElementById('INI_edit_input_keyboard_right').value = BIO3INI_kb_key4;
	document.getElementById('INI_edit_input_keyboard_status').value = BIO3INI_kb_keyC;
	document.getElementById('INI_edit_input_keyboard_action').value = BIO3INI_kb_keyD;
	document.getElementById('INI_edit_input_keyboard_cancel').value = BIO3INI_kb_key6;
	document.getElementById('INI_edit_input_keyboard_drawEnemy').value = BIO3INI_kb_key9;
	document.getElementById('INI_edit_input_keyboard_drawObject').value = BIO3INI_kb_keyA;
	document.getElementById('INI_edit_input_keyboard_changeTarget').value = BIO3INI_kb_key8;
	// [Data]
	document.getElementById('INI_edit_data00').value = BIO3INI_data_00;
	document.getElementById('INI_edit_data01').value = BIO3INI_data_01;
	document.getElementById('INI_edit_data02').value = BIO3INI_data_02;
	document.getElementById('INI_edit_data03').value = BIO3INI_data_03;
	document.getElementById('INI_edit_dataEpilogues').value = BIO3INI_data_10;
	document.getElementById('INI_edit_dataComplete').value = BIO3INI_data_complete;
}
function INI_clearKeyboardFields(){
	BIO3INI_kb_key1 = '';
	BIO3INI_kb_key2 = '';
	BIO3INI_kb_key3 = '';
	BIO3INI_kb_key4 = '';
	BIO3INI_kb_key5 = '';
	BIO3INI_kb_key6 = '';
	BIO3INI_kb_key7 = '';
	BIO3INI_kb_key8 = '';
	BIO3INI_kb_key9 = '';
	BIO3INI_kb_keyA = '';
	BIO3INI_kb_keyB = '';
	BIO3INI_kb_keyC = '';
	BIO3INI_kb_keyD = '';
	BIO3INI_kb_keyE = '';
	document.getElementById('INI_edit_Key5').value = '';
	document.getElementById('INI_edit_KeyB').value = '';
	document.getElementById('INI_edit_KeyE').value = '';
	document.getElementById('INI_edit_input_keyboard_up').value = '';
	document.getElementById('INI_edit_input_keyboard_map').value = '';
	document.getElementById('INI_edit_input_keyboard_down').value = '';
	document.getElementById('INI_edit_input_keyboard_left').value = '';
	document.getElementById('INI_edit_input_keyboard_right').value = '';
	document.getElementById('INI_edit_input_keyboard_status').value = '';
	document.getElementById('INI_edit_input_keyboard_action').value = '';
	document.getElementById('INI_edit_input_keyboard_cancel').value = '';
	document.getElementById('INI_edit_input_keyboard_drawEnemy').value = '';
	document.getElementById('INI_edit_input_keyboard_drawObject').value = '';
	document.getElementById('INI_edit_input_keyboard_changeTarget').value = '';
}
function INI_updateRangeAudioVolume(mode, source){
	// Source 0: Range, 1: Input number
	// Mode 0: BGM, 1: SE
	var newSEVol = document.getElementById('INI_editNewSEVol').value;
	var newBGMVol = document.getElementById('INI_editNewBGMVol').value;
	if (newBGMVol > 65535){
		newBGMVol = 65534;
	}
	if (newBGMVol < 0 || newBGMVol === '' || parseInt(newBGMVol) === NaN){
		newBGMVol = 0;
	}
	if (newSEVol > 65535){
		newSEVol = 65535;
	}
	if (newSEVol < 0 || newSEVol === '' || parseInt(newSEVol) === NaN){
		newSEVol = 0;
	}
	if (source === 0){
		if (mode === 0){
			document.getElementById('INI_editNewBGMVol').value = document.getElementById('INI_editAudioBGMVolRange').value;
		} else {
			document.getElementById('INI_editNewSEVol').value = document.getElementById('INI_editAudioSEVolRange').value;
		}
	} else {
		if (mode === 0){
			document.getElementById('INI_editAudioBGMVolRange').value = newBGMVol;
		} else {
			document.getElementById('INI_editAudioSEVolRange').value = newSEVol;
		}
	}
	document.getElementById('INI_LBL_editBGM_percent').innerHTML = parsePercentage(newBGMVol, 65535);
	document.getElementById('INI_LBL_editSE_percent').innerHTML = parsePercentage(newSEVol, 65535);
	BIO3INI_sound_bgmVol = newBGMVol;
	BIO3INI_sound_seVol = newSEVol;
}
function INI_convertToBool(value, mode){
	if (mode === 0){
		if (value !== '' && value !== null){
			if (value === 'on'){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		if (value !== '' && value !== null){
			if (value === 'on'){
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	}
}
// Video & Scaler
function BIO3INI_videoOptionCheckbox(){
	BIO3INI_v_disableMovie = document.getElementById('INI_edit_checkbox_playMovie').checked;
	BIO3INI_v_disableSpecular = document.getElementById('INI_edit_checkbox_voodoo2').checked;
	BIO3INI_v_disableAlpha = document.getElementById('INI_edit_checkbox_disableAlpha').checked;
	BIO3INI_v_textureAdjust = document.getElementById('INI_edit_checkbox_textureCorrection').checked;
	BIO3INI_v_disableLinear = document.getElementById('INI_edit_checkbox_textureCompletion').checked;
}
function BIO3INI_changeRes(mode, isW){
	var newW;
	var newH;
	// Mode 0: Windowed, 1: Fullscreen
	if (mode === 0){
		newW = document.getElementById('INI_editNewWindowWidth').value;
		newH = document.getElementById('INI_editNewWindowHeigth').value;
	} else {
		newW = document.getElementById('INI_editNewFullScreenWidth').value;
		newH = document.getElementById('INI_editNewFullScreenHeigth').value;
	}
	if (newW < 1 || newW === '' || newW === NaN){
		newW = 1;
	}
	if (newW > BIO3INI_MAX_WIDTH){
		newW = BIO3INI_MAX_WIDTH;
	}
	if (newH < 1 || newH === '' || newH === NaN){
		newH = 1;
	}
	if (newH > BIO3INI_MAX_HEIGHT){
		newH = BIO3INI_MAX_HEIGHT;
	}
	if (mode === 0){
		document.getElementById('INI_rangeScaleWindow').value = newW;
		if (isW === true){
			document.getElementById('INI_editNewWindowHeigth').value = BIO3INI_CALC_RES(newW, 1);
			document.getElementById('INI_lbl_newWindowRes').innerHTML = newW + 'x' + BIO3INI_CALC_RES(newW, 1);
		} else {
			document.getElementById('INI_lbl_newWindowRes').innerHTML = newW + 'x' + newH;
		}
		if (newW < 200 && newH < 200){
			document.getElementById('INI_lbl_newWindowRes').title = 'I bet you can play in this res!';
		} else {
			document.getElementById('INI_lbl_newWindowRes').title = '';
		}
		BIO3INI_w_height = newH;
		BIO3INI_w_width = newW;
	} else {
		var BPP = document.getElementById('INI_editSelectFullScreenBPP').value;
		document.getElementById('INI_rangeScaleFullScreen').value = newW;
		if (isW === true){
			document.getElementById('INI_editNewFullScreenHeigth').value = BIO3INI_CALC_RES(newW, 2);
			document.getElementById('INI_lbl_newFullScreenRes').innerHTML = newW + 'x' + BIO3INI_CALC_RES(newW, 2) + 'x' + BPP;
		} else {
			document.getElementById('INI_lbl_newFullScreenRes').innerHTML = newW + 'x' + newH + 'x' + BPP;
		}
		if (newW < 200 && newH < 200){
			document.getElementById('INI_lbl_newFullScreenRes').title = 'I bet you can play in this res!';
		} else {
			document.getElementById('INI_lbl_newFullScreenRes').title = '';
		}
		BIO3INI_f_height = newH;
		BIO3INI_f_width = newW;
	}
}
function BIO3INI_runVideoScaler(scalerId){
	// Scaler 0: Window, 1: FullScreen
	var newResW;
	var newResH;
	var BPP = document.getElementById('INI_editSelectFullScreenBPP').value;
	if (scalerId === 0){
		newResW = document.getElementById('INI_rangeScaleWindow').value;
		newResH = BIO3INI_CALC_RES(newResW, 1);
		document.getElementById('INI_editNewWindowWidth').value = newResW;
		document.getElementById('INI_editNewWindowHeigth').value = newResH;
		document.getElementById('INI_lbl_newWindowRes').innerHTML = newResW + 'x' + newResH;
		BIO3INI_w_height = newResH;
		BIO3INI_w_width = newResW;
		if (newResW < 200 && newResH < 200){
			document.getElementById('INI_lbl_newWindowRes').title = 'I bet you can play in this res!';
		} else {
			document.getElementById('INI_lbl_newWindowRes').title = '';
		}
	} else {
		newResW = document.getElementById('INI_rangeScaleFullScreen').value;
		newResH = BIO3INI_CALC_RES(newResW, 2);
		document.getElementById('INI_editNewFullScreenWidth').value = newResW;
		document.getElementById('INI_editNewFullScreenHeigth').value = newResH;
		document.getElementById('INI_lbl_newFullScreenRes').innerHTML = newResW + 'x' + newResH + 'x' + BPP;
		BIO3INI_f_height = newResH;
		BIO3INI_f_width = newResW;
		if (newResW < 200 && newResH < 200){
			document.getElementById('INI_lbl_newFullScreenRes').title = 'I bet you can play in this res!';
		} else {
			document.getElementById('INI_lbl_newFullScreenRes').title = '';
		}
	}
}
function BIO3INI_CALC_RES(num, mod){
	if (num < 140){
		num = 140;
	}
	if (mod === 1){
		return parseInt(num / 2 * 1.5);
	} else {
		return parseInt(num / 2 * 1.6);
	}
}
function BIO3INI_OPEN_NOTEPAD(){
	runExternalSoftware('notepad', [ORIGINAL_FILENAME]);
}
/*
	Finalize File
*/
function BIO3INI_SAVE(askSave){
	// General
	BIO3INI_Save = document.getElementById('INI_edit_savePath').value;
	BIO3INI_Movie = document.getElementById('INI_edit_registPath').value;
	BIO3INI_Regist = document.getElementById('INI_edit_moviesPath').value;
	BIO3INI_Rofs1 = document.getElementById('INI_edit_rofsPath_1').value;
	BIO3INI_Rofs2 = document.getElementById('INI_edit_rofsPath_2').value;
	BIO3INI_Rofs3 = document.getElementById('INI_edit_rofsPath_3').value;
	BIO3INI_Rofs4 = document.getElementById('INI_edit_rofsPath_4').value;
	BIO3INI_Rofs5 = document.getElementById('INI_edit_rofsPath_5').value;
	BIO3INI_Rofs6 = document.getElementById('INI_edit_rofsPath_6').value;
	BIO3INI_Rofs7 = document.getElementById('INI_edit_rofsPath_7').value;
	BIO3INI_Rofs8 = document.getElementById('INI_edit_rofsPath_8').value;
	BIO3INI_Rofs9 = document.getElementById('INI_edit_rofsPath_9').value;
	BIO3INI_Rofs10 = document.getElementById('INI_edit_rofsPath_10').value;
	BIO3INI_Rofs11 = document.getElementById('INI_edit_rofsPath_11').value;
	BIO3INI_Rofs12 = document.getElementById('INI_edit_rofsPath_12').value;
	BIO3INI_Rofs13 = document.getElementById('INI_edit_rofsPath_13').value;
	BIO3INI_Rofs14 = document.getElementById('INI_edit_rofsPath_14').value;
	BIO3INI_Rofs15 = document.getElementById('INI_edit_rofsPath_15').value;
	// Video
	if (document.getElementById('INI_edit_checkbox_playMovie').checked === true){
		BIO3INI_v_disableMovie = 'on';
	} else {
		BIO3INI_v_disableMovie = 'off';
	}
	if (document.getElementById('INI_edit_checkbox_voodoo2').checked === true){
		BIO3INI_v_disableSpecular = 'on';
	} else {
		BIO3INI_v_disableSpecular = 'off';
	}
	if (document.getElementById('INI_edit_checkbox_disableAlpha').checked === true){
		BIO3INI_v_disableAlpha = 'on';
	} else {
		BIO3INI_v_disableAlpha = 'off';
	}
	if (document.getElementById('INI_edit_checkbox_textureCorrection').checked === true){
		BIO3INI_v_textureAdjust = 'on';
	} else {
		BIO3INI_v_textureAdjust = 'off';
	}
	if (document.getElementById('INI_edit_checkbox_textureCompletion').checked === true){
		BIO3INI_v_disableLinear = 'off';
	} else {
		BIO3INI_v_disableLinear = 'on';
	}
	BIO3INI_v_mode = document.getElementById('INI_edit_displayMode').value;
	// Windowed
	BIO3INI_w_width = document.getElementById('INI_editNewWindowWidth').value;
	BIO3INI_w_height = document.getElementById('INI_editNewWindowHeigth').value;
	// Fullscreen
	BIO3INI_f_BPP = document.getElementById('INI_editSelectFullScreenBPP').value;
	BIO3INI_f_width = document.getElementById('INI_editNewFullScreenWidth').value;
	BIO3INI_f_height = document.getElementById('INI_editNewFullScreenHeigth').value;
	// Keyboard
	BIO3INI_kb_key5 = document.getElementById('INI_edit_Key5').value;
	BIO3INI_kb_keyB = document.getElementById('INI_edit_KeyB').value;
	BIO3INI_kb_keyE = document.getElementById('INI_edit_KeyE').value;
	BIO3INI_kb_key1 = document.getElementById('INI_edit_input_keyboard_up').value;
	BIO3INI_kb_key7 = document.getElementById('INI_edit_input_keyboard_map').value;
	BIO3INI_kb_key2 = document.getElementById('INI_edit_input_keyboard_down').value;
	BIO3INI_kb_key3 = document.getElementById('INI_edit_input_keyboard_left').value;
	BIO3INI_kb_key4 = document.getElementById('INI_edit_input_keyboard_right').value;
	BIO3INI_kb_keyC = document.getElementById('INI_edit_input_keyboard_status').value;
	BIO3INI_kb_keyD = document.getElementById('INI_edit_input_keyboard_action').value;
	BIO3INI_kb_key6 = document.getElementById('INI_edit_input_keyboard_cancel').value;
	BIO3INI_kb_key9 = document.getElementById('INI_edit_input_keyboard_drawEnemy').value;
	BIO3INI_kb_keyA = document.getElementById('INI_edit_input_keyboard_drawObject').value;
	BIO3INI_kb_key8 = document.getElementById('INI_edit_input_keyboard_changeTarget').value;
	// Sound
	BIO3INI_sound_seVol = document.getElementById('INI_editNewSEVol').value;
	BIO3INI_sound_bgmVol = document.getElementById('INI_editNewBGMVol').value;
	// Data
	BIO3INI_data_00 = document.getElementById('INI_edit_data00').value;
	BIO3INI_data_01 = document.getElementById('INI_edit_data01').value;
	BIO3INI_data_02 = document.getElementById('INI_edit_data02').value;
	BIO3INI_data_03 = document.getElementById('INI_edit_data03').value;
	BIO3INI_data_10 = document.getElementById('INI_edit_dataEpilogues').value;
	BIO3INI_data_complete = document.getElementById('INI_edit_dataComplete').value;
	//
	BIO3INI_MAKEFILE(ORIGINAL_FILENAME, parseInt(askSave));
}
function BIO3INI_MAKE_WZINI(mode){
	mode = parseInt(mode);
	BIO3INI_Save = ".\\Save";
	BIO3INI_Movie = ".\\zmovie";
	BIO3INI_Regist = ".\\regist.txt";
	if (mode !== 2){
		BIO3INI_Rofs1 = ".\\DATA\\DOOR";
		BIO3INI_Rofs2 = ".\\DATA_AE\\ETC2";
		BIO3INI_Rofs3 = ".\\DATA\\ETC";
		BIO3INI_Rofs4 = ".\\DATA_E\\ETC2";
		BIO3INI_Rofs5 = ".\\DATA\\PLD";
		BIO3INI_Rofs6 = ".\\DATA_A\\PLD";
		BIO3INI_Rofs7 = ".\\DATA\\SOUND";
		BIO3INI_Rofs8 = ".\\DATA_A\\BSS";
		BIO3INI_Rofs9 = ".\\ROOM\\EMD";
		BIO3INI_Rofs10 = ".\\ROOM\\EMD08";
		// Rofs fix
		if (mode === 0){
			BIO3INI_Rofs11 = ".\\ROOM\\RBJ";
		} else if (mode === 1){
			BIO3INI_Rofs11 = ".\\rofs11.dat";
		}
		BIO3INI_Rofs12 = ".\\DATA_AJ\\RDT";
		BIO3INI_Rofs13 = ".\\DATA_E\\RDT";
		BIO3INI_Rofs14 = ".\\DATA_A\\VOICE";
		BIO3INI_Rofs15 = ".\\DATA_A\\SOUND";
		BIO3INI_MAKEFILE(APP_PATH + "\\Assets\\Bio3.ini", 0);
	} else {
		BIO3INI_Rofs1 = ".\\Rofs1.dat";
		BIO3INI_Rofs2 = ".\\Rofs2.dat";
		BIO3INI_Rofs3 = ".\\Rofs3.dat";
		BIO3INI_Rofs4 = ".\\Rofs4.dat";
		BIO3INI_Rofs5 = ".\\Rofs5.dat";
		BIO3INI_Rofs6 = ".\\Rofs6.dat";
		BIO3INI_Rofs7 = ".\\Rofs7.dat";
		BIO3INI_Rofs8 = ".\\Rofs8.dat";
		BIO3INI_Rofs9 = ".\\Rofs9.dat";
		BIO3INI_Rofs10 = ".\\Rofs10.dat";
		BIO3INI_Rofs11 = ".\\rofs11.dat";
		BIO3INI_Rofs12 = ".\\Rofs12.dat";
		BIO3INI_Rofs13 = ".\\Rofs13.dat";
		BIO3INI_Rofs14 = ".\\Rofs14.dat";
		BIO3INI_Rofs15 = ".\\Rofs15.dat";
		BIO3INI_MAKEFILE(APP_PATH + "\\Assets\\Bio3.ini", 1);
	}
}
function BIO3INI_MAKEFILE(path, mode){
	// Mode 0: replace the original file, 1: ask to save
	var FINAL = "[General]\n" +
		"Save=" + BIO3INI_Save + "\n" +
		"Regist=" + BIO3INI_Regist + '\n' + // what is this file anyways?
		"Movie=" + BIO3INI_Movie + "\n" +
		"Rofs1=" + BIO3INI_Rofs1 + "\n" +
		"Rofs2=" + BIO3INI_Rofs2 + "\n" +
		"Rofs3=" + BIO3INI_Rofs3 + "\n" +
		"Rofs4=" + BIO3INI_Rofs4 + "\n" +
		"Rofs5=" + BIO3INI_Rofs5 + "\n" +
		"Rofs6=" + BIO3INI_Rofs6 + "\n" +
		"Rofs7=" + BIO3INI_Rofs7 + "\n" +
		"Rofs8=" + BIO3INI_Rofs8 + "\n" +
		"Rofs9=" + BIO3INI_Rofs9 + "\n" +
		"Rofs10=" + BIO3INI_Rofs10 + "\n" +
		"Rofs11=" + BIO3INI_Rofs11 + "\n" +
		"Rofs12=" + BIO3INI_Rofs12 + "\n" +
		"Rofs13=" + BIO3INI_Rofs13 + "\n" +
		"Rofs14=" + BIO3INI_Rofs14 + "\n" +
		"Rofs15=" + BIO3INI_Rofs15 + "\n\n[Video]\n" +
		"DisableMovie=" + BIO3INI_v_disableMovie + "\n" +
		"DisableAlpha=" + BIO3INI_v_disableAlpha + "\n" +
		"DisableLinear=" + BIO3INI_v_disableLinear + "\n" +
		"DisableSpecular=" + BIO3INI_v_disableSpecular + "\n" +
		"TextureAdjust=" + BIO3INI_v_textureAdjust + "\n" +
		"Mode=" + BIO3INI_v_mode + "\n\n[Windowed]\n" +
		"Driver=" + BIO3INI_w_driver + "\n" +
		"Device=" + BIO3INI_w_device + "\n" +
		"Width=" + BIO3INI_w_width + "\n" +
		"Height=" + BIO3INI_w_height + "\n" +
		"BPP=" + BIO3INI_w_BPP + "\n\n[FullScreen]\n" +
		"Driver=" + BIO3INI_f_driver + "\n" +
		"Device=" + BIO3INI_f_device + "\n" +
		"Width=" + BIO3INI_f_width + "\n" +
		"Height=" + BIO3INI_f_height + "\n" +
		"BPP=" + BIO3INI_f_BPP + "\n\n[Keyboard]\n" +
		"Key1=" + BIO3INI_kb_key1 + "\n" +
		"Key2=" + BIO3INI_kb_key2 + "\n" +
		"Key3=" + BIO3INI_kb_key3 + "\n" +
		"Key4=" + BIO3INI_kb_key4 + "\n" +
		"Key5=" + BIO3INI_kb_key5 + "\n" +
		"Key6=" + BIO3INI_kb_key6 + "\n" +
		"Key7=" + BIO3INI_kb_key7 + "\n" +
		"Key8=" + BIO3INI_kb_key8 + "\n" +
		"Key9=" + BIO3INI_kb_key9 + "\n" +
		"KeyA=" + BIO3INI_kb_keyA + "\n" +
		"KeyB=" + BIO3INI_kb_keyB + "\n" +
		"KeyC=" + BIO3INI_kb_keyC + "\n" +
		"KeyD=" + BIO3INI_kb_keyD + "\n" +
		"KeyE=" + BIO3INI_kb_keyE + "\n\n[Sound]\n" +
		"Device=" + BIO3INI_sound_device + "\n" +
		"SEvol=" + BIO3INI_sound_seVol + "\n" +
		"BGMvol=" + BIO3INI_sound_bgmVol + "\n\n[Data]\n" +
		'Complete=' + BIO3INI_data_complete + '\n' +
		'Data00=' + BIO3INI_data_00 + '\n' +
		'Data01=' + BIO3INI_data_01 + '\n' +
		'Data02=' + BIO3INI_data_02 + '\n' +
		'Data03=' + BIO3INI_data_03 + '\n' +
		'Data10=' + BIO3INI_data_10 + '\n\n';
	addLog('log', "INFO - Bio3INI: The file was generated sucessfully!");
	log_separador();
	// Saving the file!
	if (mode === 0){
		try{
			fs.writeFileSync(path, FINAL, 'utf-8');
			addLog('log', "INFO - Bio3INI: The file was saved sucessfully!");
			addLog('log', 'Path - ' + path);
		} catch (err){
			console.error("ERROR - Bio3INI: Something went wrong!\n" + err);
			addLog('error', "ERROR - Bio3INI: Something went wrong!");
			addLog('error', err);
		}
	} else {
		R3DITOR_SAVE('Bio3.ini', FINAL, 'utf-8');
	}
	scrollLog();
}