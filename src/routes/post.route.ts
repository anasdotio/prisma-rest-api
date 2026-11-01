import { Router } from "express";
import * as postController from '../controllers/post.controller.js';
const router: Router = Router();

router.get('/' ,  postController.getAllPosts);
router.get('/:id' , postController.getPostById);
router.post('/' , postController.createPost);

export default router;