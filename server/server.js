import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())
await connectDB()
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req,res)=>{
    console.log("ROOT HIT");
    res.send("API WORKING");
})

app.listen(PORT, ()=> console.log('server running on port '+ PORT));
console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Missing");
