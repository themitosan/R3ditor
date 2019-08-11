# R3ditor
Um editor de arquivos escrito em js para realizar estudos de engenharia reversa no game Resident Evil 3.

## Como instalar
- Faça o download da versão mais recente do Node-Webkit e extraia o mesmo em uma pasta de sua preferência<br>(Clique <a href="http://nwjs.io" target="_blank">aqui</a> para ir até a pagina)

- Baixe o conteúdo principal desse repositório e extraia e coloque todos os arquivos na mesma pasta que você extraiu o Node-Webkit (o arquivo "package.json" deve estar na mesma pasta que o executável "nw.exe").

- Abra o programa executando o arquivo "nw.exe".

## Arquivos Suportados

### Bu00.sav (Saves) [wip]
Você pode alterar diversos aspectos do seu save, como:

- HP
- Alterar IGT
- Alterar Inventários
- Alterar baús
- Personagem atual
- Status de envenenamento
- Sidepack (Jill e Carlos)
- Arma atual
- Dificuldade
- Roupa
- Quantidade de Saves
- Epílogos Desbloqueados

Em Breve:

- Mapas Obtidos
- Files Obtidos

#### Importante
Todas as mudanças que você fizer serão automáticamente aplicadas ao seu save.<br>
Caso você queira recuperar seu save, abra a pasta "backup" e selecione um arquivo de backup.<br>
Ao selecionar, cole o mesmo na pasta aonde está o executável do game e renomeie o arquivo de backup para "Bu00.sav"

### Arquivos de mensagem (.msg) [wip]
Você pode visualizar / editar as mensagens internas do game carregando arquivos .msg ou usando o campo "Hex Input".

Note que você precisa usar um editor hexadecimal ou extrair os arquivos usando o programa <a href="https://www.romhacking.net/utilities/1019/" target="_blank">BioFAT</a> para poder visualizar as mensagens.

### Arquivos de mapas (.rdt) [EXTREME WIP]
Por enquanto você pode visualizar quais itens, files ou mapas estão presentes dentro do arquivo, sem poder modificar.<br><br>
Você pode ver como que está a lista de compatibilidade dos mapas visualizando <a href="https://docs.google.com/spreadsheets/d/1HviJVXH_3NpgZEdMI1Cdplyqqy3IUm92QJE5c7CF1_w" target="_blank">essa tabela</a>.<br><br>
Espere por melhorias de compatibilidade e mais funcionalidades em breve!
