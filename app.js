import express from "express";
import cors from "cors";
import helmet from "helmet";
            

const app = express();
const port = 3000;


const corsOptions = {
  origin: (origin, callback) => {
    if (["http://localhost:5173"].includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());


                 


app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
