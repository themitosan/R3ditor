<img src="https://raw.githubusercontent.com/themitosan/R3ditor/master/App/Img/logo.png" alt="R3ditor-Logo" draggable="false" width="120" height="120">

# R3ditor
An editor of files written in JS / Node-Webkit to perform reverse engineering studies on the Resident Evil 3 game.

## How to install
- Download the latest version of Node-Webkit and extract it into a folder of your choice<br>(Click <a href="http://nwjs.io" target="_blank">here</a>)

- Download the main content from this repository and extract and place all files in the same folder as you extracted Node-Webkit (the "package.json" file must be in the same folder as the "nw.exe" executable).
- Open "nw.exe".

## Supported File Formats

### Bu00.sav (Saves) [WIP]
You can change various aspects of your save, such as:

- HP
- Change IGT
- Change Inventories
- Change chests
- Current Character
- Poisoning Status
- Sidepack (Jill and Carlos)
- Current Weapon
- Difficulty
- Clothes
- Quantity of Saves
- Unlocked Epilogues

Soon:

- Maps and files

### Message Files (.msg) [WIP]
You can view / edit the game's internal messages by loading .msg files or using the "Hex Input" field.

<i>Note that you need to use a hex editor or extract the files using <a href="https://www.romhacking.net/utilities/1019/" target="_blank">BioFAT</a> to extract the messages.</i>

### Room Data Table (.rdt) [EXTREME WIP]
You can change which item is in the room, change its position and its animation. [WIP]<br>
You can see how the map compatibility list looks by viewing <a href="https://docs.google.com/spreadsheets/d/1HviJVXH_3NpgZEdMI1Cdplyqqy3IUm92QJE5c7CF1_w" target="_blank">this sheet table</a>.<br>
Expect compatibility improvements and more features soon!

#### Important
Any changes you make will automatically apply to your files.
If you want to recover your save / rdt, open the "backup" folder and select the file you want to recover. <br>
