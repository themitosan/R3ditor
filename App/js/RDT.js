/*
	R3ditor - RDT.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please
*/

var RDT_arquivoBruto = undefined;

var RDT_MSG = [];

function RDT_CARREGAR_ARQUIVO(rdtFile){
	ORIGINAL_FILENAME = rdtFile;
	var msg = "RDT - Carregado com sucesso! - File: " + rdtFile;
	RDT_arquivoBruto = fs.readFileSync(rdtFile, 'hex');
	addLog("log", msg);
	alert("Infelizmente essa parte ainda não está pronta...\n\n\nSorry :(");
	addLog("warn", "[WIP] :(");
}