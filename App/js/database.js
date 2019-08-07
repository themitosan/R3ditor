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
		
		Item = Nome, Info Adicional, Ba� Clip, Ba� Margin-left, index imagem ba�, index imagem info, index quantidade de loop

*/

var ITEM = {
	"00": ["Slot Vazio", 									   "", 																																																									   						    "0px 502px 0px 0px",     "-54px", "0", "0", "0", "0", "0"],
	"01": ["Combat Knife", 									   "Faca de combate simples.<br><br>Ela pode ser bem �til quando voc� est� com pouca / sem muni��o. Na m�o de quem sabe usar, faz estrago!", 																								   						"0px 446px 0px 57px",   "-166px", "0", "0", "1", "1", "0"],
	"02": ["Sigpro SP 2009 handgun", 						   "Pistola alternativa do carlos.<br>N�o � l� grande coisa por�m pode te ajudar caso esteja na pior...", 																																	   						"0px 392px 0px 112px",  "-277px", "0", "0", "2", "2", "0"],
	"03": ["Beretta M92F handgun, custom S.T.A.R.S edition",   "Sua boa e velha pistola.<br>Se trata de uma M92F vers�o especial da S.T.A.R.S feita pelo Kendo (R.I.P).<br><br>Diz a lenda de que aqueles que n�o tem vida jogam usando ela sem recarregar nenhuma vez.", 														"0px 335px 0px 168px",  "-390px", "0", "0", "3", "3", "0"],
	"04": ["Shotgun Benelli M3S", 							   "Mais conhecida como Doze / TUCHEIRA.<br>Para usar � simples: <br><br>1) Certifique-se de que ela est� carregada;<br><br>2) Mire na cabe�a de qualquer merda que estiver na sua frente;<br><br>3) ATIRE!", 								   						"0px 280px 0px 224px",  "-500px", "0", "0", "4", "4", "0"],
	"05": ["Smith & Wesson M629C .44-caliber magnum revolver", "� uma magnum rapaz - atire no p� que a cabe�a explode!<br>Mesmo sendo absurdamente poderosa, n�o chega aos p�s da magnum dos games anteriores (Em quest�o de design, � claro.)", 														   						"0px 227px 0px 280px",  "-609px", "0", "0", "5", "5", "0"],
	"06": ["Hk-p Grenade launcher com balas comuns", 		   "Lan�a granadas com balas comuns - � extremamente eficiente contra a maioria dos inimigos do game.", 																																	   						"0px 168px 0px 335px",  "-722px", "0", "0", "6", "8", "0"],
	"07": ["Hk-p Grenade launcher com balas de fogo", 		   "Lan�a granadas com balas de fogo - � extremamente eficiente contra a maioria dos inimigos do game.", 																																	   						"0px 114px 0px 392px",  "-833px", "0", "0", "6", "8", "0"],
	"08": ["Hk-p Grenade launcher com balas de �cido", 		   "Lan�a granadas com balas de �cido - � extremamente eficiente contra minhocas sedent�rias que vivem no parque.", 																														   						"0px 58px 0px 446px",   "-943px", "0", "0", "6", "8", "0"],
	"09": ["Hk-p Grenade launcher com balas de gelo", 		   "Lan�a granadas com balas de gelo - � extremamente eficiente contra qualquer inimigo que te siga o jogo inteiro gritando \"STAAARS\" feito um condenado!", 																				   						"0px 0px 0px 501px",   "-1055px", "0", "0", "6", "8", "0"],
	"0a": ["M66 Rocket launcher", 							   "� s�rio que precisa de ter algo escrito aqui?<br>� UMA ROCKET LAUNCHER MANOLO!", 																																						   						"0px 502px 0px 0px",     "-54px", "1", "0", "7", "0", "1"],
	"0b": ["Gatling gun", 									   "Uma das armas mais apelonas dispon�veis. A �nica coisa que peida nela � o tempo que ela leva para disparar seus proj�teis.", 																											   						"0px 446px 0px 57px",   "-166px", "1", "0", "8", "1", "1"],
	"0c": ["Mine thrower", 									   "Lan�ador de minas - Demora um pouco para surtir efeito mas quando seu proj�til explode arrega�a com tudo!<br><br>Boa para usar no nemesis final!", 																					   						    "0px 392px 0px 112px",  "-277px", "1", "0", "9", "2", "1"],
	"0d": ["STI Eagle 6.0", 								   "PistolaSafada++;<br><br>Ela atira mais r�pido do que a pistola comum e tamb�m tem a chance de acertar o inimigo com dano cr�tico, estourando a sua cabe�a (zombie).<br><br>Agora me fala qual que � a utilidade de ter uma mira desse jeito em uma pistola?", 	"0px 335px 0px 168px", "-390px", "1", "0", "10", "3", "1"],
	"0e": ["M4A1 Assault rifle em modo Autom�tico", 		   "Rifle de assalto M4A1 em modo Autom�tico<br>N�o � recomendado para assaltar bancos, s� farm�cias mesmo! <br><br>(O dev desse programa n�o endossa nenhum tipo de viol�ncia, assaltos ou at� mesmo a morte - � uma piada, ok?)", 		   						"0px 280px 0px 224px", "-500px", "1", "0", "11", "4", "1"],
	"0f": ["M4A1 Assault rifle em modo Manual", 			   "Rifle de assalto M4A1 em modo Manual<br>N�o � recomendado para assaltar bancos, s� farm�cias mesmo! <br><br>(O dev desse programa n�o endossa nenhum tipo de viol�ncia, assaltos ou at� mesmo a morte - � uma piada, ok?)", 			   						"0px 227px 0px 280px", "-609px", "1", "0", "11", "5", "1"],
	"10": ["Western Custom M37 lever action shotgun", 		   "Doze++<br>Ela tem uma hitbox maior e consegue disparar mais r�pido do que a Benelli mas em compensa��o n�o consegue disparar proj�teis mais fortes.<br><br>Boa para quando estiver com diversos inimigos a frente!", 					   						"0px 168px 0px 335px", "-722px", "1", "0", "12", "6", "1"],
	"11": ["Sigpro SP 2009 com balas melhoradas", 		       "PistolaSafadaDoCarlos++<br>Em ultimo caso - quando n�o houver mais nada a ser feito, use essa arma!", 																																	   						"0px 114px 0px 392px",  "-833px", "1", "0", "2", "7", "1"],
	"12": ["Beretta M92F customizada com balas melhoradas",    "� a mesma pistola que a Jill usa, s� que est� possu�da pelo Satan�s.<br><br>O som do disparo machuca mais do que a pr�pria bala!", 																									   							"0px 58px 0px 446px",   "-943px", "1", "0", "3", "8", "1"],
	"13": ["Shotgun Benelli M3S com balas melhoradas",         "Imagine uma doze que tira dano at� do capeta - pois �!", 																																												   						"0px 0px 0px 501px",   "-1055px", "1", "0", "4", "9", "1"],
	"14": ["Mine thrower com balas melhoradas", 			   "Meu amigo, vem c�...<br><br>J� n�o basta ter uma arma que arranca tudo isso de vida dos infelizes que j� morreram - para que DIABOS voc� quer torturar eles mais ainda?", 																   						"0px 502px 0px 0px",     "-54px", "2", "0", "9", "0", "2"],
	"15": ["Handgun bullets (9x19 parabellum)", 			   "Muni��o de pisolas safadas/comuns. Voc� consegue carregar 255 delas por slot de invent�rio (Por que o jogo trabalha com n�meros de no m�ximo 8 bits!)", 																				   						"0px 446px 0px 57px",  "-166px", "2", "0", "13", "1", "2"],
	"16": ["Magnum bullets (.44-caliber)", 					   "Muni��o da arma do c�o!<br><br>Ela � t�o poderosa / mortal que s� de voc� encostar voc� j� quase morre!", 																																   						"0px 392px 0px 112px", "-277px", "2", "0", "14", "2", "2"],
	"17": ["Shotgun shells", 								   "Balas 6*2.<br><br>Tamb�m conhecida em outras terras como TUCHOS / Balas de TUCHEIRA.", 																																				   							"0px 335px 0px 168px", "-390px", "2", "0", "15", "3", "2"],
	"18": ["Grenade rounds", 								   "Muni��o de arrombamento simples - n�o queira ganhar uma dessas no peito!", 																																							   							"0px 280px 0px 224px", "-500px", "2", "0", "16", "4", "2"],
	"19": ["Flame rounds", 									   "Muni��o de arrombamento moderado - ideal para acender churrasqueiras com controle remoto! (Principalmente se for em um domingo a tarde...)", 																							   						"0px 227px 0px 280px", "-609px", "2", "0", "17", "5", "2"],
	"1a": ["Acid rounds", 									   "Muni��o de arrombamento moderado++<br><br>Ideal para exterminar qualquer tipo de vermes em <br>parques / cemit�rios!", 																												   							"0px 168px 0px 335px", "-722px", "2", "0", "18", "6", "2"],
	"1b": ["Freeze rounds", 								   "Muni��o de arrombamento avancado++<br><br>Ideal para enfrentar seres com mais de dois metros que fazem propaganda para a marca COLGATE!", 																								   						"0px 114px 0px 392px", "-833px", "2", "0", "19", "7", "2"],
	"1c": ["Minethrower rounds", 							   "Muni��o de lan�adora de minas<br><br>Perfeita para usar em locais com incineradores posicionados de forma conveni�nte", 																												   						"0px 58px 0px 446px",   "-943px", "2", "1", "0", "8", "2"],
	"1d": ["Assault rifle clip (5.56 NATO rounds)", 		   "Muni��o do Rifle de assalto M4A1.<br><br>Vem c� cidad�o, voc� alguma vez j� resolveu quantificar suas balas por porcentagem?", 																										   							"0px 0px 0px 501px",   "-1055px", "2", "1", "1", "9", "2"],
	"1e": ["Enhanced handgun bullets", 						   "Balas melhoradas de pisolas safadas / comuns.<br>N�o olhe diretamente nos olhos dela, elas podem te morder.", 																															   						"0px 502px 0px 0px",     "-54px", "3", "1", "2", "0", "3"],
	"1f": ["Enhanced shotgun shells", 						   "Balas melhoradas da doze!<br><br>Diz a lenda que ela arromba qualquer merda que estiver a sua frente - ent�o tome cuidado!", 																											   						"0px 446px 0px 57px",   "-166px", "3", "1", "3", "1", "3"],
	"20": ["First aid spray", 								   "Tamb�m conhecido como Gelol de Raccon!<br><br>Uma espirrada dessa maravilha da ci�ncia e voc� est� curado de quase tudo!", 																											   							"0px 392px 0px 112px",  "-277px", "3", "1", "4", "2", "3"],
	"21": ["Erva Verde", 									   "Cannabis Verde!<br><br>Cura danos de forma geral - nada demais.<br>Pode at� te dar uma brisa de leve - mas n�o � nada que possa te deixar dopado.", 																					   						"0px 335px 0px 168px",  "-390px", "3", "1", "5", "3", "3"],
	"22": ["Erva Azul", 									   "Cannabis Azul!<br><br>Boa para curar veneno de aranhas, cobras, satanazes e afins.<br><br>Se estiver jogando o NIGHTMARE MOD, combine duas para obter uma Cannabis Verde", 															   							"0px 280px 0px 224px",  "-500px", "3", "1", "6", "4", "3"],
	"23": ["Erva Vermelha",									   "Maconha Vermelha!<br><br>Ela sozinha n�o faz absolutamente nada - por�m quando combinada com a verde, tem quase o potencial de impedir a terceira guerra mundial!", 																	   						"0px 227px 0px 280px",  "-609px", "3", "1", "7", "5", "3"],
	"24": ["2x Ervas Verdes", 						    	   "Cannabis++!<br><br>Cura um pouco mais do que o normal, mas te deixa meio chapado.", 																																					   						"0px 168px 0px 335px",  "-722px", "3", "1", "8", "6", "3"],
	"25": ["Mix de Ervas Verdes + Azuis", 					   "Cannabis Intensifies!<br><br>Te deixa meio curado e cura o veneno do seu corpo.<br>Poder de deixar doid�o = 50%", 																													       						"0px 114px 0px 392px",  "-833px", "3", "1", "9", "7", "3"],
	"26": ["Mix de Ervas Verdes + Vermelhas", 				   "Cannabis Perfeita!<br><br>S� de sentir o cheiro da marofa dessas ervas j� te deixa completamente curado / chapado", 																													   						"0px 58px 0px 446px",  "-943px", "3", "1", "10", "8", "3"],
	"27": ["Mix de tr�s Ervas Verdes", 						   "Bob Marley Approves!<br><br>Mano, usa essa aqui que � da boa - Cura sua vida toda!<br>Eu vi gnomos...", 																																   						"0px 0px 0px 501px",  "-1055px", "3", "1", "11", "9", "3"],
	"28": ["Mix de 2x Ervas Verdes + Erva Azul", 			   "Or�gano Diferenciado!<br><br>Cura um pouco mais do que o normal e retira o veneno do corpo.<br><br>Poder de deixar doid�o = 75%", 																										   						"0px 502px 0px 0px",    "-54px", "4", "1", "12", "0", "4"],
	"29": ["Mix de todas as ervas",     					   "Santo Graal das Ervas!<br><br>Cura AIDS, Ebola, Gripe su�na, Remove o tinhoso do corpo, Emprega Vagabundo, Desengravida e faz Jesus voltar.<br>ALEL�IA IRM�O!!!", 																		   						"0px 446px 0px 57px",  "-166px", "4", "1", "13", "1", "4"],
	"2a": ["Kit de First aid spray", 						   "Kit promocional de Gelol<br><br>Com esse kit voc� consegue carregar tr�s unidades de Gelol ao mesmo tempo - ideal para queimaduras, frieira e confronto contra nemesis!", 																   						"0px 392px 0px 112px", "-277px", "4", "1", "14", "2", "4"],
	"2b": ["Square crank", 									   "Manivela com ponta quadrada - Usada em uptown para abrir um arm�rio cheio de balas de lan�a-granadas.", 																																   						"0px 335px 0px 168px", "-390px", "4", "1", "15", "3", "4"],
	"2c": ["(BOTU) Medalh�o na cor Vermelha",				   "BOTU!<br><br>Tamb�m conhecido como BOTUchos / Moeda da Macumba na edi��o Vermelha.<br><br>Item descartado durante o processo de desenvolvimento.", 																					   							"0px 280px 0px 224px", "-500px", "4", "1", "16", "4", "4"],
	"2d": ["(BOTU) Medalh�o na cor Azul", 					   "BOTU!<br><br>Tamb�m conhecido como BOTUchos / Moeda da Macumba na edi��o Azul.<br><br>Item descartado durante o processo de desenvolvimento.", 																						   							"0px 227px 0px 280px", "-609px", "4", "1", "17", "5", "4"],
	"2e": ["(BOTU) Medalh�o na cor Dourada",				   "BOTU!<br><br>Tamb�m conhecido como BOTUchos / Moeda da Macumba na edi��o Dourada.<br><br>Item descartado durante o processo de desenvolvimento.", 																						   						"0px 168px 0px 335px", "-722px", "4", "1", "18", "6", "4"],
	"2f": ["Jill's S.T.A.R.S card", 						   "Cart�o de Identifica��o S.T.A.R.S da Jill Valentine.<br>Usado para obter a senha da gaveta na sala de arquivos na RPD caso voc� fuja do nemesis.", 																					   							"0px 114px 0px 392px", "-833px", "4", "1", "19", "7", "4"],
	"30": ["(BOTU) Lata de �leo 'Giga Oil'",    			   "BOTU!<br><br>Dizem que se voc� usar 1024 Latas dessa, voc� ter� um 'Tera-Oil'.<br><br>Item descartado durante o processo de desenvolvimento.", 																						   							"0px 58px 0px 446px",   "-943px", "4", "2", "0", "8", "4"],
	"31": ["Battery", 										   "Bateria usada para ligar o elevador que leva at� a esta��o de energia em Downtown.", 																																					   						"0px 0px 0px 501px",   "-1055px", "4", "2", "1", "9", "4"],
	"32": ["Fire hook", 									   "P� de cabra usado para abrir um al�ap�o no restaurante.<br><br>Existe 100% de probabilidade de um baitola aparecer assim que voc� usar esse item.", 																					   						"0px 502px 0px 0px",      "-54px","5", "2", "2", "0", "5"],
	"33": ["Power cable", 									   "Cabo de energia usado para fazer o bonde funcionar.<br><br>Nada como fazer uma boa e velha gambiarra na hora de mexer na parte el�trica...", 																							   						"0px 446px 0px 57px",    "-166px","5", "2", "3", "1", "5"],
	"34": ["Fuse", 											   "Fus�vel usado para fazer o bonde funcionar.<br><br>At� aonde eu saiba, fus�veis n�o tem esse tamanho nem no inferno!", 																													   						"0px 392px 0px 112px",   "-277px","5", "2", "4", "2", "5"],
	"35": ["(BOTU) Mangueira de inc�ndio cortada",			   "BOTU!<br>Supostamente essa mangueira de inc�ndio era para estar cortada para fazer voc� dar mais voltas ainda!<br><br>Item descartado durante o processo de desenvolvimento.", 														   							"0px 335px 0px 168px",   "-390px","5", "2", "5", "3", "5"],
	"36": ["Oil Additive", 									   "VPower!<br><br>Aditivo que serve para ser misturado com o �leo encontrado no posto de gasolina.", 																																		   						"0px 280px 0px 224px",   "-500px","5", "2", "6", "4", "5"],
	"37": ["Brad Vickers' card case", 						   "Carteira do Brad Vickers.<br>Dentro dela, tem o cart�o de Identifica��o S.T.A.R.S do defunto.", 																																		   						"0px 227px 0px 280px",   "-609px","5", "2", "7", "5", "5"],
	"38": ["Brad Vickers' S.T.A.R.S card",					   "Cart�o de Identifica��o S.T.A.R.S do Brad Vicker's<br><br>Usado para obter a senha da gaveta na sala de arquivos na RPD.<br><br>Ali�s, as senhas s�o: 0513, 0131, 4011 ou 4312.", 														   						"0px 168px 0px 335px",   "-722px","5", "2", "8", "6", "5"],
	"39": ["Machine oil", 									   "�leo de maquina mequetrefe!<br><br>Ele sozinho n�o tem for�a nem de mover um carrinnho de rolim� para frente, mas quando combinado com o Aditivo, move at� a Apollo 11 para a lua!", 													   						"0px 114px 0px 392px",   "-833px","5", "2", "9", "7", "5"],
	"3a": ["Mixed oil", 									   "�leo aditivado com VPower!<br><br>Com essa mistura voc� consegue fazer qualquer bonde de Raccon City que esteja especificamente em Downtown se mover!", 																				   						"0px 58px 0px 446px",   "-943px","5", "2", "10", "8", "5"],
	"3b": ["(BOTU) Correntes",  							   "BOTU!<br><br>Essas correntes eram para estar na onde voc� encontra balas no armaz�m (Warehouse).<br><br>Item descartado durante o processo de desenvolvimento.", 																		   						"0px 0px 0px 501px",   "-1055px","5", "2", "11", "9", "5"],
	"3c": ["Wrench", 										   "Chave Ingl�sa usada para remover a mangueira de inc�ndio em Uptown e abrir a porta do posto de gasolina.", 																															 							"0px 502px 0px 0px", "-54px",     "6", "2", "12", "0", "6"], 
	"3d": ["Iron pipe", 									   "Cano de ferro usado em uma lareira em um almoxerifado no cemit�rio ap�s queimar toda lenha presente.<br><br>Serve para para revelar uma passagem secreta.", 																			 						"0px 446px 0px 57px", "-166px",   "6", "2", "13", "1", "6"], 
	"3e": ["(BOTU) Boca da mangueira de inc�ndio", 			   "BOTU!<br><br>Item que suportamente seria usado para combinar com a mangueira de inc�ndio que est� faltando o encaixe<br><br>Item descartado durante o processo de desenvolvimento.", 													 						"0px 392px 0px 112px", "-277px",  "6", "2", "14", "2", "6"], 
	"3f": ["Fire hose", 									   "Mangueira de inc�ndio usada para apagar o fogo em um corredor em uptown.<br><br>Gra�as a deus � a vers�o inteira da mangueira!", 																										 						"0px 335px 0px 168px", "-390px",  "6", "2", "15", "3", "6"], 
	"40": ["Tape recorder", 								   "Gravador de �udio (aka. walkman) que cont�m a voz de um m�dico descrevendo uma fratura no cotovelo.<br><br>Usado para abrir o elevador no hospital.", 																					 						"0px 280px 0px 224px", "-500px",  "6", "2", "16", "4", "6"], 
	"41": ["Lighter oil", 									   "Fl�ido de isqueiro.<br><br>Usado adivinha aonde?<br><br>Em um isqueiro vazio! (Duuuuur~~~)", 																																			 						"0px 227px 0px 280px", "-609px",  "6", "2", "17", "5", "6"], 
	"42": ["Lighter (Fechado / Sem flu�do)", 				   "Um isqueiro que est� sem flu�do.<br>(N�o presta para acender cigarro derby)", 																																							 						"0px 168px 0px 335px", "-722px",  "6", "2", "18", "6", "6"], 
	"43": ["Lighter (Aberto / Com flu�do)", 				   "Um isqueiro que est� com flu�do.<br>Serve para acender lareiras em cemit�rios e queimar cordas cheias de �leo. <br><br>(N�o serve para acender cigarro derby)", 																		 						"0px 114px 0px 392px", "-833px",  "6", "2", "19", "7", "6"], 
	"44": ["Green gem", 									   "Gema verde usada para abrir o port�o da prefeitura de Raccon.<br><br>Meus parab�ns para quem teve a brilhante ideia<br>Design 10/10!", 																								 							"0px 58px 0px 446px", "-943px",    "6", "3", "0", "8", "6"], 
	"45": ["Blue gem", 										   "Gema azul usada para abrir o port�o da prefeitura de Raccon.<br><br>Meus parab�ns para quem teve a brilhante ideia<br>Design 10/10!", 																									 						"0px 0px 0px 501px", "-1055px",    "6", "3", "1", "9", "6"], 
	"46": ["Amber ball", 									   "Uma esfera marrom feita de resina extra�da de �rvores fossilizadas.<br><br>Esse item � utilizado no puzzle dos tr�s rel�gios na clock tower.", 																						 							"0px 502px 0px 0px", "-54px",      "7", "3", "2", "0", "7"], 
	"47": ["Obsidian ball", 								   "Tamb�m conhecida como Obsidiena, Se trata de uma esfera negra de vidro feita atrav�s de uma rea��o quimica de lava vulcanica quando resfriada.<br><br>Esse item � utilizado no puzzle dos tr�s rel�gios na clock tower.", 				 						"0px 446px 0px 57px", "-166px",    "7", "3", "3", "1", "7"], 
	"48": ["Crystal ball", 									   "Uma simples esfera de cristal, utilizada em um puzzle na clock tower.", 																																								 						"0px 392px 0px 112px", "-277px",   "7", "3", "4", "2", "7"], 
	"49": ["(BOTU) Controle Remoto Sem Pilhas",      		   "BOTU!<br><br>Um Controle remoto que est� sem pilhas.<br>Pelo que d� a entender, ele seria usado na farm�cia para ver qual seria a senha (Aquacure, Safsprin ou Adravil).<br><br>Item descartado durante o processo de desenvolvimento.",						"0px 335px 0px 168px", "-390px",   "7", "3", "5", "3", "7"], 
	"4a": ["(BOTU) Controle Remoto Com Pilhas", 			   "BOTU!<br><br>Um Controle remoto que est� com pilhas.<br>Pelo que d� a entender, ele seria usado na farm�cia para ver qual seria a senha (Aquacure, Safsprin ou Adravil).<br><br>Item descartado durante o processo de desenvolvimento.",						"0px 280px 0px 224px", "-500px",   "7", "3", "6", "4", "7"], 
	"4b": ["(BOTU) Pilhas Modelo AA",	 					   "BOTU!<br><br>Um par de pilhas que seria utilizado para combinar com o Controle Remoto Sem Pilhas. Seria usado para ligar a TV da farm�cia.<br><br>Item descartado durante o processo de desenvolvimento.", 							 							"0px 227px 0px 280px", "-609px",   "7", "3", "7", "5", "7"], 
	"4c": ["Gold gear", 									   "Uma engrenagem dourada que faz parte de um sistema mec�nico de rel�gios.<br><br>Combine com a Silver Gear para formar o Item Chronos Gear, usado na torre da Clock Tower.", 															 						"0px 168px 0px 335px", "-722px",   "7", "3", "8", "6", "7"], 
	"4d": ["Silver gear", 									   "Uma engrenagem prateada que faz parte de um sistema mec�nico de rel�gios.<br><br>Combine com a Gold Gear para formar o Item Chronos Gear, usado na torre da Clock Tower.", 															 							"0px 114px 0px 392px", "-833px",   "7", "3", "9", "7", "7"], 
	"4e": ["Chronos gear", 									   "Engrenagem composta dos itens Gold Gear e Silver Gear.<br><br>Use no rel�gio da Clock tower para ativar o mesmo.", 																													 							"0px 58px 0px 446px", "-943px",   "7", "3", "10", "8", "7"], 
	"4f": ["Bronze book",									   "Um livro de Bronze encontrado nas m�os de uma est�tua do prefeito de raccon city.<br><br>Use ela em um puzzle pr�ximo ao restaurante (Downtown) para obter o Bronze compass", 															 						"0px 0px 0px 501px", "-1055px",   "7", "3", "11", "9", "7"], 
	"50": ["Bronze compass", 								   "Um compasso feito de bronze encontrado pr�ximo a um restaurante.<br><br>Use ele na est�tua do prefeito de raccon para obter o item Battery.", 																						 	 						"0px 502px 0px 0px", "-54px",     "8", "3", "12", "0", "8"], 
	"51": ["Vaccine medium", 								   "Uma das solu��es para criar um combatente contra o <br>T-Virus.<br><br>Combine com o item Vaccine base para criar o item \"Vaccine\".", 																						 	  	 						"0px 446px 0px 57px", "-166px",   "8", "3", "13", "1", "8"], 
	"52": ["Vaccine base", 									   "Uma das solu��es para criar um combatente contra o <br>T-Virus.<br><br>Combine com o item Vaccine medium para criar o item \"Vaccine\".", 																								 						"0px 392px 0px 112px", "-277px",  "8", "3", "14", "2", "8"], 
	"53": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui s� para encher o espa�o mesmo, por que elas n�o tem nenhuma utilidade ingame.", 																	 						"0px 335px 0px 168px", "-390px",   "8", "0", "2", "3", "8"], 
	"54": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui s� para encher o espa�o mesmo, por que elas n�o tem nenhuma utilidade ingame.", 																	 						"0px 280px 0px 224px", "-500px",   "8", "0", "2", "4", "8"], 
	"55": ["Vaccine", 										   "Vacina criada com os itens Vaccine base e Vaccine medium.<br>Use na Jill para curar ela do T-Virus.", 																																	 						"0px 227px 0px 280px", "-609px",  "8", "3", "15", "5", "8"], 
	"56": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui s� para encher o espa�o mesmo, por que elas n�o tem nenhuma utilidade ingame.", 																	 						"0px 168px 0px 335px", "-722px",   "8", "0", "2", "6", "8"], 
	"57": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui s� para encher o espa�o mesmo, por que elas n�o tem nenhuma utilidade ingame.", 																	 						"0px 114px 0px 392px", "-833px",   "8", "0", "2", "7", "8"], 
	"58": ["Medium base", 									   "Solu��o usada para criar o item Vaccine medium.<br>Ela � usada no laborat�rio do hospital de raccon, B3.", 																															 							"0px 58px 0px 446px", "-943px",   "8", "3", "16", "8", "8"], 
	"59": ["Eagle parts A", 								   "Primeiro set de itens da arma STI Eagle 6.0.<br>Combine com o item Eagle parts B para formar a mesma.", 																																 						"0px 0px 0px 501px", "-1055px",   "8", "3", "17", "9", "8"], 
	"5a": ["Eagle parts B", 								   "Segundo set de itens da arma STI Eagle 6.0.<br>Combine com o item Eagle parts A para formar a mesma.",																																	 						"0px 502px 0px 0px", "-54px",     "9", "3", "18", "0", "9"], 
	"5b": ["M37 parts A", 									   "Primeiro set de itens da arma Western Custom M37.<br>Combine com o item M37 parts B para formar a mesma.", 																															 							"0px 446px 0px 57px", "-166px",   "9", "3", "19", "1", "9"], 
	"5c": ["M37 parts B", 									   "Segundo set de itens da arma Western Custom M37.<br>Combine com o item M37 parts A para formar a mesma.", 																																 						"0px 392px 0px 112px", "-277px",   "9", "4", "0", "2", "9"], 
	"5d": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui s� para encher o espa�o mesmo, por que elas n�o tem nenhuma utilidade ingame.", 																	 						"0px 335px 0px 168px", "-390px",   "9", "0", "2", "3", "9"], 
	"5e": ["Chronos chain", 								   "Uma chave que aparentemente n�o tem nenhuma serventia, at� que voc� combine ela com a Clock tower (winder) key, formando a chave Chronos key.", 																						 						"0px 280px 0px 224px", "-500px",   "9", "4", "1", "4", "9"], 
	"5f": ["Rusted crank", 									   "Uma manivela enferrujada, usada para (tentar) abrir a porta do posto de gasolina Stagla de raccon.", 																																	 						"0px 227px 0px 280px", "-609px",   "9", "4", "2", "5", "9"], 
	"60": ["Card key", 										   "Cart�o chave usado na f�brica abandonada, pr�ximo do final.<br><br>Use ela para abrir algumas portas e destrancar um elevador.", 																										 						"0px 168px 0px 335px", "-722px",   "9", "4", "3", "6", "9"], 
	"61": ["Gun powder A", 									   "Polvora Tipo A<br>Ela sozinha tem o poder de gerar balas comuns de pistola.", 																																							 						"0px 114px 0px 392px", "-833px",   "9", "4", "4", "7", "9"], 
	"62": ["Gun powder B", 									   "Polvora Tipo B<br>Ela sozinha tem o poder de gerar balas comuns de shotgun.", 																																							 						"0px 58px 0px 446px", "-943px",    "9", "4", "5", "8", "9"], 
	"63": ["Gun powder C", 									   "Polvora Tipo C<br>Ela sozinha tem o poder de gerar balas comuns de lan�a-granadas.", 																																					 						"0px 0px 0px 501px", "-1055px",    "9", "4", "6", "9", "9"], 
	"64": ["Gun powder AA", 								   "Polvora Tipo AA.<br>Essa combina��o consegue gerar mais balas de pisola do que o comum.", 																																				 						"0px 502px 0px 0px", "-54px",     "10", "4", "7", "0", "10"],
	"65": ["Gun powder BB", 								   "Polvora Tipo BB.<br>Essa combina��o consegue gerar mais balas de shotgun do que o comum.", 																																			 							"0px 446px 0px 57px", "-166px",   "10", "4", "8", "1", "10"],
	"66": ["Gun powder AC", 								   "Polvora Tipo AC.<br>Essa combina��o consegue gerar at� 20 balas (de fogo) de lan�a-granadas.", 																																		 							"0px 392px 0px 112px", "-277px",  "10", "4", "9", "2", "10"],
	"67": ["Gun powder BC", 								   "Polvora Tipo BC.<br>Essa combina��o consegue gerar at� 20 balas (de �cido) de lan�a-granadas.", 																																		 						"0px 335px 0px 168px", "-390px", "10", "4", "10", "3", "10"],
	"68": ["Gun powder CC", 								   "Polvora Tipo BC.<br>Essa combina��o consegue gerar at� 20 balas (de gelo) de lan�a-granadas.", 																																		 							"0px 280px 0px 224px", "-500px", "10", "4", "11", "4", "10"],
	"69": ["Gun powder AAA", 								   "Polvora Tipo AAA.<br>Essa combina��o consegue gerar muitas balas de pisola.", 																																							 						"0px 227px 0px 280px", "-609px", "10", "4", "12", "5", "10"],
	"6a": ["Gun powder AAB", 								   "Polvora Tipo AAB.<br>Essa combina��o consegue gerar at� 40 balas de shotgun.", 																																						 							"0px 168px 0px 335px", "-722px", "10", "4", "13", "6", "10"],
	"6b": ["Gun powder BBA", 								   "Polvora Tipo BBA.<br>Essa combina��o consegue gerar at� 120 balas de pisola.", 																																						 							"0px 114px 0px 392px", "-833px", "10", "4", "14", "7", "10"],
	"6c": ["Gun powder BBB", 								   "Polvora Tipo BBB.<br>Essa combina��o consegue gerar muitas balas de shotgun.", 																																						 							"0px 58px 0px 446px", "-943px",  "10", "4", "15", "8", "10"],
	"6d": ["Gun powder CCC", 								   "Polvora Tipo CCC.<br>Essa combina��o consegue gerar balas de magnum - apenas.", 																																						 						"0px 0px 0px 501px", "-1055px",  "10", "4", "16", "9", "10"],
	"6e": ["Infinite bullets", 								   "Apela��o Extrema!<br><br>O neg�cio � simples - combine com a arma que voc� quer que tenha muni��o infinita e voil�!", 																													 						"0px 502px 0px 0px", "-54px",    "11", "4", "17", "0", "11"],
	"6f": ["Water sample", 									   "Amostra de �gua usada em um medidor de qualidade, pr�ximo do final.<br><br><center>~~~BEEP-BOOP~~~</center>", 																															 						"0px 446px 0px 57px", "-166px",  "11", "4", "18", "1", "11"],
	"70": ["System disk", 									   "Disco utilizado para abrir uma porta de seguran�a na fabrica abandonada.<br><br>Se prepare, por que l� vem nemmy!", 																													 						"0px 392px 0px 112px", "-277px", "11", "4", "19", "2", "11"],
	"71": ["Dummy key", 									   "Aka. Dominikey / Chave Jumenta<br><br>Aparentemente, os Devs do RE3 esqueceram essa chave do RE2 aqui...", 																															 							"0px 335px 0px 168px", "-390px",  "11", "5", "0", "3", "11"],
	"72": ["Lockpick", 										   "Um item cl�ssico - Tamb�m conhecida como micha, serve para abrir portas, arm�rios e gavetas com trancas simples.", 																													 							"0px 280px 0px 224px", "-500px",  "11", "5", "1", "4", "11"],
	"73": ["Warehouse (backdoor) key", 						   "Chave do armaz�m<br>Usada no come�o do game para sair do armaz�m depois de uma pequena discuss�o com o Dario.", 																														 						"0px 227px 0px 280px", "-609px",  "11", "5", "2", "5", "11"],
	"74": ["Sickroom key (room 402)",						   "Chave usada no 4� andar do hospital de raccon.<br>Ela serve para abrir a porta do quarto 402, aonde cont�m uma das solu��es neces�rias para criar a vacina.", 																			 						"0px 168px 0px 335px", "-722px",  "11", "5", "3", "6", "11"],
	"75": ["Emblem (S.T.A.R.S) key", 						   "Chave usada para abrir a cl�ssica sala S.T.A.R.S na delegacia RPD.<br><br>Normalmente depois de usar essa chave voc� aperta \"F9\", visto que deu RNG ruim (mais uma vez)", 															 						"0px 114px 0px 392px", "-833px",  "11", "5", "4", "7", "11"],
	"76": ["(BOTU) Molho de chaves com quatro chaves", 		   "BOTU!<br><br>Molho de chaves com uso desconhecido.<br>Creio que seja para abrir diversas portas no hospital, assim como as chaves do 1� Resident / Biohazard.<br><br>Item descartado durante o processo de desenvolvimento.", 			 						"0px 58px 0px 446px", "-943px",   "11", "5", "5", "8", "11"],
	"77": ["Clock tower (bezel) key", 						   "Chave usada para descer as escadas da torre do rel�gio em Clock Tower.<br><br>� uma das �nicas chaves que voc� n�o pode usar diretamente do invent�rio.", 																				 						"0px 0px 0px 501px", "-1055px",   "11", "5", "6", "9", "11"],
	"78": ["Clock tower (winder) key", 						   "Uma chave que voc� at� consegue abrir uma porta com ela - mas seu real prop�sito � ser combinada com a Chronos Chain para se tornar a Chronos key.", 				  																	 						"0px 502px 0px 0px", "-54px",     "12", "5", "7", "0", "12"],
	"79": ["Chronos key", 									   "Uma chave feita de duas outras chaves (Winder e Chronos chain).<br><br>Serve para abrir a porta pr�ximo ao sagu�o principal da clock tower.", 						  																	 						"0px 446px 0px 57px", "-166px",   "12", "5", "8", "1", "12"],
	"7a": ["Unknown Sigpro SP 2009 handgun", 				   "Aka: Pistola Esquecida<br><br>Acho que os Devs resolveram colocar essas pistolas aqui s� para encher o espa�o mesmo, por que elas n�o tem nenhuma utilidade ingame.",																	 						"0px 392px 0px 112px", "-277px",  "12", "0", "2", "2", "12"],
	"7b": ["Park (main gate) key", 							   "Chave dos port�es do parque de raccon.<br>Voc� a encontra dentro de uma sala de save pr�ximo aos fundos da clock tower.", 											  																	 						"0px 335px 0px 168px", "-390px",  "12", "5", "9", "3", "12"],
	"7c": ["Park (graveyard) key", 							   "Chave da sala de ferramentas do cemit�rio.<br>Voc� encontra essa chave pr�ximo a um gal�o explosivo no parque.", 													  																	 						"0px 280px 0px 224px", "-500px", "12", "5", "10", "4", "12"],
	"7d": ["Park (rear gate) key", 							   "Chave de um cadeado.<br>Com essa chave voc� consegue abrir um cadeado que est� impedindo a passagem para a fabrica abandonada.<br><br>(Bem que a Jill poderia usar o Lockpick...)", 													 						"0px 227px 0px 280px", "-609px", "12", "5", "11", "5", "12"],
	"7e": ["Facility key (no barcode)", 					   "Uma das chaves da fabrica abandonada.<br>Com ela voc� consegue ter acesso a uma sala com um elevador.", 																															     						"0px 168px 0px 335px", "-722px", "12", "5", "12", "6", "12"],
	"7f": ["Facility key (with barcode)", 					   "Uma das chaves da fabrica abandonada.<br>Com o c�digo de barras, voc� consegue obter a rocket launcher pr�ximo do final. <br><br>Com ela voc� consegue ter acesso a uma sala com um elevador.", 										 						"0px 114px 0px 392px", "-833px", "12", "5", "13", "7", "12"],
	"80": ["Boutique key", 									   "Chave da botique, aonde voc� pode trocar de roupa durante o gameplay.<br><br>Fun��o dispon�vel apenas na vers�o de playstation e gamecube.", 																						     						"0px 58px 0px 446px", "-943px",  "12", "5", "14", "8", "12"],
	"81": ["Ink ribbon", 									   "De longe, � um dos itens mais cl�ssicos de toda franquia Resident Evil / Biohazard.<br><br>Quando est� no invent�rio, voc� pode usar ele na manquina de escrever, salvando o seu progresso.", 							 										"0px 0px 0px 501px", "-1055px",  "12", "5", "15", "9", "12"],
	"82": ["Reloading tool", 								   "Uma das maravilas do s�culo 21 - com esse item, voc� consegue criar muni��o atrav�s das polvoras.", 																																	 						"0px 502px 0px 0px", "-54px",    "13", "5", "16", "0", "13"],
	"83": ["Game inst. A", 									   "Manual de como jogar Resident Evil 3 / Biohazard 3.<br>Com esse manual, voc� aprende sobre objetos explosivos, O giro de 180�, Fuga de emerg�ncia, desvio de emerg�ncia e outras coisas.", 											 							"0px 446px 0px 57px", "-166px",  "13", "5", "17", "1", "13"],
	"84": ["Game inst. B", 									   "Manual de como jogar Resident Evil 3 / Biohazard 3.<br>Com esse manual, voc� aprende sobre o sistema de cria��o de balas (Reloading Tool), Sobre as polvoras e suas combina��es.", 													 							"0px 392px 0px 112px", "-277px", "13", "5", "18", "2", "13"],
	"85": ["(BOTU) Pote com solu��o ciana", 				   "BOT... N�o, pera...<br><br>Com o nome interno de \"Game inst. A\", esse item pode ser usado quantas vezes que pelo visto n�o altera nada no game.<br><br>Sim, mais um item para encher lingui�a.", 													 			"0px 335px 0px 168px", "-390px", "13", "5", "19", "3", "13"]
}

