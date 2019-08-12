# R3ditor
An editor of files written in JS to perform reverse engineering studies on the Resident Evil 3 game.

## Como instalar
- Download the latest version of Node-Webkit and extract it into a folder of your choice<br>(Click <a href="http://nwjs.io" target="_blank">here</a>)

- Download the main content from this repository and extract and place all files in the same folder as you extracted Node-Webkit (the "package.json" file must be in the same folder as the "nw.exe" executable).
- Abra o programa executando o arquivo "nw.exe".

## Supported File Formats

### Bu00.sav (Saves) [wip]
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

#### Important
Any changes you make will automatically apply to your save.
If you want to recover your save, open the "backup" folder and select a backup file. <br>
When selecting, paste it into the folder where the game executable is and rename the backup file to "Bu00.sav"

### Arquivos de mensagem (.msg) [wip]
You can view / edit the game's internal messages by loading .msg files or using the "Hex Input" field.

Note that you need to use a hex editor or extract the files using the <a href="https://www.romhacking.net/utilities/1019/" target="_blank">BioFAT</a> program to extract the messages.

### Room Data Table (.rdt) [EXTREME WIP]
For now you can view which items, files or maps are present within the file without being able to modify.<br><br>
You can see how the map compatibility list looks by viewing <a href="https://docs.google.com/spreadsheets/d/1HviJVXH_3NpgZEdMI1Cdplyqqy3IUm92QJE5c7CF1_w" target="_blank">this sheet table</a>.<br><br>
Expect compatibility improvements and more features soon!
