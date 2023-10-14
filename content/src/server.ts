import App from '@/app';
import ContentRoutes from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new ContentRoutes()]);

app.listen();