var ATTR = {
	"00": ["Nenhum",							 					   "#fff0", "0 0 10px #fff0"], // Use this for puzzle items that don't have the ammo display.
	"01": ["Muni��o restante na cor verde",							"#008400", "0 0 2px #004200"],
	"02": ["% da muni��o em verde", 								"#008400", "0 0 2px #004200"],
	"03": ["Muni��o infinita na cor verde", 						"#008400", "0 0 2px #004200"],
	"05": ["Muni��o restante na cor vermelho",  					"#840000", "0 0 2px #310000"],
	"06": ["% da muni��o em vermelho", 								"#840000", "0 0 2px #310000"],
	"07": ["Muni��o infinita na cor vermelha",  					"#840000", "0 0 2px #310000"],
	"0d": ["Muni��o restante na cor azul", 							"#9393ff", "0 0 2px #004242"],
	"0e": ["% da muni��o em azul", 									"#9393ff", "0 0 2px #004242"],
	"0f": ["Muni��o infinita na cor azul", 							"#9393ff", "0 0 2px #004242"],
	"16": ["Atributo Usado Pela M4A1 Assault Rifle Da Jill/Carlos", "#840000", "0 0 2px #310000"],
	
	// Atributos Desconhecidos
	"17": ["Atributo Adicionado para obter compatibilidade com o Nightmare Mod", 	    "#fff", "0 0 2px #0f0"],  // Atributo encontrado na shotgun do Carlos
	"0b": ["Atributo encontrado em algumas vers�es do game", 						    "#fff", "0 0 2px #0f0"]
}

