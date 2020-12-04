require('./initializers/requirements');

const app = express();
const server = app.listen(config.port);

expressHandler(app);
socketHandler(server);