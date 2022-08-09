const { hostHandler } = require('../handlers/hostHandler.js');
const { serveMainMenu } = require('../handlers/serveMainMenu.js');
const { joinHandler } = require('../handlers/joinHandler.js');
const { createApiRouter } = require('./apiRouter.js');
const { hostLobbyHandler } = require('../handlers/hostLobbyHandler.js');
const { guestLobbyHandler } = require('../handlers/guestLobbyHandler.js');

const createGameRouter = (router) => {
  router.get('/', serveMainMenu);
  
  router.use((req, res, next) => {
    const gameId = 123;
    const game = {
      gameId,
      colors: ['lightblue', 'green', 'orange', 'red', 'brown', 'yellow'],
      players: []
    };
    req.gameId = game.gameId;
    req.game = game;
    next();
  });

  router.get('/host', hostHandler);
  router.post('/join', joinHandler);
  router.use('/api', createApiRouter());
  router.get('/host-lobby', hostLobbyHandler);
  router.get('/guest-lobby', guestLobbyHandler);

  
  router.use(['/login', '/register'], (req, res) => res.redirect('/'));
  return router;
};

module.exports = { createGameRouter };
