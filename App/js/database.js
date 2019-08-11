/*

	R3ditor - Database.js
	Por mitosan/mscore/misto_quente/mscorehdr
	Help me - please

	Ordem de leitura dos itens:
	?? = Item Id value, 00-85 (See section 4. Item Id-values)
	## = Remaining ammo/uses for the item, 00-FF
	!! = Item attribute (See section 5. Item attributes)
	The 4th byte should always be 00.

	Atributos:
		00 = Use this for (puzzle) items that don't have the ammo display.
		01 = Ammo remaining display (Green)
		02 = % (percentage) of ammo remaining display (Green)
		03 = Infinite ammo (Green)
		05 = Ammo remaining display (Red)
		06 = % of ammo remaining display (Red)
		07 = Infinite ammo (Red)
		0D = Ammo remaining display (Blue)
		0E = % of ammo remaining display (Blue)
		0F = Infinite ammo (Blue)
		
		Item = Nome, Info Adicional, Baú Clip, Baú Margin-left, index imagem baú, index imagem info, index quantidade de loop

*/

var ITEM = {
	"00": ["Slot Vazio", 									   "", 																																																									   						    "0px 502px 0px 0px",     "-54px", "0", "0", "0", "0", "0"],
	"01": ["Combat Knife", 									   "Faca de combate simples.<br><br>Ela pode ser bem útil quando você está com pouca ou sem munição. Na mão de quem sabe usar, faz estrago!", 																								   						"0px 446px 0px 57px",   "-166px", "0", "0", "1", "1", "0"],
	"02": ["Sigpro SP 2009 handgun", 						   "Pistola alternativa do carlos.<br>Não é lá grande coisa porém pode te ajudar caso esteja na pior...", 																																	   						"0px 392px 0px 112px",  "-277px", "0", "0", "2", "2", "0"],
	"03": ["Beretta M92F handgun, custom S.T.A.R.S edition",   "M92F versão especial da S.T.A.R.S feita pelo Kendo.<br><br>Diz a lenda de que aqueles que não tem vida jogam usando ela sem recarregar nenhuma vez.", 																											"0px 335px 0px 168px",  "-390px", "0", "0", "3", "3", "0"],
	"04": ["Shotgun Benelli M3S", 							   "Se trata de uma Shotgun Benelli M3S porém com o cano serrado.<br>", 								   																																							"0px 280px 0px 224px",  "-500px", "0", "0", "4", "4", "0"],
	"05": ["Smith & Wesson M629C .44-caliber magnum revolver", "É uma magnum rapaz - atire no pé que a cabeça explode!<br>Mesmo sendo absurdamente poderosa, não chega aos pés da magnum dos games anteriores (Em questão de design, é claro.)", 														   						"0px 227px 0px 280px",  "-609px", "0", "0", "5", "5", "0"],
	"06": ["Hk-p Grenade launcher com munição comuns", 		   "Lança granadas com munição comuns - é extremamente eficiente contra a maioria dos inimigos do game.", 																																	   						"0px 168px 0px 335px",  "-722px", "0", "0", "6", "8", "0"],
	"07": ["Hk-p Grenade launcher com munição de fogo", 	   "Lança granadas com munição de fogo - é extremamente eficiente contra a maioria dos inimigos do game.", 																																	   						"0px 114px 0px 392px",  "-833px", "0", "0", "6", "8", "0"],
	"08": ["Hk-p Grenade launcher com munição de ácido", 	   "Lança granadas com munição de ácido - é extremamente eficiente contra o verme que você encontra no cemitério (Parque).", 																														   				"0px 58px 0px 446px",   "-943px", "0", "0", "6", "8", "0"],
	"09": ["Hk-p Grenade launcher com munição de gelo", 	   "Lança granadas com munição de gelo - é extremamente eficiente nas batalhas contra o nemesis.", 																				   																					"0px 0px 0px 501px",   "-1055px", "0", "0", "6", "8", "0"],
	"0a": ["M66 Rocket launcher", 							   "De longe é a melhor arma do game, porém seu unico problema é o tempo que seu personagem leva para mirar.", 																																						"0px 502px 0px 0px",     "-54px", "1", "0", "7", "0", "1"],
	"0b": ["Gatling gun", 									   "Uma das armas mais apelonas disponíveis. A única coisa que peida nela é o tempo que ela leva para disparar seus projéteis.", 																											   						"0px 446px 0px 57px",   "-166px", "1", "0", "8", "1", "1"],
	"0c": ["Mine thrower", 									   "Lançador de minas - De longe é uma das armas mais diferentes do game.<br><br>Boa para usar na batalha final!", 																					   															    "0px 392px 0px 112px",  "-277px", "1", "0", "9", "2", "1"],
	"0d": ["STI Eagle 6.0", 								   "Ela atira mais rápido do que a pistola comum e também tem a chance de acertar o inimigo com dano crítico, estourando a sua cabeça (zombie).",																												 	"0px 335px 0px 168px", "-390px", "1", "0", "10", "3", "1"],
	"0e": ["M4A1 Assault rifle em modo Automático", 		   "Rifle de assalto M4A1 em modo Automático<br><br>É um bom rifle para quem está aprendendo a jogar o game, mas saiba que existem armas que são melhores do que essa.",															 		   						"0px 280px 0px 224px", "-500px", "1", "0", "11", "4", "1"],
	"0f": ["M4A1 Assault rifle em modo Manual", 			   "Rifle de assalto M4A1 em modo Manual<br><br>É um bom rifle para quem está aprendendo a jogar o game, mas saiba que existem armas que são melhores do que essa.",															 			   						"0px 227px 0px 280px", "-609px", "1", "0", "11", "5", "1"],
	"10": ["Western Custom M37 lever action shotgun", 		   "Ela tem uma hitbox maior e consegue disparar mais rápido do que a Benelli M3S mas em compensação não consegue disparar projéteis mais fortes.<br><br>Boa para quando estiver com diversos inimigos a frente!", 					   								"0px 168px 0px 335px", "-722px", "1", "0", "12", "6", "1"],
	"11": ["Sigpro SP 2009 com balas melhoradas", 		       "É a mesma Sigpro que o Carlos usa, porém com balas melhoradas.", 																																	   															"0px 114px 0px 392px",  "-833px", "1", "0", "2", "7", "1"],
	"12": ["Beretta M92F customizada com balas melhoradas",    "É a mesma M93F que a Jill usa, só que está com balas mais poderosas.<br><br>O som do disparo machuca mais do que a própria bala!", 																									   							"0px 58px 0px 446px",   "-943px", "1", "0", "3", "8", "1"],
	"13": ["Shotgun Benelli M3S com balas melhoradas",         "Shotgun Benelli M3S<br><br>Se trata da mesma shotgun, porém com balas que tiram muito mais danos do que o comum.", 																																				"0px 0px 0px 501px",   "-1055px", "1", "0", "4", "9", "1"],
	"14": ["Mine thrower com balas melhoradas", 			   "Se trata de uma versão melhorada da lança granadas, com balas mais fortes",																								 																   						"0px 502px 0px 0px",     "-54px", "2", "0", "9", "0", "2"],
	"15": ["Handgun bullets (9x19 parabellum)", 			   "Munição de pisola comum. Você consegue carregar 255 delas por slot de inventário", 																				   																								"0px 446px 0px 57px",  "-166px", "2", "0", "13", "1", "2"],
	"16": ["Magnum bullets (.44-caliber)", 					   "Munição da Smith & Wesson M629C .44 Magnum.<br><br>Tenha em mente que você não vai encontrar esse tipo de munição tão fácil assim, então use ela com sabedoria!", 																								"0px 392px 0px 112px", "-277px", "2", "0", "14", "2", "2"],
	"17": ["Shotgun shells", 								   "Balas de Shotgun Benelli M3S Comuns.<br><br>Você não encontra esse tipo de munição tão fácil assim, então use elas com sabedoria!", 																															"0px 335px 0px 168px", "-390px", "2", "0", "15", "3", "2"],
	"18": ["Grenade rounds", 								   "Munição de dano simples - ideal para eliminar inimigos comuns.", 																																							   									"0px 280px 0px 224px", "-500px", "2", "0", "16", "4", "2"],
	"19": ["Flame rounds", 									   "Munição de dano moderado - ideal para eliminar inimigos diferenciados.", 																							   																							"0px 227px 0px 280px", "-609px", "2", "0", "17", "5", "2"],
	"1a": ["Acid rounds", 									   "Munição de dano avancado<br><br>Ideal para combater o verme no cemitério do parque.", 																												   															"0px 168px 0px 335px", "-722px", "2", "0", "18", "6", "2"],
	"1b": ["Freeze rounds", 								   "Munição de dano extremo<br><br>Ideal para combater o nemesis.", 																								   																								"0px 114px 0px 392px", "-833px", "2", "0", "19", "7", "2"],
	"1c": ["Minethrower rounds", 							   "Munição de lançadora de minas<br><br>Perfeita para usar em locais com incineradores posicionados de forma conveniênte", 																												   						"0px 58px 0px 446px",   "-943px", "2", "1", "0", "8", "2"],
	"1d": ["Assault rifle clip (5.56 NATO rounds)", 		   "Munição do Rifle M4A1.<br><br>É o tipo de munição que você só encontra no baú do personagem atual.", 																										   													"0px 0px 0px 501px",   "-1055px", "2", "1", "1", "9", "2"],
	"1e": ["Enhanced handgun bullets", 						   "Balas melhoradas de pisola.<br>Você pode obter ela após fazer diversas combinações de gun powder a.", 																															   								"0px 502px 0px 0px",     "-54px", "3", "1", "2", "0", "3"],
	"1f": ["Enhanced shotgun shells", 						   "Balas melhoradas da shotgun.<br><br>Você pode obter ela após fazer diversas combinações de gun powder b.", 																											   											"0px 446px 0px 57px",   "-166px", "3", "1", "3", "1", "3"],
	"20": ["First aid spray", 								   "Esse spray consegue recuperar a sua vida inteira, menos o status de poison.", 																											   																		"0px 392px 0px 112px",  "-277px", "3", "1", "4", "2", "3"],
	"21": ["Erva Verde", 									   "Essa erva consegue curar apenas um pouco da sua vida, sem remover o status de envenenamento.", 																					   																				"0px 335px 0px 168px",  "-390px", "3", "1", "5", "3", "3"],
	"22": ["Erva Azul", 									   "Serve para remover o veneno do corpo do personagem atual.<br><br>Se estiver jogando o NIGHTMARE MOD, combine duas para obter uma erva verde", 															   														"0px 280px 0px 224px",  "-500px", "3", "1", "6", "4", "3"],
	"23": ["Erva Vermelha",									   "Ela sozinha não faz absolutamente nada - porém quando combinada com a verde, ela cura a sua vida completamente.", 																	   																			"0px 227px 0px 280px",  "-609px", "3", "1", "7", "5", "3"],
	"24": ["2x Ervas Verdes", 						    	   "Essa combinação consegue curar um pouco mais do que uma erva só, porém não recupera sua vida por completo e nem remove status de envenenamento.", 																												"0px 168px 0px 335px",  "-722px", "3", "1", "8", "6", "3"],
	"25": ["Mix de Ervas Verdes + Azuis", 					   "Essa combinação consegue curar um pouco da sua vida e remover o status de envenenamento do corpo do personagem atual.", 																													 					"0px 114px 0px 392px",  "-833px", "3", "1", "9", "7", "3"],
	"26": ["Mix de Ervas Verdes + Vermelhas", 				   "Essa combinação consegue curar a sua vida completamente, sem remover o status de envenenamento.", 																													   											"0px 58px 0px 446px",  "-943px", "3", "1", "10", "8", "3"],
	"27": ["Mix de três Ervas Verdes", 						   "Essa combinação consegue curar a sua vida completamente, sem remobet o status de envenenamento. ", 																																   								"0px 0px 0px 501px",  "-1055px", "3", "1", "11", "9", "3"],
	"28": ["Mix de 2x Ervas Verdes + Erva Azul", 			   "Essa combinação consegue curar um pouco mais do que uma erva verde sozinha e remove o status de envenenamento do personagem atual.", 																									   						"0px 502px 0px 0px",    "-54px", "4", "1", "12", "0", "4"],
	"29": ["Mix de todas as ervas",     					   "Essa combinação cura a sua vida de forma completa, inclusive removendo o status de envenenamento do personagem atual.", 																		   																"0px 446px 0px 57px",  "-166px", "4", "1", "13", "1", "4"],
	"2a": ["Kit de First aid spray", 						   "Kit que suporta até três unidades de first aid kit.",																													 																   						"0px 392px 0px 112px", "-277px", "4", "1", "14", "2", "4"],
	"2b": ["Square crank", 									   "Manivela com ponta quadrada - Usada em uptown para abrir um armário cheio de balas de lança-granadas.", 																																   						"0px 335px 0px 168px", "-390px", "4", "1", "15", "3", "4"],
	"2c": ["(BOTU) Medalhão na cor Vermelha",				   "BOTU!<br><br>Uma moeda com o simbolo do \"Nosferatu\" na cor Vermelha.<br><br>Item descartado durante o processo de desenvolvimento.", 																					   										"0px 280px 0px 224px", "-500px", "4", "1", "16", "4", "4"],
	"2d": ["(BOTU) Medalhão na cor Azul", 					   "BOTU!<br><br>Uma moeda com o simbolo do \"Nosferatu\" na cor Azul.<br><br>Item descartado durante o processo de desenvolvimento.", 																						   										"0px 227px 0px 280px", "-609px", "4", "1", "17", "5", "4"],
	"2e": ["(BOTU) Medalhão na cor Dourada",				   "BOTU!<br><br>Uma moeda com o simbolo do \"Nosferatu\" na cor Dourada.<br><br>Item descartado durante o processo de desenvolvimento.", 																						   									"0px 168px 0px 335px", "-722px", "4", "1", "18", "6", "4"],
	"2f": ["Jill's S.T.A.R.S card", 						   "Cartão de Identificação S.T.A.R.S da Jill Valentine.<br>Usado para obter a senha da gaveta na sala de arquivos na RPD caso você fuja do nemesis.", 																					   							"0px 114px 0px 392px", "-833px", "4", "1", "19", "7", "4"],
	"30": ["(BOTU) Lata de óleo 'Giga Oil'",    			   "BOTU!<br><br>Esse item seria usado para fazer o item \"Mixed Oil\".<br><br>Item descartado durante o processo de desenvolvimento.", 																						   									"0px 58px 0px 446px",   "-943px", "4", "2", "0", "8", "4"],
	"31": ["Battery", 										   "Bateria usada para ligar o elevador que leva até a estação de energia em Downtown.", 																																					   						"0px 0px 0px 501px",   "-1055px", "4", "2", "1", "9", "4"],
	"32": ["Fire hook", 									   "Pé de cabra usado para abrir um alçapão no restaurante.", 																					   																													"0px 502px 0px 0px",      "-54px","5", "2", "2", "0", "5"],
	"33": ["Power cable", 									   "Cabo de energia encontrado em um carro no estacionamento de uma oficina.<br>Use ele no bonde para fazer o memsmo funcionar.", 																							   										"0px 446px 0px 57px",    "-166px","5", "2", "3", "1", "5"],
	"34": ["Fuse", 											   "Fusível obtido na estação elétrica.<br>Use ele no bonde para fazer o mesmo funcionar.", 																													   													"0px 392px 0px 112px",   "-277px","5", "2", "4", "2", "5"],
	"35": ["(BOTU) Mangueira de incêndio cortada",			   "BOTU!<br>Supostamente essa mangueira de incêndio era para estar cortada para fazer você dar mais voltas ainda!<br><br>Item descartado durante o processo de desenvolvimento.", 														   							"0px 335px 0px 168px",   "-390px","5", "2", "5", "3", "5"],
	"36": ["Oil Additive", 									   "Aditivo que serve para ser misturado com o óleo encontrado no posto de gasolina.", 																																		   										"0px 280px 0px 224px",   "-500px","5", "2", "6", "4", "5"],
	"37": ["Brad Vickers' card case", 						   "Carteira do Brad Vickers.<br>Dentro dela, tem o cartão de Identificação S.T.A.R.S", 																																		   									"0px 227px 0px 280px",   "-609px","5", "2", "7", "5", "5"],
	"38": ["Brad Vickers' S.T.A.R.S card",					   "Cartão de Identificação S.T.A.R.S do Brad Vicker's<br><br>Usado para obter a senha da gaveta na sala de arquivos na RPD.<br><br>Aliás, as senhas são: 0513, 0131, 4011 ou 4312.", 														   						"0px 168px 0px 335px",   "-722px","5", "2", "8", "6", "5"],
	"39": ["Machine oil", 									   "Esse item sozinho não tem nenhuma serventia. Combine ele com o Oil Additive para obter o item Mixed Oil.", 													   																									"0px 114px 0px 392px",   "-833px","5", "2", "9", "7", "5"],
	"3a": ["Mixed oil", 									   "Use esse item junto do fusivel e do cabo de energia para fazer o bonde se mover.", 																				   																								"0px 58px 0px 446px",   "-943px","5", "2", "10", "8", "5"],
	"3b": ["(BOTU) Correntes",  							   "BOTU!<br><br>Essas correntes eram para estar na onde você encontra balas no armazém (Warehouse).<br><br>Item descartado durante o processo de desenvolvimento.", 																		   						"0px 0px 0px 501px",   "-1055px","5", "2", "11", "9", "5"],
	"3c": ["Wrench", 										   "Chave Inglêsa usada para remover a mangueira de incêndio em Uptown e abrir a porta do posto de gasolina.", 																															 							"0px 502px 0px 0px", "-54px",     "6", "2", "12", "0", "6"], 
	"3d": ["Iron pipe", 									   "Cano de ferro usado em uma lareira em um almoxerifado no cemitério após queimar toda lenha presente.<br><br>Serve para para revelar uma passagem secreta.", 																			 						"0px 446px 0px 57px", "-166px",   "6", "2", "13", "1", "6"], 
	"3e": ["(BOTU) Boca da mangueira de incêndio", 			   "BOTU!<br><br>Item que suportamente seria usado para combinar com a mangueira de incêndio que está faltando o encaixe<br><br>Item descartado durante o processo de desenvolvimento.", 													 						"0px 392px 0px 112px", "-277px",  "6", "2", "14", "2", "6"], 
	"3f": ["Fire hose", 									   "Mangueira de incêndio usada para apagar o fogo em um corredor em uptown.", 																										 																				"0px 335px 0px 168px", "-390px",  "6", "2", "15", "3", "6"], 
	"40": ["Tape recorder", 								   "Gravador de áudio (aka. walkman) que contém a voz de um médico descrevendo uma fratura no cotovelo.<br><br>Usado para abrir o elevador no hospital.", 																					 						"0px 280px 0px 224px", "-500px",  "6", "2", "16", "4", "6"], 
	"41": ["Lighter oil", 									   "Flúido de isqueiro.<br><br>Use ele com o isqueiro sem óleo para obter o isqueiro aberto.", 																																			 							"0px 227px 0px 280px", "-609px",  "6", "2", "17", "5", "6"], 
	"42": ["Lighter (Fechado / Sem fluído)", 				   "Um isqueiro que está sem fluído.<br>Combine com o item Lighter oil para obter o isqueiro aberto.", 																																		 						"0px 168px 0px 335px", "-722px",  "6", "2", "18", "6", "6"], 
	"43": ["Lighter (Aberto / Com fluído)", 				   "Um isqueiro que está com fluído.<br>Serve para acender lareiras em cemitérios e queimar cordas cheias de óleo.", 																		 																		"0px 114px 0px 392px", "-833px",  "6", "2", "19", "7", "6"], 
	"44": ["Green gem", 									   "Gema verde usada para abrir o portão da prefeitura de Raccon.<br><br>Meus parabéns para quem teve a brilhante ideia<br>Design 10/10!", 																								 							"0px 58px 0px 446px", "-943px",    "6", "3", "0", "8", "6"], 
	"45": ["Blue gem", 										   "Gema azul usada para abrir o portão da prefeitura de Raccon.<br><br>Meus parabéns para quem teve a brilhante ideia<br>Design 10/10!", 																									 						"0px 0px 0px 501px", "-1055px",    "6", "3", "1", "9", "6"], 
	"46": ["Amber ball", 									   "Uma esfera marrom feita de resina extraída de árvores fossilizadas.<br><br>Esse item é utilizado no puzzle dos três relógios na clock tower.", 																						 							"0px 502px 0px 0px", "-54px",      "7", "3", "2", "0", "7"], 
	"47": ["Obsidian ball", 								   "Também conhecida como Obsidiena, Se trata de uma esfera negra de vidro feita através de uma reação quimica de lava vulcanica quando resfriada.<br><br>Esse item é utilizado no puzzle dos três relógios na clock tower.", 				 						"0px 446px 0px 57px", "-166px",    "7", "3", "3", "1", "7"], 
	"48": ["Crystal ball", 									   "Uma simples esfera de cristal, utilizada em um puzzle na clock tower.", 																																								 						"0px 392px 0px 112px", "-277px",   "7", "3", "4", "2", "7"], 
	"49": ["(BOTU) Controle Remoto Sem Pilhas",      		   "BOTU!<br><br>Um Controle remoto que está sem pilhas.<br>Pelo que dá a entender, ele seria usado na farmácia para ver qual seria a senha (Aquacure, Safsprin ou Adravil).<br><br>Item descartado durante o processo de desenvolvimento.",						"0px 335px 0px 168px", "-390px",   "7", "3", "5", "3", "7"], 
	"4a": ["(BOTU) Controle Remoto Com Pilhas", 			   "BOTU!<br><br>Um Controle remoto que está com pilhas.<br>Pelo que dá a entender, ele seria usado na farmácia para ver qual seria a senha (Aquacure, Safsprin ou Adravil).<br><br>Item descartado durante o processo de desenvolvimento.",						"0px 280px 0px 224px", "-500px",   "7", "3", "6", "4", "7"], 
	"4b": ["(BOTU) Pilhas Modelo AA",	 					   "BOTU!<br><br>Um par de pilhas que seria utilizado para combinar com o Controle Remoto Sem Pilhas. Seria usado para ligar a TV da farmácia.<br><br>Item descartado durante o processo de desenvolvimento.", 							 							"0px 227px 0px 280px", "-609px",   "7", "3", "7", "5", "7"], 
	"4c": ["Gold gear", 									   "Uma engrenagem dourada que faz parte de um sistema mecânico de relógios.<br><br>Combine com a Silver Gear para formar o Item Chronos Gear, usado na torre da Clock Tower.", 															 						"0px 168px 0px 335px", "-722px",   "7", "3", "8", "6", "7"], 
	"4d": ["Silver gear", 									   "Uma engrenagem prateada que faz parte de um sistema mecânico de relógios.<br><br>Combine com a Gold Gear para formar o Item Chronos Gear, usado na torre da Clock Tower.", 															 							"0px 114px 0px 392px", "-833px",   "7", "3", "9", "7", "7"], 
	"4e": ["Chronos gear", 									   "Engrenagem composta dos itens Gold Gear e Silver Gear.<br><br>Use no relógio da Clock tower para ativar o mesmo.", 																													 							"0px 58px 0px 446px", "-943px",   "7", "3", "10", "8", "7"], 
	"4f": ["Bronze book",									   "Um livro de Bronze encontrado nas mãos de uma estátua do prefeito de raccon city.<br><br>Use ela em um puzzle próximo ao restaurante (Downtown) para obter o Bronze compass", 															 						"0px 0px 0px 501px", "-1055px",   "7", "3", "11", "9", "7"], 
	"50": ["Bronze compass", 								   "Um compasso feito de bronze encontrado próximo a um restaurante.<br><br>Use ele na estátua do prefeito de raccon para obter o item Battery.", 																						 	 						"0px 502px 0px 0px", "-54px",     "8", "3", "12", "0", "8"], 
	"51": ["Vaccine medium", 								   "Uma das soluções para criar um combatente contra o <br>T-Virus.<br><br>Combine com o item Vaccine base para criar o item \"Vaccine\".", 																						 	  	 						"0px 446px 0px 57px", "-166px",   "8", "3", "13", "1", "8"], 
	"52": ["Vaccine base", 									   "Uma das soluções para criar um combatente contra o <br>T-Virus.<br><br>Combine com o item Vaccine medium para criar o item \"Vaccine\".", 																								 						"0px 392px 0px 112px", "-277px",  "8", "3", "14", "2", "8"], 
	"53": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui só para encher o espaço mesmo, por que elas não tem nenhuma utilidade ingame.", 																	 						"0px 335px 0px 168px", "-390px",   "8", "0", "2", "3", "8"], 
	"54": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui só para encher o espaço mesmo, por que elas não tem nenhuma utilidade ingame.", 																	 						"0px 280px 0px 224px", "-500px",   "8", "0", "2", "4", "8"], 
	"55": ["Vaccine", 										   "Vacina criada com os itens Vaccine base e Vaccine medium.<br>Use na Jill para curar ela do T-Virus.", 																																	 						"0px 227px 0px 280px", "-609px",  "8", "3", "15", "5", "8"], 
	"56": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui só para encher o espaço mesmo, por que elas não tem nenhuma utilidade ingame.", 																	 						"0px 168px 0px 335px", "-722px",   "8", "0", "2", "6", "8"], 
	"57": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui só para encher o espaço mesmo, por que elas não tem nenhuma utilidade ingame.", 																	 						"0px 114px 0px 392px", "-833px",   "8", "0", "2", "7", "8"], 
	"58": ["Medium base", 									   "Solução usada para criar o item Vaccine medium.<br>Ela é usada no laboratório do hospital de raccon, B3.", 																															 							"0px 58px 0px 446px", "-943px",   "8", "3", "16", "8", "8"], 
	"59": ["Eagle parts A", 								   "Primeiro set de itens da arma STI Eagle 6.0.<br>Combine com o item Eagle parts B para formar a mesma.", 																																 						"0px 0px 0px 501px", "-1055px",   "8", "3", "17", "9", "8"], 
	"5a": ["Eagle parts B", 								   "Segundo set de itens da arma STI Eagle 6.0.<br>Combine com o item Eagle parts A para formar a mesma.",																																	 						"0px 502px 0px 0px", "-54px",     "9", "3", "18", "0", "9"], 
	"5b": ["M37 parts A", 									   "Primeiro set de itens da arma Western Custom M37.<br>Combine com o item M37 parts B para formar a mesma.", 																															 							"0px 446px 0px 57px", "-166px",   "9", "3", "19", "1", "9"], 
	"5c": ["M37 parts B", 									   "Segundo set de itens da arma Western Custom M37.<br>Combine com o item M37 parts A para formar a mesma.", 																																 						"0px 392px 0px 112px", "-277px",   "9", "4", "0", "2", "9"], 
	"5d": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui só para encher o espaço mesmo, por que elas não tem nenhuma utilidade ingame.", 																	 						"0px 335px 0px 168px", "-390px",   "9", "0", "2", "3", "9"], 
	"5e": ["Chronos chain", 								   "Uma chave que aparentemente não tem nenhuma serventia, até que você combine ela com a Clock tower (winder) key, formando a chave Chronos key.", 																						 						"0px 280px 0px 224px", "-500px",   "9", "4", "1", "4", "9"], 
	"5f": ["Rusted crank", 									   "Uma manivela enferrujada, usada para (tentar) abrir a porta do posto de gasolina Stagla de raccon.", 																																	 						"0px 227px 0px 280px", "-609px",   "9", "4", "2", "5", "9"], 
	"60": ["Card key", 										   "Cartão chave usado na fábrica abandonada, próximo do final.<br><br>Use ela para abrir algumas portas e destrancar um elevador.", 																										 						"0px 168px 0px 335px", "-722px",   "9", "4", "3", "6", "9"], 
	"61": ["Gun powder A", 									   "Polvora Tipo A<br>Ela sozinha tem o poder de gerar balas comuns de pistola.", 																																							 						"0px 114px 0px 392px", "-833px",   "9", "4", "4", "7", "9"], 
	"62": ["Gun powder B", 									   "Polvora Tipo B<br>Ela sozinha tem o poder de gerar balas comuns de shotgun.", 																																							 						"0px 58px 0px 446px", "-943px",    "9", "4", "5", "8", "9"], 
	"63": ["Gun powder C", 									   "Polvora Tipo C<br>Ela sozinha tem o poder de gerar balas comuns de lança-granadas.", 																																					 						"0px 0px 0px 501px", "-1055px",    "9", "4", "6", "9", "9"], 
	"64": ["Gun powder AA", 								   "Polvora Tipo AA.<br>Essa combinação consegue gerar mais balas de pisola do que o comum.", 																																				 						"0px 502px 0px 0px", "-54px",     "10", "4", "7", "0", "10"],
	"65": ["Gun powder BB", 								   "Polvora Tipo BB.<br>Essa combinação consegue gerar mais balas de shotgun do que o comum.", 																																			 							"0px 446px 0px 57px", "-166px",   "10", "4", "8", "1", "10"],
	"66": ["Gun powder AC", 								   "Polvora Tipo AC.<br>Essa combinação consegue gerar até 20 balas (de fogo) de lança-granadas.", 																																		 							"0px 392px 0px 112px", "-277px",  "10", "4", "9", "2", "10"],
	"67": ["Gun powder BC", 								   "Polvora Tipo BC.<br>Essa combinação consegue gerar até 20 balas (de ácido) de lança-granadas.", 																																		 						"0px 335px 0px 168px", "-390px", "10", "4", "10", "3", "10"],
	"68": ["Gun powder CC", 								   "Polvora Tipo BC.<br>Essa combinação consegue gerar até 20 balas (de gelo) de lança-granadas.", 																																		 							"0px 280px 0px 224px", "-500px", "10", "4", "11", "4", "10"],
	"69": ["Gun powder AAA", 								   "Polvora Tipo AAA.<br>Essa combinação consegue gerar muitas balas de pisola.", 																																							 						"0px 227px 0px 280px", "-609px", "10", "4", "12", "5", "10"],
	"6a": ["Gun powder AAB", 								   "Polvora Tipo AAB.<br>Essa combinação consegue gerar até 40 balas de shotgun.", 																																						 							"0px 168px 0px 335px", "-722px", "10", "4", "13", "6", "10"],
	"6b": ["Gun powder BBA", 								   "Polvora Tipo BBA.<br>Essa combinação consegue gerar até 120 balas de pisola.", 																																						 							"0px 114px 0px 392px", "-833px", "10", "4", "14", "7", "10"],
	"6c": ["Gun powder BBB", 								   "Polvora Tipo BBB.<br>Essa combinação consegue gerar muitas balas de shotgun.", 																																						 							"0px 58px 0px 446px", "-943px",  "10", "4", "15", "8", "10"],
	"6d": ["Gun powder CCC", 								   "Polvora Tipo CCC.<br>Essa combinação consegue gerar balas de magnum - apenas.", 																																						 						"0px 0px 0px 501px", "-1055px",  "10", "4", "16", "9", "10"],
	"6e": ["Infinite bullets", 								   "Apelação Extrema!<br><br>O negócio é simples - combine com a arma que você quer que tenha munição infinita e voilá!", 																													 						"0px 502px 0px 0px", "-54px",    "11", "4", "17", "0", "11"],
	"6f": ["Water sample", 									   "Amostra de água usada em um medidor de qualidade, próximo do final.<br><br><center>~~~BEEP-BOOP~~~</center>", 																															 						"0px 446px 0px 57px", "-166px",  "11", "4", "18", "1", "11"],
	"70": ["System disk", 									   "Disco utilizado para abrir uma porta de segurança na fabrica abandonada.<br><br>Se prepare, por que lá vem nemmy!", 																													 						"0px 392px 0px 112px", "-277px", "11", "4", "19", "2", "11"],
	"71": ["Dummy key", 									   "Chave Jumenta!<br><br>Aparentemente, os Devs do RE3 esqueceram uma das chaves do RE2 aqui...", 																															 										"0px 335px 0px 168px", "-390px",  "11", "5", "0", "3", "11"],
	"72": ["Lockpick", 										   "Um item clássico - Também conhecida como micha, serve para abrir portas, armários e gavetas com trancas simples.", 																													 							"0px 280px 0px 224px", "-500px",  "11", "5", "1", "4", "11"],
	"73": ["Warehouse (backdoor) key", 						   "Chave do armazém<br>Usada no começo do game para sair do armazém depois de uma pequena discussão com o Dario.", 																														 						"0px 227px 0px 280px", "-609px",  "11", "5", "2", "5", "11"],
	"74": ["Sickroom key (room 402)",						   "Chave usada no 4º andar do hospital de raccon.<br>Ela serve para abrir a porta do quarto 402, aonde contém uma das soluções necesárias para criar a vacina.", 																			 						"0px 168px 0px 335px", "-722px",  "11", "5", "3", "6", "11"],
	"75": ["Emblem (S.T.A.R.S) key", 						   "Chave usada para abrir a clássica sala S.T.A.R.S na delegacia RPD.",																												 																			"0px 114px 0px 392px", "-833px",  "11", "5", "4", "7", "11"],
	"76": ["(BOTU) Molho de chaves com quatro chaves", 		   "BOTU!<br><br>Molho de chaves com uso desconhecido.<br>Creio que seja para abrir diversas portas no hospital, assim como as chaves do 1º Resident / Biohazard.<br><br>Item descartado durante o processo de desenvolvimento.", 			 						"0px 58px 0px 446px", "-943px",   "11", "5", "5", "8", "11"],
	"77": ["Clock tower (bezel) key", 						   "Chave usada para descer as escadas da torre do relógio em Clock Tower.<br><br>É uma das únicas chaves que você não pode usar diretamente do inventário.", 																				 						"0px 0px 0px 501px", "-1055px",   "11", "5", "6", "9", "11"],
	"78": ["Clock tower (winder) key", 						   "Uma chave que você até consegue abrir uma porta com ela - mas seu real propósito é ser combinada com a Chronos Chain para se tornar a Chronos key.", 				  																	 						"0px 502px 0px 0px", "-54px",     "12", "5", "7", "0", "12"],
	"79": ["Chronos key", 									   "Uma chave feita de duas outras chaves (Winder e Chronos chain).<br><br>Serve para abrir a porta próximo ao saguão principal da clock tower.", 						  																	 						"0px 446px 0px 57px", "-166px",   "12", "5", "8", "1", "12"],
	"7a": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui só para encher o espaço mesmo, por que elas não tem nenhuma utilidade ingame.",																	 						"0px 392px 0px 112px", "-277px",  "12", "0", "2", "2", "12"],
	"7b": ["Park (main gate) key", 							   "Chave dos portões do parque de raccon.<br>Você a encontra dentro de uma sala de save próximo aos fundos da clock tower.", 											  																	 						"0px 335px 0px 168px", "-390px",  "12", "5", "9", "3", "12"],
	"7c": ["Park (graveyard) key", 							   "Chave da sala de ferramentas do cemitério.<br>Você encontra essa chave próximo a um galão explosivo no parque.", 													  																	 						"0px 280px 0px 224px", "-500px", "12", "5", "10", "4", "12"],
	"7d": ["Park (rear gate) key", 							   "Chave de um cadeado.<br>Com essa chave você consegue abrir um cadeado que está impedindo a passagem para a fabrica abandonada.", 													 																			"0px 227px 0px 280px", "-609px", "12", "5", "11", "5", "12"],
	"7e": ["Facility key (no barcode)", 					   "Uma das chaves da fabrica abandonada.<br>Com ela você consegue ter acesso a uma sala com um elevador.", 																															     						"0px 168px 0px 335px", "-722px", "12", "5", "12", "6", "12"],
	"7f": ["Facility key (with barcode)", 					   "Uma das chaves da fabrica abandonada.<br>Com o código de barras, você consegue obter a rocket launcher próximo do final. <br><br>Com ela você consegue ter acesso a uma sala com um elevador.", 										 						"0px 114px 0px 392px", "-833px", "12", "5", "13", "7", "12"],
	"80": ["Boutique key", 									   "Chave da Botique, aonde você pode trocar de roupa durante o gameplay.<br><br>Função disponível apenas na versão de Playstation e Gamecube.", 																						     						"0px 58px 0px 446px", "-943px",  "12", "5", "14", "8", "12"],
	"81": ["Ink ribbon", 									   "De longe, é um dos itens mais clássicos de toda franquia Resident Evil / Biohazard.<br><br>Quando está no inventário, você pode usar ele na manquina de escrever, salvando o seu progresso.", 							 										"0px 0px 0px 501px", "-1055px",  "12", "5", "15", "9", "12"],
	"82": ["Reloading tool", 								   "Com esse item, você consegue criar munição através das polvoras.", 																																	 															"0px 502px 0px 0px", "-54px",    "13", "5", "16", "0", "13"],
	"83": ["Game inst. A", 									   "Manual de como jogar Resident Evil 3 / Biohazard 3.<br>Com esse manual, você aprende sobre objetos explosivos, O giro de 180º, Fuga de emergência, desvio de emergência e outras coisas.", 											 							"0px 446px 0px 57px", "-166px",  "13", "5", "17", "1", "13"],
	"84": ["Game inst. B", 									   "Manual de como jogar Resident Evil 3 / Biohazard 3.<br>Com esse manual, você aprende sobre o sistema de criação de balas (Reloading Tool), Sobre as polvoras e suas combinações.", 													 							"0px 392px 0px 112px", "-277px", "13", "5", "18", "2", "13"],
	"85": ["(BOTU) Pote com solução ciana", 				   "BOT... Não, pera...<br><br>Com o nome interno de \"Game inst. A\", esse item pode ser usado quantas vezes que pelo visto não altera nada no game.<br><br>Sim, mais um item para encher linguiça.", 													 			"0px 335px 0px 168px", "-390px", "13", "5", "19", "3", "13"]
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
	//
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
	"00": ["Nenhum",							 					   "#fff0", "0 0 10px #fff0"], // Use this for puzzle items that don't have the ammo display.
	"01": ["Munição restante na cor verde",							"#008400", "0 0 2px #004200"],
	"02": ["% da munição em verde", 								"#008400", "0 0 2px #004200"],
	"03": ["Munição infinita na cor verde", 						"#008400", "0 0 2px #004200"],
	"05": ["Munição restante na cor vermelho",  					"#840000", "0 0 2px #310000"],
	"06": ["% da munição em vermelho", 								"#840000", "0 0 2px #310000"],
	"07": ["Munição infinita na cor vermelha",  					"#840000", "0 0 2px #310000"],
	"0d": ["Munição restante na cor azul", 							"#9393ff", "0 0 2px #004242"],
	"0e": ["% da munição em azul", 									"#9393ff", "0 0 2px #004242"],
	"0f": ["Munição infinita na cor azul", 							"#9393ff", "0 0 2px #004242"],
	"16": ["Atributo Usado Pela M4A1 Assault Rifle Da Jill/Carlos", "#840000", "0 0 2px #310000"],
	
	// Atributos Desconhecidos
	"17": ["Atributo Adicionado para obter compatibilidade com o Nightmare Mod", 	    "#fff", "0 0 2px #0f0"],  // Atributo encontrado na shotgun do Carlos
	"0b": ["Atributo encontrado em algumas versões do game", 						    "#fff", "0 0 2px #0f0"]
}

