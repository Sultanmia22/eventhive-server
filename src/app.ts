import express, { type Express, type Request, type Response } from 'express';
import cors from "cors"
import { initDB } from './db';
const app: Express = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],       
  credentials: true              
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded())


// Data base Function here
initDB()


// Root API end point
app.get('/', (req: Request, res: Response) => {
  res.send('EventHive Server is Running...');
});

export default app