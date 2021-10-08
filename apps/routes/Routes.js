import { Router } from 'express';
import { homePage, loginPage } from '../controllers/PagesController.js';
import { users, usersLogin, usersRegistration, usersRemove } from '../controllers/ApiControllers.js';
import { login } from '../controllers/index.js';
import auth from '../middleware/auth.js';

const router = Router();

// Pages
router.get('/', auth, homePage);
router.get('/login', loginPage);

// Rest API
router.post('/api/users/register', usersRegistration);
router.post('/api/users/login', usersLogin);
router.delete('/api/users/delete/:id', usersRemove);
router.get('/api/users', users);

// action API
router.post('/register');
router.post('/login', login);
export default router;
