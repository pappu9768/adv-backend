import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/user.routes.js';
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


app.use('/api/v1/auth/',routes)





export { app }