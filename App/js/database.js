/*
	R3ditor - database.js
	By mitosan/mscore/misto_quente/mscorehdr
	Em terra de quem tem nemmy jill's sofrem!
*/
var ITEM = {
	'00': ['Empty Slot', 									   '', 																																																									   						],
	'01': ['Combat Knife', 									   'It is a simple combat Knife<br><br>It can be very useful when you are low on ammunition. In the hand of those who know how to use, it does damage!'],
	'02': ['Sigpro SP 2009 handgun', 						   'Sigpro SP 2009 Handgun<br><br>This is the Carlos alternative pistol.<br>Not a big deal but it can help you if you\'re in the worst...'],
	'03': ['Beretta M92F handgun',   						   'M92F special version of S.T.A.R.S made by Kendo.<br><br>There is a legend has it that those who have no life play using it without ever reloading.'],
	'04': ['Shotgun Benelli M3S', 							   'This is a Benelli M3S Shotgun but with a sawed-off barrel.<br><br>It can be a great help if you aim up when you have an enemy nearby!'],
	'05': ['Magnum M629C', 									   'Smith & Wesson M629C .44-caliber magnum revolver<br>It\'s a magnum boy! Just shoot the foot and the head explodes!<br>Even though it\'s absurdly powerful, it doesn\'t quite match the magnum of the previous games. (design)'],
	'06': ['Hk-p Grenade launcher with normal rounds',		   'Hk-p Grenade launcher with normal rounds<br><br>It is extremely effective against most enemies in the game.'],
	'07': ['Hk-p Grenade launcher with fire rounds',	 	   'Hk-p Grenade launcher with fire rounds<br><br>It is extremely effective against most enemies in the game.'],
	'08': ['Hk-p Grenade launcher with acid rounds',	 	   'Hk-p Grenade launcher with acid rounds<br><br>It is extremely effective against the worm you find in the cemetery (park).'],
	'09': ['Hk-p Grenade launcher with freeze rounds',	 	   'Hk-p Grenade launcher with freeze rounds<br><br>It is extremely effective in battles against nemesis.'],
	'0a': ['M66 Rocket Launcher', 							   'M66 Rocket Launcher<br><br>By this is the best gun of all!<br><br>...but Jesus Christ, it take so long to aim!'],
	'0b': ['Gatling Gun', 									   'Gatling Gun<br><br>One of the most powerful weapons available. The only thing that is bad about her is the time it takes her to fire her projectiles.'],
	'0c': ['Mine Thrower', 									   'By far is one of the most different weapons in the game.<br><br>The best use is in the final battle!'],
	'0d': ['STI Eagle 6.0', 								   'This gun shoots faster than standard pistol and also has a chance to hit the enemy with critical damage, exploding his head (zombie).'],
	'0e': ['M4A1 Assault rifle (Auto Mode)', 				   'M4A1 Assault Rifle in Auto Mode.<br><br>It\'s a good rifle for those learning how to play the game, but know that there are weapons that are better than it.'],
	'0f': ['M4A1 Assault rifle (Manual Mode)', 				   'M4A1 Assault Rifle in Manual Mode.<br><br>It\'s a good rifle for those learning how to play the game, but know that there are weapons that are better than it.'],
	'10': ['Western Custom M37 lever action shotgun', 		   'Western Custom M37 lever action shotgun<br><br>It has a bigger hitbox and can fire faster than the Benelli M3S but on the other hand can\'t shoot stronger projectiles.<br><br>Use when you have several enemies ahead!'],
	'11': ['Sigpro SP 2009 E', 							       'It\'s the same Sigpro that Carlos uses, but with improved bullets.'],
	'12': ['Beretta M92F E',    							   'It\'s the same M93F that Jill uses, only with more powerful bullets.<br><br>The sound of the shot hurts more than the bullet itself!'],
	'13': ['Shotgun Benelli M3S E',        					   'Shotgun Benelli M3S E<br><br>This is the same shotgun, but with bullets that do much more damage than usual.'],
	'14': ['Mine Thrower E',					 			   'This is an improved version of the Mine thrower, with stronger bullets following the enemy.'],
	'15': ['Handgun bullets (9x19 parabellum)', 			   'Ordinary pistol ammunition. You can load 255 of them per inventory slot!'],
	'16': ['Magnum bullets (.44-caliber)', 					   'Smith & Wesson M629C .44 Magnum Ammo.<br><br>Keep in mind that you won\'t find this type of ammunition that easy, so use it wisely'],
	'17': ['Shotgun shells', 								   'You don\'t find that kind of ammunition that easy, so use them wisely!'],
	'18': ['Grenade rounds', 								   '\"Simple\" damage ammo - Ideal for eliminating common enemies.'],
	'19': ['Flame rounds', 									   'Moderate damage ammo - Ideal for eliminating different enemies.'],
	'1a': ['Acid rounds', 									   'Advance damage ammo - Ideal for fighting the worm in the park\'s cemetery.'],
	'1b': ['Freeze rounds', 								   'Extreme damage ammo - Ideal for fighting nemesis.'],
	'1c': ['Minethrower rounds', 							   'Mine thrower ammunition - Perfect for use in conveniently positioned incinerator locations!'],
	'1d': ['Assault rifle clip (5.56 NATO rounds)', 		   'M4A1 Rifle Ammo - This is the type of ammo you only find in the protagonist\'s item box!'],
	'1e': ['Enhanced handgun bullets', 						   'Improved Pistol Bullets.<br>Use and abuse the Reloading tool to get them!'],
	'1f': ['Enhanced shotgun shells', 						   'Improved Shotgun shells - Use and abuse the Reloading tool to get them!.'],
	'20': ['First aid spray', 								   'This spray can recover your entire life minus the poison status.'],
	'21': ['Green Herb', 									   'This herb can heal only a little of your life without removing the poisoning status.'],
	'22': ['Blue Herb', 									   'Used to remove poison status.<br><br>On <u>NIGHTMARE MOD</u>, combine two of these to make a green herb!'],
	'23': ['Red Herb',										   'It alone does absolutely nothing - but when combined with the green, it heals your life completely.'],
	'24': ['2x Green Herbs', 						    	   'This combination can heal a little more than one herb, but it does not fully restore its life and does not remove poisoning status.'],
	'25': ['Mix of Green and Blue Herbs', 					   'This combination can heal some of your life and remove the poison status.'],
	'26': ['Mix of Green and Red Herbs', 					   'This combination can heal your life completely without removing poisoning status.'],
	'27': ['Mix of 3 Green Herbs', 							   'This combination can heal your life completely without removing poisoning status.'],
	'28': ['Mix of 2x Green Herbs + Blue Herb', 			   'This combination can heal little more than a green weed alone and removes the poison status.'],
	'29': ['Mix of all Herbs',		     					   'This combination completely heals your life, including removing the poison status of the current character.'],
	'2a': ['First aid spray kit',	 						   'This is a kit of Aid Spray that supports up to three first aid kit units.'],
	'2b': ['Square crank', 									   'Square Tip Crank - Used in uptown to open a cabinet full of grenade launcher bullets.'],
	'2c': ['(BOTU) Red Coin',								   'BOTU!<br><br>A coin with the symbol of \"Nosferatu\" in red color.<br><br>Item discarded during the development process.'],
	'2d': ['(BOTU) Blue Coin', 							   	   'BOTU!<br><br>A coin with the symbol of \"Nosferatu\" in blue color.<br><br>Item discarded during the development process.'],
	'2e': ['(BOTU) Golden Coin',							   'BOTU!<br><br>A coin with the symbol of \"Nosferatu\" in golden color.<br><br>Item discarded during the development process.'],
	'2f': ['Jill\'s S.T.A.R.S card', 						   'Jill Valentine S.T.A.R.S ID Card.<br>Used to get the drawer password in the RPD file room if you run away from nemesis.'],
	'30': ['(BOTU) Oil can labelled \'Giga Oil\'',    		   'BOTU!<br><br>This item would be used to make the item \"Mixed Oil\".<br><br>Item discarded during the development process.'],
	'31': ['Battery', 										   'Battery used to power the elevator that leads to the power station in Downtown.'],
	'32': ['Fire hook', 									   'Crowbar used to open a trapdoor in the restaurant.'],
	'33': ['Power cable', 									   'Power cord found in a car in a garage parking lot.<br>Use it on the trolley to make it work.'],
	'34': ['Fuse', 											   'Fuse obtained at the power station. <br> Use it on the trolley to make it work.'],
	'35': ['(BOTU) Cut Fire Hose',							   'BOTU!<br>Supposedly this fire hose was supposed to be cut off to make you roam even further around the city!<br><br>Item discarded during the development process.'],
	'36': ['Oil Additive', 									   'Additive to be mixed with oil found at the gas station.'],
	'37': ['Brad Vickers\' card case', 						   'Brad Vickers Wallet.<br>Inside is a ID Card.'],
	'38': ['Brad Vickers\' S.T.A.R.S card',					   'Brad Vickers S.T.A.R.S ID Card<br><br>Used to get the drawer password in the RPD file room.<br><br>Also, the combinations are: 0513, 0131, 4011 or 4312.'],
	'39': ['Machine oil', 									   'This item alone has no use. Combine it with Oil Additive to get the item Mixed Oil.'],
	'3a': ['Mixed oil', 									   'Use this item near the fuse and power cord to make the tram move.'],
	'3b': ['(BOTU) Chains',  							   	   'BOTU!<br><br>These chains were meant to be where you find bullets in the warehouse.<br><br>Item discarded during the development process.'],
	'3c': ['Wrench', 										   'Wrench used to remove the fire hose in Uptown and open the door to the gas station.'],
	'3d': ['Iron pipe', 									   'Iron pipe used in a fireplace in a cemetery storeroom after burning all the firewood present.<br><br>Serves to reveal a secret passage.'],
	'3e': ['(BOTU) Fire hose tip', 							   'BOTU!<br><br>Item that is supposed to be used to match the missing fire hose.<br><br>Item discarded during the development process.'],
	'3f': ['Fire hose', 									   'Fire hose used to put out the fire in a corridor in uptown.'],
	'40': ['Tape recorder', 								   'Audio recorder (aka. Walkman) containing the voice of a doctor describing an elbow fracture.<br><br>Used to open the elevator in the hospital.'],
	'41': ['Lighter oil', 									   'Lighter Fluid<br><br>Use it with the lighter closed to get the lighter open.'],
	'42': ['Lighter (Closed)', 				  				   'A lighter that is out of fluid.<br>Combine with Lighter oil to get the lighter open.'],
	'43': ['Lighter (Open)', 				  				   'A lighter that has fluid. It serves to light fireplaces in cemeteries and burn ropes full of oil.'],
	'44': ['Green gem', 									   'Green gem used to open the gate of raccoon City Hall.<br><br>Congratulations to those who had the brilliant idea<br>Design 10/10!'],
	'45': ['Blue gem', 										   'Blue gem used to open the gate of raccoon City Hall.<br><br>Congratulations to those who had the brilliant idea<br>Design 10/10'],
	'46': ['Amber ball', 									   'A brown sphere made of resin extracted from fossilized trees.<br><br>This item is used in the puzzle of the three clocks in the clock tower.'],
	'47': ['Obsidian ball', 								   'Also known as <font title="In Brazilian Portuguese, of course!">Obsidiena</font>, This is a black glass sphere made by a chemical reaction of volcanic lava when cooled. <br> <br> This item is used in the puzzle of the three clocks in the clock tower.'],
	'48': ['Crystal ball', 									   'A simple crystal sphere, used together with two others in a clock tower puzzle.'],
	'49': ['(BOTU) Remote control with Batteries',      	   'BOTU!<br><br>A Remote Control that is out of batteries.<br>I suppose it would be used at the pharmacy to see what the current password is (Aquacure, Safsprin or Adravil).<br><br>Item discarded during the development process.'],
	'4a': ['(BOTU) Remote control without Batteries', 		   'BOTU!<br><br>A remote control that has batteries.<br>I suppose it would be used at the pharmacy to see what the current password is (Aquacure, Safsprin or Adravil).<br><br>Item discarded during the development process.'],
	'4b': ['(BOTU) AA Batteries',		 					   'BOTU!<br><br>A pair of batteries that would be used to combine with the Remote Without Batteries. It would be used to turn on the Pharmacy TV.<br><br>Item discarded during the development process.'],
	'4c': ['Gold gear', 									   'A golden gear that is part of a mechanical clock system.<br><br>Combine with Silver Gear to form the Item Chronos Gear.'],
	'4d': ['Silver gear', 									   'A silver gear that is part of a mechanical watch system.<br><br>Combine with Gold Gear to form the Item Chronos Gear.'],
	'4e': ['Chronos gear', 									   'Gear composed of Gold Gear and Silver Gear items. <br> <br> Use on the clock tower clock to activate it.'],
	'4f': ['Bronze book',									   'A Bronze book found in the hands of a statue of the mayor of raccoon city.<br><br>Use it in a puzzle near the restaurant (Downtown) to get the Bronze compass.'],
	'50': ['Bronze compass', 								   'A bronze compass found near a restaurant.<br><br>Use it on the statue of the mayor of raccoon to obtain the item Battery.'],
	'51': ['Vaccine medium', 								   'One of the solutions to create the cure against T-Virus.<br><br>Combine with the base vaccine item to create the item \"Vaccine\".'],
	'52': ['Vaccine base', 									   'One of the solutions to create the cure against T-Virus.<br><br>Combine with the item Vaccine medium to create the item \"Vaccine\".'],
	'53': ['Unknown Sigpro SP 2009 handgun', 				   'Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don\'t have any ingame utility.'],
	'54': ['Unknown Sigpro SP 2009 handgun', 				   'Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don\'t have any ingame utility.'],
	'55': ['Vaccine', 										   'Vaccine created with Vaccine base and Vaccine medium.<br>Use it to cure Jill.'],
	'56': ['Unknown Sigpro SP 2009 handgun', 				   'Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don\'t have any ingame utility.'],
	'57': ['Unknown Sigpro SP 2009 handgun', 				   'Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don\'t have any ingame utility.'],
	'58': ['Medium base', 									   'Solution used to create the item Vaccine medium.<br>It is used in the laboratory at raccoon hospital, B3.'],
	'59': ['Eagle Parts A', 								   'First part of the weapon STI Eagle 6.0.<br>Combine with item Eagle parts B to form the same.'],
	'5a': ['Eagle Parts B', 								   'Second part of the weapon STI Eagle 6.0.<br>Combine with item Eagle parts A to form the same.'],
	'5b': ['M37 Parts A', 									   'First part of weapon Western Custom M37. <br> Combine with item M37 parts B to form it.'],
	'5c': ['M37 Parts B', 									   'Second part of weapon Western Custom M37. <br> Combine with item M37 parts B to form it.'],
	'5d': ['Unknown Sigpro SP 2009 handgun', 				   'Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don\'t have any ingame utility.'],
	'5e': ['Chronos chain', 								   'A key that apparently has no use until you combine it with the Clock tower (winder) key to form the Chronos key.'],
	'5f': ['Rusted crank', 									   'A rusty handle used to (try) open the gas station door.'],
	'60': ['Card key', 										   'Key card used at the abandoned factory near the end.<br><br>Use it to open some doors and unlock an elevator.'],
	'61': ['Gun powder A', 									   'Gunpowder A<br>This gunpowder alone has the power to generate ordinary pistol bullets.'],
	'62': ['Gun powder B', 									   'Gunpowder B<br>This gunpowder alone has the power to generate ordinary shotgun bullets.'],
	'63': ['Gun powder C', 									   'Gunpowder C<br>This gunpowder alone has the power to generate ordinary grenade launcher bullets.'],
	'64': ['Gun powder AA', 								   'Gunpowder AA.<br>This combination can generate more pistol bullets than usual.'],
	'65': ['Gun powder BB', 								   'Gunpowder BB.<br>This combination can generate more shotgun bullets than usual.'],
	'66': ['Gun powder AC', 								   'Gunpowder AC.<br>This combination can generate up to 20 grenade launcher (fire) bullets.'],
	'67': ['Gun powder BC', 								   'Gunpowder BC.<br>This combination can generate up to 20 grenade launcher (acid) bullets.'],
	'68': ['Gun powder CC', 								   'Gunpowder BC.<br>This combination can generate up to 20 grenade launcher (freeze) bullets.'],
	'69': ['Gun powder AAA', 								   'Gunpowder AAA.<br>This combination can generate many pistol bullets.'],
	'6a': ['Gun powder AAB', 								   'Gunpowder AAB.<br>This combination can generate up to 40 shotgun bullets.'],
	'6b': ['Gun powder BBA', 								   'Gunpowder BBA.<br>This combination can generate up to 120 pistol bullets.'],
	'6c': ['Gun powder BBB', 								   'Gunpowder BBB.<br>This combination can generate many shotgun bullets.'],
	'6d': ['Gun powder CCC', 								   'Gunpowder CCC.<br>This combination can generate magnum bullets!'],
	'6e': ['Infinite bullets', 								   'Unfair!<br><br>The deal is simple - combine this wonder with the weapon you want to have infinite ammo and voilá!'],
	'6f': ['Water sample', 									   'Water sample used on a quality meter near the end.<br><br><center>~~~BEEP-BOOP~~~</center>'],
	'70': ['System disk', 									   'Disk used to open a security door in abandoned factory.<br><br>Get ready for nemmy!'],
	'71': ['Dummy key', 									   'Apparently the RE3 Devs have forgotten one of the RE2 keys here...'],
	'72': ['Lockpick', 										   'A classic item - It opens doors, cabinets and drawers with simple locks.'],
	'73': ['Warehouse (backdoor) key', 						   'Used at the beginning of the game to leave the warehouse after a short discussion with Dario.'],
	'74': ['Sickroom key (room 402)',						   'Key used on the 4th floor of raccoon hospital.<br>Use it to open the door to room 402, which contains one of the necessary solutions to create the vaccine.'],
	'75': ['Emblem (S.T.A.R.S) key', 						   'Key used to open the classic S.T.A.R.S room at the RPD police station.'],
	'76': ['(BOTU) Keyring with four keys',			 		   'BOTU!<br><br>Bunch of keys with unknown use.<br>I believe it is to open several doors in the hospital, as well as the keys of the 1st Resident / Biohazard.<br><br>Item discarded during the development process.'],
	'77': ['Clock tower (bezel) key', 						   'Key used to descend the clock tower stairs in Clock Tower.<br><br>It is one of the only keys that you cannot use directly from inventory.'],
	'78': ['Clock tower (winder) key', 						   'A key that you can even open a door with - but its real purpose is to be combined with the Chronos Chain to become the Chronos key.'],
	'79': ['Chronos key', 									   'A key made of two other keys (Winder and Chronos chain).<br><br>Serves to open the door near the main clock tower lobby.'],
	'7a': ['Unknown Sigpro SP 2009 handgun', 				   'Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don\'t have any ingame utility.'],
	'7b': ['Park (Main Gate) key', 							   'Key to the gates of raccoon park.<br>You find it in a save room near the back of the clock tower.'],
	'7c': ['Park (Graveyard) key', 							   'Cemetery tool room key.<br>You find this key near an explosive gallon in the park.'],
	'7d': ['Park (Rear Gate) key', 							   'With this key you can open a lock that is blocking the way to the abandoned factory.'],
	'7e': ['Facility key (No Barcode)', 					   'One of the keys to the abandoned factory.<br>With it you can access a room with an elevator.'],
	'7f': ['Facility key (With Barcode)', 					   'One of the keys to the abandoned factory.<br>With the barcode, you can get the rocket launcher near the end.<br><br>With her you can access a room with an elevator.'],
	'80': ['Boutique key', 									   'Boutique key, where you can change clothes during gameplay.<br><br>This Function is only available in Playstation and Gamecube version.'],
	'81': ['Ink ribbon', 									   'By far, it is one of the most classic items in the entire Resident Evil / Biohazard franchise.<br><br>When in inventory, you can use it on the typewriter to saving your progress.'],
	'82': ['Reloading tool', 								   'With this item, you can create ammo combining with gunpowder.'],
	'83': ['Game inst. A', 									   'This is a manual of how to play Resident Evil 3 / Biohazard 3.<br><br>With this manual, you learn about explosive objects, The 180° Rotation, Emergency Escape, Emergency Bypass, and more.'],
	'84': ['Game inst. B', 									   'This is a manual of how to play Resident Evil 3 / Biohazard 3.<br><br>With this manual, you learn about the Reloading Tool, Gunpowder and its combinations.'],
	'85': ['(BOTU) Recipient with liquid inside',			   'BOT... Wait a sec...<br><br>With the internal name of \"Game inst. A\", this item can be used as many times as you like - it does not change anything in the game.'],
	/* Shenanigans! */
	'86': ['DO NOT USE THIS ITEM - YOU WILL BREAK THE GAME!',  'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'],
	/* Door Related Code */
	'ff': ['Locked in other side',							   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'],
	/*
		The values below can be added to inventory as an item, but checking them can make the game crash.
		If you insert these values in RDT as an item, it will recognize as current map.

		LISTEN TO ME - DO NOT INSERT THIS VALUES ON RDT / Save Files
	*/
	'ab': ['no item', 	      								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'],
	'ac': ['BOTU', 	  	      								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'],
	'ad': ['BOTU',	  	      								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'],
	'ae': ['BOTU',    	      								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'],
	'af': ['BOTU', 		      								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // This one does't crash the game when you check.
	'b0': ['Backdoor Key',    								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // After checking, it change his name to Main Gate Key
	'b1': ['BOTU',    	      								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'],
	'b2': ['S.T.A.R.S. Key',  								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // Checking make the game crash!
	'b3': ['Empty Lighter',   								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // Checking make the game crash!
	'b4': ['Sapphire',        								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // Checking it freezes the game
	'b5': ['Emerald',         								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // This one does't crash the game when you check.
	'b6': ['Rust Hex Crank',  								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // After checking, it change his name to ". Launcher"
	'b7': ['BOTU',            								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // Checking will display "ding will cause unexploded mines to disappear. OK to proceed? (Yes / No)"
	'b8': ['Graveyard Key',   								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // Checking make the game crash! (The graphic displayed is some part of cuurent map)
	'b9': ['BOTU',			  								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // Checking make the game crash!
	'ba': ['BOTU',			  								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // Checking it freezes the game
	'bb': ['Book Of Wisdom',  								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // ***Checking it will GLITCH the game graphics! His graphic will be the same of the last item you checked.
	'bc': ['Future Compass',  								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'],
	'bd': ['Square Crank',    								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // Checking it freezes the game
	'be': ['Bezel Key',       								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // ***Checking this will show a question. If you choose yes it mess with the graphics and current room. Also, it changes his name.
	'bf': ['Winder Key',      								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'], // This can show a question, but nothing happens.
	'c0': ['Main Gate Key',   								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.'],
	'c1': ['Rear Gate Key',   								   'This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.']
}
var WEAPONS = {
	'00': ['Bare Hands'],
	'01': ['Combat Knife'],
	'02': ['Sigpro Handgun'],
	'03': ['Handgun M92F'],
	'04': ['Shotgun B. M3S'],
	'05': ['S&W Magnum'],
	'06': ['G. Launcher'],
	'07': ['G. Launcher'],
	'08': ['G. Launcher'],
	'09': ['G. Launcher'],
	'0a': ['R. Launcher'],
	'0b': ['Gatling Gun'],
	'0c': ['Mine Thrower'],
	'0d': ['STI Eagle 6.0'],
	'0e': ['Assault rifle (Auto)'],
	'0f': ['A. rifle (Manual)'],
	'10': ['Western Custom'],
	'11': ['Sigpro SP 2009 E'],
	'12': ['Beretta M92F E'],
	'13': ['Shotgun B. M3S E'],
	'14': ['Mine Thrower E']
}
var FILES = {
	'86': ['Dario\'s Memo'],
	'87': ['Mercenary\'s Diary'],
	'88': ['Business Fax'],
	'89': ['Marvin\'s Report'],
	'8a': ['David\'s Memo'],
	'8b': ['City Guide'],
	'8c': ['Reporter\'s Memo'],
	'8d': ['Operation Instruction'],
	'8e': ['Mercenary\'s Pocketbook'],
	'8f': ['Art Picture Postercard'],
	'90': ['Supervisor\'s Report'],
	'91': ['Written Order To The Supervisors'],
	'92': ['Director\'s Diary'],
	'93': ['Manager\'s Diary'],
	'94': ['Security Manual'],
	'95': ['Mechanic\'s Memo'],
	'96': ['Fax From Kendo'],
	'97': ['Manager\'s Report'],
	'98': ['Medical Instruction Manual'],
	'99': ['Fax From H. Q.'],
	'9a': ['Incinerator Manual'],
	'9b': ['Photo A'],
	'9c': ['Photo B'],
	'9d': ['Photo C'],
	'9e': ['Photo E'],
	'9f': ['Photo D'],
	'a0': ['Clock Tower Poster Card'],
	// Info: Hex A1 makes the game freeze and crash
	'a2': ['Classified Photo File'],
	'a3': ['Jill\'s Diary']
}
var RDT_MAPAS = {
	'a4': ['Uptown Map'],
	'a9': ['Police Station Map'],
	'a5': ['Downtown Map'],
	'a6': ['Clock Tower Map'],
	'aa': ['Hospital Map'],
	'a7': ['Park Map'],
	'a8': ['Dead Factory Map'],
	'a9': ['Police Station Map'],
	'aa': ['Hospital Map']
}
var ATTR = {
	'00': ['None',								 		  	 '#0000',   '0 0 0px #0000 !important',   'none'],		  // Use this for puzzle items that don't have the ammo display.
	'01': ['Remaining ammo in green',		            	 '#008400', '0 0 2px #004200 !important', '-webkit-box'],
	'02': ['% remaining in green', 			           		 '#008400', '0 0 2px #004200 !important', '-webkit-box'],
	'03': ['Inf. ammo in green', 			           		 '#008400', '0 0 2px #004200 !important', '-webkit-box'],
	'05': ['Remaining ammo in red',			           		 '#bd0e0e', '0 0 2px #700000 !important', '-webkit-box'],
	'06': ['% remaining in red', 			           		 '#bd0e0e', '0 0 2px #700000 !important', '-webkit-box'],
	'07': ['Inf. ammo in red', 				           		 '#bd0e0e', '0 0 2px #700000 !important', '-webkit-box'],
	'09': ['Remaining ammo in yellow', 		           		 '#ffeb00', '0 0 2px #b4b194 !important', '-webkit-box'],
	'0a': ['%. remaining in yellow',		           		 '#ffeb00', '0 0 2px #b4b194 !important', '-webkit-box'],
	'0b': ['Inf. ammo in yellow', 			           		 '#ffeb00', '0 0 2px #b4b194 !important', '-webkit-box'],
	'0d': ['Remaining ammo in blue', 		           		 '#9393ff', '0 0 2px #004242 !important', '-webkit-box'],
	'0e': ['% remaining in blue', 			           		 '#9393ff', '0 0 2px #004242 !important', '-webkit-box'],
	'0f': ['Inf. ammo in blue', 	 		   				 '#9393ff', '0 0 2px #004242 !important', '-webkit-box'],
	'13': ['Percentage used by M4A1 Assault Rifle (Manual)', '#008400', '0 0 2px #004200 !important', '-webkit-box'],
	'16': ['Percentage used by M4A1 Assault Rifle',   		 '#bd0e0e', '0 0 2px #700000 !important', '-webkit-box'],
	'17': ['Infinite used by M4A1 Assault Rifle (Auto)',	 '#bd0e0e', '0 0 2px #700000 !important', '-webkit-box']  // Atributo encontrado na shotgun do Carlos?
}
// Second var (used for percentage items)
var VOID = {
	'00': 'OK!'
}
// AKA. STAGE
var CIDADE = {
	'00': ['Uptown (Including RPD, Stage 1)', 'Uptown'],
    '01': ['Downtown (Stage 2)', 'Downtown'],
    '02': ['Clock Tower / Park before the Hospital (Stage 3)', 'Clock Tower'],
    '03': ['Clock Tower / Park after the Hospital (Stage 4)', 'CT / Park'],
    '04': ['Dead Factory (Stage 5)', 'Dead Factory'],
    '05': ['Shows first the Mercenaries-minigame ending, then the ending video of the main game (the one without Barry Burton, assuming 0x2250 has been set to 00. If not, then it only crashes).', 'Mercenaries End'],
    '06': ['Downtown again. I have no idea what\'s different here. This may be after the scene where Jill falls trough the parking lot floor.', 'Downtown']
}
var PLAYERS = {
	'00': ['Jill with normal outfit'],
	'01': ['Jill with normal outfit + sidepack'],
	'02': ['Jill with biker outfit'],
	'03': ['Jill with S.T.A.R.S uniform'],
	'04': ['Jill with \"Disco Inferno\" outfit'],
	'05': ['Jill with cop uniform + miniskirt'],
	'06': ['Jill as regina (Dino Crisis)'],
	'07': ['Jill with normal outfit'],
	'08': ['Carlos'],
	'09': ['Mikhail'],
	'0a': ['Nicholai'],
	'0b': ['Brad Vickers'],
	'0c': ['Dario'],
	'0f': ['Tofu']
}
var ROUPA = {
	'00': ['Normal'],
	'01': ['Biker'],
	'02': ['S.T.A.R.S uniform'],
	'03': ['Disco Inferno'],
	'04': ['Cop + miniskirt'],
	'05': ['Jill as Regina (Dino Crisis)'],
	'06': ['Blue mini skirt with black top and boots'],
	'07': ['Social Suit']
}
var SIDEPACK = {
	'00': ['Undefined'],
	'0a': ['Sidepack Enabled'],
	'08': ['Sidepack Disabled'] 
}
var VERSAO = {
	'000000000000': ['Undefined (Bu10.sav?)', 			 	  'Hex 00'],
	'4241534c5553': ['Russian / Nightmare (Or Darkness) Mod', 'BASLUS'],
	'4245534c4553': ['Mediakite / Xplosiv', 				  'BESLES'],
	'4249534c5053': ['Chinese / Japanese / Taiwan Version',   'BISLPS']
}
var POISON = {
	'8f': ['Yes'],
	'00': ['No']  
}
var LOCAIS = {
	'00': ['Warehouse'],
	'01': ['Allley'],
	'02': ['Hall RPD'],
	'03': ['Dark Room'],
	'0c': ['Parking Lot'],
	'04': ['Shopping Dist.'],
	'06': ['Living Room'],
	'05': ['Chapel'],
	'0d': ['Clock Tower'],
	'08': ['Hospital'],
	'07': ['Park'],
	'09': ['Graveyard'],
	'0a': ['Resting Room'],
	'0b': ['Monitor Room']
}
var EPILOGOS = {
	'00': ['None'],
	'01': ['1'],
	'02': ['2'],
	'03': ['3'],
	'04': ['4'],
	'05': ['5'],
	'06': ['6'],
	'07': ['7'],
	'08': ['All'],
	'09': ['All'],
	'0c': ['All'] // found this valuue on french version
}
var DIFICULDADE = {
	'01': ['Easy'],
	'00': ['Hard']
}
var RDT_locations = {
	'R100': ['Warehouse Save Room', 		   'Uptown'],
	'R101': ['Warehouse', 					   'Uptown'],
	'R102': ['Alley 1', 					   'Uptown'],
	'R103': ['Street 1', 					   'Uptown'],
	'R104': ['Alley 2', 					   'Uptown'],
	'R105': ['Alley 3', 					   'Uptown'],
	'R106': ['Boutique Street', 			   'Uptown'],
	'R107': ['Bar Jack',		 			   'Uptown'],
	'R108': ['Alley 5', 					   'Uptown'],
	'R109': ['Passage to Pharmacy (Day)',      'Uptown'],
	'R10A': ['Main Street', 				   'Uptown'],
	'R10B': ['Pharmacy Street',  			   'Uptown'],
	'R10C': ['Alley - Save', 	 			   'Uptown'],
	'R10D': ['Jill\'s Apartment', 			   'Uptown'],
	'R10E': ['Alley 6',					 	   'Uptown'],
	'R10F': ['Boutique', 					   'Uptown'],
	'R110': ['R.P.D. Gate', 				   'Police Station'],
	'R111': ['R.P.D. Main Hall', 			   'Police Station'],
	'R112': ['R.P.D. Office', 				   'Police Station'],
	'R113': ['Files room', 					   'Police Station'],
	'R114': ['Corridor with ladder', 		   'Police Station'],
	'R115': ['Corridor', 					   'Police Station'],
	'R116': ['Press conference room', 		   'Police Station'],
	'R117': ['Dark Room', 					   'Police Station'],
	'R118': ['2F Corridor', 				   'Police Station'],
	'R119': ['Corridor to S.T.A.R.S. Room',    'Police Station'],
	'R11A': ['S.T.A.R.S. Room', 			   'Police Station'],
	'R11B': ['Pharmacy', 					   'Uptown'],
	'R11C': ['Pharmacy Product Stock', 		   'Uptown'],
	'R11D': ['Alley 1 (Night)', 			   'Uptown'],
	'R11E': ['Street 1 (Night)', 			   'Uptown'],
	'R11F': ['Alley 2 (Night)', 			   'Uptown'],
	'R120': ['Alley 3 (Night)', 			   'Uptown'],
	'R121': ['Boutique Street (Night)', 	   'Uptown'],
	'R122': ['Alley 5 (Night)', 			   'Uptown'],
	'R123': ['Passage to Pharmacy (Night)',    'Uptown'],
	'R124': ['Main Street (Night)', 		   'Uptown'],
	'R125': ['R.P.D. Gates (Night)', 		   'Police Station'],
	'R200': ['Street 2', 					   'Uptown'],
	'R201': ['Mechanic Parking Lot', 		   'Downtown'],
	'R202': ['Street to Alley 1',	 		   'Downtown'],
	'R203': ['Alley 1', 					   'Downtown'],
	'R204': ['Energy Station Street', 		   'Downtown'],
	'R205': ['Grill 13 Street', 			   'Downtown'],
	'R206': ['Shopping Dist.', 				   'Downtown'],
	'R207': ['Raccon City Hall Street', 	   'Downtown'],
	'R208': ['Raccon City Hall', 			   'Downtown'],
	'R209': ['Shopping Dist. 2', 			   'Downtown'],
	'R20A': ['Shopping Dist. 3', 			   'Downtown'],
	'R20B': ['Trolley Street', 				   'Downtown'],
	'R20C': ['Trolley', 					   'Downtown'],
	'R20D': ['Stagla Gas Station', 			   'Downtown'],
	'R20E': ['Stagla Street', 				   'Downtown'],
	'R20F': ['Press (2F)', 					   'Downtown'],
	'R210': ['Press (1F)', 					   'Downtown'],
	'R211': ['Grill 13 (1F)', 				   'Downtown'],
	'R212': ['Grill 13 (B1)', 				   'Downtown'],
	'R213': ['Energy Station Entrance', 	   'Downtown'],
	'R214': ['Energy Station', 				   'Downtown'],
	'R215': ['Trolley (Running)', 			   'Downtown'],
	'R216': ['Shopping Dist. Save Room', 	   'Downtown'],
	'R217': ['Stagla Street (After)', 		   'Downtown'],
	'R218': ['Alley to Street 2', 			   'Uptown'],
	'R219': ['Press (1F)', 					   'Downtown'],
	'R21A': ['Alley 6', 					   'Uptown'],
	'R21B': ['Mechanic\'s Office', 			   'Downtown'],
	'R300': ['Chapel', 						   'Clock Tower'],
	'R301': ['Piano Hall', 					   'Clock Tower'],
	'R302': ['Dinner Room', 				   'Clock Tower'],
	'R303': ['Clock Tower Garden', 			   'Clock Tower'],
	'R304': ['Main Hall (1F)', 				   'Clock Tower'],
	'R305': ['Resting Room', 				   'Clock Tower'],
	'R306': ['Living Room', 				   'Clock Tower'],
	'R307': ['Corridor to Main Hall', 		   'Clock Tower'],
	'R308': ['Corridor to Clock Puzzle',	   'Clock Tower'],
	'R309': ['Clock Puzzle', 				   'Clock Tower'],
	'R30A': ['Main Hall (2F)',  			   'Clock Tower'],
	'R30B': ['Tower Balcony',  				   'Clock Tower'],
	'R30C': ['Machinery Room', 				   'Clock Tower'],
	'R30D': ['Clock Tower Garden (Nemesis)',   'Clock Tower'],
	'R30E': ['Main Hall Destroyed', 		   'Clock Tower'],
	'R30F': ['Piano Hall & Dinner Room', 	   'Clock Tower'],
	'R310': ['Chapel', 				  	 	   'Clock Tower'],
	'R311': ['Resting Room',		  	 	   'Clock Tower'],
	'R312': ['Living Room', 		  	 	   'Clock Tower'],
	'R313': ['Corridor to Main Hall', 	 	   'Clock Tower'],
	'R314': ['Corridor to Clock Puzzle', 	   'Clock Tower'],
	'R315': ['Clock Puzzle', 				   'Clock Tower'],
	'R316': ['Main Hall Destroyed', 		   'Clock Tower'],
	'R317': ['Piano Hall & Dinner Room', 	   'Clock Tower'],
	'R400': ['Hospital Street', 			   'Park'],
	'R401': ['Park Office', 				   'Park'],
	'R402': ['Hospital Entrance', 			   'Hospital'],
	'R403': ['Hospital Office',   			   'Hospital'],
	'R404': ['Waiting Room', 	  			   'Hospital'],
	'R405': ['Corridor (4F)',     			   'Hospital'],
	'R406': ['Room 402',  					   'Hospital'],
	'R407': ['Room 401',  					   'Hospital'],
	'R408': ['Data Room', 					   'Hospital'],
	'R409': ['Corridor (B3)', 				   'Hospital'],
	'R40A': ['Laboratory 1', 				   'Hospital'],
	'R40B': ['Laboratory 2', 				   'Hospital'],
	'R40C': ['Park Entrance', 				   'Park'],
	'R40D': ['Water Pump Puzzle', 			   'Park'],
	'R40E': ['Bridge', 						   'Park'],
	'R40F': ['Park Exit', 					   'Park'],
	'R410': ['Sewer', 						   'Park'],
	'R411': ['Graveyard',					   'Park'],
	'R412': ['Park Warehouse', 				   'Park'],
	'R413': ['Park Warehouse Save Room', 	   'Park'],
	'R414': ['Park Secret Room', 			   'Park'],
	'R415': ['Park Graveyard (Worm)', 		   'Park'],
	'R416': ['Unknown Room', 				   'Unknown'], // this file is VERY weird...
	'R417': ['Park Street', 				   'Park'],
	'R500': ['Entrance', 					   'Dead Factory'],
	'R501': ['Resting Room', 				   'Dead Factory'],
	'R502': ['Steam Room', 					   'Dead Factory'],
	'R503': ['Control Room (1F)', 			   'Dead Factory'],
	'R504': ['Corridor to Monitor Room',	   'Dead Factory'],
	'R505': ['Monitor Room', 				   'Dead Factory'],
	'R506': ['Water Sample Room', 			   'Dead Factory'], // BEEP BOOP!
	'R507': ['Control Room (B1)', 			   'Dead Factory'],
	'R508': ['Corridor to Disposal Room', 	   'Dead Factory'],
	'R509': ['Disposal Room', 				   'Dead Factory'],
	'R50A': ['Communication Room', 			   'Dead Factory'],
	'R50B': ['Corridor to Incinerator Room 1', 'Dead Factory'],
	'R50C': ['Corridor to Incinerator Room 2', 'Dead Factory'],
	'R50D': ['Incinerator Room', 			   'Dead Factory'],
	'R50E': ['Extraction Point', 			   'Dead Factory'],
	'R50F': ['Elevator to Extraction Point',   'Dead Factory'],
	'R510': ['Bridge to Dead Factory', 		   'Park'],
	'R600': ['Unknown Location', 			   'Unknown'],
	'R601': ['Unknown Location', 			   'Unknown'],
	'R607': ['Unknown Location', 			   'Unknown'],
	'R60B': ['Unknown Location', 			   'Unknown'],
	'R60E': ['Unknown Location', 			   'Unknown'],
	'R61B': ['Unknown Location', 			   'Unknown'],
	'R61C': ['Unknown Location', 			   'Unknown'],
	'R61D': ['Unknown Location', 			   'Unknown'],
	'R61E': ['Unknown Location', 			   'Unknown'],
	'R61F': ['Unknown Location', 			   'Unknown'],
	'R620': ['Unknown Location', 			   'Unknown'],
	'R621': ['Unknown Location', 			   'Unknown'],
	'R622': ['Unknown Location', 			   'Unknown'],
	'R623': ['Unknown Location', 			   'Unknown'],
	'R624': ['Unknown Location', 			   'Unknown'],
	'R700': ['Unknown Location', 			   'Unknown'],
	'R701': ['Unknown Location', 			   'Unknown'],
	'R702': ['Unknown Location', 			   'Unknown'],
	'R703': ['Unknown Location', 			   'Unknown'],
	'R704': ['Unknown Location', 			   'Unknown'],
	'R705': ['Unknown Location', 			   'Unknown'],
	'R706': ['Unknown Location', 			   'Unknown'],
	'R707': ['Unknown Location', 			   'Unknown'],
	'R708': ['Unknown Location', 			   'Unknown'],
	'R709': ['Unknown Location', 			   'Unknown'],
	'R70A': ['Unknown Location', 			   'Unknown'],
	'R70B': ['Unknown Location', 			   'Unknown'],
	'R70C': ['Unknown Location', 			   'Unknown'],
	'R70D': ['Unknown Location', 			   'Unknown'],
	'R70E': ['Unknown Location', 			   'Unknown'],
	'R70F': ['Unknown Location', 			   'Unknown'],
	'R710': ['Unknown Location', 			   'Unknown'],
	'R711': ['Unknown Location', 			   'Unknown'],
	'R712': ['Unknown Location', 			   'Unknown'],
	'R713': ['Unknown Location', 			   'Unknown'],
	'R714': ['Unknown Location', 			   'Unknown'],
	'R718': ['Unknown Location', 			   'Unknown'],
	'R71A': ['Unknown Location', 			   'Unknown'],
	'R71B': ['Unknown Location', 			   'Unknown']
}
// 	WIP
var MAPAS = {
	'0000': 'Undefined'
}
var RDT_EMDNAME = {
	'00': ['Undefined'],
	'10': ['Male zombie 1'],
	'11': ['Female zombie 1'],
	'12': ['Male zombie 2'],
	'13': ['Female zombie 2'],
	'14': ['Male zombie 3'],
	'15': ['Male zombie 4'],
	'16': ['Male zombie 5'],
	'17': ['Male zombie 6'],
	'18': ['Male zombie 7'],
	'19': ['Male zombie 8'],
	'1a': ['Male zombie 9'],
	'1b': ['Male zombie 10'],
	'1c': ['Female zombie 3'],
	'1d': ['Male zombie 11'],
	'1e': ['Male zombie 12'],
	'1f': ['Male zombie 13'],
	'20': ['Dog'],
	'21': ['Crow'],
	'22': ['Hunter'],
	'23': ['Brain Sucker 1'],
	'24': ['Hunter Gamma'],
	'25': ['Spider'],
	'26': ['Unknown Enemy 1'],
	'27': ['Brain Sucker Minion'],
	'28': ['Brain Sucker 2'],
	'2c': ['Male zombie 14'],
	'2d': ['Police Station Window Arm'],
	'2e': ['Mercenary zombie 1'],
	'2f': ['Marvin 1'],
	'30': ['Worm 1'],
	'32': ['Worm Minion'],
	'33': ['Worm 2'],
	'34': ['Nemesis 1'],
	'35': ['Nemesis 2'],
	'36': ['Nemesis 3'],
	'37': ['Nemesis 4'],
	'38': ['Final Nemesis'],
	'39': ['Unknown Enemy 2'],
	'3a': ['Nemesis 5'],
	'3b': ['Nemesis Part'],
	'3e': ['Helicopter part 1'],
	'3f': ['Helicopter part 2'],
	'40': ['Helicopter part 3'],
	'50': ['Carlos Oliveira 1'],
	'51': ['Mikhail Bleeding'],
	'52': ['Nicholai'],
	'53': ['Brad Vicker\'s'],
	'54': ['Dario Rosso'],
	'55': ['Mercenary zombie 2'],
	'56': ['Tyrell'],
	'57': ['Marvin 2'],
	'58': ['Brad zombie'],
	'59': ['Dario zombie'],
	'5a': ['Umbrella Ad Girl'],
	'5b': ['Jill Valentine'],
	'5c': ['Carlos Oliveira 2'],
	'5d': ['Carlos Oliveira 3'],
	'5e': ['Nicholai 2'],
	'5f': ['Jill Valentine with Sidepack'],
	'60': ['Nicholai zombie'],
	'61': ['Dario\'s daughter'],
	'62': ['Jill Biker Outfit'],
	'63': ['Jill RE1 Outfit'],
	'64': ['Jill\'s white outfit'],
	'65': ['Jill with miniskirt cop'],
	'66': ['Jill as Regina (Dino Crisis)'],
	'67': ['Brian Irons'],
	'70': ['Jill alternative outfit'],
	'71': ['Jill with blue T-shirt']
}
var RDT_EMDPOS = {
	'00': ['Normal'],
	'01': ['Lying down'],
	'02': ['Getting up 1'],
	'03': ['Crawling'],
	'04': ['Getting up 2'],
	'05': ['Lying down 2 (No anim?)'],
	'06': ['Following you'],
	'07': ['Lying down 3 (No anim?)'],
	'08': ['Getting up 3'],
	'09': ['Crawl'],
	'0b': ['Crawling 2'],
	'0c': ['Normal 2'],
	'0d': ['Crawling 3'],
	'0e': ['Normal 3'],
	'0f': ['Crawling 4'],
	'10': ['Frozen (Until you deal damage)'],
	'20': ['Normal 4'],
	'26': ['Walking'],
	'40': ['Normal 5'],
	'51': ['Lying down moving head'],
	'60': ['Normal 6'],
	'80': ['Walking (Dog)'],
	'84': ['Getting Up 4'],
	'86': ['Slow on fire'],
	'87': ['Lying down on fire'],
	'a0': ['On Fire'],
	'af': ['Crawling on fire'],
	'b2': ['Getting up on fire'],
	'c0': ['On Fire 2'],
	'c1': ['Lying down on fire'],
	'c9': ['Crawling on fire 2']
}
//
var FG_DICIONARIO = {
	'.': ['0px 1106px 0px 8px',      '-8', 8],
	' ': ['0px 1077px 0px 33px',    '-33', 7],
	'§': ['0px 1077px 0px 33px',    '-33', 7],
	'@': ['0px 1045px 0px 62px',    '-62', 10],
	'(': ['0px 1068px 0px 43px',    '-44', 6],
	')': ['0px 1063px 0px 48px',    '-50', 6],
	'º': ['0px 1055px 0px 58px',    '-58', 6],
	'{': ['0px 1037px 0px 73px',    '-73', 8],
	'}': ['0px 1030px 0px 79px',    '-79', 8],
	'0': ['0px 1013px 0px 96px',    '-97', 8],
	'1': ['0px 1005px 0px 104px',  '-105', 7],
	'2': ['0px 997px 0px 111px',   '-113', 8],
	'3': ['0px 990px 0px 120px',   '-121', 7],
	'4': ['0px 981px 0px 128px',   '-129', 7],
	'5': ['0px 973px 0px 137px',   '-137', 8],
	'6': ['0px 965px 0px 144px',   '-145', 8],
	'7': ['0px 957px 0px 152px',   '-153', 8],
	'8': ['0px 949px 0px 160px',   '-161', 7],
	'9': ['0px 940px 0px 168px',   '-168', 8],
	':': ['0px 934px 0px 178px',   '-178', 10],
	',': ['0px 917px 0px 193px',   '-193', 8],
	'!': ['0px 904px 0px 210px',   '-210', 6],
	'?': ['0px 894px 0px 216px',   '-216', 8],
	'$': ['0px 885px 0px 223px',   '-223', 8],
	'A': ['0px 877px 0px 232px',   '-232', 8],
	'B': ['0px 869px 0px 240px',   '-240', 8],
	'C': ['0px 861px 0px 248px',   '-248', 8],
	'D': ['0px 853px 0px 256px',   '-256', 9],
	'E': ['0px 845px 0px 264px',   '-264', 9],
	'F': ['0px 837px 0px 272px',   '-272', 9],
	'G': ['0px 829px 0px 280px',   '-280', 9],
	'H': ['0px 821px 0px 288px',   '-288', 9],
	'I': ['0px 816px 0px 296px',   '-296', 5],
	'J': ['0px 811px 0px 301px',   '-301', 6],
	'K': ['0px 801px 0px 309px',   '-309', 8],
	'L': ['0px 794px 0px 316px',   '-316', 8],
	'M': ['0px 785px 0px 324px',   '-324', 9],
	'N': ['0px 778px 0px 332px',   '-332', 8],
	'O': ['0px 769px 0px 340px',   '-340', 9],
	'P': ['0px 761px 0px 348px',   '-348', 9],
	'Q': ['0px 753px 0px 356px',   '-356', 8],
	'R': ['0px 745px 0px 365px',   '-365', 7],
	'S': ['0px 737px 0px 373px',   '-373', 8],
	'T': ['0px 729px 0px 380px',   '-380', 8],
	'U': ['0px 721px 0px 388px',   '-388', 9],
	'V': ['0px 713px 0px 395px',   '-395', 9],
	'W': ['0px 705px 0px 403px',   '-403', 9],
	'X': ['0px 697px 0px 412px',   '-412', 9],
	'Y': ['0px 689px 0px 420px',   '-420', 9],
	'Z': ['0px 681px 0px 428px',   '-428', 9],
	'+': ['0px 673px 0px 436px',   '-436', 8],
	'/': ['0px 665px 0px 444px',   '-444', 8],
	'-': ['0px 657px 0px 452px',   '-452', 10],
	'\'': ['0px 649px 0px 460px',   '-460', 8],
	'ã': ['0px 633px 0px 476px',   '-476', 8],
	'a': ['0px 625px 0px 484px',   '-484', 8],
	'b': ['0px 617px 0px 492px',   '-492', 8],
	'c': ['0px 610px 0px 500px',   '-500', 8],
	'd': ['0px 601px 0px 509px',   '-509', 7],
	'e': ['0px 594px 0px 516px',   '-516', 8],
	'f': ['0px 585px 0px 524px',   '-524', 8],
	'g': ['0px 577px 0px 532px',   '-532', 8],
	'h': ['0px 570px 0px 540px',   '-540', 8],
	'i': ['0px 561px 0px 551px',   '-550', 6],
	'j': ['0px 555px 0px 558px',   '-558', 6],
	'k': ['0px 544px 0px 564px',   '-564', 8],
	'l': ['0px 540px 0px 573px',   '-573', 5],
	'm': ['0px 531px 0px 579px',   '-579', 8],
	'n': ['0px 522px 0px 587px',   '-587', 8],
	'o': ['0px 514px 0px 595px',   '-595', 8],
	'p': ['0px 506px 0px 604px',   '-604', 8],
	'q': ['0px 498px 0px 611px',   '-611', 7],
	'r': ['0px 491px 0px 619px',   '-619', 7],
	's': ['0px 483px 0px 627px',   '-627', 7],
	't': ['0px 474px 0px 635px',   '-635', 6],
	'u': ['0px 467px 0px 643px',   '-643', 8],
	'v': ['0px 458px 0px 652px',   '-652', 8],
	'w': ['0px 445px 0px 661px',   '-661', 10],
	'x': ['0px 437px 0px 672px',   '-672', 7],
	'y': ['0px 427px 0px 680px',   '-680', 8],
	'z': ['0px 420px 0px 690px',   '-690', 8],
	'À': ['0px 401px 0px 708px',   '-708', 8],
	'Á': ['0px 394px 0px 716px',   '-716', 8],
	'Â': ['0px 386px 0px 723px',   '-723', 8],
	'Ã': ['0px 378px 0px 731px',   '-732', 8],
	'Ä': ['0px 370px 0px 739px',   '-739', 8],
	'Ç': ['0px 353px 0px 756px',   '-756', 8],
	'È': ['0px 345px 0px 765px',   '-765', 8],
	'É': ['0px 337px 0px 772px',   '-772', 8],
	'Ê': ['0px 329px 0px 781px',   '-781', 8],
	'Ë': ['0px 320px 0px 789px',   '-789', 8],
	'Ì': ['0px 315px 0px 799px',   '-799', 8],
	'Í': ['0px 307px 0px 806px',   '-806', 8],
	'Î': ['0px 299px 0px 815px',   '-815', 8],
	'Ï': ['0px 291px 0px 823px',   '-823', 8],
	'Ñ': ['0px 280px 0px 829px',   '-829', 8],
	'Ò': ['0px 272px 0px 837px',   '-837', 8],
	'Ó': ['0px 264px 0px 845px',   '-845', 8],
	'Ô': ['0px 256px 0px 853px',   '-853', 8],
	'Õ': ['0px 248px 0px 861px',   '-861', 8],
	'Ö': ['0px 239px 0px 870px',   '-870', 8],
	'Ù': ['0px 232px 0px 878px',   '-878', 8],
	'Ú': ['0px 223px 0px 885px',   '-885', 8],
	'Û': ['0px 216px 0px 893px',   '-893', 8],
	'Ü': ['0px 207px 0px 902px',   '-902', 8],
	'ß': ['0px 199px 0px 910px',   '-910', 8],
	'à': ['0px 191px 0px 918px',   '-918', 8],
	'á': ['0px 183px 0px 926px',   '-926', 8],
	'â': ['0px 175px 0px 934px',   '-934', 8],
	'ä': ['0px 167px 0px 942px',   '-942', 8],
	'ç': ['0px 159px 0px 950px',   '-950', 8],
	'è': ['0px 152px 0px 958px',   '-958', 8],
	'é': ['0px 143px 0px 966px',   '-966', 8],
	'ê': ['0px 135px 0px 974px',   '-974', 8],
	'ë': ['0px 127px 0px 982px',   '-982', 8],
	'ì': ['0px 120px 0px 991px',   '-991', 8],
	'í': ['0px 112px 0px 1000px', '-1000', 6],
	'î': ['0px 104px 0px 1008px', '-1008', 8],
	'ï': ['0px 96px 0px 1014px',  '-1014', 8],
	'ñ': ['0px 82px 0px 1028px',  '-1028', 8],
	'ò': ['0px 73px 0px 1036px',  '-1036', 8],
	'ó': ['0px 65px 0px 1044px',  '-1044', 8],
	'ô': ['0px 57px 0px 1052px',  '-1052', 8],
	'õ': ['0px 49px 0px 1060px',  '-1060', 8],
	'ö': ['0px 41px 0px 1068px',  '-1068', 8],
	'ù': ['0px 32px 0px 1077px',  '-1077', 8],
	'ú': ['0px 24px 0px 1085px',  '-1085', 8],
	'û': ['0px 16px 0px 1093px',  '-1093', 8],
	'ü': ['0px 8px 0px 1102px',   '-1102', 8]
}
var MSG_DICIONARIO = {
	'00': [false, ' ', false],
	'01': [false, '.', false],
	'02': [false, 'º', false],
	'03': [false, '(SPECIAL CHAR 1)', false],
	'04': [false, '(SPECIAL CHAR 2)', false],
	'05': [false, '<code><</code>', false],
	'06': [false, '<code>></code>', false],
	'07': [false, '(SPECIAL CHAR 3)', false],
	'08': [false, '(SPECIAL CHAR 4)', false],
	'09': [false, '"', false],
	'0a': [false, '"', false],
	'0b': [false, '(Down Arrow)', false],
	'0c': [false, '0', false],
	'0d': [false, '1', false],
	'0e': [false, '2', false],
	'0f': [false, '3', false],
	'10': [false, '4', false],
	'11': [false, '5', false],
	'12': [false, '6', false],
	'13': [false, '7', false],
	'14': [false, '8', false],
	'15': [false, '9', false],
	'16': [false, ':', false],
	'17': [false, '.', false],
	'18': [false, ',', false],
	'19': [false, '^', false],
	'1a': [false, '!', false],
	'1b': [false, '?', false],
	'1c': [false, '$', false],
	'1d': [false, 'A', false],
	'1e': [false, 'B', false],
	'1f': [false, 'C', false],
	'20': [false, 'D', false],
	'21': [false, 'E', false],
	'22': [false, 'F', false],
	'23': [false, 'G', false],
	'24': [false, 'H', false],
	'25': [false, 'I', false],
	'26': [false, 'J', false],
	'27': [false, 'K', false],
	'28': [false, 'L', false],
	'29': [false, 'M', false],
	'2a': [false, 'N', false],
	'2b': [false, 'O', false],
	'2c': [false, 'P', false],
	'2d': [false, 'Q', false],
	'2e': [false, 'R', false],
	'2f': [false, 'S', false],
	'30': [false, 'T', false],
	'31': [false, 'U', false],
	'32': [false, 'V', false],
	'33': [false, 'W', false],
	'34': [false, 'X', false],
	'35': [false, 'Y', false],
	'36': [false, 'Z', false],
	'37': [false, '+', false],
	'38': [false, '/', false],
	'39': [false, '-', false],
	'3a': [false, '\'', false],
	'3b': [false, '-', false],
	'3d': [false, 'a', false],
	'3e': [false, 'b', false],
	'3f': [false, 'c', false],
	'40': [false, 'd', false],
	'41': [false, 'e', false],
	'42': [false, 'f', false],
	'43': [false, 'g', false],
	'44': [false, 'h', false],
	'45': [false, 'i', false],
	'46': [false, 'j', false],
	'47': [false, 'k', false],
	'48': [false, 'l', false],
	'49': [false, 'm', false],
	'4a': [false, 'n', false],
	'4b': [false, 'o', false],
	'4c': [false, 'p', false],
	'4d': [false, 'q', false],
	'4e': [false, 'r', false],
	'4f': [false, 's', false],
	'50': [false, 't', false],
	'51': [false, 'u', false],
	'52': [false, 'v', false],
	'53': [false, 'w', false],
	'54': [false, 'x', false],
	'55': [false, 'y', false],
	'56': [false, 'z', false],
	'57': [false, '(Unknown Char / Function Nº 00 - Hex: 57)', true],
	'58': [false, '(Unknown Char / Function Nº 01 - Hex: 58)', true],
	'59': [false, '(Unknown Char / Function Nº 02 - Hex: 59)', true],
	// Text format
	'5a': [false, 'á', false],
	'5b': [false, 'à', false],
	'5c': [false, 'â', false],
	'5d': [false, 'ã', false],
	'5e': [false, 'é', false],
	'5f': [false, 'õ', false],
	'60': [false, 'ç', false],
	'61': [false, 'ê', false],
	'62': [false, 'ó', false],
	'63': [false, '=', false],
	//
	'64': [false, '(Unknown Char / Function Nº 13 - Hex: 64)', true],
	'65': [false, '(Unknown Char / Function Nº 14 - Hex: 65)', true],
	'66': [false, '(Unknown Char / Function Nº 15 - Hex: 66)', true],
	'67': [false, '(Unknown Char / Function Nº 16 - Hex: 67)', true],
	'68': [false, '(Unknown Char / Function Nº 17 - Hex: 68)', true],
	'69': [false, '(Unknown Char / Function Nº 18 - Hex: 69)', true],
	'6a': [false, '(Unknown Char / Function Nº 19 - Hex: 6a)', true],
	'6b': [false, '(Unknown Char / Function Nº 20 - Hex: 6b)', true],
	'6c': [false, '(Unknown Char / Function Nº 21 - Hex: 6c)', true],
	'6d': [false, '(Unknown Char / Function Nº 22 - Hex: 6d)', true],
	'6e': [false, '(Unknown Char / Function Nº 23 - Hex: 6e)', true],
	'6f': [false, '(Unknown Char / Function Nº 24 - Hex: 6f)', true],
	'71': [false, '(Unknown Char / Function Nº 26 - Hex: 71)', true],
	'72': [false, '(Unknown Char / Function Nº 27 - Hex: 72)', true],
	'73': [false, '(Unknown Char / Function Nº 28 - Hex: 73)', true],
	'74': [false, '(Unknown Char / Function Nº 29 - Hex: 74)', true],
	'75': [false, '(Unknown Char / Function Nº 30 - Hex: 75)', true],
	'76': [false, '(Unknown Char / Function Nº 31 - Hex: 76)', true],
	'77': [false, '(Unknown Char / Function Nº 32 - Hex: 77)', true],
	'78': [false, '(Unknown Char / Function Nº 33 - Hex: 78)', true],
	'79': [false, '(Unknown Char / Function Nº 34 - Hex: 79)', true],
	'7a': [false, '(Unknown Char / Function Nº 35 - Hex: 7a)', true],
	'7b': [false, '(Unknown Char / Function Nº 36 - Hex: 7b)', true],
	'7c': [false, '(Unknown Char / Function Nº 37 - Hex: 7c)', true],
	'7d': [false, '(Unknown Char / Function Nº 38 - Hex: 7d)', true],
	'7e': [false, '(Unknown Char / Function Nº 39 - Hex: 7e)', true],
	'7f': [false, '(Unknown Char / Function Nº 40 - Hex: 7f)', true],
	'80': [false, '(Unknown Char / Function Nº 41 - Hex: 80)', true],
	'81': [false, '(Unknown Char / Function Nº 42 - Hex: 81)', true],
	'82': [false, '(Unknown Char / Function Nº 43 - Hex: 82)', true],
	'83': [false, '(Unknown Char / Function Nº 44 - Hex: 83)', true],
	'84': [false, '(Unknown Char / Function Nº 45 - Hex: 84)', true],
	'85': [false, '(Unknown Char / Function Nº 46 - Hex: 85)', true],
	'86': [false, '(Unknown Char / Function Nº 47 - Hex: 86)', true],
	'87': [false, '(Unknown Char / Function Nº 48 - Hex: 87)', true],
	'88': [false, '(Unknown Char / Function Nº 49 - Hex: 88)', true],
	'89': [false, '(Unknown Char / Function Nº 50 - Hex: 89)', true],
	'8a': [false, '(Unknown Char / Function Nº 51 - Hex: 8a)', true],
	'8b': [false, '(Unknown Char / Function Nº 52 - Hex: 8b)', true],
	'8c': [false, '(Unknown Char / Function Nº 53 - Hex: 8c)', true],
	'8d': [false, '(Unknown Char / Function Nº 54 - Hex: 8d)', true],
	'8e': [false, '(Unknown Char / Function Nº 55 - Hex: 8e)', true],
	'8f': [false, '(Unknown Char / Function Nº 56 - Hex: 8f)', true],
	'90': [false, '(Unknown Char / Function Nº 57 - Hex: 90)', true],
	'91': [false, '(Unknown Char / Function Nº 58 - Hex: 91)', true],
	'92': [false, '(Unknown Char / Function Nº 59 - Hex: 92)', true],
	'93': [false, '(Unknown Char / Function Nº 60 - Hex: 93)', true],
	'94': [false, '(Unknown Char / Function Nº 61 - Hex: 94)', true],
	'95': [false, '(Unknown Char / Function Nº 62 - Hex: 95)', true],
	'96': [false, '(Unknown Char / Function Nº 63 - Hex: 96)', true],
	'97': [false, '(Unknown Char / Function Nº 64 - Hex: 97)', true],
	'98': [false, '(Unknown Char / Function Nº 65 - Hex: 98)', true],
	'99': [false, '(Unknown Char / Function Nº 66 - Hex: 99)', true],
	'9a': [false, '(Unknown Char / Function Nº 67 - Hex: 9a)', true],
	'9b': [false, '(Unknown Char / Function Nº 68 - Hex: 9b)', true],
	'9c': [false, '(Unknown Char / Function Nº 69 - Hex: 9c)', true],
	'9d': [false, '(Unknown Char / Function Nº 70 - Hex: 9d)', true],
	'9e': [false, '(Unknown Char / Function Nº 71 - Hex: 9e)', true],
	'9f': [false, '(Unknown Char / Function Nº 72 - Hex: 9f)', true],
	'a1': [false, '(Unknown Char / Function Nº 74 - Hex: a1)', true],
	'a2': [false, '(Unknown Char / Function Nº 75 - Hex: a2)', true],
	'a3': [false, '(Unknown Char / Function Nº 76 - Hex: a3)', true],
	'a4': [false, '(Unknown Char / Function Nº 77 - Hex: a4)', true],
	'a5': [false, '(Unknown Char / Function Nº 78 - Hex: a5)', true],
	'a6': [false, '(Unknown Char / Function Nº 79 - Hex: a6)', true],
	'a7': [false, '(Unknown Char / Function Nº 80 - Hex: a7)', true],
	'a8': [false, '(Unknown Char / Function Nº 81 - Hex: a8)', true],
	'a9': [false, '(Unknown Char / Function Nº 82 - Hex: a9)', true],
	'aa': [false, '(Unknown Char / Function Nº 83 - Hex: aa)', true],
	'ab': [false, '(Unknown Char / Function Nº 84 - Hex: ab)', true],
	'ac': [false, '(Unknown Char / Function Nº 85 - Hex: ac)', true],
	'ad': [false, '(Unknown Char / Function Nº 86 - Hex: ad)', true],
	'ae': [false, '(Unknown Char / Function Nº 87 - Hex: ae)', true],
	'af': [false, '(Unknown Char / Function Nº 88 - Hex: af)', true],
	'b0': [false, '(Unknown Char / Function Nº 89 - Hex: b0)', true],
	'b1': [false, '(Unknown Char / Function Nº 90 - Hex: b1)', true],
	'b2': [false, '(Unknown Char / Function Nº 91 - Hex: b2)', true],
	'b3': [false, '(Unknown Char / Function Nº 92 - Hex: b3)', true],
	'b4': [false, '(Unknown Char / Function Nº 93 - Hex: b4)', true],
	'b5': [false, '(Unknown Char / Function Nº 94 - Hex: b5)', true],
	'b6': [false, '(Unknown Char / Function Nº 95 - Hex: b6)', true],
	'b7': [false, '(Unknown Char / Function Nº 96 - Hex: b7)', true],
	'b9': [false, '(Unknown Char / Function Nº 98 - Hex: b9)', true],
	'ba': [false, '(Unknown Char / Function Nº 99 - Hex: ba)', true],
	'bb': [false, '(Unknown Char / Function Nº 100 - Hex: bb)', true],
	'bc': [false, '(Unknown Char / Function Nº 101 - Hex: bc)', true],
	'bd': [false, '(Unknown Char / Function Nº 102 - Hex: bd)', true],
	'bf': [false, '(Unknown Char / Function Nº 104 - Hex: bf)', true],
	'c2': [false, '(Unknown Char / Function Nº 107 - Hex: c2)', true],
	'c3': [false, '(Unknown Char / Function Nº 108 - Hex: c3)', true],
	'c4': [false, '(Unknown Char / Function Nº 109 - Hex: c4)', true],
	'c5': [false, '(Unknown Char / Function Nº 110 - Hex: c5)', true],
	'c6': [false, '(Unknown Char / Function Nº 111 - Hex: c6)', true],
	'c7': [false, '(Unknown Char / Function Nº 112 - Hex: c7)', true],
	'c8': [false, '(Unknown Char / Function Nº 113 - Hex: c8)', true],
	'c9': [false, '(Unknown Char / Function Nº 114 - Hex: c9)', true],
	'cb': [false, '(Unknown Char / Function Nº 116 - Hex: cb)', true],
	'cc': [false, '(Unknown Char / Function Nº 117 - Hex: cc)', true],
	'cd': [false, '(Unknown Char / Function Nº 118 - Hex: cd)', true],
	'ce': [false, '(Unknown Char / Function Nº 119 - Hex: ce)', true],
	'cf': [false, '(Unknown Char / Function Nº 120 - Hex: cf)', true],
	'd0': [false, '(Unknown Char / Function Nº 121 - Hex: d0)', true],
	'd2': [false, '(Unknown Char / Function Nº 123 - Hex: d2)', true],
	'd3': [false, '(Unknown Char / Function Nº 124 - Hex: d3)', true],
	'd4': [false, '(Unknown Char / Function Nº 125 - Hex: d4)', true],
	'd5': [false, '(Unknown Char / Function Nº 126 - Hex: d5)', true],
	'd6': [false, '(Unknown Char / Function Nº 127 - Hex: d6)', true],
	'd8': [false, '(Unknown Char / Function Nº 129 - Hex: d8)', true],
	'd9': [false, '(Unknown Char / Function Nº 130 - Hex: d9)', true],
	'da': [false, '(Unknown Char / Function Nº 131 - Hex: da)', true],
	'db': [false, '(Unknown Char / Function Nº 132 - Hex: db)', true],
	'dc': [false, '(Unknown Char / Function Nº 133 - Hex: dc)', true],
	'dd': [false, '(Unknown Char / Function Nº 134 - Hex: dd)', true],
	'de': [false, '(Unknown Char / Function Nº 135 - Hex: de)', true],
	'df': [false, '(Unknown Char / Function Nº 136 - Hex: df)', true],
	'e0': [false, '(Unknown Char / Function Nº 137 - Hex: e0)', true],
	'e1': [false, '(Unknown Char / Function Nº 138 - Hex: e1)', true],
	'e2': [false, '(Unknown Char / Function Nº 139 - Hex: e2)', true],
	'e3': [false, '(Unknown Char / Function Nº 141 - Hex: e3)', true],
	'e4': [false, '(Unknown Char / Function Nº 142 - Hex: e4)', true],
	'e5': [false, '(Unknown Char / Function Nº 143 - Hex: e5)', true],
	'e6': [false, '(Unknown Char / Function Nº 144 - Hex: e6)', true],
	'e7': [false, '(Unknown Char / Function Nº 145 - Hex: e7)', true],
	'e8': [false, '(Unknown Char / Function Nº 146 - Hex: e8)', true],
	'e9': [false, '(Unknown Char / Function Nº 147 - Hex: e9)', true],
	'eb': [false, '(Unknown Char / Function Nº 148 - Hex: eb)', true],
	'ec': [false, '(Unknown Char / Function Nº 149 - Hex: ec)', true],
	'ed': [false, '(Unknown Char / Function Nº 150 - Hex: ed)', true],
	'ee': [false, '(Unknown Char / Function Nº 151 - Hex: ee)', true],
	'ef': [false, '(Unknown Char / Function Nº 152 - Hex: ef)', true],
	'f1': [false, '(Unknown Char / Function Nº 154 - Hex: f1)', true],
	'f2': [false, '(Unknown Char / Function Nº 155 - Hex: f2)', true],
	'f6': [false, '(Unknown Char / Function Nº 159 - Hex: f6)', true],
	'f7': [false, '(Item Separator)',						   false],
	//
	'a0': [false, '(Function: Climax)', false],
	'fb': [false, '(Yes / No)', false],
	'fc': [false, '(Line Break)<br>', false], // Enter
	'fd': [false, '(Pause)', false],
	'ff': [false, '(Unknown CHAR)', false],
	// Special commands (functions)
	'70': [true, '(Function: Select Option ', 					   11],
	'fa': [true, '(Function: Show Message ', 	    	 			1],
	'fe': [true, '<br>(Function: End Message ',				 		2],
	'ea': [true, '(Function: Show Special Char ',				 	4], // (Depende do valor inserido)
	'f0': [true, '(Function: Show Special Char ',			 		4], // (Depende do valor inserido)
	'f8': [true, '(Function: Show Item Name ',	 		 			5],
	'f3': [true, '(Function: Play SE ', 			     			6], // (Depende do valor inserido) 
	/* 
		Info: Se o valor na frente de F3 for 43, O game irá executar o som da arma equipada.
		Mas, quando esse comando for executado, alguns sons de menu / porta irão deixar de ser reproduzidos.
		Isso parece depender do soundset que foi carregado no mapa.

		Pelo menos no mapa R105.RDT (Brad entra no bar)
	*/
	'f4': [true, '(Function: Change Camera ', 			 			7], // Trocar Camera
	'f5': [true, '(Unknown Command used on R101.RDT ', 	 			8], // Comando usado na cutscene "Septemer, 28" - mais referências em MSG.js
	'f9': [true, '(Function: Text Color ', 				 			9], // Formatação - Cor Verde
	'*#': [false,'(Next Option)', 				 	 			false], // Segunda Opção de climax
	// CT-STARS PATCH COMPAT
	'd7': [false, ' ', false],
	'3c': [false, 'ã', false],
	'b8': [false, 'á', false],
	'be': [false, 'ç', false],
	'c0': [false, 'é', false],
	'c1': [false, 'ê', false],
	'ca': [false, 'ó', false],
	'd1': [false, 'ú', false]
}
var RDT_camHeaderType = {
	'b280': [true],
	'b773': [true],
	'2d91': [true],
	'347b': [true],
	'3676': [true],
	'3087': [true],
	'38f2': [true],
	'3c68': [true]
}
var ROFS_STATUS = {
	1:  ['Doors (.DO2)'],
	2:  ['DATA_AE and ETC2 (.TIM)'],
	3:  ['DATA and ETC (.TIM, .SLD, .DAT)'],
	4:  ['DATA_E (.TIM, .DAT, .PIX)'],
	5:  ['Models (.PLD and .PLW)'],
	6:  ['DATA_A (.PLD and .TIM)'],
	7:  ['Sounds (.VB, .VH and BGM\'s)'],
	8:  ['Backgrounds (BSS - .JPG and .SLD)'],
	9:  ['ROOM (.EMD and .TIM)'],
	10: ['ROOM - EMD08 (.EMD and .TIM)'],
	11: ['ROOM (.RBJ)'],
	12: ['DATA_AJ - Easy mode (.RDT)'],
	13: ['DATA_E - Hard mode (.RDT)'],
	14: ['Voices (.WAV)'],
	15: ['Background music (.WAV)']
}
var MAIN_exludeFileFormats = [
	'.rdt',
	'.txt',
	'.msg',
	'.sav',
	'.exe',
	'.ini',
	'.r3ditor',
	'.rdtmap2',
	'.tim',
	'.sld',
	'.rbj',
	'.ard',
	'.dat'
]
// Remove this hack later!
var RDT_ARD_tempExclude = [
	'R10B',
	'R10C',
	'R10D',
	'R10E',
	'R204',
	'R20B',
	'R212',
	'R213',
	'R216',
	'R306',
	'R30A',
	'R312',
	'R40E',
	'R416',
	'R50B'
];
var RDT_ARD_tempPointerDatabase = {
	// Name    RDT     ARD
	'R100': ['ffff', 'ffff'],
	'R101': ['0100', '0888'],
	'R102': ['ffff', '0100'],
	'R103': ['0100', '0100'],
	'R104': ['0100', '0100'],
	'R105': ['ff02', 'ff02'],
	'R106': ['0100', '0100'],
	'R107': ['ad04', 'ad04'],
	'R108': ['0100', '0100'],
	'R109': ['0100', '0100'],
	'R10A': ['0100', '0100'],
	'R10B': ['', ''], // This one does not have text!
	'R10C': ['', ''], // This one does not have text!
	'R10D': ['', ''], // This one does not have text!
	'R10E': ['', ''], // This one does not have text!
	'R10F': ['0800', '0800'],
	'R110': ['0100', 'bcb2'],
	'R111': ['ff31', 'ff31'],
	'R112': ['4868', '4868'],
	'R113': ['81d6', '81d6'],
	'R114': ['0100', '0100'],
	'R115': ['3000', '3000'],
	'R116': ['0100', '0100'],
	'R117': ['0101', '0101'],
	'R118': ['0100', '0100'],
	'R119': ['0100', '0100'],
	'R11A': ['0000', '0000'],
	'R11B': ['0100', '0000'],
	'R11C': ['5756', '5756'],
	'R11D': ['ffff', '0100'],
	'R11E': ['0100', '0100'],
	'R11F': ['0100', '0100'],
	'R120': ['1000', '0100'],
	'R121': ['1840', '1048'],
	'R122': ['0100', '0100'],
	'R123': ['0100', '0100'],
	'R124': ['050b', '050b'],
	'R125': ['1100', '1100'],
	'R200': ['0100', '3800'],
	'R201': ['0100', '0100'],
	'R202': ['0000', '0000'],
	'R203': ['2121', '3117'],
	'R204': ['', ''], // This one does not have text!
	'R205': ['0707', '0905'],
	'R206': ['0100', '0100'],
	'R207': ['0000', '0100'],
	'R208': ['0100', '0100'],
	'R209': ['1000', '0100'],
	'R20A': ['0100', '0100'],
	'R20B': ['', ''], // Fuck this map - owo
	'R20C': ['0100', '0100'],
	'R20D': ['2808', '2808'],
	'R20E': ['0100', '1800'],
	'R20F': ['0000', '0000'],
	'R210': ['0800', '0800'],
	'R211': ['0100', '0100'],
	'R212': ['', ''], // This map is very odd!
	'R213': ['', ''], // This one does not have text!
	'R214': ['0100', '5078'], 
	'R215': ['0100', '0100'],
	'R216': ['', ''], // This one does not have text!
	'R217': ['0100', '0100'],
	'R218': ['0100', '0100'],
	'R219': ['9038', '9038'],
	'R21A': ['3820', '3820'],
	'R21B': ['0100', '0100'],
	'R300': ['0000', '0000'],
	'R301': ['0000', '0000'],
	'R302': ['0100', '0100'],
	'R303': ['6030', '6030'],
	'R304': ['1000', '1000'],
	'R305': ['0100', '0100'],
	'R306': ['', ''], // This one does not have text!
	'R307': ['1919', '1919'],
	'R308': ['0100', '0100'],
	'R309': ['0100', '0100'],
	'R30A': ['', ''], // This one does not have text!
	'R30B': ['0000', '0000'],
	'R30C': ['0100', '0100'],
	'R30D': ['2800', '2000'],
	'R30E': ['0100', '0100'],
	'R30F': ['5020', '5020'],
	'R310': ['0100', '0100'],
	'R311': ['3800', '3800'],
	'R312': ['', ''], // This one does not have text!
	'R313': ['0100', '0100'],
	'R314': ['0000', '0000'],
	'R315': ['0100', '0000'],
	'R316': ['0000', '0000'],
	'R317': ['0100', '0100'],
	'R400': ['0100', '0100'],
	'R401': ['0100', '0100'],
	'R402': ['0100', '1800'],
	'R403': ['0100', '0100'],
	'R404': ['0100', '0100'],
	'R405': ['0100', '0100'],
	'R406': ['0000', '0000'],
	'R407': ['0000', '0000'],
	'R408': ['0000', '0000'],
	'R409': ['30a0', '30a0'],
	'R40A': ['0100', '0800'],
	'R40B': ['0100', '0100'],
	'R40C': ['0100', '0100'],
	'R40D': ['0100', '0100'],
	'R40E': ['', ''], // This one does not have text!
	'R40F': ['0100', '0100'],
	'R410': ['0100', '0100'],
	'R411': ['0100', '0100'],
	'R412': ['0000', '0000'],
	'R413': ['0100', '0100'],
	'R414': ['0100', '0100'],
	'R415': ['2800', '2000'],
	'R416': ['', ''], // This one... OOF
	'R417': ['0100', '0100'],
	'R500': ['0100', '0100'],
	'R501': ['4010', '4010'],
	'R502': ['0100', '0100'],
	'R503': ['10b8', '10b8'],
	'R504': ['0100', '0505'],
	'R505': ['ffff', 'ffff'],
	'R506': ['0100', '0100'],
	'R507': ['0100', '0100'],
	'R508': ['0100', '1800'],
	'R509': ['0000', '0000'],
	'R50A': ['1800', '1800'],
	'R50B': ['', ''], // This one does not have text!
	'R50C': ['0000', '0000'],
	'R50D': ['1800', '1800'],
	'R50E': ['0189', '0189'],
	'R50F': ['0100', '0100'],
	'R510': ['38b8', '38b8']
}
var MSG_TEXTCOLOR = {
	/* 
		Text Colors:
		Take the hex value and split in 2 (Example: The hex "30" becomes "3, 0")
		Regardless the first number (3), The 2nd number (0) is the color.
		(01, 31, 21, 51 and F1 are the same text color - in this case, Green.)

		"Close Tag" is used to stop displaying the text with special color - like when we close a tag in HTML.
		Example:

		  1    2			     3					 4    5
		FA02 F931 2E413E413F3F3D3A4F00214F3F3D4C41 F900 FE00
	
		1) Start Message
		2) F931 - Change the text color to green
		3) Message with special color
		4) F900 - Change the text color back to normal (Close Tag)
		5) End Message
	*/
	'0': 'Default Color',
	'1': 'Green',
	'2': 'Wine Red',
	'3': 'Dark Grey',
	'4': 'Blue',
	'5': 'Default Color',
	'6': 'Transparent',
	'7': 'Transparent',
	'8': 'Transparent',
	'9': 'Transparent',
	'a': 'Transparent',
	'b': 'Transparent',
	'c': 'Transparent',
	'd': 'Transparent',
	'e': 'Transparent',
	'f': 'Transparent',
	'00': 'Close Tag' 
}
var MSG_CHARESPECIAL = {
	'ea10': 'L2',
	'ea11': 'R2',
	'ea12': '&',
	'ea13': '...',
	'ea14': '[',
	'ea15': ']',
	'ea16': 'L1',
	'ea17': 'R1',
	'ea18': 'PS1 Triangle',
	'ea19': 'PS1 Circle',
	'ea1a': 'PS1 Cross',
	'ea1b': 'PS1 Square',
	'ea1c': 'Blank Square',
	'ea1d': 'Alternative Cross',
	'ea24': 'S.',
	'ea25': 'T.',
	'ea26': 'A.',
	'ea27': 'R.',
	'ea28': ';',
	'ea29': 'I',
	'ea2a': 'II',
	'ea2b': 'III',
	'ea2c': '%',
	// Extra for CUSTOM R3DITOR TEXE.TIM
	'ea2d': 'á',
	'ea2e': 'à',
	'ea2f': 'â',
	'ea30': 'ã',
	'ea31': 'é',
	'ea32': 'õ',
	'ea33': 'ç',
	'ea34': 'ê',
	//
	'ea35': '!?'
}
var MSG_DICIONARIO_REVERSO = {
	// You are not seeing this!
	';': 'ea28',
	'%': 'ea2c',
	'&': 'ea12',
	'[': 'ea14',
	']': 'ea15',
	'(': '05',
	')': '06',
	// Comum
	' ': '00',
	'.': '01',
	'º': '02',
	'<': '05',
	'>': '06',
	'0': '0c',
	'"': '09',
	'"': '0a',
	'1': '0d',
	'2': '0e',
	'3': '0f',
	'4': '10',
	'5': '11',
	'6': '12',
	'7': '13',
	'8': '14',
	'9': '15',
	':': '16',
	',': '18',
	'^': '19',
	'!': '1a',
	'?': '1b',
	'$': '1c',
	'A': '1d',
	'B': '1e',
	'C': '1f',
	'D': '20',
	'E': '21',
	'F': '22',
	'G': '23',
	'H': '24',
	'I': '25',
	'J': '26',
	'K': '27',
	'L': '28',
	'M': '29',
	'N': '2a',
	'O': '2b',
	'P': '2c',
	'Q': '2d',
	'R': '2e',
	'S': '2f',
	'T': '30',
	'U': '31',
	'V': '32',
	'W': '33',
	'X': '34',
	'Y': '35',
	'Z': '36',
	'+': '37',
	'/': '38',
	'-': '39',
	'\'': '3a',
	'-': '3b',
	'a': '3d',
	'b': '3e',
	'c': '3f',
	'd': '40',
	'e': '41',
	'f': '42',
	'g': '43',
	'h': '44',
	'i': '45',
	'j': '46',
	'k': '47',
	'l': '48',
	'm': '49',
	'n': '4a',
	'o': '4b',
	'p': '4c',
	'q': '4d',
	'r': '4e',
	's': '4f',
	't': '50',
	'u': '51',
	'v': '52',
	'w': '53',
	'x': '54',
	'y': '55',
	'z': '56',
	// format
	'ü': '51',
	'ú': '51',
	'ù': '51',
	'û': '51',
	'è': '41',
	'ë': '41',
	'ò': '4b',
	'ô': '4b',
	'ö': '4b',
	'ã': '3d',
	'ä': '3d',
	'í': '45',
	'ï': '45',
	'ì': '45',
	// Extra for CUSTOM TEXE.TIM
	'á': '5a',
	'à': '5b',
	'â': '5c',
	'ã': '5d',
	'é': '5e',
	'õ': '5f',
	'ç': '60',
	'ê': '61',
	'ó': '62',
	'=': '63',
	// Special functions
	'#': 'a0', // Climax
	'~': 'fe', // Segunda alternativa de climax
	'{': '09', // Aspas Duplas Abrindo
	'}': '0a', // Aspas Duplas Fechando 
	'*': 'fb', // Yes / No
	'@': 'fc', // Enter / Break line
	'|': 'fd', // Pause Text
}
/*
	Compressed Database
*/
var special_day_00 = 'IlNlcHRlbWJlciAyOHRoLCBEYXlsaWdodC4gVGhlIG1vbnN0ZXJzIGhhdmUgb3ZlcnRha2VuIHRoZSBjaXR5LiBTb21laG93Li4uIEknbSBzdGlsbCBhbGl2ZSEiIC0gSmlsbCBWYWxlbnRpbmUsIFJlc2lkZW50IEV2aWwgMyAtIE5lbWVzaXMu';
// :):
var speci_day_ffff = 'Tm8gbWF0dGVyIGhvdyBpIHRyeSB0byBwcm92ZSB0aGF0IGkgY2FuIGJlIGdvb2QgdG9vLi4uIGkgd2lsbCBuZXZlciBiZSBhYmxlIHRvIHByb3ZlIG15IHBvaW50LiBUaGlzIGlzIG5vdCBsaWtlIGEgb2RkLXNoYXBlZCBvYmplY3QgdGhhdCBt' +
					 'YWtlcyBzZW5zZSB3aGVuIHlvdSBsb29rIG9uIGEgc3BlY2lmaWMgYW5nbGUuIE15IG1pbmQgYWx3YXlzIHRlbGxzIG1lIHRoZSB0cnV0aCAtIHJlZ2FyZGxlc3Mgb2YgaG93IHBhaW5mdWxsIGl0IGNhbiBiZS4='; 
var special_day_01 = 'T2N0b2JlciAxc3QsIG5pZ2h0LiBJIHdva2UgdXAgdG8gdGhlIHNvdW5kIG9mIGZhbGxpbmcgcmFpbi4gSSBjYW4ndCBiZWxpZXZlIEknbSBzdGlsbCBhbGl2ZS4uLiAtIEppbGwgVmFsZW50aW5lLCBSZXNpZGVudCBFdmlsIDMgLSBOZW1lc2lz';
/*
	TIM Database
*/
var TIM_BPP = {
	//  HEX     TYPE       BPP          POS (String)
	'08000000': [1,			   '4 BPP', 0],    // WIP
	'09000000': [2,			   '8 BPP', 1084], // WIP
	'02000000': [3,			  '16 BPP', 0],    // This format don't have any CLUT [WIP]
	'03000000': [4,			  '24 BPP', 0],    // This format don't have any CLUT [WIP]
	'00000000': [5,  '4 BPP (No CLUT)', 0],    // WIP
	'01000000': [6,  '8 BPP (No CLUT)', 0]     // WIP
}
var TIM_EXCLUDEPATTERN = {
	'0000': [true]
}
var MEMJS_HEXPOS = {
	/*
		Memory postions for reading in-game information.
		All read commands are processed with MEM_JS.BYTE (int) and converted to hex.

		Mode 1 = RE3 Eidos
	*/
	// Jill Inventory
	'RE3_mode_1_J_invent_item-1':  	[0xA622A4, 0xA622A5, 0xA622A6, 0xA622A7],
	'RE3_mode_1_J_invent_item-2':  	[0xA622A8, 0xA622A9, 0xA622AA, 0xA622AB],
	'RE3_mode_1_J_invent_item-3':  	[0xA622AC, 0xA622AD, 0xA622AE, 0xA622AF],
	'RE3_mode_1_J_invent_item-4':  	[0xA622B0, 0xA622B1, 0xA622B2, 0xA622B3],
	'RE3_mode_1_J_invent_item-5':  	[0xA622B4, 0xA622B5, 0xA622B6, 0xA622B7],
	'RE3_mode_1_J_invent_item-6':  	[0xA622B8, 0xA622B9, 0xA622BA, 0xA622BB],
	'RE3_mode_1_J_invent_item-7':  	[0xA622BC, 0xA622BD, 0xA622BE, 0xA622BF],
	'RE3_mode_1_J_invent_item-8':  	[0xA622C0, 0xA622C1, 0xA622C2, 0xA622C3],
	'RE3_mode_1_J_invent_item-9':  	[0xA622C4, 0xA622C5, 0xA622C6, 0xA622C7],
	'RE3_mode_1_J_invent_item-10': 	[0xA622C8, 0xA622C9, 0xA622CA, 0xA622CB],
	// Carlos Inventory
	'RE3_mode_1_C_invent_item-1':  	[0xA623E4, 0xA623E5, 0xA623E6, 0xA623E7],
	'RE3_mode_1_C_invent_item-2':  	[0xA623E8, 0xA623E9, 0xA623EA, 0xA623EB],
	'RE3_mode_1_C_invent_item-3':  	[0xA623EC, 0xA623ED, 0xA623EE, 0xA623EF],
	'RE3_mode_1_C_invent_item-4':  	[0xA623F0, 0xA623F1, 0xA623F2, 0xA623F3],
	'RE3_mode_1_C_invent_item-5':  	[0xA623F4, 0xA623F5, 0xA623F6, 0xA623F7],
	'RE3_mode_1_C_invent_item-6':  	[0xA623F8, 0xA623F9, 0xA623FA, 0xA623FB],
	'RE3_mode_1_C_invent_item-7':  	[0xA623FC, 0xA623FD, 0xA623FE, 0xA623FF],
	'RE3_mode_1_C_invent_item-8':  	[0xA62400, 0xA62401, 0xA62402, 0xA62403],
	'RE3_mode_1_C_invent_item-9':  	[0xA62404, 0xA62405, 0xA62406, 0xA62407],
	'RE3_mode_1_C_invent_item-10': 	[0xA62408, 0xA62409, 0xA6240A, 0xA6240B],
	// JIll Hex Pos.
	'RE3_mode_1_xPosition': 	    [0xA5CD68, 0xA5CD69],
	'RE3_mode_1_yPosition': 	    [0xA5CD70, 0xA5CD71],
	'RE3_mode_1_zPosition': 	    [0xA5CD6C, 0xA5CD6D],
	'RE3_mode_1_rPosition': 	    [0xA5CDA2, 0xA5CDA3],
	// Current Stage, Room number & Cam
	'RE3_mode_1_Stage': 			[0xA620E6],
	'RE3_mode_1_currentCam': 		[0xA5CD2E],
	'RE3_mode_1_currentRoomNumber': [0xA620E8],
	// HP
	'RE3_mode_1_HP': 				[0xA5CE00, 0xA5CE01],
	// Current Weapon
	'RE3_mode_1_currentWeapon': 	[0xA623CD],
	// Current Player
	'RE3_mode_1_currentPlayer': 	[0x6FA402],
	/*
		Title Screen
		Set 0xA5C9C0 to 28 and 0xA5C9C3 to 00 make the game go to title screen
	*/
	'RE3_mode_1_goto_titleScreen':  [0xA5C9C0, 0xA5C9C3]
}
var RE3_playerList = {
	'00': 'No player detected',
	'01': 'Jill Valentine',
	'02': 'Carlos Oliveira'
}
// Used for debug
var MIX_seekPattern = '00021500000000000003150000000000000d15000000000000051600000000000004170000000000';
var IEDIT_seekPattern = '0000000001010000010f0001010f00010107000101060001';
var MIX_function_types = {
	'00': 'Reloading / Sum',
	'01': 'Combine',
	'02': 'Reloading Tool',
	'03': 'Change Bullet Type (Handgun / Magnum)',
	'04': 'Change Bullet Type (G. Launcher)',
	'05': 'Combine Powder with G. Bullets',
	'06': 'Add Infinite Ammo / Quantity'
}
var IEDIT_itemType = {
	'00': 'Empty Slot',
	'01': 'Equipable Weapon',
	'02': 'Ammo',
	'03': 'Healing Item',
	'04': 'Quest / Misc Item A',
	'05': 'Quest / Misc Item B',
	'06': 'Ink Ribbon / Reloading Tool / Game Inst.',
	'07': 'Leftovers A',
	'08': 'Leftovers B'
}
var IEDIT_displayMode = {
	'00': 'No Display',
	'01': 'Number in green color',
	'02': 'Percentage in green color',
	'03': 'Infinite in green color',
	'04': 'Transparent',
	'05': 'Number in red color',
	'06': 'Percentage in red color',
	'07': 'Infinite in red color',
	'09': 'Number in yellow color',
	'0a': 'Percentage in yellow color',
	'0b': 'Infinite in yellow color',
	'0d': 'Number in blue color',
	'0e': 'Percentage in blue color',
	'0f': 'Infinite in blue color'
}
var UTILS_REMOVE_CHARS = [
	',',
	'.',
	';',
	'~',
	'^',
	'´',
	'`',
	'_',
	'-',
	'+',
	'-',
	'*',
	'%',
	'$',
	'#',
	'!',
	'¨',
	'&',
	'(',
	')',
	'[',
	']',
	'?',
	'º',
	'{',
	'}',
	'=',
	'§',
	'º',
	'G',
	'g',
	'H',
	'h',
	'I',
	'i',
	'J',
	'j',
	'K',
	'k',
	'L',
	'l',
	'M',
	'm',
	'N',
	'n',
	'O',
	'o',
	'P',
	'p',
	'Q',
	'q',
	'R',
	'r',
	'S',
	's',
	'U',
	'u',
	'W',
	'w',
	'X',
	'x',
	'Y',
	'y',
	'Z',
	'z'
];
var RDT_CAMERAS_CAMTYPES = {
	'0000': 'Normal',
	'0100': 'Cutscene?'
}
/*
	File Types
*/
var IEDIT_fileTypes = {
	'residentevil3': ['PC EXE',  2448160, 2449232, '.exe'], // PC Version
	'slus_009.23':   ['PS SLUS', 1186344, 1187416,  '.23'], // Playstation Version
	'main.dol':      ['GC DOL',  4375520, 4376592, '.dol'], // GameCube Version
	'1st_read.bin':  ['DC BIN',  2835856, 2836928, '.BIN']  // Sega Dreamcast Version
}
var MIX_fileTypes = {
	'residentevil3': ['PC EXE',  2449536, 2451536, '.exe'], // PC Version
	'slus_009.23': 	 ['PS SLUS', 1187720, 1189720,  '.23'], // Playstation Version
	'main.dol': 	 ['GC DOL',  4376896, 4378896, '.dol'], // GameCube Version
	'1st_read.bin':  ['DC BIN',  2837232, 2839232, '.BIN']  // Sega Dreamcast Version
}
var DROP_fileTypes = {
	'residentevil3': ['PC EXE',  0, '.exe'], // PC Version
	'slus_009.23': 	 ['PS SLUS', 1,  '.23'], // Playstation Version
	'main.dol': 	 ['GC DOL',  2, '.dol'], // GameCube Version
	'1st_read.bin':  ['DC BIN',  3, '.BIN']  // Sega Dreamcast Version
}
var RANGES = {
	/*
		RE3SET Editor
		Edit Starting items, Starting pos. and more
	*/
	// Item start
	'RE3SET_invent_0_startItems': [2441496, 2441656], // PC version
	'RE3SET_invent_1_startItems': [1184536, 1184696], // PS version
	'RE3SET_invent_2_startItems': [0, 0],			  // GAMECUBE Invent are not stored on main.dol!
	'RE3SET_invent_3_startItems': [2833760, 2833920], // DC version
	/*
		DROP
		Nemesis Item Drops
	*/
	// PC
	'DROP_0_itemIds': 	[2453680, 2453696],
	'DROP_0_itemQuant': [2453696, 2453712],
	// PS
	'DROP_1_itemIds': 	[1169792, 1169808],
	'DROP_1_itemQuant': [1169808, 1169824],
	// GC
	'DROP_2_itemIds': 	[4592272, 4592288],
	'DROP_2_itemQuant': [4592288, 4592304],
	// DC
	'DROP_3_itemIds': 	[2813296, 2813312],
	'DROP_3_itemQuant': [2813312, 2813328],
	/*
		IEDIT
		Item proprieties
	*/
	'IEDIT_ITEM_TYPE': 	  [0, 2],
	'IEDIT_MAX_CAPACITY': [2, 4],
	'IEDIT_CODE_QUEST':   [4, 6],
	'IEDIT_DISPLAY_MODE': [6, 8],
	/*
		MIX
		Ingame item combinations
	*/
	'MIX_HEX_currentFunction': [0, 2],
	// 00: Reload / Sum
	'MIX_ReloadSum_Weapon':    [2, 4],
	'MIX_ReloadSum_Ammo': 	   [4, 6],
	'MIX_ReloadSum_Offset':    [6, 16],
	// 01: Combinations
	'MIX_Combine_Item_A': 	   [2, 4],
	'MIX_Combine_Item_B': 	   [4, 6],
	'MIX_Combine_Value_A': 	   [6, 8],
	'MIX_Combine_Value_B': 	   [8, 10],
	'MIX_Combine_Offset': 	   [10, 16],
	// 02: Reloading Tool
	'MIX_reload_rTool': 	   [2, 4],
	'MIX_reload_item': 		   [4, 6],
	'MIX_reload_result': 	   [6, 8],
	'MIX_reload_quantity': 	   [8, 10],
	'MIX_reload_offset': 	   [10, 16],
	// 03: Change Bullet Type (Handgun / Magnum)
	'MIX_handMag_Weapon': 	   [2, 4],
	'MIX_handMag_Ammo': 	   [4, 6],
	'MIX_handMag_result': 	   [6, 8],
	'MIX_handMag_offset': 	   [8, 16],
	// 04: Change Bullet Type (G. Launcher)
	'MIX_GL_weapon': 		   [2, 4],
	'MIX_GL_ammo': 			   [4, 6],
	'MIX_GL_newWeapon': 	   [6, 8],
	'MIX_GL_newAmmo': 		   [8, 10],
	'MIX_GL_offset': 		   [10, 16],
	// 05: Combine G. Powder + G. Rounds
	'MIX_PowderGR_ammo': 	   [2, 4],
	'MIX_PowderGR_powder': 	   [4, 6],
	'MIX_PowderGR_newAmmmo':   [6, 8],
	'MIX_PowderGR_quantity':   [8, 10],
	'MIX_PowderGR_offset': 	   [10, 16],
	// 06: Infinite Ammo / Quantity
	'MIX_infinite_newInf': 	   [2, 4],
	'MIX_infinite_infItem':    [4, 6],
	'MIX_infinite_offset': 	   [6, 16],
	/*
		Game version (Baseado no primeiro indicador de save / info na primeira vez que o player salvou)

		Devido a essa parte ser semelhante ao código ID de games de PS1 (como "BESLES"), eu acredito que esse seja
		o indicador da versão do game.
	*/
	'gameEdition':  	  [276, 288],
	/*
		Header (Cabeçalho)

		O Inicio do arquivo de save contém um pequeno espaço nulo "00" até o primeiro indicador de save na posição
		0x80 (51 00 00 00 00 20 00 00 FF FF + Versão do game).
		Entre cada indicador, existe um espaço de 68 espaços nulos até a posição do save de Nº 15.
		Após isso, eu não percebi nenhuma mudança no espaço em diante até o 1º slot de save (0x2000).
	*/
	'slot-offset':  		 [16384], // Distancia (offset) entre cada slot de save
	'he-esp-incial': 	    [0, 256], // Espaço inicial até o 1º indicador
	'he-esp-meio':   	  [304, 512], // Espaço entre cada indicador
	'he-esp-final':    [3888, 16384], // Espaço final até o 1º slot de save
	'he-indicador-1':     [256, 304], // Indicador do 1º Slot
	'he-indicador-2':     [512, 560], // Indicador do 2º Slot
	'he-indicador-3':     [768, 816], // Indicador do 3º Slot
	'he-indicador-4':   [1024, 1072], // Indicador do 4º Slot
	'he-indicador-5':   [1280, 1328], // Indicador do 5º Slot
	'he-indicador-6':   [1536, 1584], // Indicador do 6º Slot
	'he-indicador-7':   [1792, 1840], // Indicador do 7º Slot
	'he-indicador-8':   [2048, 2096], // Indicador do 8º Slot
	'he-indicador-9':   [2304, 2352], // Indicador do 9º Slot
	'he-indicador-10':  [2560, 2608], // Indicador do 10º Slot
	'he-indicador-11':  [2816, 2864], // Indicador do 11º Slot
	'he-indicador-12':  [3072, 3120], // Indicador do 12º Slot
	'he-indicador-13':  [3328, 3376], // Indicador do 13º Slot
	'he-indicador-14':  [3584, 3632], // Indicador do 14º Slot
	'he-indicador-15':  [3840, 3888], // Indicador do 15º Slot
	/* 			
		Save - Info por slot:
		Uma das diferenças do save do Resident Evil 2 comparado ao Resident Evil 3 é que agora o jogador
		está limitado a 15 slots de saves, pois todos eles estão em um único arquivo. Porém, por mais que 
		dessa forma os arquivos de save de cada jogos sejam distintos, os dois tem o cabeçalho de save (0x2000) 
		com o começo semelhante. (SC..)

		Ordem de variaveis do save:
			   Nome 		     Hex Pos. 	
		1) Header (SC...) 		 0x2000 														OK
		2) Tempo IGT 	  		 0x2200 até 0x2203												OK
		@) 0x2204-2207																			OK
		3) Dificuldade 	  		 0x2208 														OK
		@) 0x2209-0x220D 																		OK
		4) Coordenadas X  		 0x220E															OK
		@) 0x2210-0x2211 																		OK
		5) Coordenadas Y  		 0x2212 														OK
		6) HP Jill/Carlos 		 0x2214 														OK
		7) Epílogos 	  		 0x2216															OK
		@) 0x2217-0x2217																		OK
		8) Nº Saves 	  		 0x2218 														OK
		9) Poison Status 		 0x221A 														OK
		10) Nome da sala de save 0x221B 														OK
		@) 0x221C-0x224D 																		OK
		11) Local da cidade 	 0x224E 														OK
		@) 0x224F-0x224F 																		OK
		12) Room / Evento 		 0x2250 														OK
		@) 0x2251-0x225D																		OK
		13) Personagem Atual 	 0x225E 														OK
		@) 0x225F-0x23FE 																		OK
		14) Mapas A 			 0x23FF 														OK
		@) 0x2400-0x2402 																		OK
		15) Mapas B 			 0x2403 														OK
		16) Files 				 0x2404 até 0x2409 												OK
		@) 0x240A-0x240B 																		OK
		17) Invent.  da Jill     0x240C até 0x2433 (Levando em conta os 32 Bytes de cada slot) 	OK
		18) Baú da Jill 		 0x2434 até 0x2533 (Levando em conta os 32 Bytes de cada slot)  OK
		@) 0x2534-0x2534																		OK
		19) Arma atual da Jill   0x2535 		   (8 Bytes, apenas a ID da arma)				OK
		20) Sidepack da Jill     0x2536 														OK
		@) 0x2537-0x254B 																		OK
		21) Invent.  do Carlos   0x254C até 0x2573 (Levando em conta os 32 Bytes de cada slot)  OK
		22) Baú do Carlos 		 0x2574 até 0x2673 (Levando em conta os 32 Bytes de cada slot)  OK
		@) 0x2674-0x2674 																		OK
		23) Arma atual do Carlos 0x2675			   (8 Bytes, apenas a ID da arma)				OK
		24) Sidepack do Carlos   0x2676 														OK
		25) Roupa da Jill 		 0x28D4															OK
		26) Final do Save 		 0x28D5 até 0x3FFF												OK
	*/
	// Headers
	'save_HEADER': 		   [0, 1024], // Header do save (SC..)
	'save_END': 	   [4522, 16384], // Final do save
    /*
		Espaços não mapeados:

		Esses espaços contém posições hex com outras variaveis que não foram mapeadas / desobertas 
		através de engenharia reversa.
		
		Eles serão preservados para poder reconstruir o arquivo de save inteiro novamente.
    */
    '0x2204-0x2207': 	[1032, 1040], // Offset entre IGT e Dificuldade
    '0x2209-0x220D':    [1042, 1052], // Offset entre Dificuldade e Posição X
    '0x2210-0x2211': 	[1056, 1060], // Offset entre Posição X e Posição Y
    '0x2217-0x2217': 	[1070, 1072], // Offset entre Epilogos e Nº de Saves
    '0x2219-0x2219': 	[1074, 1076], // Offset entre Nº de Saves e Poison
    '0x221C-0x224D':    [1080, 1180], // Offset entre Nome da sala de save e Local da cidade
    '0x224F-0x224F': 	[1182, 1184], // Offset entre Local da cidade e Room / Event
    '0x2251-0x225D':    [1186, 1212], // Offset entre Room Event e Personagem atual
    '0x225F-0x23FE':    [1214, 2046], // Offset entre Personagem Atual e Mapas A
    '0x2400-0x2402': 	[2048, 2054], // Offset entre Mapas A e Mapas B
    '0x240A-0x240B': 	[2068, 2072], // Offset entre Files e inventário da Jill
    '0x2534-0x2534': 	[2664, 2666], // Offset entre Baú da jill e arma atual da jill
    '0x2537-0x254B':    [2670, 2712], // Offset entre Sidepack da Jill e Inventário do carlos
    '0x2674-0x2674': 	[3304, 3306], // Offset entre o Baú do carlos e a arma atual do carlos
    '0x2677-0x28D3': 	[3310, 4520], // Offset entre arma atual do carlos até a roupa atual da Jill
    // Outras variaveis
	'jillInvent-1':		[2072, 2080], // Inventário da Jill   - Slot 01  - 0x240C
	'jillInvent-2':		[2080, 2088], // Inventário da Jill   - Slot 02  - 0x2410
	'jillInvent-3':		[2088, 2096], // Inventário da Jill   - Slot 03  - 0x2414
	'jillInvent-4':		[2096, 2104], // Inventário da Jill   - Slot 04  - 0x2418
	'jillInvent-5':		[2104, 2112], // Inventário da Jill   - Slot 05  - 0x241C
	'jillInvent-6':		[2112, 2120], // Inventário da Jill   - Slot 06  - 0x2420
	'jillInvent-7':		[2120, 2128], // Inventário da Jill   - Slot 07  - 0x2424
	'jillInvent-8':		[2128, 2136], // Inventário da Jill   - Slot 08  - 0x2428
	'jillInvent-9':		[2136, 2144], // Inventário da Jill   - Slot 09  - 0x242C
	'jillInvent-10':	[2144, 2152], // Inventário da Jill   - Slot 10  - 0x2430
	'carlosInvent-1':   [2712, 2720], // Inventário do Carlos - Slot 01  - 0x254C
	'carlosInvent-2':   [2720, 2728], // Inventário do Carlos - Slot 02  - 0x2550
	'carlosInvent-3':   [2728, 2736], // Inventário do Carlos - Slot 03  - 0x2554
	'carlosInvent-4':   [2736, 2744], // Inventário do Carlos - Slot 04  - 0x2558
	'carlosInvent-5':   [2744, 2752], // Inventário do Carlos - Slot 05  - 0x255c
	'carlosInvent-6':   [2752, 2760], // Inventário do Carlos - Slot 06  - 0x2560
	'carlosInvent-7':   [2760, 2768], // Inventário do Carlos - Slot 07  - 0x2564
	'carlosInvent-8':   [2768, 2776], // Inventário do Carlos - Slot 08  - 0x2568
	'carlosInvent-9':   [2776, 2784], // Inventário do Carlos - Slot 09  - 0x256C
	'carlosInvent-10':  [2784, 2792], // Inventário do Carlos - Slot 10  - 0x2570
	'leveldificuldade': [1040, 1042], // Level de Dificuldade 			 - 0x2208
	'totalSaves': 		[1072, 1074], // Total de saves 				 - 0x2218
	'localSave': 		[1078, 1080], // ID da sala de save 			 - 0x221B
	'epilogos': 		[1068, 1070], // Total de Epílogos desbloqueados - 0x2216
	'localCidade': 		[1180, 1182], // Local da cidade aonde foi salvo - 0x224E
	'roupaAtual': 		[4520, 4522], // Roupa atual 					 - 0x28D4
	'characterAtual': 	[1212, 1214], // Personagem atual 				 - 0x225E
	'jillArma': 		[2666, 2668], // Arma atual da jill 			 - 0x2535
	'carlosArma': 		[3306, 3308], // Arma atual do carlos 			 - 0x2675
	'jill-side': 		[2668, 2670], // Sidepack da Jill 				 - 0x2536
	'carlos-side': 		[3308, 3310], // Sidepack do Carlos 			 - 0x2676
	'characterPoison':  [1076, 1078], // Personagem está com poison 	 - 0x221A
	'room_event': 		[1184, 1186], // Room / Event 					 - 0x2250
	'mapas-a': 			[2046, 2048], // Mapas do Game (Primeira Hex) 	 - 0x23FF
	'mapas-b': 			[2054, 2056], // Mapas do Game (Segunda Hex)	 - 0x2403
	'jill_files': 		[2056, 2068], // Files do game 					 - 0x2404 to 0x2409
	'pos-X':   			[1052, 1056], // Posição X no mapa atual 		 - 0x220E to 0x221F
	'pos-Y':            [1060, 1064], // Posição Y no mapa atual 		 - 0x2212 to 0x2213
	'IGT': 				[1024, 1032], // IGT (In-Game Time) Tempo Atual  - 0x2200 to 0x2203
	'characterHP':    	[1064, 1068], // HP do personagem atual. 		 - 0x2214 to 0x2215
	'j-box': 			[2152, 2656], // Baú da Jill 					 - 0x2535 to 0x2530
	'c-box': 			[2792, 3296], // Baú do Carlos 					 - 0x2574 to 0x2580
	///////////////////////////////////////////////////////////////////////////////////////
	/*
		TIM Ranges [WIP]
	*/
	'TIM_header': 					   [0, 8], // Header
	'TIM_BPP': 						  [8, 16], // Bit Per Pixel (BPP)
	/*
		RDT Ranges [WIP]
	*/
	'RDT_FILE_MAP_HEADER':			 [0, 192],
	// Header
	'RDT_HEADER_CAM_TOTAL':	     	   [0, 4],
	////////////////////////////////////////////////////////////////////////////////////////
	/*
		Item, File or Map
	*/
	'RDT_item-header': 			       [0, 2], // RE2 = 4E, RE3 = 67 || 68...
	'RDT_item-itemIdetifier': 	       [2, 4], // OK
	'RDT_item-espaco1': 		      [4, 12], // OK
	// Header 67
	'RDT_item-0-itemXX': 		     [12, 16], // OK
	'RDT_item-0-itemYY': 		     [16, 20], // OK
	'RDT_item-0-itemZZ': 		     [20, 24], // OK
	'RDT_item-0-itemRR': 		     [24, 28], // OK
	'RDT_item-0-itemID': 		     [28, 30], // OK
	'RDT_item-0-espaco2': 		     [30, 32], // OK
	'RDT_item-0-itemQuant':		     [32, 34], // OK
	'RDT_item-0-espaco3': 		     [34, 38], // OK
	'RDT_item-0-itemFlag': 			 [38, 40], // OK
	'RDT_item-0-modelID': 			 [40, 42], // OK
	'RDT_item-0-itemMP': 		     [42, 44], // OK
	// Header 68
	'RDT_item-1-itemXX': 		     [12, 16],
	'RDT_item-1-itemYY': 		     [16, 20],
	'RDT_item-1-itemZZ': 		     [20, 24],
	'RDT_item-1-itemRR': 		     [24, 28],
	'RDT_item-1-itemID': 		     [44, 46], // OK
	'RDT_item-1-espaco2': 		     [46, 48], // OK
	'RDT_item-1-itemQuant':		     [48, 50], // OK
	'RDT_item-1-espaco3': 		     [34, 42],
	'RDT_item-1-itemMP': 		     [58, 60], // OK
	/*
		Prop models [WIP]
	*/
	'RDT_propModel-header': 		   [0, 2], // RE2 = 2D, RE3 = 7F
	'RDT_propModel-id': 			   [2, 4],
	'RDT_propModel-ident': 			  [4, 24],
	/*
		Enemy [WIP]
	*/
	'RDT_enemy-header': 			   [0, 4], // RE2 = 44, RE3 = 7D
	'RDT_enemy-enemyNumber': 		   [4, 6], // Enemy number (room) Id (PUT FF IF YOU ARE PUTTING A PARTNER)
	'RDT_enemy-type': 				   [6, 8],
	'RDT_enemy-pose': 				  [8, 10],
	'RDT_enemy-extraFlag': 			 [10, 12],
	'RDT_enemy-offset-0': 			 [12, 18],
	'RDT_enemy-soundSet': 			 [18, 20],
	'RDT_enemy-texture': 			 [20, 22],
	'RDT_enemy-enemyFlag': 			 [22, 24],
	'RDT_enemy-xPos': 				 [24, 28],
	'RDT_enemy-yPos': 				 [32, 36],
	'RDT_enemy-zPos': 				 [28, 32],
	'RDT_enemy-rPos': 				 [36, 40],
	'RDT_enemy-offset-1': 			 [40, 48],
	/*
		MSG codes
	*/
	'RDT_msgCode-header': 			   [0, 2], // RE2 = 2C, RE3 = 63 || 64
	'RDT_msgCode-id':  				   [2, 4],
	'RDT_msgCode-identifier': 		  [4, 12], // 04 31 00 00
	// Header 63
	'RDT_msgCode-0-xPos': 			 [12, 16],
	'RDT_msgCode-0-zPos': 			 [16, 20],
	'RDT_msgCode-0-xWidthTrigger': 	 [20, 24],
	'RDT_msgCode-0-zWidthTrigger': 	 [24, 28],
	'RDT_msgCode-0-offset_0': 		 [28, 30], 
	'RDT_msgCode-0-japChars': 		 [30, 32], // (16 [Japanese letters. Game crashes sometimes] and 17 - resevilnemesis30 on RE2 definitive RDT info)
	'RDT_msgCode-0-offset_1': 		 [32, 34], 
	'RDT_msgCode-0-specialProp':	 [34, 36], // (For things like open locked desk with herbs (02) - same as above)
	'RDT_msgCode-0-readMode': 		 [36, 40],
	// Header 64
	'RDT_msgCode-1-xPos': 			 ['WIP', 'WIP'],
	'RDT_msgCode-1-zPos': 			 ['WIP', 'WIP'],
	'RDT_msgCode-1-xWidthTrigger': 	 ['WIP', 'WIP'],
	'RDT_msgCode-1-zWidthTrigger': 	 ['WIP', 'WIP'],
	'RDT_msgCode-1-offset_0': 		 ['WIP', 'WIP'], 
	'RDT_msgCode-1-japChars': 		 ['WIP', 'WIP'], 
	'RDT_msgCode-1-offset_1': 		 ['WIP', 'WIP'], 
	'RDT_msgCode-1-specialProp': 	 ['WIP', 'WIP'], 
	'RDT_msgCode-1-readMode': 		 [52, 56], // OK
	/*
		Cameras
		Length (Hex): 20h - 64 String
		New reading based on REArtist Post:
		(https://www.tapatalk.com/groups/residentevil123/cheat-engine-codes-camera-and-character-position-t1030.html)
	*/
	'RDT_cam-0-type': 			   	   [0, 4], // 0000 = Normal, 0100 = Cutscene?
	'RDT_cam-0-ident': 			   	   [4, 8], // B773..
	'RDT_cam-0-XPos': 			   	  [8, 12],
	'RDT_cam-0-XPos-Sig': 			 [12, 16],
	'RDT_cam-0-YPos': 			   	 [16, 20],
	'RDT_cam-0-YPos-Sig': 			 [20, 24],
	'RDT_cam-0-ZPos': 			   	 [24, 28],
	'RDT_cam-0-ZPos-Sig': 			 [28, 32],
	'RDT_cam-0-XDir': 			   	 [32, 36],
	'RDT_cam-0-XDir-Sig': 		   	 [36, 40],
	'RDT_cam-0-YDir': 			   	 [40, 44],
	'RDT_cam-0-YDir-Sig': 		   	 [44, 48],
	'RDT_cam-0-ZDir': 			   	 [48, 52],
	'RDT_cam-0-ZDir-Sig': 			 [52, 56],
	'RDT_cam-0-RDir': 				 [56, 60],
	'RDT_cam-0-RDir-Sig': 			 [60, 64],
	/*
		Camera Hitbox
		Length (Hex): 14h
		
		Anotações:
		Para verificar, procure por "7C F9 00 00 3C 81 00 00" no 
		arquivo R101.RDT
		
		O que isso faz? Ainda não sei!
		O Tamanho das hitboxes em Hex é 14 (28 em String).

		Desde já vos digo: Valeeeeu residentevilartist! :D
	*/
	'RDT_camHitBox-header': 		   [0, 4], // RE3 = 01 80
	'RDT_camHitBox-0-prevCam': 		   [4, 6],
	'RDT_camHitBox-0-nextCam': 		   [6, 8],
	'RDT_camHitBox-0-X1': 		   	  [8, 12],
	'RDT_camHitBox-0-Y1': 		   	 [12, 16],
	'RDT_camHitBox-0-X2': 		   	 [16, 20],
	'RDT_camHitBox-0-Y2': 		   	 [20, 24],
	'RDT_camHitBox-0-X3': 		   	 [24, 28],
	'RDT_camHitBox-0-Y3': 		   	 [28, 32],
	'RDT_camHitBox-0-X4': 		   	 [32, 36],
	'RDT_camHitBox-0-Y4': 		   	 [36, 40],
	/*
		Doors

		Length (Hex):
			Header 61 = 20
			Header 62 = 28
	*/
	'RDT_door-header':         	       [0, 2], // RE2 = 3B, RE3 = 61 || 62
	'RDT_door-id':                     [2, 4],
	'RDT_door-doorIdentifier':        [4, 12],
	// Header 61
	'RDT_door-0-doorXpos':           [12, 16], // OK
	'RDT_door-0-doorYpos': 		     [16, 20], // OK
	'RDT_door-0-doorZpos': 		     [20, 24], // OK
	'RDT_door-0-doorRpos': 		     [24, 28], // OK
	'RDT_door-0-doorNextXpos': 	     [28, 32], // OK
	'RDT_door-0-doorNextYpos': 	     [36, 40], // OK
	'RDT_door-0-doorNextZpos': 	     [32, 36], // OK
	'RDT_door-0-doorNextRpos': 	     [40, 44], // OK
	'RDT_door-0-doorNextStage':      [44, 46], // OK
	'RDT_door-0-doorNextRoomNumber': [46, 48], // OK
	'RDT_door-0-doorNextCamNumber':  [48, 50], // OK
	'RDT_door-0-zIndex': 	 		 [50, 52], // OK
	'RDT_door-0-doorType': 			 [52, 54], // OK
	'RDT_door-0-doorOpenOrient': 	 [54, 56], // OK
	'RDT_door-0-doorHexOffset1': 	 [56, 58], // Unk. Flag
	'RDT_door-0-doorLockedFlag': 	 [58, 60], // OK
	'RDT_door-0-doorKey': 		 	 [60, 62], // OK
	'RDT_door-0-doorDisplayText': 	 [62, 64], // OK
	/*
		Header 62 - Hex Length: 28 (String: 80)
		Sorted in slice order
	*/
	'RDT_door-1-doorXpos':           [12, 16], // OK 
	'RDT_door-1-doorYpos': 		     [16, 20], // OK 
	'RDT_door-1-doorZpos': 		     [20, 24], // OK 
	'RDT_door-1-doorRpos': 		     [24, 28], // OK 
	'RDT_door-1-doorHexOffset0': 	 [28, 44], // Strange Values...
	'RDT_door-1-doorNextXpos': 	     [44, 48], // OK
	'RDT_door-1-doorNextZpos': 	     [48, 52], // OK
	'RDT_door-1-doorNextYpos': 	     [52, 56], // OK
	'RDT_door-1-doorNextRpos': 	     [56, 60], // OK
	'RDT_door-1-doorNextStage':      [60, 62], // OK
	'RDT_door-1-doorNextRoomNumber': [62, 64], // OK
	'RDT_door-1-doorNextCamNumber':  [64, 66], // OK
	'RDT_door-1-zIndex':  	 		 [66, 68], // OK
	'RDT_door-1-doorType': 			 [68, 70], // OK
	'RDT_door-1-doorOpenOrient': 	 [70, 72], // OK
	'RDT_door-1-doorHexOffset1': 	 [72, 74], // Unk. Flag
	'RDT_door-1-doorLockedFlag':  	 [74, 76], // OK
	'RDT_door-1-doorKey': 	 		 [76, 78], // OK
	'RDT_door-1-doorDisplayText': 	 [78, 80], // OK
	/*
		SLD Layers (PRI Masks)
		Header
		(É aqui que o F. King Pira!)
	*/
	'SLD_LAYER_relativeOffsets': [0, 2], // "PRIedit" Relative Offsets
	'SLD_LAYER_offset_1': 		 [2, 4], 
	'SLD_LAYER_count_offsets':   [4, 8], 
	'SLD_LAYER_crp_offset_2':   [8, 12], // Offsets (Block Ammount)
	'SLD_LAYER_offset_0': 	   [12, 16], //
	'SLD_LAYER_X_POS': 		   [16, 20], // Pos. X
	'SLD_LAYER_Y_POS': 		   [20, 24], // Pos. Y
	// Blocks
	'SLD_BLK_source_X': 		 [0, 2], // Source X
	'SLD_BLK_source_Y': 		 [2, 4], // Source Y
	'SLD_BLK_pos_X': 		 	 [4, 6], // Pos. X
	'SLD_BLK_pos_Y': 		 	 [6, 8], // Pos. Y
	'SLD_BLK_offset_1': 	    [8, 10],
	'SLD_BLK_layerPosition':   [10, 12], // Layer pos. is like Photoshop
	'SLD_BLK_model': 		   [12, 14], // Layer Type: 08 = Square, 00 = Rect
	'SLD_BLK_offset_2': 	   [14, 16], // Modify these values can make the image go nuts!
	// Extended (If Rect)
	'SLD_BLK_width': 	   	   [16, 20], // Rect Width 
	'SLD_BLK_height': 		   [20, 24]  // Rect Height
}