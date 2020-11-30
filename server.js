const { NativeError } = require('mongoose');
const expressHandler = require('./express-handler');
const socketHandler = require('./socket-handler');

require('./initializers/requirements');

const app = express();
const server = app.listen(config.port);

expressHandler(app);
socketHandler(server);