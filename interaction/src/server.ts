import App from '@/app';
import { InteractionRoutes } from '@routes/interaction.routes';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new InteractionRoutes()]);

app.listen();