var VOID = {
	"00": "OK!",											// Condição normal
	"80": "Condição anormal da versão francesa/Taiwan"		// Condição anormal encontrado na versão francesa. Pode ser um hack que outra pessoa tenha feito antes
}

var CIDADE = {
	"00": ["Uptown (Incluindo a delegacia da RPD)"],
    "01": ["Downtown"],
    "02": ["Clock Tower / Park antes da explosão do Hospital"],
    "03": ["Clock Tower / Park depois da explosão do Hospital"],
    "04": ["Fábrica Abandonada"],
    "05": ["Shows first the Mercenaries-minigame ending, then the ending video of the main game (the one without Barry Burton, assuming 0x2250 has been set to 00. If not, then it only crashes)."],
    "06": ["Downtown again. I have no idea what's different here. This may be after the scene where Jill falls trough the parking lot floor."]
}

var PLAYERS = {
	"00": ["Jill com roupa normal"],
	"01": ["Jill com roupa normal + sidepack"],
	"02": ["Jill com roupa de motoqueira"],
	"03": ["Jill com uniforme da S.T.A.R.S"],
	"04": ["Jill com roupa \"Disco Inferno\""],
	"05": ["Jill com roupa de policial com shortinho"],
	"06": ["Jill com a roupa da regina (Dino Crisis)"],
	"07": ["Jill com a roupa normal"],
	"08": ["Carlos"],
	"09": ["Mikhail"],
	"0a": ["Nicholai"],
	"0b": ["Brad Vickers"],
	"0c": ["Dario"],
	"0f": ["Tofu"]
}

