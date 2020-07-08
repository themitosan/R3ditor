/*
	R3ditor - RDT_Experiment.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Please don't rely on this.

	This is only a experiment, so don't believe on these lines - it will not save the world.
*/
var RDT_MAP_HEADER;
//							  Hx     Hx
var RDT_HEADER_CAM_TOTAL;  // 00 --> 02: Nº Total Cameras
var RDT_HEADER_UNK_0;      // 08 --> 09: ???
var RDT_HEADER_BOUNDARIES; // 20 --> 21: Boundaries
var RDT_HEADER_CAM_POS;    // 24 --> 25: Camera Position (Start)
var RDT_HEADER_COLISION;   // 28 --> 29: Camera Colision
var RDT_HEADER_TIM; 	   // 30 --> 31: Total Objects? (TIM)
var RDT_HEADER_LIGHTS;     // 2C --> 2D: Lights (LIT)
var RDT_HEADER_UNK_1;      // 38 --> 39: ???
var RDT_HEADER_MSG;        // 3C --> 3D: Text Pointers (if 0000 = no text)
var RDT_HEADER_ITEM;	   // 48 --> 49: Items, files, enemies, doors and etc.
var RDT_HEADER_PRI;        //
var RDT_HEADER_UNK_2;      // 58 --> 59: ??? - Nemesis drop? (Sometimes it points to file end... why?)
/*
	Functions
*/
function RDT_setHeaderPointers(){
	if (RDT_arquivoBruto !== undefined){
		RDT_MAP_HEADER = RDT_arquivoBruto.slice(RANGES['RDT_FILE_MAP_HEADER'][0], RANGES['RDT_FILE_MAP_HEADER'][1]);
		// In Hex Order
		RDT_HEADER_CAM_TOTAL = parseEndian(RDT_MAP_HEADER.slice(RANGES['RDT_HEADER_CAM_TOTAL'][0], RANGES['RDT_HEADER_CAM_TOTAL'][1]));
		// End
		RDT_decompileMapHeader();
	}
}
function RDT_decompileMapHeader(){
	alert('WARN - This is WIP! Please, disable Experimental mode on Settings.');
	LOG_addLog('warn', 'WARN - This is WIP! Please, disable Experimental mode on Settings.');
}