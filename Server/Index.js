import Express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config()

const app = Express();

const PORT = process.env.PORT || 3000;

app.use(Express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});