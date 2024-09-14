const express = require("express");
const ResponseHandler = require("./utils/responseHandler");
const { StatusCodes } = require("http-status-codes");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
let morgan = require("morgan");
let bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.js");
const { sequelize } = require("./models");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

//CORS Enable
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

//Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Swagger Initialization
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
const clientRoutes = require("./routes/clientRoutes.js");
app.use("/api/v1/clients", clientRoutes);

const helperRoutes = require("./routes/helperRoutes.js");
app.use("/api/v1/helpers", helperRoutes);
const clientHelperRoutes = require("./routes/matchingRoutes.js");
app.use("/api/v1/client-helpers", clientHelperRoutes);

app.get("/", (req, res) => {
  res
    .status(StatusCodes.OK)
    .json(ResponseHandler.success("Hello from Take-Home API"));
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected");
});
