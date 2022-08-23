const { joinHandler } = require('../handlers/joinHandler.js');
const { createApiRouter } = require('./apiRouter.js');
const { hostLobbyHandler } = require('../handlers/hostLobbyHandler.js');
const { injectGame } = require('../handlers/injectGame.js');
const { leaveLobbyHandler } = require('../handlers/leaveLobbyHandler.js');
const { logoutHandler } = require('../handlers/logout.js');
const { NOT_FOUND } = require('../utils/pages.js');
const { takeLoan, payLoan } = require('../handlers/loanHandlers.js');
const { serveCard, cardActionsHandler, resetTransaction } = require('../handlers/cardHandlers.js');

const {
  gameBoardHandler,
  guestLobbyHandler,
  serveMainMenu,
  showProfessionHandler,
  startGameHandler,
  cancelGameHandler,
  hostHandler,
  removeGameIdHandler,
  getUserInfoHandler,
  rollDiceHandler,
  changeTurnHandler,
  reRollHandler,
} = require('../handlers/gameHandlers.js');

const createGameRouter = (router) => {
  router.use(injectGame());
  router.get('/', serveMainMenu);
  router.get('/host', hostHandler);
  router.get('/start-game', startGameHandler);
  router.post('/join', joinHandler);
  router.use('/api', createApiRouter());
  router.get('/host-lobby', hostLobbyHandler);
  router.get('/guest-lobby', guestLobbyHandler);
  router.get('/leave-lobby', leaveLobbyHandler);
  router.get('/cancel-game', cancelGameHandler);
  router.get('/get-user-info', getUserInfoHandler);
  router.get('/roll-dice/:die', rollDiceHandler);
  router.get('/reroll', reRollHandler);
  router.get('/change-turn', changeTurnHandler);
  router.get('/show-profession', showProfessionHandler);
  router.get('/game-board', gameBoardHandler);
  router.get('/remove-gameid', removeGameIdHandler);
  router.use('/logout', logoutHandler);
  router.post('/card/card-action', cardActionsHandler);
  router.get('/card/type', serveCard);
  router.get('/card/reset-transaction', resetTransaction);
  router.post('/loan/take', takeLoan);
  router.post('/loan/pay', payLoan);
  router.use((req, res) => {
    res.status(404);
    res.end(NOT_FOUND);
  });
  return router;
};

module.exports = { createGameRouter };
