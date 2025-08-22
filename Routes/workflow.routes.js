import {Router} from 'express';
import { sendRemainders } from '../controllers/workflow.controller';

const workflowRouter = Router();

workflowRouter.get('/', sendRemainders);

export default workflowRouter;