var ROUPA = {
	"00": ["Roupas Normais"],
	"01": ["Roupa de motoqueira"],
	"02": ["Uniforme S.T.A.R.S"],
	"03": ["Disco inferno"],
	"04": ["Policial com minisaia"],
	"05": ["Jill cosplay de Regina (Dino Crisis)"],
	"06": ["Mini-saia azul com top preto e botas"],
	"07": ["Roupa social"]
}

var SIDEPACK = {
	"00": ["Indefinido"],
	"0a": ["Sidepack Obtido"],
	"08": ["Sidepack Não Obtido"] 
}

var VERSAO = {
	"000000000000": ["Indefinido", 						  "HEX zerada (00)"],
	"4241534c5553": ["Versão Russa / Nightmare (Ou Darkness) Mod", "BASLUS"],
	"4245534c4553": ["Mediakite / Xplosiv", 					   "BESLES"],
	"4249534c5053": ["Versão Chinesa / Japonesa / Taiwan", 		   "BISLPS"]
}

var POISON = {
	"8f": ["Sim"], // Está envenenado 
	"00": ["Não"]  // Não está envenenado
}

var LOCAIS = {
	"00": ["Armazém"],
	"01": ["Beco"],
	"02": ["Hall da RPD"],
	"03": ["Sala Escura"],
	"0c": ["Estacionamento"],
	"04": ["Zona Comercial"],
	"06": ["Sala de Estar"],
	"05": ["Capela"],
	"0d": ["Sala de Maquinas"],
	"08": ["Recepção Hospital"],
	"07": ["Sala de Chaves"],
	"09": ["Sala do Coveiro"],
	"0a": ["Sala de Descanso"],
	"0b": ["Sala de Monitores"]
}

