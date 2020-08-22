/*
	R3ditor - design.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Helpa eu!
*/
var onMSG = false;
var INI_totalMenus = 3;
var MIX_totalMenus = 7;
var RDT_totalMenus = 11;
var MIX_currentMenu = 0;
var SAVE_totalMenus = 3;
var RE3SET_totalMenus = 2;
var RE3_LIVE_prevCam = '';
var RE3SET_currentMenu = 1;
var SETTINGS_totalMenus = 3;
var FILELIST_totalReloads = 0;
var DESIGN_ENABLE_ANIMS = false;
var R3ditor_tool_selected = false;
var R3ditor_showFirstBootMessage = true;
var RE3_LIVE_prevRDT = RE3_LIVE_prevCam;
var RDT_aba_atual, SAVE_aba_atual, INI_aba_atual, main_currentMenu, fileList_gameMode, request_render_save, RE3_LIVE_RENDERTIMER;
/*
	LOG Functions
*/
function LOG_scroll(){
	document.getElementById('log-programa').scrollTop = document.getElementById('log-programa').scrollHeight;
}
function LOG_separator(){
	LOG_addLog('log', LOG_separatorHtml);
	LOG_scroll();
}
/*
	Utils
*/
function UTILS_toggleChkBox(tag){
	var checked = document.getElementById(tag).checked;
	if (checked === true){
		document.getElementById(tag).checked = false;
	} else {
		document.getElementById(tag).checked = true;
	}
}
function UTILS_removeMiscChars(str){
	var c = 0;
	var newChar = '';
	while(c < UTILS_REMOVE_CHARS.length){
		newChar = str.replace(UTILS_REMOVE_CHARS[c], '');
		c++;
	}
	return newChar;
}
/*
	Filelist
*/
function FILELIST_clearTextBox(){
	document.getElementById('fileList_RDT_SEARCH_TEXTBOX').value = '';
}
function FILELIST_triggerSearchBox(){
	if (main_currentMenu === 3){
		document.getElementById('fileList_RDT_SEARCH_TEXTBOX').value = UTILS_removeMiscChars(document.getElementById('fileList_RDT_SEARCH_TEXTBOX').value.toUpperCase()).replace(new RegExp('R', 'gi'), '');
		var searchQuery = document.getElementById('fileList_RDT_SEARCH_TEXTBOX').value.toUpperCase();
		var searchResult;
		if (searchQuery !== '' && searchQuery.length === 3){
			if (fileList_gameMode === 'DATA_E' || fileList_gameMode === 'DATA_AJ'){
				searchResult = document.getElementById('RDT_file_' + fileList_gameMode + '_R' + searchQuery);
			} else {
				searchResult = document.getElementById('RDT_file_ARDENABLER_R' + searchQuery);
			}
			if (searchResult !== null){
				if (fileList_gameMode === 'DATA_E'){
					document.getElementById('fileListHolder').innerHTML = '';
					$('#fileListHolder').append(searchResult);
				}
				if (fileList_gameMode === 'DATA_AJ'){
					document.getElementById('fileListHolder_AJ').innerHTML = '';
					$('#fileListHolder_AJ').append(searchResult);
				}
				if (fileList_gameMode === 'ARDENABLER'){
					document.getElementById('fileListHolder_ardConvert').innerHTML = '';
					$('#fileListHolder_ardConvert').append(searchResult);
				}
			} else {
				LOG_addLog('warn', 'WARN - Unable to find R' + searchQuery + '.RDT');
			}
		} else {
			if (fileList_gameMode === 'DATA_E'){
				main_renderFileList(3, 2);
			}
			if (fileList_gameMode === 'DATA_AJ'){
				main_renderFileList(3, 1);
			}
			if (fileList_gameMode === 'ARDENABLER'){
				main_renderFileList(3, 4);
			}
		}
	}
	LOG_scroll();
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
			$('#fileList_RDT_SEARCH_TEXTBOX').css({'left': '512px', 'width': '160px'});
		}
		if (mode === 2){
			gameModePath = 'DATA_E';
			$('#fileList_RDT_SEARCH_TEXTBOX').css({'left': '508px', 'width': '160px'});
		}
		if (mode === 4){
			if (R3_ARDENABLER_ENABLED === true){
				gameModePath = 'ARDENABLER';
				$('#fileList_RDT_SEARCH_TEXTBOX').css({'left': '507px', 'width': '160px', 'display': 'inline'});
			} else {
				$('#fileList_RDT_SEARCH_TEXTBOX').css({'display': 'none'});
			}
		}
	}
	// RDT Recent
	if (id === 1 && RDT_lastFileOpened !== ''){
		var origName = 'Unknown';
		var origCity = 'Unknown';
		var pFile = RDT_lastFileOpened;
		var mFile, imgPreview, originalMFile, originalPFile;
		var RDT_name = getFileName(RDT_lastFileOpened).toUpperCase();
		var mapExt = getFileExtension(RDT_lastFileOpened).toUpperCase();
		if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '00.JPG') === true){
			imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '00.JPG';
		} else if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '01.JPG') === true){
			imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '01.JPG';
		} else {
			imgPreview = APP_PATH + '\\App\\img\\404.png';
		}
		if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_' + mapExt + '.rdtmap2') === true){
			mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_' + mapExt + '.rdtmap2';
		} else {
			if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_' + mapExt + '.rdtmap2') === true){
				mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_' + mapExt + '.rdtmap2';
			} else {
				mFile = 'There is no Mapfile for this file. Open it to generate!';
			}
		}
		if (RDT_locations[RDT_name] !== undefined && RDT_locations[RDT_name] !== null){
			origName = RDT_locations[RDT_name][0];
			origCity = RDT_locations[RDT_name][1];
		}
		if (mFile.length > 44 && mFile !== 'There is no map file for this file. Open it to generate!'){
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
			'draggable="false" style="width: 134px;"><div class="fileList_details">File: ' + RDT_name.toUpperCase() + '.RDT<br>Path: <font title="' + originalPFile + 
			'">' + pFile +  '</font><br>MapFile: <font title="' + originalMFile + '">' + mFile + '</font><br><div class="menu-separador"></div>Original Local Name: ' + 
			origName + '<br>Original City Location: ' + origCity + '<br></div></div>';
		$('#RDT_recentFile').append(fileList_HTML_template);
		$('#RDT_recentFile').css({'display': 'block', 'left': '690px', 'height': '144px', 'width': '630px', 'top': '424px', 'background-image': 'linear-gradient(to right, rgb(77, 77, 77), #232323)', 'border-top-left-radius': '0px', 'border-bottom-left-radius': '0px'});
	} else {
		document.getElementById('fileListHolder').innerHTML = '';
		document.getElementById('fileListHolder_AJ').innerHTML = '';
	}
	// RDT
	if (id === 3){
		fileList_gameMode = gameModePath;
		$('#fileList_aba_list').css({'display': 'inline'});
		document.getElementById('fileList_title').innerHTML = 'Map List';
		if (mode !== 3){
			if (fs.existsSync(APP_PATH + '\\Assets\\' + gameModePath + '\\RDT\\') === true && fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\') === true){
				var listRDT = fs.readdirSync(APP_PATH + '\\Assets\\' + gameModePath + '\\RDT\\').filter(fn => fn.endsWith('.RDT'));
				if (listRDT.length < 1){
					listRDT = fs.readdirSync(APP_PATH + '\\Assets\\' + gameModePath + '\\RDT\\').filter(fn => fn.endsWith('.rdt'));
				}
				if (FILELIST_totalReloads === 0){
					FILELIST_totalReloads++;
					$('#FILELIST_loadingMessage').css({'display': 'block'});
					$('#fileListHolder').css({'filter': 'blur(4px)'});
				} else {
					$('#FILELIST_loadingMessage').css({'display': 'none'});
				}
				while(c < listRDT.length){
					if (FILELIST_totalReloads === 1){
						$('#filelist_progressBar_files').css({'width': parsePercentage(c, listRDT.length) + '%'});
					}
					var nOriginal = '';
					var origName = 'Unknown';
					var origCity = 'Unknown';
					var mFile, gMODE, imgPreview;
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
						if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_AJ_RDT.rdtmap2') === true){
							mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_AJ_RDT.rdtmap2';
						} else {
							mFile = 'There is no Mapfile for this map. Open it to generate!';
						}
					} else {
						if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_RDT.rdtmap2') === true){
							mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_RDT.rdtmap2';
						} else {
							mFile = 'There is no Mapfile for this map. Open it to generate!';
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
						'<br>MapFile: <font title="' + nOriginal + '">' + mFile + '</font><br><div class="menu-separador"></div>Original Local Name: ' + origName + 
						'<br>Original City Location: ' + origCity + '<br></div></div>';
					if (gameModePath === 'DATA_E'){
						$('#fileListHolder').append(fileList_HTML_template);
					}
					if (gameModePath === 'DATA_AJ'){
						$('#fileListHolder_AJ').append(fileList_HTML_template);
					}
					c++;
				}
				$('#fileListHolder').css({'filter': 'blur(0px)'});
				$('#RDT_lastThreeFiles').css({'display': 'none'});
				$('#fileList_aba_ARD').removeClass('aba-select-2');
				$('#filelist_progressBar_files').css({'width': '0%'});
				$('#fileList_aba_recent').removeClass('aba-select-2');
				$('#FILELIST_loadingMessage').css({'display': 'none'});
				$('#fileListHolder_ardConvert').css({'display': 'none'});
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
				if (mode !== 4){
					console.warn('WARN - Unable to render FileList!');
					LOG_addLog('warn', 'WARN - Unable to render FileList!');
				} else {
					// ARD Enabler
					var tms = 0;
					$('#fileListHolder').css({'display': 'none'});
					$('#fileList_aba_ARD').addClass('aba-select-2');
					$('#fileListHolder_AJ').css({'display': 'none'});
					$('#RDT_lastThreeFiles').css({'display': 'none'});
					$('#fileList_aba_easy').removeClass('aba-select-2');
					$('#fileList_aba_hard').removeClass('aba-select-2');
					$('#fileList_aba_recent').removeClass('aba-select-2');
					document.getElementById('fileListHolder_ardConvert').innerHTML = '';
					//
					if (R3_ARDENABLER_ENABLED === true){
						var fileList_HTML_template, currentRDT, origName, origCity, imgPreview, shortFilePath;
						var listRDT = fs.readdirSync(APP_PATH + '\\Configs\\ARDRDT\\').filter(fn => fn.endsWith('.RDT'));
						while (tms < listRDT.length){
							RDT_name = listRDT[tms];
							currentRDT = APP_PATH + '\\Configs\\ARDRDT\\' + RDT_name;
							imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + getFileName(listRDT[tms]).toUpperCase() + '00.JPG';
							if (fs.existsSync(imgPreview) !== true){
								imgPreview = '\\App\\Img\\404.png';
							}
							origName = RDT_locations[getFileName(listRDT[tms]).toUpperCase()][0];
							origCity = RDT_locations[getFileName(listRDT[tms]).toUpperCase()][1];
							if (currentRDT.length > 58){
								shortFilePath = '...' + currentRDT.slice(parseInt(currentRDT.length / 3), currentRDT.length);
							} else {
								shortFilePath = currentRDT;
							}
							fileList_HTML_template = '<div class="fileList_item fileList_item_color_a" id="RDT_file_ARDENABLER_' + getFileName(listRDT[tms]).toUpperCase() + '" onclick="RDT_openFile(\'' + 
													 currentRDT.replace(new RegExp('\\\\', 'gi'), '/') + '\');"><img src="' + imgPreview + '" class="fileList_img" draggable="false"><div class="fileList_details">' + 
													 'File: ' + RDT_name + '<br>RDT Extracted from PS ARD File<br>Path: ' + shortFilePath + '<br><div class="menu-separador"></div>Original Local Name: ' + origName + 
													 '<br>Original City Location: ' + origCity + '<br></div></div>';
							$('#fileListHolder_ardConvert').append(fileList_HTML_template);
							tms++;
						}
					} else {
						document.getElementById('fileListHolder_ardConvert').innerHTML = ARDEnabler_HTML_filelist_error;
						LOG_addLog('warn', 'WARN - You must run ARD Enabler before using this tab!');
					}
					// End
					$('#fileListHolder_ardConvert').css({'display': 'block', 'height': '440px'});
				}
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
				while (c < parseInt(fList.length - 1)){
					fList.splice();
					var nOriginal = '';
					var origName = 'Unknown';
					var origCity = 'Unknown';
					var currentRDT = fList[c];
					var mFile, gMODE, imgPreview;
					var RDT_name = getFileName(fList[c]).toUpperCase();
					var mapExt = getFileExtension(fList[c]).toUpperCase();
					if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '00.JPG') === true){
						imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '00.JPG';
					} else if (fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '01.JPG') === true){
						imgPreview = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_name.toUpperCase() + '01.JPG';
					} else {
						imgPreview = APP_PATH + '\\App\\img\\404.png';
					}
					if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_AJ_' + mapExt + '.rdtmap2') === true){
						gMODE = 'Easy';
						mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_AJ_' + mapExt + '.rdtmap2';
					} else {
						if (fs.existsSync(APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_' + mapExt + '.rdtmap2') === true){
							gMODE = 'Hard';
							mFile = APP_PATH + '\\Configs\\RDT\\' + RDT_name.toUpperCase() + '_' + mapExt + '.rdtmap2';
						} else {
							gMODE = 'Unknown';
							mFile = 'There is no MapFile for this ' + RDT_fileType + '. Open it to generate!';
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
						'.' + mapExt + '<br>Game Mode: ' + gMODE + '<br>MapFile: <font title="' + nOriginal + '">' + mFile + '</font><br><div class="menu-separador">' + 
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
			$('#fileList_aba_ARD').removeClass('aba-select-2');
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
					' onclick="CARREGAR_SAVE(\'' + GAME_PATH.replace(new RegExp('\\\\', 'gi'), '/') + currentSAV + '\');"><img src="' + APP_PATH + 
					'\\App\\img\\SAVICON.png" class="fileList_img" draggable="false"><div class="fileList_details">File: ' + currentSAV + ' (Original)' + 
					'<div class="menu-separador"></div>Path: ' + GAME_PATH.replace(new RegExp('\\\\', 'gi'), '/') + currentSAV + '</div>';
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
	if (anim !== 8 && anim !== 9 && anim !== 12){
		localStorage.clear();
		sessionStorage.clear();
	}
	main_currentMenu = anim;
	RE3_LIVE_closeForm();
	if (anim === 0){ // Back
		reload();
	} else {
		R3ditor_tool_selected = true;
		$('#menu-topo').css({'display': 'none'});
		$('#menu-utility').css({'display': 'none'});
		$('#menu-settings').css({'display': 'none'});
		$('#menu-utility-aba').css({'display': 'none'});
		$('#menu-utility-aba-2').css({'display': 'none'});
		$('#menu-utility-aba-3').css({'display': 'none'});
		$('#menu-utility-aba-4').css({'display': 'none'});
		$('#menu-utility-aba-5').css({'display': 'none'});
		$('#mainMenu-patcher-div').css({'display': 'none'});
		$('#mainMenu-exeEdit-div').css({'display': 'none'});
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
		document.title = APP_NAME + ' - Map Editor';
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
		if (DESIGN_ENABLE_ANIMS === true){
			$('#FILEGEN_ruler').fadeIn({duration: 1000, queue: false});
			$('#FILEGEN_ruler').animate({'top': '60px', 'width': '2px', 'height': '218px'}, {duration: 1000, queue: false});
		} else {
			$('#FILEGEN_ruler').css({'top': '60px', 'width': '2px', 'height': '218px', 'display': 'block'});
		}
	}
	if (anim === 5){ // TIM Patcher
		LOG_addLog('warn', 'HEY - this menu are not avaliable yet - try again later!');
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
	if (anim === 9){ // IEDIT
		if (PROCESS_OBJ !== undefined && RE3_RUNNING === true){
			killExternalSoftware(PROCESS_OBJ['th32ProcessID']);
		}
		if (enable_mod === true){
			$('#menu-topo-MOD').css({'display': 'none'});
		}
		$('#menu-topo-IEDIT').css({'display': 'inline'});
		IEDIT_showMenu();
	}
	if (anim === 10){ // R3 Patcher
		if (PROCESS_OBJ !== undefined && RE3_RUNNING === true){
			killExternalSoftware(PROCESS_OBJ['th32ProcessID']);
		}
		if (enable_mod === true){
			$('#menu-topo-MOD').css({'display': 'none'});
		}
		PATCHER_showMenu();
	}
	if (anim === 11){ // DROP
		if (PROCESS_OBJ !== undefined && RE3_RUNNING === true){
			killExternalSoftware(PROCESS_OBJ['th32ProcessID']);
		}
		if (enable_mod === true){
			$('#menu-topo-MOD').css({'display': 'none'});
		}
		$('#menu-topo-DROP').css({'display': 'inline'});
		DROP_showMenu();
	}
	if (anim === 12){ // RE3SET
		if (PROCESS_OBJ !== undefined && RE3_RUNNING === true){
			killExternalSoftware(PROCESS_OBJ['th32ProcessID']);
		}
		if (enable_mod === true){
			$('#menu-topo-MOD').css({'display': 'none'});
		}
		$('#menu-topo-RE3SET').css({'display': 'inline'});
		if (RE3SET_gameVersion !== 2){
			RE3SET_showMenu(1);
		} else {
			RE3SET_showMenu(2);
		}
	}
	if (anim === 13){ // XDELTA Patcher
		if (PROCESS_OBJ !== undefined && RE3_RUNNING === true){
			killExternalSoftware(PROCESS_OBJ['th32ProcessID']);
		}
		if (enable_mod === true){
			$('#menu-topo-MOD').css({'display': 'none'});
		}
		DESIGN_XDELTA_showMenu();
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
	while (i < (SAVE_totalMenus + 1)){
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
	if (menuId === 1){ // General
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
	if (menuId === 2){
		SAV_addInfo(0, '00');
		SAVE_applyMenuFocus(2);
		$('#save-geral').addClass('none');
		$('#msg-viewer').addClass('none');
		$('#save-carlos').addClass('none');
		$('#save-jill').removeClass('none');
	}
	// Menu Carlos
	if (menuId === 3){
		SAV_addInfo(1, '00');
		SAVE_applyMenuFocus(3);
		$('#save-jill').addClass('none');
		$('#save-geral').addClass('none');
		$('#msg-viewer').addClass('none');
		$('#save-carlos').removeClass('none');
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
	$('#menu-utility-aba-4').css({'display': 'none'});
	$('#menu-utility-aba-5').css({'display': 'none'});
	$('#mainMenu-patcher-div').css({'display': 'none'});
	$('#mainMenu-exeEdit-div').css({'display': 'none'});
	if (DESIGN_ENABLE_ANIMS === true){
		$('#img-logo').fadeOut({duration: 120, queue: false});
		$('#about-r3ditor').fadeIn({duration: 500, queue: false});
		$('#ABOUT_R3ditorLogo').fadeIn({duration: 1500, queue: false});
	} else {
		$('#img-logo').css({'display': 'none'});
		$('#about-r3ditor').css({'display': 'inline'});
		$('#ABOUT_R3ditorLogo').css({'display': 'inline'});
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
				$('#ABOUT_R3ditorLogo').css({'filter': 'blur(' + c + 'px)'});
			} else {
				clearInterval(imgTimer);
				setTimeout(function(){
					ABOUT_hueEffect();
				}, 50);
			}
		}, 100);
	} else {
		$('#ABOUT_R3ditorLogo').css({'filter': 'blur(0px)'});
	}
}
function ABOUT_hueEffect(){
	if (DESIGN_ENABLE_ANIMS === true){
		var c = 0;
		var imgHueTimer = setInterval(function(){
			if (c > 359){
				c = 0;
			}
			$('#ABOUT_R3ditorLogo').css({'filter': 'hue-rotate(' + c + 'deg)'});
			c++;
		}, 200);
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
	// Start Message
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
	// End Message
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
	// Show Text
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
	// Show Special Char
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
	// Show Item Name
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
	// Exec SE
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
	// Show Camera
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
	// Unknown Command used on R101.RDT (F5)
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
	// Change Text Color
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
	// Insert Hex
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
	// Select Option
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
	if (RDT_arquivoBruto !== undefined && fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\') === true && RDT_fileType === 'RDT'){
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
	document.title = APP_NAME + ' - Map Editor (' + RDT_fileType + ' Mode) - File: ' + RDT_mapName + '.' + RDT_fileType;
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
	RDT_show3DPropEdit(1);
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
	RDT_checkBKP();
	if (id !== 4){
		$('#RDT-aba-menu-4').css({'display': 'none'});
	}
	$('#RDT_reload').css({'display': 'inline'});
	if (RE3_RUNNING === false && enable_mod === true){
		$('#RDT-3D_props').css({'height': '472px'});
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
		$('#RDT-3D_props-Edit').css({'height': '418px'});
		$('#RDT_camera_holder').css({'height': '430px'});
		$('#RDT_msgCode_holder').css({'height': '430px'});
		$('#RDT_3DProps_holder').css({'height': '428px'});
	}
	if (RDT_fileType === 'RDT'){
		document.getElementById('RDT-lbl-fileVersion').innerHTML = 'PC \\ GameCube \\ DreamCast';
	} else {
		document.getElementById('RDT-lbl-fileVersion').innerHTML = 'PlayStation (PS1)';
	}
	var sldExists = fs.existsSync(APP_PATH + '\\Assets\\DATA_A\\BSS\\' + getFileName(ORIGINAL_FILENAME).toUpperCase() + '.SLD');
	if (enable_mod === true && sldExists === true && RE3SLDE_CANRUN === true && RDT_fileType === 'RDT'){
		document.getElementById('RDT_lbl-SLD_PRESENT').innerHTML = 'Yes';
		$('#RDT_btn_openOnRE3SLDE').removeClass('none');
		$('#RDT_btn_openOnHexSld').removeClass('none');
	} else {
		document.getElementById('RDT_lbl-SLD_PRESENT').innerHTML = 'No';
		$('#RDT_btn_openOnRE3SLDE').addClass('none');
		$('#RDT_btn_openOnHexSld').addClass('none');
	}
	RDT_SLD_CANVAS_BG_CHANGE_OPACITY();
	$('#RDT_backupBtn').css({'display': 'inline'});
	document.getElementById('RDT-item-list').scrollTop = 0;
	document.getElementById('RDT_MSG-holder').scrollTop = 0;
	$('#log-programa').css({'height': '86px', 'top': '626px'});
	document.getElementById('RDT_lbl-stage').innerHTML = RDT_stage;
	document.getElementById('RDT-map-select').innerHTML = RDT_EDIT_MAP;
	document.getElementById('RDT-file-select').innerHTML = RDT_EDIT_FILE;
	document.getElementById('RDT-item-select').innerHTML = RDT_EDIT_ITEM;
	document.getElementById('RDT_lbl_totDoors').innerHTML = RDT_totalDoors;
	document.getElementById('RDT_lbl-totalMaps').innerHTML = RDT_totalMapas;
	document.getElementById('RDT_lbl-tCameras').innerHTML = RDT_totalCameras;
	document.getElementById('RDT_lbl-totalDoors').innerHTML = RDT_totalDoors;
	document.getElementById('RDT_lbl-totalFiles').innerHTML = RDT_totalFiles;
	document.getElementById('RDT_lbl-totalItens').innerHTML = RDT_totalItens;
	document.getElementById('RDT_lbl-totalAudios').innerHTML = RDT_totalAudios;
	document.getElementById('RDT_lbl_totalAudios').innerHTML = RDT_totalAudios;
	document.getElementById('RDT-lbl-FILE_Path').innerHTML = ORIGINAL_FILENAME;
	document.getElementById('RDT_lbl-totItens').innerHTML = RDT_totalItensGeral;
	document.getElementById('RDT_lbl-total3DProps').innerHTML = RDT_total3DProps;
	document.getElementById('RDT_lbl_total3DProps').innerHTML = RDT_total3DProps;
	document.getElementById('RDT_lbl_totalCameras').innerHTML = RDT_totalCameras;
	document.getElementById('RDT-aba-menu-6').value = 'Doors (' + RDT_totalDoors +')';
	document.getElementById('RDT_lbl_totalEnemy').innerHTML = RDT_enemiesArray.length;
	document.getElementById('RDT_lbl-totalEnemies').innerHTML = RDT_enemiesArray.length;
	document.getElementById('RDT-aba-menu-5').value = 'Audios (' + RDT_totalAudios +')';
	document.getElementById('RDT-aba-menu-9').value = 'Cameras (' + RDT_totalCameras +')';
	document.getElementById('RDT_lbl_totalmsgCode').innerHTML = RDT_messageCodesArray.length;
	document.getElementById('RDT-aba-menu-11').value = '3D Props (' + RDT_total3DProps + ')';
	document.getElementById('RDT-aba-menu-8').value = 'Enemies / NPC\'s (' + RDT_totalEnemies + ')';
	document.getElementById('RDT-aba-menu-7').value = 'Message Code (' + RDT_messageCodesArray.length + ')';
	document.getElementById('RDT-aba-menu-3').value = 'Items, Files and Maps (' + RDT_totalItensGeral + ')';
	document.getElementById('RDT-lbl-FILENAME').innerHTML = getFileName(ORIGINAL_FILENAME).toUpperCase() + '.' + RDT_fileType;
	document.getElementById('RDT_lbl_fSize').innerHTML = getFileSize(ORIGINAL_FILENAME, 1) + ' KB (' + getFileSize(ORIGINAL_FILENAME, 0) + ' Bytes)';
	//
	$('#RDT_menu-' + id).css({'display': 'block'});
	$('#menu-RDT').css({'display': 'block'});
	RDT_applyMenuFocus(id);
	RDT_Error_404();
	LOG_scroll();
}
// 3D Props
function RDT_show3DPropEdit(mode, id){
	// Mode 0: show, Mode 1: Hide
	main_closeFileList();
	if (mode === 0){
		if (id !== undefined){
			$('#RDT_openFileList').css({'display': 'none'});
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
			//
			document.getElementById('RDT-lbl-3DPropID-edit').innerHTML = PROP_ID;
			document.getElementById('RDT_edit_3DProp_X').value = PROP_XPOS;
			document.getElementById('RDT_edit_3DProp_Y').value = PROP_ZPOS;
			document.getElementById('RDT_edit_3DProp_Z').value = PROP_YPOS;
			document.getElementById('RDT_edit_3DProp_R').value = PROP_RPOS;
			document.getElementById('RDT_edit_3DProp_iLink').value = PROP_ITEMLINK.toUpperCase();
			document.getElementById('RDT_edit_3DProp_Extra').value = PROP_EXTRA.toUpperCase();
			//
			document.getElementById('RDT-btn-aplicar3DProp').onclick = function(){
				RDT_3D_PROP_APPLY(id);
			}
			$('#RDT-3D_props-Edit').css({'display': 'inline'});
			$('#RDT_3DProps_holder').css({'width': '722px'});
		}
	} else {
		$('#RDT_openFileList').css({'display': 'inline'});
		$('#RDT_3DProps_holder').css({'width': '1293px'});
		$('#RDT-3D_props-Edit').css({'display': 'none'});
	}
}
// MSGS
function RDT_renderMSGInfos(){
	if (RDT_fm_avaliable === true){
		$('#RDT-aba-menu-7').css({'display': 'inline'});
		$('#RDT-aba-menu-2').css({'display': 'inline'});
		$('#RDT_mainMenu_msgInfo').css({'display': 'block'});
		$('#RDT_mainMenu_msgSeekMenu').css({'display': 'none'});
		$('#RDT_mainMenu_mapFilePath').css({'display': 'block'});
		$('#RDT_mainMenu_totalMsgLbl').css({'display': 'block'});
		// Only render this info if the file is avaliable
		document.getElementById('RDT_mapFileName').innerHTML = RDT_fm_path;
		document.getElementById('RDT_lbl-totMsg').innerHTML = RDT_totalMessages;
		document.getElementById('RDT_lbl-totalMsg').innerHTML = RDT_totalMessages;
		document.getElementById('RDT-aba-menu-2').value = 'Message Block (' + RDT_totalMessages + ')';
		document.getElementById('RDT_lbl-msg_blockHex').innerHTML = '(Hex: ' + RDT_MSGTEXT_MAXSIZE + ' - String: ' + parseInt(RDT_MSGTEXT_MAXSIZE, 16) + ')';
		document.getElementById('RDT_lbl-msg_pointerSplit').innerHTML = RDT_MSGTEXT_POINTERS.match(/.{4,4}/g).reverse().toString().replace(new RegExp(',', 'gi'), ' ').toUpperCase();
	} else {
		$('#RDT-aba-menu-2').css({'display': 'none'});
		$('#RDT-aba-menu-7').css({'display': 'none'});
		$('#RDT_mainMenu_msgInfo').css({'display': 'none'});
		$('#RDT_mainMenu_totalMsgLbl').css({'display': 'none'});
		$('#RDT_mainMenu_mapFilePath').css({'display': 'none'});
		$('#RDT_mainMenu_msgSeekMenu').css({'display': 'block'});
	}
	//
	if (RDT_ARD_tempExclude.indexOf(RDT_mapName) !== -1){
		$('#RDT-aba-menu-7').css({'display': 'none'});
		$('#RDT-aba-menu-2').css({'display': 'none'});
		$('#RDT_mainMenu_msgInfo').css({'display': 'none'});
		$('#RDT_mainMenu_totalMsgLbl').css({'display': 'none'});
		$('#RDT_mainMenu_mapFilePath').css({'display': 'none'});
		$('#RDT_mainMenu_msgSeekMenu').css({'display': 'none'});
	}
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
function RDT_canvasResetPos(){
	document.getElementById('RDT_slider_X').value = 0;
	document.getElementById('RDT_slider_Y').value = 0;
	document.getElementById('RDT_slider_Z').value = 0;
	document.getElementById('RDT_slider_R').value = 0;
	document.getElementById('RDT_slider_D').value = 0;
	document.getElementById('RDT_slider_D2').value = 0;
	document.getElementById('RDT_lbl_pd').innerHTML = '0';
	document.getElementById('RDT_lbl_pd2').innerHTML = '0';
	RDT_updateCanvasInfos(0);
}
function RDT_showEditCamera(index, camEdit){
	var CAM_IMG, titleFileName;
	var CAM_ID = camEdit;
	if (CAM_ID.length < 2){
		CAM_ID = '0' + CAM_ID;
	}
	$('#RDT_openFileList').css({'display': 'none'});
	var camFile = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + RDT_mapName + CAM_ID + '.JPG';
	if (fs.existsSync(camFile) === true){
		CAM_IMG = camFile;
		CAM_lbl_fileName = getFileName(camFile).toUpperCase();
		titleFileName = 'Cam: ' +  CAM_ID + '\nFile name: ' + RDT_mapName + CAM_ID + '.JPG';
	} else {
		CAM_lbl_fileName = 'Unknown';
		CAM_IMG = APP_PATH + '\\App\\Img\\404.png';
		titleFileName = 'Unable to render cam preview!\nFile not found (404)';
	}
	document.getElementById('RDT_editCamera_iconPreviewImg').src = CAM_IMG;
	document.getElementById('RDT_editCamera_iconPreviewImg').title = titleFileName;
	document.getElementById('RDT_lbl_camEdit_camName').innerHTML = CAM_lbl_fileName;
	var codeHex = localStorage.getItem('RDT_Camera-' + index.toString());
	document.getElementById('RDT-lbl-CAMERA-index').innerHTML = index;
	document.getElementById('RDT-lbl-CAMERA-edit').innerHTML  = camEdit;
	document.getElementById('RDT_editCamera_camType').value = codeHex.slice(RANGES['RDT_cam-0-type'][0],     			 RANGES['RDT_cam-0-type'][1]);
	document.getElementById('RDT_editCam_ident').value      = codeHex.slice(RANGES['RDT_cam-0-ident'][0],    			 RANGES['RDT_cam-0-ident'][1]);
	document.getElementById('RDT_XP_Origin-edit').value 	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-XPos'][0],     RANGES['RDT_cam-0-XPos'][1]));
	document.getElementById('RDT_XPS_Origin-edit').value 	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-XPos-Sig'][0], RANGES['RDT_cam-0-XPos-Sig'][1]));
	document.getElementById('RDT_YP_Origin-edit').value 	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-YPos'][0], 	 RANGES['RDT_cam-0-YPos'][1]));
	document.getElementById('RDT_YPS_Origin-edit').value 	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-YPos-Sig'][0], RANGES['RDT_cam-0-YPos-Sig'][1]));
	document.getElementById('RDT_ZP_Origin-edit').value 	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-ZPos'][0], 	 RANGES['RDT_cam-0-ZPos'][1]));
	document.getElementById('RDT_ZPS_Origin-edit').value 	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-ZPos-Sig'][0], RANGES['RDT_cam-0-ZPos-Sig'][1]));
	document.getElementById('RDT_XD_Direction-edit').value 	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-XDir'][0], 	 RANGES['RDT_cam-0-XDir'][1]));
	document.getElementById('RDT_XDS_Direction-edit').value = parseEndian(codeHex.slice(RANGES['RDT_cam-0-XDir-Sig'][0], RANGES['RDT_cam-0-XDir-Sig'][1]));
	document.getElementById('RDT_YD_Direction-edit').value 	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-YDir'][0], 	 RANGES['RDT_cam-0-YDir'][1]));
	document.getElementById('RDT_YDS_Direction-edit').value = parseEndian(codeHex.slice(RANGES['RDT_cam-0-YDir-Sig'][0], RANGES['RDT_cam-0-YDir-Sig'][1]));
	document.getElementById('RDT_ZD_Direction-edit').value 	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-ZDir'][0], 	 RANGES['RDT_cam-0-ZDir'][1]));
	document.getElementById('RDT_ZDS_Direction-edit').value	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-ZDir-Sig'][0], RANGES['RDT_cam-0-ZDir-Sig'][1]));
	document.getElementById('RDT_RD_Direction-edit').value 	= parseEndian(codeHex.slice(RANGES['RDT_cam-0-RDir'][0], 	 RANGES['RDT_cam-0-RDir'][1]));
	document.getElementById('RDT_RDS_Direction-edit').value = parseEndian(codeHex.slice(RANGES['RDT_cam-0-RDir-Sig'][0], RANGES['RDT_cam-0-RDir-Sig'][1]));
	document.getElementById('RDT-btn-applyCam').onclick = function(){
		RDT_CAMERA_APPLY(index);
	}
	$('#RDT-camera-Edit').css({'display': 'inline'});
	$('#RDT_camera_holder').css({'display': 'none'});
}
function RDT_showEditMsgCode(index, codeHex){
	$('#RDT_openFileList').css({'display': 'none'});
	$('#RDT_msgCode_holder').css({'display': 'none'});
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
		$('#RDT-MSGCODE-Edit').css({'display': 'inline'});
		document.getElementById('RDT-btn-aplicarMSGCODE').onclick = function(){
			RDT_MSGCODE_APPLY(index);
		}
	} else {
		RDT_editItemCancel();
		var warnMSG = 'This message code contains a WIP header (64)';
		alert('INFO - Unable to edit this message code! (For now!)\n\n' + warnMSG);
		LOG_addLog('warn', 'MAP - WARN: ' + warnMSG);
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
	$('#RDT_enemy_holder').css({'display': 'none'});
}
function RDT_showEditDoor(index, id, hex){
	var nextCam;
	var realStage;
	var roomNumber;
	var DOOR_READ_MODE;
	main_closeFileList();
	$('#RDT_openFileList').css({'display': 'none'});
	document.getElementById('RDT_door-edit-NC').innerHTML = '';
	document.getElementById('RDT-lbl-doorEdit-id').innerHTML = id;
	document.getElementById('RDT-lbl-door-index').innerHTML	= index;
	$('#RDT_door_edit_usePlayerPos_div').css({'margin-top': '40px'});
	$('#RDT_door_edit_copyPasteOptions_div').css({'margin-top': '40px'});
	// Check if header === 61 || 62
	var header = hex.slice(0, 2);
	if (header === '61'){
		DOOR_READ_MODE = 0;
	} else {
		DOOR_READ_MODE = 1;
	}
	document.getElementById('RDT_lbl_door_header').innerHTML  = header.toUpperCase(); 
	nextCam 											 	  = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextCamNumber'][0],  			    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextCamNumber'][1]);
	roomNumber 											 	  = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextRoomNumber'][0], 			    RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextRoomNumber'][1]).toUpperCase();
	realStage 											 	  = parseInt(parseInt(hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextStage'][0], RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextStage'][1]), 16) + 1).toString();
	document.getElementById('RDT_door-edit-LK').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorKey'][0], 	    				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorKey'][1]);
	document.getElementById('RDT_door-edit-X').value  	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorXpos'][0],	    				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorXpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-Y').value  	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorZpos'][0],	    				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorZpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-Z').value  	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorYpos'][0],	    				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorYpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-R').value  	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorRpos'][0], 	    				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorRpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-DT').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorType'][0], 	    				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorType'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-NX').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextXpos'][0],    				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextXpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-NY').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextYpos'][0],    				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextYpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-NZ').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextZpos'][0],    				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextZpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-NR').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextRpos'][0],    				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextRpos'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-NS').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextStage'][0],   				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorNextStage'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-OO').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorOpenOrient'][0],  				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorOpenOrient'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-LF').value 	      = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorLockedFlag'][0],  				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorLockedFlag'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-DispTxt').value	  = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorDisplayText'][0], 				RANGES['RDT_door-' + DOOR_READ_MODE + '-doorDisplayText'][1]).toUpperCase();
	document.getElementById('RDT_door-edit-zIndex').value 	  = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-zIndex'][0], 							RANGES['RDT_door-' + DOOR_READ_MODE + '-zIndex'][1]);
	document.getElementById('RDT_door-edit-UNKFLAG_B').value  = hex.slice(RANGES['RDT_door-' + DOOR_READ_MODE + '-doorHexOffset1'][0], 					RANGES['RDT_door-' + DOOR_READ_MODE + '-doorHexOffset1'][1]);
	document.getElementById('RDT_door-edit-NC-TXT').value 	  = nextCam.toUpperCase();
	//
	document.getElementById('RDT_door-edit-NRN').value = roomNumber;
	RDT_renderNextRDTLbl();
	if (RDT_ARD_compatMode === true){
		$('#RDT_door-edit-NC').css({'display': 'none'});
		$('#RDT_door-edit-NC-TXT').css({'display': 'inline'});
	} else {
		$('#RDT_door-edit-NC').css({'display': 'inline'});
		$('#RDT_door-edit-NC-TXT').css({'display': 'none'});
	}
	document.getElementById('RDT-btn-aplicarDoor').onclick = function(){
		RDT_DOOR_APPLY(index);
	}
	if (RDT_ARD_compatMode === false){
		document.getElementById('RDT_door-edit-NC').value = nextCam.toUpperCase();
	}
	if (enable_mod === true){
		RDT_renderEditDoorCamPreview();
	}
	$('#RDT-door-Edit').css({'display': 'block'});
	$('#RDT_door_holder').css({'display': 'none'});
}
function RDT_enemyNPCValidateInput(){
	var emd = document.getElementById('RDT_selectEnemyNPC').value;
	var emdName = 'EM' + emd.toUpperCase();
	document.getElementById('RDT_lbl_enemyNPC_edit_EMD').innerHTML = emdName;
	document.getElementById('RDT-lbl-enemyNPC-edit').innerHTML = RDT_EMDNAME[emd];
}
function RDT_renderNextRDTLbl(){
	var c = 0;
	var rst = parseInt(parseInt(document.getElementById('RDT_door-edit-NS').value) + 1).toString();
	var nrn = document.getElementById('RDT_door-edit-NRN').value;
	if (nrn.length === 2 && rst.length === 1){
		var rComp = 'R' + rst.toUpperCase() + nrn.toUpperCase();
		document.getElementById('RDT_lbl_door_nextRDT').innerHTML = rComp + '.' + RDT_fileType;
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
				$('#RDT_doorCamPreviewImg').css({'display': 'inline'});
			} else {
				document.getElementById('RDT_doorCamPreviewImg').src = APP_PATH + '/App/img/404.png';
				$('#RDT_door-edit-NC').append('<option disabled>No Cam Avaliable</option>');
			}
			RDT_renderEditDoorCamPreview();
		}
	}
}
function RDT_editItem_renderIconPreview(){
	var IC = document.getElementById('RDT-item-select').value;
	$('#RDT_EDIT_ITEM_BG').css({'background-image': 'url("Img/items/details/' + IC + '.png")'});
	document.getElementById('RDT_editItem_itemIconPreview').title = '(' + IC.toUpperCase() + ') ' + ITEM[IC][0];
	document.getElementById('RDT_editItem_itemIconPreview').src = APP_PATH + '\\App\\Img\\items\\' + IC.toLowerCase() + '.png';
}
function RDT_renderEditDoorCamPreview(){
	var nrn = document.getElementById('RDT_door-edit-NRN').value;
	var rst = parseInt(parseInt(document.getElementById('RDT_door-edit-NS').value, 16) + 1).toString();
	var rComp = 'R' + rst.toUpperCase() + nrn.toUpperCase();
	if (RDT_ARD_compatMode !== true){
		document.getElementById('RDT_door-edit-NC-TXT').value = document.getElementById('RDT_door-edit-NC').value.toString();
	}
	var nCam = document.getElementById('RDT_door-edit-NC-TXT').value.toString();
	if (nCam.length === 2){
		var camFileCss = '../Assets/DATA_A/BSS/' + rComp + nCam + '.JPG';
		var camFile = APP_PATH + '\\Assets\\DATA_A\\BSS\\' + rComp + nCam + '.JPG';
		if (fs.existsSync(camFile) === true){
			document.getElementById('RDT_doorCamPreviewImg').src = camFile;
			$('#RDT_doorEdit_bgCam').css({'background-image': 'url("' + camFileCss + '")'});
		} else {
			if (RDT_ARD_compatMode !== true){
				LOG_addLog('warn', 'WARN - Unable to render Next Cam: The img file was not found! (ERROR 404 - File: ' + camFile + ')');
				LOG_scroll();
			}
			$('#RDT_door-edit-NC').append('<option disabled>No Cam Avaliable</option>');
			$('#RDT_doorEdit_bgCam').css({'background-image': 'url("../img/404.png")'});
			document.getElementById('RDT_doorCamPreviewImg').src = APP_PATH + '/App/img/404.png';
		}
	} else {
		$('#RDT_door-edit-NC').append('<option disabled>No Cam Avaliable</option>');
		$('#RDT_doorEdit_bgCam').css({'background-image': 'url("../img/404.png")'});
		document.getElementById('RDT_doorCamPreviewImg').src = APP_PATH + '/App/img/404.png';
	}
}
function RDT_TRANSFER_RDT_TO_MSG(){
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
	var hex, nome, posX, posY, posZ, posR, anim, quant, iFlag, modelId;
	//
	var header  = itemHx.slice(RANGES['RDT_item-header'][0], 			    RANGES['RDT_item-header'][1]);
	var index   = itemHx.slice(RANGES['RDT_item-itemIdetifier'][0], 	    RANGES['RDT_item-itemIdetifier'][1]);
	if (header === '67'){
		posX    = itemHx.slice(RANGES['RDT_item-0-itemXX'][0],   		    RANGES['RDT_item-0-itemXX'][1]);
		posY    = itemHx.slice(RANGES['RDT_item-0-itemYY'][0],   		    RANGES['RDT_item-0-itemYY'][1]);
		posZ    = itemHx.slice(RANGES['RDT_item-0-itemZZ'][0],   		    RANGES['RDT_item-0-itemZZ'][1]);
		posR    = itemHx.slice(RANGES['RDT_item-0-itemRR'][0],   		    RANGES['RDT_item-0-itemRR'][1]);
		hex     = itemHx.slice(RANGES['RDT_item-0-itemID'][0],   		    RANGES['RDT_item-0-itemID'][1]);
		quant   = parseInt(itemHx.slice(RANGES['RDT_item-0-itemQuant'][0],  RANGES['RDT_item-0-itemQuant'][1]), 16);
		iFlag   = itemHx.slice(RANGES['RDT_item-0-itemFlag'][0], 		    RANGES['RDT_item-0-itemFlag'][1]);
		modelId = itemHx.slice(RANGES['RDT_item-0-modelID'][0],  		    RANGES['RDT_item-0-modelID'][1]);
		anim    = itemHx.slice(RANGES['RDT_item-0-itemMP'][0],   		    RANGES['RDT_item-0-itemMP'][1]);
	}
	if (header === '68'){
		posX    = '[WIP]'; //itemHx.slice(RANGES['RDT_item-1-itemXX'][0],   RANGES['RDT_item-1-itemXX'][1]);
		posY    = '[WIP]'; //itemHx.slice(RANGES['RDT_item-1-itemYY'][0],   RANGES['RDT_item-1-itemYY'][1]);
		posZ    = '[WIP]'; //itemHx.slice(RANGES['RDT_item-1-itemZZ'][0],   RANGES['RDT_item-1-itemZZ'][1]);
		posR    = '[WIP]'; //itemHx.slice(RANGES['RDT_item-1-itemRR'][0],   RANGES['RDT_item-1-itemRR'][1]);
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
		$('#RDT-iEditOther').css({'top': '266px'});
		$('#RDT_btnEditPos').css({'top': '178px'});
		$('#RDT-edit-map-select').addClass('none');
		$('#RDT-edit-file-select').addClass('none');
		$('#RDT-edit-item-select').removeClass('none');
		$('#RDT-item-editOtherFix').css({'top': '266px'});
		document.getElementById('RDT-item-select').value = hex;
		$('#RDT_EDIT_ITEM_BG').css({'display': 'block', 'background-image': 'url(Img/items/details/' + hex + '.png)'});
	} else {
		$('#RDT_btnEditPos').css({'top': '140px'});
		$('#RDT-iEditOther').css({'top': '229px'});
		$('#RDT_EDIT_ITEM_BG').css({'display': 'none', 'background-image': 'url()'});
	}
	// File
	if (id === 2){
		nome = FILES[hex][0];
		$('#RDT-edit-map-select').addClass('none');
		$('#RDT-edit-item-select').addClass('none');
		$('#RDT-edit-file-select').removeClass('none');
		document.getElementById('RDT-file-select').value = hex;
	}
	// Map
	if (id === 3){
		nome = RDT_MAPAS[hex][0];
		$('#RDT-edit-item-select').addClass('none');
		$('#RDT-edit-file-select').addClass('none');
		$('#RDT-edit-map-select').removeClass('none');
		document.getElementById('RDT-map-select').value = hex;
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
	$('#RDT-Item-Edit').css({'display': 'inline', 'margin-left': '4px'});
	if (header === '68'){
		$('#RDT_btnEditPos').css({'display': 'none'});
	} else {
		$('#RDT_btnEditPos').css({'display': 'block'});
	}
	RDT_editItem_renderIconPreview();
}
function RDT_editItemCancel(){
	main_closeFileList();
	if (enable_mod === true){
		$('#RDT_openFileList').css({'display': 'inline'});
	}
	$('#RDT-Item-Edit').css({'display': 'none'});
	$('#RDT-door-Edit').css({'display': 'none'});
	$('#RDT-camera-Edit').css({'display': 'none'});
	$('#RDT-MSGCODE-Edit').css({'display': 'none'});
	$('#RDT-enemyNPC-Edit').css({'display': 'none'});
	//
	$('#RDT-item-list').css({'display': 'block'});
	$('#RDT_door_holder').css({'display': 'block'});
	$('#RDT_enemy_holder').css({'display': 'block'});
	$('#RDT_camera_holder').css({'display': 'block'});
	$('#RDT_msgCode_holder').css({'display': 'block'});
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
		$('#RDT_LIVESTATUS').css({'display': 'inline'});
		$('#MSG_LIVESTATUS').css({'display': 'inline'});
		$('#SAV_LIVESTATUS').css({'display': 'inline'});
		$('#main_LIVESTATUS').css({'display': 'inline'});
		$('#fileGen_LIVESTATUS').css({'display': 'inline'});
		$('#RE3SET_startPos_LIVESTATUS').css({'display': 'inline'});
		// Another Buttons
		$('#RDT_useJillPos_Item').css({'display': 'inline'});
		$('#RDT_door_usePlayerPos').css({'display': 'inline'});
		$('#RDT_useJillPos_3DProp').css({'display': 'inline'});
		$('#RDT_EMD_usePlayerPosBtn').css({'display': 'inline'});
	}
}
function R3ditor_disableLiveStatusButton(){
	RDT_enableDisableDoorUsePlayerPos(1);
	$('#RDT_LIVESTATUS').css({'display': 'none'});
	$('#MSG_LIVESTATUS').css({'display': 'none'});
	$('#SAV_LIVESTATUS').css({'display': 'none'});
	$('#main_LIVESTATUS').css({'display': 'none'});
	$('#fileGen_LIVESTATUS').css({'display': 'none'});
	$('#RE3SET_startPos_LIVESTATUS').css({'display': 'none'});
	// Another Buttons
	$('#RDT_useJillPos_Item').css({'display': 'none'});
	$('#RDT_door_usePlayerPos').css({'display': 'none'});
	$('#RDT_useJillPos_3DProp').css({'display': 'none'});
	$('#RDT_EMD_usePlayerPosBtn').css({'display': 'none'});
}
function RDT_enableDisableDoorUsePlayerPos(mode){
	if (mode === 0){
		$('#RDT_door_edit_usePlayerPos_div').css({'display': 'block'});
		$('#RDT_door_edit_copyPasteOptions_div').css({'display': 'none'});
	}
	if (mode === 1){
		$('#RDT_door_edit_usePlayerPos_div').css({'display': 'none'});
		$('#RDT_door_edit_copyPasteOptions_div').css({'display': 'block'});
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
		document.getElementById('RDT_door-edit-NX').value     = REALTIME_X_Pos;
		document.getElementById('RDT_door-edit-NY').value     = REALTIME_Y_Pos;
		document.getElementById('RDT_door-edit-NZ').value     = REALTIME_Z_Pos;
		document.getElementById('RDT_door-edit-NR').value     = REALTIME_R_Pos;
		document.getElementById('RDT_door-edit-zIndex').value = REALTIME_zIndex;
		document.getElementById('RDT_door-edit-NRN').value    = REALTIME_CurrentRoomNumber;
		document.getElementById('RDT_door-edit-NS').value     = '0' + (parseInt(REALTIME_CurrentStage) - 1);
		document.getElementById('RDT_door-edit-NC-TXT').value = REALTIME_CurrentCam.toUpperCase();
		if (enable_mod === true){
			document.getElementById('RDT_door-edit-NC').value = REALTIME_CurrentCam.toUpperCase();
		}
		RDT_renderEditDoorCamPreview();
	}
	RDT_enableDisableDoorUsePlayerPos(1);
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
		if (cRDT !== RE3_LIVE_prevRDT && REALTIME_CurrentRDT !== undefined){
			document.getElementById('RE3_LIVESTATUS_lbl_CurrentRDT').innerHTML = REALTIME_CurrentRDT + '.RDT';
			document.getElementById('RE3_LIVESTATUS_lbl_CurrentRDT').title = RDT_locations[REALTIME_CurrentRDT][0];
			document.getElementById('RE3_LIVESTATUS_lbl_CurrentRoomNumber').innerHTML = REALTIME_CurrentRoomNumber;
			document.getElementById('RE3_LIVESTATUS_lbl_OriginalLocalName').innerHTML = RDT_locations[REALTIME_CurrentRDT][0];
			document.getElementById('RE3_LIVESTATUS_lbl_OriginalCityLocation').innerHTML = CIDADE[MEMORY_JS_fixVars(parseInt(REALTIME_CurrentStage - 1), 2)][1];
			RE3_LIVE_prevRDT = cRDT;
		}
		var enableInfiniteLife = document.getElementById('RE3_LIVESTATUS_CHEAT_INFHP').checked;
		if (enableInfiniteLife === true){
			RE3_LIVE_cheatInfiniteLife();
		}
		// Player Icon
		var currentPlayer = REALTIME_CurrentPlayer;
		if (currentPlayer !== PREV_PLAYER){
			if (currentPlayer !== '01' && currentPlayer !== '02'){
				$('#RE3_LIVESTATUS_currentPlayerIcon').css({'display': 'none'});
				$('#RE3_LIVESTATUS_currentPlayerImgDiv').css({'background-image': 'linear-gradient(to right, #00000000, #00000000)'});
			} else {
				$('#RE3_LIVESTATUS_currentPlayerIcon').css({'display': 'inline'});
				$('#RE3_LIVESTATUS_currentPlayerImgDiv').css({'background-image': 'linear-gradient(to right, #00000000, #00005d1f)'});
			}
			if (currentPlayer === '01'){
				document.getElementById('RE3_LIVESTATUS_currentPlayerIcon').src = APP_PATH + '\\App\\Img\\JILL-ICON.png';
			}
			if (currentPlayer === '02'){
				document.getElementById('RE3_LIVESTATUS_currentPlayerIcon').src = APP_PATH + '\\App\\Img\\CARLOS-ICON.png';
			}
			PREV_PLAYER = REALTIME_CurrentPlayer;
		}
		// End
		document.getElementById('RE3_LIVESTATUS_lbl_pStatus').innerHTML = processBIO3HP(REALTIME_CurrentHP)[1];
		document.getElementById('RE3_LIVESTATUS_lbl_pCurrentWeapon').innerHTML = WEAPONS[REALTIME_CurrentWeapon][0];
		document.getElementById('RE3_LIVESTATUS_lbl_pCurrentPlayer').innerHTML = RE3_playerList[REALTIME_CurrentPlayer];
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
		var itemTitle  = '(' + itemHex.toUpperCase() + ') ' + ITEM[itemHex][0] + '\nClick to edit this slot';
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
				var IT_css = ATTR[attr][3];
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
				$('#RE3_LIVESTATUS_LBL_ITEM-' + n).css({'display': IT_css, 'color': cor, 'text-shadow': shad});
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
		document.getElementById('RDT_LIVESTATUS_toolBar_zI').innerHTML = REALTIME_zIndex;
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
	INI_aba_atual = menuId;
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
	MIX Editor
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
	$('#img-logo').css({'display': 'none'});
	while (c < (MIX_totalMenus + 1)){
		$('#MIX-MENU-' + c).css({'display': 'none'});
		$('#MIX-aba-menu-' + c).removeClass('aba-select');
		c++;
	}
	MIX_showEdit(1);
	MIX_updateMainTabsTitle();
	$('#menu-mix-editor').css({'display': 'block'});
	$('#MIX-MENU-' + menuId).css({'display': 'block'});
	$('#MIX-aba-menu-' + menuId).addClass('aba-select');
	$('#log-programa').css({'top': '626px', 'height': '82px'});
	document.title = APP_NAME + ' - MIX Editor (Version: ' + MIX_fileTypes[MIX_fName][0] + ') - File: ' + ORIGINAL_FILENAME;
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
		$('#MIX-item-edit-' + parseInt(funcMode)).css({'display': 'block', 'width': '553px', 'left': '750px'});
		MIX_RENDER_PREVIEW();
	} else {
		var c = 0;
		while(c < 8){
			$('#MIX-item-edit-' + c).css({'display': 'none'});
			$('#MIX-holder-' + c).css({'width': '1294px'});
			c++;
		}
	}
}
function MIX_RENDER_PREVIEW(){
	var Item_A, Item_B, Item_C, Item_D, Item_Res;
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
	RE3SET Editor
*/
function RE3SET_showMenu(menuId){
	var c = 0;
	RE3SET_currentMenu = menuId;
	while (c < (RE3SET_totalMenus + 1)){
		$('#RE3SET-menu-' + c).css({'display': 'none'});
		$('#RE3SET-aba-menu-' + c).removeClass('aba-select');
		c++;
	}
	$('#img-logo').css({'display': 'none'});
	$('#menu-RE3SET-editor').css({'display': 'block'});
	$('#RE3SET-menu-' + menuId).css({'display': 'block'});
	$('#RE3SET-aba-menu-' + menuId).addClass('aba-select');
	$('#log-programa').css({'top': '626px', 'height': '82px'});
	document.title = APP_NAME + ' - RE3SET Editor (Game Settings) - Mode: ' + DROP_fileTypes[RE3SET_fName][0] + ' - File: ' + ORIGINAL_FILENAME;
	LOG_scroll();
}
// Start Position
function RE3SET_startPos_updateImgBg(){
	var NX_CAM = document.getElementById('RE3SET_EDIT_STARTPOS_ROOMCAM').value.toUpperCase();
	var NX_ROOM = document.getElementById('RE3SET_EDIT_STARTPOS_ROOMNUMBER').value.toUpperCase();
	if (NX_ROOM !== '' && NX_CAM !== ''){
		var nextCamImg;
		if (NX_CAM.length === 2 && NX_ROOM.length === 2 && enable_mod === true){
			nextCamImg = APP_PATH + '\\Assets\\DATA_A\\BSS\\R1' + NX_ROOM + NX_CAM + '.JPG';
			if (fs.existsSync(nextCamImg) !== false){
				document.getElementById('RE3SET_EDIT_STARTPOS_IMG_CAMPREV').src = nextCamImg;
				document.getElementById('RE3SET_EDIT_STARTPOS_IMG_CAMPREV').title = 'Map: R1' + NX_ROOM + '.RDT\nCam: ' + NX_CAM;
				$('#RE3SET_STARTPOS_IMG_BG').css({'background-image': 'url(../Assets/DATA_A/BSS/R1' + NX_ROOM + NX_CAM + '.JPG)'});
			} else {
				nextCamImg = APP_PATH + '\\App\\Img\\404.png';
				$('#RE3SET_STARTPOS_IMG_BG').css({'background-image': 'url()'});
				document.getElementById('RE3SET_EDIT_STARTPOS_IMG_CAMPREV').title = '';
				document.getElementById('RE3SET_EDIT_STARTPOS_IMG_CAMPREV').src = nextCamImg;
				LOG_addLog('warn', 'WARN - Unable to find cam file! (File: ' + NX_ROOM + NX_CAM + '.JPG)');
			}
		} else {
			nextCamImg = APP_PATH + '\\App\\Img\\404.png';
			$('#RE3SET_STARTPOS_IMG_BG').css({'background-image': 'url()'});
			document.getElementById('RE3SET_EDIT_STARTPOS_IMG_CAMPREV').title = '';
			document.getElementById('RE3SET_EDIT_STARTPOS_IMG_CAMPREV').src = nextCamImg;
		}
	}
	LOG_scroll();
}
// Start Items
function RE3SET_itemStart_showEdit(mode){
	// 0: Show, 1: Hide
	if (mode === 0){
		RE3SET_edit_updateTextInfo();
		if (DESIGN_ENABLE_ANIMS !== true){
			$('#RE3SET_DIV_itemsAllHolder').css({'left': '12px'});
			$('#RE3SET_EDIT_ITEMSTART_HOLDER').css({'display': 'block'});
		} else {
			$('#RE3SET_EDIT_ITEMSTART_HOLDER').fadeIn({duration: 200, queue: false});
			$('#RE3SET_DIV_itemsAllHolder').animate({'left': '12px'}, {duration: 180, queue: false});
		}
	} else {
		if (DESIGN_ENABLE_ANIMS !== true){
			$('#RE3SET_DIV_itemsAllHolder').css({'left': '222px'});
			$('#RE3SET_EDIT_ITEMSTART_HOLDER').css({'display': 'none'});
		} else {
			$('#RE3SET_EDIT_ITEMSTART_HOLDER').fadeOut({duration: 200, queue: false});
			$('#RE3SET_DIV_itemsAllHolder').animate({'left': '222px'}, {duration: 180, queue: false});
		}
	}
}
function RE3SET_edit_updateTextInfo(){
	var IT = document.getElementById('RE3SET_EDIT_ITEMSTART_IT').value;
	if (IT !== '00'){
		$('#RE3SET_ITEMSTART_infos').css({'display': 'block'});
		document.getElementById('RE3SET_EDIT_LBL_ITEMDESC').innerHTML = ITEM[IT][1];
	} else {
		$('#RE3SET_ITEMSTART_infos').css({'display': 'none'});
	}
	$('#RE3SET_BG_ITEMSTARTEDIT').css({'background-image': 'url(Img/items/details/' + IT + '.png)'});
}
/*
	DROP Editor
*/
function DROP_showMenu(){
	document.title = APP_NAME + ' - DROP (Nemesis Item Drop Editor) - Mode: ' + DROP_fileTypes[DROP_fName][0] + ' - File: ' + ORIGINAL_FILENAME;
	$('#log-programa').css({'top': '626px', 'height': '82px'});
	$('#menu-DROP-editor').css({'display': 'block'});
	$('#img-logo').css({'display': 'none'});
	LOG_scroll();
}
function DROP_showEdit(mode, id, hex, quant){
	if (mode === 0){
		$('#DROP-holder').css({'width': '728px'});
		document.getElementById('DROP_EDIT_ITEM').value = hex;
		document.getElementById('DROP_edit_lbl_itemID').innerHTML = (id + 1);
		document.getElementById('DROP_EDIT_QUANT').value = parseInt(quant, 16);
		document.getElementById('DROP_edit_lbl_itemName').innerHTML = ITEM[hex][0];
		$('#DROP_ITEM_edit').css({'display': 'inline', 'width': '550px', 'left': '750px', 'top': '49px'});
		document.getElementById('DROP_editApplyBtn').onclick = function(){
			DROP_checkValues(id);
		}
	} else {
		$('#DROP_ITEM_edit').css({'display': 'none'});
		$('#DROP-holder').css({'width': '1298px'});
	}
}
/*
	IEDIT Editor
*/
function IEDIT_showMenu(){
	document.title = APP_NAME + ' - IEDIT (Item Editor) - Mode: ' + IEDIT_fileTypes[IEDIT_fileName][0] + ' - File: ' + ORIGINAL_FILENAME;
	$('#log-programa').css({'top': '626px', 'height': '82px'});
	$('#menu-IEDIT-editor').css({'display': 'block'});
	$('#img-logo').css({'display': 'none'});
	LOG_scroll();
}
function IEDIT_showEdit(mode, id, hex){
	if (mode === 0){
		var itHex = id.toString(16);
		if (itHex.length < 2){
			itHex = '0' + itHex;
		}
		document.getElementById('IEDIT_edit_lbl_itemID').innerHTML = id;
		document.getElementById('IEDIT_edit_lbl_itemName').innerHTML = ITEM[itHex][0];
		document.getElementById('IEDIT_edit_itemType').value = hex.slice(RANGES['IEDIT_ITEM_TYPE'][0], RANGES['IEDIT_ITEM_TYPE'][1]);
		document.getElementById('IEDIT_edit_itemQuantity').value = parseInt(hex.slice(RANGES['IEDIT_MAX_CAPACITY'][0], RANGES['IEDIT_MAX_CAPACITY'][1]), 16);
		document.getElementById('IEDIT_edit_itemCodeQuest').value = hex.slice(RANGES['IEDIT_CODE_QUEST'][0], RANGES['IEDIT_CODE_QUEST'][1]);
		document.getElementById('IEDIT_edit_itemDisplayMode').value = hex.slice(RANGES['IEDIT_DISPLAY_MODE'][0], RANGES['IEDIT_DISPLAY_MODE'][1]);
		document.getElementById('IEDIT_editApplyBtn').onclick = function(){
			IEDIT_applyChanges(id);
		}
		$('#IEDIT-holder').css({'width': '728px'});
		$('#IEDIT_ITEM_edit').css({'display': 'inline', 'left': '750px', 'width': '550px', 'top': '50px'});
	} else {
		$('#IEDIT_ITEM_edit').css({'display': 'none'});
		$('#IEDIT-holder').css({'width': '1298px'});
	}
}
/*
	R3 Patcher
*/
function PATCHER_showMenu(){
	$('#img-logo').css({'display': 'none'});
	$('#menu-topo-MOD').css({'display': 'none'});
	if (DESIGN_ENABLE_ANIMS === false){
		$('#R3_Patcher_main_menu').css({'display': 'inline', 'height': '400px', 'top': '124px'});
	} else {
		$('#R3_Patcher_main_menu').fadeIn({duration: 200, queue: false});
		$('#R3_Patcher_main_menu').animate({'top': '124px', 'height': '400px'}, {duration: 240, queue: false});
	}
}
function PATCHER_showNotice(noticeTxt, mode){
	// Mode 0: Sucess, 1: Error
	if (mode === 0){
		$('#R3_PATCHER_notice').css({'text-shadow': '0 0 8px #00ff0075'});
		$('#R3_Patcher_main_menu').css({'box-shadow': '0 0 30px #00ff003d'});
	} else {
		$('#R3_PATCHER_notice').css({'text-shadow': '0 0 8px #ff000075'});
		$('#R3_Patcher_main_menu').css({'box-shadow': '0 0 30px #ff00008a'});
	}
	$('#R3_Patcher_main_menu').css({'height': '120px', 'top': '270px'});
	document.getElementById('R3_PATCHER_notice').innerHTML = '<center>' + noticeTxt + '</center>';
	if (DESIGN_ENABLE_ANIMS === true){
		$('#R3_PATCHER_notice').fadeIn({duration: 200, queue: false});
		$('#R3_Patcher_details_holder').slideUp({duration: 200, queue: false});
	} else {
		$('#R3_PATCHER_notice').css({'display': 'inline'});
		$('#R3_Patcher_details_holder').css({'display': 'none'});
	}
	$('#R3_PATCHER_btn_apply').css({'display': 'none'});
	document.getElementById('R3_PATCHER_btn_cancel').value = 'Go Back!';
	$('#R3_PATCHER_btn_cancel').css({'width': '430px', 'margin-top': '8px', 'display': 'inline'});
	document.getElementById('R3_PATCHER_btn_cancel').title = 'Click on this button to return to main menu';
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
		$('#SETTINGS_perfTab').css({'height': '20px'});
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
/*
	Utils
	Extract Rofs
*/
function UTILS_rofs_hideButtons(){
	if (DESIGN_ENABLE_ANIMS === true){
		$('#img-logo').fadeOut({duration: 500, queue: false});
		$('#menu-topo').fadeOut({duration: 500, queue: false});
		$('#menu-utility').fadeOut({duration: 500, queue: false});
		$('#menu-settings').fadeOut({duration: 500, queue: false});
		$('#menu-topo-MOD').fadeOut({duration: 500, queue: false});
		$('#menu-utility-aba').fadeOut({duration: 500, queue: false});
		$('#menu-utility-aba-2').fadeOut({duration: 500, queue: false});
		$('#menu-utility-aba-3').fadeOut({duration: 500, queue: false});
		$('#menu-utility-aba-4').fadeOut({duration: 500, queue: false});
		$('#menu-utility-aba-5').fadeOut({duration: 500, queue: false});
		$('#mainMenu-patcher-div').fadeOut({duration: 500, queue: false});
		$('#mainMenu-exeEdit-div').fadeOut({duration: 500, queue: false});
	} else {
		$('#img-logo').css({'display': 'none'});
		$('#menu-topo').css({'display': 'none'});
		$('#menu-utility').css({'display': 'none'});
		$('#menu-settings').css({'display': 'none'});
		$('#menu-topo-MOD').css({'display': 'none'});
		$('#menu-utility-aba').css({'display': 'none'});
		$('#menu-utility-aba-2').css({'display': 'none'});
		$('#menu-utility-aba-3').css({'display': 'none'});
		$('#menu-utility-aba-4').css({'display': 'none'});
		$('#menu-utility-aba-5').css({'display': 'none'});
		$('#mainMenu-patcher-div').css({'display': 'none'});
		$('#mainMenu-exeEdit-div').css({'display': 'none'});
	}
}
/*
	Utils
	ARD Enabler
*/
function DESIGN_prepareForARDEnabler(){
	document.title = APP_NAME + ' - ARD Enabler - Please wait...';
	if (DESIGN_ENABLE_ANIMS === true){
		$('#menu-topo').fadeOut({duration: 500, queue: false});
		$('#menu-utility').fadeOut({duration: 500, queue: false});
		$('#menu-settings').fadeOut({duration: 500, queue: false});
		$('#menu-topo-MOD').fadeOut({duration: 500, queue: false});
		$('#menu-utility-aba').fadeOut({duration: 500, queue: false});
		$('#menu-utility-aba-2').fadeOut({duration: 500, queue: false});
		$('#menu-utility-aba-3').fadeOut({duration: 500, queue: false});
		$('#menu-utility-aba-4').fadeOut({duration: 500, queue: false});
		$('#menu-utility-aba-5').fadeOut({duration: 500, queue: false});
		$('#mainMenu-patcher-div').fadeOut({duration: 500, queue: false});
		$('#mainMenu-exeEdit-div').fadeOut({duration: 500, queue: false});
		$('#UTILS_ARDEnabler_holder').fadeIn({duration: 1500, queue: false});
		$('#img-logo').animate({'opacity': '0.42'}, {duration: 1500, queue: false});
	} else {
		$('#img-logo').css({'opacity': '0.42'});
		$('#menu-topo').css({'display': 'none'});
		$('#menu-utility').css({'display': 'none'});
		$('#menu-settings').css({'display': 'none'});
		$('#menu-topo-MOD').css({'display': 'none'});
		$('#menu-utility-aba').css({'display': 'none'});
		$('#menu-utility-aba-2').css({'display': 'none'});
		$('#menu-utility-aba-3').css({'display': 'none'});
		$('#menu-utility-aba-4').css({'display': 'none'});
		$('#menu-utility-aba-5').css({'display': 'none'});
		$('#mainMenu-patcher-div').css({'display': 'none'});
		$('#mainMenu-exeEdit-div').css({'display': 'none'});
		$('#UTILS_ARDEnabler_holder').css({'display': 'inline'});
	}
}
/*
	Utils
	XDELTA Patcher
*/
function DESIGN_XDELTA_showMenu(){
	if (fs.existsSync(APP_PATH + '\\App\\tools\\xdelta.exe') !== true){
		LOG_addLog('error', 'ERROR - Unable to find Xdelta executable!');
		window.alert('ERROR - Unable to find Xdelta executable!');
		reload();		
	} else {
		$('#img-logo').css({'display': 'none'});
		$('#menu-topo-MOD').css({'display': 'none'});
		document.title = APP_NAME + ' - Xdelta Patcher';
		if (DESIGN_ENABLE_ANIMS === false){
			$('#R3_Patcher_Xdelta_menu').css({'display': 'inline', 'top': '124px'});
		} else {
			$('#R3_Patcher_Xdelta_menu').fadeIn({duration: 200, queue: false});
			$('#R3_Patcher_Xdelta_menu').animate({'top': '124px'}, {duration: 240, queue: false});
		}
	}
}
function DESIGN_XDELTA_showInfo(message, showReload){
	if (DESIGN_ENABLE_ANIMS === true){
		$('#R3_Patcher_Xdelta_menu').fadeOut({duration: 120, queue: false});
		setTimeout(function(){
			document.getElementById('R3_XDELTA_notice').innerHTML = message;
			$('#R3_Patcher_XDELTA_details_holder').css({'display': 'none'});
			$('#R3_PATCHER_XDELTA_BTN_NOTICE_CANCEL').css({'margin-top': '10px'});
			$('#R3_Patcher_Xdelta_menu').removeClass('R3_Patcher_Xdelta_holderFix');
			if (showReload !== true){
				$('#R3_PATCHER_XDELTA_BTN_NOTICE_CANCEL').css({'display': 'none'});
				$('#R3_XDELTA_PATCHER_notice').css({'width': '792px', 'height': '22px', 'display': 'block'});
				$('#R3_Patcher_Xdelta_menu').css({'width': '812px', 'height': '84px', 'top': '304px', 'left': '280px'});
			} else {
				$('#R3_PATCHER_XDELTA_BTN_NOTICE_CANCEL').css({'display': 'inline'});
				$('#R3_XDELTA_PATCHER_notice').css({'width': '792px', 'height': '82px', 'display': 'block'});
				$('#R3_Patcher_Xdelta_menu').css({'width': '812px', 'height': '144px', 'top': '274px', 'left': '280px'});
			}
			$('#R3_Patcher_Xdelta_menu').fadeIn({duration: 120, queue: false});
		}, 150);
	} else {
		$('#R3_Patcher_Xdelta_menu').removeClass('R3_Patcher_Xdelta_holderFix');
		document.getElementById('R3_XDELTA_notice').innerHTML = message;
		$('#R3_Patcher_XDELTA_details_holder').css({'display': 'none'});
		$('#R3_PATCHER_XDELTA_BTN_NOTICE_CANCEL').css({'margin-top': '10px'});
		if (showReload !== true){
			$('#R3_PATCHER_XDELTA_BTN_NOTICE_CANCEL').css({'display': 'none'});
			$('#R3_XDELTA_PATCHER_notice').css({'width': '792px', 'height': '22px', 'display': 'block'});
			$('#R3_Patcher_Xdelta_menu').css({'width': '812px', 'height': '84px', 'top': '304px', 'left': '280px'});
		} else {
			$('#R3_PATCHER_XDELTA_BTN_NOTICE_CANCEL').css({'display': 'inline'});
			$('#R3_XDELTA_PATCHER_notice').css({'width': '792px', 'height': '82px', 'display': 'block'});
			$('#R3_Patcher_Xdelta_menu').css({'width': '812px', 'height': '144px', 'top': '274px', 'left': '280px'});
		}
	}
}
/*
	Mouse Click
*/
function R3_MOUSECLICK(mode){
	// 0 Down, 1: Up
	var cMenu;
	if (mode === 0){
		if (main_currentMenu !== undefined){
			// RDT
			if (main_currentMenu === 3 && RDT_arquivoBruto !== undefined){
				cMenu = (RDT_aba_atual + 1);
				if (cMenu === 4 || cMenu === 10){
					cMenu++;
				}
				// Message Block
				if (cMenu === 2 && fs.existsSync(RDT_fm_path) !== true){
					cMenu++;
				}
				// Audio Tab
				if (cMenu === 5 && RDT_totalAudios === 0){
					cMenu++;
				}
				// Message Code
				if (cMenu === 7 && fs.existsSync(RDT_fm_path) !== true){
					cMenu++;
				}
				// NPC
				if (cMenu === 8 && RDT_totalEnemies === 0){
					cMenu++;
				}
				//
				if (cMenu > RDT_totalMenus){
					cMenu = 1;
				}
				if (cMenu === 0){
					cMenu = 11;
				}
				console.info(cMenu);
				RDT_showMenu(cMenu);
			}
			// INI
			if (main_currentMenu === 6 && BIO3INI_arquivoBruto !== undefined){
				cMenu = (INI_aba_atual + 1);
				if (cMenu === 0 || cMenu === INI_totalMenus){
					cMenu = 1;
				}
				INI_showMenu(cMenu);
			}
			// MIX
			if (main_currentMenu === 8 && MIX_arquivoBruto !== undefined){
				cMenu = (MIX_currentMenu + 1);
				if (cMenu === 0 || cMenu === (MIX_totalMenus + 1)){
					cMenu = 1;
				}
				MIX_showMenu(cMenu);
			}
			// SAV
			if (main_currentMenu === 1 && SAVE_arquivoBruto !== undefined){
				cMenu = (SAVE_aba_atual + 1);
				if (cMenu === 0 || cMenu === (SAVE_totalMenus + 1)){
					cMenu = 1;
				}
				SAVE_showMenu(cMenu);
			}
		}
	} else {
		if (main_currentMenu !== undefined){
			// RDT
			if (main_currentMenu === 3 && RDT_arquivoBruto !== undefined){
				cMenu = (RDT_aba_atual - 1);
				// NPC
				if (cMenu === 8 && RDT_totalEnemies === 0){
					cMenu--;
				}
				// Message Code
				if (cMenu === 7 && fs.existsSync(RDT_fm_path) !== true){
					cMenu--;
				}
				// Audio Tab
				if (cMenu === 5 && RDT_totalAudios === 0){
					cMenu--;
				}
				// Message Block
				if (cMenu === 2 && fs.existsSync(RDT_fm_path) !== true){
					cMenu--;
				}
				if (cMenu === 4 || cMenu === 10){
					cMenu--;
				}
				//
				if (cMenu > RDT_totalMenus){
					cMenu = 1;
				}
				if (cMenu === 0){
					cMenu = 11;
				}
				//console.info(cMenu);
				RDT_showMenu(cMenu);
			}
			// INI
			if (main_currentMenu === 6 && BIO3INI_arquivoBruto !== undefined){
				cMenu = (INI_aba_atual - 1);
				if (cMenu === 0 || cMenu === 4){
					cMenu = 1;
				}
				INI_showMenu(cMenu);
			}
			// MIX
			if (main_currentMenu === 8 && MIX_arquivoBruto !== undefined){
				cMenu = (MIX_currentMenu - 1);
				if (cMenu === 0 || cMenu === (MIX_totalMenus + 1)){
					cMenu = 1;
				}
				MIX_showMenu(cMenu);
			}
			// SAV
			if (main_currentMenu === 1 && SAVE_arquivoBruto !== undefined){
				cMenu = (SAVE_aba_atual - 1);
				if (cMenu === 0 || cMenu === (SAVE_totalMenus + 1)){
					cMenu = 1;
				}
				SAVE_showMenu(cMenu);
			}
		}
	}
}
/*
	Run game
*/
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
				$('#RDT_3DProps_holder').css({'height': '474px'});
				$('#RDT-enemyNPC-Edit').css({'height': '458px'});
				$('#RDT_camera_holder').css({'height': '474px'});
				$('#RDT-3D_props-Edit').css({'height': '463px'});
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
				$('#RDT-3D_props').css({'height': '518px'});
				$('#RDT-geral').css({'height': '516px'});
				$('#RDT-msgs').css({'height': '516px'});
				$('#RDT-ifm').css({'height': '516px'});

				$('#RDT-SLD-hold').css({'height': '516px'});
				$('#RDT_SLD_LAYER_holder').css({'height': '472px'});
				$('#RDT_SLD_LAYER_BLOCK_LIST').css({'height': '288px'});

				//console.log('Open RE3');

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
					$('#RDT_3DProps_holder').css({'height': '428px'});
					$('#RDT-enemyNPC-Edit').css({'height': '418px'});
					$('#RDT_camera_holder').css({'height': '430px'});
					$('#RRDT-camera-Edit').css({'height': '418px'});
					$('#RDT-3D_props-Edit').css({'height': '418px'});
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
					$('#RDT-3D_props').css({'height': '472px'});
					$('#RDT-geral').css({'height': '472px'});
					$('#RDT-msgs').css({'height': '472px'});
					$('#RDT-ifm').css({'height': '472px'});

					$('#RDT-SLD-hold').css({'height': '472px'});
					$('#RDT_SLD_LAYER_holder').css({'height': '430px'});
					$('#RDT_SLD_LAYER_BLOCK_LIST').css({'height': '242px'});

					//console.log('Close RE3');

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