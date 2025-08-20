import dotenv from 'dotenv';

dotenv.config({path: `.env.${process.env.NODE_ENV || `development`}.local`}); //switching between development and production 

export const {PORT, NODE_ENV, DB_URI} = process.env; 