/*
	R3ditor - Database.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please!
*/
var ITEM = {
	"00": ["Empty Slot", 									   "", 																																																									   						 "0px 502px 0px 0px",     "-54px", "0", "0", "0", "0", "0"],
	"01": ["Combat Knife", 									   "It is a simple combat Knife<br><br>It can be very useful when you are low on ammunition. In the hand of those who know how to use, it does damage!", 																								   		 "0px 446px 0px 57px",   "-166px", "0", "0", "1", "1", "0"],
	"02": ["Sigpro SP 2009 handgun", 						   "Carlos alternative pistol.<br>Not a big deal but it can help you if you're in the worst ...", 																																	   							 "0px 392px 0px 112px",  "-277px", "0", "0", "2", "2", "0"],
	"03": ["Beretta M92F handgun, custom S.T.A.R.S edition",   "M92F special version of S.T.A.R.S made by Kendo.<br><br>There is a legend has it that those who have no life play using it without ever reloading.", 																										 "0px 335px 0px 168px",  "-390px", "0", "0", "3", "3", "0"],
	"04": ["Shotgun Benelli M3S", 							   "This is a Benelli M3S Shotgun but with a sawed-off barrel.<br><br>It can be a great help if you aim up when you have an enemy nearby!", 								   																					 "0px 280px 0px 224px",  "-500px", "0", "0", "4", "4", "0"],
	"05": ["Smith & Wesson M629C .44-caliber magnum revolver", "It's a magnum boy! Just shoot the foot and the head explodes! <br> Even though it's absurdly powerful, it doesn't quite match the magnum of the previous games. (design)", 														   							 "0px 227px 0px 280px",  "-609px", "0", "0", "5", "5", "0"],
	"06": ["Hk-p Grenade launcher with commmon rounds",		   "It is extremely effective against most enemies in the game.", 																																	   															 "0px 168px 0px 335px",  "-722px", "0", "0", "6", "8", "0"],
	"07": ["Hk-p Grenade launcher with fire rounds",	 	   "It is extremely effective against most enemies in the game.", 																																	   															 "0px 114px 0px 392px",  "-833px", "0", "0", "6", "8", "0"],
	"08": ["Hk-p Grenade launcher with acid rounds",	 	   "It is extremely effective against the worm you find in the cemetery (park).", 																														   														 "0px 58px 0px 446px",   "-943px", "0", "0", "6", "8", "0"],
	"09": ["Hk-p Grenade launcher with freeze rounds",	 	   "It is extremely effective in battles against nemesis.", 																				   																													 "0px 0px 0px 501px",   "-1055px", "0", "0", "6", "8", "0"],
	"0a": ["M66 Rocket Launcher", 							   "By this is the best gun of all!<br><br>...but jesus christ, it take so long to aim!", 																																										 "0px 502px 0px 0px",     "-54px", "1", "0", "7", "0", "1"],
	"0b": ["Gatling Gun", 									   "One of the most powerful weapons available. The only thing that is bad about her is the time it takes her to fire her projectiles.", 																											   			 "0px 446px 0px 57px",   "-166px", "1", "0", "8", "1", "1"],
	"0c": ["Mine Thrower", 									   "By far is one of the most different weapons in the game. <br><br>The best use is in the final battle!", 																					   															     "0px 392px 0px 112px",  "-277px", "1", "0", "9", "2", "1"],
	"0d": ["STI Eagle 6.0", 								   "This gun shoots faster than standard pistol and also has a chance to hit the enemy with critical damage, exploding his head (zombie).",																												 		 "0px 335px 0px 168px", "-390px", "1", "0", "10", "3", "1"],
	"0e": ["M4A1 Assault rifle (Auto Mode)", 				   "M4A1 Assault Rifle in Auto Mode.<br><br>It's a good rifle for those learning how to play the game, but know that there are weapons that are better than it.",															 		   							 "0px 280px 0px 224px", "-500px", "1", "0", "11", "4", "1"],
	"0f": ["M4A1 Assault rifle (Manual Mode)", 				   "M4A1 Assault Rifle in Manual Mode.<br><br>It's a good rifle for those learning how to play the game, but know that there are weapons that are better than it.",															 			   						 "0px 227px 0px 280px", "-609px", "1", "0", "11", "5", "1"],
	"10": ["Western Custom M37 lever action shotgun", 		   "It has a bigger hitbox and can fire faster than the Benelli M3S but on the other hand can't shoot stronger projectiles.<br><br>Use when you have several enemies ahead!", 					   																 "0px 168px 0px 335px", "-722px", "1", "0", "12", "6", "1"],
	"11": ["Sigpro SP 2009 E", 							       "It's the same Sigpro that Carlos uses, but with improved bullets.", 																																	   													 "0px 114px 0px 392px",  "-833px", "1", "0", "2", "7", "1"],
	"12": ["Beretta M92F E",    							   "It's the same M93F that Jill uses, only with more powerful bullets.<br><br>The sound of the shot hurts more than the bullet itself!", 																									   					 "0px 58px 0px 446px",   "-943px", "1", "0", "3", "8", "1"],
	"13": ["Shotgun Benelli M3S E",        					   "Shotgun Benelli M3S E<br><br>This is the same shotgun, but with bullets that do much more damage than usual.", 																																				 "0px 0px 0px 501px",   "-1055px", "1", "0", "4", "9", "1"],
	"14": ["Mine Thrower E",					 			   "This is an improved version of the Mine thrower, with stronger bullets following the enemy.",																								 																 "0px 502px 0px 0px",     "-54px", "2", "0", "9", "0", "2"],
	"15": ["Handgun bullets (9x19 parabellum)", 			   "Ordinary pistol ammunition. You can load 255 of them per inventory slot!", 																				   																									 "0px 446px 0px 57px",  "-166px", "2", "0", "13", "1", "2"],
	"16": ["Magnum bullets (.44-caliber)", 					   "Smith & Wesson M629C .44 Magnum Ammo.<br><br>Keep in mind that you won't find this type of ammunition that easy, so use it wisely!", 																														 "0px 392px 0px 112px", "-277px", "2", "0", "14", "2", "2"],
	"17": ["Shotgun shells", 								   "You don't find that kind of ammunition that easy, so use them wisely!", 																																													 "0px 335px 0px 168px", "-390px", "2", "0", "15", "3", "2"],
	"18": ["Grenade rounds", 								   "Simple damage ammo - Ideal for eliminating common enemies.", 																																							   									 "0px 280px 0px 224px", "-500px", "2", "0", "16", "4", "2"],
	"19": ["Flame rounds", 									   "Moderate damage ammo - Ideal for eliminating different enemies.", 																							   																								 "0px 227px 0px 280px", "-609px", "2", "0", "17", "5", "2"],
	"1a": ["Acid rounds", 									   "Advance damage ammo - Ideal for fighting the worm in the park's cemetery.", 																												   																 "0px 168px 0px 335px", "-722px", "2", "0", "18", "6", "2"],
	"1b": ["Freeze rounds", 								   "Extreme damage ammo - Ideal for fighting nemesis.", 																								   																										 "0px 114px 0px 392px", "-833px", "2", "0", "19", "7", "2"],
	"1c": ["Minethrower rounds", 							   "Mine thrower ammunition - Perfect for use in conveniently positioned incinerator locations!", 																												   												 "0px 58px 0px 446px",   "-943px", "2", "1", "0", "8", "2"],
	"1d": ["Assault rifle clip (5.56 NATO rounds)", 		   "M4A1 Rifle Ammo - This is the type of ammo you only find in the protagonist's item box!", 																										   															 "0px 0px 0px 501px",   "-1055px", "2", "1", "1", "9", "2"],
	"1e": ["Enhanced handgun bullets", 						   "Improved Pistol Bullets - Improved Pistol Bullets. <br> Use and abuse the Reloading tool to get them!", 																															   						 "0px 502px 0px 0px",     "-54px", "3", "1", "2", "0", "3"],
	"1f": ["Enhanced shotgun shells", 						   "Improved Shotgun shells - Use and abuse the Reloading tool to get them!.", 																											   																		 "0px 446px 0px 57px",   "-166px", "3", "1", "3", "1", "3"],
	"20": ["First aid spray", 								   "This spray can recover your entire life minus the poison status.", 																											   																				 "0px 392px 0px 112px",  "-277px", "3", "1", "4", "2", "3"],
	"21": ["Green Herb", 									   "This herb can heal only a little of your life without removing the poisoning status.", 																					   																					 "0px 335px 0px 168px",  "-390px", "3", "1", "5", "3", "3"],
	"22": ["Blue Herb", 									   "Serve para remover o veneno do corpo do personagem atual.<br><br>Se estiver jogando o NIGHTMARE MOD, combine duas para obter uma erva verde", 															   													 "0px 280px 0px 224px",  "-500px", "3", "1", "6", "4", "3"],
	"23": ["Red Herb",										   "It alone does absolutely nothing - but when combined with the green, it heals your life completely.", 																	   																					 "0px 227px 0px 280px",  "-609px", "3", "1", "7", "5", "3"],
	"24": ["2x Green Herbs", 						    	   "This combination can heal a little more than one herb, but it does not fully restore its life and does not remove poisoning status.", 																														 "0px 168px 0px 335px",  "-722px", "3", "1", "8", "6", "3"],
	"25": ["Mix of Green and Blue Herbs", 					   "This combination can heal some of your life and remove the poison status.", 																													 															 "0px 114px 0px 392px",  "-833px", "3", "1", "9", "7", "3"],
	"26": ["Mix of Green and Red Herbs", 					   "This combination can heal your life completely without removing poisoning status.", 																													   													 "0px 58px 0px 446px",  "-943px", "3", "1", "10", "8", "3"],
	"27": ["Mix of 3 Green Herbs", 							   "This combination can heal your life completely without removing poisoning status.", 																																   										 "0px 0px 0px 501px",  "-1055px", "3", "1", "11", "9", "3"],
	"28": ["Mix of 2x Green Herbs + Blue Herb", 			   "This combination can heal little more than a green weed alone and removes the poison status.", 																									   															 "0px 502px 0px 0px",    "-54px", "4", "1", "12", "0", "4"],
	"29": ["Mix of all Herbs",		     					   "This combination completely heals your life, including removing the poison status of the current character.", 																		   																		 "0px 446px 0px 57px",  "-166px", "4", "1", "13", "1", "4"],
	"2a": ["First aid spray kit",	 						   "Kit that supports up to three first aid kit units.",																													 																   					 "0px 392px 0px 112px", "-277px", "4", "1", "14", "2", "4"],
	"2b": ["Square crank", 									   "Square Tip Crank - Used in uptown to open a cabinet full of grenade launcher bullets.", 																																   									 "0px 335px 0px 168px", "-390px", "4", "1", "15", "3", "4"],
	"2c": ["(BOTU) Red Medal",								   "BOTU!<br><br>A coin with the symbol of \"Nosferatu\" in red color.<br><br>Item discarded during the development process.", 																					   												 "0px 280px 0px 224px", "-500px", "4", "1", "16", "4", "4"],
	"2d": ["(BOTU) Blue Medal", 							   "BOTU!<br><br>A coin with the symbol of \"Nosferatu\" in yellow color.<br><br>Item discarded during the development process.", 																						   										 "0px 227px 0px 280px", "-609px", "4", "1", "17", "5", "4"],
	"2e": ["(BOTU) Golden Medal",							   "BOTU!<br><br>A coin with the symbol of \"Nosferatu\" in blue color.<br><br>Item discarded during the development process.", 																						   										 "0px 168px 0px 335px", "-722px", "4", "1", "18", "6", "4"],
	"2f": ["Jill's S.T.A.R.S card", 						   "Jill Valentine S.T.A.R.S ID Card.<br>Used to get the drawer password in the RPD file room if you run away from nemesis.", 																					   												 "0px 114px 0px 392px", "-833px", "4", "1", "19", "7", "4"],
	"30": ["(BOTU) Oil can labelled 'Giga Oil'",    		   "BOTU!<br><br>This item would be used to make the item \"Mixed Oil\".<br><br>Item discarded during the development process.", 																						   										 "0px 58px 0px 446px",   "-943px", "4", "2", "0", "8", "4"],
	"31": ["Battery", 										   "Battery used to power the elevator that leads to the power station in Downtown.", 																																					   						 "0px 0px 0px 501px",   "-1055px", "4", "2", "1", "9", "4"],
	"32": ["Fire hook", 									   "Crowbar used to open a trapdoor in the restaurant.", 																					   																													 "0px 502px 0px 0px",      "-54px","5", "2", "2", "0", "5"],
	"33": ["Power cable", 									   "Power cord found in a car in a garage parking lot. <br> Use it on the trolley to make it work.", 																							   																 "0px 446px 0px 57px",    "-166px","5", "2", "3", "1", "5"],
	"34": ["Fuse", 											   "Fuse obtained at the power station. <br> Use it on the trolley to make it work.", 																													   														 "0px 392px 0px 112px",   "-277px","5", "2", "4", "2", "5"],
	"35": ["(BOTU) Cut Fire Hose",							   "BOTU!<br>Supposedly this fire hose was supposed to be cut off to make you roam even further around the city!<br><br>Item discarded during the development process.", 														   								 "0px 335px 0px 168px",   "-390px","5", "2", "5", "3", "5"],
	"36": ["Oil Additive", 									   "Additive to be mixed with oil found at the gas station.", 																																		   															 "0px 280px 0px 224px",   "-500px","5", "2", "6", "4", "5"],
	"37": ["Brad Vickers' card case", 						   "Brad Vickers Wallet.<br>Inside is a ID Card.", 																																		   																		 "0px 227px 0px 280px",   "-609px","5", "2", "7", "5", "5"],
	"38": ["Brad Vickers' S.T.A.R.S card",					   "Brad Vickers S.T.A.R.S ID Card <br> <br> Used to get the drawer password in the RPD file room.<br><br>Also, the combinations are: 0513, 0131, 4011 or 4312.", 														   										 "0px 168px 0px 335px",   "-722px","5", "2", "8", "6", "5"],
	"39": ["Machine oil", 									   "This item alone has no use. Combine it with Oil Additive to get the item Mixed Oil.", 													   																													 "0px 114px 0px 392px",   "-833px","5", "2", "9", "7", "5"],
	"3a": ["Mixed oil", 									   "Use this item near the fuse and power cord to make the tram move.", 																				   																										 "0px 58px 0px 446px",   "-943px","5", "2", "10", "8", "5"],
	"3b": ["(BOTU) Correntes",  							   "BOTU!<br><br>These chains were meant to be where you find bullets in the warehouse.<br><br>Item discarded during the development process.", 																		   										 "0px 0px 0px 501px",   "-1055px","5", "2", "11", "9", "5"],
	"3c": ["Wrench", 										   "Wrench used to remove the fire hose in Uptown and open the door to the gas station.", 																															 											 "0px 502px 0px 0px", "-54px",     "6", "2", "12", "0", "6"], 
	"3d": ["Iron pipe", 									   "Iron pipe used in a fireplace in a cemetery storeroom after burning all the firewood present.<br><br>Serves to reveal a secret passage.", 																			 										 "0px 446px 0px 57px", "-166px",   "6", "2", "13", "1", "6"], 
	"3e": ["(BOTU) Fire hose tip", 							   "BOTU!<br><br>Item that is supposed to be used to match the missing fire hose.<br><br>Item discarded during the development process.", 													 																	 "0px 392px 0px 112px", "-277px",  "6", "2", "14", "2", "6"], 
	"3f": ["Fire hose", 									   "Fire hose used to put out the fire in a corridor in uptown.", 																										 																						 "0px 335px 0px 168px", "-390px",  "6", "2", "15", "3", "6"], 
	"40": ["Tape recorder", 								   "Audio recorder (aka. Walkman) containing the voice of a doctor describing an elbow fracture.<br><br>Used to open the elevator in the hospital.", 																					 						 "0px 280px 0px 224px", "-500px",  "6", "2", "16", "4", "6"], 
	"41": ["Lighter oil", 									   "Lighter Fluid<br><br>Use it with the lighter closed to get the lighter open.", 																																			 									 "0px 227px 0px 280px", "-609px",  "6", "2", "17", "5", "6"], 
	"42": ["Lighter (Closed)", 				  				   "A lighter that is out of fluid.<br>Combine with Lighter oil to get the lighter open.", 																																		 								 "0px 168px 0px 335px", "-722px",  "6", "2", "18", "6", "6"], 
	"43": ["Lighter (Open)", 				  				   "A lighter that has fluid. It serves to light fireplaces in cemeteries and burn ropes full of oil.", 																		 																			     "0px 114px 0px 392px", "-833px",  "6", "2", "19", "7", "6"], 
	"44": ["Green gem", 									   "Green gem used to open the gate of raccoon City Hall.<br><br>Congratulations to those who had the brilliant idea<br>Design 10/10!", 																								 						 "0px 58px 0px 446px", "-943px",    "6", "3", "0", "8", "6"], 
	"45": ["Blue gem", 										   "Blue gem used to open the gate of raccoon City Hall.<br><br>Congratulations to those who had the brilliant idea<br>Design 10/10!", 																									 						 "0px 0px 0px 501px", "-1055px",    "6", "3", "1", "9", "6"], 
	"46": ["Amber ball", 									   "A brown sphere made of resin extracted from fossilized trees.<br><br>This item is used in the puzzle of the three clocks in the clock tower.", 																						 						 "0px 502px 0px 0px", "-54px",      "7", "3", "2", "0", "7"], 
	"47": ["Obsidian ball", 								   "Also known as <font title='In Brazilian Portuguese, of course!'>Obsidiena</font>, This is a black glass sphere made by a chemical reaction of volcanic lava when cooled. <br> <br> This item is used in the puzzle of the three clocks in the clock tower.", "0px 446px 0px 57px", "-166px",    "7", "3", "3", "1", "7"], 
	"48": ["Crystal ball", 									   "A simple crystal sphere, used together with two others in a clock tower puzzle.", 																																								 			 "0px 392px 0px 112px", "-277px",   "7", "3", "4", "2", "7"], 
	"49": ["(BOTU) Remote control with Batteries",      	   "BOTU!<br><br>A Remote Control that is out of batteries.<br>I suppose it would be used at the pharmacy to see what the current password is (Aquacure, Safsprin or Adravil).<br><br>Item discarded during the development process.",						 	 "0px 335px 0px 168px", "-390px",   "7", "3", "5", "3", "7"], 
	"4a": ["(BOTU) Remote control without Batteries", 		   "BOTU!<br><br>A remote control that has batteries.<br>I suppose it would be used at the pharmacy to see what the current password is (Aquacure, Safsprin or Adravil).<br><br>Item discarded during the development process.",								 "0px 280px 0px 224px", "-500px",   "7", "3", "6", "4", "7"], 
	"4b": ["(BOTU) AA Batteries",		 					   "BOTU!<br><br>A pair of batteries that would be used to combine with the Remote Without Batteries. It would be used to turn on the Pharmacy TV.<br><br>Item discarded during the development process.", 							 							 "0px 227px 0px 280px", "-609px",   "7", "3", "7", "5", "7"], 
	"4c": ["Gold gear", 									   "A golden gear that is part of a mechanical clock system.<br><br>Combine with Silver Gear to form the Item Chronos Gear.", 															 																		 "0px 168px 0px 335px", "-722px",   "7", "3", "8", "6", "7"], 
	"4d": ["Silver gear", 									   "A silver gear that is part of a mechanical watch system.<br><br>Combine with Gold Gear to form the Item Chronos Gear.", 															 																		 "0px 114px 0px 392px", "-833px",   "7", "3", "9", "7", "7"], 
	"4e": ["Chronos gear", 									   "Gear composed of Gold Gear and Silver Gear items. <br> <br> Use on the clock tower clock to activate it.", 																													 							 	 "0px 58px 0px 446px", "-943px",   "7", "3", "10", "8", "7"], 
	"4f": ["Bronze book",									   "A Bronze book found in the hands of a statue of the mayor of raccoon city.<br><br>Use it in a puzzle near the restaurant (Downtown) to get the Bronze compass.", 															 								 "0px 0px 0px 501px", "-1055px",   "7", "3", "11", "9", "7"], 
	"50": ["Bronze compass", 								   "A bronze compass found near a restaurant.<br><br>Use it on the statue of the mayor of raccoon to obtain the item Battery.", 																						 	 									 "0px 502px 0px 0px", "-54px",     "8", "3", "12", "0", "8"], 
	"51": ["Vaccine medium", 								   "One of the solutions to create the cure against T-Virus.<br><br>Combine with the base vaccine item to create the item \"Vaccine\".", 																						 	  	 						 "0px 446px 0px 57px", "-166px",   "8", "3", "13", "1", "8"], 
	"52": ["Vaccine base", 									   "One of the solutions to create the cure against T-Virus.<br><br>Combine with the item Vaccine medium to create the item \"Vaccine\".", 																								 					  	 "0px 392px 0px 112px", "-277px",  "8", "3", "14", "2", "8"], 
	"53": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don't have any ingame utility.", 																	 									 "0px 335px 0px 168px", "-390px",   "8", "0", "2", "3", "8"], 
	"54": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui só para encher o espaço mesmo, por que elas não tem nenhuma utilidade ingame.", 																	 					 "0px 280px 0px 224px", "-500px",   "8", "0", "2", "4", "8"], 
	"55": ["Vaccine", 										   "Vacina criada com os itens Vaccine base e Vaccine medium.<br>Use na Jill para curar ela do T-Virus.", 																																	 					 "0px 227px 0px 280px", "-609px",  "8", "3", "15", "5", "8"], 
	"56": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don't have any ingame utility.", 																	 									 "0px 168px 0px 335px", "-722px",   "8", "0", "2", "6", "8"], 
	"57": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don't have any ingame utility.", 																	 									 "0px 114px 0px 392px", "-833px",   "8", "0", "2", "7", "8"], 
	"58": ["Medium base", 									   "Solution used to create the item Vaccine medium.<br>It is used in the laboratory at raccoon hospital, B3.", 																															 					 "0px 58px 0px 446px", "-943px",   "8", "3", "16", "8", "8"], 
	"59": ["Eagle parts A", 								   "First part of the weapon STI Eagle 6.0.<br>Combine with item Eagle parts B to form the same.", 																																 								 "0px 0px 0px 501px", "-1055px",   "8", "3", "17", "9", "8"], 
	"5a": ["Eagle parts B", 								   "Second part of the weapon STI Eagle 6.0.<br>Combine with item Eagle parts A to form the same.",																																	 							 "0px 502px 0px 0px", "-54px",     "9", "3", "18", "0", "9"], 
	"5b": ["M37 parts A", 									   "First part of weapon Western Custom M37. <br> Combine with item M37 parts B to form it.", 																															 										 "0px 446px 0px 57px", "-166px",   "9", "3", "19", "1", "9"], 
	"5c": ["M37 parts B", 									   "Second part of weapon Western Custom M37. <br> Combine with item M37 parts B to form it.", 																																 									 "0px 392px 0px 112px", "-277px",   "9", "4", "0", "2", "9"], 
	"5d": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don't have any ingame utility.", 																	 									 "0px 335px 0px 168px", "-390px",   "9", "0", "2", "3", "9"], 
	"5e": ["Chronos chain", 								   "A key that apparently has no use until you combine it with the Clock tower (winder) key to form the Chronos key.", 																						 													 "0px 280px 0px 224px", "-500px",   "9", "4", "1", "4", "9"], 
	"5f": ["Rusted crank", 									   "A rusty handle used to (try) open the gas station door.", 																																	 																 "0px 227px 0px 280px", "-609px",   "9", "4", "2", "5", "9"], 
	"60": ["Card key", 										   "Key card used at the abandoned factory near the end.<br><br>Use it to open some doors and unlock an elevator.", 																										 									 "0px 168px 0px 335px", "-722px",   "9", "4", "3", "6", "9"], 
	"61": ["Gun powder A", 									   "Gunpowder A<br>This gunpowder alone has the power to generate ordinary pistol bullets.",																															 										 "0px 114px 0px 392px", "-833px",   "9", "4", "4", "7", "9"], 
	"62": ["Gun powder B", 									   "Gunpowder B<br>This gunpowder alone has the power to generate ordinary shotgun bullets.",																															 										 "0px 58px 0px 446px", "-943px",    "9", "4", "5", "8", "9"], 
	"63": ["Gun powder C", 									   "Gunpowder C<br>This gunpowder alone has the power to generate ordinary grenade launcher bullets.",																																			 				 "0px 0px 0px 501px", "-1055px",    "9", "4", "6", "9", "9"], 
	"64": ["Gun powder AA", 								   "Gunpowder AA.<br>This combination can generate more pistol bullets than usual.",																															 												 "0px 502px 0px 0px", "-54px",     "10", "4", "7", "0", "10"],
	"65": ["Gun powder BB", 								   "Gunpowder BB.<br>This combination can generate more shotgun bullets than usual.",																															 												 "0px 446px 0px 57px", "-166px",   "10", "4", "8", "1", "10"],
	"66": ["Gun powder AC", 								   "Gunpowder AC.<br>This combination can generate up to 20 grenade launcher (fire) bullets.",																																		 							 "0px 392px 0px 112px", "-277px",  "10", "4", "9", "2", "10"],
	"67": ["Gun powder BC", 								   "Gunpowder BC.<br>This combination can generate up to 20 grenade launcher (acid) bullets.", 																																		 							 "0px 335px 0px 168px", "-390px", "10", "4", "10", "3", "10"],
	"68": ["Gun powder CC", 								   "Gunpowder BC.<br>This combination can generate up to 20 grenade launcher (freeze) bullets.",																																		 						 "0px 280px 0px 224px", "-500px", "10", "4", "11", "4", "10"],
	"69": ["Gun powder AAA", 								   "Gunpowder AAA.<br>This combination can generate many pistol bullets.",																															 															 "0px 227px 0px 280px", "-609px", "10", "4", "12", "5", "10"],
	"6a": ["Gun powder AAB", 								   "Gunpowder AAB.<br>This combination can generate up to 40 shotgun bullets.",																														 															 "0px 168px 0px 335px", "-722px", "10", "4", "13", "6", "10"],
	"6b": ["Gun powder BBA", 								   "Gunpowder BBA.<br>This combination can generate up to 120 pistol bullets.",																														 															 "0px 114px 0px 392px", "-833px", "10", "4", "14", "7", "10"],
	"6c": ["Gun powder BBB", 								   "Gunpowder BBB.<br>This combination can generate many shotgun bullets.",																														 																 "0px 58px 0px 446px", "-943px",  "10", "4", "15", "8", "10"],
	"6d": ["Gun powder CCC", 								   "Gunpowder CCC.<br>This combination can generate magnum bullets!",																														 																	 "0px 0px 0px 501px", "-1055px",  "10", "4", "16", "9", "10"],
	"6e": ["Infinite bullets", 								   "Unfair!<br><br>The deal is simple - combine this wonder with the weapon you want to have infinite ammo and voilá!", 																													 					 "0px 502px 0px 0px", "-54px",    "11", "4", "17", "0", "11"],
	"6f": ["Water sample", 									   "Water sample used on a quality meter near the end.<br><br><center>~~~BEEP-BOOP~~~</center>", 																															 									 "0px 446px 0px 57px", "-166px",  "11", "4", "18", "1", "11"],
	"70": ["System disk", 									   "Disk used to open a security door in abandoned factory.<br><br>Get ready for nemmy!", 																													 													 "0px 392px 0px 112px", "-277px", "11", "4", "19", "2", "11"],
	"71": ["Dummy key", 									   "Apparently the RE3 Devs have forgotten one of the RE2 keys here...", 																															 															 "0px 335px 0px 168px", "-390px",  "11", "5", "0", "3", "11"],
	"72": ["Lockpick", 										   "A classic item - It opens doors, cabinets and drawers with simple locks.", 																													 																 "0px 280px 0px 224px", "-500px",  "11", "5", "1", "4", "11"],
	"73": ["Warehouse (backdoor) key", 						   "Used at the beginning of the game to leave the warehouse after a short discussion with Dario.", 																														 									 "0px 227px 0px 280px", "-609px",  "11", "5", "2", "5", "11"],
	"74": ["Sickroom key (room 402)",						   "Key used on the 4th floor of raccoon hospital.<br>Use it to open the door to room 402, which contains one of the necessary solutions to create the vaccine.", 																			 					 "0px 168px 0px 335px", "-722px",  "11", "5", "3", "6", "11"],
	"75": ["Emblem (S.T.A.R.S) key", 						   "Key used to open the classic S.T.A.R.S room at the RPD police station.",																												 																	 "0px 114px 0px 392px", "-833px",  "11", "5", "4", "7", "11"],
	"76": ["(BOTU) Keyring with four keys",			 		   "BOTU!<br><br>Bunch of keys with unknown use.<br>I believe it is to open several doors in the hospital, as well as the keys of the 1st Resident / Biohazard.<br><br>Item discarded during the development process.", 			 							 "0px 58px 0px 446px", "-943px",   "11", "5", "5", "8", "11"],
	"77": ["Clock tower (bezel) key", 						   "Key used to descend the clock tower stairs in Clock Tower.<br><br>It is one of the only keys that you cannot use directly from inventory.", 																				 								 "0px 0px 0px 501px", "-1055px",   "11", "5", "6", "9", "11"],
	"78": ["Clock tower (winder) key", 						   "A key that you can even open a door with - but its real purpose is to be combined with the Chronos Chain to become the Chronos key.", 				  																	 									 "0px 502px 0px 0px", "-54px",     "12", "5", "7", "0", "12"],
	"79": ["Chronos key", 									   "A key made of two other keys (Winder and Chronos chain).<br><br>Serves to open the door near the main clock tower lobby.", 						  																	 										 "0px 446px 0px 57px", "-166px",   "12", "5", "8", "1", "12"],
	"7a": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Forgotten Pistol!<br><br>I think the Devs decided to put these pistols here just to fill the space, because they don't have any ingame utility.",																	 									 "0px 392px 0px 112px", "-277px",  "12", "0", "2", "2", "12"],
	"7b": ["Park (Main Gate) key", 							   "Key to the gates of raccoon park.<br>You find it in a save room near the back of the clock tower.", 											  																	 										 "0px 335px 0px 168px", "-390px",  "12", "5", "9", "3", "12"],
	"7c": ["Park (Graveyard) key", 							   "Cemetery tool room key.<br>You find this key near an explosive gallon in the park.", 													  																	 												 "0px 280px 0px 224px", "-500px", "12", "5", "10", "4", "12"],
	"7d": ["Park (Rear Gate) key", 							   "With this key you can open a lock that is blocking the way to the abandoned factory.", 													 																													 "0px 227px 0px 280px", "-609px", "12", "5", "11", "5", "12"],
	"7e": ["Facility key (No Barcode)", 					   "One of the keys to the abandoned factory.<br>With it you can access a room with an elevator.", 																															     								 "0px 168px 0px 335px", "-722px", "12", "5", "12", "6", "12"],
	"7f": ["Facility key (With Barcode)", 					   "One of the keys to the abandoned factory.<br>With the barcode, you can get the rocket launcher near the end.<br><br>With her you can access a room with an elevator.", 										 												 "0px 114px 0px 392px", "-833px", "12", "5", "13", "7", "12"],
	"80": ["Boutique key", 									   "Boutique key, where you can change clothes during gameplay.<br><br>This Function is only available in Playstation and Gamecube version.", 																						     						 "0px 58px 0px 446px", "-943px",  "12", "5", "14", "8", "12"],
	"81": ["Ink ribbon", 									   "By far, it is one of the most classic items in the entire Resident Evil / Biohazard franchise.<br><br>When in inventory, you can use it on the typewriter to saving your progress.", 							 											 "0px 0px 0px 501px", "-1055px",  "12", "5", "15", "9", "12"],
	"82": ["Reloading tool", 								   "With this item, you can create ammo combining with gunpowder.", 																																	 														 "0px 502px 0px 0px", "-54px",    "13", "5", "16", "0", "13"],
	"83": ["Game inst. A", 									   "This is a manual of how to play Resident Evil 3 / Biohazard 3.<br>With this manual, you learn about explosive objects, The 180 ° Rotation, Emergency Escape, Emergency Bypass, and more.", 											 						 "0px 446px 0px 57px", "-166px",  "13", "5", "17", "1", "13"],
	"84": ["Game inst. B", 									   "This is a manual of how to play Resident Evil 3 / Biohazard 3.<br>With this manual, you learn about the Reloading Tool, Gunpowder and its combinations.", 													 												 "0px 392px 0px 112px", "-277px", "13", "5", "18", "2", "13"],
	"85": ["(BOTU) Recipient with liquid inside",			   "BOT... Wait a sec...<br><br>With the internal name of \"Game inst. A\", this item can be used as many times as you like - it does not change anything in the game.", 													 									 "0px 335px 0px 168px", "-390px", "13", "5", "19", "3", "13"],
	/*
		The values below can be added to inventory as an item, but checking them can make the game crash.
		If you insert these values in RDT as an item, it will recognize as current map.
	*/
	"ab": ["no item", 	      								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"],
	"ac": ["BOTU", 	  	      								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"],
	"ad": ["BOTU",	  	      								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"],
	"ae": ["BOTU",    	      								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"],
	"af": ["BOTU", 		      								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // This one does't crash the game when you check.
	"b0": ["Backdoor Key",    								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // After checking, it change his name to Main Gate Key
	"b1": ["BOTU",    	      								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"],
	"b2": ["S.T.A.R.S. Key",  								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // Checking make the game crash!
	"b3": ["Empty Lighter",   								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // Checking make the game crash!
	"b4": ["Sapphire",        								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // Checking it freezes the game
	"b5": ["Emerald",         								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // This one does't crash the game when you check.
	"b6": ["Rust Hex Crank",  								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // After checking, it change his name to ". Launcher"
	"b7": ["BOTU",            								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // Checking will display "ding will cause unexploded mines to disappear. OK to proceed? (Yes / No)"
	"b8": ["Graveyard Key",   								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // Checking make the game crash! (The graphic displayed is some part of cuurent map)
	"b9": ["BOTU",			  								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // Checking make the game crash!
	"ba": ["BOTU",			  								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // Checking it freezes the game
	"bb": ["Book Of Wisdom",  								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // ***Checking it will GLITCH the game graphics! His graphic will be the same of the last item you checked.
	"bc": ["Future Compass",  								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"],
	"bd": ["Square Crank",    								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // Checking it freezes the game
	"be": ["Bezel Key",       								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // ***Checking this will show a question. If you choose yes it mess with the graphics and current room. Also, it changes his name.
	"bf": ["Winder Key",      								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"], // This can show a question, but nothing happens.
	"c0": ["Main Gate Key",   								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"],
	"c1": ["Rear Gate Key",   								   "This item is not supposed to be accessed!<br>It can make the game malfunction and maybe even corrupt your save data.", 																																			   "0px 502px 0px 0px", "-54px", "0", "0", "0", "0", "0"]
}
var WEAPONS = {
	"00": ["Bare Hands"],
	"01": ["Combat Knife"],
	"02": ["Sigpro Handgun"],
	"03": ["Handgun M92F"],
	"04": ["Shotgun B. M3S"],
	"05": ["S&W Magnum"],
	"06": ["G. Launcher"],
	"07": ["G. Launcher"],
	"08": ["G. Launcher"],
	"09": ["G. Launcher"],
	"0a": ["R. Launcher"],
	"0b": ["Gatling Gun"],
	"0c": ["Mine Thrower"],
	"0d": ["STI Eagle 6.0"],
	"0e": ["Assault rifle (Auto)"],
	"0f": ["A. rifle (Manual)"],
	"10": ["Western Custom"],
	"11": ["Sigpro SP 2009 E"],
	"12": ["Beretta M92F E"],
	"13": ["Shotgun B. M3S E"],
	"14": ["Mine Thrower E"]
}
// Preciso remover isso depois
var RDT_mapHack = {
	"r40c": true,
	"r410": true,
	"r413": true,
	"r415": true,
	"r714": true,
	"r712": true,
	"r70f": true,
	"r70d": true,
	"r61c": true
}
var RDT_mapHack2 = {
	"r304": true,
	"r30d": true,
	"r311": true,
	"r415": true,
	"r501": true,
	"r50a": true,
	"r50d": true
}
var RDT_FIRSTPOINTERTYPE = {
	"0000": true,
	"0100": true,
	"ffff": true,
	"ff02": true,
	"ad04": true,
	"ff31": true,
	"10b8": true,
	"0189": true,
	"38b8": true,
	"7810": true
}
var RDT_THIRDPOINTERTYPE = {
	"0800": true,
	"0100": true,
	"10b8": true
}
var RDT_POINTERTYPE4 = {
	"1000": true,
	"2800": true,
	"3800": true,
	"4010": true,
	"1800": true
}
var RDT_SECONDPOINTERTYPE = {
	"0800": true,
	"2808": true,
	"4868": true,
	"81d6": true,
	"3000": true,
	"0101": true,
	"5756": true,
	"1000": true,
	"1840": true,
	"050b": true,
	"1100": true,
	"2121": true,
	"0707": true,
	"9038": true,
	"3820": true,
	"6030": true,
	"1919": true,
	"5020": true,
	"30a0": true
}
var FILES = {
	"86": ["Dario's Memo"],
	"87": ["Mercenary's Diary"],
	"88": ["Business Fax"],
	"89": ["Marvin's Report"],
	"8a": ["David's Memo"],
	"8b": ["City Guide"],
	"8c": ["Reporter's Memo"],
	"8d": ["Operation Instruction"],
	"8e": ["Mercenary's Pocketbook"],
	"8f": ["Art Picture Postercard"],
	"90": ["Supervisor's Report"],
	"91": ["Written Order To The Supervisors"],
	"92": ["Director's Diary"],
	"93": ["Manager's Diary"],
	"94": ["Security Manual"],
	"95": ["Mechanic's Memo"],
	"96": ["Fax From Kendo"],
	"97": ["Manager's Report"],
	"98": ["Medical Instruction Manual"],
	"99": ["Fax From H. Q."],
	"9a": ["Incinerator Manual"],
	"9b": ["Photo A"],
	"9c": ["Photo B"],
	"9d": ["Photo C"],
	"9e": ["Photo E"],
	"9f": ["Photo D"],
	"a0": ["Clock Tower Poster Card"],
	// Info: Hex A1 makes the game freeze and crash
	"a2": ["Classified Photo File"],
	"a3": ["Jill's Diary"]
}
var RDT_MAPAS = {
	"a4": ["Uptown Map"],
	"a9": ["Police Station Map"],
	"a5": ["Downtown Map"],
	"a6": ["Clock Tower Map"],
	"aa": ["Hospital Map"],
	"a7": ["Park Map"],
	"a8": ["Dead Factory Map"],
	"a9": ["Police Station Map"],
	"aa": ["Hospital Map"]
}
var ATTR = {
	"00": ["None",								 "#fff0",  "0 0 10px #fff0"], // Use this for puzzle items that don't have the ammo display.
	"01": ["Remaining ammo in green",		   "#008400", "0 0 2px #004200"],
	"02": ["% remaining in green", 			   "#008400", "0 0 2px #004200"],
	"03": ["Inf. ammo in green", 			   "#008400", "0 0 2px #004200"],
	"05": ["Remaining ammo in red",			   "#840000", "0 0 2px #310000"],
	"06": ["% remaining in red", 			   "#840000", "0 0 2px #310000"],
	"07": ["Inf. ammo in red", 				   "#840000", "0 0 2px #310000"],
	"09": ["Remaining ammo in yellow", 		   "#fff0a3", "0 0 2px #b4b194"],
	"0a": ["%. remaining in yellow",		   "#fff0a3", "0 0 2px #b4b194"],
	"0b": ["Inf. ammo in yellow", 			   "#fff0a3", "0 0 2px #b4b194"],
	"0d": ["Remaining ammo in blue", 		   "#9393ff", "0 0 2px #004242"],
	"0e": ["% remaining in blue", 			   "#9393ff", "0 0 2px #004242"],
	"0f": ["Inf. ammo in blue", 	 		   "#9393ff", "0 0 2px #004242"],
	"16": ["Attr. used by M4A1 Assault Rifle", "#840000", "0 0 2px #310000"],
	// Atributos Desconhecidos
	"17": ["Attr. found in Nightmare Mod", 	   	 "#fff0",    "0 0 2px #0f0"] // Atributo encontrado na shotgun do Carlos
}
// Segunda variavel
var VOID = {
	"00": "OK!",									   // Condição normal
	"80": "Condição anormal da versão francesa/Taiwan" // Condição anormal encontrado na versão francesa. Pode ser um hack que outra pessoa tenha feito antes
}
// AKA. STAGE
var CIDADE = {
	"00": ["Uptown (Including RPD, Stage 1)", 'Uptown'],
    "01": ["Downtown (Stage 2)", 'Downtown'],
    "02": ["Clock Tower / Park before the Hospital (Stage 3)", 'Clock Tower'],
    "03": ["Clock Tower / Park after the Hospital (Stage 4)", 'CT / Park'],
    "04": ["Dead Factory (Stage 5)", 'Dead Factory'],
    "05": ["Shows first the Mercenaries-minigame ending, then the ending video of the main game (the one without Barry Burton, assuming 0x2250 has been set to 00. If not, then it only crashes).", 'Mercenaries End'],
    "06": ["Downtown again. I have no idea what's different here. This may be after the scene where Jill falls trough the parking lot floor.", 'Downtown']
}
var PLAYERS = {
	"00": ["Jill with normal outfit"],
	"01": ["Jill with normal outfit + sidepack"],
	"02": ["Jill with biker outfit"],
	"03": ["Jill with S.T.A.R.S uniform"],
	"04": ["Jill with \"Disco Inferno\" outfit"],
	"05": ["Jill with cop uniform + miniskirt"],
	"06": ["Jill as regina (Dino Crisis)"],
	"07": ["Jill with normal outfit"],
	"08": ["Carlos"],
	"09": ["Mikhail"],
	"0a": ["Nicholai"],
	"0b": ["Brad Vickers"],
	"0c": ["Dario"],
	"0f": ["Tofu"]
}
var ROUPA = {
	"00": ["Normal"],
	"01": ["Biker"],
	"02": ["S.T.A.R.S uniform"],
	"03": ["Disco Inferno"],
	"04": ["Cop + miniskirt"],
	"05": ["Jill as Regina (Dino Crisis)"],
	"06": ["Blue mini skirt with black top and boots"],
	"07": ["Social Suit"]
}
var SIDEPACK = {
	"00": ["Undefined"],
	"0a": ["Sidepack Enabled"],
	"08": ["Sidepack Disabled"] 
}
var VERSAO = {
	"000000000000": ["Undefined (Bu10.sav?)", 			 	  "Hex 00"],
	"4241534c5553": ["Russian / Nightmare (Or Darkness) Mod", "BASLUS"],
	"4245534c4553": ["Mediakite / Xplosiv", 				  "BESLES"],
	"4249534c5053": ["Chinese / Japanese / Taiwan Version",   "BISLPS"]
}
var POISON = {
	"8f": ["Yes"],
	"00": ["No"]  
}
var LOCAIS = {
	"00": ["Warehouse"],
	"01": ["Allley"],
	"02": ["Hall RPD"],
	"03": ["Dark Room"],
	"0c": ["Parking Lot"],
	"04": ["Shopping Dist."],
	"06": ["Living Room"],
	"05": ["Chapel"],
	"0d": ["Clock Tower"],
	"08": ["Hospital"],
	"07": ["Park"],
	"09": ["Graveyard"],
	"0a": ["Resting Room"],
	"0b": ["Monitor Room"]
}
var EPILOGOS = {
	"00": ["None"],
	"01": ["1"],
	"02": ["2"],
	"03": ["3"],
	"04": ["4"],
	"05": ["5"],
	"06": ["6"],
	"07": ["7"],
	"08": ["All"],
	"09": ["All"],
	"0c": ["All"] // Encontrado esse valor na versão francesa
}
var DIFICULDADE = {
	"01": ["Easy"],
	"00": ["Hard"]
}
var RDT_locations = {
	"R100": ["Warehouse Save Room", 		   "Uptown", 		 'Warehouse Save Room'],
	"R101": ["Warehouse", 					   "Uptown", 		 'Warehouse'],
	"R102": ["Alley 1", 					   "Uptown", 		 'Alley 1'],
	"R103": ["Street 1", 					   "Uptown", 		 'Street 1'],
	"R104": ["Alley 2", 					   "Uptown", 		 'Alley 2'],
	"R105": ["Alley 3", 					   "Uptown", 		 'Alley 3'],
	"R106": ["Boutique Street", 			   "Uptown", 		 'Boutique Street'],
	"R107": ["Bar Jack",		 			   "Uptown", 		 'Bar Jack'],
	"R108": ["Alley 5", 					   "Uptown", 		 'Alley 5'],
	"R109": ["Passage to Pharmacy (Day)",      "Uptown", 		 'P. to Pharmacy'],
	"R10A": ["Main Street", 				   "Uptown", 		 'Main Street'],
	"R10B": ["Pharmacy Street",  			   "Uptown", 		 'Pharmacy Street'],
	"R10C": ["Alley - Save", 	 			   "Uptown", 		 'Alley Save Room'],
	"R10D": ["Jill's Apartment", 			   "Uptown", 		 'Jill\'s Apartment'],
	"R10E": ["Alley 6",					 	   "Uptown", 		 'Alley 6'],
	"R10F": ["Boutique", 					   "Uptown", 		 'Boutique'],
	"R110": ["R.P.D. Gate", 				   "Police Station", 'RPD Gate'],
	"R111": ["R.P.D. Main Hall", 			   "Police Station", 'RPD M. Hall'],
	"R112": ["R.P.D. Office", 				   "Police Station", 'RPD Office'],
	"R113": ["Files room", 					   "Police Station", 'RPD Files'],
	"R114": ["Corridor with ladder", 		   "Police Station", 'RPD 1F Corridor'],
	"R115": ["Corridor", 					   "Police Station", 'RPD 1F Corridor 2'],
	"R116": ["Press conference room", 		   "Police Station", 'RPD Press Conf.'],
	"R117": ["Dark Room", 					   "Police Station", 'RPD Dark Room'],
	"R118": ["2F Corridor", 				   "Police Station", 'RPD 2F Corridor'],
	"R119": ["Corridor to S.T.A.R.S. Room",    "Police Station", 'RPD 2F L Corridor'],
	"R11A": ["S.T.A.R.S. Room", 			   "Police Station", 'RPD STARS R.'],
	"R11B": ["Pharmacy", 					   "Uptown", 		 'Pharmacy'],
	"R11C": ["Pharmacy Product Stock", 		   "Uptown", 		 'Pharmacy Stock'],
	"R11D": ["Alley 1 (Night)", 			   "Uptown", 		 'Alley 1 (Night)'],
	"R11E": ["Street 1 (Night)", 			   "Uptown", 		 'Street 1 (Night)'],
	"R11F": ["Alley 2 (Night)", 			   "Uptown", 		 'Alley 2 (Night)'],
	"R120": ["Alley 3 (Night)", 			   "Uptown", 		 'Alley 3 (Night)'],
	"R121": ["Boutique Street (Night)", 	   "Uptown", 		 'B. Street (Night)'],
	"R122": ["Alley 5 (Night)", 			   "Uptown", 		 'Alley 5 (Night)'],
	"R123": ["Passage to Pharmacy (Night)",    "Uptown", 		 'P. to Pharmacy (N)'],
	"R124": ["Main Street (Night)", 		   "Uptown", 		 'Main Street (N)'],
	"R125": ["R.P.D. Gates (Night)", 		   "Police Station", 'RPD Gates (Night)'],
	"R200": ["Street 2", 					   "Uptown", 	     'Street 2'],
	"R201": ["Mechanic Parking Lot", 		   "Downtown", 	     'M. Parking Lot'],
	"R203": ["Alley 1", 					   "Downtown", 	     'Alley 1'],
	"R204": ["Energy Station Street", 		   "Downtown", 	     'E. Station Street'],
	"R205": ["Grill 13 Street", 			   "Downtown", 	     'G. 13 Street'],
	"R206": ["Shopping Dist.", 				   "Downtown", 	     'Shopping Dist.'],
	"R207": ["Raccon City Hall Street", 	   "Downtown", 	     'R.C. Hall Street'],
	"R208": ["Raccon City Hall", 			   "Downtown", 	     'R.C. Hall'],
	"R209": ["Shopping Dist. 2", 			   "Downtown", 	     'Shopping Dist. 2'],
	"R20A": ["Shopping Dist. 3", 			   "Downtown", 	     'Shopping Dist. 3'],
	"R20B": ["Trolley Street", 				   "Downtown", 	     'Trolley Street'],
	"R20C": ["Trolley", 					   "Downtown", 	     'Trolley'],
	"R20D": ["Stagla Gas Station", 			   "Downtown", 	     'S. Gas Station'],
	"R20E": ["Stagla Street", 				   "Downtown", 	     'Stagla Street'],
	"R20F": ["Press (2F)", 					   "Downtown", 	     'Press (1F)'],
	"R210": ["Press (1F)", 					   "Downtown", 	     'Press (2F)'],
	"R211": ["Grill 13 (1F)", 				   "Downtown", 	     'G. 13 (1F)'],
	"R212": ["Grill 13 (B1)", 				   "Downtown", 	     'G. 13 (B1)'],
	"R213": ["Energy Station Entrance", 	   "Downtown", 	     'E.S. Entrance'],
	"R214": ["Energy Station", 				   "Downtown", 	     'E. Station'],
	"R215": ["Trolley (Running)", 			   "Downtown", 	     'Trolley (Running)'],
	"R216": ["Shopping Dist. Save Room", 	   "Downtown", 	     'S. Dist. Save'],
	"R217": ["Stagla Street (After)", 		   "Downtown", 	     'S. Street (After)'],
	"R218": ["Alley to Street 2", 			   "Uptown", 	     'A. to Street 2'],
	"R219": ["Press (1F)", 					   "Downtown", 	     'Press (1F)'],
	"R21A": ["Alley 6", 					   "Uptown", 	     'Alley 6'],
	"R21B": ["Mechanic's Office", 			   "Downtown",	     'M. Office'],
	"R300": ["Chapel", 						   "Clock Tower",    'Chapel'],
	"R301": ["Piano Hall", 					   "Clock Tower",    'Piano Hall'],
	"R302": ["Dinner Room", 				   "Clock Tower",    'Dinner R.'],
	"R303": ["Clock Tower Garden", 			   "Clock Tower",    'Garden'],
	"R304": ["Main Hall (1F)", 				   "Clock Tower",    'M. Hall (1F)'],
	"R305": ["Resting Room", 				   "Clock Tower",    'M. Hall (2F)'],
	"R306": ["Living Room", 				   "Clock Tower",    'Living Room'],
	"R307": ["Corridor to Main Hall", 		   "Clock Tower",    'C. to Main H.'],
	"R308": ["Corridor to Clock Puzzle",	   "Clock Tower",    'C. to C. Puzzle'],
	"R309": ["Clock Puzzle", 				   "Clock Tower",    'Clock Puzzle'],
	"R30A": ["Main Hall (2F)",  			   "Clock Tower",    'M. Hall (2F)'],
	"R30B": ["Tower Balcony",  				   "Clock Tower",    'T. Balcony'],
	"R30C": ["Machinery Room", 				   "Clock Tower",    'M. Room'],
	"R30D": ["Clock Tower Garden (Nemesis)",   "Clock Tower",    'Battle'],
	"R30E": ["Main Hall Destroyed", 		   "Clock Tower",    'M. Hall (After)'],
	"R30F": ["Piano Hall & Dinner Room", 	   "Clock Tower",    'Piano & Dinner R.'],
	"R310": ["Chapel", 				  	 	   "Clock Tower",    'Chapel'],
	"R311": ["Resting Room",		  	 	   "Clock Tower",    'Resting Room'],
	"R312": ["Living Room", 		  	 	   "Clock Tower",    'Living Room'],
	"R313": ["Corridor to Main Hall", 	 	   "Clock Tower",    'C. to Main H.'],
	"R314": ["Corridor to Clock Puzzle", 	   "Clock Tower",    'C. to C. Puzzle'],
	"R315": ["Clock Puzzle", 				   "Clock Tower",    'Clock Puzzle'],
	"R316": ["Main Hall Destroyed", 		   "Clock Tower",    'M. Hall (After)'],
	"R317": ["Piano Hall & Dinner Room", 	   "Clock Tower",    'Piano & Dinner R.'],
	"R400": ["Hospital Street", 			   "Park", 			 'Hosp.'],
	"R401": ["Park Office", 				   "Park", 			 'Park Office'],
	"R402": ["Hospital Entrance", 			   "Hospital", 		 'H. Entrace'],
	"R403": ["Hospital Office",   			   "Hospital", 		 'H. Office'],
	"R404": ["Waiting Room", 	  			   "Hospital", 		 'W. Room'],
	"R405": ["Corridor (4F)",     			   "Hospital", 		 'Corridor (4F)'],
	"R406": ["Room 402",  					   "Hospital", 		 'Room 402'],
	"R407": ["Room 401",  					   "Hospital", 		 'Room 401'],
	"R408": ["Data Room", 					   "Hospital", 		 'Data Room'],
	"R409": ["Corridor (B3)", 				   "Hospital", 		 'Corridor (B3)'],
	"R40A": ["Laboratory 1", 				   "Hospital", 		 'Lab. 1'],
	"R40B": ["Laboratory 2", 				   "Hospital", 		 'Lab. 2'],
	"R40C": ["Park Entrance", 				   "Park", 			 'Entrance'],
	"R40D": ["Water Pump Puzzle", 			   "Park", 			 'Pump Puzzle'],
	"R40E": ["Bridge", 						   "Park", 			 'Bridge'],
	"R40F": ["Park Exit", 					   "Park", 			 'Exit'],
	"R410": ["Sewer", 						   "Park", 			 'Park Sewer'],
	"R411": ["Graveyard",					   "Park", 			 'Graveyard'],
	"R412": ["Park Warehouse", 				   "Park", 			 'Warehouse'],
	"R413": ["Park Warehouse Save Room", 	   "Park", 			 'W. Save'],
	"R414": ["Park Secret Room", 			   "Park", 			 'Secret Room'],
	"R415": ["Park Graveyard (Worm)", 		   "Park", 			 'Battle'],
	"R416": ["Unknown Room", 				   "Unknown", 		 'Unk. Place'], // this file is VERY weird...
	"R417": ["Park Street", 				   "Park", 			 'Park'],
	"R500": ["Entrance", 					   "Dead Factory", 	 'Entrace'],
	"R501": ["Resting Room", 				   "Dead Factory", 	 'Resting Room'],
	"R502": ["Steam Room", 					   "Dead Factory", 	 'Steam'],
	"R503": ["Control Room (1F)", 			   "Dead Factory", 	 'C. Room (1F)'],
	"R504": ["Corridor to Monitor Room",	   "Dead Factory", 	 'C. to M. Room'],
	"R505": ["Monitor Room", 				   "Dead Factory", 	 'Monitor Room'],
	"R506": ["Water Sample Room", 			   "Dead Factory", 	 'W.S. Room'], // BEEP BOOP!
	"R507": ["Control Room (B1)", 			   "Dead Factory", 	 'C. Room (B1)'],
	"R508": ["Corridor to Disposal Room", 	   "Dead Factory", 	 'C. to Disp. R.'],
	"R509": ["Disposal Room", 				   "Dead Factory", 	 'Disposal Room'],
	"R50A": ["Communication Room", 			   "Dead Factory", 	 'Communication R.'],
	"R50B": ["Corridor to Incinerator Room 1", "Dead Factory", 	 'C. to Incinerat. 1'],
	"R50C": ["Corridor to Incinerator Room 2", "Dead Factory", 	 'C. to Incinerat. 2'],
	"R50D": ["Incinerator Room", 			   "Dead Factory", 	 'Incinerator 1'],
	"R50E": ["Extraction Point", 			   "Dead Factory", 	 'Extraction Point'],
	"R50F": ["Elevator to Extraction Point",   "Dead Factory", 	 'Elevator to Extract. P.'],
	"R510": ["Bridge to Dead Factory", 		   "Park", 			 'Bridge to D.F.'],
	"R600": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R601": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R607": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R60B": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R60E": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R61B": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R61C": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R61D": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R61E": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R61F": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R620": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R621": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R622": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R623": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R624": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R700": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R701": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R702": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R703": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R704": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R705": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R706": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R707": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R708": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R709": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R70A": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R70B": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R70C": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R70D": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R70E": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R70F": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R710": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R711": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R712": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R713": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R714": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R718": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R71A": ["Unknown Location", 			   "Unknown", 		 'Unk. Place'],
	"R71B": ["Unknown Location", 			   "Unknown", 		 'Unk. Place']
}
// 	WIP
var MAPAS = {
	"0000": "Undefined"
}
var RDT_EMDNAME = {
	"00": ["Undefined"],
	"10": ["Male zombie 1"],
	"11": ["Female zombie 1"],
	"12": ["Male zombie 2"],
	"13": ["Female zombie 2"],
	"14": ["Male zombie 3"],
	"15": ["Male zombie 4"],
	"16": ["Male zombie 5"],
	"17": ["Male zombie 6"],
	"18": ["Male zombie 7"],
	"19": ["Male zombie 8"],
	"1a": ["Male zombie 9"],
	"1b": ["Male zombie 10"],
	"1c": ["Female zombie 3"],
	"1d": ["Male zombie 11"],
	"1e": ["Male zombie 12"],
	"1f": ["Male zombie 13"],
	"20": ["Dog"],
	"21": ["Crow"],
	"22": ["Hunter"],
	"23": ["Brain Sucker 1"],
	"24": ["Frog hunter"],
	"25": ["Spider"],
	"26": ["Unknown Enemy 1"],
	"27": ["Brain Sucker Minion"],
	"28": ["Brain Sucker 2"],
	"2c": ["Male zombie 14"],
	"2d": ["Police Station Window Arm"],
	"2e": ["Mercenary zombie 1"],
	"2f": ["Marvin 1"],
	"30": ["Worm 1"],
	"32": ["Worm Minion"],
	"33": ["Worm 2"],
	"34": ["Nemesis 1"],
	"35": ["Nemesis 2"],
	"36": ["Nemesis 3"],
	"37": ["Nemesis 4"],
	"38": ["Final Nemesis"],
	"39": ["Unknown Enemy 2"],
	"3a": ["Nemesis 5"],
	"3b": ["Nemesis Part"],
	"3e": ["Helicopter part 1"],
	"3f": ["Helicopter part 2"],
	"40": ["Helicopter part 3"],
	"50": ["Carlos Oliveira 1"],
	"51": ["Mikhail Bleeding"],
	"52": ["Nicholai Zinoviev 1"],
	"53": ["Brad Vicker\'s"],
	"54": ["Dario Rosso"],
	"55": ["Mercenary zombie 2"],
	"56": ["Tyrell"],
	"57": ["Marvin 2"],
	"58": ["Brad zombie"],
	"59": ["Dario zombie"],
	"5a": ["Umbrella Ad Girl"],
	"5b": ["Jill Valentine"],
	"5c": ["Carlos Oliveira 2"],
	"5d": ["Carlos Oliveira 3"],
	"5e": ["Nicholai Zinoviev 2"],
	"5f": ["Jill Valentine with Sidepack"],
	"60": ["Nicholai zombie"],
	"61": ["Dario\'s daughter"],
	"62": ["Jill Biker Outfit"],
	"63": ["Jill RE1 Outfit"],
	"64": ["Jill\'s white outfit"],
	"65": ["Jill with miniskirt cop"],
	"66": ["Jill as Regina (Dino Crisis)"],
	"67": ["Brian Irons"],
	"70": ["Jill alternative outfit"],
	"71": ["Jill with blue T-shirt"]
}
var RDT_EMDPOS = {
	"00": ["Normal"],
	"01": ["Lying down"],
	"02": ["Getting up 1"],
	"03": ["Crawling"],
	"04": ["Getting up 2"],
	"05": ["Lying down 2 (No anim?)"],
	"06": ["Following you"],
	"07": ["Lying down 3 (No anim?)"],
	"08": ["Getting up 3"],
	"09": ["Crawl"],
	"0b": ["Crawling 2"],
	"0c": ["Normal 2"],
	"0d": ["Crawling 3"],
	"0e": ["Normal 3"],
	"0f": ["Crawling 4"],
	"10": ["Frozen (Until you deal damage)"],
	"20": ["Normal 4"],
	"26": ["Walking"],
	"40": ["Normal 5"],
	"51": ["Lying down moving head"],
	"60": ["Normal 6"],
	"84": ["Getting Up 4"],
	"86": ["Slow on fire"],
	"87": ["Lying down on fire"],
	"a0": ["On Fire"],
	"af": ["Crawling on fire"],
	"b2": ["Getting up on fire"],
	"c0": ["On Fire 2"],
	"c1": ["Lying down on fire"],
	"c9": ["Crawling on fire 2"]
}
//
var FG_DICIONARIO = {
	".": ["0px 1106px 0px 8px",      "-8", 8],
	" ": ["0px 1077px 0px 33px",    "-33", 7],
	"@": ["0px 1077px 0px 33px",    "-33", 8],
	"(": ["0px 1068px 0px 43px",    "-44", 6],
	")": ["0px 1063px 0px 48px",    "-50", 6],
	"º": ["0px 1055px 0px 58px",    "-58", 6],
	"{": ["0px 1037px 0px 73px",    "-73", 8],
	"}": ["0px 1030px 0px 79px",    "-79", 8],
	"0": ["0px 1013px 0px 96px",    "-97", 8],
	"1": ["0px 1005px 0px 104px",  "-105", 7],
	"2": ["0px 997px 0px 111px",   "-113", 8],
	"3": ["0px 990px 0px 120px",   "-121", 7],
	"4": ["0px 981px 0px 128px",   "-129", 7],
	"5": ["0px 973px 0px 137px",   "-137", 8],
	"6": ["0px 965px 0px 144px",   "-145", 8],
	"7": ["0px 957px 0px 152px",   "-153", 8],
	"8": ["0px 949px 0px 160px",   "-161", 7],
	"9": ["0px 940px 0px 168px",   "-168", 8],
	":": ["0px 934px 0px 178px",   "-178", 10],
	",": ["0px 917px 0px 193px",   "-193", 8],
	"!": ["0px 904px 0px 210px",   "-210", 6],
	"?": ["0px 894px 0px 216px",   "-216", 8],
	"$": ["0px 885px 0px 223px",   "-223", 8],
	"A": ["0px 877px 0px 232px",   "-232", 8],
	"B": ["0px 869px 0px 240px",   "-240", 8],
	"C": ["0px 861px 0px 248px",   "-248", 8],
	"D": ["0px 853px 0px 256px",   "-256", 9],
	"E": ["0px 845px 0px 264px",   "-264", 9],
	"F": ["0px 837px 0px 272px",   "-272", 9],
	"G": ["0px 829px 0px 280px",   "-280", 9],
	"H": ["0px 821px 0px 288px",   "-288", 9],
	"I": ["0px 816px 0px 296px",   "-296", 5],
	"J": ["0px 811px 0px 301px",   "-301", 6],
	"K": ["0px 801px 0px 309px",   "-309", 8],
	"L": ["0px 794px 0px 316px",   "-316", 8],
	"M": ["0px 785px 0px 324px",   "-324", 9],
	"N": ["0px 778px 0px 332px",   "-332", 8],
	"O": ["0px 769px 0px 340px",   "-340", 9],
	"P": ["0px 761px 0px 348px",   "-348", 9],
	"Q": ["0px 753px 0px 356px",   "-356", 8],
	"R": ["0px 745px 0px 365px",   "-365", 7],
	"S": ["0px 737px 0px 373px",   "-373", 8],
	"T": ["0px 729px 0px 380px",   "-380", 8],
	"U": ["0px 721px 0px 388px",   "-388", 9],
	"V": ["0px 713px 0px 395px",   "-395", 9],
	"W": ["0px 705px 0px 403px",   "-403", 9],
	"X": ["0px 697px 0px 412px",   "-412", 9],
	"Y": ["0px 689px 0px 420px",   "-420", 9],
	"Z": ["0px 681px 0px 428px",   "-428", 9],
	"+": ["0px 673px 0px 436px",   "-436", 8],
	"/": ["0px 665px 0px 444px",   "-444", 8],
	"-": ["0px 657px 0px 452px",   "-452", 10],
	"'": ["0px 649px 0px 460px",   "-460", 8],
	"ã": ["0px 633px 0px 476px",   "-476", 8],
	"a": ["0px 625px 0px 484px",   "-484", 8],
	"b": ["0px 617px 0px 492px",   "-492", 8],
	"c": ["0px 610px 0px 500px",   "-500", 8],
	"d": ["0px 601px 0px 509px",   "-509", 7],
	"e": ["0px 594px 0px 516px",   "-516", 8],
	"f": ["0px 585px 0px 524px",   "-524", 8],
	"g": ["0px 577px 0px 532px",   "-532", 8],
	"h": ["0px 570px 0px 540px",   "-540", 8],
	"i": ["0px 561px 0px 551px",   "-550", 6],
	"j": ["0px 555px 0px 558px",   "-558", 6],
	"k": ["0px 544px 0px 564px",   "-564", 8],
	"l": ["0px 540px 0px 573px",   "-573", 5],
	"m": ["0px 531px 0px 579px",   "-579", 8],
	"n": ["0px 522px 0px 587px",   "-587", 8],
	"o": ["0px 514px 0px 595px",   "-595", 8],
	"p": ["0px 506px 0px 604px",   "-604", 8],
	"q": ["0px 498px 0px 611px",   "-611", 7],
	"r": ["0px 491px 0px 619px",   "-619", 7],
	"s": ["0px 483px 0px 627px",   "-627", 7],
	"t": ["0px 474px 0px 635px",   "-635", 6],
	"u": ["0px 467px 0px 643px",   "-643", 8],
	"v": ["0px 458px 0px 652px",   "-652", 8],
	"w": ["0px 445px 0px 661px",   "-661", 10],
	"x": ["0px 437px 0px 672px",   "-672", 7],
	"y": ["0px 427px 0px 680px",   "-680", 8],
	"z": ["0px 420px 0px 690px",   "-690", 8],
	"À": ["0px 401px 0px 708px",   "-708", 8],
	"Á": ["0px 394px 0px 716px",   "-716", 8],
	"Â": ["0px 386px 0px 723px",   "-723", 8],
	"Ã": ["0px 378px 0px 731px",   "-732", 8],
	"Ä": ["0px 370px 0px 739px",   "-739", 8],
	"Ç": ["0px 353px 0px 756px",   "-756", 8],
	"È": ["0px 345px 0px 765px",   "-765", 8],
	"É": ["0px 337px 0px 772px",   "-772", 8],
	"Ê": ["0px 329px 0px 781px",   "-781", 8],
	"Ë": ["0px 320px 0px 789px",   "-789", 8],
	"Ì": ["0px 315px 0px 799px",   "-799", 8],
	"Í": ["0px 307px 0px 806px",   "-806", 8],
	"Î": ["0px 299px 0px 815px",   "-815", 8],
	"Ï": ["0px 291px 0px 823px",   "-823", 8],
	"Ñ": ["0px 280px 0px 829px",   "-829", 8],
	"Ò": ["0px 272px 0px 837px",   "-837", 8],
	"Ó": ["0px 264px 0px 845px",   "-845", 8],
	"Ô": ["0px 256px 0px 853px",   "-853", 8],
	"Õ": ["0px 248px 0px 861px",   "-861", 8],
	"Ö": ["0px 239px 0px 870px",   "-870", 8],
	"Ù": ["0px 232px 0px 878px",   "-878", 8],
	"Ú": ["0px 223px 0px 885px",   "-885", 8],
	"Û": ["0px 216px 0px 893px",   "-893", 8],
	"Ü": ["0px 207px 0px 902px",   "-902", 8],
	"ß": ["0px 199px 0px 910px",   "-910", 8],
	"à": ["0px 191px 0px 918px",   "-918", 8],
	"á": ["0px 183px 0px 926px",   "-926", 8],
	"â": ["0px 175px 0px 934px",   "-934", 8],
	"ä": ["0px 167px 0px 942px",   "-942", 8],
	"ç": ["0px 159px 0px 950px",   "-950", 8],
	"è": ["0px 152px 0px 958px",   "-958", 8],
	"é": ["0px 143px 0px 966px",   "-966", 8],
	"ê": ["0px 135px 0px 974px",   "-974", 8],
	"ë": ["0px 127px 0px 982px",   "-982", 8],
	"ì": ["0px 120px 0px 991px",   "-991", 8],
	"í": ["0px 112px 0px 1000px", "-1000", 6],
	"î": ["0px 104px 0px 1008px", "-1008", 8],
	"ï": ["0px 96px 0px 1014px",  "-1014", 8],
	"ñ": ["0px 82px 0px 1028px",  "-1028", 8],
	"ò": ["0px 73px 0px 1036px",  "-1036", 8],
	"ó": ["0px 65px 0px 1044px",  "-1044", 8],
	"ô": ["0px 57px 0px 1052px",  "-1052", 8],
	"õ": ["0px 49px 0px 1060px",  "-1060", 8],
	"ö": ["0px 41px 0px 1068px",  "-1068", 8],
	"ù": ["0px 32px 0px 1077px",  "-1077", 8],
	"ú": ["0px 24px 0px 1085px",  "-1085", 8],
	"û": ["0px 16px 0px 1093px",  "-1093", 8],
	"ü": ["0px 8px 0px 1102px",   "-1102", 8]
}
//
var MSG_DICIONARIO = {
	"00": [false, " ", false],
	"01": [false, ".", false],
	"02": [false, "º", false],
	"03": [false, "(SPECIAL CHAR 1)", false],
	"04": [false, "(SPECIAL CHAR 2)", false],
	"05": [false, "<code><</code>", false],
	"06": [false, "<code>></code>", false],
	"07": [false, "(SPECIAL CHAR 3)", false],
	"08": [false, "(SPECIAL CHAR 4)", false],
	"09": [false, "\"", false],
	"0a": [false, "\"", false],
	"0b": [false, "(Down Arrow)", false],
	"0c": [false, "0", false],
	"0d": [false, "1", false],
	"0e": [false, "2", false],
	"0f": [false, "3", false],
	"10": [false, "4", false],
	"11": [false, "5", false],
	"12": [false, "6", false],
	"13": [false, "7", false],
	"14": [false, "8", false],
	"15": [false, "9", false],
	"16": [false, ":", false],
	"17": [false, ".", false],
	"18": [false, ",", false],
	"19": [false, "^", false],
	"1a": [false, "!", false],
	"1b": [false, "?", false],
	"1c": [false, "$", false],
	"1d": [false, "A", false],
	"1e": [false, "B", false],
	"1f": [false, "C", false],
	"20": [false, "D", false],
	"21": [false, "E", false],
	"22": [false, "F", false],
	"23": [false, "G", false],
	"24": [false, "H", false],
	"25": [false, "I", false],
	"26": [false, "J", false],
	"27": [false, "K", false],
	"28": [false, "L", false],
	"29": [false, "M", false],
	"2a": [false, "N", false],
	"2b": [false, "O", false],
	"2c": [false, "P", false],
	"2d": [false, "Q", false],
	"2e": [false, "R", false],
	"2f": [false, "S", false],
	"30": [false, "T", false],
	"31": [false, "U", false],
	"32": [false, "V", false],
	"33": [false, "W", false],
	"34": [false, "X", false],
	"35": [false, "Y", false],
	"36": [false, "Z", false],
	"37": [false, "+", false],
	"38": [false, "/", false],
	"39": [false, "-", false],
	"3a": [false, "'", false],
	"3b": [false, "-", false],
	"3d": [false, "a", false],
	"3e": [false, "b", false],
	"3f": [false, "c", false],
	"40": [false, "d", false],
	"41": [false, "e", false],
	"42": [false, "f", false],
	"43": [false, "g", false],
	"44": [false, "h", false],
	"45": [false, "i", false],
	"46": [false, "j", false],
	"47": [false, "k", false],
	"48": [false, "l", false],
	"49": [false, "m", false],
	"4a": [false, "n", false],
	"4b": [false, "o", false],
	"4c": [false, "p", false],
	"4d": [false, "q", false],
	"4e": [false, "r", false],
	"4f": [false, "s", false],
	"50": [false, "t", false],
	"51": [false, "u", false],
	"52": [false, "v", false],
	"53": [false, "w", false],
	"54": [false, "x", false],
	"55": [false, "y", false],
	"56": [false, "z", false],
	"57": [false, "(Unknown Char / Function Nº 00 - Hex: 57)", true],
	"58": [false, "(Unknown Char / Function Nº 01 - Hex: 58)", true],
	"59": [false, "(Unknown Char / Function Nº 02 - Hex: 59)", true],
	// Formatação
	"5a": [false, "á", false],
	"5b": [false, "à", false],
	"5c": [false, "â", false],
	"5d": [false, "ã", false],
	"5e": [false, "é", false],
	"5f": [false, "õ", false],
	"60": [false, "ç", false],
	"61": [false, "ê", false],
	"62": [false, "ó", false],
	//
	"63": [false, "(Unknown Char / Function Nº 12 - Hex: 63)", true],
	"64": [false, "(Unknown Char / Function Nº 13 - Hex: 64)", true],
	"65": [false, "(Unknown Char / Function Nº 14 - Hex: 65)", true],
	"66": [false, "(Unknown Char / Function Nº 15 - Hex: 66)", true],
	"67": [false, "(Unknown Char / Function Nº 16 - Hex: 67)", true],
	"68": [false, "(Unknown Char / Function Nº 17 - Hex: 68)", true],
	"69": [false, "(Unknown Char / Function Nº 18 - Hex: 69)", true],
	"6a": [false, "(Unknown Char / Function Nº 19 - Hex: 6a)", true],
	"6b": [false, "(Unknown Char / Function Nº 20 - Hex: 6b)", true],
	"6c": [false, "(Unknown Char / Function Nº 21 - Hex: 6c)", true],
	"6d": [false, "(Unknown Char / Function Nº 22 - Hex: 6d)", true],
	"6e": [false, "(Unknown Char / Function Nº 23 - Hex: 6e)", true],
	"6f": [false, "(Unknown Char / Function Nº 24 - Hex: 6f)", true],
	"71": [false, "(Unknown Char / Function Nº 26 - Hex: 71)", true],
	"72": [false, "(Unknown Char / Function Nº 27 - Hex: 72)", true],
	"73": [false, "(Unknown Char / Function Nº 28 - Hex: 73)", true],
	"74": [false, "(Unknown Char / Function Nº 29 - Hex: 74)", true],
	"75": [false, "(Unknown Char / Function Nº 30 - Hex: 75)", true],
	"76": [false, "(Unknown Char / Function Nº 31 - Hex: 76)", true],
	"77": [false, "(Unknown Char / Function Nº 32 - Hex: 77)", true],
	"78": [false, "(Unknown Char / Function Nº 33 - Hex: 78)", true],
	"79": [false, "(Unknown Char / Function Nº 34 - Hex: 79)", true],
	"7a": [false, "(Unknown Char / Function Nº 35 - Hex: 7a)", true],
	"7b": [false, "(Unknown Char / Function Nº 36 - Hex: 7b)", true],
	"7c": [false, "(Unknown Char / Function Nº 37 - Hex: 7c)", true],
	"7d": [false, "(Unknown Char / Function Nº 38 - Hex: 7d)", true],
	"7e": [false, "(Unknown Char / Function Nº 39 - Hex: 7e)", true],
	"7f": [false, "(Unknown Char / Function Nº 40 - Hex: 7f)", true],
	"80": [false, "(Unknown Char / Function Nº 41 - Hex: 80)", true],
	"81": [false, "(Unknown Char / Function Nº 42 - Hex: 81)", true],
	"82": [false, "(Unknown Char / Function Nº 43 - Hex: 82)", true],
	"83": [false, "(Unknown Char / Function Nº 44 - Hex: 83)", true],
	"84": [false, "(Unknown Char / Function Nº 45 - Hex: 84)", true],
	"85": [false, "(Unknown Char / Function Nº 46 - Hex: 85)", true],
	"86": [false, "(Unknown Char / Function Nº 47 - Hex: 86)", true],
	"87": [false, "(Unknown Char / Function Nº 48 - Hex: 87)", true],
	"88": [false, "(Unknown Char / Function Nº 49 - Hex: 88)", true],
	"89": [false, "(Unknown Char / Function Nº 50 - Hex: 89)", true],
	"8a": [false, "(Unknown Char / Function Nº 51 - Hex: 8a)", true],
	"8b": [false, "(Unknown Char / Function Nº 52 - Hex: 8b)", true],
	"8c": [false, "(Unknown Char / Function Nº 53 - Hex: 8c)", true],
	"8d": [false, "(Unknown Char / Function Nº 54 - Hex: 8d)", true],
	"8e": [false, "(Unknown Char / Function Nº 55 - Hex: 8e)", true],
	"8f": [false, "(Unknown Char / Function Nº 56 - Hex: 8f)", true],
	"90": [false, "(Unknown Char / Function Nº 57 - Hex: 90)", true],
	"91": [false, "(Unknown Char / Function Nº 58 - Hex: 91)", true],
	"92": [false, "(Unknown Char / Function Nº 59 - Hex: 92)", true],
	"93": [false, "(Unknown Char / Function Nº 60 - Hex: 93)", true],
	"94": [false, "(Unknown Char / Function Nº 61 - Hex: 94)", true],
	"95": [false, "(Unknown Char / Function Nº 62 - Hex: 95)", true],
	"96": [false, "(Unknown Char / Function Nº 63 - Hex: 96)", true],
	"97": [false, "(Unknown Char / Function Nº 64 - Hex: 97)", true],
	"98": [false, "(Unknown Char / Function Nº 65 - Hex: 98)", true],
	"99": [false, "(Unknown Char / Function Nº 66 - Hex: 99)", true],
	"9a": [false, "(Unknown Char / Function Nº 67 - Hex: 9a)", true],
	"9b": [false, "(Unknown Char / Function Nº 68 - Hex: 9b)", true],
	"9c": [false, "(Unknown Char / Function Nº 69 - Hex: 9c)", true],
	"9d": [false, "(Unknown Char / Function Nº 70 - Hex: 9d)", true],
	"9e": [false, "(Unknown Char / Function Nº 71 - Hex: 9e)", true],
	"9f": [false, "(Unknown Char / Function Nº 72 - Hex: 9f)", true],
	"a1": [false, "(Unknown Char / Function Nº 74 - Hex: a1)", true],
	"a2": [false, "(Unknown Char / Function Nº 75 - Hex: a2)", true],
	"a3": [false, "(Unknown Char / Function Nº 76 - Hex: a3)", true],
	"a4": [false, "(Unknown Char / Function Nº 77 - Hex: a4)", true],
	"a5": [false, "(Unknown Char / Function Nº 78 - Hex: a5)", true],
	"a6": [false, "(Unknown Char / Function Nº 79 - Hex: a6)", true],
	"a7": [false, "(Unknown Char / Function Nº 80 - Hex: a7)", true],
	"a8": [false, "(Unknown Char / Function Nº 81 - Hex: a8)", true],
	"a9": [false, "(Unknown Char / Function Nº 82 - Hex: a9)", true],
	"aa": [false, "(Unknown Char / Function Nº 83 - Hex: aa)", true],
	"ab": [false, "(Unknown Char / Function Nº 84 - Hex: ab)", true],
	"ac": [false, "(Unknown Char / Function Nº 85 - Hex: ac)", true],
	"ad": [false, "(Unknown Char / Function Nº 86 - Hex: ad)", true],
	"ae": [false, "(Unknown Char / Function Nº 87 - Hex: ae)", true],
	"af": [false, "(Unknown Char / Function Nº 88 - Hex: af)", true],
	"b0": [false, "(Unknown Char / Function Nº 89 - Hex: b0)", true],
	"b1": [false, "(Unknown Char / Function Nº 90 - Hex: b1)", true],
	"b2": [false, "(Unknown Char / Function Nº 91 - Hex: b2)", true],
	"b3": [false, "(Unknown Char / Function Nº 92 - Hex: b3)", true],
	"b4": [false, "(Unknown Char / Function Nº 93 - Hex: b4)", true],
	"b5": [false, "(Unknown Char / Function Nº 94 - Hex: b5)", true],
	"b6": [false, "(Unknown Char / Function Nº 95 - Hex: b6)", true],
	"b7": [false, "(Unknown Char / Function Nº 96 - Hex: b7)", true],
	"b9": [false, "(Unknown Char / Function Nº 98 - Hex: b9)", true],
	"ba": [false, "(Unknown Char / Function Nº 99 - Hex: ba)", true],
	"bb": [false, "(Unknown Char / Function Nº 100 - Hex: bb)", true],
	"bc": [false, "(Unknown Char / Function Nº 101 - Hex: bc)", true],
	"bd": [false, "(Unknown Char / Function Nº 102 - Hex: bd)", true],
	"bf": [false, "(Unknown Char / Function Nº 104 - Hex: bf)", true],
	"c2": [false, "(Unknown Char / Function Nº 107 - Hex: c2)", true],
	"c3": [false, "(Unknown Char / Function Nº 108 - Hex: c3)", true],
	"c4": [false, "(Unknown Char / Function Nº 109 - Hex: c4)", true],
	"c5": [false, "(Unknown Char / Function Nº 110 - Hex: c5)", true],
	"c6": [false, "(Unknown Char / Function Nº 111 - Hex: c6)", true],
	"c7": [false, "(Unknown Char / Function Nº 112 - Hex: c7)", true],
	"c8": [false, "(Unknown Char / Function Nº 113 - Hex: c8)", true],
	"c9": [false, "(Unknown Char / Function Nº 114 - Hex: c9)", true],
	"cb": [false, "(Unknown Char / Function Nº 116 - Hex: cb)", true],
	"cc": [false, "(Unknown Char / Function Nº 117 - Hex: cc)", true],
	"cd": [false, "(Unknown Char / Function Nº 118 - Hex: cd)", true],
	"ce": [false, "(Unknown Char / Function Nº 119 - Hex: ce)", true],
	"cf": [false, "(Unknown Char / Function Nº 120 - Hex: cf)", true],
	"d0": [false, "(Unknown Char / Function Nº 121 - Hex: d0)", true],
	"d2": [false, "(Unknown Char / Function Nº 123 - Hex: d2)", true],
	"d3": [false, "(Unknown Char / Function Nº 124 - Hex: d3)", true],
	"d4": [false, "(Unknown Char / Function Nº 125 - Hex: d4)", true],
	"d5": [false, "(Unknown Char / Function Nº 126 - Hex: d5)", true],
	"d6": [false, "(Unknown Char / Function Nº 127 - Hex: d6)", true],
	"d8": [false, "(Unknown Char / Function Nº 129 - Hex: d8)", true],
	"d9": [false, "(Unknown Char / Function Nº 130 - Hex: d9)", true],
	"da": [false, "(Unknown Char / Function Nº 131 - Hex: da)", true],
	"db": [false, "(Unknown Char / Function Nº 132 - Hex: db)", true],
	"dc": [false, "(Unknown Char / Function Nº 133 - Hex: dc)", true],
	"dd": [false, "(Unknown Char / Function Nº 134 - Hex: dd)", true],
	"de": [false, "(Unknown Char / Function Nº 135 - Hex: de)", true],
	"df": [false, "(Unknown Char / Function Nº 136 - Hex: df)", true],
	"e0": [false, "(Unknown Char / Function Nº 137 - Hex: e0)", true],
	"e1": [false, "(Unknown Char / Function Nº 138 - Hex: e1)", true],
	"e2": [false, "(Unknown Char / Function Nº 139 - Hex: e2)", true],
	"e3": [false, "(Unknown Char / Function Nº 141 - Hex: e3)", true],
	"e4": [false, "(Unknown Char / Function Nº 142 - Hex: e4)", true],
	"e5": [false, "(Unknown Char / Function Nº 143 - Hex: e5)", true],
	"e6": [false, "(Unknown Char / Function Nº 144 - Hex: e6)", true],
	"e7": [false, "(Unknown Char / Function Nº 145 - Hex: e7)", true],
	"e8": [false, "(Unknown Char / Function Nº 146 - Hex: e8)", true],
	"e9": [false, "(Unknown Char / Function Nº 147 - Hex: e9)", true],
	"eb": [false, "(Unknown Char / Function Nº 148 - Hex: eb)", true],
	"ec": [false, "(Unknown Char / Function Nº 149 - Hex: ec)", true],
	"ed": [false, "(Unknown Char / Function Nº 150 - Hex: ed)", true],
	"ee": [false, "(Unknown Char / Function Nº 151 - Hex: ee)", true],
	"ef": [false, "(Unknown Char / Function Nº 152 - Hex: ef)", true],
	"f1": [false, "(Unknown Char / Function Nº 154 - Hex: f1)", true],
	"f2": [false, "(Unknown Char / Function Nº 155 - Hex: f2)", true],
	"f6": [false, "(Unknown Char / Function Nº 159 - Hex: f6)", true],
	"f7": [false, "(Item Separator)",						   false],
	//
	"a0": [false, "(Function: Climax)", false],
	"fb": [false, "(Yes / No)", false],
	"fc": [false, "(Line Break)<br>", false], // Enter
	"fd": [false, "(Pause)", false],
	"ff": [false, "(Unknown CHAR)", false],
	// Comandos especiais (Funções)
	"70": [true, "(Function: Select Option ", 					   11],
	"fa": [true, "(Function: Show Message ", 	    	 			1],
	"fe": [true, "(Function: End Message ",				 			2],
	"ea": [true, "(Function: Show Special Char ",				 	4], // (Depende do valor inserido)
	"f0": [true, "(Function: Show Special Char ",			 		4], // (Depende do valor inserido)
	"f8": [true, "(Function: Show Item Name ",	 		 			5],
	"f3": [true, "(Function: Play SE ", 			     			6], // (Depende do valor inserido) 
	/* 
		Info: Se o valor na frente de F3 for 43, O game irá executar o som da arma equipada.
		Mas, quando esse comando for executado, alguns sons de menu / porta irão deixar de ser reproduzidos.
		Isso parece depender do soundset que foi carregado no mapa.

		Pelo menos no mapa R105.RDT (Brad entra no bar)
	*/
	"f4": [true, "(Function: Change Camera ", 			 			7], // Trocar Camera
	"f5": [true, "(Unknown Command used on R101.RDT ", 	 			8], // Comando usado na cutscene "Septemer, 28".
	"f9": [true, "(Function: Text Color ", 				 			9], // Formatação - Cor Verde
	"*#": [false,"(Next Option)", 				 	 			false], // Segunda Opção de climax
	// CT-STARS PATCH COMPAT
	"d7": [false, " ", false],
	"3c": [false, "ã", false],
	"b8": [false, "á", false],
	"be": [false, "ç", false],
	"c0": [false, "é", false],
	"c1": [false, "ê", false],
	"ca": [false, "ó", false],
	"d1": [false, "ú", false]
}
var RDT_camHeaderType = {
	"b280": [true],
	"b773": [true],
	"2d91": [true],
	"347b": [true],
	"3676": [true],
	"3087": [true],
	"38f2": [true],
	"3c68": [true] // RE2?
}
var ROFS_STATUS = {
	1:  ["Doors (.DO2)"],
	2:  ["DATA_AE and ETC2 (.TIM)"],
	3:  ["DATA and ETC (.TIM, .SLD, .DAT)"],
	4:  ["DATA_E (.TIM, .DAT, .PIX)"],
	5:  ["Models (.PLD and .PLW)"],
	6:  ["DATA_A (.PLD and .TIM)"],
	7:  ["Sounds (.VB, .VH and BGM's)"],
	8:  ["Backgrounds (BSS - .JPG and .SLD)"],
	9:  ["ROOM (.EMD and .TIM)"],
	10: ["ROOM - EMD08 (.EMD and .TIM)"],
	11: ["ROOM (.RBJ)"],
	12: ["DATA_AJ - Easy mode (.RDT)"],
	13: ["DATA_E - Hard mode (.RDT)"],
	14: ["Voices (.WAV)"],
	15: ["Background music (.WAV)"]
}
var MSG_TEXTCOLOR = {
	/* 
		Text Colors:
		Take the hex value and split in 2 (Example: The hex "30" becomes "3, 0")
		Regardless the first number (3), The 2nd number (0) always gonna be the color.
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
	"0": "Default Color",
	"1": "Green",
	"2": "Wine Red",
	"3": "Dark Grey",
	"4": "Blue",
	"5": "Default Color",
	"6": "Transparent",
	"7": "Transparent",
	"8": "Transparent",
	"9": "Transparent",
	"a": "Transparent",
	"b": "Transparent",
	"c": "Transparent",
	"d": "Transparent",
	"e": "Transparent",
	"f": "Transparent",
	"00": "Close Tag" 
}
var MSG_CHARESPECIAL = {
	"ea10": "L2",
	"ea11": "R2",
	"ea12": "&",
	"ea13": "...",
	"ea14": "[",
	"ea15": "]",
	"ea16": "L1",
	"ea17": "R1",
	"ea18": "PS1 Triangle",
	"ea19": "PS1 Circle",
	"ea1a": "PS1 Cross",
	"ea1b": "PS1 Square",
	"ea1c": "Blank Square",
	"ea1d": "Alternative Cross",
	"ea24": "S.",
	"ea25": "T.",
	"ea26": "A.",
	"ea27": "R.",
	"ea28": ";",
	"ea29": "I",
	"ea2a": "II",
	"ea2b": "III",
	"ea2c": "%",
	// Extra for CUSTOM R3DITOR TEXE.TIM
	"ea2d": "á",
	"ea2e": "à",
	"ea2f": "â",
	"ea30": "ã",
	"ea31": "é",
	"ea32": "õ",
	"ea33": "ç",
	"ea34": "ê",
	//
	"ea35": "!?"
}
var MSG_DICIONARIO_REVERSO = {
	// You are not seeing this!
	";": "ea28",
	"%": "ea2c",
	"&": "ea12",
	"[": "ea14",
	"]": "ea15",
	"(": "05",
	")": "06",
	// Comum
	" ": "00",
	".": "01",
	"º": "02",
	"<": "05",
	">": "06",
	"0": "0c",
	"\"": "09",
	"\"": "0a",
	"1": "0d",
	"2": "0e",
	"3": "0f",
	"4": "10",
	"5": "11",
	"6": "12",
	"7": "13",
	"8": "14",
	"9": "15",
	":": "16",
	",": "18",
	"^": "19",
	"!": "1a",
	"?": "1b",
	"$": "1c",
	"A": "1d",
	"B": "1e",
	"C": "1f",
	"D": "20",
	"E": "21",
	"F": "22",
	"G": "23",
	"H": "24",
	"I": "25",
	"J": "26",
	"K": "27",
	"L": "28",
	"M": "29",
	"N": "2a",
	"O": "2b",
	"P": "2c",
	"Q": "2d",
	"R": "2e",
	"S": "2f",
	"T": "30",
	"U": "31",
	"V": "32",
	"W": "33",
	"X": "34",
	"Y": "35",
	"Z": "36",
	"+": "37",
	"/": "38",
	"-": "39",
	"'": "3a",
	"-": "3b",
	"a": "3d",
	"b": "3e",
	"c": "3f",
	"d": "40",
	"e": "41",
	"f": "42",
	"g": "43",
	"h": "44",
	"i": "45",
	"j": "46",
	"k": "47",
	"l": "48",
	"m": "49",
	"n": "4a",
	"o": "4b",
	"p": "4c",
	"q": "4d",
	"r": "4e",
	"s": "4f",
	"t": "50",
	"u": "51",
	"v": "52",
	"w": "53",
	"x": "54",
	"y": "55",
	"z": "56",
	// Acentuações
	"ü": "51",
	"ú": "51",
	"ù": "51",
	"û": "51",
	"è": "41",
	"ë": "41",
	"ò": "4b",
	"ô": "4b",
	"ö": "4b",
	"ã": "3d",
	"ä": "3d",
	"í": "45",
	"ï": "45",
	"ì": "45",
	// Extra for CUSTOM TEXE.TIM
	"á": "5a",
	"à": "5b",
	"â": "5c",
	"ã": "5d",
	"é": "5e",
	"õ": "5f",
	"ç": "60",
	"ê": "61",
	"ó": "62",
	// Funções Especiais
	"#": "a0", // Climax
	"~": "fe", // Segunda alternativa de climax
	"{": "09", // Aspas Duplas Abrindo
	"}": "0a", // Aspas Duplas Fechando 
	"*": "fb", // Yes / No
	"@": "fc", // Enter / Break line
	"|": "fd", // Pausa no Texto
}
// :)
var special_day_00 = "IlNlcHRlbWJlciAyOHRoLCBEYXlsaWdodC4gVGhlIG1vbnN0ZXJzIGhhdmUgb3ZlcnRha2VuIHRoZSBjaXR5LiBTb21laG93Li4uIEknbSBzdGlsbCBhbGl2ZSEiIC0gSmlsbCBWYWxlbnRpbmUsIFJlc2lkZW50IEV2aWwgMyAtIE5lbWVzaXMu";
var special_day_01 = "T2N0b2JlciAxc3QsIG5pZ2h0LiBJIHdva2UgdXAgdG8gdGhlIHNvdW5kIG9mIGZhbGxpbmcgcmFpbi4gSSBjYW4ndCBiZWxpZXZlIEknbSBzdGlsbCBhbGl2ZS4uLiAtIEppbGwgVmFsZW50aW5lLCBSZXNpZGVudCBFdmlsIDMgLSBOZW1lc2lz";
//
var TIM_BPP = {
	//  HEX     TYPE       BPP          POS (String)
	"08000000": [1,			   "4 BPP", 0],    // WIP
	"09000000": [2,			   "8 BPP", 1084], // WIP
	"02000000": [3,			  "16 BPP", 0],    // Esse tipo não contém CLUT [WIP]
	"03000000": [4,			  "24 BPP", 0],    // Esse tipo não contém CLUT [WIP]
	"00000000": [5,  "4 BPP (No CLUT)", 0],    // WIP
	"01000000": [6,  "8 BPP (No CLUT)", 0]     // WIP
}
var TIM_EXCLUDEPATTERN = {
	"0000": [true]
}
var RANGES = {
	/*
		Edição do game (Baseado no primeiro indicador de save / info na primeira vez que o player salvou)

		Devido a essa parte ser semelhante ao código ID de games de PS1 (como "BESLES"), eu acredito que esse seja
		o indicador da versão do game.
	*/
	"gameEdition":  	  [276, 288],
	/*
		Header (Cabeçalho)

		O Inicio do arquivo de save contém um pequeno espaço nulo "00" até o primeiro indicador de save na posição
		0x80 (51 00 00 00 00 20 00 00 FF FF + Versão do game).
		Entre cada indicador, existe um espaço de 68 espaços nulos até a posição do save de Nº 15.
		Após isso, eu não percebi nenhuma mudança no espaço em diante até o 1º slot de save (0x2000).
	*/
	"slot-offset":  		 [16384], // Distancia (offset) entre cada slot de save
	"he-esp-incial": 	    [0, 256], // Espaço inicial até o 1º indicador
	"he-esp-meio":   	  [304, 512], // Espaço entre cada indicador
	"he-esp-final":    [3888, 16384], // Espaço final até o 1º slot de save
	"he-indicador-1":     [256, 304], // Indicador do 1º Slot
	"he-indicador-2":     [512, 560], // Indicador do 2º Slot
	"he-indicador-3":     [768, 816], // Indicador do 3º Slot
	"he-indicador-4":   [1024, 1072], // Indicador do 4º Slot
	"he-indicador-5":   [1280, 1328], // Indicador do 5º Slot
	"he-indicador-6":   [1536, 1584], // Indicador do 6º Slot
	"he-indicador-7":   [1792, 1840], // Indicador do 7º Slot
	"he-indicador-8":   [2048, 2096], // Indicador do 8º Slot
	"he-indicador-9":   [2304, 2352], // Indicador do 9º Slot
	"he-indicador-10":  [2560, 2608], // Indicador do 10º Slot
	"he-indicador-11":  [2816, 2864], // Indicador do 11º Slot
	"he-indicador-12":  [3072, 3120], // Indicador do 12º Slot
	"he-indicador-13":  [3328, 3376], // Indicador do 13º Slot
	"he-indicador-14":  [3584, 3632], // Indicador do 14º Slot
	"he-indicador-15":  [3840, 3888], // Indicador do 15º Slot
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
	"save_HEADER": 		   [0, 1024], // Header do save (SC..)
	"save_END": 	   [4522, 16384], // Final do save
    /*
		Espaços não mapeados:

		Esses espaços contém posições hex com outras variaveis que não foram mapeadas / desobertas através de engenharia reversa.
		Eles serão preservados para poder reconstruir o arquivo de save inteiro novamente.
    */
    "0x2204-0x2207": 	[1032, 1040], // Offset entre IGT e Dificuldade
    "0x2209-0x220D":    [1042, 1052], // Offset entre Dificuldade e Posição X
    "0x2210-0x2211": 	[1056, 1060], // Offset entre Posição X e Posição Y
    "0x2217-0x2217": 	[1070, 1072], // Offset entre Epilogos e Nº de Saves
    "0x2219-0x2219": 	[1074, 1076], // Offset entre Nº de Saves e Poison
    "0x221C-0x224D":    [1080, 1180], // Offset entre Nome da sala de save e Local da cidade
    "0x224F-0x224F": 	[1182, 1184], // Offset entre Local da cidade e Room / Event
    "0x2251-0x225D":    [1186, 1212], // Offset entre Room Event e Personagem atual
    "0x225F-0x23FE":    [1214, 2046], // Offset entre Personagem Atual e Mapas A
    "0x2400-0x2402": 	[2048, 2054], // Offset entre Mapas A e Mapas B
    "0x240A-0x240B": 	[2068, 2072], // Offset entre Files e inventário da Jill
    "0x2534-0x2534": 	[2664, 2666], // Offset entre Baú da jill e arma atual da jill
    "0x2537-0x254B":    [2670, 2712], // Offset entre Sidepack da Jill e Inventário do carlos
    "0x2674-0x2674": 	[3304, 3306], // Offset entre o Baú do carlos e a arma atual do carlos
    "0x2677-0x28D3": 	[3310, 4520], // Offset entre arma atual do carlos até a roupa atual da Jill
    // Outras variaveis
	"jillInvent-1":		[2072, 2080], // Inventário da Jill   - Slot 01  - 0x240C
	"jillInvent-2":		[2080, 2088], // Inventário da Jill   - Slot 02  - 0x2410
	"jillInvent-3":		[2088, 2096], // Inventário da Jill   - Slot 03  - 0x2414
	"jillInvent-4":		[2096, 2104], // Inventário da Jill   - Slot 04  - 0x2418
	"jillInvent-5":		[2104, 2112], // Inventário da Jill   - Slot 05  - 0x241C
	"jillInvent-6":		[2112, 2120], // Inventário da Jill   - Slot 06  - 0x2420
	"jillInvent-7":		[2120, 2128], // Inventário da Jill   - Slot 07  - 0x2424
	"jillInvent-8":		[2128, 2136], // Inventário da Jill   - Slot 08  - 0x2428
	"jillInvent-9":		[2136, 2144], // Inventário da Jill   - Slot 09  - 0x242C
	"jillInvent-10":	[2144, 2152], // Inventário da Jill   - Slot 10  - 0x2430
	"carlosInvent-1":   [2712, 2720], // Inventário do Carlos - Slot 01  - 0x254C
	"carlosInvent-2":   [2720, 2728], // Inventário do Carlos - Slot 02  - 0x2550
	"carlosInvent-3":   [2728, 2736], // Inventário do Carlos - Slot 03  - 0x2554
	"carlosInvent-4":   [2736, 2744], // Inventário do Carlos - Slot 04  - 0x2558
	"carlosInvent-5":   [2744, 2752], // Inventário do Carlos - Slot 05  - 0x255c
	"carlosInvent-6":   [2752, 2760], // Inventário do Carlos - Slot 06  - 0x2560
	"carlosInvent-7":   [2760, 2768], // Inventário do Carlos - Slot 07  - 0x2564
	"carlosInvent-8":   [2768, 2776], // Inventário do Carlos - Slot 08  - 0x2568
	"carlosInvent-9":   [2776, 2784], // Inventário do Carlos - Slot 09  - 0x256C
	"carlosInvent-10":  [2784, 2792], // Inventário do Carlos - Slot 10  - 0x2570
	"leveldificuldade": [1040, 1042], // Level de Dificuldade 			 - 0x2208
	"totalSaves": 		[1072, 1074], // Total de saves 				 - 0x2218
	"localSave": 		[1078, 1080], // ID da sala de save 			 - 0x221B
	"epilogos": 		[1068, 1070], // Total de Epílogos desbloqueados - 0x2216
	"localCidade": 		[1180, 1182], // Local da cidade aonde foi salvo - 0x224E
	"roupaAtual": 		[4520, 4522], // Roupa atual 					 - 0x28D4
	"characterAtual": 	[1212, 1214], // Personagem atual 				 - 0x225E
	"jillArma": 		[2666, 2668], // Arma atual da jill 			 - 0x2535
	"carlosArma": 		[3306, 3308], // Arma atual do carlos 			 - 0x2675
	"jill-side": 		[2668, 2670], // Sidepack da Jill 				 - 0x2536
	"carlos-side": 		[3308, 3310], // Sidepack do Carlos 			 - 0x2676
	"characterPoison":  [1076, 1078], // Personagem está com poison 	 - 0x221A
	"room_event": 		[1184, 1186], // Room / Event 					 - 0x2250
	"mapas-a": 			[2046, 2048], // Mapas do Game (Primeira Hex) 	 - 0x23FF
	"mapas-b": 			[2054, 2056], // Mapas do Game (Segunda Hex)	 - 0x2403
	"jill_files": 		[2056, 2068], // Files do game 					 - 0x2404 to 0x2409
	"pos-X":   			[1052, 1056], // Posição X no mapa atual 		 - 0x220E to 0x221F
	"pos-Y":            [1060, 1064], // Posição Y no mapa atual 		 - 0x2212 to 0x2213
	"IGT": 				[1024, 1032], // IGT (In-Game Time) Tempo Atual  - 0x2200 to 0x2203
	"characterHP":    	[1064, 1068], // HP do personagem atual. 		 - 0x2214 to 0x2215
	"j-box": 			[2152, 2656], // Baú da Jill 					 - 0x2535 to 0x2530
	"c-box": 			[2792, 3296], // Baú do Carlos 					 - 0x2574 to 0x2580
	///////////////////////////////////////////////////////////////////////////////////////
	/*
		TIM Ranges [WIP]
	*/
	"TIM_header": 					   [0, 8], // Header
	"TIM_BPP": 						  [8, 16], // Bit Per Pixel
	/*
		RDT Ranges
	*/
	// Item Ranges
	"RDT_item-header": 			       [0, 2], // RE2 = 4E, RE3 = 67 || 68
	"RDT_item-itemIdetifier": 	       [2, 4], // OK
	"RDT_item-espaco1": 		      [4, 12], // OK
	// Se a Header do Item for 67
	"RDT_item-0-itemXX": 		     [12, 16], // OK
	"RDT_item-0-itemYY": 		     [16, 20], // OK
	"RDT_item-0-itemZZ": 		     [20, 24], // OK
	"RDT_item-0-itemRR": 		     [24, 28], // OK
	"RDT_item-0-itemID": 		     [28, 30], // OK
	"RDT_item-0-espaco2": 		     [30, 32], // OK
	"RDT_item-0-itemQuant":		     [32, 34], // OK
	"RDT_item-0-espaco3": 		     [34, 38], // OK
	"RDT_item-0-itemFlag": 			 [38, 40], // OK
	"RDT_item-0-modelID": 			 [40, 42], // OK
	"RDT_item-0-itemMP": 		     [42, 44], // OK
	// Se a Header do item for 68
	"RDT_item-1-itemXX": 		     [12, 16],
	"RDT_item-1-itemYY": 		     [16, 20],
	"RDT_item-1-itemZZ": 		     [20, 24],
	"RDT_item-1-itemRR": 		     [24, 28],
	"RDT_item-1-itemID": 		     [44, 46], // OK
	"RDT_item-1-espaco2": 		     [46, 48], // OK
	"RDT_item-1-itemQuant":		     [48, 50], // OK
	"RDT_item-1-espaco3": 		     [34, 42],
	"RDT_item-1-itemMP": 		     [58, 60], // OK
	/*
		Prop models [WIP]
	*/
	"RDT_propModel-header": 		   [0, 2], // RE2 = 2D, RE3 = 7F
	"RDT_propModel-id": 			   [2, 4],
	"RDT_propModel-ident": 			  [4, 24],
	/*
		Enemy [WIP]
	*/
	"RDT_enemy-header": 			   [0, 4], // RE2 = 44, RE3 = 7D
	"RDT_enemy-enemyNumber": 		   [4, 6], // Enemy number (room) Id (PUT FF IF YOU ARE PUTTING A PARTNER)
	"RDT_enemy-type": 				   [6, 8],
	"RDT_enemy-pose": 				  [8, 10],
	"RDT_enemy-extraFlag": 			 [10, 12],
	"RDT_enemy-offset-0": 			 [12, 18],
	"RDT_enemy-soundSet": 			 [18, 20],
	"RDT_enemy-texture": 			 [20, 22],
	"RDT_enemy-enemyFlag": 			 [22, 24],
	"RDT_enemy-xPos": 				 [24, 28],
	"RDT_enemy-yPos": 				 [32, 36],
	"RDT_enemy-zPos": 				 [28, 32],
	"RDT_enemy-rPos": 				 [36, 40],
	"RDT_enemy-offset-1": 			 [40, 48],
	/*
		MSG codes
	*/
	"RDT_msgCode-header": 			   [0, 2], // RE2 = 2C, RE3 = 63 || 64
	"RDT_msgCode-id":  				   [2, 4],
	"RDT_msgCode-identifier": 		  [4, 12], // 04 31 00 00
	// Header 63
	"RDT_msgCode-0-xPos": 			 [12, 16],
	"RDT_msgCode-0-zPos": 			 [16, 20],
	"RDT_msgCode-0-xWidthTrigger": 	 [20, 24],
	"RDT_msgCode-0-zWidthTrigger": 	 [24, 28],
	"RDT_msgCode-0-offset_0": 		 [28, 30], 
	"RDT_msgCode-0-japChars": 		 [30, 32], // (16 [Japanese letters. Game crashes sometimes] and 17 - resevilnemesis30 on RE2 definitive RDT info)
	"RDT_msgCode-0-offset_1": 		 [32, 34], 
	"RDT_msgCode-0-specialProp":	 [34, 36], // (For things like open locked desk with herbs (02) - same as above)
	"RDT_msgCode-0-readMode": 		 [36, 40],
	// Header 64
	"RDT_msgCode-1-xPos": 			 ["WIP", "WIP"],
	"RDT_msgCode-1-zPos": 			 ["WIP", "WIP"],
	"RDT_msgCode-1-xWidthTrigger": 	 ["WIP", "WIP"],
	"RDT_msgCode-1-zWidthTrigger": 	 ["WIP", "WIP"],
	"RDT_msgCode-1-offset_0": 		 ["WIP", "WIP"], 
	"RDT_msgCode-1-japChars": 		 ["WIP", "WIP"], 
	"RDT_msgCode-1-offset_1": 		 ["WIP", "WIP"], 
	"RDT_msgCode-1-specialProp": 	 ["WIP", "WIP"], 
	"RDT_msgCode-1-readMode": 		 [52, 56], // OK
	/*
		Cameras
	*/
	"RDT_cam-0-Header": 			   [0, 4], // RE2 = 3C 68 || B7 73, RE3 = B7 73 || B2 80 || 2D 91
	"RDT_cam-0-cX-1": 			   	   [4, 8],
	"RDT_cam-0-cX-2": 			   	  [8, 12], // Look like it is ALWAYS FF FF
	"RDT_cam-0-cY-1": 			   	 [12, 16],
	"RDT_cam-0-cY-2": 			   	 [16, 20], // Look like it is ALWAYS FF FF
	"RDT_cam-0-cZ-1": 			   	 [20, 24],
	"RDT_cam-0-cZ-2": 			   	 [24, 28],
	"RDT_cam-0-nX-1": 			   	 [28, 32],
	"RDT_cam-0-nX-2": 			   	 [32, 36],
	"RDT_cam-0-nY-1": 			   	 [36, 40],
	"RDT_cam-0-nY-2": 			   	 [40, 44],
	"RDT_cam-0-nZ-1": 			   	 [44, 48],
	"RDT_cam-0-nZ-2": 			   	 [48, 52],
	"RDT_cam-0-misc": 				 [52, 64], // Due the fact RE3 don't have roomcut.bin, i will try figure out how it deal with the background images
	/*
		Doors
	*/
	"RDT_door-0-header":         	   [0, 2], // RE2 = 3B, RE3 = 61 || 62
	"RDT_door-0-id":                   [2, 4],
	"RDT_door-0-doorIdentifier":      [4, 12],
	"RDT_door-0-doorXpos":           [12, 16],
	"RDT_door-0-doorYpos": 		     [16, 20],
	"RDT_door-0-doorZpos": 		     [20, 24],
	"RDT_door-0-doorRpos": 		     [24, 28],
	"RDT_door-0-doorNextXpos": 	     [28, 32],
	"RDT_door-0-doorNextYpos": 	     [32, 36],
	"RDT_door-0-doorNextZpos": 	     [36, 40],
	"RDT_door-0-doorNextRpos": 	     [40, 44],
	"RDT_door-0-doorNextStage":      [44, 46],
	"RDT_door-0-doorNextRoomNumber": [46, 48],
	"RDT_door-0-doorNextCamNumber":  [48, 50],
	"RDT_door-0-doorHexOffset0": 	 [50, 52],
	"RDT_door-0-doorType": 			 [52, 54],
	"RDT_door-0-doorOpenOrient": 	 [54, 56], // 00: Handle Left, 01: Handle Right
	"RDT_door-0-doorHexOffset1": 	 [56, 58],
	"RDT_door-0-doorLockedFlag": 	 [58, 60],
	"RDT_door-0-doorKey": 		 	 [60, 62],
	"RDT_door-0-doorHexOffset2": 	 [62, 64],
}