var EPILOGOS = {
	"00": ["Nenhum"],
	"01": ["1"],
	"02": ["2"],
	"03": ["3"],
	"04": ["4"],
	"05": ["5"],
	"06": ["6"],
	"07": ["7"],
	"0c": ["Todos"], // Encontrado esse valor na versão francesa
	"08": ["Todos"],
	"09": ["Todos"]
}

var DIFICULDADE = {
	"01": ["Fácil"],
	"00": ["Dificil"]
}

// 	WIP
var MAPAS = {
	"0000": "Indefinido"
}

var MSG_DICIONARIO = {
	"00": [false, " "],
	"01": [false, "."],
	"02": [false, ">"],
	"03": [false, "(CHAR ESPECIAL 1)"],
	"04": [false, "(CHAR ESPECIAL 2)"],
	"05": [false, "("],
	"06": [false, ")"],
	"07": [false, "(CHAR ESPECIAL 3)"],
	"08": [false, "(CHAR ESPECIAL 4)"],
	"09": [false, "\""],
	"0a": [false, "\""],
	"0b": [false, "(Seta para baixo)"],
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
	"3c": [false, "(CHAR ESPECIAL 5)"],
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
	"57": [false, "(Char ou Função Não-Mapeada Nº 00 - Hex: 57)"],
	"58": [false, "(Char ou Função Não-Mapeada Nº 01 - Hex: 58)"],
	"59": [false, "(Char ou Função Não-Mapeada Nº 02 - Hex: 59)"],
	"5a": [false, "(Char ou Função Não-Mapeada Nº 03 - Hex: 5a)"],
	"5b": [false, "(Char ou Função Não-Mapeada Nº 04 - Hex: 5b)"],
	"5c": [false, "(Char ou Função Não-Mapeada Nº 05 - Hex: 5c)"],
	"5d": [false, "(Char ou Função Não-Mapeada Nº 06 - Hex: 5d)"],
	"5e": [false, "(Char ou Função Não-Mapeada Nº 07 - Hex: 5e)"],
	"5f": [false, "(Char ou Função Não-Mapeada Nº 08 - Hex: 5f)"],
	"60": [false, "(Char ou Função Não-Mapeada Nº 09 - Hex: 60)"],
	"61": [false, "(Char ou Função Não-Mapeada Nº 10 - Hex: 61)"],
	"62": [false, "(Char ou Função Não-Mapeada Nº 11 - Hex: 62)"],
	"63": [false, "(Char ou Função Não-Mapeada Nº 12 - Hex: 63)"],
	"64": [false, "(Char ou Função Não-Mapeada Nº 13 - Hex: 64)"],
	"65": [false, "(Char ou Função Não-Mapeada Nº 14 - Hex: 65)"],
	"66": [false, "(Char ou Função Não-Mapeada Nº 15 - Hex: 66)"],
	"67": [false, "(Char ou Função Não-Mapeada Nº 16 - Hex: 67)"],
	"68": [false, "(Char ou Função Não-Mapeada Nº 17 - Hex: 68)"],
	"69": [false, "(Char ou Função Não-Mapeada Nº 18 - Hex: 69)"],
	"6a": [false, "(Char ou Função Não-Mapeada Nº 19 - Hex: 6a)"],
	"6b": [false, "(Char ou Função Não-Mapeada Nº 20 - Hex: 6b)"],
	"6c": [false, "(Char ou Função Não-Mapeada Nº 21 - Hex: 6c)"],
	"6d": [false, "(Char ou Função Não-Mapeada Nº 22 - Hex: 6d)"],
	"6e": [false, "(Char ou Função Não-Mapeada Nº 23 - Hex: 6e)"],
	"6f": [false, "(Char ou Função Não-Mapeada Nº 24 - Hex: 6f)"],
	"70": [false, "(Char ou Função Não-Mapeada Nº 25 - Hex: 70)"],
	"71": [false, "(Char ou Função Não-Mapeada Nº 26 - Hex: 71)"],
	"72": [false, "(Char ou Função Não-Mapeada Nº 27 - Hex: 72)"],
	"73": [false, "(Char ou Função Não-Mapeada Nº 28 - Hex: 73)"],
	"74": [false, "(Char ou Função Não-Mapeada Nº 29 - Hex: 74)"],
	"75": [false, "(Char ou Função Não-Mapeada Nº 30 - Hex: 75)"],
	"76": [false, "(Char ou Função Não-Mapeada Nº 31 - Hex: 76)"],
	"77": [false, "(Char ou Função Não-Mapeada Nº 32 - Hex: 77)"],
	"78": [false, "(Char ou Função Não-Mapeada Nº 33 - Hex: 78)"],
	"79": [false, "(Char ou Função Não-Mapeada Nº 34 - Hex: 79)"],
	"7a": [false, "(Char ou Função Não-Mapeada Nº 35 - Hex: 7a)"],
	"7b": [false, "(Char ou Função Não-Mapeada Nº 36 - Hex: 7b)"],
	"7c": [false, "(Char ou Função Não-Mapeada Nº 37 - Hex: 7c)"],
	"7d": [false, "(Char ou Função Não-Mapeada Nº 38 - Hex: 7d)"],
	"7e": [false, "(Char ou Função Não-Mapeada Nº 39 - Hex: 7e)"],
	"7f": [false, "(Char ou Função Não-Mapeada Nº 40 - Hex: 7f)"],
	"80": [false, "(Char ou Função Não-Mapeada Nº 41 - Hex: 80)"],
	"81": [false, "(Char ou Função Não-Mapeada Nº 42 - Hex: 81)"],
	"82": [false, "(Char ou Função Não-Mapeada Nº 43 - Hex: 82)"],
	"83": [false, "(Char ou Função Não-Mapeada Nº 44 - Hex: 83)"],
	"84": [false, "(Char ou Função Não-Mapeada Nº 45 - Hex: 84)"],
	"85": [false, "(Char ou Função Não-Mapeada Nº 46 - Hex: 85)"],
	"86": [false, "(Char ou Função Não-Mapeada Nº 47 - Hex: 86)"],
	"87": [false, "(Char ou Função Não-Mapeada Nº 48 - Hex: 87)"],
	"88": [false, "(Char ou Função Não-Mapeada Nº 49 - Hex: 88)"],
	"89": [false, "(Char ou Função Não-Mapeada Nº 50 - Hex: 89)"],
	"8a": [false, "(Char ou Função Não-Mapeada Nº 51 - Hex: 8a)"],
	"8b": [false, "(Char ou Função Não-Mapeada Nº 52 - Hex: 8b)"],
	"8c": [false, "(Char ou Função Não-Mapeada Nº 53 - Hex: 8c)"],
	"8d": [false, "(Char ou Função Não-Mapeada Nº 54 - Hex: 8d)"],
	"8e": [false, "(Char ou Função Não-Mapeada Nº 55 - Hex: 8e)"],
	"8f": [false, "(Char ou Função Não-Mapeada Nº 56 - Hex: 8f)"],
	"90": [false, "(Char ou Função Não-Mapeada Nº 57 - Hex: 90)"],
	"91": [false, "(Char ou Função Não-Mapeada Nº 58 - Hex: 91)"],
	"92": [false, "(Char ou Função Não-Mapeada Nº 59 - Hex: 92)"],
	"93": [false, "(Char ou Função Não-Mapeada Nº 60 - Hex: 93)"],
	"94": [false, "(Char ou Função Não-Mapeada Nº 61 - Hex: 94)"],
	"95": [false, "(Char ou Função Não-Mapeada Nº 62 - Hex: 95)"],
	"96": [false, "(Char ou Função Não-Mapeada Nº 63 - Hex: 96)"],
	"97": [false, "(Char ou Função Não-Mapeada Nº 64 - Hex: 97)"],
	"98": [false, "(Char ou Função Não-Mapeada Nº 65 - Hex: 98)"],
	"99": [false, "(Char ou Função Não-Mapeada Nº 66 - Hex: 99)"],
	"9a": [false, "(Char ou Função Não-Mapeada Nº 67 - Hex: 9a)"],
	"9b": [false, "(Char ou Função Não-Mapeada Nº 68 - Hex: 9b)"],
	"9c": [false, "(Char ou Função Não-Mapeada Nº 69 - Hex: 9c)"],
	"9d": [false, "(Char ou Função Não-Mapeada Nº 70 - Hex: 9d)"],
	"9e": [false, "(Char ou Função Não-Mapeada Nº 71 - Hex: 9e)"],
	"9f": [false, "(Char ou Função Não-Mapeada Nº 72 - Hex: 9f)"],
	"a0": [false, "(Char ou Função Não-Mapeada Nº 73 - Hex: a0)"],
	"a1": [false, "(Char ou Função Não-Mapeada Nº 74 - Hex: a1)"],
	"a2": [false, "(Char ou Função Não-Mapeada Nº 75 - Hex: a2)"],
	"a3": [false, "(Char ou Função Não-Mapeada Nº 76 - Hex: a3)"],
	"a4": [false, "(Char ou Função Não-Mapeada Nº 77 - Hex: a4)"],
	"a5": [false, "(Char ou Função Não-Mapeada Nº 78 - Hex: a5)"],
	"a6": [false, "(Char ou Função Não-Mapeada Nº 79 - Hex: a6)"],
	"a7": [false, "(Char ou Função Não-Mapeada Nº 80 - Hex: a7)"],
	"a8": [false, "(Char ou Função Não-Mapeada Nº 81 - Hex: a8)"],
	"a9": [false, "(Char ou Função Não-Mapeada Nº 82 - Hex: a9)"],
	"aa": [false, "(Char ou Função Não-Mapeada Nº 83 - Hex: aa)"],
	"ab": [false, "(Char ou Função Não-Mapeada Nº 84 - Hex: ab)"],
	"ac": [false, "(Char ou Função Não-Mapeada Nº 85 - Hex: ac)"],
	"ad": [false, "(Char ou Função Não-Mapeada Nº 86 - Hex: ad)"],
	"ae": [false, "(Char ou Função Não-Mapeada Nº 87 - Hex: ae)"],
	"af": [false, "(Char ou Função Não-Mapeada Nº 88 - Hex: af)"],
	"b0": [false, "(Char ou Função Não-Mapeada Nº 89 - Hex: b0)"],
	"b1": [false, "(Char ou Função Não-Mapeada Nº 90 - Hex: b1)"],
	"b2": [false, "(Char ou Função Não-Mapeada Nº 91 - Hex: b2)"],
	"b3": [false, "(Char ou Função Não-Mapeada Nº 92 - Hex: b3)"],
	"b4": [false, "(Char ou Função Não-Mapeada Nº 93 - Hex: b4)"],
	"b5": [false, "(Char ou Função Não-Mapeada Nº 94 - Hex: b5)"],
	"b6": [false, "(Char ou Função Não-Mapeada Nº 95 - Hex: b6)"],
	"b7": [false, "(Char ou Função Não-Mapeada Nº 96 - Hex: b7)"],
	"b8": [false, "(Char ou Função Não-Mapeada Nº 97 - Hex: b8)"],
	"b9": [false, "(Char ou Função Não-Mapeada Nº 98 - Hex: b9)"],
	"ba": [false, "(Char ou Função Não-Mapeada Nº 99 - Hex: ba)"],
	"bb": [false, "(Char ou Função Não-Mapeada Nº 100 - Hex: bb)"],
	"bc": [false, "(Char ou Função Não-Mapeada Nº 101 - Hex: bc)"],
	"bd": [false, "(Char ou Função Não-Mapeada Nº 102 - Hex: bd)"],
	"be": [false, "(Char ou Função Não-Mapeada Nº 103 - Hex: be)"],
	"bf": [false, "(Char ou Função Não-Mapeada Nº 104 - Hex: bf)"],
	"c0": [false, "(Char ou Função Não-Mapeada Nº 105 - Hex: c0)"],
	"c1": [false, "(Char ou Função Não-Mapeada Nº 106 - Hex: c1)"],
	"c2": [false, "(Char ou Função Não-Mapeada Nº 107 - Hex: c2)"],
	"c3": [false, "(Char ou Função Não-Mapeada Nº 108 - Hex: c3)"],
	"c4": [false, "(Char ou Função Não-Mapeada Nº 109 - Hex: c4)"],
	"c5": [false, "(Char ou Função Não-Mapeada Nº 110 - Hex: c5)"],
	"c6": [false, "(Char ou Função Não-Mapeada Nº 111 - Hex: c6)"],
	"c7": [false, "(Char ou Função Não-Mapeada Nº 112 - Hex: c7)"],
	"c8": [false, "(Char ou Função Não-Mapeada Nº 113 - Hex: c8)"],
	"c9": [false, "(Char ou Função Não-Mapeada Nº 114 - Hex: c9)"],
	"ca": [false, "(Char ou Função Não-Mapeada Nº 115 - Hex: ca)"],
	"cb": [false, "(Char ou Função Não-Mapeada Nº 116 - Hex: cb)"],
	"cc": [false, "(Char ou Função Não-Mapeada Nº 117 - Hex: cc)"],
	"cd": [false, "(Char ou Função Não-Mapeada Nº 118 - Hex: cd)"],
	"ce": [false, "(Char ou Função Não-Mapeada Nº 119 - Hex: ce)"],
	"cf": [false, "(Char ou Função Não-Mapeada Nº 120 - Hex: cf)"],
	"d0": [false, "(Char ou Função Não-Mapeada Nº 121 - Hex: d0)"],
	"d1": [false, "(Char ou Função Não-Mapeada Nº 122 - Hex: d1)"],
	"d2": [false, "(Char ou Função Não-Mapeada Nº 123 - Hex: d2)"],
	"d3": [false, "(Char ou Função Não-Mapeada Nº 124 - Hex: d3)"],
	"d4": [false, "(Char ou Função Não-Mapeada Nº 125 - Hex: d4)"],
	"d5": [false, "(Char ou Função Não-Mapeada Nº 126 - Hex: d5)"],
	"d6": [false, "(Char ou Função Não-Mapeada Nº 127 - Hex: d6)"],
	"d7": [false, "(Char ou Função Não-Mapeada Nº 128 - Hex: d7)"],
	"d8": [false, "(Char ou Função Não-Mapeada Nº 129 - Hex: d8)"],
	"d9": [false, "(Char ou Função Não-Mapeada Nº 130 - Hex: d9)"],
	"da": [false, "(Char ou Função Não-Mapeada Nº 131 - Hex: da)"],
	"db": [false, "(Char ou Função Não-Mapeada Nº 132 - Hex: db)"],
	"dc": [false, "(Char ou Função Não-Mapeada Nº 133 - Hex: dc)"],
	"dd": [false, "(Char ou Função Não-Mapeada Nº 134 - Hex: dd)"],
	"de": [false, "(Char ou Função Não-Mapeada Nº 135 - Hex: de)"],
	"df": [false, "(Char ou Função Não-Mapeada Nº 136 - Hex: df)"],
	"e0": [false, "(Char ou Função Não-Mapeada Nº 137 - Hex: e0)"],
	"e1": [false, "(Char ou Função Não-Mapeada Nº 138 - Hex: e1)"],
	"e2": [false, "(Char ou Função Não-Mapeada Nº 139 - Hex: e2)"],
	"e3": [false, "(Char ou Função Não-Mapeada Nº 141 - Hex: e3)"],
	"e4": [false, "(Char ou Função Não-Mapeada Nº 142 - Hex: e4)"],
	"e5": [false, "(Char ou Função Não-Mapeada Nº 143 - Hex: e5)"],
	"e6": [false, "(Char ou Função Não-Mapeada Nº 144 - Hex: e6)"],
	"e7": [false, "(Char ou Função Não-Mapeada Nº 145 - Hex: e7)"],
	"e8": [false, "(Char ou Função Não-Mapeada Nº 146 - Hex: e8)"],
	"e9": [false, "(Char ou Função Não-Mapeada Nº 147 - Hex: e9)"],
	"eb": [false, "(Char ou Função Não-Mapeada Nº 148 - Hex: eb)"],
	"ec": [false, "(Char ou Função Não-Mapeada Nº 149 - Hex: ec)"],
	"ed": [false, "(Char ou Função Não-Mapeada Nº 150 - Hex: ed)"],
	"ee": [false, "(Char ou Função Não-Mapeada Nº 151 - Hex: ee)"],
	"ef": [false, "(Char ou Função Não-Mapeada Nº 152 - Hex: ef)"],
	"f1": [false, "(Char ou Função Não-Mapeada Nº 154 - Hex: f1)"],
	"f2": [false, "(Char ou Função Não-Mapeada Nº 155 - Hex: f2)"],
	"f6": [false, "(Char ou Função Não-Mapeada Nº 159 - Hex: f6)"],
	"f7": [false, "(Char ou Função Não-Mapeada Nº 160 - Hex: f7)"],
	"f9": [false, "(Cor Verde)"],			// Formatação - Cor Verde
	"fb": [false, "(Yes / No)"],
	"fc": [false, "(Quebra de Linha)<br>"], // Enter
	"fd": [false, "(Pausa)"],
	"ff": [false, "(CHAR DESCONHECIDO)"],
	
	// Comandos especiais

	"fa": [true, "(COMANDO: Exibir Mensagem)", 	    	 1],
	"fe": [true, "(COMANDO: Final da mensagem)",		 2],
	"ea": [true, "(COMANDO: Exibir Caracter Especial)",  4], // (Depende do valor inserido)
	"f0": [true, "(COMANDO: Exibir Caracter Especial)",  4], // (Depende do valor inserido)
	"f8": [true, "(COMANDO: Exibe nome de item)", 		 5],
	"f3": [true, "(COMANDO: Executa SFX)", 			     6], // (Depende do valor inserido) 
	/* 
		Info: Se o valor na frente de F3 for 43, O game irá executar o som da arma equipada.
		Mas, quando esse comando for executado, alguns sons de menu / porta irão deixar de ser reproduzidos.
	*/
	"f4": [true, "(COMANDO: Trocar Camera)", 			 7],
	"f5": [false, "(Char ou Função Não-Mapeada Nº 158 - Hex: f5)"] // Comando usado na cutscene "Septemer, 28".
}

