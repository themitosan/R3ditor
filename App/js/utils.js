/*
	utils.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Me ajuda? Pliiiiz!
*/
/*
	FILEGEN
	File Generator Code
*/
var FILEGEN_TOGGLE = false;
function FILEGEN_TOGGLE_RES(){
	if (FILEGEN_TOGGLE === false){
		$('#FILEGEN_CANVAS').css({'zoom': '1', 'left': '926px'});
		document.getElementById('BTN_saveImage').value = 'Toggle Zoom (Size: Original)';
		FILEGEN_TOGGLE = true;
	} else {
		$('#FILEGEN_CANVAS').css({'zoom': '2', 'left': '400px'});
		document.getElementById('BTN_saveImage').value = 'Toggle Zoom (Size: Double)';
		FILEGEN_TOGGLE = false;
	}
}
/*
function FILEGEN_saveImage(){
	$('#FILEGEN_CANVAS').css({'zoom': '1', 'left': '926px'});
	html2canvas(document.getElementById('FILEGEN_CANVAS'), { useCORS: true, foreignObjectRendering: false }).then(function(canvas){
		Canvas2Image.saveAsPNG(canvas);
	});
	$('#FILEGEN_CANVAS').css({'zoom': '2', 'left': '400px'});
}*/
function FG_RENDER(){
	var c = 0;
	var x_offset = 0;
	var y_offset = 0;
	document.getElementById('FILEGEN_CANVAS').innerHTML = '';
	if (document.getElementById('FILEGEN_text').value !== ''){
		var text = document.getElementById('FILEGEN_text').value.replace(new RegExp('\n', 'gi'), '@').match(/.{1,1}/g);
		while(c < text.length){
			if (FG_DICIONARIO[text[c]] !== undefined){
				if (text[c] === '@' || text[c] === '\n'){
					y_offset = y_offset + 15;
					x_offset = 0;
					c++;
				} else {
					var distance = parseInt(FG_DICIONARIO[text[c]][1]) + x_offset;
					var HTML_TEMPLATE = '<img src="' + APP_PATH + '/App/Img/chars.png" style="clip-path: inset(' + FG_DICIONARIO[text[c]][0] + '); position: absolute; left: ' + distance + 'px;top: ' + y_offset + 'px;">';
					$('#FILEGEN_CANVAS').append(HTML_TEMPLATE);
					x_offset = x_offset + FG_DICIONARIO[text[c]][2];
					c++;
				}
			} else {
				c++;
			}
		}
	}
}
/*
	OBJ Patcher
	Fix created by Biohazard España - You are amazing!
*/
var OBJ_arquivoBruto;
function UTILS_OBJ_Patcher_load(){
	if (R3ditor_tool_selected === false){
		OBJ_arquivoBruto = '';
		triggerLoad(15);
	}
}
function UTILS_OBJ_Patcher_RUN(file){
	if (file !== undefined && file !== null){
		var c = 0;
		var tPaches = 0;
		var OBJ_array = [];
		fs.readFileSync(file).toString().split('\n').forEach(function(line){ 
			OBJ_array.push(line); 
		});
		while(c < OBJ_array.length){
			if (OBJ_array[c].slice(0, 1) === '#'){
				c++;
			} else {
				var linePatch = OBJ_array[c];
				if (linePatch.indexOf('.') !== -1){
					linePatch = linePatch.replace(/\./g, ',');
					tPaches++;
				}
				if (c === 0){
					OBJ_arquivoBruto = linePatch;
				} else {
					OBJ_arquivoBruto = OBJ_arquivoBruto + '\n' + linePatch;
				}
				c++;
			}
		}
		if (tPaches !== 0){
			OBJ_arquivoBruto = '# OBJ Converted in R3ditor V.' + APP_VERSION + '\n' + OBJ_arquivoBruto.slice(1, OBJ_arquivoBruto.length);
			R3DITOR_SAVE(getFileName(file).toLowerCase().replace('.obj', '') + '_converted', OBJ_arquivoBruto, 'utf-8', 'obj');
		} else {
			addLog('warn', 'OBJ Patcher - This file doesn\'t need patching!');
		}
	}
	scrollLog();
}
/*
	Extract ROFS
*/
function UTILS_extract_rofs(rofsFile){
	try{
		addLog('log', 'ROFS - Extracting file: <font class="user-can-select">' + rofsFile + '</font>');
		if (R3ditor_tool_selected === false && rofsFile !== undefined && rofsFile !== '' && EXEC_rofs !== undefined){
			UTILS_rofs_hideButtons();
			process.chdir(rofsFile.slice(0, parseInt(rofsFile.length - getFileName(rofsFile).length)));
			runExternalSoftware(EXEC_rofs, [rofsFile]);
			var timer = setInterval(function(){
				if (EXTERNAL_APP_EXITCODE === 0){
					addLog('log', 'ROFS - Process Complete!');
					setTimeout(function(){
						reload();
					}, 1200);
					clearInterval(timer);
				}
			}, 50);
		}
	} catch (err){
		if (err.toString().indexOf('Error: spawn UNKNOWN') !== -1){
			addLog('error', 'ERROR - Unable to extract ROFS.exe! You need to instal Visual Studio 2005 runtime files to run this software.');
			addLog('error', 'Details: ' + err);
		} else {
			addLog('error', 'ERROR - Something went wrong while extracting rofs!');
			addLog('error', 'ERROR - Details: ' + err);
		}
	}
	scrollLog();
}