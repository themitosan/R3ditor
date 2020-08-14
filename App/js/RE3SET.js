/*
	R3ditor - RE3SET.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Can you give me a tea? Pleeeeeease! ~wink~ ;)
*/
var RE3SET_fName, RE3SET_gameVersion, RE3SET_arquivoBruto;
/*
	Functions
*/
function RE3SET_loadFile(exe, mode){
	ORIGINAL_FILENAME = exe;
	RE3SET_fName = getFileName(exe);
	RE3SET_arquivoBruto = fs.readFileSync(exe, 'hex');
	RE3SET_gameVersion = DROP_fileTypes[RE3SET_fName][1];
	/*
		End
		Using DROP_fileTypes because it works!
	*/
	LOG_addLog('log', 'RE3SET - File loaded sucessfully! (Mode: ' + DROP_fileTypes[RE3SET_fName][0] + ')');
	LOG_addLog('log', 'RE3SET - Path: <font class="user-can-select">' + ORIGINAL_FILENAME + '</font>');
	if (mode === 0){
		main_menu(12);
	}
}