/*

	R3ditor - Database.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please

	Item = Nome, Info Adicional, Baú Clip, Baú Margin-left, index imagem baú, index imagem info, index quantidade de loop

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
	"82": ["Reloading tool", 								   "With this item, you can create ammo through gunpowder.", 																																	 																 "0px 502px 0px 0px", "-54px",    "13", "5", "16", "0", "13"],
	"83": ["Game inst. A", 									   "Manual of how to play Resident Evil 3 / Biohazard 3.<br>With this manual, you learn about explosive objects, The 180 ° Rotation, Emergency Escape, Emergency Bypass, and more.", 											 								 "0px 446px 0px 57px", "-166px",  "13", "5", "17", "1", "13"],
	"84": ["Game inst. B", 									   "Manual of how to play Resident Evil 3 / Biohazard 3.<br>With this manual, you learn about the Reloading Tool, Gunpowder and its combinations.", 													 														 "0px 392px 0px 112px", "-277px", "13", "5", "18", "2", "13"],
	"85": ["(BOTU) Recipient with liquid inside",			   "BOT... Wait a sec...<br><br>With the internal name of \"Game inst. A\", this item can be used as many times as you like - it does not change anything in the game.", 													 									 "0px 335px 0px 168px", "-390px", "13", "5", "19", "3", "13"]
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
	"9f": ["Photo D"],
	"9e": ["Photo E"],
	"a0": ["Clock Tower Poster Card"],
	"a2": ["Classified Photo File"]
}

var RDT_MAPAS = {
	"a4": ["Uptown Map"],
	"a9": ["Police Station Map"],
	"a5": ["Downtown Map"],
	"a6": ["Clock Tower Map"],
	"aa": ["Hospital Map"],
	"a7": ["Park Map"],
	"a8": ["Dead Factory Map"]
}

var ATTR = {
	"00": ["None",								  "#fff0", "0 0 10px #fff0"], // Use this for puzzle items that don't have the ammo display.
	"01": ["Remaining ammo in green",		   "#008400", "0 0 2px #004200"],
	"02": ["% remaining in green", 			   "#008400", "0 0 2px #004200"],
	"03": ["Inf. ammo in green", 			   "#008400", "0 0 2px #004200"],
	"05": ["Remaining ammo in red",			   "#840000", "0 0 2px #310000"],
	"06": ["% remaining in red", 			   "#840000", "0 0 2px #310000"],
	"07": ["Inf. ammo in red", 				   "#840000", "0 0 2px #310000"],
	"0d": ["Remaining ammo in blue", 		   "#9393ff", "0 0 2px #004242"],
	"0e": ["% remaining in blue", 			   "#9393ff", "0 0 2px #004242"],
	"0f": ["Inf. ammo in blue", 	 		   "#9393ff", "0 0 2px #004242"],
	"16": ["Attr. used by M4A1 Assault Rifle", "#840000", "0 0 2px #310000"],
	
	// Atributos Desconhecidos
	"17": ["Attr. found in Nightmare Mod", 	   "#fff", "0 0 2px #0f0"], // Atributo encontrado na shotgun do Carlos
	"0b": ["Attr. found in some versions", 	   "#fff", "0 0 2px #0f0"]
}

var VOID = {
	"00": "OK!",									   // Condição normal
	"80": "Condição anormal da versão francesa/Taiwan" // Condição anormal encontrado na versão francesa. Pode ser um hack que outra pessoa tenha feito antes
}

var CIDADE = {
	"00": ["Uptown (Including RPD)"],
    "01": ["Downtown"],
    "02": ["Clock Tower / Park before the Hospital"],
    "03": ["Clock Tower / Park after the Hospital"],
    "04": ["Dead Factory"],
    "05": ["Shows first the Mercenaries-minigame ending, then the ending video of the main game (the one without Barry Burton, assuming 0x2250 has been set to 00. If not, then it only crashes)."],
    "06": ["Downtown again. I have no idea what's different here. This may be after the scene where Jill falls trough the parking lot floor."]
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
	"000000000000": ["Undefined", 						  "HEX zerada (00)"],
	"4241534c5553": ["Russian / Nightmare (Or Darkness) Mod", 	   "BASLUS"],
	"4245534c4553": ["Mediakite / Xplosiv", 					   "BESLES"],
	"4249534c5053": ["Chinese / Japanese / Taiwan Version", 	   "BISLPS"]
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

// 	WIP
var MAPAS = {
	"0000": "Undefined"
}

var MSG_DICIONARIO = {
	"00": [false, " "],
	"01": [false, "."],
	"02": [false, ">"],
	"03": [false, "(SPECIAL CHAR 1)"],
	"04": [false, "(SPECIAL CHAR 2)"],
	"05": [false, "("],
	"06": [false, ")"],
	"07": [false, "(SPECIAL CHAR 3)"],
	"08": [false, "(SPECIAL CHAR 4)"],
	"09": [false, "\""],
	"0a": [false, "\""],
	"0b": [false, "(Down Arrow)"],
	"0c": [false, "0"],
	"0d": [false, "1"],
	"0e": [false, "2"],
	"0f": [false, "3"],
	"10": [false, "4"],
	"11": [false, "5"],
	"12": [false, "6"],
	"13": [false, "7"],
	"14": [false, "8"],
	"15": [false, "9"],
	"16": [false, ":"],
	"17": [false, "."],
	"18": [false, ","],
	"19": [false, "^"],
	"1a": [false, "!"],
	"1b": [false, "?"],
	"1c": [false, "$"],
	"1d": [false, "A"],
	"1e": [false, "B"],
	"1f": [false, "C"],
	"20": [false, "D"],
	"21": [false, "E"],
	"22": [false, "F"],
	"23": [false, "G"],
	"24": [false, "H"],
	"25": [false, "I"],
	"26": [false, "J"],
	"27": [false, "K"],
	"28": [false, "L"],
	"29": [false, "M"],
	"2a": [false, "N"],
	"2b": [false, "O"],
	"2c": [false, "P"],
	"2d": [false, "Q"],
	"2e": [false, "R"],
	"2f": [false, "S"],
	"30": [false, "T"],
	"31": [false, "U"],
	"32": [false, "V"],
	"33": [false, "W"],
	"34": [false, "X"],
	"35": [false, "Y"],
	"36": [false, "Z"],
	"37": [false, "+"],
	"38": [false, "/"],
	"39": [false, "-"],
	"3a": [false, "'"],
	"3b": [false, "-"],
	"3c": [false, "(SPECIAL CHAR 5)"],
	"3d": [false, "a"],
	"3e": [false, "b"],
	"3f": [false, "c"],
	"40": [false, "d"],
	"41": [false, "e"],
	"42": [false, "f"],
	"43": [false, "g"],
	"44": [false, "h"],
	"45": [false, "i"],
	"46": [false, "j"],
	"47": [false, "k"],
	"48": [false, "l"],
	"49": [false, "m"],
	"4a": [false, "n"],
	"4b": [false, "o"],
	"4c": [false, "p"],
	"4d": [false, "q"],
	"4e": [false, "r"],
	"4f": [false, "s"],
	"50": [false, "t"],
	"51": [false, "u"],
	"52": [false, "v"],
	"53": [false, "w"],
	"54": [false, "x"],
	"55": [false, "y"],
	"56": [false, "z"],
	"57": [false, "(Unknown Char / Function Nº 00 - Hex: 57)"],
	"58": [false, "(Unknown Char / Function Nº 01 - Hex: 58)"],
	"59": [false, "(Unknown Char / Function Nº 02 - Hex: 59)"],
	"5a": [false, "(Unknown Char / Function Nº 03 - Hex: 5a)"],
	"5b": [false, "(Unknown Char / Function Nº 04 - Hex: 5b)"],
	"5c": [false, "(Unknown Char / Function Nº 05 - Hex: 5c)"],
	"5d": [false, "(Unknown Char / Function Nº 06 - Hex: 5d)"],
	"5e": [false, "(Unknown Char / Function Nº 07 - Hex: 5e)"],
	"5f": [false, "(Unknown Char / Function Nº 08 - Hex: 5f)"],
	"60": [false, "(Unknown Char / Function Nº 09 - Hex: 60)"],
	"61": [false, "(Unknown Char / Function Nº 10 - Hex: 61)"],
	"62": [false, "(Unknown Char / Function Nº 11 - Hex: 62)"],
	"63": [false, "(Unknown Char / Function Nº 12 - Hex: 63)"],
	"64": [false, "(Unknown Char / Function Nº 13 - Hex: 64)"],
	"65": [false, "(Unknown Char / Function Nº 14 - Hex: 65)"],
	"66": [false, "(Unknown Char / Function Nº 15 - Hex: 66)"],
	"67": [false, "(Unknown Char / Function Nº 16 - Hex: 67)"],
	"68": [false, "(Unknown Char / Function Nº 17 - Hex: 68)"],
	"69": [false, "(Unknown Char / Function Nº 18 - Hex: 69)"],
	"6a": [false, "(Unknown Char / Function Nº 19 - Hex: 6a)"],
	"6b": [false, "(Unknown Char / Function Nº 20 - Hex: 6b)"],
	"6c": [false, "(Unknown Char / Function Nº 21 - Hex: 6c)"],
	"6d": [false, "(Unknown Char / Function Nº 22 - Hex: 6d)"],
	"6e": [false, "(Unknown Char / Function Nº 23 - Hex: 6e)"],
	"6f": [false, "(Unknown Char / Function Nº 24 - Hex: 6f)"],
	"70": [false, "(Unknown Char / Function Nº 25 - Hex: 70)"],
	"71": [false, "(Unknown Char / Function Nº 26 - Hex: 71)"],
	"72": [false, "(Unknown Char / Function Nº 27 - Hex: 72)"],
	"73": [false, "(Unknown Char / Function Nº 28 - Hex: 73)"],
	"74": [false, "(Unknown Char / Function Nº 29 - Hex: 74)"],
	"75": [false, "(Unknown Char / Function Nº 30 - Hex: 75)"],
	"76": [false, "(Unknown Char / Function Nº 31 - Hex: 76)"],
	"77": [false, "(Unknown Char / Function Nº 32 - Hex: 77)"],
	"78": [false, "(Unknown Char / Function Nº 33 - Hex: 78)"],
	"79": [false, "(Unknown Char / Function Nº 34 - Hex: 79)"],
	"7a": [false, "(Unknown Char / Function Nº 35 - Hex: 7a)"],
	"7b": [false, "(Unknown Char / Function Nº 36 - Hex: 7b)"],
	"7c": [false, "(Unknown Char / Function Nº 37 - Hex: 7c)"],
	"7d": [false, "(Unknown Char / Function Nº 38 - Hex: 7d)"],
	"7e": [false, "(Unknown Char / Function Nº 39 - Hex: 7e)"],
	"7f": [false, "(Unknown Char / Function Nº 40 - Hex: 7f)"],
	"80": [false, "(Unknown Char / Function Nº 41 - Hex: 80)"],
	"81": [false, "(Unknown Char / Function Nº 42 - Hex: 81)"],
	"82": [false, "(Unknown Char / Function Nº 43 - Hex: 82)"],
	"83": [false, "(Unknown Char / Function Nº 44 - Hex: 83)"],
	"84": [false, "(Unknown Char / Function Nº 45 - Hex: 84)"],
	"85": [false, "(Unknown Char / Function Nº 46 - Hex: 85)"],
	"86": [false, "(Unknown Char / Function Nº 47 - Hex: 86)"],
	"87": [false, "(Unknown Char / Function Nº 48 - Hex: 87)"],
	"88": [false, "(Unknown Char / Function Nº 49 - Hex: 88)"],
	"89": [false, "(Unknown Char / Function Nº 50 - Hex: 89)"],
	"8a": [false, "(Unknown Char / Function Nº 51 - Hex: 8a)"],
	"8b": [false, "(Unknown Char / Function Nº 52 - Hex: 8b)"],
	"8c": [false, "(Unknown Char / Function Nº 53 - Hex: 8c)"],
	"8d": [false, "(Unknown Char / Function Nº 54 - Hex: 8d)"],
	"8e": [false, "(Unknown Char / Function Nº 55 - Hex: 8e)"],
	"8f": [false, "(Unknown Char / Function Nº 56 - Hex: 8f)"],
	"90": [false, "(Unknown Char / Function Nº 57 - Hex: 90)"],
	"91": [false, "(Unknown Char / Function Nº 58 - Hex: 91)"],
	"92": [false, "(Unknown Char / Function Nº 59 - Hex: 92)"],
	"93": [false, "(Unknown Char / Function Nº 60 - Hex: 93)"],
	"94": [false, "(Unknown Char / Function Nº 61 - Hex: 94)"],
	"95": [false, "(Unknown Char / Function Nº 62 - Hex: 95)"],
	"96": [false, "(Unknown Char / Function Nº 63 - Hex: 96)"],
	"97": [false, "(Unknown Char / Function Nº 64 - Hex: 97)"],
	"98": [false, "(Unknown Char / Function Nº 65 - Hex: 98)"],
	"99": [false, "(Unknown Char / Function Nº 66 - Hex: 99)"],
	"9a": [false, "(Unknown Char / Function Nº 67 - Hex: 9a)"],
	"9b": [false, "(Unknown Char / Function Nº 68 - Hex: 9b)"],
	"9c": [false, "(Unknown Char / Function Nº 69 - Hex: 9c)"],
	"9d": [false, "(Unknown Char / Function Nº 70 - Hex: 9d)"],
	"9e": [false, "(Unknown Char / Function Nº 71 - Hex: 9e)"],
	"9f": [false, "(Unknown Char / Function Nº 72 - Hex: 9f)"],
	"a0": [false, "(Unknown Char / Function Nº 73 - Hex: a0)"],
	"a1": [false, "(Unknown Char / Function Nº 74 - Hex: a1)"],
	"a2": [false, "(Unknown Char / Function Nº 75 - Hex: a2)"],
	"a3": [false, "(Unknown Char / Function Nº 76 - Hex: a3)"],
	"a4": [false, "(Unknown Char / Function Nº 77 - Hex: a4)"],
	"a5": [false, "(Unknown Char / Function Nº 78 - Hex: a5)"],
	"a6": [false, "(Unknown Char / Function Nº 79 - Hex: a6)"],
	"a7": [false, "(Unknown Char / Function Nº 80 - Hex: a7)"],
	"a8": [false, "(Unknown Char / Function Nº 81 - Hex: a8)"],
	"a9": [false, "(Unknown Char / Function Nº 82 - Hex: a9)"],
	"aa": [false, "(Unknown Char / Function Nº 83 - Hex: aa)"],
	"ab": [false, "(Unknown Char / Function Nº 84 - Hex: ab)"],
	"ac": [false, "(Unknown Char / Function Nº 85 - Hex: ac)"],
	"ad": [false, "(Unknown Char / Function Nº 86 - Hex: ad)"],
	"ae": [false, "(Unknown Char / Function Nº 87 - Hex: ae)"],
	"af": [false, "(Unknown Char / Function Nº 88 - Hex: af)"],
	"b0": [false, "(Unknown Char / Function Nº 89 - Hex: b0)"],
	"b1": [false, "(Unknown Char / Function Nº 90 - Hex: b1)"],
	"b2": [false, "(Unknown Char / Function Nº 91 - Hex: b2)"],
	"b3": [false, "(Unknown Char / Function Nº 92 - Hex: b3)"],
	"b4": [false, "(Unknown Char / Function Nº 93 - Hex: b4)"],
	"b5": [false, "(Unknown Char / Function Nº 94 - Hex: b5)"],
	"b6": [false, "(Unknown Char / Function Nº 95 - Hex: b6)"],
	"b7": [false, "(Unknown Char / Function Nº 96 - Hex: b7)"],
	"b8": [false, "(Unknown Char / Function Nº 97 - Hex: b8)"],
	"b9": [false, "(Unknown Char / Function Nº 98 - Hex: b9)"],
	"ba": [false, "(Unknown Char / Function Nº 99 - Hex: ba)"],
	"bb": [false, "(Unknown Char / Function Nº 100 - Hex: bb)"],
	"bc": [false, "(Unknown Char / Function Nº 101 - Hex: bc)"],
	"bd": [false, "(Unknown Char / Function Nº 102 - Hex: bd)"],
	"be": [false, "(Unknown Char / Function Nº 103 - Hex: be)"],
	"bf": [false, "(Unknown Char / Function Nº 104 - Hex: bf)"],
	"c0": [false, "(Unknown Char / Function Nº 105 - Hex: c0)"],
	"c1": [false, "(Unknown Char / Function Nº 106 - Hex: c1)"],
	"c2": [false, "(Unknown Char / Function Nº 107 - Hex: c2)"],
	"c3": [false, "(Unknown Char / Function Nº 108 - Hex: c3)"],
	"c4": [false, "(Unknown Char / Function Nº 109 - Hex: c4)"],
	"c5": [false, "(Unknown Char / Function Nº 110 - Hex: c5)"],
	"c6": [false, "(Unknown Char / Function Nº 111 - Hex: c6)"],
	"c7": [false, "(Unknown Char / Function Nº 112 - Hex: c7)"],
	"c8": [false, "(Unknown Char / Function Nº 113 - Hex: c8)"],
	"c9": [false, "(Unknown Char / Function Nº 114 - Hex: c9)"],
	"ca": [false, "(Unknown Char / Function Nº 115 - Hex: ca)"],
	"cb": [false, "(Unknown Char / Function Nº 116 - Hex: cb)"],
	"cc": [false, "(Unknown Char / Function Nº 117 - Hex: cc)"],
	"cd": [false, "(Unknown Char / Function Nº 118 - Hex: cd)"],
	"ce": [false, "(Unknown Char / Function Nº 119 - Hex: ce)"],
	"cf": [false, "(Unknown Char / Function Nº 120 - Hex: cf)"],
	"d0": [false, "(Unknown Char / Function Nº 121 - Hex: d0)"],
	"d1": [false, "(Unknown Char / Function Nº 122 - Hex: d1)"],
	"d2": [false, "(Unknown Char / Function Nº 123 - Hex: d2)"],
	"d3": [false, "(Unknown Char / Function Nº 124 - Hex: d3)"],
	"d4": [false, "(Unknown Char / Function Nº 125 - Hex: d4)"],
	"d5": [false, "(Unknown Char / Function Nº 126 - Hex: d5)"],
	"d6": [false, "(Unknown Char / Function Nº 127 - Hex: d6)"],
	"d7": [false, "(Unknown Char / Function Nº 128 - Hex: d7)"],
	"d8": [false, "(Unknown Char / Function Nº 129 - Hex: d8)"],
	"d9": [false, "(Unknown Char / Function Nº 130 - Hex: d9)"],
	"da": [false, "(Unknown Char / Function Nº 131 - Hex: da)"],
	"db": [false, "(Unknown Char / Function Nº 132 - Hex: db)"],
	"dc": [false, "(Unknown Char / Function Nº 133 - Hex: dc)"],
	"dd": [false, "(Unknown Char / Function Nº 134 - Hex: dd)"],
	"de": [false, "(Unknown Char / Function Nº 135 - Hex: de)"],
	"df": [false, "(Unknown Char / Function Nº 136 - Hex: df)"],
	"e0": [false, "(Unknown Char / Function Nº 137 - Hex: e0)"],
	"e1": [false, "(Unknown Char / Function Nº 138 - Hex: e1)"],
	"e2": [false, "(Unknown Char / Function Nº 139 - Hex: e2)"],
	"e3": [false, "(Unknown Char / Function Nº 141 - Hex: e3)"],
	"e4": [false, "(Unknown Char / Function Nº 142 - Hex: e4)"],
	"e5": [false, "(Unknown Char / Function Nº 143 - Hex: e5)"],
	"e6": [false, "(Unknown Char / Function Nº 144 - Hex: e6)"],
	"e7": [false, "(Unknown Char / Function Nº 145 - Hex: e7)"],
	"e8": [false, "(Unknown Char / Function Nº 146 - Hex: e8)"],
	"e9": [false, "(Unknown Char / Function Nº 147 - Hex: e9)"],
	"eb": [false, "(Unknown Char / Function Nº 148 - Hex: eb)"],
	"ec": [false, "(Unknown Char / Function Nº 149 - Hex: ec)"],
	"ed": [false, "(Unknown Char / Function Nº 150 - Hex: ed)"],
	"ee": [false, "(Unknown Char / Function Nº 151 - Hex: ee)"],
	"ef": [false, "(Unknown Char / Function Nº 152 - Hex: ef)"],
	"f1": [false, "(Unknown Char / Function Nº 154 - Hex: f1)"],
	"f2": [false, "(Unknown Char / Function Nº 155 - Hex: f2)"],
	"f6": [false, "(Unknown Char / Function Nº 159 - Hex: f6)"],
	"f7": [false, "(Unknown Char / Function Nº 160 - Hex: f7)"],
	"f9": [false, "(Green Color)"],	   // Formatação - Cor Verde
	"fb": [false, "(Yes / No)"],
	"fc": [false, "(Line Break)<br>"], // Enter
	"fd": [false, "(Pause)"],
	"ff": [false, "(Unknown CHAR)"],
	
	// Comandos especiais

	"fa": [true, "(Function: Show Message)", 	    	 1],
	"fe": [true, "(Function: End Message)",				 2],
	"ea": [true, "(Function: Show Special Char)",		 4], // (Depende do valor inserido)
	"f0": [true, "(Function: Show Special Char)",		 4], // (Depende do valor inserido)
	"f8": [true, "(Function: Show Item Name ",	 		 5],
	"f3": [true, "(Function: Play SE)", 			     6], // (Depende do valor inserido) 
	/* 
		Info: Se o valor na frente de F3 for 43, O game irá executar o som da arma equipada.
		Mas, quando esse comando for executado, alguns sons de menu / porta irão deixar de ser reproduzidos.
		Isso depende do soundset que foi carregado no mapa
	*/
	"f4": [true, "(Function: Change Camera)", 			 7],
	"f5": [false, "(Unknown Char / Function Nº 158 - Hex: f5)"] // Comando usado na cutscene "Septemer, 28".
}

