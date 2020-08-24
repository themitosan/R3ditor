/*
	R3ditor - RDT_Experiment.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Please don't rely on this.

	This is only a experiment, so don't believe on these lines - it will not save the world.
*/
// Header Vars
var RDT_V2_MAP_HEADER;		  // Hx     Hx
var RDT_V2_HEADER_CAM_TOTAL;  // 00 --> 02: Nº Total Cameras
var RDT_V2_HEADER_UNK_0;      // 08 --> 09: ???
var RDT_V2_HEADER_BOUNDARIES; // 20 --> 21: Boundaries
var RDT_V2_HEADER_CAM_POS;    // 24 --> 25: Camera Position (Start)
var RDT_V2_HEADER_COLISION;   // 28 --> 29: Camera Colision
var RDT_V2_HEADER_TIM; 	   	  // 30 --> 31: Total Objects? (TIM)
var RDT_V2_HEADER_LIGHTS;     // 2C --> 2D: Lights (LIT)
var RDT_V2_HEADER_UNK_1;      // 38 --> 39: ???
var RDT_V2_HEADER_MSG;        // 3C --> 3D: Text Pointers (if 0000 = no text)
var RDT_V2_HEADER_SCD;	   	  // 48 --> 49: Script Execution (SCD)
var RDT_V2_HEADER_PRI;        //
var RDT_V2_HEADER_UNK_2;      // 58 --> 59: ??? - Nemesis drop? (Sometimes it points to file end...Why?)
/*
	SCD Vars
*/
var RDT_V2_SCD_CODE;
/*
	Functions
*/
function RDT_setHeaderPointers(){
	if (RDT_arquivoBruto !== undefined){
		RDT_V2_MAP_HEADER = RDT_arquivoBruto.slice(RANGES['RDT_FILE_MAP_HEADER'][0], RANGES['RDT_FILE_MAP_HEADER'][1]);
		RDT_V2_HEADER_SCD = parseEndian(RDT_arquivoBruto.slice(RANGES['RDT_HEADER_SCD_POS'][0], RANGES['RDT_HEADER_SCD_POS'][1]));
		// In Hex Order
		RDT_V2_HEADER_CAM_TOTAL = parseEndian(RDT_MAP_HEADER.slice(RANGES['RDT_HEADER_CAM_TOTAL'][0], RANGES['RDT_HEADER_CAM_TOTAL'][1]));
		// End
		RDT_decompileMapHeader();
	}
}
function RDT_decompileMapHeader(){
	alert('WARN - This is WIP! Please, disable Experimental mode on Settings.');
	LOG_addLog('warn', 'WARN - This is WIP! Please, disable Experimental mode on Settings.');
	// RDT_V2_extractSCD();
}
function RDT_V2_extractSCD(){
    if (RDT_arquivoBruto !== undefined){
    	RDT_V2_HEADER_SCD = parseEndian(RDT_arquivoBruto.slice(RANGES['RDT_HEADER_SCD_POS'][0], RANGES['RDT_HEADER_SCD_POS'][1]));
        var SCD_HEX_STARTPOS = (parseInt(RDT_V2_HEADER_SCD, 16) * 2);
        var SCD_POINTER_START = parseEndian(RDT_arquivoBruto.slice(SCD_HEX_STARTPOS, (SCD_HEX_STARTPOS + 4)));
        var SCD_POINTER_END = SCD_HEX_STARTPOS + (parseInt(SCD_POINTER_START, 16) * 2);
        var SCD_LENGTH = (parseInt(parseEndian(RDT_arquivoBruto.slice((SCD_POINTER_END - 4), SCD_POINTER_END)), 16) * 2);
        RDT_V2_SCD_CODE = RDT_arquivoBruto.slice(SCD_HEX_STARTPOS, (SCD_HEX_STARTPOS + SCD_LENGTH));
    }
}