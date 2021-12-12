import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import express from 'express'
import { Server } from "socket.io";
import { createServer } from "http";
import Bus from "./models/busModel.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import studentRoutes from "./routes/admin/studentRoutes.js";
import busRoutes from "./routes/admin/busRoutes.js";
import driverRoutes from "./routes/admin/driverRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import adminRoutesSuperAdmin from './routes/superAdmin/adminRoutes.js'
import routeRoutes from "./routes/admin/routeRoutes.js";
import superAdminRoutes from "./routes/superAdmin/superAdminRoutes.js";
import licenseRoutes from "./routes/superAdmin/licenseRoutes.js";
import paymentRoutes from "./routes/superAdmin/paymentRoutes.js";
import maintenanceRoutes from "./routes/admin/maintenanceRoutes.js";
import fuelRoutes from './routes/admin/fuelRoutes.js'
import complaintRoutes from "./routes/admin/complaintRoutes.js";
import bodyParser from 'body-parser'



const app =express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
connectDB();

io.on("connection",socket=>{

    Bus.watch().on('change',(change)=>{
        io.sockets.emit("track_bus_data_changed",change)
        // io.to(change.documentKey._id).emit('changes',change.fullDocument)
    })

    socket.on("initial_track_bus_data", async () => {
        const buses=await Bus.find({})
        io.sockets.emit("initial_track_bus_data",buses)
    });

    console.log("socket connected")
})


app.get('/',(req,res)=>{
res.send('API is running')
})

app.use('/admin/',studentRoutes)
app.use('/admin/',busRoutes)
app.use('/admin/',driverRoutes)
app.use('/admin/',adminRoutes)
app.use('/admin/',routeRoutes)
app.use('/admin/',maintenanceRoutes)
app.use('/admin/',fuelRoutes)
app.use('/admin/',complaintRoutes)
app.use('/superadmin/',superAdminRoutes)
app.use('/superadmin/',licenseRoutes)
app.use('/superadmin/',adminRoutesSuperAdmin)
app.use('/superadmin/',paymentRoutes)




// notFound();
// errorHandler();

const PORT=process.env.PORT || 5000
httpServer.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`));