var MSG_CHARESPECIAL = {
	"ea24": "S.",
	"ea25": "T.",
	"ea26": "A.",
	"ea27": "R.",
	"ea28": ";"
}

var MSG_DICIONARIO_REVERSO = {
	// Caracteres especiais
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
																								 |
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

	"RDT_item-header": 			[0, 2],
	"RDT_item-itemIdetifier": 	[2, 4],
	"RDT_item-espaco1": 		[4, 12],

	// Se a Header do Item for 67

	"RDT_item-0-itemXX": 		[12, 16],
	"RDT_item-0-itemYY": 		[16, 20],
	"RDT_item-0-itemZZ": 		[20, 24],
	"RDT_item-0-itemRR": 		[24, 28],
	"RDT_item-0-itemID": 		[28, 30],
	"RDT_item-0-espaco2": 		[30, 32],
	"RDT_item-0-itemQuant":		[32, 34],
	"RDT_item-0-espaco3": 		[34, 40],
	"RDT_item-0-itemMP": 		[40, 44],
	"RDT_item-0-final": 		[44, 80],

	// Se a Header do item for 68

	"RDT_item-1-itemXX": 		[12, 16],
	"RDT_item-1-itemYY": 		[16, 20],
	"RDT_item-1-itemZZ": 		[20, 24],
	"RDT_item-1-itemRR": 		[24, 28],
	
	"RDT_item-1-itemID": 		[44, 46], // OK
	"RDT_item-1-espaco2": 		[46, 48], // OK
	"RDT_item-1-itemQuant":		[48, 50], // OK

	"RDT_item-1-espaco3": 		[34, 40],
	"RDT_item-1-itemMP": 		[40, 44],
	"RDT_item-1-final": 		[44, 80]
}