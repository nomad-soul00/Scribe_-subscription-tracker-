import {Router} from 'express';
import { getAllUsers, getUser } from '../controllers/user.controller.js';

import authorize from '../middlewares/auth.middleware.js'; 
import errorMiddleWare from '../middlewares/error.middleware.js';

const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id',authorize, getUser);

userRouter.post('/', (req,res)=>{
    res.send({
        title: 'Create a new Users'
    })
});

userRouter.put('/:id', (req,res)=>{
    res.send({
        title: 'Update Users'
    })
});

userRouter.delete('/:id', (req,res)=>{
    res.send({
        title: 'Delete Users'
    })
});

export default userRouter;