var VOID = {
	"00": "OK!",											// Condi��o normal
	"80": "Condi��o anormal da vers�o francesa/Taiwan"		// Condi��o anormal encontrado na vers�o francesa. Pode ser um hack que outra pessoa tenha feito antes
}

var CIDADE = {
	"00": ["Uptown (Incluindo a delegacia da RPD)"],
    "01": ["Downtown"],
    "02": ["Clock Tower / Park antes da explos�o do Hospital"],
    "03": ["Clock Tower / Park depois da explos�o do Hospital"],
    "04": ["F�brica Abandonada"],
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
	"08": ["Sidepack N�o Obtido"] 
}

var VERSAO = {
	"000000000000": ["Indefinido", 						  "HEX zerada (00)"],
	"4241534c5553": ["Vers�o Russa / Nightmare (Ou Darkness) Mod", "BASLUS"],
	"4245534c4553": ["Mediakite / Xplosiv", 					   "BESLES"],
	"4249534c5053": ["Vers�o Chinesa / Japonesa / Taiwan", 		   "BISLPS"]
}

var POISON = {
	"8f": ["Sim"], // Est� envenenado 
	"00": ["N�o"]  // N�o est� envenenado
}

var LOCAIS = {
	"00": ["Armaz�n"],
	"01": ["Beco"],
	"02": ["Hall da RPD"],
	"03": ["Sala Escura"],
	"0c": ["Estacionamento"],
	"04": ["Zona Comercial"],
	"06": ["Sala de Estar"],
	"05": ["Capela"],
	"0d": ["Sala de Maquinas"],
	"08": ["Recep��o Hospital"],
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
	"0c": ["Todos"], // Encontrado esse valor na vers�o francesa
	"08": ["Todos"]
}

