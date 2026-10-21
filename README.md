# AgriX Show

Treinamento da equipe no estilo Show do Milhão, com as perguntas dos manuais do AgriX (ACM, Compras, Estoque e Vendas).

**Endereço do jogo:** https://dhiegocosta14-beep.github.io/show-do-agrix/

## Como funciona
- **Login com Google.** Quem entra pela primeira vez fica *aguardando aprovação*. O gestor aprova no **Painel do gestor**.
- **Modos:** Show (valendo prêmios), Treino (nota por módulo e certificado), Revanche (só as que errou), Grupo (mesma tela) e Ao vivo (telão + celulares).
- **Ranking mensal:** 1º lugar ganha um café da manhã na Padaria Moinho; 2º lugar ganha um Day Off. O campeão do mês passado fica em destaque na tela inicial.

## Configuração (uma vez só)
1. Crie um projeto no [Firebase](https://console.firebase.google.com) e ative **Authentication → Google**.
2. Em **Authentication → Configurações → Domínios autorizados**, adicione `dhiegocosta14-beep.github.io`.
3. Crie o **Firestore Database** (São Paulo, modo produção) e cole o conteúdo de `firestore.rules` em **Regras → Publicar**.
4. Copie a configuração do app Web para `docs/config.js` (variável `FIREBASE_CONFIG`).

## Arquivos
- `docs/index.html` — o jogo.
- `docs/config.js` — configuração do Firebase, gestores e domínio liberado.
- `docs/telas/` — imagens das telas tiradas dos manuais.
- `firestore.rules` — regras de segurança do banco.
