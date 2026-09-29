import config from './config/config.js'
import app from "./app/app.js";
import connectDB from './config/db.js';
const PORT = config.PORT || 5000

await connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on http:localhost:${PORT}`)
})