var DIFICULDADE = {
	"01": ["F�cil"],
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
	"0c": [false, "1"],
	"0d": [false, "2"],
	"0e": [false, "3"],
	"0f": [false, "4"],
	"10": [false, "5"],
	"11": [false, "6"],
	"12": [false, "7"],
	"13": [false, "8"],
	"14": [false, "9"],
	"15": [false, ":"],
	"16": [false, " "],
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
	"57": [false, "(Char ou Fun��o N�o-Mapeada N� 00)"],
	"58": [false, "(Char ou Fun��o N�o-Mapeada N� 01)"],
	"59": [false, "(Char ou Fun��o N�o-Mapeada N� 02)"],
	"5a": [false, "(Char ou Fun��o N�o-Mapeada N� 03)"],
	"5b": [false, "(Char ou Fun��o N�o-Mapeada N� 04)"],
	"5c": [false, "(Char ou Fun��o N�o-Mapeada N� 05)"],
	"5d": [false, "(Char ou Fun��o N�o-Mapeada N� 06)"],
	"5e": [false, "(Char ou Fun��o N�o-Mapeada N� 07)"],
	"5f": [false, "(Char ou Fun��o N�o-Mapeada N� 08)"],
	"60": [false, "(Char ou Fun��o N�o-Mapeada N� 09)"],
	"61": [false, "(Char ou Fun��o N�o-Mapeada N� 10)"],
	"62": [false, "(Char ou Fun��o N�o-Mapeada N� 11)"],
	"63": [false, "(Char ou Fun��o N�o-Mapeada N� 12)"],
	"64": [false, "(Char ou Fun��o N�o-Mapeada N� 13)"],
	"65": [false, "(Char ou Fun��o N�o-Mapeada N� 14)"],
	"66": [false, "(Char ou Fun��o N�o-Mapeada N� 15)"],
	"67": [false, "(Char ou Fun��o N�o-Mapeada N� 16)"],
	"68": [false, "(Char ou Fun��o N�o-Mapeada N� 17)"],
	"69": [false, "(Char ou Fun��o N�o-Mapeada N� 18)"],
	"6a": [false, "(Char ou Fun��o N�o-Mapeada N� 19)"],
	"6b": [false, "(Char ou Fun��o N�o-Mapeada N� 20)"],
	"6c": [false, "(Char ou Fun��o N�o-Mapeada N� 21)"],
	"6d": [false, "(Char ou Fun��o N�o-Mapeada N� 22)"],
	"6e": [false, "(Char ou Fun��o N�o-Mapeada N� 23)"],
	"6f": [false, "(Char ou Fun��o N�o-Mapeada N� 24)"],
	"70": [false, "(Char ou Fun��o N�o-Mapeada N� 25)"],
	"71": [false, "(Char ou Fun��o N�o-Mapeada N� 26)"],
	"72": [false, "(Char ou Fun��o N�o-Mapeada N� 27)"],
	"73": [false, "(Char ou Fun��o N�o-Mapeada N� 28)"],
	"74": [false, "(Char ou Fun��o N�o-Mapeada N� 29)"],
	"75": [false, "(Char ou Fun��o N�o-Mapeada N� 30)"],
	"76": [false, "(Char ou Fun��o N�o-Mapeada N� 31)"],
	"77": [false, "(Char ou Fun��o N�o-Mapeada N� 32)"],
	"78": [false, "(Char ou Fun��o N�o-Mapeada N� 33)"],
	"79": [false, "(Char ou Fun��o N�o-Mapeada N� 34)"],
	"7a": [false, "(Char ou Fun��o N�o-Mapeada N� 35)"],
	"7b": [false, "(Char ou Fun��o N�o-Mapeada N� 36)"],
	"7c": [false, "(Char ou Fun��o N�o-Mapeada N� 37)"],
	"7d": [false, "(Char ou Fun��o N�o-Mapeada N� 38)"],
	"7e": [false, "(Char ou Fun��o N�o-Mapeada N� 39)"],
	"7f": [false, "(Char ou Fun��o N�o-Mapeada N� 40)"],
	"80": [false, "(Char ou Fun��o N�o-Mapeada N� 41)"],
	"81": [false, "(Char ou Fun��o N�o-Mapeada N� 42)"],
	"82": [false, "(Char ou Fun��o N�o-Mapeada N� 43)"],
	"83": [false, "(Char ou Fun��o N�o-Mapeada N� 44)"],
	"84": [false, "(Char ou Fun��o N�o-Mapeada N� 45)"],
	"85": [false, "(Char ou Fun��o N�o-Mapeada N� 46)"],
	"86": [false, "(Char ou Fun��o N�o-Mapeada N� 47)"],
	"87": [false, "(Char ou Fun��o N�o-Mapeada N� 48)"],
	"88": [false, "(Char ou Fun��o N�o-Mapeada N� 49)"],
	"89": [false, "(Char ou Fun��o N�o-Mapeada N� 50)"],
	"8a": [false, "(Char ou Fun��o N�o-Mapeada N� 51)"],
	"8b": [false, "(Char ou Fun��o N�o-Mapeada N� 52)"],
	"8c": [false, "(Char ou Fun��o N�o-Mapeada N� 53)"],
	"8d": [false, "(Char ou Fun��o N�o-Mapeada N� 54)"],
	"8e": [false, "(Char ou Fun��o N�o-Mapeada N� 55)"],
	"8f": [false, "(Char ou Fun��o N�o-Mapeada N� 56)"],
	"90": [false, "(Char ou Fun��o N�o-Mapeada N� 57)"],
	"91": [false, "(Char ou Fun��o N�o-Mapeada N� 58)"],
	"92": [false, "(Char ou Fun��o N�o-Mapeada N� 59)"],
	"93": [false, "(Char ou Fun��o N�o-Mapeada N� 60)"],
	"94": [false, "(Char ou Fun��o N�o-Mapeada N� 61)"],
	"95": [false, "(Char ou Fun��o N�o-Mapeada N� 62)"],
	"96": [false, "(Char ou Fun��o N�o-Mapeada N� 63)"],
	"97": [false, "(Char ou Fun��o N�o-Mapeada N� 64)"],
	"98": [false, "(Char ou Fun��o N�o-Mapeada N� 65)"],
	"99": [false, "(Char ou Fun��o N�o-Mapeada N� 66)"],
	"9a": [false, "(Char ou Fun��o N�o-Mapeada N� 67)"],
	"9b": [false, "(Char ou Fun��o N�o-Mapeada N� 68)"],
	"9c": [false, "(Char ou Fun��o N�o-Mapeada N� 69)"],
	"9d": [false, "(Char ou Fun��o N�o-Mapeada N� 70)"],
	"9e": [false, "(Char ou Fun��o N�o-Mapeada N� 71)"],
	"9f": [false, "(Char ou Fun��o N�o-Mapeada N� 72)"],
	"a0": [false, "(Char ou Fun��o N�o-Mapeada N� 73)"],
	"a1": [false, "(Char ou Fun��o N�o-Mapeada N� 74)"],
	"a2": [false, "(Char ou Fun��o N�o-Mapeada N� 75)"],
	"a3": [false, "(Char ou Fun��o N�o-Mapeada N� 76)"],
	"a4": [false, "(Char ou Fun��o N�o-Mapeada N� 77)"],
	"a5": [false, "(Char ou Fun��o N�o-Mapeada N� 78)"],
	"a6": [false, "(Char ou Fun��o N�o-Mapeada N� 79)"],
	"a7": [false, "(Char ou Fun��o N�o-Mapeada N� 80)"],
	"a8": [false, "(Char ou Fun��o N�o-Mapeada N� 81)"],
	"a9": [false, "(Char ou Fun��o N�o-Mapeada N� 82)"],
	"aa": [false, "(Char ou Fun��o N�o-Mapeada N� 83)"],
	"ab": [false, "(Char ou Fun��o N�o-Mapeada N� 84)"],
	"ac": [false, "(Char ou Fun��o N�o-Mapeada N� 85)"],
	"ad": [false, "(Char ou Fun��o N�o-Mapeada N� 86)"],
	"ae": [false, "(Char ou Fun��o N�o-Mapeada N� 87)"],
	"af": [false, "(Char ou Fun��o N�o-Mapeada N� 88)"],
	"b0": [false, "(Char ou Fun��o N�o-Mapeada N� 89)"],
	"b1": [false, "(Char ou Fun��o N�o-Mapeada N� 90)"],
	"b2": [false, "(Char ou Fun��o N�o-Mapeada N� 91)"],
	"b3": [false, "(Char ou Fun��o N�o-Mapeada N� 92)"],
	"b4": [false, "(Char ou Fun��o N�o-Mapeada N� 93)"],
	"b5": [false, "(Char ou Fun��o N�o-Mapeada N� 94)"],
	"b6": [false, "(Char ou Fun��o N�o-Mapeada N� 95)"],
	"b7": [false, "(Char ou Fun��o N�o-Mapeada N� 96)"],
	"b8": [false, "(Char ou Fun��o N�o-Mapeada N� 97)"],
	"b9": [false, "(Char ou Fun��o N�o-Mapeada N� 98)"],
	"ba": [false, "(Char ou Fun��o N�o-Mapeada N� 99)"],
	"bb": [false, "(Char ou Fun��o N�o-Mapeada N� 100)"],
	"bc": [false, "(Char ou Fun��o N�o-Mapeada N� 101)"],
	"bd": [false, "(Char ou Fun��o N�o-Mapeada N� 102)"],
	"be": [false, "(Char ou Fun��o N�o-Mapeada N� 103)"],
	"bf": [false, "(Char ou Fun��o N�o-Mapeada N� 104)"],
	"c0": [false, "(Char ou Fun��o N�o-Mapeada N� 105)"],
	"c1": [false, "(Char ou Fun��o N�o-Mapeada N� 106)"],
	"c2": [false, "(Char ou Fun��o N�o-Mapeada N� 107)"],
	"c3": [false, "(Char ou Fun��o N�o-Mapeada N� 108)"],
	"c4": [false, "(Char ou Fun��o N�o-Mapeada N� 109)"],
	"c5": [false, "(Char ou Fun��o N�o-Mapeada N� 110)"],
	"c6": [false, "(Char ou Fun��o N�o-Mapeada N� 111)"],
	"c7": [false, "(Char ou Fun��o N�o-Mapeada N� 112)"],
	"c8": [false, "(Char ou Fun��o N�o-Mapeada N� 113)"],
	"c9": [false, "(Char ou Fun��o N�o-Mapeada N� 114)"],
	"ca": [false, "(Char ou Fun��o N�o-Mapeada N� 115)"],
	"cb": [false, "(Char ou Fun��o N�o-Mapeada N� 116)"],
	"cc": [false, "(Char ou Fun��o N�o-Mapeada N� 117)"],
	"cd": [false, "(Char ou Fun��o N�o-Mapeada N� 118)"],
	"ce": [false, "(Char ou Fun��o N�o-Mapeada N� 119)"],
	"cf": [false, "(Char ou Fun��o N�o-Mapeada N� 120)"],
	"d0": [false, "(Char ou Fun��o N�o-Mapeada N� 121)"],
	"d1": [false, "(Char ou Fun��o N�o-Mapeada N� 122)"],
	"d2": [false, "(Char ou Fun��o N�o-Mapeada N� 123)"],
	"d3": [false, "(Char ou Fun��o N�o-Mapeada N� 124)"],
	"d4": [false, "(Char ou Fun��o N�o-Mapeada N� 125)"],
	"d5": [false, "(Char ou Fun��o N�o-Mapeada N� 126)"],
	"d6": [false, "(Char ou Fun��o N�o-Mapeada N� 127)"],
	"d7": [false, "(Char ou Fun��o N�o-Mapeada N� 128)"],
	"d8": [false, "(Char ou Fun��o N�o-Mapeada N� 129)"],
	"d9": [false, "(Char ou Fun��o N�o-Mapeada N� 130)"],
	"da": [false, "(Char ou Fun��o N�o-Mapeada N� 131)"],
	"db": [false, "(Char ou Fun��o N�o-Mapeada N� 132)"],
	"dc": [false, "(Char ou Fun��o N�o-Mapeada N� 133)"],
	"dd": [false, "(Char ou Fun��o N�o-Mapeada N� 134)"],
	"de": [false, "(Char ou Fun��o N�o-Mapeada N� 135)"],
	"df": [false, "(Char ou Fun��o N�o-Mapeada N� 136)"],
	"e0": [false, "(Char ou Fun��o N�o-Mapeada N� 137)"],
	"e1": [false, "(Char ou Fun��o N�o-Mapeada N� 138)"],
	"e2": [false, "(Char ou Fun��o N�o-Mapeada N� 139)"],
	"e3": [false, "(Char ou Fun��o N�o-Mapeada N� 141)"],
	"e4": [false, "(Char ou Fun��o N�o-Mapeada N� 142)"],
	"e5": [false, "(Char ou Fun��o N�o-Mapeada N� 143)"],
	"e6": [false, "(Char ou Fun��o N�o-Mapeada N� 144)"],
	"e7": [false, "(Char ou Fun��o N�o-Mapeada N� 145)"],
	"e8": [false, "(Char ou Fun��o N�o-Mapeada N� 146)"],
	"e9": [false, "(Char ou Fun��o N�o-Mapeada N� 147)"],
	"eb": [false, "(Char ou Fun��o N�o-Mapeada N� 148)"],
	"ec": [false, "(Char ou Fun��o N�o-Mapeada N� 149)"],
	"ed": [false, "(Char ou Fun��o N�o-Mapeada N� 150)"],
	"ee": [false, "(Char ou Fun��o N�o-Mapeada N� 151)"],
	"ef": [false, "(Char ou Fun��o N�o-Mapeada N� 152)"],
	"f1": [false, "(Char ou Fun��o N�o-Mapeada N� 154)"],
	"f2": [false, "(Char ou Fun��o N�o-Mapeada N� 155)"],
	"f5": [false, "(Char ou Fun��o N�o-Mapeada N� 158)"],
	"f6": [false, "(Char ou Fun��o N�o-Mapeada N� 159)"],
	"f7": [false, "(Char ou Fun��o N�o-Mapeada N� 160)"],
	"f9": [false, "(Cor Verde)"],			// Formata��o - Cor Verde
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
		Info: Se o valor na frente de F3 for 43, O game ir� executar o som da arma equipada.
		Mas, quando esse comando for executado, alguns sons de menu / porta ir�o deixar de ser reproduzidos.
	*/
	"f4": [true, "(COMANDO: TROCAR CAMERA)", 			 7]
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
	// Acentua��es
	"�": "51",
	"�": "51",
	"�": "51",
	"�": "51",
	"�": "41",
	"�": "41",
	"�": "41",
	"�": "41",
	"�": "3f",
	"�": "4b",
	"�": "4b",
	"�": "4b",
	"�": "4b",
	"�": "4b",
	"�": "3d",
	"�": "3d",
	"�": "3d",
	"�": "3d",
	"�": "3d",
	// Fun��es Especiais
	"{": "09", // Aspas Duplas Abrindo
	"}": "0a", // Aspas Duplas Fechando 
	"]": "f9", // Tag Cor Verde
	"[": "f9", // Tag Cor Verde
	"*": "fb", // Pergunta - Yes / No
	"@": "fc", // Enter / Break line
	"|": "fd"  // Pausa no Texto
}

