import express from 'express';
import {
  createPassword,
  getPasswords,
  getPassword,
  updatePassword,
  deletePassword
} from '../controllers/passwordController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getPasswords)
  .post(createPassword);

router.route('/:id')
  .get(getPassword)
  .put(updatePassword)
  .delete(deletePassword);

export default router;
