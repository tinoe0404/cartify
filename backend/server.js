import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'; // ✅ correct now
import productRoutes from './routes/product.route.js'; 
import cartRoutes from './routes/cart.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  connectDB();
});


