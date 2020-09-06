/*
	R3ditor - RDT_Experiment.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Please don't rely your hopes on this.

	This is only a experiment, so don't believe on these lines - it will not save the world...
	...Or it will? Who knows!
*/
/*
	RDT Extract Vars
*/
var RDT_DECOMPILER_RUNNING_MASTER = false, RDT_V2_EXT_RUNNING = false;
var RDT_V2_READER_CURRENT_SECTION, RDT_V2_READER_INTERVAL, RDT_V2_SECOND_INTERVAL, RDT_V2_READER_CURRENT_LOCATION;
/*
	Header Vars
*/
var RDT_V2_MAP_HEADER;		  // Hx     Hx
var RDT_V2_HEADER_RID_TOTAL;  // 00 --> 02: Number of Total Cameras (RID)
var RDT_V2_HEADER_UNK_0;      // 08 --> 09: ???
var RDT_V2_HEADER_BOUNDARIES; // 20 --> 21: Boundaries
var RDT_V2_HEADER_CAM_POS;    // 24 --> 25: Camera Position
var RDT_V2_HEADER_COLISION;   // 28 --> 29: Camera Colision
var RDT_V2_HEADER_OBJ; 	   	  // 30 --> 31: Total Objects?  (TIM)
var RDT_V2_HEADER_LIGHTS;     // 2C --> 2D: Lights (LIT)
var RDT_V2_HEADER_UNK_1;      // 38 --> 39: ???
var RDT_V2_HEADER_MSG;        // 3C --> 3D: Text Pointers (if 0000 = no text)
var RDT_V2_HEADER_SCD;	   	  // 48 --> 49: Script Execution (SCD)
var RDT_V2_HEADER_UNK_2;      // 58 --> 59: ??? (Nemesis drop? Sometimes it points to file end... Why?)
var RDT_V2_HEADER_PRI;        // ?? --> ??
/*
	SCD Vars
*/
var RDT_V2_SCD_CODE;
/*
	Functions
*/
function RDT_V2_PREPARE(){
	if (RDT_arquivoBruto !== undefined){
		try {
			RDT_V2_READER_CURRENT_LOCATION = 0;
			RDT_V2_MAP_HEADER 		= RDT_arquivoBruto.slice(RANGES['RDT_FILE_MAP_HEADER'][0], RANGES['RDT_FILE_MAP_HEADER'][1]);
			/*
				Start reading pointers in Hex Order
			*/
			// Total Cameras
			RDT_V2_HEADER_RID_TOTAL = parseEndian(RDT_V2_MAP_HEADER.slice(RANGES['RDT_HEADER_RID_MAX'][0], RANGES['RDT_HEADER_RID_MAX'][1]));
			// Objects
			RDT_V2_HEADER_OBJ 		= parseEndian(RDT_V2_MAP_HEADER.slice(RANGES['RDT_HEADER_OBJ_POS'][0], RANGES['RDT_HEADER_OBJ_POS'][1]));
			// Text Message
			RDT_V2_HEADER_MSG		= parseEndian(RDT_V2_MAP_HEADER.slice(RANGES['RDT_HEADER_MSG_POS'][0], RANGES['RDT_HEADER_MSG_POS'][1]));
			// Script Execution (SCD)
			RDT_V2_HEADER_SCD       = parseEndian(RDT_V2_MAP_HEADER.slice(RANGES['RDT_HEADER_SCD_POS'][0], RANGES['RDT_HEADER_SCD_POS'][1]));
			// End
			RDT_V2_START();
		} catch (err) {
			console.error('ERROR - Unable to read RDT header!\nReason: ' + err);
			LOG_addLog('error', 'ERROR - Unable to read RDT Header!');
			LOG_addLog('error', 'ERROR - Reason: ' + err);
		}
		LOG_scroll();
	}
}
function RDT_V2_START(){
	alert('WARN - RDT Decompiler V2 is WIP! Please, disable \"Decompile using experimental mode (WIP)\" mode on Settings.');
	LOG_addLog('warn', 'WARN - RDT Decompiler V2 is WIP! Please, disable \"Decompile using experimental mode (WIP)\" mode on Settings.');
	// RDT_V2_EXTRACT();
}
/*
	Read RDT
*/
function RDT_V2_EXTRACT(){
	// Start with cameras
	RDT_V2_EXTRACT_RID();
	RDT_V2_READER_INTERVAL = setInterval(function(){
		if (RDT_V2_READER_CURRENT_LOCATION !== RDT_arquivoBruto.length || RDT_V2_READER_CURRENT_LOCATION < RDT_arquivoBruto.length){
			if (RDT_V2_EXT_RUNNING !== true){
				RDT_V2_GOTO_NEXT_SECTION();
			} else {
				console.info('Waiting ' + RDT_V2_READER_CURRENT_SECTION);
			}
		} else {
			// Done Loading (Show Menu)
			clearInterval(RDT_V2_READER_INTERVAL);
		}
	}, 1000);
}
function RDT_V2_GOTO_NEXT_SECTION(){
	var nextPos = RDT_V2_READER_CURRENT_LOCATION.toString(16).match(/.{2,2}/g).reverse().toString().replace(new RegExp(',', 'g'), '');
	var OBJ_FORMAT = parseInt(RDT_V2_HEADER_OBJ, 16).toString(16);
	var MSG_FORMAT = parseInt(RDT_V2_HEADER_MSG, 16).toString(16);
	var SCD_FORMAT = parseInt(RDT_V2_HEADER_SCD, 16).toString(16);
	// OBJ
	if (nextPos === OBJ_FORMAT){
		RDT_V2_EXTRACT_OBJ();
	}
	// SCD
	if (nextPos === SCD_FORMAT){
		RDT_V2_EXTRACT_SCD();
	}
	// MSG
	if (nextPos === MSG_FORMAT){
		RDT_V2_EXTRACT_MSG();
	}
}
/*
	Objects / TIM (OBJ)
*/
function RDT_V2_EXTRACT_OBJ(){
	if (RDT_arquivoBruto !== undefined){
		RDT_V2_EXT_RUNNING = true;
		RDT_V2_READER_CURRENT_SECTION = 'OBJ';
		// WIP
	}
}
/*
	Text Messages Database (MSG)
*/
function RDT_V2_EXTRACT_MSG(){
	if (RDT_arquivoBruto !== undefined){
		RDT_V2_EXT_RUNNING = true;
		RDT_V2_READER_CURRENT_SECTION = 'MSG';
		// WIP
	}
}
/*
	Map Script Execution (SCD)
*/
function RDT_V2_EXTRACT_SCD(){
    if (RDT_arquivoBruto !== undefined){
    	RDT_V2_EXT_RUNNING = true;
    	RDT_V2_READER_CURRENT_SECTION = 'SCD';
    	LOG_addLog('log', 'INFO - RDT V2: Reading SCD...');
    	RDT_V2_HEADER_SCD = parseEndian(RDT_arquivoBruto.slice(RANGES['RDT_HEADER_SCD_POS'][0], RANGES['RDT_HEADER_SCD_POS'][1]));
        var SCD_HEX_STARTPOS = (parseInt(RDT_V2_HEADER_SCD, 16) * 2);
        var SCD_POINTER_START = parseEndian(RDT_arquivoBruto.slice(SCD_HEX_STARTPOS, (SCD_HEX_STARTPOS + 4)));
        var SCD_POINTER_END = SCD_HEX_STARTPOS + (parseInt(SCD_POINTER_START, 16) * 2);
        var SCD_LENGTH = (parseInt(parseEndian(RDT_arquivoBruto.slice((SCD_POINTER_END - 4), SCD_POINTER_END)), 16) * 2);
        RDT_V2_SCD_CODE = RDT_arquivoBruto.slice(SCD_HEX_STARTPOS, (SCD_HEX_STARTPOS + SCD_LENGTH));
        RDT_V2_SCD_decompile();
        // End
        RDT_V2_EXT_RUNNING = false;
    }
}
function RDT_V2_SCD_decompile(){
	// WIP
}
/*
	Camera Angles (RID)
*/
function RDT_V2_EXTRACT_RID(){
	if (RDT_arquivoBruto !== undefined){
		RDT_V2_EXT_RUNNING = true;
		RDT_V2_READER_CURRENT_SECTION = 'RID';
		LOG_addLog('log', 'INFO - RDT V2: Reading Camera Positions...');
		//
		var c = 0, start = 192, offset = 64;
		var extractTotCams = parseInt(RDT_arquivoBruto.slice(2, 4), 16);
		var extract = RDT_arquivoBruto.slice(start, parseInt(start + offset));
		while(RDT_totalCameras < extractTotCams){
			RDT_cameraArray.push(extract);
			RDT_totalCameras++;
			start = parseInt(start + offset);
			extract = RDT_arquivoBruto.slice(start, parseInt(start + offset));
		}
		while(c < RDT_cameraArray.length){
			localStorage.setItem('RDT_Camera-' + c, RDT_cameraArray[c]);
			RDT_V2_RID_decompile(c);
			c++;
		}
		// End
		RDT_V2_SECOND_INTERVAL = setInterval(function(){
			if ((c < RDT_cameraArray.length) !== true){
				// Set cuurrent location as the end of last camera read
				RDT_V2_READER_CURRENT_LOCATION = parseInt(RDT_arquivoBruto.indexOf(RDT_cameraArray[(RDT_cameraArray.length - 1)]) + offset);
				// End
				RDT_V2_EXT_RUNNING = false;
				clearInterval(RDT_V2_SECOND_INTERVAL);
			}
		}, 1000);
	}
}
function RDT_V2_RID_decompile(id){
	var CAM_IMG, titleFileName, CAM_ID = id.toString(16).toUpperCase();
	if (CAM_ID.length < 2){
		CAM_ID = '0' + CAM_ID;
	}
	if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_mapName + CAM_ID + '.JPG') === true){
		CAM_IMG = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_mapName + CAM_ID + '.JPG';
		titleFileName = 'Cam: ' +  CAM_ID + '\nFile name: ' + RDT_mapName + CAM_ID + '.JPG';
	} else {
		CAM_IMG = APP_PATH + '\\App\\Img\\404.png';
		titleFileName = 'Unable to render cam preview!\nFile not found (404)';
	}
	var CAM_HEX      = localStorage.getItem('RDT_Camera-' + id);
	var CAM_TYPE     = CAM_HEX.slice(RANGES['RDT_cam-0-type'][0],     RANGES['RDT_cam-0-type'][1]);
	var CAM_IDENT    = CAM_HEX.slice(RANGES['RDT_cam-0-ident'][0],	  RANGES['RDT_cam-0-ident'][1]);
	var CAM_XPOS     = CAM_HEX.slice(RANGES['RDT_cam-0-XPos'][0],     RANGES['RDT_cam-0-XPos'][1]);
	var CAM_XPOS_SIG = CAM_HEX.slice(RANGES['RDT_cam-0-XPos-Sig'][0], RANGES['RDT_cam-0-XPos-Sig'][1]);
	var CAM_YPOS 	 = CAM_HEX.slice(RANGES['RDT_cam-0-YPos'][0], 	  RANGES['RDT_cam-0-YPos'][1]);
	var CAM_YPOS_SIG = CAM_HEX.slice(RANGES['RDT_cam-0-YPos-Sig'][0], RANGES['RDT_cam-0-YPos-Sig'][1]);
	var CAM_ZPOS 	 = CAM_HEX.slice(RANGES['RDT_cam-0-ZPos'][0], 	  RANGES['RDT_cam-0-ZPos'][1]);
	var CAM_ZPOS_SIG = CAM_HEX.slice(RANGES['RDT_cam-0-ZPos-Sig'][0], RANGES['RDT_cam-0-ZPos-Sig'][1]);
	var CAM_XDIR 	 = CAM_HEX.slice(RANGES['RDT_cam-0-XDir'][0], 	  RANGES['RDT_cam-0-XDir'][1]);
	var CAM_XDIR_SIG = CAM_HEX.slice(RANGES['RDT_cam-0-XDir-Sig'][0], RANGES['RDT_cam-0-XDir-Sig'][1]);
	var CAM_YDIR 	 = CAM_HEX.slice(RANGES['RDT_cam-0-YDir'][0], 	  RANGES['RDT_cam-0-YDir'][1]);
	var CAM_YDIR_SIG = CAM_HEX.slice(RANGES['RDT_cam-0-YDir-Sig'][0], RANGES['RDT_cam-0-YDir-Sig'][1]);
	var CAM_ZDIR 	 = CAM_HEX.slice(RANGES['RDT_cam-0-ZDir'][0], 	  RANGES['RDT_cam-0-ZDir'][1]);
	var CAM_ZDIR_SIG = CAM_HEX.slice(RANGES['RDT_cam-0-ZDir-Sig'][0], RANGES['RDT_cam-0-ZDir-Sig'][1]);
	var CAM_RDIR 	 = CAM_HEX.slice(RANGES['RDT_cam-0-RDir'][0], 	  RANGES['RDT_cam-0-RDir'][1]);
	var CAM_RDIR_SIG = CAM_HEX.slice(RANGES['RDT_cam-0-RDir-Sig'][0], RANGES['RDT_cam-0-RDir-Sig'][1]);
	var MASSIVE_HTML_RDT_CAMERA_TEMPLATE = '<div class="RDT-Item RDT-camera-bg" id="RDT_CAM_ID_' + id + '"><div class="RDT_cam_imgFix"><img src="' + CAM_IMG + '" title="' + titleFileName + '" class="RDT_camImgItem"></div>' + 
		'<input type="button" class="btn-remover-comando RDT_modifyBtnFix" value="Modify" onclick="RDT_showEditCamera(\'' + id + '\', \'' + CAM_ID + '\');"><div class="RDT_cam_holderInfos">(' + parseInt(id + 1) + ') Cam: ' + 
		CAM_ID + '<div class="menu-separador"></div>X Pos: <font class="RDT_cam_lbl_fix_0">' + CAM_XPOS.toUpperCase() + '</font><br><i>Signal</i>: <font class="RDT_cam_lbl_fix_0">' + CAM_XPOS_SIG.toUpperCase() + '</font><br>' + 
		'Y Pos: ' + '<font class="RDT_cam_lbl_fix_0">' + CAM_YPOS.toUpperCase() + '</font><br><i>Signal</i>: <font class="RDT_cam_lbl_fix_0">' + CAM_YPOS_SIG.toUpperCase() + '</font><br>Z Pos: <font class="RDT_cam_lbl_fix_0">' + 
		CAM_ZPOS.toUpperCase() + '</font><br><i>Signal</i>: <font class="RDT_cam_lbl_fix_0">' + CAM_ZPOS_SIG.toUpperCase() + '</font><div class="RDT_cam_dirHolder">X Direction: <font class="RDT_cam_lbl_fix_1">' + CAM_XDIR.toUpperCase() + 
		'</font><br><i>Signal</i>: <font class="RDT_cam_lbl_fix_1">' + CAM_XDIR_SIG.toUpperCase() + '</font><br>Y Direction: <font class="RDT_cam_lbl_fix_1">' + CAM_YDIR.toUpperCase() + '</font><br><i>Signal</i>: <font class="RDT_cam_lbl_fix_1">' + 
		CAM_YDIR_SIG.toUpperCase() + '</font><br>Z Direction: <font class="RDT_cam_lbl_fix_1">' + CAM_ZDIR.toUpperCase() + '</font><br><i>Signal</i>: <font class="RDT_cam_lbl_fix_1">' + CAM_ZDIR_SIG.toUpperCase() + '</font></div><div class="RDT_cam_otherValues">' + 
		'Rotation: <font class="RDT_cam_lbl_fix_2">' + CAM_RDIR.toUpperCase() + '</font><br><i>Signal</i>: <font class="RDT_cam_lbl_fix_2">' + CAM_RDIR_SIG.toUpperCase() + '</font><br>Cam Type: <font class="RDT_cam_lbl_fix_2" title="' + RDT_CAMERAS_CAMTYPES[CAM_TYPE] + '">' + 
		CAM_TYPE.toUpperCase() + '</font><br>Identifier: <font class="RDT_cam_lbl_fix_2">' + CAM_IDENT.toUpperCase() + '</font></div><div class="menu-separador"></div>Hex: <font class="user-can-select"><font title="Cam Type">' + CAM_TYPE.toUpperCase() + '</font> <font title="Identifier">' + 
		CAM_IDENT.toUpperCase() + '</font> <font title="X Pos.">' + CAM_XPOS.toUpperCase() + '</font> <font title="X Sig.">' + CAM_XPOS_SIG.toUpperCase() + '</font> <font title="Y Pos.">' + CAM_YPOS.toUpperCase() + '</font> <font title="Y Sig.">' + CAM_YPOS_SIG.toUpperCase() + '</font> <font title="Z Pos.">' + 
		CAM_ZPOS.toUpperCase() + '</font> <font title="Z Sig.">' + CAM_ZPOS_SIG.toUpperCase() + '</font> <font title="X Direction">' + CAM_XDIR.toUpperCase() + '</font> <font title="X Dir. Sig.">' + CAM_XDIR_SIG.toUpperCase() + '</font> <font title="Y Direction">' + CAM_YDIR.toUpperCase() + '</font> <font title="Y Dir. Sig.">' + 
		CAM_YDIR_SIG.toUpperCase() + '</font> <font title="Z Direction">' + CAM_ZDIR.toUpperCase() + '</font> <font title="Z Dir. Sig.">' + CAM_ZDIR_SIG.toUpperCase() + '</font> <font title="Rotation">' + CAM_RDIR.toUpperCase() + '</font> <font title="Rotarion Sig.">' + 
		CAM_RDIR_SIG.toUpperCase() + '</font></font></div></div>';
	$('#RDT_camera_holder').append(MASSIVE_HTML_RDT_CAMERA_TEMPLATE);
}