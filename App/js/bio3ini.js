/*
	R3ditor - Bio3.ini.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Can you give me a coffee? ~wink~
*/
var BIO3INI_arquivoBruto;

// General
var BIO3INI_Save;
var BIO3INI_Movie;
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

// Video Config
// True == On || False == Off
var BIO3INI_v_disableMovie = true;
var BIO3INI_v_disableAlpha = false;
var BIO3INI_v_disableLinear = false;
var BIO3INI_v_disableSpecular = true;
var BIO3INI_v_textureAdjust = false;
var BIO3INI_v_mode = "Windowed";
// Windowed
var BIO3INI_w_driver = "NULL";
var BIO3INI_w_device = "0ed36e48aa64fc1118f600000c0251e6";
var BIO3INI_w_width = 800;
var BIO3INI_w_height = 600;
var BIO3INI_w_BPP = 32;
// FullScreen
var BIO3INI_f_driver = "NULL";
var BIO3INI_f_device = "0ed36e48aa64fc1118f600000c0251e6";
var BIO3INI_f_width = 800;
var BIO3INI_f_height = 600;
var BIO3INI_f_BPP = 32;

// Keyboard
// Info - it's very obvious - we are NOT planning to add support to sidewinder!
var BIO3INI_kb_key1 = "";
var BIO3INI_kb_key2 = "";
var BIO3INI_kb_key3 = "";
var BIO3INI_kb_key4 = "";
var BIO3INI_kb_key5 = "";
var BIO3INI_kb_key6 = "";
var BIO3INI_kb_key7 = "";
var BIO3INI_kb_key8 = "";
var BIO3INI_kb_key9 = "";
var BIO3INI_kb_keyA = "";
var BIO3INI_kb_keyB = "";
var BIO3INI_kb_keyC = "";
var BIO3INI_kb_keyD = "";
var BIO3INI_kb_keyE = "";

// Sound
var BIO3INI_sound_device = "NULL";
var BIO3INI_sound_seVol = 65534;
var BIO3INI_sound_bgmVol = 65534;
/*
	Functions
*/
function BIO3INI_MAKE_WZINI(mode){
	BIO3INI_Save = ".\\Save";
	BIO3INI_Movie = ".\\zmovie";
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
		if (mode === 0){
			BIO3INI_Rofs11 = ".\\ROOM\\RBJ";
		} else if (mode === 1){
			BIO3INI_Rofs11 = ".\\rofs11.dat";
		}
		BIO3INI_Rofs12 = ".\\DATA_AJ\\RDT";
		BIO3INI_Rofs13 = ".\\DATA_E\\RDT";
		BIO3INI_Rofs14 = ".\\DATA_A\\VOICE";
		BIO3INI_Rofs15 = ".\\DATA_A\\SOUND";
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
		BIO3INI_Rofs10 = ".\\Rofs1,.dat";
		BIO3INI_Rofs11 = ".\\rofs11.dat";
		BIO3INI_Rofs12 = ".\\Rofs12.dat";
		BIO3INI_Rofs13 = ".\\Rofs13.dat";
		BIO3INI_Rofs14 = ".\\Rofs14.dat";
		BIO3INI_Rofs15 = ".\\Rofs15.dat";
	}
	BIO3INI_MAKEFILE(APP_PATH + "\\Assets");
}
function BIO3INI_MAKEFILE(path){
	var FINAL = "[General]\n" + 
		"Save=" + BIO3INI_Save + "\n" + 
		"Regist=.\\regist.txt\n" + // what is this file anyways?
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
		"BGMvol=" + BIO3INI_sound_bgmVol + "\n\n";
	// Saving the file!
	try{
		fs.writeFileSync(path + "\\Bio3.ini", FINAL, 'utf-8');
		addLog('log', "Bio3INI - The file was saved sucessfully!");
		addLog('log', 'Path - ' + path + "\\Bio3.ini");
		scrollLog();
	} catch (err){
		console.error("Bio3INI - Something went wrong!\n" + err);
		addLog('error', "Bio3INI - Something went wrong!");
		addLog('error', err);
		scrollLog();
	}
}