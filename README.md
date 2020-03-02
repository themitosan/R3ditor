<img src="https://raw.githubusercontent.com/themitosan/R3ditor/master/App/Img/logo.png" alt="R3ditor-Logo" draggable="false" width="120" height="120">

# R3ditor
R3ditor (it reads REditor) is a editor of files written in JS / NW.js (aka. Node-Webkit) to perform reverse engineering studies on Resident Evil 3.<br>
<p align="center"><img src="https://i.imgur.com/bV0ljHH.png" width="680" height="360"></p>

## How to install
- Download NW.js (Node-Webkit) V. 0.37.4 and extract it into a folder of your choice!<br>(Click <a href="https://dl.nwjs.io/v0.37.4/nwjs-sdk-v0.37.4-win-x64.zip" target="_blank">here</a> to download)

- Download the main content from this repository and extract all files in the same folder as you extracted Node-Webkit (the "package.json" file must be in the same folder as the "nw.exe" executable).
- Open "R3ditor.exe".

<i>(If you have a 32-Bit system, you can use <a href="https://dl.nwjs.io/v0.37.4/nwjs-sdk-v0.37.4-win-ia32.zip" target="_blank">this version of NW.js</a>. In the end, run "nw.exe" instead of "R3ditor.exe")</i>

## Requirements
- OS: Windows 7 or higher
- To run the inicial setup you will need the Visual Studio 2005 installed (rofs.exe need this to unpack "Rofsxx.dat" files)

## How to update
- Just click on "Check for updates" and follow the instructions!

## Roadmap
As you can see, this software still WIP - Expect changes in the next versions!<br>
You can see what will be implemented in the future in our <a href="https://github.com/themitosan/R3ditor/blob/master/Roadmap.md">Roadmap</a>.<br>

## Supported File Formats

### Bu00.sav (Saves)
You can change various aspects of your save, such as:

- HP
- Change IGT
- Change Inventories
- Change chests
- Current Character
- Current Outfit
- Poisoning Status
- Sidepack (Jill and Carlos)
- Current Weapon
- Difficulty
- Quantity of Saves
- Unlocked Epilogues

### Message Files (.MSG)
You can view / edit the game's internal messages by loading .msg files or using the "Hex Input" field.<br>
<i>Note that you need to use a hex editor or extract the files using <a href="https://www.romhacking.net/utilities/1019/" target="_blank">BioFAT</a> to extract the messages.</i>

### Room Data Table (.RDT)
You can edit messages, doors, which item is in the room, change its position and its animation. [WIP]<br>
Expect compatibility improvements and more features in the future!

### ARD Map File (.ARD)
For now this type of file cannot be fully recognized. Keep in mind that R3ditor is a long way from being able to change this type of file.

### Configuration File (.INI)
You can create a new config. file, edit your screen resolution, use an experimental resolution scaler and more. [WIP] <br>
Expect compatibility improvements and more features in the future!

## Other Features
R3ditor also can do:

- Read XYZR pos. in game¹
- Edit inventory in game¹
- Edit HP in game¹ (infinite life and enable god mode)
- Write texts using RE3 font with File Generator (WIP)
- Patch TIM files generated with RE3SLDE 0.1b (WIP) 
- Extract all Rofs (.dat) files (Wizard)
- Edit items combinations

<i>¹ - Only avaliable in x64 NW.js version</i>

### Important
Any changes you make will automatically apply to your files.
If you want to recover your save, open the "backup" folder and select the file you want to recover. <br><br>
You can restore your RDT by using the "Restore Last Backup" button on "RDT Editor".

## Third-Party software used on this project

Engine:
- <a href="https://nwjs.io" target="_blank">NW.js (aka. Node-Webkit)</a> by <a href="https://twitter.com/nw_js" target="_blank">NW.js community</a>

External JS Plugins:
- <a href="https://jquery.com/" target="_blank">jQuery</a> by <a href="https://jquery.org/team/" target="_blank">The jQuery Foundation</a>
- <a href="https://jqueryui.com/" target="_blank">jQuery UI</a> by <a href="https://jquery.org/team/" target="_blank">The jQuery Foundation</a>

NW.js Plugins:
- <a href="https://github.com/Rob--/memoryjs" target="_blank">memoryjs</a> by <a href="https://github.com/Rob--" target="_blank"> Rob--</a>

These files can be found in "App/tools/":
- <a href="https://www.7-zip.org/" target="_blank">7za.dll, 7zxa.dll and 7za.exe (7zip)</a>
- <a href="https://github.com/pmandin/reevengi-tools" target="_blank">rofs.exe (Reevengi-tools - Rofs Unpacker Compiled)</a>
- <a href="https://www.libsdl.org/" target="_blank">SDL.dll (Required for rofs.exe)</a>

<p align="center"><i>Important: Biohazard and Resident Evil are trademarks of ©CAPCOM CO., LTD. ALL RIGHTS RESERVED.</i></p>
