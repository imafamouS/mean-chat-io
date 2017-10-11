import App from './server/apps/app';
import Config from './server/config/config';
import DatabaseManager from './server/databases/manager.database.client';

const databaseClient = DatabaseManager.getClient(Config.database_client);

App.listen(App.get('port'), () => {
	databaseClient.openConnection();
    console.log(`Application run at port ${App.get('port')}`);
});