var RANGES = {
	// Edi��o do game (Baseado no primeiro indicador de save / info na primeira vez que o player salvou)
	"gameEdition":  		[276, 288],

	/*
		Header (Cabe�alho)
		
		O Inicio do arquivo de save cont�m um pequeno espa�o nulo "00" at� o primeiro indicador de save na posi��o
		0x80 (51 00 00 00 00 20 00 00 FF FF + Vers�o do game).

		Entre cada indicador, existe um espa�o de 68 espa�os nulos at� a posi��o do save de N� 15.
		Ap�s isso, eu n�o percebi nenhuma mudan�a no espa�o em diante at� o 1� slot de save (0x2000).

	*/

	"slot-offset":  		 [16384], // Distancia (offset) entre cada slot de save
	"he-esp-incial": 	    [0, 256], // Espa�o inicial at� o 1� indicador
	"he-esp-meio":   	  [304, 512], // Espa�o entre cada indicador
	"he-esp-final":    [3888, 16384], // Espa�o final at� o 1� slot de save

	"he-indicador-1":     [256, 304], //  Indicador do 1� Slot
	"he-indicador-2":     [512, 560], //  Indicador do 2� Slot
	"he-indicador-3":     [768, 816], //  Indicador do 3� Slot
	"he-indicador-4":   [1024, 1072], //  Indicador do 4� Slot
	"he-indicador-5":   [1280, 1328], //  Indicador do 5� Slot
	"he-indicador-6":   [1536, 1584], //  Indicador do 6� Slot
	"he-indicador-7":   [1792, 1840], //  Indicador do 7� Slot
	"he-indicador-8":   [2048, 2096], //  Indicador do 8� Slot
	"he-indicador-9":   [2304, 2352], //  Indicador do 9� Slot
	"he-indicador-10":  [2560, 2608], // Indicador do 10� Slot
	"he-indicador-11":  [2816, 2864], // Indicador do 11� Slot
	"he-indicador-12":  [3072, 3120], // Indicador do 12� Slot
	"he-indicador-13":  [3328, 3376], // Indicador do 13� Slot
	"he-indicador-14":  [3584, 3632], // Indicador do 14� Slot
	"he-indicador-15":  [3840, 3888], // Indicador do 15� Slot

	/* 			
		Save - Info por slot
		
		Uma das diferen�as do save do Resident Evil 2 comparado ao Resident Evil 3 � que agora o jogador
		est� limitado a 15 slots de saves, pois todos eles est�o em um �nico arquivo. Por�m, por mais que 
		dessa forma os arquivos de save de cada jogos sejam distintos, os dois tem o cabe�alho de save (0x2000) 
		com o come�o semelhante. (SC..)

		Ordem de variaveis do save:
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
			   Nome 		     Hex Pos. 														 |
		1) Header (SC...) 		 0x2000 														OK
		2) Tempo IGT 	  		 0x2200 at� 0x2203												OK
		@) 0x2204-2207																			OK
		3) Dificuldade 	  		 0x2208 														OK
		@) 0x2209-0x220D 																		OK
		4) Coordenadas X  		 0x220E															OK
		@) 0x2210-0x2211 																		OK
		5) Coordenadas Y  		 0x2212 														OK
		6) HP Jill/Carlos 		 0x2214 														OK
		7) Ep�logos 	  		 0x2216															OK
		@) 0x2217-0x2217																		OK
		8) N� Saves 	  		 0x2218 														OK
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
		16) Files 				 0x2404 at� 0x2409 												OK
		@) 0x240A-0x240B 																		OK
		17) Invent.  da Jill     0x240C at� 0x2433 (Levando em conta os 32 Bits de cada slot) 	OK
		18) Ba� da Jill 		 0x2434 at� 0x2533 (Levando em conta os 32 Bits de cada slot)   OK
		@) 0x2534-0x2534																		OK
		19) Arma atual da Jill   0x2535 		   (8 Bits, apenas a ID da arma)				OK
		20) Sidepack da Jill     0x2536 														OK
		@) 0x2537-0x254B 																		OK
		21) Invent.  do Carlos   0x254C at� 0x2573 (Levando em conta os 32 Bits de cada slot)   OK
		22) Ba� do Carlos 		 0x2574 at� 0x2673 (Levando em conta os 32 Bits de cada slot)   OK
		@) 0x2674-0x2674 																		OK
		23) Arma atual do Carlos 0x2675			   (8 Bits, apenas a ID da arma)				OK
		24) Sidepack do Carlos   0x2676 														OK
		25) Roupa da Jill 		 0x28D4															OK
		26) Final do Save 		 0x28D5 at� 0x3FFF												OK
																								 |
		~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
	*/
	
	// Headers

	"save_HEADER": 		   [0, 1024], // Header do save (SC..)
	"save_END": 	   [4522, 16384], // Final do save

    /*
		Espa�os n�o mapeados:

		Esses espa�os cont�m posi��es hex com outras variaveis que n�o foram mapeadas / desobertas atrav�s de engenharia reversa.
		Eles ser�o preservados para poder reconstruir o arquivo de save inteiro novamente.
    */

    "0x2204-0x2207": 	[1032, 1040], // Espa�o entre IGT e Dificuldade
    "0x2209-0x220D":    [1042, 1052], // Espa�o entre Dificuldade e Posi��o X
    "0x2210-0x2211": 	[1056, 1060], // Espa�o entre Posi��o X e Posi��o Y
    "0x2217-0x2217": 	[1070, 1072], // Espa�o entre Epilogos e N� de Saves
    "0x2219-0x2219": 	[1074, 1076], // Espa�o entre N� de Saves e Poison
    "0x221C-0x224D":    [1080, 1180], // Espa�o entre Nome da sala de save e Local da cidade
    "0x224F-0x224F": 	[1182, 1184], // Espa�o entre Local da cidade e Room / Event
    "0x2251-0x225D":    [1186, 1212], // Espa�o entre Room Event e Personagem atual
    "0x225F-0x23FE":    [1214, 2046], // Espa�o entre Personagem Atual e Mapas A
    "0x2400-0x2402": 	[2048, 2054], // Espa�o entre Mapas A e Mapas B
    "0x240A-0x240B": 	[2068, 2072], // Espa�o entre Files e invent�rio da Jill
    "0x2534-0x2534": 	[2664, 2666], // Espa�o entre Ba� da jill e arma atual da jill
    "0x2537-0x254B":    [2670, 2712], // Espa�o entre Sidepack da Jill e Invent�rio do carlos
    "0x2674-0x2674": 	[3304, 3306], // Espa�o entre o Ba� do carlos e a arma atual do carlos
    "0x2677-0x28D3": 	[3310, 4520], // Espa�o entre arma atual do carlos at� a roupa atual da Jill

    // Outras variaveis

	"jillInvent-1":		[2072, 2080], // Invent�rio da Jill   - Slot 01  - 0x240C
	"jillInvent-2":		[2080, 2088], // Invent�rio da Jill   - Slot 02  - 0x2410
	"jillInvent-3":		[2088, 2096], // Invent�rio da Jill   - Slot 03  - 0x2414
	"jillInvent-4":		[2096, 2104], // Invent�rio da Jill   - Slot 04  - 0x2418
	"jillInvent-5":		[2104, 2112], // Invent�rio da Jill   - Slot 05  - 0x241C
	"jillInvent-6":		[2112, 2120], // Invent�rio da Jill   - Slot 06  - 0x2420
	"jillInvent-7":		[2120, 2128], // Invent�rio da Jill   - Slot 07  - 0x2424
	"jillInvent-8":		[2128, 2136], // Invent�rio da Jill   - Slot 08  - 0x2428
	"jillInvent-9":		[2136, 2144], // Invent�rio da Jill   - Slot 09  - 0x242C
	"jillInvent-10":	[2144, 2152], // Invent�rio da Jill   - Slot 10  - 0x2430
	"carlosInvent-1":   [2712, 2720], // Invent�rio do Carlos - Slot 01  - 0x254C
	"carlosInvent-2":   [2720, 2728], // Invent�rio do Carlos - Slot 02  - 0x2550
	"carlosInvent-3":   [2728, 2736], // Invent�rio do Carlos - Slot 03  - 0x2554
	"carlosInvent-4":   [2736, 2744], // Invent�rio do Carlos - Slot 04  - 0x2558
	"carlosInvent-5":   [2744, 2752], // Invent�rio do Carlos - Slot 05  - 0x255c
	"carlosInvent-6":   [2752, 2760], // Invent�rio do Carlos - Slot 06  - 0x2560
	"carlosInvent-7":   [2760, 2768], // Invent�rio do Carlos - Slot 07  - 0x2564
	"carlosInvent-8":   [2768, 2776], // Invent�rio do Carlos - Slot 08  - 0x2568
	"carlosInvent-9":   [2776, 2784], // Invent�rio do Carlos - Slot 09  - 0x256C
	"carlosInvent-10":  [2784, 2792], // Invent�rio do Carlos - Slot 10  - 0x2570
	"leveldificuldade": [1040, 1042], // Level de Dificuldade 			 - 0x2208
	"totalSaves": 		[1072, 1074], // Total de saves 				 - 0x2218
	"localSave": 		[1078, 1080], // ID da sala de save 			 - 0x221B
	"epilogos": 		[1068, 1070], // Total de Ep�logos desbloqueados - 0x2216
	"localCidade": 		[1180, 1182], // Local da cidade aonde foi salvo - 0x224E
	"roupaAtual": 		[4520, 4522], // Roupa atual 					 - 0x28D4
	"characterAtual": 	[1212, 1214], // Personagem atual 				 - 0x225E
	"jillArma": 		[2666, 2668], // Arma atual da jill 			 - 0x2535
	"carlosArma": 		[3306, 3308], // Arma atual do carlos 			 - 0x2675
	"jill-side": 		[2668, 2670], // Sidepack da Jill 				 - 0x2536
	"carlos-side": 		[3308, 3310], // Sidepack do Carlos 			 - 0x2676
	"characterPoison":  [1076, 1078], // Personagem est� com poison 	 - 0x221A
	"room_event": 		[1184, 1186], // Room / Event 					 - 0x2250
	
	"mapas-a": 			[2046, 2048], // Mapas do Game (Primeira Hex) 	 - 0x23FF
	"mapas-b": 			[2054, 2056], // Mapas do Game (Segunda Hex)	 - 0x2403

	"jill_files": 		[2056, 2068], // Files do game 					 - 0x2404 at� 0x2409
	"pos-X":   			[1052, 1056], // Posi��o X no mapa atual 		 - 0x220E at� 0x221F
	"pos-Y":            [1060, 1064], // Posi��o Y no mapa atual 		 - 0x2212 at� 0x2213
	"IGT": 				[1024, 1032], // IGT (In-Game Time) Tempo Atual  - 0x2200 at� 0x2203
	"characterHP":    	[1064, 1068], // HP do personagem atual. 		 - 0x2214 at� 0x2215
	"j-box": 			[2152, 2656], // Ba� da Jill 					 - 0x2535 at� 0x2530
	"c-box": 			[2792, 3296]  // Ba� do Carlos 					 - 0x2574 at� 0x2580
}