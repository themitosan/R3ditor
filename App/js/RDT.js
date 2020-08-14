/*
	R3ditor - RDT.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Sorry. For real.
*/

// Cameras
var RDT_cameraArray = [];
var RDT_totalCameras = 0;
var TEMP_RDT_editCamera_camType = '';
var TEMP_RDT_editCam_ident = '';
var TEMP_RDT_XP_Origin = '';
var TEMP_RDT_XPS_Origin = '';
var TEMP_RDT_YP_Origin = '';
var TEMP_RDT_YPS_Origin = '';
var TEMP_RDT_ZP_Origin = '';
var TEMP_RDT_ZPS_Origin = '';
var TEMP_RDT_XD_Direction = '';
var TEMP_RDT_XDS_Direction = '';
var TEMP_RDT_YD_Direction = '';
var TEMP_RDT_YDS_Direction = '';
var TEMP_RDT_ZD_Direction = '';
var TEMP_RDT_ZDS_Direction = '';
var TEMP_RDT_RD_Direction = '';
var TEMP_RDT_RDS_Direction = '';

// MSG vars
var RDT_fm_path;
var RDT_fm_avaliable;
var RDT_totalMessages;
var RDT_MSGTEXT_MAXSIZE;
var RDT_MSGTEXT_POINTERS;
var RDT_MSGTEXT_startText;
var RDT_messageSeekPattern;
var RDT_MSGTEXT_currentBlkSize;

// MSG Code
var RDT_messageCodesArray = [];

// PROPS
var RDT_total3DProps;
var TEMP_PROP_X_POS = '';
var TEMP_PROP_Y_POS = '';
var TEMP_PROP_Z_POS = '';
var TEMP_PROP_R_POS = '';
var RDT_propModelsArray = [];

// DOORS
var RDT_totalDoors;
var RDT_doorsRaw = [];
var RDT_CURRENT_X = '';
var RDT_CURRENT_Y = '';
var RDT_CURRENT_Z = '';
var RDT_CURRENT_R = '';
var RDT_doorsArray = [];
var RDT_TEMP_NEXTX = '';
var RDT_TEMP_NEXTY = '';
var RDT_TEMP_NEXTZ = '';
var RDT_TEMP_NEXTR = '';
var RDT_TEMP_ZINDEX = '';
var RDT_selectedPoint = 0;
var RDT_TEMP_NEXT_ROOM = '';
var RDT_TEMP_NEXT_STAGE = '';
var RDT_TEMP_NEXT_CAMERA = '';
// Door Key
var RDT_TEMP_DOORKEY_ITEM = '';
var RDT_TEMP_DOORKEY_FLAG = '';
var RDT_TEMP_DOORKEY_UNKF = '';

// Items
var RDT_itemIndexRAW;
var RDT_totalFiles = 0;
var RDT_totalMapas = 0;
var RDT_totalItens = 0;
var RDT_ItensArray = [];
var RDT_totalItensGeral;

// Enemy / NPC'S
var RDT_totalEnemies;
var RDT_enemiesArray = [];
var RDT_TEMP_ENEMYNPC_TYPE = '';
var RDT_TEMP_ENEMYNPC_POSE = '';
var RDT_TEMP_ENEMYNPC_TEXTURE = '';
var RDT_TEMP_ENEMYNPC_SOUNDSET = '';
var RDT_TEMP_ENEMYNPC_EXTRAFLAG = '';
var RDT_TEMP_ENEMYNPC_ENEMYFLAG = '';

// Audios
var RDT_totalAudios;

// Utils
var RDT_mapName;
var RDT_fileType;
var RDT_loop = 0;
var RDT_arquivoBruto;
var RDT_lastBackup = '';
var RDT_loading = false;
var RDT_CANCRASH = false;
var RDT_ERRORMOTIVE = '';
var RDT_currentAudio = '';
var RDT_lastFileOpened = '';
var RDT_ARD_compatMode = false;

