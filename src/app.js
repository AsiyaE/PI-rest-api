import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile  from "../swagger_output.json" with { type: "json" };
import routes from "./routes.js";

const router = express.Router();
const app = express();
const PORT =8080;

app.use(express.json());
app.use('/', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    console.log(err.stack);
    res.status(statusCode).send({ message: err.message });
});

app.listen(PORT, ()=>{
    console.log(`Server is working on port ${PORT}`);

    routes(app);

});