var MSG_CHARESPECIAL = {
	"ea24": "S.",
	"ea25": "T.",
	"ea26": "A.",
	"ea27": "R.",
	"ea28": ";"
}

var MSG_DICIONARIO_REVERSO = {
	// Special Char Thing - you are not seeing this!
	";": "ea28",
	// Comum
	" ": "00",
	".": "01",
	">": "02",
	"(": "05",
	")": "06",
	"0": "0c",
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
	".": "17",
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
	"ê": "41",
	"é": "41",
	"è": "41",
	"ë": "41",
	"ç": "3f",
	"õ": "4b",
	"ó": "4b",
	"ò": "4b",
	"ô": "4b",
	"ö": "4b",
	"ã": "3d",
	"á": "3d",
	"à": "3d",
	"â": "3d",
	"ä": "3d",
	// Funções Especiais
	"{": "09", // Aspas Duplas Abrindo
	"}": "0a", // Aspas Duplas Fechando 
	"]": "f9", // Tag Cor Verde
	"[": "f9", // Tag Cor Verde
	"*": "fb", // Pergunta - Yes / No
	"@": "fc", // Enter / Break line
	"|": "fd"  // Pausa no Texto
}

var RANGES = {
	// Edição do game (Baseado no primeiro indicador de save / info na primeira vez que o player salvou)
	"gameEdition":  		[276, 288],

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

	"he-indicador-1":     [256, 304], //  Indicador do 1º Slot
	"he-indicador-2":     [512, 560], //  Indicador do 2º Slot
	"he-indicador-3":     [768, 816], //  Indicador do 3º Slot
	"he-indicador-4":   [1024, 1072], //  Indicador do 4º Slot
	"he-indicador-5":   [1280, 1328], //  Indicador do 5º Slot
	"he-indicador-6":   [1536, 1584], //  Indicador do 6º Slot
	"he-indicador-7":   [1792, 1840], //  Indicador do 7º Slot
	"he-indicador-8":   [2048, 2096], //  Indicador do 8º Slot
	"he-indicador-9":   [2304, 2352], //  Indicador do 9º Slot
	"he-indicador-10":  [2560, 2608], // Indicador do 10º Slot
	"he-indicador-11":  [2816, 2864], // Indicador do 11º Slot
	"he-indicador-12":  [3072, 3120], // Indicador do 12º Slot
	"he-indicador-13":  [3328, 3376], // Indicador do 13º Slot
	"he-indicador-14":  [3584, 3632], // Indicador do 14º Slot
	"he-indicador-15":  [3840, 3888], // Indicador do 15º Slot

	/* 			
		Save - Info por slot
		
		Uma das diferenças do save do Resident Evil 2 comparado ao Resident Evil 3 é que agora o jogador
		está limitado a 15 slots de saves, pois todos eles estão em um único arquivo. Porém, por mais que 
		dessa forma os arquivos de save de cada jogos sejam distintos, os dois tem o cabeçalho de save (0x2000) 
		com o começo semelhante. (SC..)

		Ordem de variaveis do save:
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
			   Nome 		     Hex Pos. 														 |
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
		17) Invent.  da Jill     0x240C até 0x2433 (Levando em conta os 32 Bits de cada slot) 	OK
		18) Baú da Jill 		 0x2434 até 0x2533 (Levando em conta os 32 Bits de cada slot)   OK
		@) 0x2534-0x2534																		OK
		19) Arma atual da Jill   0x2535 		   (8 Bits, apenas a ID da arma)				OK
		20) Sidepack da Jill     0x2536 														OK
		@) 0x2537-0x254B 																		OK
		21) Invent.  do Carlos   0x254C até 0x2573 (Levando em conta os 32 Bits de cada slot)   OK
		22) Baú do Carlos 		 0x2574 até 0x2673 (Levando em conta os 32 Bits de cada slot)   OK
		@) 0x2674-0x2674 																		OK
		23) Arma atual do Carlos 0x2675			   (8 Bits, apenas a ID da arma)				OK
		24) Sidepack do Carlos   0x2676 														OK
		25) Roupa da Jill 		 0x28D4															OK
		26) Final do Save 		 0x28D5 até 0x3FFF												OK
		|																						 |
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
	*/
	
	// Headers

	"save_HEADER": 		   [0, 1024], // Header do save (SC..)
	"save_END": 	   [4522, 16384], // Final do save

    /*
		Espaços não mapeados:

		Esses espaços contém posições hex com outras variaveis que não foram mapeadas / desobertas através de engenharia reversa.
		Eles serão preservados para poder reconstruir o arquivo de save inteiro novamente.
    */

    "0x2204-0x2207": 	[1032, 1040], // Espaço entre IGT e Dificuldade
    "0x2209-0x220D":    [1042, 1052], // Espaço entre Dificuldade e Posição X
    "0x2210-0x2211": 	[1056, 1060], // Espaço entre Posição X e Posição Y
    "0x2217-0x2217": 	[1070, 1072], // Espaço entre Epilogos e Nº de Saves
    "0x2219-0x2219": 	[1074, 1076], // Espaço entre Nº de Saves e Poison
    "0x221C-0x224D":    [1080, 1180], // Espaço entre Nome da sala de save e Local da cidade
    "0x224F-0x224F": 	[1182, 1184], // Espaço entre Local da cidade e Room / Event
    "0x2251-0x225D":    [1186, 1212], // Espaço entre Room Event e Personagem atual
    "0x225F-0x23FE":    [1214, 2046], // Espaço entre Personagem Atual e Mapas A
    "0x2400-0x2402": 	[2048, 2054], // Espaço entre Mapas A e Mapas B
    "0x240A-0x240B": 	[2068, 2072], // Espaço entre Files e inventário da Jill
    "0x2534-0x2534": 	[2664, 2666], // Espaço entre Baú da jill e arma atual da jill
    "0x2537-0x254B":    [2670, 2712], // Espaço entre Sidepack da Jill e Inventário do carlos
    "0x2674-0x2674": 	[3304, 3306], // Espaço entre o Baú do carlos e a arma atual do carlos
    "0x2677-0x28D3": 	[3310, 4520], // Espaço entre arma atual do carlos até a roupa atual da Jill

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
	"jill_files": 		[2056, 2068], // Files do game 					 - 0x2404 até 0x2409
	"pos-X":   			[1052, 1056], // Posição X no mapa atual 		 - 0x220E até 0x221F
	"pos-Y":            [1060, 1064], // Posição Y no mapa atual 		 - 0x2212 até 0x2213
	"IGT": 				[1024, 1032], // IGT (In-Game Time) Tempo Atual  - 0x2200 até 0x2203
	"characterHP":    	[1064, 1068], // HP do personagem atual. 		 - 0x2214 até 0x2215
	"j-box": 			[2152, 2656], // Baú da Jill 					 - 0x2535 até 0x2530
	"c-box": 			[2792, 3296], // Baú do Carlos 					 - 0x2574 até 0x2580

	////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////

	/*

		RDT Ranges

	*/

	// Item Ranges

	"RDT_item-header": 			[0, 2], // OK
	"RDT_item-itemIdetifier": 	[2, 4], // OK
	"RDT_item-espaco1": 		[4, 12], // OK

	// Se a Header do Item for 67

	"RDT_item-0-itemXX": 		[12, 16], // OK
	"RDT_item-0-itemYY": 		[16, 20], // OK
	"RDT_item-0-itemZZ": 		[20, 24], // OK
	"RDT_item-0-itemRR": 		[24, 28], // OK

	"RDT_item-0-itemID": 		[28, 30], // OK
	"RDT_item-0-espaco2": 		[30, 32], // OK
	"RDT_item-0-itemQuant":		[32, 34], // OK
	"RDT_item-0-espaco3": 		[34, 42], // OK
	"RDT_item-0-itemMP": 		[42, 44], // OK

	// Se a Header do item for 68

	"RDT_item-1-itemXX": 		[12, 16],
	"RDT_item-1-itemYY": 		[16, 20],
	"RDT_item-1-itemZZ": 		[20, 24],
	"RDT_item-1-itemRR": 		[24, 28],
	
	"RDT_item-1-itemID": 		[44, 46], // OK
	"RDT_item-1-espaco2": 		[46, 48], // OK
	"RDT_item-1-itemQuant":		[48, 50], // OK

	"RDT_item-1-espaco3": 		[34, 42],
	"RDT_item-1-itemMP": 		[42, 44],
}