// MASKS
var RDT_SLD_FOUNDPOS;
var RDT_SLD_LAYER_TILESET_BMP;
var RDT_SLD_totalMasksAva = 0;
var RDT_SLD_MASKS_POSITION = [];
var RDT_SLD_relativeOffsets = 0;
var RDT_SLD_SEEK_SEMAPHORE = true;
var RDT_SLD_SEEK_MULTIMASK = false;
/*
	Functions
*/
function RDT_resetVars(){
	RDT_loop = 0;
	RDT_totalDoors = 0;
	RDT_totalItens = 0;
	RDT_totalFiles = 0;
	RDT_totalMapas = 0;
	RDT_totalAudios = 0;
	RDT_ItensArray = [];
	RDT_loading = false;
	RDT_CANCRASH = false;
	RDT_totalCameras = 0;
	RDT_totalEnemies = 0;
	RDT_cameraArray = [];
	RDT_enemiesArray = [];
	RDT_selectedPoint = 0;
	RDT_MAPFILE = undefined;
	RDT_propModelsArray = [];
	RDT_SLD_totalMasksAva = 0;
	block_size_hex = undefined;
	RDT_ARD_compatMode = false;
	RDT_messageCodesArray = [];
	RDT_SLD_MASKS_POSITION = [];
	RDT_arquivoBruto = undefined;
	RDT_itemIndexRAW = undefined;
	RDT_totalMessages = undefined;
	RDT_SLD_SEEK_SEMAPHORE = true;
	RDT_totalItensGeral = undefined;
	RDT_messageSeekPattern = undefined;

	RDT_SLD_FOUNDPOS = 0;
	RDT_SLD_LAYER_TILESET_BMP = undefined;
}
function RDT_openFile(file){
	RDT_loop = 0;
	RDT_CARREGAR_ARQUIVO(file);
}
function RDT_CARREGAR_ARQUIVO(rdtFile){
	if (fs.existsSync(rdtFile) === true){
		RDT_doorsRaw = [];
		RDT_doAfterSave();
		RDT_loading = true;
		RDT_totalDoors = 0;
		RDT_doorsArray = [];
		RDT_CANCRASH = false;
		RDT_ERRORMOTIVE = '';
		localStorage.clear();
		RE3_LIVE_closeForm();
		RDT_editItemCancel();
		RDT_totalCameras = 0;
		RDT_totalEnemies = 0;
		RDT_total3DProps = 0;
		RDT_cameraArray = [];
		RDT_enemiesArray = [];
		sessionStorage.clear();
		RDT_propModelsArray = [];
		RDT_SLD_totalMasksAva = 0;
		block_size_hex = undefined;
		RDT_messageCodesArray = [];
		RDT_SLD_MASKS_POSITION = [];
		RDT_MSGTEXT_MAXSIZE = undefined;
		ORIGINAL_FILENAME = rdtFile.replace(new RegExp('/', 'gi'), '\\');
		$('#RDT-aba-menu-4').css({'display': 'none'});
		$('#RDT-aba-menu-2').css({'display': 'inline'});
		$('#RDT-aba-menu-3').css({'display': 'inline'});
		document.getElementById('RDT_slider_D').value = 0;
		document.getElementById('RDT_slider_D2').value = 0;
		RDT_arquivoBruto = fs.readFileSync(rdtFile, 'hex');
		if (RDT_lastFileOpened !== ORIGINAL_FILENAME){
			RDT_loop = 0;
			RDT_lastFileOpened = rdtFile;
			WZ_saveConfigs(true);
			R3DITOR_RECENT_FILES(0);
		} else {
			if (fs.existsSync(APP_PATH + '\\Configs\\lastRDTFiles.r3list') === false){
				R3DITOR_RECENT_FILES(0);
			}
		}
		document.getElementById('RDT_lbl_pd').innerHTML = '0';
		document.getElementById('RDT_lbl_pd2').innerHTML = '0';
		document.getElementById('RDT_CANVAS_0').innerHTML = '';
		document.getElementById('RDT-aba-menu-2').disabled = '';
		document.getElementById('RDT-item-list').innerHTML = '';
		document.getElementById('RDT_MSG-holder').innerHTML = '';
		document.getElementById('RDT_door_holder').innerHTML = '';
		document.getElementById('RDT_audio_holder').innerHTML = '';
		document.getElementById('RDT_enemy_holder').innerHTML = '';
		document.getElementById('RDT_camera_holder').innerHTML = '';
		document.getElementById('RDT_msgCode_holder').innerHTML = '';
		document.getElementById('RDT_3DProps_holder').innerHTML = '';
		document.getElementById('RDT_SLD_SELECT_CAM').innerHTML = '';
		document.getElementById('RDT_lbl_selectedPoint').innerHTML = '';
		/*
			Remove the code below later!
		*/
		$('#RDT_SLD_seekMasksManualBtn').removeClass('none');
		$('#SLD_LAYER_CANVAS_BG').css({'background-image': 'url()'});
		document.getElementById('RDT_SLD_SELECT_CAM').innerHTML = '';
		document.getElementById('RDT_SLD_SELECT_LAYER').innerHTML = '';
		document.getElementById('RDT_SLD_LAYER_BLOCK_LIST').innerHTML = '';
		/*
			Remove the code above later!
		*/
		RDT_fileType = getFileExtension(ORIGINAL_FILENAME);
		RDT_mapName = getFileName(ORIGINAL_FILENAME).toUpperCase();
		RDT_fm_path = APP_PATH + '\\Configs\\RDT\\' + RDT_mapName + '_' + RDT_fileType + '.rdtmap2';
		RDT_fm_avaliable = fs.existsSync(RDT_fm_path);
		LOG_addLog('log', 'MAP - INFO: The file was loaded successfully! - File: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
		LOG_separator();
		//
		if (RDT_USE_DECOMPILER_WIP === false){
			RDT_getTextMessages();
			RDT_getMessageCodesArray();
			RDT_getEnemiesArray();
			if (RDT_fileType === 'RDT'){
				RDT_getCameras();
				RDT_ARD_compatMode = false;
				$('#RDT-aba-menu-9').css({'display': 'inline'});
			} else {
				RDT_ARD_compatMode = true;
				$('#RDT-aba-menu-9').css({'display': 'none'});
			}
			RDT_getPropModelsArray();
			RDT_readDoors();
			RDT_readItens();
			RDT_BG_display();
		} else {
			RDT_setHeaderPointers();
		}
	} else {
		LOG_addLog('error', 'MAP - ERROR: Unable to read ' + getFileName(rdtFile) + '!');
		LOG_addLog('error', 'MAP - Reason: 404 - File not found! (Path: <font class="user-can-select">' + rdtFile + '</font>)');
	}
	LOG_scroll();
}
/*
	SLD Layers [WIP]
	This is a REALLY beta thing!

	This will break!
	Also this is hidden for now.
*/
function RDT_getSLDPosition(){
	var c = 0;
	var totalSlots = RDT_totalCameras;
	$('#RDT_SLD_seekMasksManualBtn').addClass('none');
	document.getElementById('SLD_LAYER_CANVAS').innerHTML = '';
	document.getElementById('RDT_SLD_SELECT_LAYER').innerHTML = '';
	/*
		While other things are not implemented on R3ditor, i will use this method to find the masks because it works in most maps!
	*/
	RDT_SLD_FOUNDPOS = parseInt(getAllIndexes(RDT_arquivoBruto, 'ffffffff')[1] + 8);
	while(c < totalSlots){
		if (RDT_SLD_SEEK_SEMAPHORE === true){
			var maskAvaliable = RDT_arquivoBruto.slice(RDT_SLD_FOUNDPOS, parseInt(RDT_SLD_FOUNDPOS + 8));
			console.log('Seek on ' + RDT_SLD_FOUNDPOS + ' - ' + maskAvaliable);
			var displayValue = c.toString(16).toUpperCase();
			if (displayValue.length < 2){
				displayValue = '0' + displayValue;
			}
			if (maskAvaliable !== 'ffffffff'){
				RDT_SLD_SEEK_SEMAPHORE = false;
				$('#RDT_SLD_SELECT_LAYER').append('<option value="' + displayValue + '">Mask ' + displayValue + '</option>');
				RDT_SLD_MASKS_POSITION.push(RDT_SLD_FOUNDPOS);
				document.getElementById('RDT_SLD_SELECT_LAYER').value = displayValue;
				RDT_SLD_totalMasksAva++;
				RDT_decryptSldMask(RDT_SLD_FOUNDPOS);
			} else {
				$('#RDT_SLD_SELECT_LAYER').append('<option disabled>Mask ' + displayValue + ' - No mask detected!</option>');
				RDT_SLD_FOUNDPOS = parseInt(RDT_SLD_FOUNDPOS + 8);
				RDT_SLD_MASKS_POSITION.push(null);
			}
			c++;
		} else {
			console.log('SLD - Waiting RDT_SLD_SEEK_SEMAPHORE');
		}
	}
	document.getElementById('RDT-aba-menu-10').value = 'SLD Masks (' + RDT_SLD_totalMasksAva + ')';
	RDT_SLD_selectMask();
}
function RDT_decryptSldMask(startPosition){
	var c = 0;
	var t_m = 0;
	document.getElementById('RDT_SLD_LAYER_BLOCK_LIST').innerHTML = '';
	var pushes = processBIO3Vars(RDT_arquivoBruto.slice(parseInt(startPosition + RANGES['SLD_LAYER_count_offsets'][0]), parseInt(startPosition + RANGES['SLD_LAYER_count_offsets'][1]))); // Offset count_offsets
	document.getElementById('SLD_Layer_totalBlocks').innerHTML = '<font class="user-can-select">' + pushes + '</font> (Hex: <font class="user-can-select">' + pushes.toString(16).toUpperCase() + '</font>)';
	//
	RDT_SLD_relativeOffsets = parseInt(RDT_arquivoBruto.slice(startPosition + RANGES['SLD_LAYER_relativeOffsets'][0], startPosition + RANGES['SLD_LAYER_relativeOffsets'][1]), 16);
	var MASK_X_POS			= RDT_arquivoBruto.slice(parseInt(startPosition + RANGES['SLD_LAYER_X_POS'][0]), parseInt(startPosition + RANGES['SLD_LAYER_X_POS'][1]));
	var MASK_Y_POS			= RDT_arquivoBruto.slice(parseInt(startPosition + RANGES['SLD_LAYER_Y_POS'][0]), parseInt(startPosition + RANGES['SLD_LAYER_Y_POS'][1]));
	var currentPos			= parseInt(startPosition + RANGES['SLD_LAYER_Y_POS'][1]);
	var MASK_HEADER			= RDT_arquivoBruto.slice(startPosition, currentPos).toUpperCase();
	document.getElementById('SLD_Layer_Offset_2').value = RDT_arquivoBruto.slice(parseInt(startPosition + RANGES['SLD_LAYER_crp_offset_2'][0]), parseInt(startPosition + RANGES['SLD_LAYER_crp_offset_2'][1]));
	document.getElementById('RDT_SLD_MASK_HEADER').innerHTML = MASK_HEADER;
	document.getElementById('SLD_Layer_X_Position').value = MASK_X_POS;
	document.getElementById('SLD_Layer_Y_Position').value = MASK_Y_POS;
	
	if (RDT_SLD_relativeOffsets === 1){
		RDT_SLD_SEEK_MULTIMASK = false; // In PRIedit this is called "Relative Offset"
	} else {
		RDT_SLD_SEEK_MULTIMASK = true;
	}
	// Routine
	while (c < parseInt(pushes)){
		if (RDT_SLD_SEEK_MULTIMASK === false){
			var sliceBlock = RDT_arquivoBruto.slice(currentPos, parseInt(currentPos + 16)); // 16 = Normal length
			var LAYER_source_X 	  = sliceBlock.slice(RANGES['SLD_BLK_source_X'][0], 	 RANGES['SLD_BLK_source_X'][1]); 	  // Source X
			var LAYER_source_Y 	  = sliceBlock.slice(RANGES['SLD_BLK_source_Y'][0], 	 RANGES['SLD_BLK_source_Y'][1]); 	  // Source Y
			var LAYER_pos_X		  = sliceBlock.slice(RANGES['SLD_BLK_pos_X'][0],  	     RANGES['SLD_BLK_pos_X'][1]); 		  // Dest. X
			var LAYER_pos_Y		  = sliceBlock.slice(RANGES['SLD_BLK_pos_Y'][0],  	     RANGES['SLD_BLK_pos_Y'][1]); 		  // Dest. Y
			var LAYER_offset_1    = sliceBlock.slice(RANGES['SLD_BLK_offset_1'][0],		 RANGES['SLD_BLK_offset_1'][1]); 
			var LAYER_layPosition = sliceBlock.slice(RANGES['SLD_BLK_layerPosition'][0], RANGES['SLD_BLK_layerPosition'][1]); // Layer pos. is like Photoshop
			var LAYER_crop_type   = sliceBlock.slice(RANGES['SLD_BLK_model'][0], 	     RANGES['SLD_BLK_model'][1]); 		  // Size
			var LAYER_offset_2    = sliceBlock.slice(RANGES['SLD_BLK_offset_2'][0],		 RANGES['SLD_BLK_offset_2'][1]); 	  // Unknown Value
			var LAYER_width   	  = 'N/A'; 																					  // Rect X
			var LAYER_height   	  = 'N/A'; 																					  // Rect Y
			var cropName 		  = '';
			// If Rect
			if (LAYER_crop_type === '00'){
				cropName 	 = 'Rect';
				sliceBlock   = RDT_arquivoBruto.slice(currentPos, parseInt(currentPos + 24));
				LAYER_width  = sliceBlock.slice(RANGES['SLD_BLK_width'][0], RANGES['SLD_BLK_width'][1]);
				LAYER_height = sliceBlock.slice(RANGES['SLD_BLK_height'][0], RANGES['SLD_BLK_height'][1]);
				currentPos = parseInt(currentPos + 24);
			} else {
				cropName   = 'Square';
				currentPos = parseInt(currentPos + 16);
			}
			// Attempt to render

			var currentCam = document.getElementById('RDT_SLD_SELECT_LAYER').value;
			var maskImage = localStorage.getItem('RDT_CAM_' + currentCam + '_MASK');
			if (maskImage !== null && fs.existsSync(maskImage) === true){
				RDT_RENDER_MASK(c, maskImage, parseInt(LAYER_source_X, 16), parseInt(LAYER_source_Y, 16), parseInt(LAYER_pos_X, 16), parseInt(LAYER_pos_Y, 16), LAYER_crop_type);
			}

			var L_replace_w = LAYER_width.replace('N/A', '');
			var L_replace_h = LAYER_height.replace('N/A', '');
			var HTML_LAYER_TEMPLATE = '<div class="RDT-Item RDT-SLD-BLOCK-bg"><input type="button" class="btn-remover-comando RDT_modifyBtnFix" id="RDT_editDoor-0" value="Modify" onclick="WIP();">' + 
				'Crop X: <font class="user-can-select">' + LAYER_source_X.toUpperCase() + '</font><br>Crop Y: <font class="user-can-select">' + LAYER_source_Y.toUpperCase() + '</font><div class="SLD_BLOCK_MENU_POSITION">' + 
				'Position X: <font class="user-can-select">' + LAYER_pos_X.toUpperCase() + '</font><br>Position Y: <font class="user-can-select">' + LAYER_pos_Y.toUpperCase() + '</font></div><div class="SLD_BLOCK_MENU_SIZEDISPLAYMODE">' + 
				'Block Layer: <font class="user-can-select">' + LAYER_layPosition.toUpperCase() + '</font><br>Block Size: <font class="user-can-select">' + LAYER_crop_type.toUpperCase() + '</font></div><div class="SLD_BLOCK_MENU_OTHER">' + 
				'Rect Width: <font class="user-can-select">' + LAYER_width.toUpperCase() + '</font><br>Rect Height: <font class="user-can-select espaco-right">' + LAYER_height.toUpperCase() + '</font>Block type: ' + cropName + 
				'</div><div class="menu-separador"></div>Hex: <font class="user-can-select">' + LAYER_source_X.toUpperCase() + ' ' + LAYER_source_Y.toUpperCase() + ' ' + LAYER_pos_X.toUpperCase() + ' ' + LAYER_pos_Y.toUpperCase() + ' ' +
				LAYER_offset_1.toUpperCase() + ' ' + LAYER_layPosition.toUpperCase() + ' ' + LAYER_crop_type.toUpperCase() + ' ' + LAYER_offset_2.toUpperCase() + ' ' + L_replace_w.toUpperCase() + ' ' + L_replace_h.toUpperCase() + '</font></div>';

			$('#RDT_SLD_LAYER_BLOCK_LIST').append(HTML_LAYER_TEMPLATE);
			c++;
		} else {
			console.log('Skipping Relative Offsets');
			currentPos = parseInt(currentPos + parseInt(12 * RDT_SLD_relativeOffsets));
			RDT_SLD_SEEK_MULTIMASK = false;
		}
	}
	document.getElementById('RDT_SLD_relativeOffsetsNumber').innerHTML = RDT_SLD_relativeOffsets;
	RDT_SLD_FOUNDPOS = currentPos;
	RDT_SLD_SEEK_SEMAPHORE = true;
}
function RDT_RENDER_MASK(mask_id, mask_src, source_x, source_y, pos_x, pos_y, cropType){
	var HTML_BLOCK_TEMPLATE = '<img id="RDT_SLD_MASK_IMG_BLOCK_' + mask_id + '" style="top: ' + pos_y + 'px; left: ' + pos_x + 'px;" class="RDT_SLD_MASK_IMG_BLOCK" src="' + mask_src + '">';
}
function RDT_SLD_selectMask(){
	var selectMask = document.getElementById('RDT_SLD_SELECT_LAYER').value;
	var maskPos = RDT_SLD_MASKS_POSITION[parseInt(selectMask)];
	if (maskPos !== null){
		RDT_decryptSldMask(maskPos);
		document.getElementById('RDT_SLD_ACTIVE_CAM_TITLE').innerHTML = selectMask;
		RDT_applySLDBG();
	} else {
		LOG_addLog('warn', 'MAP - ERROR: (404) Mask not found!');
	}
	document.getElementById('RDT_SLD_LAYER_BLOCK_LIST').scrollTop = 0;
	LOG_scroll();
}
function RDT_applySLDBG(){
	RDT_SLD_LAYER_TILESET_BMP = undefined;
	document.getElementById('RDT_SLD_MASK_TILESET_FILENAME').innerHTML = 'No file selected';
	var RDT_NAME = getFileName(ORIGINAL_FILENAME).toUpperCase();
	var camId = document.getElementById('RDT_SLD_SELECT_CAM').value;
	var BG_IMG = APP_PATH.replace(new RegExp('\\\\', 'gi'), '/') + '/Assets/DATA_A/BSS/' + RDT_NAME + camId + '.JPG';
	$('#SLD_LAYER_CANVAS_BG').css({'background-image': 'url(' + BG_IMG + ')'});
}
function RDT_SLD_layer_setBMP(file){
	if (file !== ''){
		RDT_SLD_LAYER_TILESET_BMP = file;
		document.getElementById('RDT_SLD_MASK_TILESET_FILENAME').innerHTML = file;
		var currentCam = document.getElementById('RDT_SLD_SELECT_CAM').value;
		localStorage.setItem('RDT_CAM_' + currentCam + '_MASK', RDT_SLD_LAYER_TILESET_BMP);
		LOG_addLog('log', 'MAP - INFO: Tileset File: ' + RDT_SLD_LAYER_TILESET_BMP);
	}
	LOG_scroll();
}
function RDT_SLD_openOnRE3SLDE(){
	var CURRENT_SLD_FILE = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '.SLD';
	if (RE3SLDE_CANRUN === true && enable_mod === true && fs.existsSync(CURRENT_SLD_FILE) === true){
		runExternalSoftware(APP_PATH + '\\App\\tools\\RE3SLDE.exe', [CURRENT_SLD_FILE]);
	}
}
function RDT_SLD_openSldOnHex(){
	var CURRENT_SLD_FILE = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '.SLD';
	if (RE3SLDE_CANRUN === true && enable_mod === true && fs.existsSync(CURRENT_SLD_FILE) === true){
		openFileOnHex(CURRENT_SLD_FILE);
	}
}
/*
	Cameras
	This will have a different way to retrive the infos... for now!
	
	Cam Hex Size = 20 (In string mode: 32 * total de letras por bloco hex = 64 - Offset)
*/
function RDT_getCameras(){
	var c = 0;
	if (RDT_arquivoBruto !== undefined){
		var start = 192;
		var offset = 64;
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
			RDT_decompileCameras(c);
			c++;
		}
	}
}
function RDT_decompileCameras(id){
	var CAM_IMG;
	var titleFileName;
	var CAM_ID = id.toString(16).toUpperCase();
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
	// WIP Thing
	// $('#RDT_SLD_SELECT_CAM').append('<option value="' + CAM_ID + '">Camera ' + CAM_ID + '</option>');
	var CAM_HEX = localStorage.getItem('RDT_Camera-' + id);
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
function RDT_copyPasteCameraInfo(mode){
	// Copy
	if (mode === 1){
		TEMP_RDT_editCamera_camType = document.getElementById('RDT_editCamera_camType').value;
		TEMP_RDT_editCam_ident = document.getElementById('RDT_editCam_ident').value;
		TEMP_RDT_XP_Origin = document.getElementById('RDT_XP_Origin-edit').value;
		TEMP_RDT_XPS_Origin = document.getElementById('RDT_XPS_Origin-edit').value;
		TEMP_RDT_YP_Origin = document.getElementById('RDT_YP_Origin-edit').value;
		TEMP_RDT_YPS_Origin = document.getElementById('RDT_YPS_Origin-edit').value;
		TEMP_RDT_ZP_Origin = document.getElementById('RDT_ZP_Origin-edit').value;
		TEMP_RDT_ZPS_Origin = document.getElementById('RDT_ZPS_Origin-edit').value;
		TEMP_RDT_XD_Direction = document.getElementById('RDT_XD_Direction-edit').value;
		TEMP_RDT_XDS_Direction = document.getElementById('RDT_XDS_Direction-edit').value;
		TEMP_RDT_YD_Direction = document.getElementById('RDT_YD_Direction-edit').value;
		TEMP_RDT_YDS_Direction = document.getElementById('RDT_YDS_Direction-edit').value;
		TEMP_RDT_ZD_Direction = document.getElementById('RDT_ZD_Direction-edit').value;
		TEMP_RDT_ZDS_Direction = document.getElementById('RDT_ZDS_Direction-edit').value;
		TEMP_RDT_RD_Direction = document.getElementById('RDT_RD_Direction-edit').value;
		TEMP_RDT_RDS_Direction = document.getElementById('RDT_RDS_Direction-edit').value;
		var currentCam = document.getElementById('RDT-lbl-CAMERA-edit').innerHTML;
		var TEXT_FOR_CP = '[CAMERA POS]\nCurrent Cam: ' + currentCam.toUpperCase() + '\nCamera Type: ' + TEMP_RDT_editCamera_camType.toUpperCase() + '\nX Pos: ' + TEMP_RDT_XP_Origin.toUpperCase() + '\nSignal: ' + TEMP_RDT_XPS_Origin.toUpperCase() + '\nY Pos: ' + TEMP_RDT_YP_Origin.toUpperCase() + '\nSignal: ' + 
						  TEMP_RDT_YPS_Origin.toUpperCase() + '\nZ Pos: ' + TEMP_RDT_ZP_Origin.toUpperCase() + '\nSignal: ' + TEMP_RDT_ZPS_Origin.toUpperCase() + '\nX Direction: ' + TEMP_RDT_XD_Direction.toUpperCase() + 
						  '\nSignal: ' + TEMP_RDT_XDS_Direction.toUpperCase() + '\nY Direction: ' + TEMP_RDT_YD_Direction.toUpperCase() + '\nSignal: ' + TEMP_RDT_YDS_Direction.toUpperCase() + '\nZ Direction: ' + 
						  TEMP_RDT_ZD_Direction.toUpperCase() + '\nSignal: ' + TEMP_RDT_ZDS_Direction.toUpperCase() + '\nR Direction: ' + TEMP_RDT_RD_Direction.toUpperCase() + '\nSignal: ' + TEMP_RDT_RDS_Direction.toUpperCase();
		R3DITOR_COPY(TEXT_FOR_CP);
	}
	// Paste
	if (mode === 2){
		document.getElementById('RDT_editCamera_camType').value = TEMP_RDT_editCamera_camType.toUpperCase();
		document.getElementById('RDT_editCam_ident').value = TEMP_RDT_editCam_ident.toUpperCase();
		document.getElementById('RDT_XP_Origin-edit').value = TEMP_RDT_XP_Origin.toUpperCase();
		document.getElementById('RDT_XPS_Origin-edit').value = TEMP_RDT_XPS_Origin.toUpperCase();
		document.getElementById('RDT_YP_Origin-edit').value = TEMP_RDT_YP_Origin.toUpperCase();
		document.getElementById('RDT_YPS_Origin-edit').value = TEMP_RDT_YPS_Origin.toUpperCase();
		document.getElementById('RDT_ZP_Origin-edit').value = TEMP_RDT_ZP_Origin.toUpperCase();
		document.getElementById('RDT_ZPS_Origin-edit').value = TEMP_RDT_ZPS_Origin.toUpperCase();
		document.getElementById('RDT_XD_Direction-edit').value = TEMP_RDT_XD_Direction.toUpperCase();
		document.getElementById('RDT_XDS_Direction-edit').value = TEMP_RDT_XDS_Direction.toUpperCase();
		document.getElementById('RDT_YD_Direction-edit').value = TEMP_RDT_YD_Direction.toUpperCase();
		document.getElementById('RDT_YDS_Direction-edit').value = TEMP_RDT_YDS_Direction.toUpperCase();
		document.getElementById('RDT_ZD_Direction-edit').value = TEMP_RDT_ZD_Direction.toUpperCase();
		document.getElementById('RDT_ZDS_Direction-edit').value = TEMP_RDT_ZDS_Direction.toUpperCase();
		document.getElementById('RDT_RD_Direction-edit').value = TEMP_RDT_RD_Direction.toUpperCase();
		document.getElementById('RDT_RDS_Direction-edit').value = TEMP_RDT_RDS_Direction.toUpperCase();
	}
}
function RDT_CAMERA_APPLY(id){
	var reason;
	var canCompile = true;
	var ORIGINAL_CM = localStorage.getItem('RDT_Camera-' + id);
	var CAM_NEW_CI  = document.getElementById('RDT_editCam_ident').value.toLowerCase();
	var CAM_NEW_CT  = parseEndian(document.getElementById('RDT_editCamera_camType').value.toLowerCase());
	var CAM_NEW_XP  = parseEndian(document.getElementById('RDT_XP_Origin-edit').value.toLowerCase());
	var CAM_NEW_XPS = parseEndian(document.getElementById('RDT_XPS_Origin-edit').value.toLowerCase());
	var CAM_NEW_YP  = parseEndian(document.getElementById('RDT_YP_Origin-edit').value.toLowerCase());
	var CAM_NEW_YPS = parseEndian(document.getElementById('RDT_YPS_Origin-edit').value.toLowerCase());
	var CAM_NEW_ZP  = parseEndian(document.getElementById('RDT_ZP_Origin-edit').value.toLowerCase());
	var CAM_NEW_ZPS = parseEndian(document.getElementById('RDT_ZPS_Origin-edit').value.toLowerCase());
	var CAM_NEW_XD  = parseEndian(document.getElementById('RDT_XD_Direction-edit').value.toLowerCase());
	var CAM_NEW_XDS = parseEndian(document.getElementById('RDT_XDS_Direction-edit').value.toLowerCase());
	var CAM_NEW_YD  = parseEndian(document.getElementById('RDT_YD_Direction-edit').value.toLowerCase());
	var CAM_NEW_YDS = parseEndian(document.getElementById('RDT_YDS_Direction-edit').value.toLowerCase());
	var CAM_NEW_ZD  = parseEndian(document.getElementById('RDT_ZD_Direction-edit').value.toLowerCase());
	var CAM_NEW_ZDS = parseEndian(document.getElementById('RDT_ZDS_Direction-edit').value.toLowerCase());
	var CAM_NEW_RD  = parseEndian(document.getElementById('RDT_RD_Direction-edit').value.toLowerCase());
	var CAM_NEW_RDS = parseEndian(document.getElementById('RDT_RDS_Direction-edit').value.toLowerCase());
	if (CAM_NEW_CI.length !== 4){
		canCompile = false;
		reason = 'Cam Identifier have wrong size!';
	}
	if (CAM_NEW_XP.length !== 4){
		canCompile = false;
		reason = 'X Pos. have wrong size!';
	}
	if (CAM_NEW_XPS.length !== 4){
		canCompile = false;
		reason = 'X Pos. (Signal) have wrong size!';
	}
	if (CAM_NEW_YP.length !== 4){
		canCompile = false;
		reason = 'Y Pos. have wrong size!';
	}
	if (CAM_NEW_YPS.length !== 4){
		canCompile = false;
		reason = 'Y Pos. (Signal) have wrong size!';
	}
	if (CAM_NEW_ZP.length !== 4){
		canCompile = false;
		reason = 'Z Pos. have wrong size!';
	}
	if (CAM_NEW_ZPS.length !== 4){
		canCompile = false;
		reason = 'Z Pos. (Signal) have wrong size!';
	}
	if (CAM_NEW_XD.length !== 4){
		canCompile = false;
		reason = 'X Direction have wrong size!';
	}
	if (CAM_NEW_XDS.length !== 4){
		canCompile = false;
		reason = 'X Direction (Signal) have wrong size!';
	}
	if (CAM_NEW_YD.length !== 4){
		canCompile = false;
		reason = 'Y Direction have wrong size!';
	}
	if (CAM_NEW_YDS.length !== 4){
		canCompile = false;
		reason = 'Y Direction (Signal) have wrong size!';
	}
	if (CAM_NEW_ZD.length !== 4){
		canCompile = false;
		reason = 'Z Direction have wrong size!';
	}
	if (CAM_NEW_ZDS.length !== 4){
		canCompile = false;
		reason = 'Z Direction (Signal) have wrong size!';
	}
	if (CAM_NEW_RD.length !== 4){
		canCompile = false;
		reason = 'R Direction have wrong size!';
	}
	if (CAM_NEW_RDS.length !== 4){
		canCompile = false;
		reason = 'R Direction (Signal) have wrong size!';
	}
	if (canCompile === true){
		var NEW_CAMERA_HEX = CAM_NEW_CT + CAM_NEW_CI + CAM_NEW_XP + CAM_NEW_XPS + CAM_NEW_YP + CAM_NEW_YPS + CAM_NEW_ZP + CAM_NEW_ZPS + 
							 CAM_NEW_XD + CAM_NEW_XDS + CAM_NEW_YD + CAM_NEW_YDS + CAM_NEW_ZD + CAM_NEW_ZDS + CAM_NEW_RD + CAM_NEW_RDS;
		RDT_COMPILE_Lv2(ORIGINAL_CM, NEW_CAMERA_HEX);
		$('#RDT-aba-menu-9').trigger('click');
	} else {
		alert('WARNING - Unable to recompile camera!\n\nReason: ' + reason);
		LOG_addLog('warn', 'MAP - WARN: Unable to recompile camera! - ' + reason);
	}
	LOG_scroll();
}
/*
	Enemies & NPC's
*/
function RDT_getEnemiesArray(){
	if (RDT_arquivoBruto !== undefined){
		var c = 0;
		RDT_getEnemies('7d00');
		while (c < RDT_enemiesArray.length){
			RDT_decompileEnemyNPC(c, RDT_enemiesArray[c]);
			c++;
		}
	}
}
function RDT_decompileEnemyNPC(index, enemyHex){
	var EN_type   	= enemyHex.slice(RANGES['RDT_enemy-type'][0], 		 RANGES['RDT_enemy-type'][1]);
	var EN_pose   	= enemyHex.slice(RANGES['RDT_enemy-pose'][0], 		 RANGES['RDT_enemy-pose'][1]);
	var EN_xPos 	= enemyHex.slice(RANGES['RDT_enemy-xPos'][0],		 RANGES['RDT_enemy-xPos'][1]);
	var EN_yPos 	= enemyHex.slice(RANGES['RDT_enemy-yPos'][0],		 RANGES['RDT_enemy-yPos'][1]);
	var EN_zPos 	= enemyHex.slice(RANGES['RDT_enemy-zPos'][0],		 RANGES['RDT_enemy-zPos'][1]);
	var EN_rPos 	= enemyHex.slice(RANGES['RDT_enemy-rPos'][0],		 RANGES['RDT_enemy-rPos'][1]);
	var EN_header   = enemyHex.slice(RANGES['RDT_enemy-header'][0], 	 RANGES['RDT_enemy-header'][1]);
	var EN_texture  = enemyHex.slice(RANGES['RDT_enemy-texture'][0],	 RANGES['RDT_enemy-texture'][1]);
	var EN_soundSet = enemyHex.slice(RANGES['RDT_enemy-soundSet'][0],	 RANGES['RDT_enemy-soundSet'][1]);
	var EN_exFlag 	= enemyHex.slice(RANGES['RDT_enemy-extraFlag'][0], 	 RANGES['RDT_enemy-extraFlag'][1]);
	var EN_enFlag   = enemyHex.slice(RANGES['RDT_enemy-enemyFlag'][0],	 RANGES['RDT_enemy-enemyFlag'][1]);
	var EN_numero 	= enemyHex.slice(RANGES['RDT_enemy-enemyNumber'][0], RANGES['RDT_enemy-enemyNumber'][1]);
	localStorage.setItem('RDT_enemy-' + index, enemyHex);
	RDT_totalEnemies++;
	var ENEMY_HTML_TEMPLATE = '<div class="RDT-Item RDT-enemy-bg"><input type="button" class="btn-remover-comando RDT_modifyBtnFix" value="Modify" onclick="RDT_showEditEnemyNPC(' + index + ', \'' + enemyHex + '\');">' + 
		'(' + parseInt(index + 1) + ') Enemy / NPC: ' + RDT_EMDNAME[EN_type] + ' (Hex: ' + EN_type.toUpperCase() + ')<div class="menu-separador"></div>X Position: <font class="RDT-item-lbl-fix">' + EN_xPos.toUpperCase() + '</font><br>' + 
		'Y Position: <font class="RDT-item-lbl-fix">' + EN_yPos.toUpperCase() + '</font><br>Z Position: <font class="RDT-item-lbl-fix">' + EN_zPos.toUpperCase() + '</font><br>R Position: <font class="RDT-item-lbl-fix">' + EN_rPos.toUpperCase() + '</font>' + 
		'<div class="RDT-Item-Misc">Header: <font class="RDT-item-lbl-fix-2">' + EN_header.toUpperCase() + '</font><br>Pose: <font class="RDT-item-lbl-fix-2" title="' + RDT_EMDPOS[EN_pose] + '">' + EN_pose.toUpperCase() + '</font><br><font title="Enemy flag">E. flag</font>: ' + 
		'<font class="RDT-item-lbl-fix-2">' + EN_enFlag.toUpperCase() + '</font><br><font title="Enemy number">E. number</font>: <font class="RDT-item-lbl-fix-2">' + EN_numero.toUpperCase() + '</font></div><div class="RDT-Item-Misc-4">' + 
		'<br>Texture: <font class="RDT-item-lbl-fix-8">' + EN_texture.toUpperCase() + '</font><br>Extra flag: <font class="RDT-item-lbl-fix-8">' + EN_exFlag.toUpperCase() + '</font><br>Sound set: <font class="RDT-item-lbl-fix-8">' + EN_soundSet.toUpperCase() + 
		'</font></div><div class="menu-separador"></div>Hex: <font class="user-can-select"><font title="Header">' + EN_header.toUpperCase() + '</font> <font title="Number">' + EN_numero.toUpperCase() + '</font> <font title="Type">' + EN_type.toUpperCase() + '</font> <font title="Pose">' + 
		EN_pose.toUpperCase() + '</font> <font title="Extra Flag">' + EN_exFlag.toUpperCase() + '</font> ' + enemyHex.slice(RANGES["RDT_enemy-offset-0"][0], RANGES["RDT_enemy-offset-0"][1]) + ' <font title="Sound Set">' + EN_soundSet.toUpperCase() + '</font> <font title="Texture">' + EN_texture.toUpperCase() + 
		'</font> <font title="E. Flag">' + EN_enFlag.toUpperCase() + '</font> <font title="X pos.">' + EN_xPos.toUpperCase() + '</font> <font title="Z pos.">' + EN_yPos.toUpperCase() + '</font> <font title="Y pos.">' + EN_zPos.toUpperCase() + '</font> <font title="R pos.">' + EN_rPos.toUpperCase() + '</font> ' + 
		enemyHex.slice(RANGES["RDT_enemy-offset-1"][0], RANGES["RDT_enemy-offset-1"][1]).toUpperCase() + '</font></div>';
	$('#RDT_enemy_holder').append(ENEMY_HTML_TEMPLATE);
}
function RDT_copyPasteEnemyNpcInfo(mode){
	if (mode === 1){
		RDT_TEMP_ENEMYNPC_TYPE 		= document.getElementById('RDT_selectEnemyNPC').value.toUpperCase();
		RDT_TEMP_ENEMYNPC_POSE 		= document.getElementById('RDT_enemyNPC-edit-PO').value.toUpperCase();
		RDT_TEMP_ENEMYNPC_TEXTURE 	= document.getElementById('RDT_enemyNPC-edit-TX').value.toUpperCase();
		RDT_TEMP_ENEMYNPC_SOUNDSET 	= document.getElementById('RDT_enemyNPC-edit-SS').value.toUpperCase();
		RDT_TEMP_ENEMYNPC_EXTRAFLAG = document.getElementById('RDT_enemyNPC-edit-ExF').value.toUpperCase();
		RDT_TEMP_ENEMYNPC_ENEMYFLAG = document.getElementById('RDT_enemyNPC-edit-EnF').value.toUpperCase();
		var TEXT_FOR_CP = '[Enemy / NPC]\nType: ' + RDT_TEMP_ENEMYNPC_TYPE + '\nPose: ' + RDT_TEMP_ENEMYNPC_POSE + '\nTexture: ' + RDT_TEMP_ENEMYNPC_TEXTURE + 
			'\nSound Set: ' + RDT_TEMP_ENEMYNPC_SOUNDSET + '\nExtra Flag: ' + RDT_TEMP_ENEMYNPC_EXTRAFLAG + '\nEnemy Flag: ' + RDT_TEMP_ENEMYNPC_ENEMYFLAG;
		R3DITOR_COPY(TEXT_FOR_CP);
	}
	if (mode === 2 && RDT_TEMP_ENEMYNPC_TYPE !== '' && RDT_TEMP_ENEMYNPC_POSE !== '' && RDT_TEMP_ENEMYNPC_TEXTURE !== '' && RDT_TEMP_ENEMYNPC_SOUNDSET !== '' && RDT_TEMP_ENEMYNPC_EXTRAFLAG !== '' && RDT_TEMP_ENEMYNPC_ENEMYFLAG !== ''){
		document.getElementById('RDT_selectEnemyNPC').value = RDT_TEMP_ENEMYNPC_TYPE.toUpperCase();
		document.getElementById('RDT_enemyNPC-edit-PO').value = RDT_TEMP_ENEMYNPC_POSE.toUpperCase();
		document.getElementById('RDT_enemyNPC-edit-TX').value = RDT_TEMP_ENEMYNPC_TEXTURE.toUpperCase();
		document.getElementById('RDT_enemyNPC-edit-SS').value = RDT_TEMP_ENEMYNPC_SOUNDSET.toUpperCase();
		document.getElementById('RDT_enemyNPC-edit-ExF').value = RDT_TEMP_ENEMYNPC_EXTRAFLAG.toUpperCase();
		document.getElementById('RDT_enemyNPC-edit-EnF').value = RDT_TEMP_ENEMYNPC_ENEMYFLAG.toUpperCase();
	}
}
function RDT_EMD_USEPLAYERPOS(){
	document.getElementById('RDT_enemyNPC-edit-X').value = REALTIME_X_Pos;
	document.getElementById('RDT_enemyNPC-edit-Y').value = REALTIME_Y_Pos;
	document.getElementById('RDT_enemyNPC-edit-Z').value = REALTIME_Z_Pos;
	document.getElementById('RDT_enemyNPC-edit-R').value = REALTIME_R_Pos;
}
function RDT_ENEMYNPC_APPLY(id){
	var reason;
	var canCompile = true;
	var header     = localStorage.getItem('RDT_enemy-' + id).slice(RANGES['RDT_enemy-header'][0],   RANGES['RDT_enemy-header'][1]);
	var offset_0   = localStorage.getItem('RDT_enemy-' + id).slice(RANGES['RDT_enemy-offset-0'][0], RANGES['RDT_enemy-offset-0'][1]);
	var offset_1   = localStorage.getItem('RDT_enemy-' + id).slice(RANGES['RDT_enemy-offset-1'][0], RANGES['RDT_enemy-offset-1'][1]);
	var nEnemy     = document.getElementById('RDT_selectEnemyNPC').value;
	var nPose	   = document.getElementById('RDT_enemyNPC-edit-PO').value.toLowerCase();
	var nX		   = document.getElementById('RDT_enemyNPC-edit-X').value.slice(0, 4).toLowerCase();
	var nY		   = document.getElementById('RDT_enemyNPC-edit-Y').value.slice(0, 4).toLowerCase();
	var nZ		   = document.getElementById('RDT_enemyNPC-edit-Z').value.slice(0, 4).toLowerCase();
	var nR		   = document.getElementById('RDT_enemyNPC-edit-R').value.slice(0, 4).toLowerCase();
	var nTexture   = document.getElementById('RDT_enemyNPC-edit-TX').value.slice(0, 2).toLowerCase();
	var nSoundSet  = document.getElementById('RDT_enemyNPC-edit-SS').value.slice(0, 2).toLowerCase();
	var nEnNumber  = document.getElementById('RDT_enemyNPC-edit-EN').value.slice(0, 2).toLowerCase();
	var nEnFlag    = document.getElementById('RDT_enemyNPC-edit-EnF').value.slice(0, 2).toLowerCase();
	var nExFlag    = document.getElementById('RDT_enemyNPC-edit-ExF').value.slice(0, 2).toLowerCase();
	if (nX.length !== 4){
		canCompile = false;
		reason = 'The X value are wrong!';
	}
	if (nY.length !== 4){
		canCompile = false;
		reason = 'The Y value are wrong!';
	}
	if (nZ.length !== 4){
		canCompile = false;
		reason = 'The Z value are wrong!';
	}
	if (nR.length !== 4){
		canCompile = false;
		reason = 'The R value are wrong!';
	}
	if (nX.value === '0000'){
		LOG_addLog('warn', 'MAP - WARN - To avoid detection problem, the X value will be 0101 instead of 0000 (For now, of course)');
		nX.value = '0101';
	}
	if (nY.value === '0000'){
		LOG_addLog('warn', 'MAP - WARN - To avoid detection problem, the Y value will be 0101 instead of 0000 (For now, of course)');
		nY.value = '0101';
	}
	if (nZ.value === '0000'){
		LOG_addLog('warn', 'MAP - WARN - To avoid detection problem, the Z value will be 0101 instead of 0000 (For now, of course)');
		nZ.value = '0101';
	}
	if (nR.value === '0000'){
		LOG_addLog('warn', 'MAP - WARN - To avoid detection problem, the R value will be 0101 instead of 0000 (For now, of course)');
		nR.value = '0101';
	}
	if (nTexture.length !== 2){
		canCompile = false;
		reason = 'The Texture value are wrong!';
	}
	if (nSoundSet.length !== 2){
		canCompile = false;
		reason = 'The Sound Set value are wrong!';
	}
	if (nEnFlag.length !== 2){
		canCompile = false;
		reason = 'The Enemy Flag value are wrong!';
	}
	if (nExFlag.length !== 2){
		canCompile = false;
		reason = 'The Extra Flag value are wrong!';
	}
	if (nEnNumber.length !== 2){
		canCompile = false;
		reason = 'The Enemy Number value are wrong!';
	}
	if (canCompile === true){
		var NEW_ENEMYNPC = header + nEnNumber + nEnemy + nPose + nExFlag + offset_0 + nSoundSet + nTexture + nEnFlag + nX + nZ + nY + nR + offset_1;
		RDT_COMPILE_Lv2(localStorage.getItem('RDT_enemy-' + id), NEW_ENEMYNPC);
		$('#RDT-aba-menu-8').trigger('click');
	} else {
		alert('WARN - Unable to compile Enemy / NPC!\n\n' + reason);
		LOG_addLog('warn', 'MAP - WARN: Unable to compile Enemy / NPC! - ' + reason);
	}
	LOG_scroll();
}
function RDT_getEnemies(hx){
	if (RDT_arquivoBruto !== undefined){
		var c = 0;
		var enemyRaw = getAllIndexes(RDT_arquivoBruto, hx);
		while (c < enemyRaw.length){
			var check_0 = RDT_arquivoBruto.slice(parseInt(enemyRaw[c] + 40), parseInt(enemyRaw[c] + 48)) === '00000000';
			var check_1 = RDT_arquivoBruto.slice(parseInt(enemyRaw[c] + 12), parseInt(enemyRaw[c] + 18)) === '000000';
			var check_2 = RDT_arquivoBruto.slice(parseInt(enemyRaw[c] + 18), parseInt(enemyRaw[c] + 26)) === '00000000';
		
			if (check_0 === true && check_1 === true && check_2 === false){
				RDT_enemiesArray.push(RDT_arquivoBruto.slice(parseInt(enemyRaw[c]), parseInt(enemyRaw[c] + 48)));
				c++;
			} else {
				if (RDT_arquivoBruto.slice(parseInt(enemyRaw[c] + RANGES['RDT_enemy-type'][0]), parseInt(enemyRaw[c] + RANGES['RDT_enemy-type'][1])) === '34' && RDT_arquivoBruto.slice(parseInt(enemyRaw[c] + 12), parseInt(enemyRaw[c] + 18)) === '000003'){
					RDT_enemiesArray.push(RDT_arquivoBruto.slice(parseInt(enemyRaw[c]), parseInt(enemyRaw[c] + 48)));
					c++;
				} else {
					enemyRaw.splice(c, 1);
				}
			}
		}
	}
}
/*
	3D Props WIP!
*/
function RDT_getPropModelsArray(){
	if (RDT_arquivoBruto !== undefined){
		var c = 0;
		RDT_getpropModels('000000000000000000');
		while(c < RDT_propModelsArray.length){
			console.log(RDT_propModelsArray[c].toUpperCase());
			c++;
		}
		RDT_total3DProps--;
	}
}
function RDT_getpropModels(hx){
	var c = 0;
	var propRaw = getAllIndexes(RDT_arquivoBruto, hx);
	while (c < propRaw.length){
		var check_0 = RDT_arquivoBruto.slice(parseInt(propRaw[c] - 4), parseInt(propRaw[c] - 2));
		var check_1 = RDT_arquivoBruto.slice(parseInt(propRaw[c] + 74), parseInt(propRaw[c] + 76));
		var check_2 = getAllIndexes(RDT_arquivoBruto.slice(parseInt(propRaw[c] - 4), parseInt(propRaw[c] + 76)), '0');
		if (check_0 === '7f' && check_1 === '00' && check_2.length < 74){
			localStorage.setItem('RDT_3D_PROP_' + c, RDT_arquivoBruto.slice(parseInt(propRaw[c] - 4), parseInt(propRaw[c] + 76)));
			RDT_decompile3DProp(c);
			RDT_total3DProps++;
			c++;
		} else {
			propRaw.splice(c, 1);
		}
	}
}
function RDT_decompile3DProp(id){
	if (id !== undefined){
		var PROP_RAW = localStorage.getItem('RDT_3D_PROP_' + id);

		var PROP_HEADER = PROP_RAW.slice(0, 2);
		var PROP_ID = PROP_RAW.slice(2, 4);
		var PROP_OFFSET_0 = PROP_RAW.slice(4, 16);
		var PROP_OFFSET_1 = PROP_RAW.slice(16, 18);
		var PROP_OFFSET_2 = PROP_RAW.slice(18, 28);
		var PROP_ITEMLINK = PROP_RAW.slice(28, 30);
		var PROP_OFFSET_3 = PROP_RAW.slice(30, 32);
		var PROP_XPOS = PROP_RAW.slice(32, 36);
		var PROP_ZPOS = PROP_RAW.slice(36, 40);
		var PROP_YPOS = PROP_RAW.slice(40, 44);
		var PROP_RPOS = PROP_RAW.slice(44, 48);
		var PROP_EXTRA = PROP_RAW.slice(48, 52);
		var PROP_FINAL = PROP_RAW.slice(52, PROP_RAW.length);

		var PROP_HTML_TEMPLATE = '<div class="RDT-Item RDT-3DProp-bg" id="RDT-3D_Item-0" onclick="main_closeFileList();"><input type="button" class="btn-remover-comando ' +
				'RDT_modifyBtnFix" id="RDT_edit3D_ItemBtn_0" value="Modify" onclick="RDT_show3DPropEdit(0, ' + id + ')">(' + id + ') ID: ' + PROP_ID.toUpperCase() +
				'<div class="menu-separador"></div>X Pos: ' + PROP_XPOS.toUpperCase() + '<br>Y Pos: ' + PROP_YPOS.toUpperCase() + '<br>Z Pos: ' + PROP_ZPOS.toUpperCase() +
				'<br>R Pos: ' + PROP_RPOS.toUpperCase() + '<div class="RDT-Item-Misc">Item Link: ' + PROP_ITEMLINK.toUpperCase() + '<br>Extra: ' + PROP_EXTRA.toUpperCase() +
				'</div><div class="menu-separador"></div>Hex: <font class="user-can-select">' + PROP_RAW.toUpperCase() + '</font></div>';
		$('#RDT_3DProps_holder').append(PROP_HTML_TEMPLATE);
	}
}
function RDT_3D_PROP_APPLY(id){
	if (id !== undefined){
		var OLD_PROP_RAW = localStorage.getItem('RDT_3D_PROP_' + id);
		if (OLD_PROP_RAW !== null){
			var reason;
			var canCompile = true;
			var PROP_HEADER = OLD_PROP_RAW.slice(0, 2);
			var PROP_ID = OLD_PROP_RAW.slice(2, 4);
			var PROP_OFFSET_0 = OLD_PROP_RAW.slice(4, 16);
			var PROP_OFFSET_1 = OLD_PROP_RAW.slice(16, 18);
			var PROP_OFFSET_2 = OLD_PROP_RAW.slice(18, 28);
			var PROP_OFFSET_3 = OLD_PROP_RAW.slice(30, 32);
			var PROP_FINAL = OLD_PROP_RAW.slice(52, OLD_PROP_RAW.length);
			//
			var NEW_XPOS = document.getElementById('RDT_edit_3DProp_X').value.toLowerCase();
			var NEW_YPOS = document.getElementById('RDT_edit_3DProp_Y').value.toLowerCase();
			var NEW_ZPOS = document.getElementById('RDT_edit_3DProp_Z').value.toLowerCase();
			var NEW_RPOS = document.getElementById('RDT_edit_3DProp_R').value.toLowerCase();
			var NEW_LINK = document.getElementById('RDT_edit_3DProp_iLink').value.toLowerCase();
			var NEW_EXTRA = document.getElementById('RDT_edit_3DProp_Extra').value.toLowerCase();
			//
			if (NEW_XPOS.length !== 4){
				canCompile = false;
				reason = 'X have wrong length!';
			}
			if (NEW_YPOS.length !== 4){
				canCompile = false;
				reason = 'Y have wrong length!';
			}
			if (NEW_ZPOS.length !== 4){
				canCompile = false;
				reason = 'Z have wrong length!';
			}
			if (NEW_RPOS.length !== 4){
				canCompile = false;
				reason = 'R have wrong length!';
			}
			if (NEW_LINK.length !== 2){
				canCompile = false;
				reason = 'Item Link have wrong length!';
			}
			if (NEW_EXTRA.length !== 4){
				canCompile = false;
				reason = 'Extra have wrong length!';
			}
			//
			if (canCompile === true){
				var NEW_PROP_HEX = PROP_HEADER + PROP_ID + PROP_OFFSET_0 + PROP_OFFSET_1 + PROP_OFFSET_2 + NEW_LINK + PROP_OFFSET_3 +
					NEW_XPOS + NEW_YPOS + NEW_ZPOS + NEW_RPOS + NEW_EXTRA + PROP_FINAL;
				RDT_COMPILE_Lv2(OLD_PROP_RAW, NEW_PROP_HEX);
				$('#RDT-aba-menu-11').trigger('click');
			} else {
				LOG_addLog('warn', 'MAP - WARN: Unable to compile 3D Prop!');
				LOG_addLog('warn', 'MAP - Details: ' + reason);
			}
		} else {
			LOG_addLog('warn', 'MAP - WARN: Unable to compile 3D Prop!');
			LOG_addLog('warn', 'MAP - Details: Unable to find 3D Prop info on R3ditor!');
		}
	}
	LOG_scroll();
}
function RDT_copyPastePropsPos(mode){
	if (mode === 0){
		TEMP_PROP_X_POS = document.getElementById('RDT_edit_3DProp_X').value;
		TEMP_PROP_Y_POS = document.getElementById('RDT_edit_3DProp_Y').value;
		TEMP_PROP_Z_POS = document.getElementById('RDT_edit_3DProp_Z').value;
		TEMP_PROP_R_POS = document.getElementById('RDT_edit_3DProp_R').value;
		var TEXT_FOR_CP = '[3D Props]\nX Pos: ' + TEMP_PROP_X_POS.toUpperCase() + '\nY Pos: ' + 
						  TEMP_PROP_Y_POS.toUpperCase() + '\nZ Pos: ' + TEMP_PROP_Z_POS.toUpperCase() + '\nR Pos: ' + TEMP_PROP_R_POS.toUpperCase();
		R3DITOR_COPY(TEXT_FOR_CP);
	}
	if (mode === 1 && TEMP_PROP_X_POS !== '' && TEMP_PROP_Y_POS !== '' && TEMP_PROP_Z_POS !== '' && TEMP_PROP_R_POS !== ''){
		document.getElementById('RDT_edit_3DProp_X').value = TEMP_PROP_X_POS;
		document.getElementById('RDT_edit_3DProp_Y').value = TEMP_PROP_Y_POS;
		document.getElementById('RDT_edit_3DProp_Z').value = TEMP_PROP_Z_POS;
		document.getElementById('RDT_edit_3DProp_R').value = TEMP_PROP_R_POS;
	}
	if (mode === 2 && RE3_RUNNING === true && PROCESS_OBJ !== undefined){
		document.getElementById('RDT_edit_3DProp_X').value = REALTIME_X_Pos;
		document.getElementById('RDT_edit_3DProp_Y').value = REALTIME_Y_Pos;
		document.getElementById('RDT_edit_3DProp_Z').value = REALTIME_Z_Pos;
		//document.getElementById('RDT_edit_3DProp_R').value = REALTIME_R_Pos;
		LOG_addLog('warn', 'MAP - WARN: R Pos will not be set because it need some testing!');
	}
	LOG_scroll();
}
/*
	Message Code (63 ID 04 31 00 00)
*/
function RDT_getMessageCodesArray(){
	var c = 0;
	RDT_getMessageCodes('043100');
	RDT_getMessageCodes('043101');
	RDT_getMessageCodes('043102');
	RDT_getMessageCodes('043103');
	RDT_getMessageCodes('043104');
	RDT_getMessageCodes('043105');
	RDT_getMessageCodes('043106');
	RDT_getMessageCodes('043107');
	RDT_getMessageCodes('043108');
	RDT_getMessageCodes('043109');
	RDT_getMessageCodes('043110');
	if (RDT_messageCodesArray.length !== 0){
		while(c < RDT_messageCodesArray.length){
			RDT_decompileMessageCode(c, RDT_messageCodesArray[c]);
			c++;
		}
	}
}
function RDT_getMessageCodes(hx){
	var c = 0;
	var msgCodeRaw = getAllIndexes(RDT_arquivoBruto, hx);
	while (c < msgCodeRaw.length){
		var check_0 = RDT_arquivoBruto.slice(parseInt(msgCodeRaw[c] - 4), parseInt(msgCodeRaw[c] - 2));
		if (check_0 === '63'){
			RDT_messageCodesArray.push(RDT_arquivoBruto.slice(parseInt(msgCodeRaw[c] - 4), parseInt(msgCodeRaw[c] + 40)))
			c++;
		} else {
			if (check_0 === '64'){
				RDT_messageCodesArray.push(RDT_arquivoBruto.slice(parseInt(msgCodeRaw[c] - 4), parseInt(msgCodeRaw[c] + 56)))
				c++;
			} else {
				msgCodeRaw.splice(c, 1);
			}
		}
	}
}
function RDT_decompileMessageCode(index, hex){
	if (RDT_arquivoBruto !== undefined && hex !== undefined){
		var fHex;
		var MC_XPOS;
		var MC_ZPOS;
		var MC_OFFSET0;
		var MC_OFFSET1;
		var MC_JAPCHARS;
		var MC_READMODE;
		var MC_SPECIALPROP;
		var MC_XWIDTHTRIGGER;
		var MC_ZWIDTHTRIGGER;

		var MC_ID 			 = hex.slice(RANGES['RDT_msgCode-id'][0],              RANGES['RDT_msgCode-id'][1]);
		var MC_HEADER 		 = hex.slice(RANGES['RDT_msgCode-header'][0],          RANGES['RDT_msgCode-header'][1]);
		var MC_IDENT 		 = hex.slice(RANGES['RDT_msgCode-identifier'][0],      RANGES['RDT_msgCode-identifier'][1]);
		if (MC_HEADER === '63'){
			MC_XPOS 		 = hex.slice(RANGES['RDT_msgCode-0-xPos'][0],          RANGES['RDT_msgCode-0-xPos'][1]);
			MC_ZPOS 		 = hex.slice(RANGES['RDT_msgCode-0-zPos'][0],          RANGES['RDT_msgCode-0-zPos'][1]);
			MC_XWIDTHTRIGGER = hex.slice(RANGES['RDT_msgCode-0-xWidthTrigger'][0], RANGES['RDT_msgCode-0-xWidthTrigger'][1]);
			MC_ZWIDTHTRIGGER = hex.slice(RANGES['RDT_msgCode-0-zWidthTrigger'][0], RANGES['RDT_msgCode-0-zWidthTrigger'][1]);
			MC_OFFSET0  	 = hex.slice(RANGES['RDT_msgCode-0-offset_0'][0],      RANGES['RDT_msgCode-0-offset_0'][1]);
			MC_JAPCHARS 	 = hex.slice(RANGES['RDT_msgCode-0-japChars'][0],      RANGES['RDT_msgCode-0-japChars'][1]);
			MC_OFFSET1  	 = hex.slice(RANGES['RDT_msgCode-0-offset_1'][0],      RANGES['RDT_msgCode-0-offset_1'][1]);
			MC_SPECIALPROP 	 = hex.slice(RANGES['RDT_msgCode-0-specialProp'][0],   RANGES['RDT_msgCode-0-specialProp'][1]);
			MC_READMODE 	 = hex.slice(RANGES['RDT_msgCode-0-readMode'][0],      RANGES['RDT_msgCode-0-readMode'][1]);
			fHex			 = hex.slice(RANGES['RDT_msgCode-header'][0],		   RANGES['RDT_msgCode-0-readMode'][1]);
		}
		if (MC_HEADER === '64'){
			MC_XPOS 		 = '[WIP]'; //hex.slice(RANGES['RDT_msgCode-1-xPos'][0],          RANGES['RDT_msgCode-1-xPos'][1]);
			MC_ZPOS 		 = '[WIP]'; //hex.slice(RANGES['RDT_msgCode-1-zPos'][0],          RANGES['RDT_msgCode-1-zPos'][1]);
			MC_XWIDTHTRIGGER = '[WIP]'; //hex.slice(RANGES['RDT_msgCode-1-xWidthTrigger'][0], RANGES['RDT_msgCode-1-xWidthTrigger'][1]);
			MC_ZWIDTHTRIGGER = '[WIP]'; //hex.slice(RANGES['RDT_msgCode-1-zWidthTrigger'][0], RANGES['RDT_msgCode-1-zWidthTrigger'][1]);
			MC_OFFSET0  	 = '[WIP]'; //hex.slice(RANGES['RDT_msgCode-1-offset_0'][0],      RANGES['RDT_msgCode-1-offset_0'][1]);
			MC_JAPCHARS 	 = '[WIP]'; //hex.slice(RANGES['RDT_msgCode-1-japChars'][0],      RANGES['RDT_msgCode-1-japChars'][1]);
			MC_OFFSET1  	 = '[WIP]'; //hex.slice(RANGES['RDT_msgCode-1-offset_1'][0],      RANGES['RDT_msgCode-1-offset_1'][1]);
			MC_SPECIALPROP 	 = '[WIP]'; //hex.slice(RANGES['RDT_msgCode-1-specialProp'][0],   RANGES['RDT_msgCode-1-specialProp'][1]);
			MC_READMODE 	 = hex.slice(RANGES['RDT_msgCode-1-readMode'][0],      RANGES['RDT_msgCode-1-readMode'][1]);
			fHex			 = hex.slice(RANGES['RDT_msgCode-header'][0],		   RANGES['RDT_msgCode-1-readMode'][1]);
		}
		localStorage.setItem('RDT_MSGBLOCK-' + index, fHex);
		var HTML_HUGE_MSGCODE_TEMPLATE = '<div class="RDT-Item RDT-MSGCODE-bg" id="RDT_MSGCODE-' + index + '">' + 
			'<input type="button" class="btn-remover-comando RDT_modifyBtnFix" value="Modify" onclick="RDT_showEditMsgCode(' + index + ', \'' + fHex + '\');">(' + parseInt(index + 1) + ') Message ID: ' + MC_ID.toUpperCase() + 
			'<br><div class="menu-separador"></div>X Position: <font class="RDT-item-lbl-fix">' + MC_XPOS.toUpperCase() + '</font><br>Y Position: <font class="RDT-item-lbl-fix">' + MC_ZPOS.toUpperCase() + '</font><br><font title="Trigger zone (radius)">' + 
			'Radius: <font class="RDT-item-lbl-fix">' + MC_XWIDTHTRIGGER.toUpperCase() + '</font><br>R Position: <font class="RDT-item-lbl-fix">' + MC_ZWIDTHTRIGGER.toUpperCase() + '</font></font><br><div class="RDT-Item-Misc"><br>Header: <font class="RDT-item-lbl-fix-6">' + 
			MC_HEADER.toUpperCase() + '</font><br>Display mode: <font class="RDT-item-lbl-fix-6">' + MC_READMODE.toUpperCase() + '</font><br>Special properties: <font class="RDT-item-lbl-fix-6">' + MC_SPECIALPROP.toUpperCase() + '</font></div><div class="menu-separador">' + 
			'</div>Hex: <font class="user-can-select"><font title="Header">' + MC_HEADER.toUpperCase() + '</font> <font title="ID">' + MC_ID.toUpperCase() + '</font> <font title="Identifier">' + MC_IDENT.toUpperCase() + '</font> <font title="X pos.">' + MC_XPOS.toUpperCase() + 
			'</font> <font title="Y pos.">' + MC_ZPOS.toUpperCase() + '</font> <font title="Size Radius">' + MC_XWIDTHTRIGGER.toUpperCase() + '</font> <font title="R pos.">' + MC_ZWIDTHTRIGGER.toUpperCase() + '</font> ' + MC_OFFSET0.toUpperCase() + ' <font title="Jap. Chars">' + 
			MC_JAPCHARS.toUpperCase() + '</font> ' + MC_OFFSET1.toUpperCase() + ' <font title="Special P.">' + MC_SPECIALPROP.toUpperCase() + '</font> <font title="Read Mode">' + MC_READMODE.toUpperCase() + '</font></font></div>';
		$('#RDT_msgCode_holder').append(HTML_HUGE_MSGCODE_TEMPLATE);
	}
}
function RDT_MSGCODE_APPLY(id){
	var reason;
	var offset;
	var canCompile  = true;
	var readMode 	= document.getElementById('RDT_MSGCODE-edit-display').value;
	var novaX		= document.getElementById('RDT_MSGCODE-edit-X').value.slice(0, 4).toLowerCase();
	var novaZ		= document.getElementById('RDT_MSGCODE-edit-Z').value.slice(0, 4).toLowerCase();
	var special 	= document.getElementById('RDT_MSGCODE-edit-special').value.slice(0, 2).toLowerCase();
	var novaRadiusX = document.getElementById('RDT_MSGCODE-edit-radiusX').value.slice(0, 4).toLowerCase();
	var novaRadiusZ = document.getElementById('RDT_MSGCODE-edit-radiusZ').value.slice(0, 4).toLowerCase();
	var headerCheck = localStorage.getItem('RDT_MSGBLOCK-' + id).slice(RANGES['RDT_msgCode-header'][0], RANGES['RDT_msgCode-header'][1]).toLowerCase();
	var header 		= localStorage.getItem('RDT_MSGBLOCK-' + id).slice(RANGES['RDT_msgCode-header'][0], RANGES['RDT_msgCode-identifier'][1]).toLowerCase();
	if (headerCheck === '63'){
		offset 		= localStorage.getItem('RDT_MSGBLOCK-' + id).slice(RANGES['RDT_msgCode-0-offset_0'][0], RANGES['RDT_msgCode-0-offset_1'][1]).toLowerCase();
	}
	if (headerCheck === '64'){
		offset 		= localStorage.getItem('RDT_MSGBLOCK-' + id).slice(RANGES['RDT_msgCode-1-offset_0'][0], RANGES['RDT_msgCode-1-offset_1'][1]).toLowerCase();
	}
	if (novaX.length !== 4){
		canCompile = false;
		reason = 'The X value are wrong!';
	}
	if (novaZ.length !== 4){
		canCompile = false;
		reason = 'The Z value are wrong!';
	}
	if (novaRadiusX.length !== 4){
		canCompile = false;
		reason = 'The X (width) value are wrong!';
	}
	if (novaRadiusZ.length !== 4){
		canCompile = false;
		reason = 'The Z (width) value are wrong!';
	}
	if (special.length !== 2){
		canCompile = false;
		reason = 'The Special value are wrong!';
	}
	if (header === '64'){
		canCompile = false;
		reason = 'This content can\'t be recompiled for now (WIP)';
	}
	if (canCompile === true){
		var NEW_RDT = header + novaX + novaZ + novaRadiusX + novaRadiusZ + offset + special + readMode;
		RDT_COMPILE_Lv2(localStorage.getItem('RDT_MSGBLOCK-' + id), NEW_RDT.toLowerCase());
		$('#RDT-aba-menu-7').trigger('click');
	} else {
		alert('WARN - ' + reason);
		LOG_addLog('warn', 'MAP - WARN: ' + reason);
		console.warn(reason);
	}
	LOG_scroll();
}
/*
	Doors
*/
function RDT_readDoors(){
	var c = 0;
	RDT_getDoorsArray('012100');
	RDT_getDoorsArray('012101');
	RDT_getDoorsArray('012102');
	RDT_getDoorsArray('012103');
	RDT_getDoorsArray('012104');
	RDT_getDoorsArray('012105');
	RDT_getDoorsArray('012106');
	RDT_getDoorsArray('012107');
	RDT_getDoorsArray('012108');
	RDT_getDoorsArray('012109');
	RDT_getDoorsArray('012110');
	RDT_getDoorsArray('01210c');
	if (RDT_doorsArray.length !== 0){
		while(c < RDT_doorsArray.length){
			RDT_decompileDoors(c, RDT_doorsArray[c]);
			c++;
		}
	}
}
function RDT_getDoorsArray(str){
	var c = 0;
	RDT_doorsRaw = getAllIndexes(RDT_arquivoBruto, str);
	while (c < RDT_doorsRaw.length){
		var check = RDT_arquivoBruto.slice(RDT_doorsRaw[c] - 4, RDT_doorsRaw[c] - 2);
		if (check === '61' || check === '62'){
			RDT_doorsArray.push(parseInt(RDT_doorsRaw[c] - 4));
		} else {
			RDT_doorsRaw.splice(c, 1);
		}
		c++;
	}
}
function RDT_decompileDoors(index, location){
	if (location !== undefined && location !== null){
		var dr_key;
		var dr_xPos;
		var dr_yPos;
		var dr_zPos;
		var dr_rPos;
		var dr_type;
		var dr_nXpos;
		var dr_nYpos;
		var dr_nZpos;
		var dr_nRpos;
		var dr_nStage;
		var dr_zIndex;
		var dr_nCamPos;
		var dr_offset0;
		var dr_offset1;
		var dr_lockFlag;
		var dr_openOrient;
		var dr_nRoomNumber;
		var dr_displayText;
		var doorLeadsTo_title;
		var EXTREME_MASSIVE_HTML_TEMPLATE;
		var reason 		   = '';
		var itemTitle 	   = '';
		var canAdd         = true;
		var loc 		   = parseInt(location);
		var DOOR_RAW 	   = RDT_arquivoBruto.slice(loc, parseInt(loc + 64));
		var dr_id 	  	   = DOOR_RAW.slice(RANGES['RDT_door-id'][0], 			    	RANGES['RDT_door-id'][1]);
		var dr_header 	   = DOOR_RAW.slice(RANGES['RDT_door-header'][0], 		    	RANGES['RDT_door-header'][1]);
		var dr_ident  	   = DOOR_RAW.slice(RANGES['RDT_door-doorIdentifier'][0],    	RANGES['RDT_door-doorIdentifier'][1]);
		if (dr_header === '61'){
			dr_xPos   	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorXpos'][0], 		    RANGES['RDT_door-0-doorXpos'][1]);
			dr_yPos   	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorYpos'][0], 		    RANGES['RDT_door-0-doorYpos'][1]);
			dr_zPos   	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorZpos'][0], 		    RANGES['RDT_door-0-doorZpos'][1]);
			dr_rPos   	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorRpos'][0], 		    RANGES['RDT_door-0-doorRpos'][1]);
			dr_nXpos  	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorNextXpos'][0], 	    RANGES['RDT_door-0-doorNextXpos'][1]);
			dr_nYpos  	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorNextYpos'][0], 	    RANGES['RDT_door-0-doorNextYpos'][1]);
			dr_nZpos  	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorNextZpos'][0], 	    RANGES['RDT_door-0-doorNextZpos'][1]);
			dr_nRpos  	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorNextRpos'][0], 	    RANGES['RDT_door-0-doorNextRpos'][1]);
			dr_nStage 	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorNextStage'][0], 	    RANGES['RDT_door-0-doorNextStage'][1]);
			dr_nRoomNumber = DOOR_RAW.slice(RANGES['RDT_door-0-doorNextRoomNumber'][0], RANGES['RDT_door-0-doorNextRoomNumber'][1]);
			dr_nCamPos	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorNextCamNumber'][0],  RANGES['RDT_door-0-doorNextCamNumber'][1]);
			dr_zIndex	   = DOOR_RAW.slice(RANGES['RDT_door-0-zIndex'][0], 			RANGES['RDT_door-0-zIndex'][1]);
			dr_type		   = DOOR_RAW.slice(RANGES['RDT_door-0-doorType'][0], 		    RANGES['RDT_door-0-doorType'][1]);
			dr_openOrient  = DOOR_RAW.slice(RANGES['RDT_door-0-doorOpenOrient'][0], 	RANGES['RDT_door-0-doorOpenOrient'][1]);
			dr_offset1 	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorHexOffset1'][0], 	RANGES['RDT_door-0-doorHexOffset1'][1]);
			dr_lockFlag	   = DOOR_RAW.slice(RANGES['RDT_door-0-doorLockedFlag'][0], 	RANGES['RDT_door-0-doorLockedFlag'][1]);
			dr_key 		   = DOOR_RAW.slice(RANGES['RDT_door-0-doorKey'][0], 		    RANGES['RDT_door-0-doorKey'][1]);
			dr_displayText = DOOR_RAW.slice(RANGES['RDT_door-0-doorDisplayText'][0], 	RANGES['RDT_door-0-doorDisplayText'][1]);
		} else {
			// Header 62
			DOOR_RAW	   = RDT_arquivoBruto.slice(loc, parseInt(loc + 80));
			dr_xPos   	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorXpos'][0], 		    		RANGES['RDT_door-1-doorXpos'][1]);
			dr_yPos   	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorYpos'][0], 		    		RANGES['RDT_door-1-doorYpos'][1]);
			dr_zPos   	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorZpos'][0], 		    		RANGES['RDT_door-1-doorZpos'][1]);
			dr_rPos   	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorRpos'][0], 		    		RANGES['RDT_door-1-doorRpos'][1]);
			dr_offset0	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorHexOffset0'][0], 			RANGES['RDT_door-1-doorHexOffset0'][1]);
			dr_nXpos  	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorNextXpos'][0], 	    		RANGES['RDT_door-1-doorNextXpos'][1]);
			dr_nYpos  	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorNextYpos'][0], 	    		RANGES['RDT_door-1-doorNextYpos'][1]);
			dr_nZpos  	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorNextZpos'][0], 	    		RANGES['RDT_door-1-doorNextZpos'][1]);
			dr_nRpos  	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorNextRpos'][0], 	    		RANGES['RDT_door-1-doorNextRpos'][1]);
			dr_nStage 	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorNextStage'][0], 	    		RANGES['RDT_door-1-doorNextStage'][1]);
			dr_nRoomNumber = DOOR_RAW.slice(RANGES['RDT_door-1-doorNextRoomNumber'][0], 		RANGES['RDT_door-1-doorNextRoomNumber'][1]);
			dr_nCamPos	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorNextCamNumber'][0],  		RANGES['RDT_door-1-doorNextCamNumber'][1]);
			dr_zIndex 	   = DOOR_RAW.slice(RANGES['RDT_door-1-zIndex'][0], 					RANGES['RDT_door-1-zIndex'][1]);
			dr_type		   = parseInt(parseInt(DOOR_RAW.slice(RANGES['RDT_door-1-doorType'][0], RANGES['RDT_door-1-doorType'][1]), 16) + 1).toString(16).toUpperCase();			
			dr_openOrient  = DOOR_RAW.slice(RANGES['RDT_door-1-doorOpenOrient'][0], 			RANGES['RDT_door-1-doorOpenOrient'][1]);
			dr_lockFlag	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorLockedFlag'][0], 			RANGES['RDT_door-1-doorLockedFlag'][1]);
			dr_key 		   = DOOR_RAW.slice(RANGES['RDT_door-1-doorKey'][0], 		    		RANGES['RDT_door-1-doorKey'][1]);
			dr_offset1 	   = DOOR_RAW.slice(RANGES['RDT_door-1-doorHexOffset1'][0], 			RANGES['RDT_door-1-doorHexOffset1'][1]);
			dr_displayText = DOOR_RAW.slice(RANGES['RDT_door-1-doorDisplayText'][0], 			RANGES['RDT_door-1-doorDisplayText'][1]);
		}
		if (DOOR_RAW === '62670121013000e2ff01eff030000fdf0eed00ffe3cd0ced6004cc10300f301effffeefeed1dece1'){
			canAdd = false;
			reason = 'This is a ARD madness - Sorry about that!';
		}
		if (DOOR_RAW === '6121012101419141414121219141212112327281f12102927100f11110f0c060'){
			canAdd = false;
			reason = 'Pattern is <i>(way)</i> out of range!';
		}
		// Too bad :(
		if (dr_key === '53' && dr_openOrient === '53' && dr_key === '53' && dr_type === '53' && dr_xPos === 'b1b1' && dr_yPos === 'b1b1' && dr_zPos === '31b1'){
			canAdd = false;
			reason = 'Pattern is out of range!';
		}
		if (dr_id === 'b1' && dr_displayText === '6d' && dr_xPos === '01d1' && dr_nStage === '81' && dr_nRoomNumber === '31'){
			canAdd = false;
			reason = 'Pattern is <i>(way)</i> out of range!';
		}
		if (dr_id === '33' && dr_displayText === '20' && dr_xPos === 'f212' && dr_nStage === 'c0' && dr_nRoomNumber === '02' && dr_nCamPos === '50'){
			canAdd = false;
			reason = 'Pattern is <i>(way)</i> out of range!';
		}
		if (dr_id === '00' && dr_displayText === 'f3' && dr_xPos === 'f000' && dr_nStage === 'b1' && dr_nRoomNumber === 'd2' && dr_nCamPos === '22'){
			canAdd = false;
			reason = 'Pattern is <i>(way)</i> out of range!';
		}
		//
		if (canAdd === true){
			localStorage.setItem('RDT_DOOR-' + index, DOOR_RAW);
			if (parseInt(dr_key, 16) < 134){
				if (dr_key === '00'){
					itemTitle = 'Door unlocked!';
				} else {
					itemTitle = ITEM[dr_key][0];
				}
			}
			if (parseInt(dr_key, 16) > 133 && parseInt(dr_key, 16) < 164){
				itemTitle = FILES[dr_key][0];
			}
			if (parseInt(dr_key, 16) > 163 && parseInt(dr_key, 16) < 171){
				itemTitle = RDT_MAPAS[dr_key][0];
			}
			if (parseInt(dr_key, 16) > 171){
				itemTitle = 'Unknown Hex Value! (' + dr_key.toUpperCase() + ')';
			}
			if (dr_key.toLowerCase() === 'ff'){
				itemTitle = 'Door locked in other side';
			}
			var doorLeadsTo = 'R' + parseInt(parseInt(dr_nStage, 16) + 1) + dr_nRoomNumber.toUpperCase();
			if (RDT_locations[doorLeadsTo.toUpperCase()] !== undefined){
				doorLeadsTo_title = RDT_locations[doorLeadsTo.toUpperCase()][0] + ', ' + RDT_locations[doorLeadsTo.toUpperCase()][1];
			} else {
				doorLeadsTo_title = 'Unknown';
			}
			if (dr_header === '61'){
				EXTREME_MASSIVE_HTML_TEMPLATE = '<div class="RDT-Item RDT-door-bg"><input type="button" class="btn-remover-comando RDT_modifyBtnFix" id="RDT_editDoor-' + index + '" value="Modify" onclick="RDT_showEditDoor(' + parseInt(index + 1) + ', \'' + dr_id + '\', \'' + DOOR_RAW + '\');">' + 
					'(' + parseInt(index + 1) + ') Door ID: <font class="RDT-item-lbl-fix">' + dr_id.toUpperCase() + '</font> - Leads to <font title="' + doorLeadsTo_title + '">' + doorLeadsTo + '.' + RDT_fileType + '</font><br><div class="menu-separador"></div>X Position: <font class="RDT-item-lbl-fix">' + 
					dr_xPos.toUpperCase() + '</font><br>Y Position: <font class="RDT-item-lbl-fix">' + dr_yPos.toUpperCase() + '</font><br>Z Position: <font class="RDT-item-lbl-fix">' + dr_zPos.toUpperCase() + '</font><br>R Position: <font class="RDT-item-lbl-fix">' + dr_rPos.toUpperCase() + '</font><br>' + 
					'<div class="RDT-Item-Misc">Spawn X Position: <font class="RDT-item-lbl-fix-3">' + dr_nXpos.toUpperCase() + '</font><br>Spawn Y Position: <font class="RDT-item-lbl-fix-3">' + dr_nYpos.toUpperCase() + '</font><br>Spawn Z Position: <font class="RDT-item-lbl-fix-3">' + dr_nZpos.toUpperCase() + 
					'</font><br>Spawn R Position: <font class="RDT-item-lbl-fix-3">' + dr_nRpos.toUpperCase() + '</font><br></div><div class="RDT-Item-Misc-2">Door Type: <font class="RDT-item-lbl-fix-4">' + dr_type.toUpperCase() + '</font><br>Next Stage: <font class="RDT-item-lbl-fix-4">' + dr_nStage.toUpperCase() +
					'</font><br>Next Camera: <font class="RDT-item-lbl-fix-4">' + dr_nCamPos.toUpperCase() + '</font><br>Next Room Number: <font class="RDT-item-lbl-fix-4">' + dr_nRoomNumber.toUpperCase() + '</font><br></div><div class="RDT-Item-Misc-3">Header: <font class="RDT-item-lbl-fix-5">' + dr_header.toUpperCase() + '</font><br>' + 
					'Lock Flag: <font class="RDT-item-lbl-fix-5">' + dr_lockFlag.toUpperCase() + '</font><br>Key: <font class="RDT-item-lbl-fix-5" title="' + itemTitle + '">' + dr_key.toUpperCase() + '</font><br>Open Orientation: <font class="RDT-item-lbl-fix-5">' + dr_openOrient.toUpperCase() + '</font></div><div class="menu-separador">' + 
					'</div>Hex: <font class="user-can-select"><font title="Header">' + dr_header.toUpperCase() + '</font> <font title="ID">' + dr_id.toUpperCase() + '</font> <font title="Identifier">' + dr_ident.toUpperCase() + '</font> <font title="X Pos.">' + dr_xPos.toUpperCase() + '</font> <font title="Y Pos.">' + dr_yPos.toUpperCase() + 
					'</font> <font title="Z Pos.">' + dr_zPos.toUpperCase() + '</font> <font title="R Pos.">' + dr_rPos.toUpperCase() + '</font> <font title="Spawn X Pos.">' + dr_nXpos.toUpperCase() + '</font> <font title="Spawn Z Pos.">' + dr_nZpos.toUpperCase() + '</font> <font title="Spawn Y Pos.">' + dr_nYpos.toUpperCase() + '</font> ' + 
					'<font title="Spawn R Pos.">' + dr_nRpos.toUpperCase() + '</font> ' + '<font title="Next Stage">' + dr_nStage.toUpperCase() + '</font> <font title="Next Room Number">' + dr_nRoomNumber.toUpperCase() + '</font> <font title="Next Cam">' + dr_nCamPos.toUpperCase() + '</font> <font title="Z Index">' + dr_zIndex.toUpperCase() +
					'</font> <font title="Door Type">' + dr_type.toUpperCase() + '</font> <font title="Open Orientation">' + dr_openOrient.toUpperCase() + '</font> <font title="Unk. Flag">' + dr_offset1.toUpperCase() + '</font> <font title="Lock Flag">' + dr_lockFlag.toUpperCase() + '</font> <font title="Lock Key">' + dr_key.toUpperCase() + 
					'</font> <font title="Display Text">' + dr_displayText.toUpperCase() + '</font></font></div>';
			} else {
				var drType = parseInt(parseInt(dr_type, 16) - 1).toString();
				if (drType.length !== 2){
					drType = '0' + drType;
				}
				EXTREME_MASSIVE_HTML_TEMPLATE = '<div class="RDT-Item RDT-door-bg"><input type="button" class="btn-remover-comando RDT_modifyBtnFix" id="RDT_editDoor-' + index + '" value="Modify" onclick="RDT_showEditDoor(' + parseInt(index + 1) + ', \'' + dr_id + '\', \'' + DOOR_RAW + '\');">' + 
					'(' + parseInt(index + 1) + ') Door ID: <font class="RDT-item-lbl-fix">' + dr_id.toUpperCase() + '</font> - Leads to <font title="' + doorLeadsTo_title + '">' + doorLeadsTo + '.' + RDT_fileType + '</font><br><div class="menu-separador"></div>X Position: <font class="RDT-item-lbl-fix">' +
					dr_xPos.toUpperCase() + '</font><br>Y Position: <font class="RDT-item-lbl-fix">' + dr_yPos.toUpperCase() + '</font><br>Z Position: <font class="RDT-item-lbl-fix">' + dr_zPos.toUpperCase() + '</font><br>R Position: <font class="RDT-item-lbl-fix">' + dr_rPos.toUpperCase() + '</font><br>' + 
					'<div class="RDT-Item-Misc">Spawn X Position: <font class="RDT-item-lbl-fix-3">' + dr_nXpos.toUpperCase() + '</font><br>Spawn Y Position: <font class="RDT-item-lbl-fix-3">' + dr_nYpos.toUpperCase() + '</font><br>Spawn Z Position: <font class="RDT-item-lbl-fix-3">' + dr_nZpos.toUpperCase() +
					'</font><br>Spawn R Position: <font class="RDT-item-lbl-fix-3">' + dr_nRpos.toUpperCase() + '</font><br></div><div class="RDT-Item-Misc-2">Door Type: <font class="RDT-item-lbl-fix-4">' + dr_type.toUpperCase() + '</font><br>Next Stage: <font class="RDT-item-lbl-fix-4">' + dr_nStage.toUpperCase() +
					'</font><br>Next Camera: <font class="RDT-item-lbl-fix-4">' + dr_nCamPos.toUpperCase() + '</font><br>Next Room Number: <font class="RDT-item-lbl-fix-4">' + dr_nRoomNumber.toUpperCase() + '</font><br></div><div class="RDT-Item-Misc-3">Header: <font class="RDT-item-lbl-fix-5">' + dr_header.toUpperCase() +
					'</font><br>Lock Flag: <font class="RDT-item-lbl-fix-5">' + dr_lockFlag.toUpperCase() + '</font><br>Key: <font class="RDT-item-lbl-fix-5" title="' + itemTitle + '">' + dr_key.toUpperCase() + '</font><br>Open Orientation: <font class="RDT-item-lbl-fix-5">' + dr_openOrient.toUpperCase() + '</font></div>' + 
					'<div class="menu-separador"></div>Hex: <font class="user-can-select"><font title="Header">' + dr_header.toUpperCase() + '</font> <font title="ID">' + dr_id.toUpperCase() + '</font> <font title="Identifier">' + dr_ident.toUpperCase() + '</font> <font title="X Pos.">' + 	dr_xPos.toUpperCase() + '</font> ' + 
					'<font title="Y Pos.">' + dr_yPos.toUpperCase() + '</font> <font title="Z Pos.">' + dr_zPos.toUpperCase() + '</font> <font title="R Pos.">' + dr_rPos.toUpperCase() + '</font> <font title="Unknown Values">' + dr_offset0.toUpperCase() + '</font> <font title="Spawn X Pos.">' + dr_nXpos.toUpperCase() + '</font> ' + 
					'<font title="Spawn Z Pos.">' + dr_nZpos.toUpperCase() + '</font> <font title="Spawn Y Pos.">' + dr_nYpos.toUpperCase() + '</font> <font title="Spawn R Pos.">' + dr_nRpos.toUpperCase() + '</font> <font title="Next Stage">' + dr_nStage.toUpperCase() + '</font> <font title="Room Number">' + dr_nRoomNumber.toUpperCase() + 
					'</font> <font title="Next Cam">' + dr_nCamPos.toUpperCase() + '</font> <font title="Z Index">' + dr_zIndex.toUpperCase() + '</font> <font title="Door Type">' + drType.toString().toUpperCase() + '</font> <font title="Open Orientation">' + dr_openOrient.toUpperCase() + '</font> <font title="Unk. Flag">' + dr_offset1.toUpperCase() + 
					'</font> <font title="Lock Flag">' + dr_lockFlag.toUpperCase() + '</font> <font title="Lock Key">' + dr_key.toUpperCase() + '</font> <font title="Display Text">' + dr_displayText.toUpperCase() + '</font></font></div>';
			}
			$('#RDT_door_holder').append(EXTREME_MASSIVE_HTML_TEMPLATE);
			RDT_totalDoors++;
		} else {
			LOG_addLog('warn', 'MAP - WARN: Unable to add door! - ' + reason);
		}
	}
	LOG_scroll();
}
function RDT_copyPastePos(mode){
	// Copy Next
	if (mode === 0){
		RDT_TEMP_NEXTX 		 = document.getElementById('RDT_door-edit-NX').value.toUpperCase();
		RDT_TEMP_NEXTY 		 = document.getElementById('RDT_door-edit-NY').value.toUpperCase();
		RDT_TEMP_NEXTZ 		 = document.getElementById('RDT_door-edit-NZ').value.toUpperCase();
		RDT_TEMP_NEXTR 		 = document.getElementById('RDT_door-edit-NR').value.toUpperCase();
		RDT_TEMP_NEXT_STAGE  = document.getElementById('RDT_door-edit-NS').value.toUpperCase();
		RDT_TEMP_NEXT_ROOM   = document.getElementById('RDT_door-edit-NRN').value.toUpperCase();
		RDT_TEMP_ZINDEX      = document.getElementById('RDT_door-edit-zIndex').value.toUpperCase();
		if (enable_mod === true){
			RDT_TEMP_NEXT_CAMERA = document.getElementById('RDT_door-edit-NC').value.toUpperCase();
		} else {
			RDT_TEMP_NEXT_CAMERA = document.getElementById('RDT_door-edit-NC-TXT').value.toUpperCase();
		}
		var TEXT_FOR_CP = '[Door]\nCurrent Map: ' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '.RDT\nNext Map: R' + (parseInt(RDT_TEMP_NEXT_STAGE) + 1) + RDT_TEMP_NEXT_ROOM + 
			'.' + RDT_fileType + '\nX Pos: ' + RDT_TEMP_NEXTX + '\nY Pos: ' + RDT_TEMP_NEXTY + '\nZ Pos: ' + RDT_TEMP_NEXTZ + '\nR Pos: ' + RDT_TEMP_NEXTR + '\nNext Stage: ' + 
			RDT_TEMP_NEXT_STAGE + '\nNext Room Number: ' + RDT_TEMP_NEXT_ROOM + '\nNext Camera: ' + RDT_TEMP_NEXT_CAMERA + '\nZ Index: ' + RDT_TEMP_ZINDEX;
		R3DITOR_COPY(TEXT_FOR_CP);
	}
	// Paste Next
	if (mode === 1 && RDT_TEMP_NEXTX !== '' && RDT_TEMP_NEXTY !== '' && RDT_TEMP_NEXTZ !== '' && RDT_TEMP_NEXTR !== '' && RDT_TEMP_NEXT_STAGE !== '' && RDT_TEMP_NEXT_ROOM !== ''){
		document.getElementById('RDT_door-edit-NX').value 		  = RDT_TEMP_NEXTX;
		document.getElementById('RDT_door-edit-NY').value 		  = RDT_TEMP_NEXTY;
		document.getElementById('RDT_door-edit-NZ').value 		  = RDT_TEMP_NEXTZ;
		document.getElementById('RDT_door-edit-NR').value 		  = RDT_TEMP_NEXTR;
		document.getElementById('RDT_door-edit-zIndex').value     = RDT_TEMP_ZINDEX;
		document.getElementById('RDT_door-edit-NRN').value 		  = RDT_TEMP_NEXT_ROOM;
		document.getElementById('RDT_door-edit-NS').value 		  = RDT_TEMP_NEXT_STAGE;
		document.getElementById('RDT_door-edit-NC').value 	  	  = RDT_TEMP_NEXT_CAMERA;
		document.getElementById('RDT_door-edit-NC-TXT').value 	  = RDT_TEMP_NEXT_CAMERA;
		document.getElementById('RDT_lbl_door_editCam').innerHTML = RDT_TEMP_NEXT_CAMERA;
		RDT_renderNextRDTLbl();
		RDT_renderEditDoorCamPreview();
	}
}
function RDT_DOOR_copyPasteLockKey(mode){
	if (mode === 0){
		RDT_TEMP_DOORKEY_ITEM = document.getElementById('RDT_door-edit-LK').value;
		RDT_TEMP_DOORKEY_FLAG = document.getElementById('RDT_door-edit-LF').value;
		RDT_TEMP_DOORKEY_UNKF = document.getElementById('RDT_door-edit-UNKFLAG_B').value;
		$('#RDT_btn_doorPasteKey').css({'display': 'inline'});
	} else {
		document.getElementById('RDT_door-edit-LK').value = RDT_TEMP_DOORKEY_ITEM;
		document.getElementById('RDT_door-edit-LF').value = RDT_TEMP_DOORKEY_FLAG;
		document.getElementById('RDT_door-edit-UNKFLAG_B').value = RDT_TEMP_DOORKEY_UNKF;
	}
}
function RDT_DOOR_APPLY(index){
	var offset0;
	var reason = '';
	var DOOR_COMPILED;
	var canCompile = true;
	var ident 	= localStorage.getItem('RDT_DOOR-' + parseInt(index - 1));
	var header 	= ident.slice(RANGES['RDT_door-header'][0], RANGES['RDT_door-doorIdentifier'][1]).toLowerCase();
	var hexType = header.slice(0, 2);
	if (hexType === '62'){
		offset0    = ident.slice(RANGES['RDT_door-1-doorHexOffset0'][0], RANGES['RDT_door-1-doorHexOffset0'][1]).toLowerCase();	
	}
	var cX 		   = document.getElementById('RDT_door-edit-X').value.toLowerCase();
	var cY 		   = document.getElementById('RDT_door-edit-Z').value.toLowerCase();
	var cZ 		   = document.getElementById('RDT_door-edit-Y').value.toLowerCase();
	var cR 		   = document.getElementById('RDT_door-edit-R').value.toLowerCase();
	var nX 		   = document.getElementById('RDT_door-edit-NX').value.toLowerCase();
	var nY 		   = document.getElementById('RDT_door-edit-NY').value.toLowerCase();
	var nZ 		   = document.getElementById('RDT_door-edit-NZ').value.toLowerCase();
	var nR 		   = document.getElementById('RDT_door-edit-NR').value.toLowerCase();
	var nOO 	   = document.getElementById('RDT_door-edit-OO').value.toLowerCase();
	var nLF 	   = document.getElementById('RDT_door-edit-LF').value.toLowerCase();
	var nLK 	   = document.getElementById('RDT_door-edit-LK').value.toLowerCase();
	var nType	   = document.getElementById('RDT_door-edit-DT').value.toLowerCase();
	var nStage 	   = document.getElementById('RDT_door-edit-NS').value.toLowerCase();
	var nRN 	   = document.getElementById('RDT_door-edit-NRN').value.toLowerCase();
	var nCP 	   = document.getElementById('RDT_door-edit-NC-TXT').value.toLowerCase();
	var zIndex	   = document.getElementById('RDT_door-edit-zIndex').value.toLowerCase();
	var displayTxt = document.getElementById('RDT_door-edit-DispTxt').value.toLowerCase();
	var UnkFlag    = document.getElementById('RDT_door-edit-UNKFLAG_B').value.toLowerCase();
	if (cX.length !== 4){
		canCompile = false;
		reason = '(X Pos) The length is wrong!';
	}
	if (cY.length !== 4){
		canCompile = false;
		reason = '(Y Pos) The length is wrong!';
	}
	if (cZ.length !== 4){
		canCompile = false;
		reason = '(Z Pos) The length is wrong!';
	}
	if (cR.length !== 4){
		canCompile = false;
		reason = '(R Pos) The length is wrong!';
	}
	if (nX.length !== 4){
		canCompile = false;
		reason = '(Next X Pos) The length is wrong!';
	}
	if (nY.length !== 4){
		canCompile = false;
		reason = '(Next Y Pos) The length is wrong!';
	}
	if (nZ.length !== 4){
		canCompile = false;
		reason = '(Next Z Pos) The length is wrong!';
	}
	if (nR.length !== 4){
		canCompile = false;
		reason = '(Next R Pos) The length is wrong!';
	}
	if (nCP.length !== 2){
		canCompile = false;
		reason = '(Camera) The length is wrong!';
	}
	if (nOO.length !== 2){
		canCompile = false;
		reason = '(Open Orientation) The length is wrong!';
	}
	if (nLF.length !== 2){
		canCompile = false;
		reason = '(Lock Flag) The length is wrong!';
	}
	if (nLK.length !== 2){
		canCompile = false;
		reason = '(Lock Key) The length is wrong!';
	}
	if (nRN.length !== 2){
		canCompile = false;
		reason = '(Next Room Number) The length is wrong!';
	}
	if (nType.length !== 2){
		canCompile = false;
		reason = '(Door Type) The length is wrong!';
	}
	if (nStage.length !== 2){
		canCompile = false;
		reason = '(Stage) The length is wrong!';
	}
	//
	if (zIndex.length !== 2){
		canCompile = false;
		reason = '(Position) Z-Index length is wrong!';
	}
	if (UnkFlag.length !== 2){
		canCompile = false;
		reason = '(Unk. Flag) Unk. Flag length is wrong!';
	}
	if (canCompile === true){
		if (hexType === '61'){
			DOOR_COMPILED = header + cX + cY + cZ + cR + nX + nZ + nY + nR + nStage + nRN + nCP + zIndex + nType + nOO + UnkFlag + nLF + nLK + displayTxt;
		} else {
			DOOR_COMPILED = header + cX + cY + cZ + cR + offset0 + nX + nZ + nY + nR + nStage + nRN + nCP + zIndex + nType + nOO + UnkFlag + nLF + nLK + displayTxt;
		}
		RDT_COMPILE_Lv2(ident, DOOR_COMPILED);
		$('#RDT-aba-menu-6').trigger('click');
	} else {
		alert('WARNING: Unable to compile door code!\nReason: ' + reason);
		LOG_addLog('warn', 'MAP - WARN: Unable to compile door!');
		LOG_addLog('warn', 'MAP - Reason: ' + reason);
	}
	LOG_scroll();
}
/*
	Related Audios
	Audios with names related with current map
*/
function RDT_getAllRelatedAudios(){
	var c = 0;
	var MAPID = getFileName(ORIGINAL_FILENAME).slice(1, getFileName(ORIGINAL_FILENAME).length);
	var getAudioArray = fs.readdirSync(APP_PATH + '\\Assets\\DATA_A\\VOICE\\').filter(fn => fn.startsWith('M' + MAPID));
	while(c < getAudioArray.length){
		var AUDIO_HTML_TEMPLATE = '<div class="RDT-Item RDT-audio-bg" id="RDT_audio_details-' + c + '">' +
			'(' + parseInt(c + 1) + ') File Name: <font class="italic RDT-item-lbl-fix">' + getAudioArray[c] + '</font>' + 
			'<input type="button" class="btn-remover-comando" style="margin-top: 5px;" value="Remove" onclick="RDT_currentAudio = \'' + getFileName(getAudioArray[c]).toUpperCase() + '\';RDT_deleteAudio();">' + 
			'<input type="button" class="btn-remover-comando" style="margin-top: 5px;" value="Replace" onclick="RDT_currentAudio = \'' + getFileName(getAudioArray[c]).toUpperCase() + '\';triggerLoad(1);">' + 
			'<input type="button" class="btn-remover-comando" style="margin-top: 5px;" value="Open" ' + 
			'onclick="runExternalSoftware(\'cmd\', [\'/C\', \'start\', \'wmplayer\', \'' + APP_PATH.replace(new RegExp('\\\\', 'g'), '/') + '/Assets/DATA_A/VOICE/' + getAudioArray[c] + '\']);"><br>Path: <font class="italic user-can-select">' + 
			APP_PATH.replace(new RegExp('\\\\', 'g'), '/') + '/Assets/DATA_A/VOICE/' + getAudioArray[c] + '</font><br></div>';
		$('#RDT_audio_holder').append(AUDIO_HTML_TEMPLATE);
		c++;
	}
	RDT_totalAudios = getAudioArray.length;
}
function RDT_replaceWavFile(file){
	var deleteFile = APP_PATH + '\\Assets\\DATA_A\\VOICE\\' + RDT_currentAudio;
	var askConfirm = confirm('File: ' + RDT_currentAudio + '\nNew File: ' + getFileName(file).toUpperCase() + '\n\nR3ditor will replace this file.\nDo you accept this?');
	if (askConfirm === true){
		fs.unlinkSync(deleteFile);
		var newWaveFile = fs.readFileSync(file, 'hex');
		fs.writeFileSync(APP_PATH + '\\Assets\\DATA_A\\VOICE\\' + RDT_currentAudio.toUpperCase(), newWaveFile, 'hex');
		LOG_addLog('log', 'MAP - WAV: Replace successfull!');
	} else {
		LOG_addLog('warn', 'MAP - WARN: Operation Canceled!');
	}
	LOG_scroll();
}
function RDT_deleteAudio(){
	var deleteFile = APP_PATH + '\\Assets\\DATA_A\\VOICE\\' + RDT_currentAudio;
	var askConfirm = confirm('File: ' + RDT_currentAudio + '\n\nR3ditor will delete this file.\nDo you want to proceed?');
	if (askConfirm === true){
		fs.unlinkSync(deleteFile);
		LOG_addLog('log', 'MAP - WAV: Done!');
		RDT_openFile(ORIGINAL_FILENAME);
	} else {
		LOG_addLog('warn', 'MAP - WARN: Operation Canceled!');
	}
	LOG_scroll();
}
/*
	Items, Files and Maps
*/
function RDT_readItens(){
	var c = 0;
	RDT_totalItens = 0;
	RDT_totalFiles = 0;
	RDT_totalMapas = 0;
	RDT_ItensArray = [];
	RDT_totalItensGeral = 0;
	if (getFileName(ORIGINAL_FILENAME) === 'r218'){
		RDT_generateItemIndexRaw('02210000');
	}
	RDT_generateItemIndexRaw('02310900');
	RDT_generateItemIndexRaw('02318000');
	RDT_generateItemIndexRaw('02310800');
	RDT_generateItemIndexRaw('02310000'); // Pattern found in almost every file
	RDT_generateItemIndexRaw('02310500');
	RDT_generateItemIndexRaw('02310100');
	RDT_generateItemIndexRaw('02310200');
	RDT_generateItemIndexRaw('02310300');
	RDT_generateItemIndexRaw('02310400');
	RDT_generateItemIndexRaw('02310a00'); // R503.RDT - Dead Factory
	RDT_totalItensGeral = RDT_ItensArray.length;
	while (c < RDT_totalItensGeral){
		var RDT_itemStartRange = RDT_ItensArray[c] - 4;
		var RDT_itemEndRange = parseInt(RDT_ItensArray[c] - 4) + 52;
		var RDT_ITEMRAW = RDT_arquivoBruto.slice(RDT_itemStartRange, RDT_itemEndRange);
		if (RDT_ITEMRAW.slice(0, 2) === '68'){
			RDT_ITEMRAW = RDT_arquivoBruto.slice(RDT_itemStartRange, parseInt(RDT_itemEndRange + 8));
		}
		localStorage.setItem('RDT_Item-' + c, RDT_ITEMRAW);
		RDT_decompileItens(c, false);
		c++;
	}
	if (enable_mod === true){
		RDT_getAllRelatedAudios();
	}
	RDT_showMenu(1);
}
function RDT_generateItemIndexRaw(str){
	var c = 0;
	RDT_itemIndexRAW = getAllIndexes(RDT_arquivoBruto, str);
	while (c < RDT_itemIndexRAW.length){
		if (RDT_fm_avaliable === true){
			// Neat Filter
			if (RDT_itemIndexRAW[c] < RDT_MSGTEXT_startText){
				RDT_ItensArray.push(RDT_itemIndexRAW[c]);
			} else {
				LOG_addLog('warn', 'MAP - WARN: Unable to add item ' + c + ' because it is out of range!');
			}
		} else {
			RDT_ItensArray.push(RDT_itemIndexRAW[c]);
		}
		c++;
	}
}
function RDT_decompileItens(id, edit){
	var RDT_reason;
	var RDT_CanRender = true;
	var currentItem = localStorage.getItem('RDT_Item-' + id);
	var header = currentItem.slice(RANGES['RDT_item-header'][0], RANGES['RDT_item-header'][1]);
	if (header !== '67' && header !== '68'){
		RDT_totalItensGeral--;
		RDT_CanRender = false;
		RDT_ItensArray.splice(id, 1);
		localStorage.removeItem('RDT_Item-' + id);
		RDT_reason = 'Item, map or file have unknown header (<font class="user-can-select">' + header.toUpperCase() + '</font>)';
	}
	if (RDT_arquivoBruto.indexOf(currentItem) > RDT_MSGTEXT_startText && RDT_fm_avaliable === true){
		RDT_totalItensGeral--;
		RDT_CanRender = false;
		RDT_ItensArray.splice(id, 1);
		localStorage.removeItem('RDT_Item-' + id);
		RDT_reason = 'Item, map or file is out of location!';
	}
	if (RDT_CanRender === true){
		if (edit === false){
			RDT_renderItens(id, currentItem);
		}
	} else {
		console.warn('WARNING: Unable to render item ' + id + ' - ' + RDT_reason);
		LOG_addLog('warn', 'MAP - WARN: Unable to render item ' + id + ' - ' + RDT_reason);
		LOG_addLog('warn', 'MAP - Wrong Hex: <font class="user-can-select">' + currentItem.toUpperCase() + '</font>');
	}
	LOG_scroll();
}
function RDT_renderItens(index, hex){
	var x;
	var y;
	var z;
	var r;
	var mp;
	var id;
	var tipo;
	var quant;
	var iFlag;
	var cssFix;
	var typeId;
	var convert;
	var modelId;
	var hexComp;
	var header  = hex.slice(RANGES['RDT_item-header'][0],        RANGES['RDT_item-header'][1]);
	var ident   = hex.slice(RANGES['RDT_item-itemIdetifier'][0], RANGES['RDT_item-itemIdetifier'][1]);
	if (header === '67'){
		x 		= hex.slice(RANGES['RDT_item-0-itemXX'][0],      RANGES['RDT_item-0-itemXX'][1]);
		y 		= hex.slice(RANGES['RDT_item-0-itemYY'][0],      RANGES['RDT_item-0-itemYY'][1]);
		z 		= hex.slice(RANGES['RDT_item-0-itemZZ'][0],      RANGES['RDT_item-0-itemZZ'][1]);
		r 		= hex.slice(RANGES['RDT_item-0-itemRR'][0],      RANGES['RDT_item-0-itemRR'][1]);
		id 		= hex.slice(RANGES['RDT_item-0-itemID'][0],      RANGES['RDT_item-0-itemID'][1]);
		quant 	= hex.slice(RANGES['RDT_item-0-itemQuant'][0],   RANGES['RDT_item-0-itemQuant'][1]);
		iFlag  	= hex.slice(RANGES['RDT_item-0-itemFlag'][0],    RANGES['RDT_item-0-itemFlag'][1]);
		modelId = hex.slice(RANGES['RDT_item-0-modelID'][0],     RANGES['RDT_item-0-modelID'][1]);
		mp 		= hex.slice(RANGES['RDT_item-0-itemMP'][0],      RANGES['RDT_item-0-itemMP'][1]);
		hexComp = '<font title="Header">' + header.toUpperCase() + '</font> <font title="Identifier">' + ident.toUpperCase() + '</font> ' + 
				  localStorage.getItem('RDT_Item-' + index).slice(4, 12).toUpperCase() + ' <font title="X pos.">' +  x.toUpperCase() + '</font> <font title="Y pos.">' 
				  + y.toUpperCase() + '</font> <font title="Z pos.">' + z.toUpperCase() + '</font> <font title="R pos.">' + r.toUpperCase() + '</font> <font title="Item Hex">' + id.toUpperCase() + 
				  '</font> ' + localStorage.getItem('RDT_Item-' + index).slice(30, 32).toUpperCase() + ' <font title="Quantity">' + quant.toUpperCase() + '</font> ' + 
				  localStorage.getItem('RDT_Item-' + index).slice(34, 38).toUpperCase() + ' <font title="Item flag">' + iFlag.toUpperCase() + '</font> <font title="Model ID">' + 
				  modelId.toUpperCase() + '</font> <font title="Animation">' + mp.toUpperCase() + '</font>';
	}
	if (header === '68'){
		x 		= '[WIP]'; //hex.slice(RANGES['RDT_item-1-itemXX'][0], RANGES['RDT_item-1-itemXX'][1]);
		y 		= '[WIP]'; //hex.slice(RANGES['RDT_item-1-itemYY'][0], RANGES['RDT_item-1-itemYY'][1]);
		z 		= '[WIP]'; //hex.slice(RANGES['RDT_item-1-itemZZ'][0], RANGES['RDT_item-1-itemZZ'][1]);
		r 		= '[WIP]'; //hex.slice(RANGES['RDT_item-1-itemRR'][0], RANGES['RDT_item-1-itemRR'][1]);
		id 		= hex.slice(RANGES['RDT_item-1-itemID'][0],     RANGES['RDT_item-1-itemID'][1]);
		quant 	= hex.slice(RANGES['RDT_item-1-itemQuant'][0],  RANGES['RDT_item-1-itemQuant'][1]);
		iFlag  	= '[WIP]';
		modelId = '[WIP]';
		mp 		= hex.slice(RANGES['RDT_item-1-itemMP'][0],     RANGES['RDT_item-1-itemMP'][1]);
		hexComp = localStorage.getItem('RDT_Item-' + index).toUpperCase() + ' [WIP]';
	}
	try{
		if (parseInt(id, 16) < 134 || parseInt(id, 16) > 170){
			typeId = 1;
			tipo = 'Item';
			convert = ITEM[id][0];
			if (parseInt(id, 16) < 170){
				cssFix = 'RDT-item-bg';
			} else {
				cssFix = 'RDT-itemDANGER-bg';
			}
			RDT_totalItens++;
		}
		if (parseInt(id, 16) > 133 && parseInt(id, 16) < 164){
			typeId = 2;
			tipo = 'File';
			cssFix = 'RDT-file-bg';
			convert = FILES[id][0];
			RDT_totalFiles++;
		}
		if (parseInt(id, 16) > 163 && parseInt(id, 16) < 171){
			typeId = 3;
			tipo = 'Map';
			cssFix = 'RDT-map-bg';
			convert = RDT_MAPAS[id][0];
			RDT_totalMapas++;
		}
		if (id.length < 2){
			id = '0' + id;
		}
		RDT_addIconToCanvas(typeId, index, x, y, z, r, id);
		var RDT_ITEM_HTML_TEMPLATE = '<div class="RDT-Item ' + cssFix + '" id="RDT-item-' + index + '" onclick="main_closeFileList();">(' + parseInt(index + 1) + ') ' + tipo + ': ' + convert + 
			' (Hex: <font title="' + convert + '">' + id.toUpperCase() + '</font>)<input type="button" class="btn-remover-comando RDT_modifyBtnFix" id="RDT_editItemBtn_' + index + '" value="Modify" onclick="RDT_selectPoint(' + index + ');' + 
			'RDT_displayItemEdit(' + typeId + ', ' + index + ', \'' + hex + '\');"><br>Quantity: ' + parseInt(quant, 16) + '<br><div class="menu-separador"></div>X Position: <font class="RDT-item-lbl-fix">' + x.toUpperCase() + '</font><br>' +
			'Y Position: <font class="RDT-item-lbl-fix">' + y.toUpperCase() + '</font><br>Z Position: <font class="RDT-item-lbl-fix">' + z.toUpperCase() + '</font><br><font title="Rotation">R Position</font>: <font class="RDT-item-lbl-fix">' + 
			r.toUpperCase() + '</font><br><div class="RDT-Item-Misc">Header: <font class="RDT-item-lbl-fix-2">' + header.toUpperCase() + '</font><br>Identifier: <font class="RDT-item-lbl-fix-2">' + ident.toUpperCase() + '</font><br>' + 
			'Animation: <font class="RDT-item-lbl-fix-2">' + mp.toUpperCase() + '</font><br>Model ID: <font class="RDT-item-lbl-fix-2">' + modelId.toUpperCase() + '</font></div><div class="RDT-Item-Misc RDT_ITEM_MISC_FIX"><br><br><br>Item flag: ' + 
			iFlag.toUpperCase() + '</div><div class="menu-separador"></div>Hex: <font class="user-can-select">' + hexComp + '</font></div>';
		$('#RDT-item-list').append(RDT_ITEM_HTML_TEMPLATE);
	} catch (err){
		var msg = 'MAP - ERROR: Unable to render item ' + id.toUpperCase() + ' - ' + msg;
		LOG_addLog('error', msg);
		console.error(msg);
	}
	LOG_scroll();
}
function RDT_copyPasteItemPos(mode){
	if (mode === 0){
		var TEXT_FOR_CP = '[Item, Files & Map]\nItem X: ' + RDT_CURRENT_X.toUpperCase() + '\nItem Y: ' + RDT_CURRENT_Y.toUpperCase() + '\nItem Z: ' + RDT_CURRENT_Z.toUpperCase() + '\nItem R: ' + RDT_CURRENT_R.toUpperCase();
		R3DITOR_COPY(TEXT_FOR_CP);
		RDT_CURRENT_X = document.getElementById('RDT_lbl_point_x_hex').value;
		RDT_CURRENT_Y = document.getElementById('RDT_lbl_point_y_hex').value;
		RDT_CURRENT_Z = document.getElementById('RDT_lbl_point_z_hex').value;
		RDT_CURRENT_R = document.getElementById('RDT_lbl_point_r_hex').value;
	} else {
		if (RDT_CURRENT_X !== '' && RDT_CURRENT_Y !== '' && RDT_CURRENT_Z !== '' && RDT_CURRENT_R !== ''){
			document.getElementById('RDT_lbl_point_x_hex').value = RDT_CURRENT_X;
			document.getElementById('RDT_lbl_point_y_hex').value = RDT_CURRENT_Y;
			document.getElementById('RDT_lbl_point_z_hex').value = RDT_CURRENT_Z;
			document.getElementById('RDT_lbl_point_r_hex').value = RDT_CURRENT_R;
		}
	}
}
function RDT_ITEM_APPLY(index, type, convert){
	var error;
	var nQuant;
	var novaHex;
	var canBuild = true;
	if (convert === false && convert !== undefined && convert !== null){
		if (type === 1){
			novaHex = document.getElementById('RDT-item-select').value;
			nQuant = parseInt(document.getElementById('RDT_item-edit-Quant').value);
		}
		if (type === 2){
			novaHex = document.getElementById('RDT-file-select').value;
			nQuant = 1;
		}
		if (type === 3){
			novaHex = document.getElementById('RDT-map-select').value;
			nQuant = 1;
		}
		if (nQuant > 255){
			nQuant = 255;
		}
		if (nQuant < 0){
			nQuant = 0;
		}
		var quant = nQuant.toString(16);
		if (quant.length < 2){
			quant = '0' + quant;
		}
	} else {
		var newType = parseInt(document.getElementById('RDT_convertItemTo').value);
		quant = '01';
		type = newType;
		if (newType === 1){
			novaHex = '01';
		}
		if (newType === 2){
			novaHex = '86';
		}
		if (newType === 3){
			novaHex = 'a4';
		}
	}
	var novaX = document.getElementById('RDT_lbl_point_x_hex').value.slice(0, 4).toLowerCase();
	var novaY = document.getElementById('RDT_lbl_point_y_hex').value.slice(0, 4).toLowerCase();
	var novaZ = document.getElementById('RDT_lbl_point_z_hex').value.slice(0, 4).toLowerCase();
	var novaR = document.getElementById('RDT_lbl_point_r_hex').value.slice(0, 4).toLowerCase();
	var novaAnim = document.getElementById('RDT_item-edit-A').value.slice(0, 2).toLowerCase();
	var mID = document.getElementById('RDT_item-edit-MI').value.slice(0, 2).toLowerCase();
	var iF = document.getElementById('RDT_item-edit-IF').value.slice(0, 2).toLowerCase();
	if (novaX === ''){
		novaX = '0000';
	}
	if (novaY === ''){
		novaY = '0000';
	}
	if (novaZ === ''){
		novaZ = '0000';
	}
	if (novaR === ''){
		novaR = '0000';
	}
	if (novaAnim === ''){
		novaAnim = '00';
	}
	if (novaX.length !== 4){
		canBuild = false;
		error = 'The X value are wrong!';
	}
	if (novaY.length !== 4){
		canBuild = false;
		error = 'The Y value are wrong!';
	}
	if (novaZ.length !== 4){
		canBuild = false;
		error = 'The Z value are wrong!';
	}
	if (novaR.length !== 4){
		canBuild = false;
		error = 'The R value are wrong!';
	}
	if (novaAnim.length !== 2){
		canBuild = false;
		error = 'The Animation value are wrong!';
	}
	if (mID.length !== 2){
		canBuild = false;
		error = 'The Model ID value are wrong!';
	}
	if (iF.length !== 2){
		canBuild = false;
		error = 'The Item Flag value are wrong!';
	}
	// Rebuilding item
	if (canBuild === true){
		var RDT_ITEM_COMPILADO;
		var header = localStorage.getItem('RDT_Item-' + index).slice(0, 12);  
		if (header.slice(0, 2) === '67'){
			// Header 67
			var offset1 = localStorage.getItem('RDT_Item-' + index).slice(30, 32);
			var offset2 = localStorage.getItem('RDT_Item-' + index).slice(34, 38);
			var offset3 = localStorage.getItem('RDT_Item-' + index).slice(44, localStorage.getItem('RDT_Item-' + index).length);
			RDT_ITEM_COMPILADO = header + novaX + novaY + novaZ + novaR + novaHex + offset1 + quant + offset2 + iF + mID + novaAnim + offset3;
			localStorage.setItem('RDT_Item-' + index, RDT_ITEM_COMPILADO);
		} else {
			// Header 68
			var offset1 = localStorage.getItem('RDT_Item-' + index).slice(12, 44); // Before item id
			var offset2 = localStorage.getItem('RDT_Item-' + index).slice(46, 48); // 00 between item id and quantity
			var offset3 = localStorage.getItem('RDT_Item-' + index).slice(50, 58); // Quantity (before anim)
			RDT_ITEM_COMPILADO = header + offset1 + novaHex + offset2 + quant + offset3 + novaAnim;
			localStorage.setItem('RDT_Item-' + index, RDT_ITEM_COMPILADO);
		}
		RDT_COMPILE_Lv1();
	} else {
		LOG_addLog('warn', 'MAP - WARN: There was an error while processing the item ' + id + ': <font class="user-can-select">' + error + '</font>');
		LOG_scroll();
	}
}
/*
	MESSAGES
	RE-FAC-TOOOOOOOOOOOOR [WIP]
*/
function RDT_getTextMessages(){
	if (RDT_fm_avaliable === true){
		sessionStorage.clear();
		var RDT_ARD_FILEMAP_ARRAY = [];
		LOG_addLog('log', 'MAP - INFO: Loading MapFile Settings...');
		LOG_addLog('log', 'MAP - Path: <font class="user-can-select">' + RDT_fm_path + '</font>');
		fs.readFileSync(RDT_fm_path).toString().split('\n').forEach(function(line){ 
			RDT_ARD_FILEMAP_ARRAY.push(line);
		});
		var checkVersion = atob(RDT_ARD_FILEMAP_ARRAY[3].replace('FORMAT = ', ''));
		if (checkVersion === RDT_fileType){
			RDT_totalMessages = parseInt(RDT_ARD_FILEMAP_ARRAY[4].replace('TOT_MSG = ', ''));
			RDT_MSGTEXT_POINTERS = atob(RDT_ARD_FILEMAP_ARRAY[5].replace('POINTERS = ', ''));
			RDT_MSGTEXT_startText = parseInt(RDT_ARD_FILEMAP_ARRAY[6].replace('TXT_START = ', ''));
			RDT_MSGTEXT_MAXSIZE = atob(RDT_ARD_FILEMAP_ARRAY[7].replace('BLK_SZ = ', ''));
			var organizePointers = RDT_MSGTEXT_POINTERS.match(/.{4,4}/g).reverse().toString().replace(new RegExp(',', 'gi'), '');
			localStorage.setItem('RDT_POINTER_' + getFileName(ORIGINAL_FILENAME).toUpperCase(), organizePointers);
			RDT_MSG_decryptText(0);
			RDT_MSG_checkBlockHealth();
		} else {
			LOG_addLog('warn', 'MAP - WARN: The MapFile found is to use only in ' + checkVersion + ' version! (Current Version: ' + RDT_fileType + ')');
		}
	}
	RDT_renderMSGInfos();
	LOG_scroll();
}
function RDT_removeMapFile(){
	if (fs.existsSync(RDT_fm_path) === true){
		LOG_addLog('log', 'MAP - INFO: Removing MapFile...');
		fs.unlinkSync(RDT_fm_path);
		RDT_openFile(ORIGINAL_FILENAME);
	}
	LOG_scroll();
}
function RDT_MSG_checkBlockHealth(){
	if (RDT_MSGTEXT_currentBlkSize !== RDT_MSGTEXT_MAXSIZE){
		var b = parseInt(RDT_MSGTEXT_MAXSIZE, 16);
		$('#RDT_msgBlock_health').removeClass('red');
		$('#RDT_msgBlock_health').removeClass('green');
		var a = parseInt(RDT_MSGTEXT_currentBlkSize, 16);
		if (a > b){
			document.getElementById('RDT_msgBlock_health').innerHTML = 'Bad';
			$('#RDT_msgBlock_health').addClass('red');
			document.getElementById('RDT_msgBlock_infos').innerHTML = MSGBLOCK_HIGH;
		} else {
			document.getElementById('RDT_msgBlock_health').innerHTML = 'Bad';
			$('#RDT_msgBlock_health').addClass('red');
			document.getElementById('RDT_msgBlock_infos').innerHTML = MSGBLOCK_LOW;
		}
		document.getElementById('RDT_lblError_msgExpected').innerHTML = RDT_MSGTEXT_MAXSIZE.toUpperCase();
		document.getElementById('RDT_lblError_msgAtual').innerHTML = RDT_MSGTEXT_currentBlkSize.toUpperCase();
		RDT_ERRORMOTIVE = 'Beware: the current map is stating that it is defective, so it may close the game unexpectedly.\n\nDo you want to continue anyway?';
		RDT_CANCRASH = true;
	} else {
		$('#RDT_msgBlock_health').addClass('green');
		document.getElementById('RDT_msgBlock_health').innerHTML = 'Perfect';
		document.getElementById('RDT_msgBlock_infos').innerHTML = MSGBLOCK_PERFECT;
	}
	if (RDT_MSGTEXT_MAXSIZE === RDT_MSGTEXT_currentBlkSize){
		$('#MSG_RDT_lbl_blockUsage').addClass('green');
		$('#RDT_lbl-msg_c_blockHex').addClass('green');
		$('#RDT_lbl-msg_c_blockHex').removeClass('red');
	} else {
		$('#RDT_lbl-msg_c_blockHex').addClass('red');
		$('#RDT_lbl-msg_c_blockHex').removeClass('green');
		$('#MSG_RDT_lbl_blockUsage').removeClass('green');
	}
	document.getElementById('MSG_RDT_lbl_blockSize').innerHTML = RDT_MSGTEXT_MAXSIZE.toUpperCase();
	document.getElementById('RDT_lbl-msg_blockHex').innerHTML = '(Hex: <font class="user-can-select">' + RDT_MSGTEXT_MAXSIZE.toUpperCase() + '</font> - String: <font class="user-can-select">' + parseInt(RDT_MSGTEXT_MAXSIZE, 16) + '</font>)';
	document.getElementById('RDT_lbl-msg_c_blockHex').innerHTML = '(Hex: <font class="user-can-select">' + RDT_MSGTEXT_currentBlkSize.toUpperCase() + '</font> - String: <font class="user-can-select">' + parseInt(RDT_MSGTEXT_currentBlkSize, 16) + '</font> - ' + parsePercentage(parseInt(RDT_MSGTEXT_currentBlkSize, 16), parseInt(RDT_MSGTEXT_MAXSIZE, 16)) + '%)';
	document.getElementById('MSG_RDT_lbl_blockUsage').innerHTML = RDT_MSGTEXT_currentBlkSize.toUpperCase() + ' (' + Math.floor((parseInt(RDT_MSGTEXT_currentBlkSize, 16) / parseInt(RDT_MSGTEXT_MAXSIZE, 16)) * 100) + '%)';
}
function RDT_MSG_decryptText(useMode){
	/*
		Mode 0: Decrypt the txt and render to GUI
		Mode 1: Decrypt to see the message block size
	*/
	var c = 0;
	var HACK_FE00;
	var TXT_END = 0;
	var TXT_HEX_CROP;
	var TXT_BLOCK = '';
	var TXT_START = RDT_MSGTEXT_startText;
	var RDT_POINTERS = RDT_MSGTEXT_POINTERS.match(/.{4,4}/g).reverse();
	while (c < RDT_POINTERS.length){
		if (c !== parseInt(RDT_POINTERS.length - 1)){
			TXT_END = parseInt(TXT_START + parsePositive(parseInt(processBIO3Vars(RDT_POINTERS[c]) - processBIO3Vars(RDT_POINTERS[(c + 1)])) * 2));
			TXT_HEX_CROP = RDT_arquivoBruto.slice(TXT_START, TXT_END);
			TXT_BLOCK = TXT_BLOCK + TXT_HEX_CROP;
			TXT_START = TXT_END;
		} else {
			// Hack for the last text (Finds The FE00)
			HACK_FE00 = RDT_arquivoBruto.slice(TXT_START, RDT_arquivoBruto.length);
			TXT_END = parseInt(parseInt(getAllIndexes(HACK_FE00, 'fe')[0] + 4) + TXT_START);
			TXT_HEX_CROP = RDT_arquivoBruto.slice(TXT_START, TXT_END);
			// Climax Fix
			if (TXT_HEX_CROP.indexOf('fa00fba0') !== -1){
				TXT_END = parseInt(parseInt(getAllIndexes(HACK_FE00, 'fe')[1] + 4) + TXT_START);
				TXT_HEX_CROP = RDT_arquivoBruto.slice(TXT_START, TXT_END);
			}
			TXT_BLOCK = TXT_BLOCK + TXT_HEX_CROP;
		}
		sessionStorage.setItem('MESSAGE_HEX_' + c, TXT_HEX_CROP);
		if (useMode === 0){
			RDT_MSGTEXT_currentBlkSize = parseInt(TXT_BLOCK.length / 2).toString(16);
			RDT_MSG_renderMessages(c, TXT_HEX_CROP);
		}
		c++;
	}
	if (useMode === 1){
		sessionStorage.clear();
		return parseInt(TXT_BLOCK.length / 2).toString(16);
	}
}
function RDT_fileMap_generateFile(totalMessages, txtPointers, textStart){
	RDT_MSGTEXT_POINTERS = txtPointers;
	RDT_MSGTEXT_startText = textStart;
	var blk_size = RDT_MSG_decryptText(1);
	var mapFile_final = 'RDT MAPFILE\nGenerated with ' + APP_NAME + '\nDate: ' + currentTime() + '\nFORMAT = ' + btoa(RDT_fileType) + '\nTOT_MSG = ' +
						totalMessages + '\nPOINTERS = ' + btoa(txtPointers) + '\nTXT_START = ' + textStart + '\nBLK_SZ = ' + btoa(blk_size);
	try{
		fs.writeFileSync(RDT_fm_path, mapFile_final, 'utf-8');
		LOG_addLog('log', 'MAP - The MapFile was saved successfully!');
		LOG_addLog('log', 'MAP - Path: <font class="user-can-select">' + RDT_fm_path + '</font>');
		RDT_openFile(ORIGINAL_FILENAME);
	} catch (err){
		LOG_addLog('error', 'MAP - ERROR: Something went wrong while saving MapFile for ' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '!');
		LOG_addLog('error', 'MAP - Details: <font class="user-can-select">' + err + '</font>');
	}
}
function RDT_MSG_renderMessages(id, txtHex){
	if (RDT_fm_avaliable === true){
		var HEX_TO_TEXT = MSG_startMSGDecrypt_Lv1(txtHex);
		var RDT_MESSAGE_HTML_TEMPLATE = '<div id="RDT_MSG-' + id + '" class="RDT-Item RDT-msg-bg"><input type="button" class="botao-menu right" value="Edit Message" onclick="RDT_MSG_transferMessageToMsgEdit(' + id + ');">' + 
			'(' + parseInt(id + 1) + ') Message: <div class="RDT-message-content">' + HEX_TO_TEXT + '</div><div class="menu-separador"></div>Hex: <div class="RDT-message-content user-can-select">' + MSG_DECRYPT_LV1_LAST.toUpperCase() + '</div></div>';
		$('#RDT_MSG-holder').append(RDT_MESSAGE_HTML_TEMPLATE);
	}
}
function RDT_MSG_transferMessageToMsgEdit(msgId){
	var msg_transfer = sessionStorage.getItem('MESSAGE_HEX_' + msgId);
	if (msg_transfer !== null && msg_transfer !== undefined){
		MSG_ID = msgId;
		document.getElementById('RDT_MSG_NUMBER').innerHTML = 'Message ' + parseInt(msgId + 1) + ' - ';
		MSG_CURRENT_RDT_MESSAGE_END = parseInt(RDT_arquivoBruto.indexOf(sessionStorage.getItem('MESSAGE_HEX_' + msgId)) + sessionStorage.getItem('MESSAGE_HEX_' + msgId).length);
		MSG_CURRENT_RDT_MESSAGE_START = RDT_arquivoBruto.indexOf(sessionStorage.getItem('MESSAGE_HEX_' + msgId));
		MSG_startMSGDecrypt_Lv2(msg_transfer);
		RDT_TRANSFER_RDT_TO_MSG();
	} else {
		LOG_addLog('error', 'MAP - ERROR: Unable to read message because it was not found!');
		LOG_scroll();
	}
}
function RDT_fileMap_getPointers(pointersHex){
	if (pointersHex !== ''){
		var c = 0;
		var totalPushes = 300; // I need to find where this info are stored inside RDT / ARD!
		var FA_startPosition = RDT_arquivoBruto.indexOf(pointersHex);
		var crop_start = parseInt(FA_startPosition - 4);;
		var crop_end = FA_startPosition;
		var pointersCompiled = '';
		// Remove this hack later...
		var readMode;
		if (RDT_fileType === 'RDT'){
			readMode = 0;
		} else {
			readMode = 0;
		}
		if (RDT_fileType === 'ARD'){
			readMode = 1;
		}
		var requiredPointer = RDT_ARD_tempPointerDatabase[getFileName(ORIGINAL_FILENAME).toUpperCase()][readMode];
		//
		while(c < totalPushes){
			var crop_pointer = RDT_arquivoBruto.slice(crop_start, crop_end);
			if (crop_pointer !== requiredPointer){
				pointersCompiled = pointersCompiled + crop_pointer;
				crop_start = parseInt(crop_start - 4);
				crop_end = parseInt(crop_end - 4);
				c++;
			} else {
				RDT_fileMap_generateFile(c, pointersCompiled, FA_startPosition);
				break;
			}
		}
	}
}
function RDT_fileMap_askForSeekPattern(){
	if (RDT_fm_avaliable === false){
		var fName = getFileName(ORIGINAL_FILENAME).toUpperCase();
		var askForFirstMessage = prompt('File: ' + fName + '.' + RDT_fileType + '\nLocation: ' + RDT_locations[fName][0] + '\nCity Location: ' + RDT_locations[fName][1] + 
			'\n\nPlease insert the first message of RDT.\nIt looks like this:\n\"FA 00 XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX FE 00\"\n\"FA 01 XX ' + 
			'XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX FE 00\"\n\"FA 02 XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX XX FE 00\"');
		if (askForFirstMessage === undefined || askForFirstMessage === '' || askForFirstMessage === null){
			RDT_showMenu(1);
		} else {
			RDT_messageSeekPattern = solveHEX(askForFirstMessage);
			if (RDT_arquivoBruto.indexOf(RDT_messageSeekPattern) !== -1){
				RDT_fileMap_getPointers(RDT_messageSeekPattern);
			} else {
				LOG_addLog('warn', 'MAP - Unable to find the pattern!');
				RDT_showMenu(1);
			}
		}
	} else {
		LOG_addLog('log', 'MAP - Skipping MapFile generation - this RDT / ARD already have a map!');
		LOG_addLog('log', 'MAP - MapFile Path: <font class="user-can-select">' + RDT_fm_path + '</font>');
		RDT_showMenu(1);
	}
	LOG_scroll();
}
/*
	Item Canvas
*/
function RDT_getJillPosToApply(where){
	if (PROCESS_OBJ !== undefined && RE3_RUNNING === true){
		MEM_JS_canRender = true;
		// Item Pos
		if (where === 0){
			document.getElementById('RDT_lbl_point_x_hex').value = REALTIME_X_Pos;
			document.getElementById('RDT_lbl_point_y_hex').value = REALTIME_Y_Pos;
			document.getElementById('RDT_lbl_point_z_hex').value = REALTIME_Z_Pos;
			document.getElementById('RDT_lbl_point_r_hex').value = REALTIME_R_Pos;
			RDT_updateCanvasInfos(1);
		}
		MEM_JS_canRender = false;
	}
}
function RDT_hideCanvasTab(){
	var c = 0;
	var cItem = localStorage.getItem('RDT_Item-' + RDT_selectedPoint);
	var offset1 = cItem.slice(0, RANGES['RDT_item-0-itemXX'][0]);
	var offset2 = cItem.slice(RANGES['RDT_item-0-itemRR'][1], cItem.length);
	var X = document.getElementById('RDT_lbl_point_x_hex').value.toLowerCase();
	var Y = document.getElementById('RDT_lbl_point_y_hex').value.toLowerCase();
	var Z = document.getElementById('RDT_lbl_point_z_hex').value.toLowerCase();
	var R = document.getElementById('RDT_lbl_point_r_hex').value.toLowerCase();
	var NOVA_POS = offset1 + X + Y + Z + R + offset2;
	localStorage.setItem('RDT_Item-' + RDT_selectedPoint, NOVA_POS);
	document.getElementById('RDT-item-list').innerHTML = '';
	document.getElementById('RDT_CANVAS_0').innerHTML = '';
	var tItems = RDT_totalItens;
	RDT_totalItens = 0;
	while(c < parseInt(tItems + 1)){
		RDT_decompileItens(c, false);
		c++;
	}
	$('#RDT-aba-menu-4').css({'display': 'none'});
	$('#RDT-aba-menu-3').trigger('click');
	$('#RDT_editItemBtn_' + RDT_selectedPoint).trigger('click');
}
function RDT_selectPoint(id){
	var c = 0;
	RDT_selectedPoint = id;
	document.getElementById('RDT_lbl_selectedPoint').innerHTML = RDT_selectedPoint;
	var cItem = localStorage.getItem('RDT_Item-' + RDT_selectedPoint);
	if (cItem.slice(0, 2) === '67'){
		RDT_CURRENT_X = cItem.slice(RANGES['RDT_item-0-itemXX'][0], RANGES['RDT_item-0-itemXX'][1]);
		RDT_CURRENT_Y = cItem.slice(RANGES['RDT_item-0-itemYY'][0], RANGES['RDT_item-0-itemYY'][1]);
		RDT_CURRENT_Z = cItem.slice(RANGES['RDT_item-0-itemZZ'][0], RANGES['RDT_item-0-itemZZ'][1]);
		RDT_CURRENT_R = cItem.slice(RANGES['RDT_item-0-itemRR'][0], RANGES['RDT_item-0-itemRR'][1]);
		var itemName  = cItem.slice(RANGES['RDT_item-0-itemID'][0], RANGES['RDT_item-0-itemID'][1]);
		document.getElementById('RDT_lbl_point_x_hex').value = RDT_CURRENT_X.toUpperCase();
		document.getElementById('RDT_lbl_point_y_hex').value = RDT_CURRENT_Y.toUpperCase();
		document.getElementById('RDT_lbl_point_z_hex').value = RDT_CURRENT_Z.toUpperCase();
		document.getElementById('RDT_lbl_point_r_hex').value = RDT_CURRENT_R.toUpperCase();
		document.getElementById('RDT_lbl_px').innerHTML = processBIO3Vars(RDT_CURRENT_X);
		document.getElementById('RDT_lbl_py').innerHTML = processBIO3Vars(RDT_CURRENT_Y);
		document.getElementById('RDT_lbl_pz').innerHTML = processBIO3Vars(RDT_CURRENT_Z);
		document.getElementById('RDT_lbl_pr').innerHTML = processBIO3Vars(RDT_CURRENT_R);
		document.getElementById('RDT_slider_X').value = processBIO3Vars(RDT_CURRENT_X);
		document.getElementById('RDT_slider_Y').value = processBIO3Vars(RDT_CURRENT_Y);
		document.getElementById('RDT_slider_Z').value = processBIO3Vars(RDT_CURRENT_Z);
		document.getElementById('RDT_slider_R').value = processBIO3Vars(RDT_CURRENT_R);
		if (parseInt(itemName, 16) < 134 || parseInt(itemName, 16) > 170){
			document.getElementById('RDT_lbl_canvasItemName').innerHTML = ITEM[itemName][0];
		}
		if (parseInt(itemName, 16) > 133 && parseInt(itemName, 16) < 164){
			document.getElementById('RDT_lbl_canvasItemName').innerHTML = FILES[itemName][0];
		}
		if (parseInt(itemName, 16) > 163 && parseInt(itemName, 16) < 171){
			document.getElementById('RDT_lbl_canvasItemName').innerHTML = RDT_MAPAS[itemName][0];
		}
		while (c < 100){
			$('#RDT_ICONCANVAS_' + c).removeClass('render-item-select');
			c++;
		}
		$('#RDT_ICONCANVAS_' + RDT_selectedPoint).addClass('render-item-select');
	} else {
		document.getElementById('RDT_lbl_selectedPoint').innerHTML = '';
	}
}
function RDT_addIconToCanvas(type, id, x, y, z, r, hex){
	var tipo;
	var nome;
	if (parseInt(hex, 16) < 134 || parseInt(hex, 16) > 170){
		tipo = 'Item';
		nome = '(' + hex + ') ' + ITEM[hex][0];
	}
	if (parseInt(hex, 16) > 133 && parseInt(hex, 16) < 164){
		tipo = 'File';
		nome = '(' + hex + ') ' + FILES[hex][0];
	}
	if (parseInt(hex, 16) > 163 && parseInt(hex, 16) < 171){
		tipo = 'Map';
		nome = '(' + hex + ') ' + RDT_MAPAS[hex][0];
	}
	if (x === '' || x === undefined){
		x = '0000';
	}
	if (y === '' || y === undefined){
		y = '0000';
	}
	if (z === '' || z === undefined){
		z = '0000';
	}
	if (r === '' || r === undefined){
		r = '0000';
	}
	var HTML_ICONCANVAS_TEMPLATE = '<div class="render-item render-item-color-' + type + '" title="Type: ' + tipo + '\nName: ' + nome + 
		'\n\nOriginal Info:\nX: ' + x.toUpperCase() + ' (' + processBIO3Vars(x) + ')\nY: ' + y.toUpperCase() + ' (' + processBIO3Vars(y) + ')\nZ: ' + z.toUpperCase() + 
		' (' + processBIO3Vars(z) + ')\nR: ' + r.toUpperCase() + ' (' + processBIO3Vars(r) + ')" id="RDT_ICONCANVAS_'+ id + '">' + id +'</div>';

	var posX = parsePercentage(parseFloat(processBIO3PosNumbers(processBIO3Vars(x), 0) + 32767), 65535);
	var posY = parsePercentage(parseFloat(processBIO3PosNumbers(processBIO3Vars(y), 0) + 32767), 65535);
	//var posR = parseFloat(processBIO3PosNumbers(processBIO3Vars(r), 0) + 32767) / FATORDEGIRO;
	// Final
	$('#RDT_CANVAS_0').append(HTML_ICONCANVAS_TEMPLATE);
	$('#RDT_ICONCANVAS_' + id).css({'left': posX + '%', 'top': posY + '%'});
}
function RDT_updateCanvasInfos(mode){
	// Ranges
	if (mode === 0){
		RDT_CURRENT_X = parseDecimalToBIO3Var(document.getElementById('RDT_slider_X').value, 0);
		RDT_CURRENT_Y = parseDecimalToBIO3Var(document.getElementById('RDT_slider_Y').value, 0);
		RDT_CURRENT_Z = parseDecimalToBIO3Var(document.getElementById('RDT_slider_Z').value, 0);
		RDT_CURRENT_R = parseDecimalToBIO3Var(document.getElementById('RDT_slider_R').value, 0);
		document.getElementById('RDT_lbl_point_x_hex').value = RDT_CURRENT_X;
		document.getElementById('RDT_lbl_point_y_hex').value = RDT_CURRENT_Y;
		document.getElementById('RDT_lbl_point_z_hex').value = RDT_CURRENT_Z;
		document.getElementById('RDT_lbl_point_r_hex').value = RDT_CURRENT_R;
	}
	// Hex
	if (mode === 1){
		if (document.getElementById('RDT_lbl_point_x_hex').value === ''){
			RDT_CURRENT_X = '0000';
		}
		if (document.getElementById('RDT_lbl_point_y_hex').value === ''){
			RDT_CURRENT_Y = '0000';
		}
		if (document.getElementById('RDT_lbl_point_z_hex').value === ''){
			RDT_CURRENT_Z = '0000';
		}
		if (document.getElementById('RDT_lbl_point_r_hex').value === ''){
			RDT_CURRENT_R = '0000';
		}
		if (document.getElementById('RDT_lbl_point_x_hex').value.length === 4){
			RDT_CURRENT_X = document.getElementById('RDT_lbl_point_x_hex').value;
			document.getElementById('RDT_slider_X').value = processBIO3Vars(RDT_CURRENT_X);
		}
		if (document.getElementById('RDT_lbl_point_y_hex').value.length === 4){
			RDT_CURRENT_Y = document.getElementById('RDT_lbl_point_y_hex').value;
			document.getElementById('RDT_slider_Y').value = processBIO3Vars(RDT_CURRENT_Y);
		}
		if (document.getElementById('RDT_lbl_point_z_hex').value.length === 4){
			RDT_CURRENT_Z = document.getElementById('RDT_lbl_point_z_hex').value;
			document.getElementById('RDT_slider_Z').value = processBIO3Vars(RDT_CURRENT_Z);
		}
		if (document.getElementById('RDT_lbl_point_r_hex').value.length === 4){
			RDT_CURRENT_R = document.getElementById('RDT_lbl_point_r_hex').value;
			document.getElementById('RDT_slider_R').value = processBIO3Vars(RDT_CURRENT_R);
		}
	}
	var posX = parsePercentage(parseFloat(processBIO3PosNumbers(processBIO3Vars(RDT_CURRENT_X), 0) + 32767), 65535);
	var posY = parsePercentage(parseFloat(processBIO3PosNumbers(processBIO3Vars(RDT_CURRENT_Y), 0) + 32767), 65535);
	//var posR = parseFloat(processBIO3PosNumbers(processBIO3Vars(RDT_CURRENT_Y), 0) + 32767) / FATORDEGIRO;

	document.getElementById('RDT_lbl_px').innerHTML = processBIO3PosNumbers(processBIO3Vars(RDT_CURRENT_X) + 32767, 0);
	document.getElementById('RDT_lbl_py').innerHTML = processBIO3PosNumbers(processBIO3Vars(RDT_CURRENT_Y) + 32767, 0);
	document.getElementById('RDT_lbl_pz').innerHTML = processBIO3PosNumbers(processBIO3Vars(RDT_CURRENT_Z) + 32767, 0);
	document.getElementById('RDT_lbl_pr').innerHTML = processBIO3PosNumbers(processBIO3Vars(RDT_CURRENT_R) + 32767, 0);

	$('#RDT_ICONCANVAS_' + RDT_selectedPoint).css({'left': posX + '%', 'top': posY + '%'});
}
function RDT_posMoveDiagonal(mode){
	if (mode === 0){
		document.getElementById('RDT_slider_X').value = document.getElementById('RDT_slider_D').value;
		document.getElementById('RDT_slider_Y').value = document.getElementById('RDT_slider_D').value;
		document.getElementById('RDT_lbl_pd').innerHTML = processBIO3PosNumbers(parseInt(document.getElementById('RDT_slider_D').value) + 32767, 0);
	}
	if (mode === 1){
		var x = 65535 - document.getElementById('RDT_slider_D2').value;
		var y = 0 + document.getElementById('RDT_slider_D2').value;
		document.getElementById('RDT_slider_X').value = x;
		document.getElementById('RDT_slider_Y').value = y;
		document.getElementById('RDT_lbl_pd2').innerHTML = processBIO3PosNumbers(parseInt(document.getElementById('RDT_slider_D2').value) + 32767, 0);
	}
	RDT_updateCanvasInfos(0);
}
/*
	Backup, Restore & Write files
*/
function RDT_fileMap_backup(){
	if (RDT_fm_avaliable === true){
		var bckFile = fs.readFileSync(RDT_fm_path, 'hex');
		var newBckPath = APP_PATH + '\\Backup\\RDTMAP2\\' + getFileName(RDT_lastBackup).replace('backup', '.rdtmap2');
		try{
			fs.writeFileSync(newBckPath, bckFile, 'hex');
			LOG_separator();
			LOG_addLog('log', 'MAP - The MapFile backup was made successfully!');
			LOG_addLog('log', 'MAP - Path: <font class="user-can-select">' + newBckPath + '</font>');
		} catch (err){
			LOG_addLog('error', 'MAP - ERROR: Something went wrong during backup process!');
			LOG_addLog('error', 'MAP - Details: ' + err);
		}
	}
	LOG_scroll();
}
function RDT_Backup(){
	R3DITOR_CHECK_FILES_AND_DIRS();
	if (RDT_arquivoBruto !== undefined){
		try{
			var backup_name = getFileName(ORIGINAL_FILENAME).toUpperCase() + '-' + currentTime() + '.rdtbackup';
			fs.writeFileSync(APP_PATH + '\\Backup\\RDT\\' + backup_name, RDT_arquivoBruto, 'hex');
			LOG_addLog('log', 'MAP - INFO: The backup was made successfully! - File: ' + backup_name);
			LOG_addLog('log', 'MAP - Folder: <font class="user-can-select">' + APP_PATH + '\\Backup\\RDT\\' + backup_name + '</font>');
			RDT_lastBackup = APP_PATH + '\\Backup\\RDT\\' + backup_name;
			RDT_fileMap_backup();
			WZ_saveConfigs(true);
			$('#RDT_restoreLastBackup').css({'display': 'inline'});
		} catch (err){
			LOG_addLog('error', 'MAP - ERROR: Unable to make backup! - ' + err);
		}
	} else {
		LOG_addLog('error', 'MAP - ERROR: You can\'t make a backup if you haven\'t opened a map yet!');
	}
}
function RDT_restoreLastBackup(){
	main_closeFileList();
	if (RDT_lastBackup !== '' && fs.existsSync(RDT_lastBackup) === true){
		var loc = 'Unknown';
		var mName = getFileName(RDT_lastBackup).slice(0, getFileName(RDT_lastBackup).indexOf('-')).toUpperCase();
		if (RDT_locations[mName] !== undefined && RDT_locations[mName] !== null){
			loc = RDT_locations[mName][0];
		}
		var ask = confirm('Restore Last Backup\n\nMap: ' + mName + '\nOriginal Local Name: ' + loc + '\nPath: ' + RDT_lastBackup + '\n\nDo you want to proceed?');
		if (ask === true){
			try{
				if (RDT_fm_avaliable === true){
					fs.unlinkSync(APP_PATH + '\\Configs\\RDT\\' + mName + '_' + RDT_fileType + '.rdtmap2');
				}
				if (fs.existsSync(APP_PATH + '\\Assets\\DATA_E\\RDT\\' + mName + '.' + RDT_fileType) === true){
					fs.unlinkSync(APP_PATH + '\\Assets\\DATA_E\\RDT\\' + mName + '.' + RDT_fileType);
				}
				RDT_restoreLastBackup_1(mName);
			} catch (err){
				console.error(err);
				LOG_addLog('error', 'MAP - ERROR: Unable to delete ' + RDT_fileType + ' file!');
				LOG_addLog('error', err);
			}
		}
	} else {
		$('#RDT_restoreLastBackup').css({'display': 'none'});
		LOG_addLog('warn', 'MAP - WARN: Unable to find backup!');
		LOG_scroll();
	}
}
function RDT_restoreLastBackup_1(name){
	try{
		if (RDT_fm_avaliable === true){
			var fm_bck = fs.readFileSync(APP_PATH + '\\Backup\\RDTMAP2\\' + getFileName(RDT_lastBackup).replace('backup', '.rdtmap2'), 'utf-8');
			fs.writeFileSync(APP_PATH + '\\Configs\\RDT\\' + name + '_' + RDT_fileType + '.rdtmap2', fm_bck, 'utf-8');
		}
		var BK = fs.readFileSync(RDT_lastBackup, 'hex');
		fs.writeFileSync(APP_PATH + '\\Assets\\DATA_E\\RDT\\' + name + '.' + RDT_fileType, BK, 'hex');
		alert('File: ' + name + '.' + RDT_fileType + '\n\nThe backup was restored successfully!');
		if (ORIGINAL_FILENAME !== undefined){
			RDT_CARREGAR_ARQUIVO(APP_PATH + '\\Assets\\DATA_E\\RDT\\' + name + '.' + RDT_fileType);
		}
	} catch (err){
		LOG_addLog('error', 'MAP - ERROR: Unable to restore backup!');
		LOG_addLog('error', err);
		console.error(err);
	}
}
function RDT_COMPILE_Lv1(){
	var c = 0;
	if (ORIGINAL_FILENAME !== undefined){
		RDT_Backup();
		try{
			LOG_separator();
			var RDT_CLONE = RDT_arquivoBruto;
			// Apply Itens, Maps and Files
			while(c < RDT_ItensArray.length){
				var NEW_ITEM = localStorage.getItem('RDT_Item-' + c);
				if (NEW_ITEM.slice(0, 2) === '67'){
					var TEMP_RDT_MIN = RDT_CLONE.slice(0, RDT_ItensArray[c] - 4);
					var TEMP_RDT_MAX = RDT_CLONE.slice(parseInt(parseInt(RDT_ItensArray[c] - 4) + 52), RDT_CLONE.length);
					RDT_CLONE = TEMP_RDT_MIN + localStorage.getItem('RDT_Item-' + c) + TEMP_RDT_MAX;
				} else {
					var TEMP_RDT_MIN = RDT_CLONE.slice(0, RDT_ItensArray[c] - 4);
					var TEMP_RDT_MAX = RDT_CLONE.slice(parseInt(parseInt(RDT_ItensArray[c] - 4) + 60), RDT_CLONE.length);
					RDT_CLONE = TEMP_RDT_MIN + localStorage.getItem('RDT_Item-' + c) + TEMP_RDT_MAX;
				}
				c++;
			}
			// Generate the final file
			RDT_WRITEFILE(true, RDT_CLONE);
			RDT_arquivoBruto = RDT_CLONE;
			document.getElementById('RDT_CANVAS_0').innerHTML = '';
			LOG_addLog('log', 'MAP - INFO: Reloading File: ' + ORIGINAL_FILENAME);
			RDT_openFile(ORIGINAL_FILENAME);
			$('#RDT-aba-menu-3').trigger('click');
		} catch(err){
			LOG_addLog('error', 'MAP - ERROR: Something went wrong on save process!');
			LOG_addLog('error', err);
			console.error(err);
		}
	} else {
		LOG_addLog('error', 'MAP - ERROR: You cannot save an map if you have not opened it!');
	}
	LOG_scroll();
}
function RDT_COMPILE_Lv2(oldHex, newReplacementHex){
	if (RDT_arquivoBruto !== undefined){
		RDT_Backup();
		var RDT_MIN = RDT_arquivoBruto.slice(0, RDT_arquivoBruto.indexOf(oldHex))
		var RDT_MAX = RDT_arquivoBruto.slice(parseInt(RDT_arquivoBruto.indexOf(oldHex) + newReplacementHex.length), RDT_arquivoBruto.length);
		var NEW_RDT = RDT_MIN + newReplacementHex + RDT_MAX;
		RDT_WRITEFILE(true, NEW_RDT);
		RDT_CARREGAR_ARQUIVO(ORIGINAL_FILENAME);
	}
}
function RDT_WRITEFILE(flag, HEX){
	if (flag === true){
		try{
			fs.writeFileSync(ORIGINAL_FILENAME, HEX, 'hex');
			LOG_addLog('log', 'MAP - INFO: The file was saved successfully! - File: <font class="user-can-select">' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '.' + RDT_fileType + '</font>');
			LOG_addLog('log', 'MAP - Path: ' + ORIGINAL_FILENAME);
			LOG_separator();
			RDT_doAfterSave();
		} catch (err){
			LOG_addLog('error', 'MAP - ERROR: Something went wrong while saving!');
			LOG_addLog('error', 'MAP - Details: ' + err);
			alert('ERROR!\nSomething went wrong while saving!\n\n' + err);
		}
	}
	LOG_scroll();
}
function RDT_doAfterSave(){
	document.getElementById('RDT_audio_holder').innerHTML = '';
	RDT_totalItensGeral = undefined;
	RDT_itemIndexRAW = undefined;
	RDT_arquivoBruto = undefined;
	RDT_totalMessages = 0;
	RDT_ItensArray = [];
	RDT_totalItens = 0;
	RDT_totalFiles = 0;
	RDT_totalMapas = 0;
	RDT_editItemCancel();
	LOG_scroll();
}