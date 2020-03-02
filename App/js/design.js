/*
	R3ditor - design.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Helpa eu!
*/
var onMSG = false;
var RDT_aba_atual;
var SAVE_aba_atual;
var main_currentMenu;
var fileList_gameMode;
var RDT_totalMenus = 10;
var INI_totalMenus = 3;
var MIX_totalMenus = 7;
var MIX_currentMenu = 0;
var SAVE_totalMenus = 4;
var request_render_save;
var RE3_LIVE_RENDERTIMER;
var RE3_LIVE_prevCam = '';
var RE3_LIVE_prevRDT = '';
var SETTINGS_totalMenus = 3;
var DESIGN_ENABLE_ANIMS = false;
var R3ditor_tool_selected = false;
var R3ditor_showFirstBootMessage = true;
//
function LOG_scroll(){
	document.getElementById('log-programa').scrollTop = document.getElementById('log-programa').scrollHeight;
}
function LOG_separator(){
	LOG_addLog('log', LOG_separatorHtml);
	LOG_scroll();
}
/*
	Filelist
*/
function FILELIST_clearTextBox(){
	document.getElementById('fileList_RDT_SEARCH_TEXTBOX').value = '';
}
function FILELIST_triggerSearchBox(){
	if (main_currentMenu === 3){
		document.getElementById('fileList_RDT_SEARCH_TEXTBOX').value = document.getElementById('fileList_RDT_SEARCH_TEXTBOX').value.toUpperCase().replace('R', '');
		var searchQuery = document.getElementById('fileList_RDT_SEARCH_TEXTBOX').value.toUpperCase();
		if (searchQuery !== '' && searchQuery.length === 3){
			var searchResult = document.getElementById('RDT_file_' + fileList_gameMode + '_R' + searchQuery);
			if (searchResult !== null){
				if (fileList_gameMode === 'DATA_E'){
					document.getElementById('fileListHolder').innerHTML = '';
					$('#fileListHolder').append(searchResult);
				} else {
					document.getElementById('fileListHolder_AJ').innerHTML = '';
					$('#fileListHolder_AJ').append(searchResult);
				}
			} else {
				LOG_addLog('warn', 'INFO - Unable to find R' + searchQuery + '.RDT');
			}
			LOG_scroll();
		} else {
			if (fileList_gameMode === 'DATA_E'){
				main_renderFileList(3, 2);
			} else {
				main_renderFileList(3, 1);
			}
		}
	}
}
function main_renderFileList(id, mode){
	var c = 0;
	var gameModePath;
	if (mode === undefined || mode === null){
		gameModePath = 'DATA_E';
		$('#fileListHolder').css({'height': '440px', 'display': 'block'});
	} else {
		if (mode === 1){
			gameModePath = 'DATA_AJ';
			$('#fileList_RDT_SEARCH_TEXTBOX').css({'left': '410px', 'width': '258px'});
		}
		if (mode === 2){
			gameModePath = 'DATA_E';
			$('#fileList_RDT_SEARCH_TEXTBOX').css({'left': '406px', 'width': '262px'});
		}
	}
	// RDT Recent
	if (id === 1 && RDT_lastFileOpened !== ''){
		var mFile;
		var imgPreview;
		var originalMFile;
		var originalPFile;
		var origName = 'Unknown';
		var origCity = 'Unknown';
		var pFile = RDT_lastFileOpened;
		var RDT_name = getFileName(RDT_lastFileOpened).toUpperCase();
		if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '00.JPG') === true){
			imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '00.JPG';
		} else if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '01.JPG') === true){
			imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '01.JPG';
		} else {
			imgPreview = APP_PATH + '\\App\\img\\404.png';
		}
		if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_E.rdtmap') === true){
			mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_E.rdtmap';
		} else {
			if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_AJ.rdtmap') === true){
				mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_AJ.rdtmap';
			} else {
				mFile = 'There is no Map File for this RDT. Open it to generate!';
			}
		}
		if (RDT_locations[RDT_name] !== undefined && RDT_locations[RDT_name] !== null){
			origName = RDT_locations[RDT_name][0];
			origCity = RDT_locations[RDT_name][1];
		}
		if (mFile.length > 44 && mFile !== 'There is no map file for this RDT. Open it to generate!'){
			originalMFile = mFile;
			mFile = '...' + mFile.slice(parseInt(mFile.length / 3), mFile.length);
		}
		if (pFile.length > 44){
			originalPFile = pFile;
			pFile = '...' + pFile.slice(parseInt(pFile.length / 3), pFile.length);
		}
		pFile = pFile.replace(new RegExp('/', 'gi'), '\\');
		if (originalPFile !== undefined){
			if (originalPFile.indexOf('/') !== -1){
				originalPFile = originalPFile.replace(new RegExp('/', 'gi'), '\\');
			}
		}
		var fileList_HTML_template = '<div class="fileList_item fileList_item_color_a" style="height: 100px;" id="RDT_file_' + c + '"' + 
			' onclick="RDT_openFile(\'' + RDT_lastFileOpened.replace(new RegExp('\\\\', 'gi'), '/') + '\');"><img src="' + imgPreview +'" class="fileList_img" ' + 
			'draggable="false" style="width: 134px;"><div class="fileList_details" style="margin-top: -104px;margin-left: 138px;">File: ' + RDT_name.toUpperCase() + 
			'.RDT<br>Path: <font title="' + originalPFile + '">' + pFile +  '</font><br>Map File: <font title="' + originalMFile + '">' + mFile + '</font><br>' + 
			'<div class="menu-separador"></div>Original Local Name: ' + origName + '<br>Original City Location: ' + origCity + '<br></div></div>';
		$('#RDT_recentFile').append(fileList_HTML_template);
		$('#RDT_recentFile').css({'display': 'block', 'left': '690px', 'height': '144px', 'width': '630px', 'top': '424px', 'background-image': 'linear-gradient(to bottom, #2d2d2d, #232323)', 'border-top-left-radius': '0px', 'border-bottom-left-radius': '0px'});
	} else {
		document.getElementById('fileListHolder').innerHTML = '';
		document.getElementById('fileListHolder_AJ').innerHTML = '';
	}
	// RDT
	if (id === 3){
		fileList_gameMode = gameModePath;
		$('#fileList_aba_list').css({'display': 'inline'});
		document.getElementById('fileList_title').innerHTML = 'File List';
		if (mode !== 3){
			if (fs.existsSync(APP_PATH + '\\Assets\\' + gameModePath + '\\RDT\\') === true && fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\') === true){
				var listRDT = fs.readdirSync(APP_PATH + '\\Assets\\' + gameModePath + '\\RDT\\').filter(fn => fn.endsWith('.RDT'));
				if (listRDT.length < 1){
					listRDT = fs.readdirSync(APP_PATH + '\\Assets\\' + gameModePath + '\\RDT\\').filter(fn => fn.endsWith('.rdt'));
				}
				while(c < listRDT.length){
					var mFile;
					var gMODE;
					var imgPreview;
					var nOriginal = '';
					var origName = 'Unknown';
					var origCity = 'Unknown';
					var currentRDT = APP_PATH + '\\Assets\\' + gameModePath + '\\RDT\\' + listRDT[c];
					var RDT_name = getFileName(currentRDT).toUpperCase();
					if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '00.JPG') === true){
						imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '00.JPG';
					} else if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '01.JPG') === true){
						imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '01.JPG';
					} else {
						imgPreview = APP_PATH + '\\App\\img\\404.png';
					}
					if (gameModePath === 'DATA_AJ'){
						if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_AJ.rdtmap') === true){
							mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_AJ.rdtmap';
						} else {
							mFile = 'There is no Map File for this RDT. Open it to generate!';
						}
					} else {
						if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_E.rdtmap') === true){
							mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_E.rdtmap';
						} else {
							mFile = 'There is no Map File for this RDT. Open it to generate!';
						}
					}
					if (RDT_locations[RDT_name] !== undefined && RDT_locations[RDT_name] !== null){
						origName = RDT_locations[RDT_name][0];
						origCity = RDT_locations[RDT_name][1];
					}
					if (mFile.length > 58){
						nOriginal = mFile;
						mFile = '...' + mFile.slice(parseInt(mFile.length / 3), mFile.length);
					}
					if (gameModePath === 'DATA_E'){
						gMODE = 'Hard';
					} else {
						gMODE = 'Easy';
					}
					var fileList_HTML_template = '<div class="fileList_item fileList_item_color_a" id="RDT_file_' + gameModePath + '_' + RDT_name.toUpperCase() + '"' + 
						' onclick="RDT_openFile(\'' + currentRDT.replace(new RegExp('\\\\', 'gi'), '/') + '\');"><img src="' + imgPreview + 
						'" class="fileList_img" draggable="false"><div class="fileList_details">File: ' + RDT_name.toUpperCase() + '.RDT<br>Game Mode: ' + gMODE + 
						'<br>Map File: <font title="' + nOriginal + '">' + mFile + '</font><br><div class="menu-separador"></div>Original Local Name: ' + origName + 
						'<br>Original City Location: ' + origCity + '<br></div></div>';
					if (gameModePath === 'DATA_E'){
						$('#fileListHolder').append(fileList_HTML_template);
					}
					if (gameModePath === 'DATA_AJ'){
						$('#fileListHolder_AJ').append(fileList_HTML_template);
					}
					c++;
				}
				$('#RDT_lastThreeFiles').css({'display': 'none'});
				$('#fileList_aba_recent').removeClass('aba-select-2');
				$('#FILELIST_removeRecentFiles').css({'display': 'none'});
				$('#fileList_RDT_SEARCH_TEXTBOX').css({'display': 'inline'});
				if (gameModePath === 'DATA_E'){
					$('#fileListHolder_AJ').css({'display': 'none'});
					$('#fileList_aba_hard').addClass('aba-select-2');
					$('#fileList_aba_easy').removeClass('aba-select-2');
					$('#fileListHolder').css({'height': '440px', 'display': 'block'});
				} else {
					$('#fileListHolder').css({'display': 'none'});
					$('#fileList_aba_easy').addClass('aba-select-2');
					$('#fileList_aba_hard').removeClass('aba-select-2');
					$('#fileListHolder_AJ').css({'height': '440px', 'display': 'block'});
				}
				if (RDT_arquivoBruto !== undefined){
					$('#FILELIST_goBackBtn').css({'display': 'inline'});
				}
				$('#avaliable_fileList').css({'display': 'block', 'border-bottom-right-radius': '2px'});
			} else {
				console.warn('WARN - Unable to render FileList!');
				LOG_addLog('warn', 'WARN - Unable to render FileList!');
			}
		} else {
			var fList = [];
			FILELIST_clearTextBox();
			document.getElementById('RDT_lastThreeFiles').innerHTML = '';
			if (fs.existsSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor') !== false){
				c = 0;
				fs.readFileSync(APP_PATH + '\\Configs\\lastRDTFiles.r3ditor').toString().split('\n').forEach(function(line){ 
					fList.push(line); 
				});
				while (c < fList.length){
					var mFile;
					var gMODE;
					var imgPreview;
					var nOriginal = '';
					var origName = 'Unknown';
					var origCity = 'Unknown';
					var currentRDT = fList[c];
					var RDT_name = getFileName(fList[c]).toUpperCase();

					if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '00.JPG') === true){
						imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '00.JPG';
					} else if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '01.JPG') === true){
						imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '01.JPG';
					} else {
						imgPreview = APP_PATH + '\\App\\img\\404.png';
					}

					if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_AJ.rdtmap') === true){
						gMODE = 'Easy';
						mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_AJ.rdtmap';
					} else {
						if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_E.rdtmap') === true){
							gMODE = 'Hard';
							mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_E.rdtmap';
						} else {
							gMODE = 'Unknown';
							mFile = 'There is no Map File for this RDT. Open it to generate!';
						}
					}
					if (RDT_locations[RDT_name] !== undefined && RDT_locations[RDT_name] !== null){
						origName = RDT_locations[RDT_name][0];
						origCity = RDT_locations[RDT_name][1];
					}
					if (mFile.length > 58){
						nOriginal = mFile;
						mFile = '...' + mFile.slice(parseInt(mFile.length / 3), mFile.length);
					}
					if (RDT_name.toUpperCase() !== ''){
						var RECENT_FILE_INSIDE_HTML_TEMPLATE = '<div class="fileList_item fileList_item_color_a" id="RDT_file_' + c + '"' + 
						' onclick="RDT_openFile(\'' + currentRDT.replace(new RegExp('\\\\', 'gi'), '/') + '\');"><img src="' + imgPreview + 
						'" class="fileList_img" draggable="false"><div class="fileList_details">(' + parseInt(c + 1) + ') File: ' + RDT_name.toUpperCase() + 
						'.RDT<br>Game Mode: ' + gMODE + '<br>Map File: <font title="' + nOriginal + '">' + mFile + '</font><br><div class="menu-separador">' + 
						'</div>Original Local Name: ' + origName + '<br>Original City Location: ' + origCity + '<br></div></div>';
						$('#RDT_lastThreeFiles').append(RECENT_FILE_INSIDE_HTML_TEMPLATE);
					}
					c++;
				}
				if (RDT_arquivoBruto !== undefined){
					$('#FILELIST_removeRecentFiles').css({'display': 'inline', 'left': '486px'});
				} else {
					$('#FILELIST_removeRecentFiles').css({'display': 'inline', 'left': '550px'});
				}
			} else {
				$('#RDT_lastThreeFiles').append('<br><center><font class="update_subtitle">There is no recent files!</font></center>');
			}
			// End
			$('#fileListHolder').css({'display': 'none'});
			$('#fileListHolder_AJ').css({'display': 'none'});
			$('#fileList_aba_recent').addClass('aba-select-2');
			$('#fileList_aba_hard').removeClass('aba-select-2');
			$('#fileList_aba_easy').removeClass('aba-select-2');
			$('#fileList_aba_recent').css({'display': 'inline'});
			$('#fileList_RDT_SEARCH_TEXTBOX').css({'display': 'none'});
			$('#RDT_lastThreeFiles').css({'display': 'inline', 'height': '440px'});
			$('#avaliable_fileList').css({'display': 'block', 'border-bottom-right-radius': '2px'});
		}
	}
	// Save
	if (id === 2){
		$('#fileList_aba_list').css({'display': 'none'});
		$('#FILELIST_removeRecentFiles').css({'display': 'none'});
		$('#fileList_RDT_SEARCH_TEXTBOX').css({'display': 'none'});
		$('#fileListHolder').css({'height': '466px', 'top': '46px'});
		document.getElementById('fileList_title').innerHTML = 'Saves';
		if (fs.existsSync(APP_PATH + '\\Assets\\Save\\') === true){
			var SAV_list = fs.readdirSync(APP_PATH + '\\Assets\\Save\\').filter(fn => fn.endsWith('.SAV'));
			if (SAV_list.length < 1){
				SAV_list = fs.readdirSync(APP_PATH + '\\Assets\\Save\\').filter(fn => fn.endsWith('.sav'));
			}
			while (c < SAV_list.length){
				var currentSAV = SAV_list[c];
				var fileList_HTML_template = '<div class="fileList_item fileList_item_color_b" id="SAV_file_' + c + '"' + 
					' onclick="CARREGAR_SAVE(\'' + APP_PATH.replace(new RegExp('\\\\', 'gi'), '/') + '/Assets/Save/' + currentSAV + '\');">' + 
					'<img src="' + APP_PATH + '\\App\\img\\SAVICON.png" class="fileList_img" draggable="false"><div class="fileList_details">' + 
					'File: ' + currentSAV + ' (Mod)<div class="menu-separador"></div>Path: ' + APP_PATH.replace(new RegExp('\\\\', 'gi'), '/') + 
					'/Assets/Save/' + currentSAV + '</div>';
				$('#fileListHolder').append(fileList_HTML_template);
				c++;
			}
			c = 0;
			SAV_list = fs.readdirSync(GAME_PATH).filter(fn => fn.endsWith('.SAV'));
			if (SAV_list.length < 1){
				SAV_list = fs.readdirSync(GAME_PATH).filter(fn => fn.endsWith('.sav'));
			}
			while (c < SAV_list.length){
				var currentSAV = SAV_list[c];
				var fileList_HTML_template = '<div class="fileList_item fileList_item_color_c" id="SAV_file_' + c + '"' + 
					' onclick="CARREGAR_SAVE(\'' + GAME_PATH.replace(new RegExp('\\\\', 'gi'), '/') + currentSAV + '\');"><img src="' + APP_PATH + '\\App\\img\\SAVICON.png" class="fileList_img" ' + 
					'draggable="false"><div class="fileList_details">File: ' + currentSAV + ' (Original)<div class="menu-separador"></div>' + 
					'Path: ' + GAME_PATH.replace(new RegExp('\\\\', 'gi'), '/') + currentSAV + '</div>';
				$('#fileListHolder').append(fileList_HTML_template);
				c++;
			}
			$('#fileListHolder_AJ').css({'display': 'none'});
			$('#avaliable_fileList').css({'display': 'block', 'height': '502px'});
			$('#fileListHolder').css({'display': 'block', 'height': '450px', 'background-image': 'linear-gradient(to bottom, #292929, #151515)', 'box-shadow': '0 0 12px #222'});
		} else {
			if (enable_mod === true){
				console.warn('WARN - Unable to render FileList!');
				LOG_addLog('warn', 'WARN - Unable to render FileList!');
			}
		}
	}
	LOG_scroll();
}
function main_openFileList(){
	$('#avaliable_fileList').css({'display': 'block'});
	$('#FILELIST_goBackBtn').css({'display': 'inline'});
}
function main_closeFileList(){
	FILELIST_clearTextBox();
	if (RDT_arquivoBruto !== undefined || SAVE_arquivoBruto !== undefined || MSG_arquivoBruto !== undefined || TIM_arquivoBruto !== undefined){
		$('#avaliable_fileList').css({'display': 'none'});
		$('#FILELIST_goBackBtn').css({'display': 'none'});
	}
}
/*
	Main Functions
*/
function main_menu(anim){
	main_closeFileList();
	if (anim !== 8){
		localStorage.clear();
		sessionStorage.clear();
	}
	main_currentMenu = anim;
	RE3_LIVE_closeForm();
	if (anim === 0){ // Back
		reload();
	} else {
		R3ditor_tool_selected = true;
		$('#menu-utility-aba-3').css({'display': 'none'});
		$('#menu-utility-aba-2').css({'display': 'none'});
		$('#menu-utility-aba').css({'display': 'none'});
		$('#menu-settings').css({'display': 'none'});
		$('#menu-utility').css({'display': 'none'});
		$('#menu-topo').css({'display': 'none'});
	}
	if (anim === 1){ // Save
		$('#RE3_LIVESTATUS_openOnR3ditor').css({'display': 'none'});
		document.title = APP_NAME + ' - Save Editor (*.SAV)';
		$('#menu-topo-save').css({'display': 'block'});
		$('#SAV_slots').append(SAV_SLOT_LIST);
		main_renderFileList(2);
	}
	if (anim === 2){ // MSG
		$('#RE3_LIVESTATUS_openOnR3ditor').css({'display': 'none'});
		document.title = APP_NAME + ' - Message Editor (*.MSG)';
		$('#msg-lbl-totalCommands').html(MSG_totalComandos);
		$('#menu-topo-msg').css({'display': 'block'});
		$('#menu-topo-MOD').css({'display': 'none'});
		MSG_showMenu(1);
	}
	if (anim === 3){ // RDT
		document.title = APP_NAME + ' - RDT Editor (*.RDT, *.ARD)';
		$('#menu-topo-RDT').css({'display': 'block'});
		if (enable_mod === true){
			$('#RE3_LIVESTATUS_openOnR3ditor').css({'display': 'inline'});
			main_renderFileList(3, 2);
		} else {
			$('#avaliable_fileList').css({'display': 'none'});
		}
		$('#RDT_selectEnemyNPC').append(RDT_EDIT_ENEMYNP_SELECT);
		$('#RDT_enemyNPC-edit-PO').append(RDT_EDIT_ENEMYNP_EMDPOS);
		$('#RDT_MSGCODE-edit-display').append(RDT_EDIT_MESSAGECODE_SELECT);
		RDT_checkBKP();
		if (RDT_lastFileOpened !== ''){
			main_renderFileList(1);
		}
	}
	if (anim === 4){ // FILEGEN
		document.title = APP_NAME + ' - File Generator';
		$('#menu-topo-fileEditor').css({'display': 'block'});
		$('#FILEGEN_contents').css({'height': '434px'});
		$('#menu-FILEGEN').css({'display': 'inline'});
		$('#FILEGEN_holder').css({'height': '474px'});
		$('#FILEGEN_menu').css({'height': '484px'});
	}
	if (anim === 5){ // TIM Patcher
		document.title = APP_NAME + ' - TIM Patcher';
		if (enable_mod === true){
			$('#menu-topo-MOD').css({'display': 'none'});
		}
		$('#menu-topo-TIMPATCHER').css({'display': 'inline'});
		if (DESIGN_ENABLE_ANIMS === true){
			$('#img-logo').fadeOut({duration: 100, queue: false});
			$('#TIMPATCHER').fadeIn({duration: 200, queue: false});
		} else {
			$('#img-logo').css({'display': 'none'});
			$('#TIMPATCHER').css({'display': 'inline'});
		}
	}
	if (anim === 6){ // INI Editor
		document.title = APP_NAME + ' - INI Editor (*.INI)';
		if (PROCESS_OBJ !== undefined && RE3_RUNNING === true){
			killExternalSoftware(PROCESS_OBJ['th32ProcessID']);
		}
		if (enable_mod === true){
			$('#menu-topo-MOD').css({'display': 'none'});
		}
		$('#INI_makeNewIni').css({'display': 'inline'});
		$('#menu-topo-INI').css({'display': 'inline'});
	}
	if (anim === 7){ // Settings
		document.title = APP_NAME + ' - Settings';
		if (PROCESS_OBJ !== undefined && RE3_RUNNING === true){
			killExternalSoftware(PROCESS_OBJ['th32ProcessID']);
		}
		if (enable_mod === true){
			$('#menu-topo-MOD').css({'display': 'none'});
		}
		$('#menu-topo-settings').css({'display': 'inline'});
		SETTINGS_showMenu(1);
	}
	if (anim === 8){ // MIX Editor
		if (PROCESS_OBJ !== undefined && RE3_RUNNING === true){
			killExternalSoftware(PROCESS_OBJ['th32ProcessID']);
		}
		if (enable_mod === true){
			$('#menu-topo-MOD').css({'display': 'none'});
		}
		$('#menu-topo-mix').css({'display': 'inline'});
		MIX_showMenu(1);
	}
}
function RDT_checkBKP(){
	if (RDT_lastBackup !== '' && fs.existsSync(RDT_lastBackup) === true){
		$('#RDT_restoreLastBackup').css({'display': 'inline'});
	} else {
		$('#RDT_restoreLastBackup').css({'display': 'none'});
	}
}
/*
	Save
*/
function SAVE_applyMenuFocus(menuId){
	var i = 0;
	main_closeFileList();
	SAVE_aba_atual = menuId;
	if (GAME_PATH !== '' && GAME_PATH !== undefined){
		$('#SAV_openFileList').css({'display': 'inline'});
	}
	while(i < SAVE_totalMenus){
		$('#menu-' + i).removeClass('aba-select');
		i++;
	}
	$('#menu-' + menuId).addClass('aba-select');
	LOG_scroll();
}
function SAVE_showMenu(menuId){
	main_closeFileList();
	$('#SAV_reload').css({'display': 'inline'});
	$('#menu-topo-MOD').css({'display': 'none'});
	$('#SAV_generateSave').css({'display': 'none'});
	if (DESIGN_ENABLE_ANIMS === true){
		$('#img-logo').fadeOut({duration: 100, queue: false});
	} else {
		$('#img-logo').css({'display': 'none'});
	}
	if (SHOW_EDITONHEX === true){
		$('#SAV_openInHex').css({'display': 'inline'});
	} else {
		$('#SAV_openInHex').css({'display': 'none'});
	}
	if (request_render_save !== true){
		$('#menu-SAVE').css({'display': 'block'});
	}
	cancelShowModItem();
	if (menuId === 0){ // General
		if (request_render_save === false){
			SAV_addInfo(0, '00');
			SAV_addInfo(1, '00');
			$('#log-programa').css({'height': '54px', 'top': '656px'});
			SAVE_applyMenuFocus(1);
			$('#s-menu-general').css({'display': 'block', 'width': '74%'});
			$('#save-geral').css({'height': '550px'});
			$('#menu-info').css({'height': '560px'});
			$('#save-geral').removeClass('none');
			$('#save-carlos').addClass('none');
			$('#msg-viewer').addClass('none');
			$('#save-jill').addClass('none');
		}
		request_render_save = false;
	} else {
		$('#log-programa').css({'height': '86px', 'top': '626px'});
		$('#save-geral').css({'height': '530px'});
		$('#menu-info').css({'height': '530px'});
	}
	// JILL
	if (menuId === 1){
		SAV_addInfo(0, '00');
		SAVE_applyMenuFocus(2);
		$('#save-geral').addClass('none');
		$('#msg-viewer').addClass('none');
		$('#save-carlos').addClass('none');
		$('#save-jill').removeClass('none');
	}
	// Menu Carlos
	if (menuId === 2){
		SAV_addInfo(1, '00');
		SAVE_applyMenuFocus(3);
		$('#save-jill').addClass('none');
		$('#save-geral').addClass('none');
		$('#msg-viewer').addClass('none');
		$('#save-carlos').removeClass('none');
	}
	// Menu Opções
	if (menuId === 3){
		SAV_addInfo(1, '00');
		SAVE_applyMenuFocus(4);
		$('#save-jill').addClass('none');
		$('#save-geral').addClass('none');
		$('#save-carlos').addClass('none');
		$('#msg-viewer').removeClass('none');
		$('#o-menu-general').css({'display': 'block'});
	}
	LOG_scroll();
}
function cleanForSaveLoad(){
	var cu = 1;
	var to = 16;
	main_closeFileList();
	adjustDialogSave(40);
	$('#JILL-BOX').empty();
	$('#CARLOS-BOX').empty();
	$('#JILL-LIFESTATUS').removeClass('txt-fine');
	$('#JILL-LIFESTATUS').removeClass('txt-posion');
	$('#JILL-LIFESTATUS').removeClass('txt-danger');
	$('#CARLOS-LIFESTATUS').removeClass('txt-fine');
	$('#JILL-LIFESTATUS').removeClass('txt-caution');
	$('#CARLOS-LIFESTATUS').removeClass('txt-danger');
	$('#CARLOS-LIFESTATUS').removeClass('txt-posion');
	$('#CARLOS-LIFESTATUS').removeClass('txt-caution');
	$('#JILL-LIFESTATUS').removeClass('txt-caution-red');
	$('#CARLOS-LIFESTATUS').removeClass('txt-caution-red');
	while(cu !== to){
		$('#slt-save-' + cu).removeClass('slot-ausente');
		$('#slt-save-' + cu).removeClass('slot-presente');
		cu++;
	}
}
function showModItem(modo, person, pos, itemId){
	main_closeFileList();
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_ITEM;
	document.getElementById('lbl-exchange-item').innerHTML = ITEM[itemId][0];
	document.getElementById('btn-item-apply').onclick = function(){
		applyItem(modo, person, pos);
		cancelShowModItem(0);
	}
	SAV_showModItem();
}
function showModPerson(person){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_PERSON;
	document.getElementById('lbl-exchange-person').innerHTML = PLAYERS[person][0];
	document.getElementById('btn-item-apply').onclick = function(){
		applyPerson();
		cancelShowModItem(1);
	}
	SAV_showModItem();
}
function showModDificuldade(diff){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_DIFICULDADE;
	document.getElementById('lbl-exchange-dificuldade').innerHTML = DIFICULDADE[diff][0];
	document.getElementById('btn-item-apply').onclick = function(){
		applyDificuldade();
		cancelShowModItem(2);
	}
	SAV_showModItem();
}
function showModRoupa(roupa){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_ROUPA;
	document.getElementById('lbl-exchange-roupas').innerHTML = ROUPA[roupa][0];
	document.getElementById('btn-item-apply').onclick = function(){
		applyRoupa();
		cancelShowModItem(3);
	}
	SAV_showModItem();
}
function showModSaveCount(nSaves){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_SAVECOUNT;
	document.getElementById('lbl-exchange-savecount').innerHTML = parseInt('0x' + nSaves);
	document.getElementById('btn-item-apply').onclick = function(){
		applySaveCount();
		cancelShowModItem(4);
	}
	SAV_showModItem();
}
function showModHP(showLife){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_HP;
	document.getElementById('lbl-exchange-HP').innerHTML = processBIO3Vars(showLife);
	document.getElementById('btn-item-apply').onclick = function(){
		applyHP();
		cancelShowModItem(5);
	}
	SAV_showModItem();
}
function showModEpilogos(eps){
	adjustDialogSave(37);
	hideMenusForDialog();
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_EPILOGO;
	document.getElementById('lbl-exchange-epilogues').innerHTML = EPILOGOS[eps][0];
	document.getElementById('btn-item-apply').onclick = function(){
		applyEpil();
		cancelShowModItem(6);
	}
	SAV_showModItem();
}
function showModIGT(){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_IGT;
	document.getElementById('lbl-exchange-IGT').innerHTML = hora + ':' + minutos + ':' + segundos;
	document.getElementById('btn-item-apply').onclick = function(){
		makeHexTime();
		cancelShowModItem(7);
	}
	SAV_showModItem();
}
function showModSidepack(person){
	adjustDialogSave(40);
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_SIDEPACK;
	var pp;
	var st;
	if (person === 1){
		pp = 'Jill Valentine';
		st = SIDEPACK[jSide][0];
	} else {
		pp = 'Carlos Oliveira';
		st = SIDEPACK[cSide][0];
	}
	hideMenusForDialog();
	document.getElementById('person-sidepack').innerHTML = pp;
	document.getElementById('lbl-exchange-sidepack').innerHTML = st;
	document.getElementById('btn-item-apply').onclick = function(){
		applySidepack(person);
		cancelShowModItem(8);
	}
	SAV_showModItem();
}
function showModCurrentArma(person){
	adjustDialogSave(34);
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_ARMA;
	var pp;
	var st;
	var arma;
	if (person === 1){
		pp = 'Jill Valentine';
		arma = jArmaEquip;
	} else {
		pp = 'Carlos Oliveira';
		arma = cArmaEquip;
	}
	if (arma === '00'){
		st = 'No Weapon Equiped';
	} else {
		st = ITEM[arma][0];
	}
	hideMenusForDialog();
	document.getElementById('person-arma').innerHTML = pp;
	document.getElementById('lbl-exchange-arma').innerHTML = st;
	document.getElementById('btn-item-apply').onclick = function(){
		applyArma(person);
		cancelShowModItem(9);
	}
	SAV_showModItem();
}
function showModPoison(){
	adjustDialogSave(40);
	hideMenusForDialog();
	document.getElementById('dialog_render').innerHTML = DIALOG_SELECT_POISON;
	document.getElementById('lbl-exchange-poison').innerHTML = POISON[veneno][0];
	document.getElementById('btn-item-apply').onclick = function(){
		applyPoison();
		cancelShowModItem(10);
	}
	document.getElementById('btn-item-cancel').onclick = function(){
		cancelShowModItem(10);
	}
	SAV_showModItem();
}
function SAV_showModItem(){
	if (DESIGN_ENABLE_ANIMS === true){
		$('#menu-mod-item').fadeIn({duration: 100, queue: false});
	} else {
		$('#menu-mod-item').css({'display': 'block'});
	}
}
function cancelShowModItem(){
	main_closeFileList();
	if (GAME_PATH !== '' && GAME_PATH !== undefined){
		$('#SAV_openFileList').css({'display': 'inline'});
	}
	$('#menu-mod-item').css({'display': 'none'});
	if (SAVE_aba_atual === 1){
		$('#s-menu-general').css({'display': 'block'});
	}
	if (SAVE_aba_atual === 4){
		$('#o-menu-general').css({'display': 'block'});
	}
	$('#j_box').css({'display': 'block'});
	$('#c_box').css({'display': 'block'});
	$('#c_info').css({'display': 'block'});
	$('#j_info').css({'display': 'block'});
	$('#j_invent').css({'display': 'block'});
	$('#c_invent').css({'display': 'block'});
	$('#JILL-STATUS').css({'display': 'block'});
	$('#save-alterar').css({'display': 'block'});
	$('#CARLOS-STATUS').css({'display': 'block'});
}
function hideMenusForDialog(){
	$('#j_box').css({'display': 'none'});
	$('#j_box').css({'display': 'none'});
	$('#c_box').css({'display': 'none'});
	$('#c_info').css({'display': 'none'});
	$('#j_info').css({'display': 'none'});
	$('#j_invent').css({'display': 'none'});
	$('#c_invent').css({'display': 'none'});
	$('#JILL-STATUS').css({'display': 'none'});
	$('#save-alterar').css({'display': 'none'});
	$('#CARLOS-STATUS').css({'display': 'none'});
	$('#s-menu-general').css({'display': 'none'});
}
function adjustDialogSave(percent){
	main_closeFileList();
	$('#SAV_openFileList').css({'display': 'none'});
	$('#menu-mod-item').css({'top': percent + '%'});
}
/// About
function showAbout(){
	main_closeFileList();
	RE3_LIVE_closeForm();
	$('#menu-topo').css({'display': 'none'});
	$('#log-programa').css({'display': 'none'});
	$('#menu-utility').css({'display': 'none'});
	$('#menu-settings').css({'display': 'none'});
	$('#menu-topo-MOD').css({'display': 'none'});
	$('#menu-utility-aba').css({'display': 'none'});
	$('#menu-utility-aba-2').css({'display': 'none'});
	$('#menu-utility-aba-3').css({'display': 'none'});
	if (DESIGN_ENABLE_ANIMS === true){
		$('#r_logo').fadeIn({duration: 1500, queue: false});
		$('#img-logo').fadeOut({duration: 120, queue: false});
		$('#about-r3ditor').fadeIn({duration: 500, queue: false});
	} else {
		$('#img-logo').css({'display': 'none'});
		$('#r_logo').css({'display': 'inline'});
		$('#about-r3ditor').css({'display': 'inline'});
	}
	MISC_unblurImg();
}
// Eu preciso parar de pensar em animações assim...
function MISC_unblurImg(){
	if (DESIGN_ENABLE_ANIMS === true){
		var c = 10;
		var imgTimer = setInterval(function(){
			if (c > 0){
				c--;
				$('#r_logo').css({'filter': 'blur(' + c + 'px)'});
			} else {
				clearInterval(imgTimer);
			}
		}, 100);
	} else {
		$('#r_logo').css({'filter': 'blur(0px)'});
	}
}
/// MSG
function MSG_showMenu(id){
	LOG_scroll();
	onMSG = true;
	main_closeFileList();
	$('#img-logo').css({'display': 'none'});
	$('#menu-topo-MOD').css({'display': 'none'});
	if (SHOW_EDITONHEX === true && MSG_arquivoBruto !== undefined){
		$('#MSG_openInHex').css({'display': 'inline'});
	} else {
		$('#MSG_openInHex').css({'display': 'none'});
	}
	if (RDT_arquivoBruto == undefined && MSG_arquivoBruto !== undefined){
		$('#MSG_reload').css({'display': 'inline'});	
	} else {
		$('#MSG_reload').css({'display': 'none'});
	}
	if (id === 1){ // Inicial
		$('#menu-MSG').css({'display': 'block'});
		$('#log-programa').css({'height': '84px'});
		MSG_doTheTitleThing();
	}
}
function MSG_doTheTitleThing(){
	if (ORIGINAL_FILENAME === undefined){
		document.title = APP_NAME + ' - Message Editor / Translator';
	} else {
		document.title = APP_NAME + ' - Message Editor / Translator - File: ' + ORIGINAL_FILENAME;
	}
}
function TRANSFER_MSG_TO_RDT(){
	onMSG = false;
	main_closeFileList();
	$('#menu-MSG').css({'display': 'none'});
	$('#menu-topo-msg').css({'display': 'none'});
	$('#MSG_openInHex').css({'display': 'none'});
	$('#menu-topo-RDT').css({'display': 'block'});
	$('#btn-goback-rdt').css({'display': 'none'});
	if (enable_mod === true && EXTERNAL_APP_RUNNING === false){
		$('#menu-topo-MOD').css({'display': 'inline'});
	}
}
function cleanMSGFields(){
	MSG_clearHexTextfield();
	MSG_arquivoBruto = undefined;
	ORIGINAL_FILENAME = undefined;
	$('#MSG_saveAs').css({'display': 'none'});
	$('#MSG_applyMessageRDT').css({'display': 'none'});
	document.getElementById('text-msg-raw').innerHTML = '';
	document.getElementById('lbl-msg-length').innerHTML = '0';
}
function MSG_clearHexTextfield(){
	document.getElementById('msg-hex-toTrans').value = '';
}
function MSG_renderMSGLength(totalMsg){
	if (totalMsg === 0){
		$('#MSG_saveAs').css({'display': 'none'});
		$('#MSG_applyMessageRDT').css({'display': 'none'});
	} else {
		$('#MSG_saveAs').css({'display': 'inline'});
		if (RDT_arquivoBruto !== undefined){
			$('#MSG_applyMessageRDT').css({'display': 'inline'});
		} else {
			$('#MSG_applyMessageRDT').css({'display': 'none'});
		}
	}
}
function MSG_renderDialog(id, args, index, isMod){
	$('#msg-addcomand-confirm').css({'display': 'inline'});
	if (args === undefined){
		args = '';
	}
	if (index === undefined){
		index = MSG_totalComandos;
	}
	if (isMod === undefined){
		isMod = false;
	}
	// Cancel Form
	if (id === 0){
		$('#text-msg-events').css({'display': 'block'});
		document.getElementById('dialog-msg-render').innerHTML = ' ';
		$('#dialog-msg-addcomand').css({'display': 'none', 'height': 'auto'});
		if (MSG_totalComandos !== 0){
			$('#MSG_saveAs').css({'display': 'inline'});
		}
		if (RDT_arquivoBruto !== undefined && MSG_arquivoBruto === undefined){
			$('#MSG_applyMessageRDT').css({'display': 'inline'});
			$('#btn-goback-rdt').css({'display': 'inline'});
		}
	} else {
		$('#MSG_saveAs').css({'display': 'none'});
		$('#btn-goback-rdt').css({'display': 'none'});
		$('#text-msg-events').css({'display': 'none'});
		$('#MSG_applyMessageRDT').css({'display': 'none'});
		$('#dialog-msg-addcomand').css({'display': 'block'});
	}
	// Iniciar Mensagem
	if (id === 1){
		$('#dialog-msg-addcomand').css({'top': '192px'});
		document.getElementById('msg-addcomand-title').innerHTML = 'Start Message / Text Speed';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_START;
		document.getElementById('msg-comeco-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_STARTMSG(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Finalizar Mensagem
	if (id === 2){
		$('#dialog-msg-addcomand').css({'top': '200px'});
		document.getElementById('msg-addcomand-title').innerHTML = 'End Message';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_END;
		document.getElementById('msg-fim-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_ENDMSG(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Exibir Texto
	if (id === 3){ 
		var correcao = '';
		$('#dialog-msg-addcomand').css({'top': '48px'});
		document.getElementById('msg-addcomand-title').innerHTML = 'Show Text';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_ADDTEXT;
		if (localStorage.getItem('MSG_Mensagem-' + args) !== null){
			args = localStorage.getItem('MSG_Mensagem-' + args);
			correcao = args.replace(new RegExp('<br>', 'gi'), '\n').replace(new RegExp('Function: Climax', 'gi'), '#').replace(new RegExp('Yes / No', 'gi'), '*').replace(new RegExp('(Green Color)', 'gi'), '[').replace(new RegExp('(Line Break)', 'gi'), '@').replace(new RegExp('Pause', 'gi'), '|').replace(/[{()}]/g, '').replace(new RegExp('<code><</code>', 'gi'), '<').replace(new RegExp('<code>></code>', 'gi'), '>');
		}
		document.getElementById('msg-txt-toTrans').value = correcao;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_ADDTEXT(index, isMod);
		}
	}
	// Exibir Caracter Especial
	if (id === 4){ 
		if (args === ''){
			args = 'ea10';
		}
		$('#dialog-msg-addcomand').css({'top': '200px'});
		document.getElementById('msg-addcomand-title').innerHTML = 'Show Special Char';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_ADDCHAR;
		document.getElementById('msg-char-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_ADDCHAR(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Exibir Nome de Item
	if (id === 5){ 
		if (args === ''){
			args = '00';
		}
		$('#dialog-msg-addcomand').css({'top': '200px'});
		document.getElementById('msg-addcomand-title').innerHTML = 'Show Item Name';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_NAMEITEM;
		document.getElementById('msg-lblitem-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_SHOWITEMNAME(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Reproduzir SE
	if (id === 6){ 
		$('#dialog-msg-addcomand').css({'top': '200px'});
		document.getElementById('msg-addcomand-title').innerHTML = 'Play SE';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_EXECSE;
		document.getElementById('msg-execse-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_EXECSE(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Trocar Camera
	if (id === 7){
		if (args === ''){
			args = '00';
		}
		$('#dialog-msg-addcomand').css({'top': '200px'});
		document.getElementById('msg-addcomand-title').innerHTML = 'Change Camera';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_SHOWCAMERA;
		MSG_seekCameras();
		document.getElementById('msg-cam-id').value = args;
		document.getElementById('msg-selectCam-id').value = args;
		MSG_renderCamPreview();
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_SHOWCAMERA(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Comando desconhecido usado em R101.RDT
	if (id === 8){ 
		$('#dialog-msg-addcomand').css({'top': '200px'});
		document.getElementById('msg-addcomand-title').innerHTML = 'Unknown Function (F5)';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_FUNCTIONF5;
		document.getElementById('msg-f5-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_F5(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Trocar cor do texto
	if (id === 9){
		var splitColor;
		if (args === ''){
			splitColor = '1';
		} else {
			splitColor = args;
		}
		$('#dialog-msg-addcomand').css({'top': '200px'});
		document.getElementById('msg-addcomand-title').innerHTML = 'Change Text Color';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_TEXTCOLOR;
		document.getElementById('msg-selectColor-id').value = splitColor;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_TEXTCOLOR(index, isMod);
			MSG_renderDialog(0);
		}
	}
	// Inserir Hex Manual
	if (id === 10){
		var msgHex;
		if (localStorage.getItem('MSG_comando-' + index) !== null){
			msgHex = localStorage.getItem('MSG_comando-' + index);
		} else {
			msgHex = '';
		}
		$('#dialog-msg-addcomand').css({'top': '126px'});
		$('#msg-addcomand-confirm').css({'display': 'none'});
		document.getElementById('msg-addcomand-title').innerHTML = 'Insert / Modify Hex';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_INSERTHEX;
		document.getElementById('msg-insertHexManual').innerHTML = msgHex;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_INSERTHEXMANUAL(index, isMod);
		}
		MSG_checkHexLength();
	}
	// Selecionar Opção
	if (id === 11){
		$('#dialog-msg-addcomand').css({'top': '200px'});
		document.getElementById('msg-addcomand-title').innerHTML = 'Select Option';
		document.getElementById('dialog-msg-render').innerHTML = DIALOG_MSG_SELECTOPTION;
		document.getElementById('msg-selectOption-id').value = args;
		document.getElementById('msg-addcomand-confirm').onclick = function(){
			MSG_COMMAND_SELECTOPTION(index, isMod);
		}
	}
}
function MSG_hideTranslateInput(){
	$('#text-hex-editor').css({'display': 'none'});
	$('#MSG_addcomand-menu').css({'height': '563px'});
	$('#MSG_ADDFUNC_BTN_11').css({'display': 'inline'});
}
function MSG_showTranslateInput(){
	$('#text-hex-editor').css({'display': 'inline'});
	$('#MSG_addcomand-menu').css({'height': '350px'});
	$('#MSG_ADDFUNC_BTN_11').css({'display': 'none'});
}
function MSG_renderCamPreview(){
	if (RDT_arquivoBruto !== undefined && fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\') === true){
		var currentFile = getFileName(ORIGINAL_FILENAME).toUpperCase().slice(0, 4);
		var currentCam = document.getElementById('msg-selectCam-id').value.toUpperCase();
		var camImg = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + currentFile + currentCam + '.JPG';
		if (fs.existsSync(camImg) === true){
			document.getElementById('MSG_camPreview').src = camImg;
			document.getElementById('MSG_camPreview').title = 'Cam: ' + currentCam + '\nFile: ' + currentFile + currentCam + '.JPG';
		} else {
			LOG_addLog('warn', 'WARN - Unable to find cam preview: The img file was not found! (404)');
			LOG_scroll();
		}
	}
}
/// RDT
function RDT_showMenu(id){
	var c = 1;
	RDT_loop = 0;
	document.title = APP_NAME + ' - RDT Editor (*.RDT) - File: ' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '.RDT';
	$('#img-logo').css({'display': 'none'});
	$('#avaliable_fileList').css({'display': 'none'});
	if (RDT_lastFileOpened !== ''){
		$('#RDT_recentFile').remove();
	}
	if (enable_mod === true && RE3_RUNNING === false){
		$('#RDT_openFileList').css({'display': 'inline'});
		$('#RDT-enemyNPC-Edit').css({'height': '418px'});
		$('#RDT-camera-Edit').css({'height': '418px'});
		$('#RDT-camera-Edit').css({'height': '418px'});
		$('#RDT-canvas-hold').css({'height': '472px'});
		$('#RDT-audio-hold').css({'height': '472px'});
		$('#RDT_MSG-holder').css({'height': '430px'});
		$('#RDT_menu-' + id).css({'height': '482px'});
		$('#RDT-item-list').css({'height': '428px'});
		$('#RDT-Item-Edit').css({'height': '418px'});
		$('#RDT_BG_' + id).css({'height': '470px'});
		$('#RDT-geral').css({'height': '472px'});
		$('#RDT-msgs').css({'height': '472px'});
		$('#RDT-ifm').css({'height': '472px'});
	} else {
		$('#RDT-enemyNPC-Edit').css({'height': '458px'});
		$('#RDT_openFileList').css({'display': 'none'});
		$('#RDT-camera-Edit').css({'height': '458px'});
		$('#RDT-camera-Edit').css({'height': '458px'});
		$('#RDT-canvas-hold').css({'height': '516px'});
		$('#RDT-audio-hold').css({'height': '516px'});
		$('#RDT_MSG-holder').css({'height': '472px'});
		$('#RDT_menu-' + id).css({'height': '530px'});
		$('#menu-topo-MOD').css({'display': 'none'});
		$('#RDT-item-list').css({'height': '472px'});
		$('#RDT-Item-Edit').css({'height': '458px'});
		$('#RDT_BG_' + id).css({'height': '512px'});
		$('#RDT-geral').css({'height': '516px'});
		$('#RDT-msgs').css({'height': '516px'});
		$('#RDT-ifm').css({'height': '516px'});
	}
	while(c < RDT_totalMenus + 1){
		$('#RDT_menu-' + c).css({'display': 'none'});
		c++;
	}
	RDT_editItemCancel();
	if (RDT_totalItensGeral < 0){
		RDT_totalItensGeral = 0;
	}
	if (SHOW_EDITONHEX === true){
		$('#RDT_openInHex').css({'display': 'inline'});
	} else {
		$('#RDT_openInHex').css({'display': 'none'});
	}
	if (RDT_locations[getFileName(ORIGINAL_FILENAME).toUpperCase()] !== undefined && RDT_locations[getFileName(ORIGINAL_FILENAME).toUpperCase()] !== null){
		document.getElementById('RDT_lbl-localName').innerHTML = RDT_locations[getFileName(ORIGINAL_FILENAME).toUpperCase()][0];
		document.getElementById('RDT_lbl-localCity').innerHTML = RDT_locations[getFileName(ORIGINAL_FILENAME).toUpperCase()][1];
	} else {
		document.getElementById('RDT_lbl-localName').innerHTML = 'Unknown';
		document.getElementById('RDT_lbl-localCity').innerHTML = 'Unknown';
	}
	var RDT_stage = parseInt(getFileName(ORIGINAL_FILENAME).slice(1, 2)) - 1;
	var RDT_MSG_P = 'Undefined - This RDT don\'t have any messages!';
	if (RDT_MSG_POINTERS[0] !== undefined){
		RDT_MSG_P = RDT_MSG_POINTERS[0].toUpperCase();
	}
	RDT_checkBKP();
	if (id !== 4){
		$('#RDT-aba-menu-4').css({'display': 'none'});
	}
	$('#RDT_reload').css({'display': 'inline'});
	if (RE3_RUNNING === false && enable_mod === true){
		$('#RDT-door-Edit').css({'height': '417px'});
		$('#RDT-door-hold').css({'height': '472px'});
		$('#RDT-enemy-hold').css({'height': '472px'});
		$('#RDT-camera-hold').css({'height': '472px'});
		$('#RDT_door_holder').css({'height': '430px'});
		$('#RDT-MSGCODE-Edit').css({'height': '417px'});
		$('#RDT-msgCode-hold').css({'height': '472px'});
		$('#RDT_MSGBLOCKINFO').css({'height': '449px'});
		$('#RDT_audio_holder').css({'height': '430px'});
		$('#RDT_enemy_holder').css({'height': '430px'});
		$('#RDT_camera_holder').css({'height': '430px'});
		$('#RDT_msgCode_holder').css({'height': '430px'});
	}
	if (enable_mod === true && fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '.SLD') === true){
		document.getElementById('RDT_lbl-SLD_PRESENT').innerHTML = 'Yes';
		$('#RDT_btn_openOnRE3SLDE').removeClass('none');
	} else {
		document.getElementById('RDT_lbl-SLD_PRESENT').innerHTML = 'No';
		$('#RDT_btn_openOnRE3SLDE').addClass('none');
	}
	RDT_SLD_CANVAS_BG_CHANGE_OPACITY();
	$('#RDT_backupBtn').css({'display': 'inline'});
	document.getElementById('RDT-item-list').scrollTop = 0;
	document.getElementById('RDT_MSG-holder').scrollTop = 0;
	$('#log-programa').css({'height': '86px', 'top': '626px'});
	document.getElementById('RDT_lbl-stage').innerHTML = RDT_stage;
	document.getElementById('RDT-map-select').innerHTML = RDT_EDIT_MAP;
	document.getElementById('RDT_mapFileName').innerHTML = RDT_MAPFILE;
	document.getElementById('RDT-file-select').innerHTML = RDT_EDIT_FILE;
	document.getElementById('RDT-item-select').innerHTML = RDT_EDIT_ITEM;
	document.getElementById('RDT_lbl-msg_pointer').innerHTML = RDT_MSG_P;
	document.getElementById('RDT_lbl_totDoors').innerHTML = RDT_totalDoors;
	document.getElementById('RDT_lbl-totMsg').innerHTML = RDT_totalMessages;
	document.getElementById('RDT_lbl-totalMaps').innerHTML = RDT_totalMapas;
	document.getElementById('RDT_lbl-tCameras').innerHTML = RDT_totalCameras;
	document.getElementById('RDT_lbl-totalDoors').innerHTML = RDT_totalDoors;
	document.getElementById('RDT_lbl-totalFiles').innerHTML = RDT_totalFiles;
	document.getElementById('RDT_lbl-totalItens').innerHTML = RDT_totalItens;
	document.getElementById('RDT_lbl-totalMsg').innerHTML = RDT_totalMessages;
	document.getElementById('RDT_lbl-totalAudios').innerHTML = RDT_totalAudios;
	document.getElementById('RDT_lbl_totalAudios').innerHTML = RDT_totalAudios;
	document.getElementById('RDT-lbl-FILE_Path').innerHTML = ORIGINAL_FILENAME;
	document.getElementById('RDT_lbl-totItens').innerHTML = RDT_totalItensGeral;
	document.getElementById('RDT_lbl_totalCameras').innerHTML = RDT_totalCameras;
	document.getElementById('RDT_lbl_totalEnemy').innerHTML = RDT_enemiesArray.length;
	document.getElementById('RDT-aba-menu-6').value = 'Doors (' + RDT_totalDoors +')';
	document.getElementById('RDT_lbl-totalEnemies').innerHTML = RDT_enemiesArray.length;
	document.getElementById('RDT-aba-menu-5').value = 'Audios (' + RDT_totalAudios +')';
	document.getElementById('RDT-aba-menu-9').value = 'Cameras (' + RDT_totalCameras +')';
	document.getElementById('RDT_lbl_totalmsgCode').innerHTML = RDT_messageCodesArray.length;
	document.getElementById('RDT-aba-menu-2').value = 'Message Block (' + RDT_totalMessages + ')';
	document.getElementById('RDT-aba-menu-8').value = 'Enemies / NPC\'s (' + RDT_enemiesArray.length + ')';
	document.getElementById('RDT-aba-menu-7').value = 'Message Code (' + RDT_messageCodesArray.length + ')';
	document.getElementById('RDT-aba-menu-3').value = 'Items, Files and Maps (' + RDT_totalItensGeral + ')';
	document.getElementById('RDT-lbl-FILENAME').innerHTML = getFileName(ORIGINAL_FILENAME).toUpperCase() + '.RDT';
	document.getElementById('RDT_lbl_fSize').innerHTML = getFileSize(ORIGINAL_FILENAME, 1) + ' KB (' + getFileSize(ORIGINAL_FILENAME, 0) + ' Bytes)';
	$('#RDT_menu-' + id).css({'display': 'block'});
	$('#menu-RDT').css({'display': 'block'});
	RDT_applyMenuFocus(id);
	if (getFileName(ORIGINAL_FILENAME) === 'r212' || getFileName(ORIGINAL_FILENAME) === 'r20b' || getFileName(ORIGINAL_FILENAME) === 'r216'){
		$('#RDT-aba-menu-2').css({'display': 'none'});
	}
	RDT_Error_404();
	LOG_scroll();
}
function RDT_SLD_CANVAS_BG_CHANGE_OPACITY(){
	var newOpacity = document.getElementById('RDT_SLD_CANVAS_BG_OPACITY').value;
	$('#SLD_LAYER_CANVAS_BG').css({'opacity': newOpacity});
	if (newOpacity.toString().length === 3){
		newOpacity = newOpacity + '0';
	}
	if (newOpacity.toString() === '1'){
		newOpacity = '1.00';
	}
	document.getElementById('RDT_SLD_LBL_BG_OPACITY').innerHTML = newOpacity;
}
function RDT_showEditCamera(index, camEdit, codeHex){
	document.getElementById('RDT-lbl-CAMERA-index').innerHTML = index;
	document.getElementById('RDT-lbl-CAMERA-edit').innerHTML  = camEdit;
	document.getElementById('RDT_X1_Origin-edit').value    	  = codeHex.slice(RANGES['RDT_cam-0-cX-1'][0], RANGES['RDT_cam-0-cX-1'][1]).toUpperCase();
	document.getElementById('RDT_X2_Origin-edit').value    	  = codeHex.slice(RANGES['RDT_cam-0-cX-2'][0], RANGES['RDT_cam-0-cX-2'][1]).toUpperCase();
	document.getElementById('RDT_Y1_Origin-edit').value    	  = codeHex.slice(RANGES['RDT_cam-0-cY-1'][0], RANGES['RDT_cam-0-cY-1'][1]).toUpperCase();
	document.getElementById('RDT_Y2_Origin-edit').value    	  = codeHex.slice(RANGES['RDT_cam-0-cY-2'][0], RANGES['RDT_cam-0-cY-2'][1]).toUpperCase();
	document.getElementById('RDT_Z1_Origin-edit').value    	  = codeHex.slice(RANGES['RDT_cam-0-cZ-1'][0], RANGES['RDT_cam-0-cZ-1'][1]).toUpperCase();
	document.getElementById('RDT_Z2_Origin-edit').value    	  = codeHex.slice(RANGES['RDT_cam-0-cZ-2'][0], RANGES['RDT_cam-0-cZ-2'][1]).toUpperCase();
	document.getElementById('RDT_X1_Direction-edit').value 	  = codeHex.slice(RANGES['RDT_cam-0-nX-1'][0], RANGES['RDT_cam-0-nX-1'][1]).toUpperCase();
	document.getElementById('RDT_X2_Direction-edit').value 	  = codeHex.slice(RANGES['RDT_cam-0-nX-2'][0], RANGES['RDT_cam-0-nX-2'][1]).toUpperCase();
	document.getElementById('RDT_Y1_Direction-edit').value 	  = codeHex.slice(RANGES['RDT_cam-0-nY-1'][0], RANGES['RDT_cam-0-nY-1'][1]).toUpperCase();
	document.getElementById('RDT_Y2_Direction-edit').value 	  = codeHex.slice(RANGES['RDT_cam-0-nY-2'][0], RANGES['RDT_cam-0-nY-2'][1]).toUpperCase();
	document.getElementById('RDT_Z1_Direction-edit').value 	  = codeHex.slice(RANGES['RDT_cam-0-nZ-1'][0], RANGES['RDT_cam-0-nZ-1'][1]).toUpperCase();
	document.getElementById('RDT_Z2_Direction-edit').value 	  = codeHex.slice(RANGES['RDT_cam-0-nZ-2'][0], RANGES['RDT_cam-0-nZ-2'][1]).toUpperCase();
	document.getElementById('RDT-btn-aplicarCAMERA').onclick = function(){
		RDT_CAMERA_APPLY(index);
	}
	$('#RDT-camera-Edit').css({'display': 'inline'});
	$('#RDT_camera_holder').css({'width': '932px'});
}
function RDT_showEditMsgCode(index, codeHex){
	document.getElementById('RDT-lbl-MSGCODE-edit').innerHTML = index;
	var header = codeHex.slice(RANGES['RDT_msgCode-header'][0], RANGES['RDT_msgCode-header'][1]);
	if (header !== '64'){
		document.getElementById('RDT-lbl-MSGCODE-index').innerHTML = codeHex.slice(RANGES['RDT_msgCode-id'][0],				 RANGES['RDT_msgCode-id'][1]).toUpperCase();
		document.getElementById('RDT_MSGCODE-edit-X').value 	   = codeHex.slice(RANGES['RDT_msgCode-0-xPos'][0], 		 RANGES['RDT_msgCode-0-xPos'][1]).toUpperCase();
		document.getElementById('RDT_MSGCODE-edit-Z').value 	   = codeHex.slice(RANGES['RDT_msgCode-0-zPos'][0], 		 RANGES['RDT_msgCode-0-zPos'][1]).toUpperCase();
		document.getElementById('RDT_MSGCODE-edit-radiusX').value  = codeHex.slice(RANGES['RDT_msgCode-0-xWidthTrigger'][0], RANGES['RDT_msgCode-0-xWidthTrigger'][1]).toUpperCase();
		document.getElementById('RDT_MSGCODE-edit-radiusZ').value  = codeHex.slice(RANGES['RDT_msgCode-0-zWidthTrigger'][0], RANGES['RDT_msgCode-0-zWidthTrigger'][1]).toUpperCase();
		document.getElementById('RDT_MSGCODE-edit-special').value  = codeHex.slice(RANGES['RDT_msgCode-0-specialProp'][0], 	 RANGES['RDT_msgCode-0-specialProp'][1]).toUpperCase();
		document.getElementById('RDT_MSGCODE-edit-display').value  = codeHex.slice(RANGES['RDT_msgCode-0-readMode'][0], 	 RANGES['RDT_msgCode-0-readMode'][1]).toLowerCase();
		$('#RDT_msgCode_holder').css({'width': '802px'});
		$('#RDT-MSGCODE-Edit').css({'display': 'inline'});
		document.getElementById('RDT-btn-aplicarMSGCODE').onclick = function(){
			RDT_MSGCODE_APPLY(index);
		}
	} else {
		RDT_editItemCancel();
		var warnMSG = 'This message code contains a WIP header (64)';
		alert('INFO - Unable to edit this message code! (For now!)\n\n' + warnMSG);
		LOG_addLog('warn', 'WARN - ' + warnMSG);
	}
	LOG_scroll();
}
function RDT_showEditEnemyNPC(index, codeHex){
	var emd 													   = codeHex.slice(RANGES['RDT_enemy-type'][0], 	   RANGES['RDT_enemy-type'][1]);
	var emdName = 'EM' + emd.toUpperCase();
	document.getElementById('RDT_selectEnemyNPC').value 	 	   = emd;
	document.getElementById('RDT_lbl_enemyNPC_ID').innerHTML 	   = parseInt(index + 1);
	document.getElementById('RDT_enemyNPC-edit-X').value     	   = codeHex.slice(RANGES['RDT_enemy-xPos'][0], 	   RANGES['RDT_enemy-xPos'][1]).toUpperCase();
	document.getElementById('RDT_enemyNPC-edit-Y').value     	   = codeHex.slice(RANGES['RDT_enemy-yPos'][0], 	   RANGES['RDT_enemy-yPos'][1]).toUpperCase();
	document.getElementById('RDT_enemyNPC-edit-Z').value     	   = codeHex.slice(RANGES['RDT_enemy-zPos'][0], 	   RANGES['RDT_enemy-zPos'][1]).toUpperCase();
	document.getElementById('RDT_enemyNPC-edit-R').value     	   = codeHex.slice(RANGES['RDT_enemy-rPos'][0], 	   RANGES['RDT_enemy-rPos'][1]).toUpperCase();
	document.getElementById('RDT_enemyNPC-edit-PO').value    	   = codeHex.slice(RANGES['RDT_enemy-pose'][0], 	   RANGES['RDT_enemy-pose'][1]).toLowerCase();
	document.getElementById('RDT_enemyNPC-edit-TX').value    	   = codeHex.slice(RANGES['RDT_enemy-texture'][0], 	   RANGES['RDT_enemy-texture'][1]).toUpperCase();
	document.getElementById('RDT_enemyNPC-edit-SS').value    	   = codeHex.slice(RANGES['RDT_enemy-soundSet'][0],    RANGES['RDT_enemy-soundSet'][1]).toUpperCase();
	document.getElementById('RDT_enemyNPC-edit-EnF').value   	   = codeHex.slice(RANGES['RDT_enemy-enemyFlag'][0],   RANGES['RDT_enemy-enemyFlag'][1]).toUpperCase();
	document.getElementById('RDT_enemyNPC-edit-ExF').value   	   = codeHex.slice(RANGES['RDT_enemy-extraFlag'][0],   RANGES['RDT_enemy-extraFlag'][1]).toUpperCase();
	document.getElementById('RDT_enemyNPC-edit-EN').value    	   = codeHex.slice(RANGES['RDT_enemy-enemyNumber'][0], RANGES['RDT_enemy-enemyNumber'][1]).toUpperCase();
	document.getElementById('RDT_lbl_enemyNPC_edit_EMD').innerHTML = emdName.toUpperCase();
	document.getElementById('RDT-lbl-enemyNPC-edit').innerHTML = RDT_EMDNAME[emd][0];
	document.getElementById('RDT-btn-aplicarEnemyNPC').onclick = function(){
		RDT_ENEMYNPC_APPLY(index);
	}
	$('#RDT-enemyNPC-Edit').css({'display': 'inline'});
	$('#RDT_enemy_holder').css({'width': '780px'});
}
function RDT_showEditDoor(index, id, hex){
	var nextCam;
	var realStage;
	var roomNumber;
	var DOOR_READ_MODE;
	main_closeFileList();
	RDT_doorShowCamPreview(1);
	document.getElementById('RDT_door-edit-NC').innerHTML = '';
	document.getElementById('RDT-lbl-doorEdit-id').innerHTML  = id;
	document.getElementById('RDT-lbl-door-index').innerHTML   = index;
	// Check if header === 61 || 62
	var header = hex.slice(0, 2);
	if (header === '61'){
		DOOR_READ_MODE = 0;
	} else {
		DOOR_READ_MODE = 1;
	}
	//
	nextCam 											 	  = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextCamNumber'][0],  			    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextCamNumber'][1]);
	roomNumber 											 	  = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextRoomNumber'][0], 			    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextRoomNumber'][1]).toUpperCase();
	realStage 											 	  = parseInt(parseInt(hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextStage'][0], RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextStage'][1]), 16) + 1).toString();
	document.getElementById('RDT_door-edit-LK').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorKey'][0], 	    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorKey'][1]);
	document.getElementById('RDT_door-edit-X').value  	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorXpos'][0],	    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorXpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-Y').value  	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorZpos'][0],	    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorZpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-Z').value  	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorYpos'][0],	    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorYpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-R').value  	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorRpos'][0], 	    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorRpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-DT').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorType'][0], 	    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorType'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-NX').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextXpos'][0],    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextXpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-NY').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextYpos'][0],    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextYpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-NZ').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextZpos'][0],    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextZpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-NR').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextRpos'][0],    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextRpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-NS').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextStage'][0],   RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextStage'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-OO').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorOpenOrient'][0],  RANGES['RDT_door-' + DOOR_READ_MODE + '-doorOpenOrient'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-LF').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorLockedFlag'][0],  RANGES['RDT_door-' + DOOR_READ_MODE + '-doorLockedFlag'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-DispTxt').value	  = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorDisplayText'][0], RANGES['RDT_door-' + DOOR_READ_MODE + '-doorDisplayText'][1]).toUpperCase();
	//
	//if (DOOR_READ_MODE === 1){
	//	console.log(hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorKey'][0], RANGES['RDT_door-' + DOOR_READ_MODE + '-doorKey'][1]));
	//}
	//
	document.getElementById('RDT_lbl_door_editCam').innerHTML = nextCam.toUpperCase();
	document.getElementById('RDT_door-edit-NRN').value = roomNumber;
	RDT_renderNextRDTLbl();
	document.getElementById('RDT-btn-aplicarDoor').onclick = function(){
		RDT_DOOR_APPLY(index);
	}
	if (enable_mod === true){
		RDT_renderEditDoorCamPreview();
	}
	$('#RDT-door-Edit').css({'display': 'block'});
	$('#RDT_door_holder').css({'width': '738px'});
}
function RDT_doorValidadeInput(){
	document.getElementById('RDT_door-edit-X').value      = document.getElementById('RDT_door-edit-X').value.toUpperCase();
	document.getElementById('RDT_door-edit-Y').value      = document.getElementById('RDT_door-edit-Y').value.toUpperCase();
	document.getElementById('RDT_door-edit-Z').value      = document.getElementById('RDT_door-edit-Z').value.toUpperCase();
	document.getElementById('RDT_door-edit-R').value      = document.getElementById('RDT_door-edit-R').value.toUpperCase();
	document.getElementById('RDT_door-edit-LK').value     = document.getElementById('RDT_door-edit-LK').value.toUpperCase();
	document.getElementById('RDT_door-edit-NX').value     = document.getElementById('RDT_door-edit-NX').value.toUpperCase();
	document.getElementById('RDT_door-edit-NY').value     = document.getElementById('RDT_door-edit-NY').value.toUpperCase();
	document.getElementById('RDT_door-edit-NZ').value     = document.getElementById('RDT_door-edit-NZ').value.toUpperCase();
	document.getElementById('RDT_door-edit-NR').value     = document.getElementById('RDT_door-edit-NR').value.toUpperCase();
	document.getElementById('RDT_door-edit-DT').value     = document.getElementById('RDT_door-edit-DT').value.toUpperCase();
	document.getElementById('RDT_door-edit-NS').value     = document.getElementById('RDT_door-edit-NS').value.toUpperCase();
	document.getElementById('RDT_door-edit-OO').value     = document.getElementById('RDT_door-edit-OO').value.toUpperCase();
	document.getElementById('RDT_door-edit-LF').value     = document.getElementById('RDT_door-edit-LF').value.toUpperCase();
	document.getElementById('RDT_door-edit-NRN').value    = document.getElementById('RDT_door-edit-NRN').value.toUpperCase();
	document.getElementById('RDT_door-edit-NC-TXT').value = document.getElementById('RDT_door-edit-NC-TXT').value.toUpperCase();
}
function RDT_itemValidadeInput(){
	document.getElementById('RDT_item-edit-A').value     = document.getElementById('RDT_item-edit-A').value.toUpperCase();
	document.getElementById('RDT_item-edit-MI').value    = document.getElementById('RDT_item-edit-MI').value.toUpperCase();
	document.getElementById('RDT_item-edit-IF').value    = document.getElementById('RDT_item-edit-IF').value.toUpperCase();
	document.getElementById('RDT_item-edit-Quant').value = document.getElementById('RDT_item-edit-Quant').value.toUpperCase();
}
function RDT_enemyNPCValidateInput(){
	var emd = document.getElementById('RDT_selectEnemyNPC').value;
	var emdName = 'EM' + emd.toUpperCase();
	document.getElementById('RDT_lbl_enemyNPC_edit_EMD').innerHTML = emdName;
	document.getElementById('RDT-lbl-enemyNPC-edit').innerHTML = RDT_EMDNAME[emd];
}
function RDT_MSGBLOCKValidadeInput(){
	document.getElementById('RDT_MSGCODE-edit-X').value 	  = document.getElementById('RDT_MSGCODE-edit-X').value.toUpperCase();
	document.getElementById('RDT_MSGCODE-edit-Z').value 	  = document.getElementById('RDT_MSGCODE-edit-Z').value.toUpperCase();
	document.getElementById('RDT_MSGCODE-edit-radiusX').value = document.getElementById('RDT_MSGCODE-edit-radiusX').value.toUpperCase();
	document.getElementById('RDT_MSGCODE-edit-radiusZ').value = document.getElementById('RDT_MSGCODE-edit-radiusZ').value.toUpperCase();
	document.getElementById('RDT_MSGCODE-edit-special').value = document.getElementById('RDT_MSGCODE-edit-special').value.toUpperCase();
}
function RDT_renderNextRDTLbl(){
	var c = 0;
	var rst = parseInt(parseInt(document.getElementById('RDT_door-edit-NS').value) + 1).toString();
	var nrn = document.getElementById('RDT_door-edit-NRN').value;
	if (nrn.length === 2 && rst.length === 1){
		var rComp = 'R' + rst.toUpperCase() + nrn.toUpperCase();
		document.getElementById('RDT_lbl_door_nextRDT').innerHTML = rComp + '.RDT';
		var existsRDT = fs.existsSync(APP_PATH + '\\Assets\\DATA_E\\RDT\\' + rComp + '.RDT');
		if (existsRDT === true){
			document.getElementById('RDT_lbl_door_nextRDT').title = RDT_locations[rComp][0] + ', ' + RDT_locations[rComp][1];
		} else {
			document.getElementById('RDT_lbl_door_nextRDT').title = 'Unknown Location';
		}
		if (enable_mod === true && existsRDT === true){
			document.getElementById('RDT_door-edit-NC').innerHTML = '';
			var DOOR_CAMS_ARRAY = fs.readdirSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\').filter(fn => fn.startsWith(getFileName(rComp).toUpperCase()));
			if (DOOR_CAMS_ARRAY.length !== 0){
				while(c < DOOR_CAMS_ARRAY.length){
					if (DOOR_CAMS_ARRAY[c].indexOf('.SLD') !== -1){
						DOOR_CAMS_ARRAY.splice(c, 1);
					} else {
						var camId = DOOR_CAMS_ARRAY[c].slice(rComp.length, DOOR_CAMS_ARRAY[c].length).replace('.JPG', '');
						$('#RDT_door-edit-NC').append('<option value="' + camId.toUpperCase() + '">Cam ' + camId.toUpperCase() + '</option>');
						c++;
					}
				}
				document.getElementById('RDT_door-edit-NC').value = document.getElementById('RDT_lbl_door_editCam').innerHTML;
				$('#RDT_doorCamPreviewImg').css({'display': 'inline'});
			} else {
				document.getElementById('RDT_doorCamPreviewImg').src = APP_PATH + '/App/img/404.png';
				$('#RDT_door-edit-NC').append('<option disabled>No Cam Avaliable</option>');
			}
			RDT_renderEditDoorCamPreview();
		}
	}
}
function RDT_renderEditDoorCamPreview(){
	var rst = parseInt(parseInt(document.getElementById('RDT_door-edit-NS').value, 16) + 1).toString();
	var nrn = document.getElementById('RDT_door-edit-NRN').value;
	var rComp = 'R' + rst.toUpperCase() + nrn.toUpperCase();
	var camFile = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + rComp + document.getElementById('RDT_door-edit-NC').value.toString() + '.JPG';
	if (fs.existsSync(camFile) === true){
		document.getElementById('RDT_door-edit-NC-TXT').value = document.getElementById('RDT_door-edit-NC').value.toString();
		document.getElementById('RDT_doorCamPreviewImg').src = camFile;
	} else {
		LOG_addLog('warn', 'WARN - Unable to render Next Cam: The img file was not found! (ERROR 404 - File: ' + camFile + ')');
		document.getElementById('RDT_doorCamPreviewImg').src = APP_PATH + '/App/img/404.png';
		$('#RDT_door-edit-NC').append('<option disabled>No Cam Avaliable</option>');
		LOG_scroll();
	}
}
function RDT_cancelDoorCamEdit(){
	var pCam = document.getElementById('RDT_lbl_door_editCam').innerHTML;
	document.getElementById('RDT_door-edit-NC-TXT').value = pCam;
	document.getElementById('RDT_door-edit-NC').value = pCam;
	RDT_doorShowCamPreview(1);
}
function RDT_applyDoorCamSelect(){
	if (enable_mod === true){
		document.getElementById('RDT_lbl_door_editCam').innerHTML = document.getElementById('RDT_door-edit-NC').value;
	} else {
		document.getElementById('RDT_lbl_door_editCam').innerHTML = document.getElementById('RDT_door-edit-NC-TXT').value;
	}
	RDT_doorShowCamPreview(1);
}
function RDT_doorShowCamPreview(mode){
	if (mode === 0){
		$('#RDT_applyDoorDiv').css({'display': 'none'});
		$('#RDT-door-edit-form').css({'display': 'none'});
		$('#RDT_applyDoorCamDiv').css({'display': 'block'});
		$('#RDT_doorCamPrevewDiv').css({'display': 'block'});
	} else {
		$('#RDT_doorCamPrevewDiv').css({'display': 'none'});
		$('#RDT_applyDoorCamDiv').css({'display': 'none'});
		$('#RDT-door-edit-form').css({'display': 'block'});
		$('#RDT_applyDoorDiv').css({'display': 'block'});
	}
}
function TRANSFER_RDT_TO_MSG(){
	main_closeFileList();
	document.title = APP_NAME + ' - Transfering message...';
	$('#menu-RDT').css({'display': 'none'});
	$('#MSG_hexPrev').css({'height': '122px'});
	$('#menu-topo-MOD').css({'display': 'none'});
	$('#menu-topo-RDT').css({'display': 'none'});
	$('#RDT_openInHex').css({'display': 'none'});
	$('#MSG_openInHex').css({'display': 'none'});
	$('#menu-topo-msg').css({'display': 'block'});
	$('#MSG_textPreview').css({'height': '122px'});
	$('#RDT_MSG_NUMBER').css({'display': 'inline'});
	$('#btn-goback-rdt').css({'display': 'inline'});
	$('#MSG_RDT_BLOCKUSAGE').css({'display': 'block'});
	$('#MSG_applyMessageRDT').css({'display': 'inline'});
	document.getElementById('RDT_MSG-holder').innerHTML = ' ';
	document.getElementById('MSG_saveAs').value = 'Save as MSG';
	MSG_showMenu(1);
	MSG_hideTranslateInput();
	$('#MSG_ADDFUNC_BTN_11').css({'display': 'none'});
	LOG_scroll();
}
function RDT_BG_display(){
	if (enable_mod === true){
		var c = 0;
		var found = false;
		while (c < 9){
			if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '0' + c + '.JPG')){
				found = true;
				var d = 1;
				while(d < parseInt(RDT_totalMenus + 1)){
					$('#RDT_BG_' + d).css({'background-image': 'url(../Assets/DATA_A/BSS/' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '0' + c + '.JPG)', 'filter': 'blur(2px)', 'opacity': '1'});
					if (DESIGN_ENABLE_ANIMS === true){
						$('#RDT_BG_' + d).fadeIn({duration: 500, queue: false});
					} else {
						$('#RDT_BG_' + d).css({'display': 'block'});
					}
					d++;
				}
				break;
			} else {
				c++;
			}
		}
		if (found === false){
			var e = 1;
			while(e < parseInt(RDT_totalMenus + 1)){
				$('#RDT_BG_' + e).css({'background-image': 'url(img/404.png)', 'filter': 'blur(6px)', 'opacity': '1'});
				e++;
			}
		}
	}
}
function RDT_Error_404(){
	if (RDT_totalMessages < 1){
		$('#RDT_MSG-holder').css({'display': 'none'});
		$('#RDT-aba-menu-2').css({'display': 'none'});
	} else {
		$('#RDT_MSG-holder').css({'display': 'block'});
	}
	if (RDT_totalItensGeral < 1){
		$('#RDT-item-list').css({'display': 'none'});
		$('#RDT-aba-menu-3').css({'display': 'none'});
	} else {
		$('#RDT-item-list').css({'display': 'block'});
		$('#RDT-aba-menu-3').css({'display': 'inline'});
	}
	if (RDT_totalAudios === undefined || RDT_totalAudios < 1){
		$('#RDT-aba-menu-5').css({'display': 'none'});
	} else {
		$('#RDT-aba-menu-5').css({'display': 'inline'});
	}
	if (RDT_messageCodesArray.length === 0){
		$('#RDT-aba-menu-7').css({'display': 'none'});
	} else {
		$('#RDT-aba-menu-7').css({'display': 'inline'});
	}
	if (RDT_enemiesArray.length === 0){
		$('#RDT-aba-menu-8').css({'display': 'none'});
	} else {
		$('#RDT-aba-menu-8').css({'display': 'inline'});
	}
	if (RDT_totalDoors === 0){
		$('#RDT-aba-menu-6').css({'display': 'none'});
	} else {
		$('#RDT-aba-menu-6').css({'display': 'inline'});
	}
}
function RDT_displayItemEdit(id, idx, itemHx){
	$('#RDT_openFileList').css({'display': 'none'});
	main_closeFileList();
	var hex;
	var nome;
	var posX;
	var posY;
	var posZ;
	var posR;
	var anim;
	var quant;
	var iFlag;
	var modelId;
	//
	var header  = itemHx.slice(RANGES['RDT_item-header'][0], 			   RANGES['RDT_item-header'][1]);
	var index   = itemHx.slice(RANGES['RDT_item-itemIdetifier'][0], 	   RANGES['RDT_item-itemIdetifier'][1]);
	if (header === '67'){
		posX    = itemHx.slice(RANGES['RDT_item-0-itemXX'][0],   		   RANGES['RDT_item-0-itemXX'][1]);
		posY    = itemHx.slice(RANGES['RDT_item-0-itemYY'][0],   		   RANGES['RDT_item-0-itemYY'][1]);
		posZ    = itemHx.slice(RANGES['RDT_item-0-itemZZ'][0],   		   RANGES['RDT_item-0-itemZZ'][1]);
		posR    = itemHx.slice(RANGES['RDT_item-0-itemRR'][0],   		   RANGES['RDT_item-0-itemRR'][1]);
		hex     = itemHx.slice(RANGES['RDT_item-0-itemID'][0],   		   RANGES['RDT_item-0-itemID'][1]);
		quant   = parseInt(itemHx.slice(RANGES['RDT_item-0-itemQuant'][0], RANGES['RDT_item-0-itemQuant'][1]), 16);
		iFlag   = itemHx.slice(RANGES['RDT_item-0-itemFlag'][0], 		   RANGES['RDT_item-0-itemFlag'][1]);
		modelId = itemHx.slice(RANGES['RDT_item-0-modelID'][0],  		   RANGES['RDT_item-0-modelID'][1]);
		anim    = itemHx.slice(RANGES['RDT_item-0-itemMP'][0],   		   RANGES['RDT_item-0-itemMP'][1]);
	}
	if (header === '68'){
		posX    = '[WIP]'; //itemHx.slice(RANGES['RDT_item-1-itemXX'][0], RANGES['RDT_item-1-itemXX'][1]);
		posY    = '[WIP]'; //itemHx.slice(RANGES['RDT_item-1-itemYY'][0], RANGES['RDT_item-1-itemYY'][1]);
		posZ    = '[WIP]'; //itemHx.slice(RANGES['RDT_item-1-itemZZ'][0], RANGES['RDT_item-1-itemZZ'][1]);
		posR    = '[WIP]'; //itemHx.slice(RANGES['RDT_item-1-itemRR'][0], RANGES['RDT_item-1-itemRR'][1]);
		hex     = itemHx.slice(RANGES['RDT_item-1-itemID'][0], 				RANGES['RDT_item-1-itemID'][1]);
		quant   = parseInt(itemHx.slice(RANGES['RDT_item-1-itemQuant'][0],  RANGES['RDT_item-1-itemQuant'][1]), 16);
		iFlag   = '[WIP]';
		modelId = '[WIP]';
		anim    = itemHx.slice(RANGES['RDT_item-1-itemMP'][0], 				RANGES['RDT_item-1-itemMP'][1]);
	}
	//
	if (hex.length < 2){
		hex = '0' + hex;
	}
	if (quant > 255){
		quant = 255;
	}
	if (quant < 0){
		quant = 0;
	}
	// Item
	if (id === 1){
		nome = ITEM[hex][0];
		document.getElementById('RDT-item-select').value = hex;
		$('#RDT-item-editOtherFix').css({'top': '266px'});
		$('#RDT-edit-item-select').removeClass('none');
		$('#RDT-edit-file-select').addClass('none');
		$('#RDT-edit-map-select').addClass('none');
		$('#RDT_btnEditPos').css({'top': '174px'});
		$('#RDT-iEditOther').css({'top': '266px'});
	} else {
		$('#RDT-iEditOther').css({'top': '228px'});
		$('#RDT_btnEditPos').css({'top': '140px'});
	}
	// File
	if (id === 2){
		nome = FILES[hex][0];
		document.getElementById('RDT-file-select').value = hex;
		$('#RDT-edit-file-select').removeClass('none');
		$('#RDT-edit-item-select').addClass('none');
		$('#RDT-edit-map-select').addClass('none');
	}
	// Map
	if (id === 3){
		nome = RDT_MAPAS[hex][0];
		document.getElementById('RDT-map-select').value = hex;
		$('#RDT-edit-map-select').removeClass('none');
		$('#RDT-edit-file-select').addClass('none');
		$('#RDT-edit-item-select').addClass('none');
	}
	document.getElementById('RDT-lbl-edit-index').innerHTML = index.toUpperCase();
	document.getElementById('RDT_item-edit-X').innerHTML = posX.toUpperCase();
	document.getElementById('RDT_item-edit-Y').innerHTML = posY.toUpperCase();
	document.getElementById('RDT_item-edit-Z').innerHTML = posZ.toUpperCase();
	document.getElementById('RDT_item-edit-R').innerHTML = posR.toUpperCase();
	document.getElementById('RDT_item-edit-MI').value = modelId.toUpperCase();
	document.getElementById('RDT_lbl_item_id').innerHTML = parseInt(idx + 1);
	document.getElementById('RDT_item-edit-IF').value = iFlag.toUpperCase();
	document.getElementById('RDT_item-edit-A').value = anim.toUpperCase();
	document.getElementById('RDT-lbl-item-edit').innerHTML = nome;
	document.getElementById('RDT_item-edit-Quant').value = quant;
	document.getElementById('RDT-btn-aplicarItem').onclick = function(){
		RDT_ITEM_APPLY(idx, id, false);
	}
	document.getElementById('RDT_applyConvertItem').onclick = function(){
		RDT_ITEM_APPLY(idx, id, true);
	}
	document.getElementById('RDT_canvas_btn_apply').onclick = function(){
		RDT_hideCanvasTab();
		$('#RDT_editItemBtn_' + index).trigger('click');
	}
	$('#RDT_item_X').css({'display': 'block'});
	$('#RDT_item_Y').css({'display': 'block'});
	$('#RDT_item_Z').css({'display': 'block'});
	$('#RDT_item_R').css({'display': 'block'});
	$('#RDT-item-list').css({'width': '722px'});
	$('#RDT-Item-Edit').css({'display': 'block'});
	if (header === '68'){
		$('#RDT_btnEditPos').css({'display': 'none'});
	} else {
		$('#RDT_btnEditPos').css({'display': 'block'});
	}
}
function RDT_editItemCancel(){
	main_closeFileList();
	if (enable_mod === true){
		$('#RDT_openFileList').css({'display': 'inline'});
	}
	$('#RDT-item-list').css({'width': 'auto'});
	$('#RDT-Item-Edit').css({'display': 'none'});
	$('#RDT-door-Edit').css({'display': 'none'});
	$('#RDT_door_holder').css({'width': 'auto'});
	$('#RDT-camera-Edit').css({'display': 'none'});
	$('#RDT-MSGCODE-Edit').css({'display': 'none'});
	$('#RDT_enemy_holder').css({'width': '1288px'});
	$('#RDT_camera_holder').css({'width': '1288px'});
	$('#RDT-enemyNPC-Edit').css({'display': 'none'});
	$('#RDT_msgCode_holder').css({'width': '1288px'});
	document.getElementById('RDT_item-edit-A').value = '';
	document.getElementById('RDT_door-edit-X').value = '';
	document.getElementById('RDT_door-edit-Y').value = '';
	document.getElementById('RDT_door-edit-Z').value = '';
	document.getElementById('RDT_door-edit-R').value = '';
	document.getElementById('RDT_door-edit-NX').value = '';
	document.getElementById('RDT_door-edit-NY').value = '';
	document.getElementById('RDT_door-edit-NZ').value = '';
	document.getElementById('RDT_door-edit-NR').value = '';
	document.getElementById('RDT_door-edit-DT').value = '';
	document.getElementById('RDT_door-edit-NS').value = '';
	document.getElementById('RDT_door-edit-NC').value = '';
	document.getElementById('RDT_door-edit-LF').value = '';
	document.getElementById('RDT_door-edit-OO').value = '';
	document.getElementById('RDT_item-edit-MI').value = '';
	document.getElementById('RDT_item-edit-IF').value = '';
	document.getElementById('RDT_door-edit-NRN').value = '';
	document.getElementById('RDT_MSGCODE-edit-X').value = '';
	document.getElementById('RDT_MSGCODE-edit-Z').value = '';
	document.getElementById('RDT_item-edit-X').innerHTML = '';
	document.getElementById('RDT_item-edit-Y').innerHTML = '';
	document.getElementById('RDT_item-edit-Z').innerHTML = '';
	document.getElementById('RDT_item-edit-R').innerHTML = '';
	document.getElementById('RDT_item-edit-Quant').value = '';
	document.getElementById('RDT_enemyNPC-edit-X').value = '';
	document.getElementById('RDT_enemyNPC-edit-Y').value = '';
	document.getElementById('RDT_enemyNPC-edit-Z').value = '';
	document.getElementById('RDT_enemyNPC-edit-R').value = '';
	document.getElementById('RDT_enemyNPC-edit-PO').value = '';
	document.getElementById('RDT_enemyNPC-edit-TX').value = '';
	document.getElementById('RDT_enemyNPC-edit-SS').value = '';
	document.getElementById('RDT_enemyNPC-edit-EN').value = '';
	document.getElementById('RDT_enemyNPC-edit-EnF').value = '';
	document.getElementById('RDT_enemyNPC-edit-ExF').value = '';
	document.getElementById('RDT_MSGCODE-edit-radiusX').value = '';
	document.getElementById('RDT_MSGCODE-edit-radiusZ').value = '';
	document.getElementById('RDT_MSGCODE-edit-special').value = '';
	document.getElementById('RDT-lbl-edit-index').innerHTML = 'N/A';
	document.getElementById('RDT_MSGCODE-edit-display').value = 'ffff';
	document.getElementById('RDT-lbl-item-edit').innerHTML = 'No item select';
}
function RDT_applyMenuFocus(menuId){
	RDT_aba_atual = menuId;
	var i = 0;
	while(i < RDT_totalMenus + 1){
		$('#RDT-aba-menu-' + i).removeClass('aba-select');
		i++;
	}
	$('#RDT-aba-menu-' + menuId).addClass('aba-select');
	LOG_scroll();
}
function RDT_showCanvasTab(){
	$('#RDT-aba-menu-4').css({'display': 'inline'});
	RDT_selectPoint(RDT_selectedPoint);
	RDT_updateCanvasInfos(0);
	RDT_showMenu(4);
}
/*
	RE3 LIVE STATUS
*/
function R3ditor_enableLiveStatusButton(){
	if (MEM_JS_requreSucess === true){
		$('#TIMPatcher_LIVESTATUS').css({'display': 'inline'});
		$('#fileGen_LIVESTATUS').css({'display': 'inline'});
		$('#main_LIVESTATUS').css({'display': 'inline'});
		$('#RDT_LIVESTATUS').css({'display': 'inline'});
		$('#MSG_LIVESTATUS').css({'display': 'inline'});
		$('#SAV_LIVESTATUS').css({'display': 'inline'});
		// Another Buttons
		$('#RDT_door_usePlayerPos').css({'display': 'inline'});
		$('#RDT_useJillPos_Item').css({'display': 'inline'});
	}
}
function R3ditor_disableLiveStatusButton(){
	$('#TIMPatcher_LIVESTATUS').css({'display': 'none'});
	$('#fileGen_LIVESTATUS').css({'display': 'none'});
	$('#main_LIVESTATUS').css({'display': 'none'});
	$('#RDT_LIVESTATUS').css({'display': 'none'});
	$('#MSG_LIVESTATUS').css({'display': 'none'});
	$('#SAV_LIVESTATUS').css({'display': 'none'});
	// Another Buttons
	$('#RDT_door_usePlayerPos').css({'display': 'none'});
	$('#RDT_useJillPos_Item').css({'display': 'none'});
	RDT_enableDisableDoorUsePlayerPos(1);
}
function RDT_enableDisableDoorUsePlayerPos(mode){
	if (mode === 0){
		$('#RDT_door_edit_copyPasteOptions_div').css({'display': 'none'});
		$('#RDT_door_edit_usePlayerPos_div').css({'display': 'inline'});
	}
	if (mode === 1){
		$('#RDT_door_edit_copyPasteOptions_div').css({'display': 'inline'});
		$('#RDT_door_edit_usePlayerPos_div').css({'display': 'none'});
	}
}
function RDT_applyDoorUsePlayerPos(mode){
	if (mode === 0){
		document.getElementById('RDT_door-edit-X').value = REALTIME_X_Pos;
		document.getElementById('RDT_door-edit-Y').value = REALTIME_Z_Pos;
		document.getElementById('RDT_door-edit-Z').value = REALTIME_Y_Pos;
		document.getElementById('RDT_door-edit-R').value = REALTIME_R_Pos;
	}
	if (mode === 1){
		document.getElementById('RDT_door-edit-NX').value = REALTIME_X_Pos;
		document.getElementById('RDT_door-edit-NY').value = REALTIME_Y_Pos;
		document.getElementById('RDT_door-edit-NZ').value = REALTIME_Z_Pos;
		document.getElementById('RDT_door-edit-NR').value = REALTIME_R_Pos;
	}
	if (enable_mod === true){
		document.getElementById('RDT_door-edit-NC').value = REALTIME_CurrentCam.toUpperCase();
	} else {
		document.getElementById('RDT_door-edit-NC-TXT').vaue = REALTIME_CurrentCam.toUpperCase();
	}
	document.getElementById('RDT_lbl_door_editCam').innerHTML = REALTIME_CurrentCam.toUpperCase();
	RDT_enableDisableDoorUsePlayerPos(1);
	RDT_renderEditDoorCamPreview();
}
function RE3_LIVE_RENDER(){
	if (MEM_JS_canRender === true){
		$('#RE3_LIVESTATUS_lbl_pStatus').removeClass('txt-fine');
		$('#RE3_LIVESTATUS_lbl_pStatus').removeClass('txt-poison');
		$('#RE3_LIVESTATUS_lbl_pStatus').removeClass('txt-danger');
		$('#RE3_LIVESTATUS_lbl_pStatus').removeClass('txt-caution');
		$('#RE3_LIVESTATUS_lbl_pStatus').removeClass('txt-caution-red');
		$('#RE3_LIVESTATUS_lbl_pStatus').addClass(processBIO3HP(REALTIME_CurrentHP)[3]);
		var jpgCam = APP_PATH + '/Assets/DATA_A/BSS/' + REALTIME_CurrentRDT + REALTIME_CurrentCam + '.JPG';
		if (jpgCam !== RE3_LIVE_prevCam){
			var newTitle;
			if (fs.existsSync(jpgCam.toUpperCase()) === true){
				newTitle = 'Cam: ' + REALTIME_CurrentCam + '\nPath: ' + jpgCam.replace(new RegExp('/', 'gi'), '\\');
				document.getElementById('RE3_LIVESTATUS_currentCam_img').src = jpgCam;
				document.getElementById('RE3_LIVESTATUS_currentCam_img').title = newTitle;
			} else {
				newTitle = 'Cam not found!';
				document.getElementById('RE3_LIVESTATUS_currentCam_img').title = newTitle;
				document.getElementById('RE3_LIVESTATUS_currentCam_img').src = APP_PATH + '\\App\\img\\404.png';
			}
			// Por enquanto vai ser apenas para o modo hard
			var RDT_LIVEFILE = APP_PATH + '\\Assets\\DATA_E\\RDT\\' + REALTIME_CurrentRDT + '.RDT';
			var RDT_avaliable = fs.existsSync(RDT_LIVEFILE);
			if (RDT_avaliable === true){
				document.getElementById('RE3_LIVESTATUS_openOnR3ditor').onclick = function(){
					if (main_currentMenu === undefined){
						main_menu(3);
					}
					RDT_CARREGAR_ARQUIVO(RDT_LIVEFILE);
				}
				if (SHOW_EDITONHEX === true){
					$('#RE3_LIVESTATUS_openOnHex').css({'display': 'inline'});
					document.getElementById('RE3_LIVESTATUS_openOnHex').onclick = function(){
						openFileOnHex(RDT_LIVEFILE);
					}
				}
			} else {
				$('#RE3_LIVESTATUS_openOnHex').css({'display': 'none'});
				$('#RE3_LIVESTATUS_openOnR3ditor').css({'display': 'none'});
			}
			RE3_LIVE_prevCam = jpgCam;
			document.getElementById('RE3_LIVESTATUS_lbl_CurrentCamera').innerHTML = REALTIME_CurrentCam;
		}
		// Stage
		var cRDT = REALTIME_CurrentRDT + '.RDT';
		if (cRDT !== RE3_LIVE_prevRDT){
			document.getElementById('RE3_LIVESTATUS_lbl_CurrentRDT').innerHTML = REALTIME_CurrentRDT + '.RDT';
			document.getElementById('RE3_LIVESTATUS_lbl_CurrentRoomNumber').innerHTML = REALTIME_CurrentRoomNumber;
			document.getElementById('RE3_LIVESTATUS_lbl_CurrentRDT').title = RDT_locations[REALTIME_CurrentRDT][0];
			document.getElementById('RE3_LIVESTATUS_lbl_OriginalLocalName').innerHTML = RDT_locations[REALTIME_CurrentRDT][0];
			document.getElementById('RE3_LIVESTATUS_lbl_OriginalCityLocation').innerHTML = CIDADE[MEMORY_JS_fixVars(parseInt(REALTIME_CurrentStage - 1), 2)][1];
			RE3_LIVE_prevRDT = cRDT;
		}
		var enableInfiniteLife = document.getElementById('RE3_LIVESTATUS_CHEAT_INFHP').checked;
		if (enableInfiniteLife === true){
			RE3_LIVE_cheatInfiniteLife();
		}
		document.getElementById('RE3_LIVESTATUS_lbl_pStatus').innerHTML = processBIO3HP(REALTIME_CurrentHP)[1];
		document.getElementById('RE3_LIVESTATUS_lbl_pCurrentWeapon').innerHTML = WEAPONS[REALTIME_CurrentWeapon][0];
		document.getElementById('RE3_LIVESTATUS_lbl_pHP').innerHTML = processBIO3HP(REALTIME_CurrentHP)[0] + ' (<font class="user-can-select">' + processBIO3HP(REALTIME_CurrentHP)[2].toUpperCase() + '</font>)';
		RE3_LIVE_RENDER_INVENT();
	}
}
function RE3_LIVE_cheatInfiniteLifeTrigger(){
	$('#RE3_LIVESTATUS_CHEAT_INFHP').trigger('click');
}
function RE3_LIVE_showHideStageOptions(mode){
	if (mode === 0){
		$('#RE3_LIVESTATUS_STAGE_DIV').css({'display': 'none'});
		$('#RE3_LIVESTATUS_currentCam_img').css({'width': '324px'});
		$('#RE3_LIVESTATUS_stageOptionsBtn').css({'display': 'none'});
		$('#RE3_LIVESTATUS_STAGE_OPTIONS_DIV').css({'display': 'block'});
	} else {
		$('#RE3_LIVESTATUS_STAGE_DIV').css({'display': 'inline'});
		$('#RE3_LIVESTATUS_currentCam_img').css({'width': '266px'});
		$('#RE3_LIVESTATUS_stageOptionsBtn').css({'display': 'inline'});
		$('#RE3_LIVESTATUS_STAGE_OPTIONS_DIV').css({'display': 'none'});
		RE3_LIVE_showEditXYZR(1);
	}
}
function RE3_LIVE_showEditXYZR(mode){
	if (TEMP_X_Pos !== undefined){
		$('#RE3_LIVESTATUS_stageOptions_pastePos').css({'display': 'inline'});
	} else {
		$('#RE3_LIVESTATUS_stageOptions_pastePos').css({'display': 'none'});
	}
	if (mode === 0){
		$('#RE3_LIVESTATUS_XYZR_div').css({'display': 'none'});
		$('#RE3_LIVESTATUS_editXYZR_Btn').css({'display': 'none'});
		$('#RE3_LIVESTATUS_currentCam_img').css({'width': '264px'});
		$('#RE3_LIVESTATUS_copyCurrentLocation').css({'display': 'none'});
		//
		document.getElementById('RE3_LIVESTATUS_edit_X').value = REALTIME_X_Pos;
		document.getElementById('RE3_LIVESTATUS_edit_Y').value = REALTIME_Y_Pos;
		document.getElementById('RE3_LIVESTATUS_edit_Z').value = REALTIME_Z_Pos;
		document.getElementById('RE3_LIVESTATUS_edit_R').value = REALTIME_R_Pos;
		//
		$('#RE3_LIVESTATUS_edit_XYZR_div').css({'display': 'inline'});
		$('#RE3_LIVESTATUS_stageOptions_applyBtn').css({'display': 'inline'});
		document.getElementById('RE3_LIVESTATUS_stageOptions_applyBtn').onclick = function(){
			RE3_LIVE_APPLY_PLAYER_POS();
		}
	} else {
		$('#RE3_LIVESTATUS_XYZR_div').css({'display': 'inline'});
		$('#RE3_LIVESTATUS_edit_XYZR_div').css({'display': 'none'});
		$('#RE3_LIVESTATUS_editXYZR_Btn').css({'display': 'inline'});
		$('#RE3_LIVESTATUS_copyCurrentLocation').css({'display': 'inline'});
		$('#RE3_LIVESTATUS_stageOptions_applyBtn').css({'display': 'none'});
	}
}
// Inventory
function RE3_LIVE_EDITINVENTSLOT(slotID){
	if (slotID > 10){
		slotID = 10;
	}
	if (slotID < 1){
		slotID = 1;
	}
	document.getElementById('RE3_LIVESTATUS_inernalTab_editSlot').value = 'Edit Slot ' + slotID;
	document.getElementById('RE3_LIVESTATUS_CHANGE_ITEM_HEX').value =  localStorage.getItem('REALTIME_INVENT_SLOT_' + slotID).slice(0, 2).toLowerCase();
	document.getElementById('RE3_LIVESTATUS_CHANGE_ITEM_ATTR').value = localStorage.getItem('REALTIME_INVENT_SLOT_' + slotID).slice(4, 6).toLowerCase();
	document.getElementById('RE3_LIVESTATUS_CHANGE_ITEM_QNT').value =  parseInt(localStorage.getItem('REALTIME_INVENT_SLOT_' + slotID).slice(2, 4).toLowerCase(), 16);
	document.getElementById('RE3_LIVESTATUS_CHANGE_ITEM_APPLY').onclick = function(){
		RE3_LIVE_APPLYITEM(slotID);
	}
	$('#RE3_LIVESTATUS_inernalTab_editSlot').css({'display': 'inline'});
	$('#RE3_LIVESTATUS_editItemSlot_window').css({'display': 'inline'});
}
function RE3_LIVE_RENDER_INVENT(){
	var c = 1;
	var current_inent = '';
	while(c < 11){
		current_inent = current_inent + localStorage.getItem('REALTIME_INVENT_SLOT_' + c);
		c++;
	}
	if (current_inent !== PREV_INVENT){
		c = 1;
		while(c < 11){
			var item = localStorage.getItem('REALTIME_INVENT_SLOT_' + c).slice(0, 2);
			var quan = localStorage.getItem('REALTIME_INVENT_SLOT_' + c).slice(2, 4);
			var attr = localStorage.getItem('REALTIME_INVENT_SLOT_' + c).slice(4, 6);
			RE3_LIVE_RENDER_SLOT(c, item, quan, attr);
			c++;
		}
		PREV_INVENT = current_inent;
	}
}
function RE3_LIVE_RENDER_SLOT(n, itemHx, quan, atribu){
	var itemHex = itemHx.toLowerCase();
	var attr = '0' + atribu.slice(1, 2).toLowerCase();
	var slotID = parseInt(n);
	if (slotID > 10){
		slotID = 10;
	}
	if (slotID < 1){
		slotID = 1;
	}
	if (ITEM[itemHex] !== undefined){
		$('#RE3_LIVESTATUS_INVENT_SLOT_' + n).css({'display': 'none'});
		var clipPath   = ITEM[itemHex][9];
		var leftoffset = ITEM[itemHex][10];
		var spriteId   = ITEM[itemHex][11];
		var itemTitle  = ITEM[itemHex][0] + '\nClick to edit this slot';
		if (n === 2 || n === 4 || n === 6 || n === 8 || n === 10){
			leftoffset = parseInt(leftoffset) + 42;
		}
		if (itemHex === '00' && quan === '00' && attr === '00'){
			itemTitle = '';
			$('#RE3_LIVESTATUS_LBL_ITEM-' + n).css({'display': 'none'});
		} else {
			if (ITEM[itemHex][12] === false){
				$('#RE3_LIVESTATUS_LBL_ITEM-' + n).css({'display': 'none'});
			} else {
				var cor;
				var shad;
				var remaining = parseInt(quan, 16);
				if (ATTR[attr] !== undefined){
					cor = ATTR[attr][1];
 					shad = ATTR[attr][2];
				} else {
					var msg = 'Inventory - The item on slot ' + n + ' have an unknown Attr! (Attr: ' + attr + ')';
					LOG_addLog('warn', 'WARN - ' + msg);
				}
				if (attr === '02' || attr === '06' || attr === '0a' || attr === '0e'){
					remaining = parseInt(quan, 16) + '%';
				}
				if (attr === '03' || attr === '07' || attr === '0b' || attr === '0f' || attr === '13' || attr === '17'){
					remaining = 'Inf.';
				}
				document.getElementById('RE3_LIVESTATUS_LBL_ITEM-' + n).innerHTML = remaining;
				$('#RE3_LIVESTATUS_LBL_ITEM-' + n).css({'display': 'inline', 'color': cor, 'text-shadow': shad});
			}
		}
		document.getElementById('RE3_LIVESTATUS_INVENT_SLOT_' + n).title = itemTitle;
		document.getElementById('RE3_LIVESTATUS_INVENT_SLOT_' + n).src = APP_PATH + '\\App\\Img\\items\\' + itemHex + '.png';
		$('#RE3_LIVESTATUS_INVENT_SLOT_' + n).css({'display': 'inline'});
	}
	LOG_scroll();
}
function RE3_LIVE_enableDisableToolBar(mode){
	if (PROCESS_OBJ !== undefined && REALTIME_renderToolbar === true && mode === 0){
		$('#RDT_LIVESTATUS_toolBar').css({'display': 'inline'});
	} else {
		$('#RDT_LIVESTATUS_toolBar').css({'display': 'none'});
	}
}
function RE3_LIVE_RENDER_POSITIONS(){
	if (REALTIME_renderToolbar === true){
		document.getElementById('RDT_LIVESTATUS_toolBar_X').innerHTML = REALTIME_X_Pos;
		document.getElementById('RDT_LIVESTATUS_toolBar_Y').innerHTML = REALTIME_Y_Pos;
		document.getElementById('RDT_LIVESTATUS_toolBar_Z').innerHTML = REALTIME_Z_Pos;
		document.getElementById('RDT_LIVESTATUS_toolBar_R').innerHTML = REALTIME_R_Pos;
		document.getElementById('RDT_LIVESTATUS_toolBar_CAM').innerHTML = REALTIME_CurrentCam;
	}
	document.getElementById('RE3_LIVESTATUS_lbl_CurrentStage').innerHTML = REALTIME_CurrentStage;
	document.getElementById('RE3_LIVESTATUS_lbl_Current_X_PositionHex').innerHTML = REALTIME_X_Pos;
	document.getElementById('RE3_LIVESTATUS_lbl_Current_Y_PositionHex').innerHTML = REALTIME_Y_Pos;
	document.getElementById('RE3_LIVESTATUS_lbl_Current_Z_PositionHex').innerHTML = REALTIME_Z_Pos;
	document.getElementById('RE3_LIVESTATUS_lbl_Current_R_PositionHex').innerHTML = REALTIME_R_Pos;
	document.getElementById('RE3_LIVESTATUS_lbl_Current_X_PositionDecimal').innerHTML = processBIO3PosNumbers(processBIO3Vars(REALTIME_X_Pos), 0);
	document.getElementById('RE3_LIVESTATUS_lbl_Current_Y_PositionDecimal').innerHTML = processBIO3PosNumbers(processBIO3Vars(REALTIME_Y_Pos), 0);
	document.getElementById('RE3_LIVESTATUS_lbl_Current_Z_PositionDecimal').innerHTML = processBIO3PosNumbers(processBIO3Vars(REALTIME_Z_Pos), 0);
	document.getElementById('RE3_LIVESTATUS_lbl_Current_R_PositionDecimal').innerHTML = processBIO3PosNumbers(processBIO3Vars(REALTIME_R_Pos), 0);
}
// MINI_MAP
var ACRESIMO = 10;
var FATORDEGIRO = 11.1;
function RE3_LIVE_CANVAS_RENDER(){
	var X = parsePercentage(parseFloat(processBIO3PosNumbers(processBIO3Vars(REALTIME_X_Pos), 0) + 32767), 65535);
	var Y = parsePercentage(parseFloat(processBIO3PosNumbers(processBIO3Vars(REALTIME_Y_Pos), 0) + 32767), 65535);
	var R = parseFloat(processBIO3PosNumbers(processBIO3Vars(REALTIME_R_Pos), 0) + 32767) / FATORDEGIRO;
	$('#RE3_LIVESTATUS_CANVAS_POINTER').css({'top': X + '%', 'left': Y + '%', 'transform': 'rotate(' + parseInt(R + ACRESIMO) + 'deg)'});
}
/*
	INI Editor
*/
function INI_showMenu(menuId){
	// Fix CSS and show Form
	var c = 0;
	document.title = APP_NAME + ' - INI Editor (*.INI) - File: ' + ORIGINAL_FILENAME;
	while (c < parseInt(INI_totalMenus + 1)){
		$('#INI-aba-menu-' + c).removeClass('aba-select');
		$('#INI_menu_' + c).css({'display': 'none'});
		c++;
	}
	$('#INI_makeNewIni').css({'display': 'none'});
	$('#INI_applyBtn').css({'display': 'inline'});
	$('#INI_reloadFile').css({'display': 'inline'});
	$('#INI_applyBtn_ask').css({'display': 'inline'});
	$('#INI_openOnNotepad').css({'display': 'inline'});
	$('#INI-aba-menu-' + menuId).addClass('aba-select');
	$('#INI_content_' + menuId).css({'height': '514px'});
	$('#INI_menu_' + menuId).css({'display': 'block', 'height': '524px'});
	//
	$('#menu-INI').css({'display': 'inline'});
}
/*
	Mix Editor
*/
function MIX_clearHolders(){
	var c = 1;
	while(c < parseInt(MIX_totalMenus + 1)){
		document.getElementById('MIX-holder-' + c).innerHTML = '';
		c++;
	}
}
function MIX_showMenu(menuId){
	var c = 0;
	MIX_currentMenu = menuId;
	while (c < (MIX_totalMenus + 1)){
		$('#MIX-MENU-' + c).css({'display': 'none'});
		$('#MIX-aba-menu-' + c).removeClass('aba-select');
		c++;
	}
	MIX_showEdit(1);
	MIX_updateMainTabsTitle();
	$('#MIX-MENU-' + menuId).css({'display': 'block'});
	$('#MIX-aba-menu-' + menuId).addClass('aba-select');
	$('#menu-mix-editor').css({'display': 'block'});
	$('#log-programa').css({'top': '626px', 'height': '82px'});
	if (MIX_SLUS_MODE === false){
		document.title = APP_NAME + ' - MIX Editor (EXE Mode) - File: ' + ORIGINAL_FILENAME;
	} else {
		document.title = APP_NAME + ' - MIX Editor (SLUS Mode) - File: ' + ORIGINAL_FILENAME;
	}
}
function MIX_updateMainTabsTitle(){
	document.getElementById('MIX_LBL_TOTAL-1').innerHTML = parseInt(MIX_TOTAL_00);
	document.getElementById('MIX_LBL_TOTAL-2').innerHTML = parseInt(MIX_TOTAL_01);
	document.getElementById('MIX_LBL_TOTAL-3').innerHTML = parseInt(MIX_TOTAL_02);
	document.getElementById('MIX_LBL_TOTAL-4').innerHTML = parseInt(MIX_TOTAL_03);
	document.getElementById('MIX_LBL_TOTAL-5').innerHTML = parseInt(MIX_TOTAL_04);
	document.getElementById('MIX_LBL_TOTAL-6').innerHTML = parseInt(MIX_TOTAL_05);
	document.getElementById('MIX_LBL_TOTAL-7').innerHTML = parseInt(MIX_TOTAL_06);
	document.getElementById('MIX-aba-menu-1').value = '(' + MIX_TOTAL_00 + ') Reload / Sum';
	document.getElementById('MIX-aba-menu-2').value = '(' + MIX_TOTAL_01 + ') Combine';
	document.getElementById('MIX-aba-menu-3').value = '(' + MIX_TOTAL_02 + ') Reloading Tool';
	document.getElementById('MIX-aba-menu-4').value = '(' + MIX_TOTAL_03 + ') C. Bullet Type (H.G. / Mag)';
	document.getElementById('MIX-aba-menu-5').value = '(' + MIX_TOTAL_04 + ') C. Bullet Type (G. Rounds)';
	document.getElementById('MIX-aba-menu-6').value = '(' + MIX_TOTAL_05 + ') Gun Powder + G. Rounds';
	document.getElementById('MIX-aba-menu-7').value = '(' + MIX_TOTAL_06 + ') Infinite Ammo';
	document.getElementById('MIX-aba-menu-1').title = 'Reload / Sum - Total Combinations: ' + MIX_TOTAL_00;
	document.getElementById('MIX-aba-menu-2').title = 'Combine - Total Combinations: ' + MIX_TOTAL_01;
	document.getElementById('MIX-aba-menu-3').title = 'Reloading Tool - Total Combinations: ' + MIX_TOTAL_02;
	document.getElementById('MIX-aba-menu-4').title = 'Change Bullet Type: Handgun / Magnum - Total Combinations: ' + MIX_TOTAL_03;
	document.getElementById('MIX-aba-menu-5').title = 'Change Bullet Type: Granade Launcher Rounds - Total Combinations: ' + MIX_TOTAL_04;
	document.getElementById('MIX-aba-menu-6').title = 'Gun Powder + Granade Launcher Rounds - Total Combinations: ' + MIX_TOTAL_05;
	document.getElementById('MIX-aba-menu-7').title = 'Infinite Ammo / Quantity - Total Combinations: ' + MIX_TOTAL_06;
}
function MIX_showEdit(mode, combId, combHex){
	// Mode 0: Show, Mode 1: Hide
	if (mode === 0){
		var funcMode = combHex.slice(0, 2);
		MIX_currentHex = combHex;
		MIX_currentFunction = funcMode;
		$('#MIX-holder-' + (parseInt(funcMode) + 1)).css({'width': '728px'});
		document.getElementById('MIX_edit_function_' + funcMode).value = funcMode;
		document.getElementById('MIX_current_edit_lbl-' + parseInt(funcMode)).innerHTML = combId;
		// 00: Reload / Sum
		if (funcMode === '00'){
			document.getElementById('MIX_00_edit_Weapon').value = combHex.slice(RANGES['MIX_ReloadSum_Weapon'][0], RANGES['MIX_ReloadSum_Weapon'][1]);
			document.getElementById('MIX_00_edit_Ammo').value = combHex.slice(RANGES['MIX_ReloadSum_Ammo'][0], RANGES['MIX_ReloadSum_Ammo'][1]);
		}
		// 01: Combine
		if (funcMode === '01'){
			document.getElementById('MIX_01_edit_item_A').value = combHex.slice(RANGES['MIX_Combine_Item_A'][0], RANGES['MIX_Combine_Item_A'][1]);
			document.getElementById('MIX_01_edit_item_B').value = combHex.slice(RANGES['MIX_Combine_Item_B'][0], RANGES['MIX_Combine_Item_B'][1]);
			document.getElementById('MIX_01_edit_item_Result').value = combHex.slice(RANGES['MIX_Combine_Value_A'][0], RANGES['MIX_Combine_Value_A'][1]);
			document.getElementById('MIX_01_edit_item_Quantity').value = parseInt(combHex.slice(RANGES['MIX_Combine_Value_B'][0], RANGES['MIX_Combine_Value_B'][1]), 16);
		}
		// 02: Reloading Tool
		if (funcMode === '02'){
			document.getElementById('MIX_02_edit_item').value = combHex.slice(RANGES['MIX_reload_item'][0], RANGES['MIX_reload_item'][1]);
			document.getElementById('MIX_02_edit_item_Result').value = combHex.slice(RANGES['MIX_reload_result'][0], RANGES['MIX_reload_result'][1]);
			document.getElementById('MIX_02_edit_reloadingItem').value = combHex.slice(RANGES['MIX_reload_rTool'][0], RANGES['MIX_reload_rTool'][1]);
			document.getElementById('MIX_02_edit_item_Quantity').value = parseInt(combHex.slice(RANGES['MIX_reload_quantity'][0], RANGES['MIX_reload_quantity'][1]), 16);
		}
		// 03: Change Bullet Type (HandMag)
		if (funcMode === '03'){
			document.getElementById('MIX_03_edit_handMag_ammo').value = combHex.slice(RANGES['MIX_handMag_Ammo'][0], RANGES['MIX_handMag_Ammo'][1]);
			document.getElementById('MIX_03_edit_item_Result').value = combHex.slice(RANGES['MIX_handMag_result'][0], RANGES['MIX_handMag_result'][1]);
			document.getElementById('MIX_03_edit_handMag_weapon').value = combHex.slice(RANGES['MIX_handMag_Weapon'][0], RANGES['MIX_handMag_Weapon'][1]);
		}
		// 04: Change Bullet Type (G. Rounds)
		if (funcMode === '04'){
			$('#MIX_preview_canvas_04').css({'zoom': '2', 'height': '58px'});
			document.getElementById('MIX_04_edit_GL_ammo').value = combHex.slice(RANGES['MIX_GL_ammo'][0], RANGES['MIX_GL_ammo'][1]);
			document.getElementById('MIX_04_edit_GL_weapon').value = combHex.slice(RANGES['MIX_GL_weapon'][0], RANGES['MIX_GL_weapon'][1]);
			document.getElementById('MIX_04_edit_GL_newAmmo').value = combHex.slice(RANGES['MIX_GL_newAmmo'][0], RANGES['MIX_GL_newAmmo'][1]);
			document.getElementById('MIX_04_edit_GL_newWeapon').value = combHex.slice(RANGES['MIX_GL_newWeapon'][0], RANGES['MIX_GL_newWeapon'][1]);
		}
		// 05: Gun Powder + G. Rounds
		if (funcMode === '05'){
			document.getElementById('MIX_05_edit_powderGl_ammo').value = combHex.slice(RANGES['MIX_PowderGR_ammo'][0], RANGES['MIX_PowderGR_ammo'][1]);
			document.getElementById('MIX_05_edit_powderGl_powder').value = combHex.slice(RANGES['MIX_PowderGR_powder'][0], RANGES['MIX_PowderGR_powder'][1]);
			document.getElementById('MIX_05_edit_powderGl_newAmmo').value = combHex.slice(RANGES['MIX_PowderGR_newAmmmo'][0], RANGES['MIX_PowderGR_newAmmmo'][1]);
			document.getElementById('MIX_05_edit_powderGl_quantity').value = parseInt(combHex.slice(RANGES['MIX_PowderGR_quantity'][0], RANGES['MIX_PowderGR_quantity'][1]), 16);
		}
		// 06: Infinite Ammo
		if (funcMode === '06'){
			document.getElementById('MIX_06_edit_infinite_item').value = combHex.slice(RANGES['MIX_infinite_newInf'][0], RANGES['MIX_infinite_newInf'][1]);
			document.getElementById('MIX_06_edit_infinite_inf').value = combHex.slice(RANGES['MIX_infinite_infItem'][0], RANGES['MIX_infinite_infItem'][1]);
		}
		document.getElementById('MIX_btn_convertMix-' + parseInt(funcMode)).onclick = function(){
			MIX_convertCombination(combId, funcMode);
		}
		document.getElementById('MIX_applyBtn-' + funcMode).onclick = function(){
			MIX_applyChanges(combId, funcMode);
		}
		$('#MIX-item-edit-' + parseInt(funcMode)).css({'display': 'block'});
		MIX_RENDER_PREVIEW();
	} else {
		var c = 0;
		while(c < 7){
			$('#MIX-item-edit-' + c).css({'display': 'none'});
			$('#MIX-holder-' + c).css({'width': '1294px'});
			c++;
		}
	}
}
function MIX_RENDER_PREVIEW(){
	var Item_A;
	var Item_B;
	var Item_C;
	var Item_D;
	var Item_Res;
	// 00: Reload / Sum
	if (MIX_currentFunction === '00'){
		Item_A = document.getElementById('MIX_00_edit_Weapon').value;
		Item_B = document.getElementById('MIX_00_edit_Ammo').value;
		if (parseInt(Item_A, 16) > 133){
			Item_A = '86';
		}
		if (parseInt(Item_B, 16) > 133){
			Item_B = '86';
		}
		document.getElementById('MIX_00_preview_item_a').title = '(' + Item_A.toUpperCase() + ') ' + ITEM[Item_A][0];
		document.getElementById('MIX_00_preview_item_b').title = '(' + Item_B.toUpperCase() + ') ' + ITEM[Item_B][0];
		document.getElementById('MIX_00_preview_item_a').src = APP_PATH + '\\App\\Img\\Items\\' + Item_A + '.png';
		document.getElementById('MIX_00_preview_item_b').src = APP_PATH + '\\App\\Img\\Items\\' + Item_B + '.png';
	}
	// 01: Combine
	if (MIX_currentFunction === '01'){
		Item_A = document.getElementById('MIX_01_edit_item_A').value;
		Item_B = document.getElementById('MIX_01_edit_item_B').value;
		Item_C = document.getElementById('MIX_01_edit_item_Result').value;
		if (parseInt(Item_A, 16) > 133){
			Item_A = '86';
		}
		if (parseInt(Item_B, 16) > 133){
			Item_B = '86';
		}
		if (parseInt(Item_C, 16) > 133){
			Item_C = '86';
		}
		document.getElementById('MIX_01_preview_item_a').title = '(' + Item_A.toUpperCase() + ') ' + ITEM[Item_A][0];
		document.getElementById('MIX_01_preview_item_b').title = '(' + Item_B.toUpperCase() + ') ' + ITEM[Item_B][0];
		document.getElementById('MIX_01_preview_result').title = '(' + Item_C.toUpperCase() + ') ' + ITEM[Item_C][0];
		document.getElementById('MIX_01_preview_item_a').src = APP_PATH + '\\App\\Img\\Items\\' + Item_A + '.png';
		document.getElementById('MIX_01_preview_item_b').src = APP_PATH + '\\App\\Img\\Items\\' + Item_B + '.png';
		document.getElementById('MIX_01_preview_result').src = APP_PATH + '\\App\\Img\\Items\\' + Item_C + '.png';
	}
	// 02: Reloading Tool
	if (MIX_currentFunction === '02'){
		Item_A = document.getElementById('MIX_02_edit_reloadingItem').value;
		Item_B = document.getElementById('MIX_02_edit_item').value;
		Item_C = document.getElementById('MIX_02_edit_item_Result').value;
		if (parseInt(Item_A, 16) > 133){
			Item_A = '86';
		}
		if (parseInt(Item_B, 16) > 133){
			Item_B = '86';
		}
		if (parseInt(Item_C, 16) > 133){
			Item_C = '86';
		}
		document.getElementById('MIX_02_preview_item_a').title = '(' + Item_A.toUpperCase() + ') ' + ITEM[Item_A][0];
		document.getElementById('MIX_02_preview_item_b').title = '(' + Item_B.toUpperCase() + ') ' + ITEM[Item_B][0];
		document.getElementById('MIX_02_preview_result').title = '(' + Item_C.toUpperCase() + ') ' + ITEM[Item_C][0];
		document.getElementById('MIX_02_preview_item_a').src = APP_PATH + '\\App\\Img\\Items\\' + Item_A + '.png';
		document.getElementById('MIX_02_preview_item_b').src = APP_PATH + '\\App\\Img\\Items\\' + Item_B + '.png';
		document.getElementById('MIX_02_preview_result').src = APP_PATH + '\\App\\Img\\Items\\' + Item_C + '.png';
	}
	// 03: Change Bullet Type (HandMag)
	if (MIX_currentFunction === '03'){
		Item_A = document.getElementById('MIX_03_edit_handMag_weapon').value;
		Item_B = document.getElementById('MIX_03_edit_handMag_ammo').value;
		Item_C = document.getElementById('MIX_03_edit_item_Result').value;
		if (parseInt(Item_A, 16) > 133){
			Item_A = '86';
		}
		if (parseInt(Item_B, 16) > 133){
			Item_B = '86';
		}
		if (parseInt(Item_C, 16) > 133){
			Item_C = '86';
		}
		document.getElementById('MIX_03_preview_item_a').title = '(' + Item_A.toUpperCase() + ') ' + ITEM[Item_A][0];
		document.getElementById('MIX_03_preview_item_b').title = '(' + Item_B.toUpperCase() + ') ' + ITEM[Item_B][0];
		document.getElementById('MIX_03_preview_result').title = '(' + Item_C.toUpperCase() + ') ' + ITEM[Item_C][0];
		document.getElementById('MIX_03_preview_item_a').src = APP_PATH + '\\App\\Img\\Items\\' + Item_A + '.png';
		document.getElementById('MIX_03_preview_item_b').src = APP_PATH + '\\App\\Img\\Items\\' + Item_B + '.png';
		document.getElementById('MIX_03_preview_result').src = APP_PATH + '\\App\\Img\\Items\\' + Item_C + '.png';
	}
	// 04: Change Bullet Type (G. Rounds)
	if (MIX_currentFunction === '04'){
		Item_A = document.getElementById('MIX_04_edit_GL_weapon').value;
		Item_B = document.getElementById('MIX_04_edit_GL_ammo').value;
		Item_C = document.getElementById('MIX_04_edit_GL_newWeapon').value;
		Item_D = document.getElementById('MIX_04_edit_GL_newAmmo').value;
		if (parseInt(Item_A, 16) > 133){
			Item_A = '86';
		}
		if (parseInt(Item_B, 16) > 133){
			Item_B = '86';
		}
		if (parseInt(Item_C, 16) > 133){
			Item_C = '86';
		}
		if (parseInt(Item_D, 16) > 133){
			Item_D = '86';
		}
		document.getElementById('MIX_04_preview_item_a').title = '(' + Item_A.toUpperCase() + ') ' + ITEM[Item_A][0];
		document.getElementById('MIX_04_preview_item_b').title = '(' + Item_B.toUpperCase() + ') ' + ITEM[Item_B][0];
		document.getElementById('MIX_04_preview_item_c').title = '(' + Item_C.toUpperCase() + ') ' + ITEM[Item_C][0];
		document.getElementById('MIX_04_preview_item_d').title = '(' + Item_D.toUpperCase() + ') ' + ITEM[Item_D][0];
		document.getElementById('MIX_04_preview_item_a').src = APP_PATH + '\\App\\Img\\Items\\' + Item_A + '.png';
		document.getElementById('MIX_04_preview_item_b').src = APP_PATH + '\\App\\Img\\Items\\' + Item_B + '.png';
		document.getElementById('MIX_04_preview_item_c').src = APP_PATH + '\\App\\Img\\Items\\' + Item_C + '.png';
		document.getElementById('MIX_04_preview_item_d').src = APP_PATH + '\\App\\Img\\Items\\' + Item_D + '.png';
	}
	// 05: Gun Powder + G. Rounds
	if (MIX_currentFunction === '05'){
		Item_A = document.getElementById('MIX_05_edit_powderGl_ammo').value;
		Item_B = document.getElementById('MIX_05_edit_powderGl_powder').value;
		Item_C = document.getElementById('MIX_05_edit_powderGl_newAmmo').value;
		if (parseInt(Item_A, 16) > 133){
			Item_A = '86';
		}
		if (parseInt(Item_B, 16) > 133){
			Item_B = '86';
		}
		if (parseInt(Item_C, 16) > 133){
			Item_C = '86';
		}
		document.getElementById('MIX_05_preview_item_a').title = '(' + Item_A.toUpperCase() + ') ' + ITEM[Item_A][0];
		document.getElementById('MIX_05_preview_item_b').title = '(' + Item_B.toUpperCase() + ') ' + ITEM[Item_B][0];
		document.getElementById('MIX_05_preview_result').title = '(' + Item_C.toUpperCase() + ') ' + ITEM[Item_C][0];
		document.getElementById('MIX_05_preview_item_a').src = APP_PATH + '\\App\\Img\\Items\\' + Item_A + '.png';
		document.getElementById('MIX_05_preview_item_b').src = APP_PATH + '\\App\\Img\\Items\\' + Item_B + '.png';
		document.getElementById('MIX_05_preview_result').src = APP_PATH + '\\App\\Img\\Items\\' + Item_C + '.png';
	}
	// 06: Infinite ammo
	if (MIX_currentFunction === '06'){
		Item_A = document.getElementById('MIX_06_edit_infinite_item').value;
		Item_B = document.getElementById('MIX_06_edit_infinite_inf').value;
		if (parseInt(Item_A, 16) > 133){
			Item_A = '86';
		}
		if (parseInt(Item_B, 16) > 133){
			Item_B = '86';
		}
		document.getElementById('MIX_06_preview_item_a').title = '(' + Item_A.toUpperCase() + ') ' + ITEM[Item_A][0];
		document.getElementById('MIX_06_preview_item_b').title = '(' + Item_B.toUpperCase() + ') ' + ITEM[Item_B][0];
		document.getElementById('MIX_06_preview_item_a').src = APP_PATH + '\\App\\Img\\Items\\' + Item_A + '.png';
		document.getElementById('MIX_06_preview_item_b').src = APP_PATH + '\\App\\Img\\Items\\' + Item_B + '.png';
	}
}
/*
	Settings Menu
*/
function SETTINGS_showMenu(menuId){
	var c = 0;
	while (c < parseInt(SETTINGS_totalMenus + 1)){
		$('#SETTINGS-aba-menu-' + c).removeClass('aba-select');
		c++;
	}
	if (MAIN_32BitMode === true){
		$('#SETTINGS_perfTab').css({'height': '34px'});
		$('#SETTINGS_RE3_LIVE_PERF_DIV').css({'display': 'none'});
	}
	$('#SETTINGS_menu_' + menuId).css({'display': 'block', 'height': '524px'});
	$('#SETTINGS_content_' + menuId).css({'height': '514px'});
	$('#SETTINGS-aba-menu-' + menuId).addClass('aba-select');
	$('#menu-SETTINGS').css({'display': 'block'});
}
function SETTINGS_updateLiveSpeed(){
	document.getElementById('SETTINGS_lbl_RE3_liveSpeed').innerHTML = document.getElementById('SETTINGS_edit_RE3LIVEUPDATE').value;
}
/*
	Updater
*/
function R3DITORshowUpdate(){
	$('#menu-topo').css({'display': 'none'});
	$('#menu-utility').css({'display': 'none'});
	$('#menu-topo-MOD').css({'display': 'none'});
	$('#menu-settings').css({'display': 'none'});
	$('#menu-utility-aba').css({'display': 'none'});
	$('#menu-utility-aba-3').css({'display': 'none'});
	$('#R3ditor_update').css({'display': 'block'});
}
function R3DITORcloseUpdate(){
	$('#R3ditor_update').css({'display': 'none'});
	$('#menu-utility-aba-3').css({'display': 'block'});
	$('#menu-utility-aba').css({'display': 'block'});
	$('#menu-settings').css({'display': 'block'});
	$('#menu-utility').css({'display': 'block'});
	$('#menu-topo').css({'display': 'block'});
	if (EXEC_BIO3_original !== ''){
		$('#menu-topo-MOD').css({'display': 'block'});
	}
}
function R3DITORshowUpdateProgress(){
	document.title = APP_NAME + ' - Please wait...';
	$('#R3ditor_update').css({'display': 'none'});
	$('#progress_window').css({'display': 'block'});
}
function R3DITOR_movePercent(id, percent, status){
	var p = parseInt(percent);
	if (p < 0){
		p = 0;
	}
	if (p > 100){
		p = 100;
	}
	// Update
	if (id === 0){
		if (status === '' || status === undefined || status === null){
			status = 'Message';
		}
		LOG_addLog('log', 'Process - ' + status);
		document.getElementById('update_status').innerHTML = status;
		document.getElementById('update_percent').innerHTML = p + '%';
		$('#update_progressbar').css({'width': p + '%'});
		LOG_scroll();
	}
	// Wizard
	if (id === 1){
		if (DESIGN_ENABLE_ANIMS === true){
			$('#WZ_progressbar').animate({'width': p + '%'}, {duration: 250, queue: false});
		} else {
			$('#WZ_progressbar').css({'width': p + '%'});
		}
	}
}
// Utils - Extract Rofs
function UTILS_rofs_hideButtons(){
	$('#menu-topo').css({'display': 'none'});
	$('#menu-utility').css({'display': 'none'});
	$('#menu-settings').css({'display': 'none'});
	$('#menu-topo-MOD').css({'display': 'none'});
	$('#menu-utility-aba').css({'display': 'none'});
	$('#menu-utility-aba-2').css({'display': 'none'});
	$('#menu-utility-aba-3').css({'display': 'none'});
	if (DESIGN_ENABLE_ANIMS === true){
		$('#img-logo').fadeOut({duration: 500, queue: false});
	} else {
		$('#img-logo').css({'display': 'none'});
	}
}
/// Run game
function R3DITOR_RUNGAME(id){
	if (WZ_showWizard === false){
		var c = 0;
		if (onMSG === false){
			if (id === 0){
				if (DESIGN_ENABLE_ANIMS === true){
					$('#menu-topo-MOD').fadeOut({duration: 120, queue: false});
				} else {
					$('#menu-topo-MOD').css({'display': 'none'});
				}
				while(c < parseInt(RDT_totalMenus + 1)){
					$('#RDT_menu-' + c).css({'height': '530px'});
					$('#RDT_BG_' + c).css({'height': '512px'});
					c++;
				}
				$('#RDT_msgCode_holder').css({'height': '474px'});
				$('#RDT-enemyNPC-Edit').css({'height': '458px'});
				$('#RDT_camera_holder').css({'height': '474px'});
				$('#RDT_enemy_holder').css({'height': '474px'});
				$('#RDT-MSGCODE-Edit').css({'height': '463px'});
				$('#RDT-msgCode-hold').css({'height': '516px'});
				$('#RRDT-camera-Edit').css({'height': '458px'});
				$('#FILEGEN_contents').css({'height': '474px'});
				$('#RDT_MSGBLOCKINFO').css({'height': '493px'});
				$('#RDT_audio_holder').css({'height': '472px'});
				$('#RDT_door_holder').css({'height': '474px'});
				$('#RDT-canvas-hold').css({'height': '516px'});
				$('#RDT-camera-hold').css({'height': '516px'});
				$('#RDT-camera-Edit').css({'height': '458px'});
				$('#RDT-enemy-hold').css({'height': '516px'});
				$('#RDT-audio-hold').css({'height': '516px'});
				$('#RDT_MSG-holder').css({'height': '472px'});
				$('#FILEGEN_holder').css({'height': '516px'});
				$('#RDT-door-hold').css({'height': '518px'});
				$('#RDT-item-list').css({'height': '472px'});
				$('#RDT-Item-Edit').css({'height': '458px'});
				$('#RDT-door-Edit').css({'height': '463px'});
				$('#FILEGEN_menu').css({'height': '526px'});
				$('#RDT-geral').css({'height': '516px'});
				$('#RDT-msgs').css({'height': '516px'});
				$('#RDT-ifm').css({'height': '516px'});
	
				$('#RDT-SLD-hold').css({'height': '516px'});
				$('#RDT_SLD_LAYER_holder').css({'height': '472px'});
				$('#RDT_SLD_LAYER_BLOCK_LIST').css({'height': '288px'});
	
				console.log('Open RE3');
	
			} else {
				if (EXEC_BIO3_original !== ''){
					$('#btn_run_bio3').css({'display': 'inline'});
				}
				if (EXEC_BIO3_MERCE !== ''){
					$('#btn_run_merce').css({'display': 'inline'});
				}
				if (EXEC_BIO3_MERCE !== '' || EXEC_BIO3_original !== ''){
					while(c < parseInt(RDT_totalMenus + 1)){
						$('#RDT_menu-' + c).css({'height': '482px'});
						$('#RDT_BG_' + c).css({'height': '470px'});
						c++;
					}
					$('#RDT_msgCode_holder').css({'height': '430px'});
					$('#RDT-enemyNPC-Edit').css({'height': '418px'});
					$('#RDT_camera_holder').css({'height': '430px'});
					$('#RRDT-camera-Edit').css({'height': '418px'});
					$('#RDT_enemy_holder').css({'height': '430px'});
					$('#RDT-msgCode-hold').css({'height': '472px'});
					$('#FILEGEN_contents').css({'height': '434px'});
					$('#RDT_MSGBLOCKINFO').css({'height': '449px'});
					$('#RDT_audio_holder').css({'height': '430px'});
					$('#RDT-MSGCODE-Edit').css({'height': '417px'});
					$('#RDT_door_holder').css({'height': '430px'});
					$('#RDT-camera-Edit').css({'height': '418px'});
					$('#RDT-canvas-hold').css({'height': '472px'});
					$('#RDT-camera-hold').css({'height': '472px'});
					$('#RDT-enemy-hold').css({'height': '472px'});
					$('#RDT-audio-hold').css({'height': '472px'});
					$('#RDT_MSG-holder').css({'height': '430px'});
					$('#FILEGEN_holder').css({'height': '474px'});
					$('#RDT-door-Edit').css({'height': '417px'});
					$('#RDT-door-hold').css({'height': '472px'});
					$('#RDT-item-list').css({'height': '428px'});
					$('#RDT-Item-Edit').css({'height': '418px'});
					$('#FILEGEN_menu').css({'height': '484px'});
					$('#RDT-geral').css({'height': '472px'});
					$('#RDT-msgs').css({'height': '472px'});
					$('#RDT-ifm').css({'height': '472px'});
	
					$('#RDT-SLD-hold').css({'height': '472px'});
					$('#RDT_SLD_LAYER_holder').css({'height': '430px'});
					$('#RDT_SLD_LAYER_BLOCK_LIST').css({'height': '242px'});
	
					console.log('Close RE3');
	
					if (main_currentMenu !== 6){
						if (DESIGN_ENABLE_ANIMS === true){
							$('#menu-topo-MOD').fadeIn({duration: 120, queue: false});
						} else {
							$('#menu-topo-MOD').css({'display': 'inline'});
						}
					}
				}
			}
		}
	} else {
		$('#menu-utility-aba-2').css({'display': 'none'});
		$('#menu-utility-aba-3').css({'display': 'none'});
	}
}