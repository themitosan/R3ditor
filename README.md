<img src="https://raw.githubusercontent.com/themitosan/R3ditor/master/App/Img/logo.png" alt="R3ditor-Logo" draggable="false" width="120" height="120">

# R3ditor
An editor of files written in JS / Node-Webkit to perform reverse engineering studies on Resident Evil 3.<br>
<p align="center"><img src="https://pbs.twimg.com/media/EFoSmX4WsAEqCYu?format=jpg" width="680" height="360"></p>

## How to install
- Download NW.js (Node-Webkit) V. 0.37.0 and extract it into a folder of your choice!<br>(Click <a href="https://dl.nwjs.io/v0.37.0/nwjs-sdk-v0.37.0-win-x64.zip" target="_blank">here</a> to download)

- Download the main content from this repository and extract all files in the same folder as you extracted Node-Webkit (the "package.json" file must be in the same folder as the "nw.exe" executable).
- Open "nw.exe".

## Requirements
- OS: Windows 7 or higher
- To run the inicial setup you will need the visual studio 2005 installed (rofs.exe need this to unpack "Rofsxx.dat" files)

## How to update
- Just click on "Check for updates" and follow the instructions!

## Roadmap
As you can see, this software still WIP - Expect changes in the next versions!
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
Expect compatibility improvements and more features soon!

### Important
Any changes you make will automatically apply to your files.
If you want to recover your save, open the "backup" folder and select the file you want to recover. <br><br>
You can restore your RDT by using the "Restore Last Backup" button on "RDT Editor".

## Third-Party software used on this project
Node-Webkit Plugins:
- <a href="https://github.com/Rob--/memoryjs" target="_blank">memoryjs</a> <a href="https://github.com/Rob--" target="_blank">By Rob--</a>

These files can be found in "App/tools/":
- <a href="https://www.7-zip.org/" target="_blank">7za.dll, 7zxa.dll and 7za.exe (7zip)</a>
- <a href="https://github.com/pmandin/reevengi-tools" target="_blank">rofs.exe (Reevengi-tools - Rofs Unpacker Compiled)</a>
- <a href="https://www.libsdl.org/" target="_blank">SDL.dll (Required for rofs.exe)</a>

<i>Biohazard and Resident Evil are trademarks of ©CAPCOM CO., LTD. ALL RIGHTS RESERVED.</i>