import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import routes from './apps/routes/Routes.js';

const app = express();
const PORT = process.env.PORT || 3030;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(expressLayouts);

const __filname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);

app.use('/static', express.static(path.join(__dirname, 'apps/views/public')));
app.use(cookieParser());
app.use(routes);

app.set('views', path.join(__dirname, 'apps/views/src'));
app.set('view engine', 'ejs');
app.set('layout', path.join(__dirname, 'apps/views/src/layouts/main'));

app.listen(PORT, () => {
  console.log(`server running... on PORT ${PORT}`);
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('Database running...'))
    .catch((err) => console.log(`Failed to connect db reason ${err}`));
});
