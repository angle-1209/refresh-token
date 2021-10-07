import { Router } from 'express';
import { homePage } from '../controllers/PagesController.js';
import { usersRegistration } from '../controllers/ApiControllers.js';

const router = Router();
router.get('/', homePage);

router.post('/api/users', usersRegistration);
export default router;
