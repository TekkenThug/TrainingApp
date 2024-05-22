import express from "express";
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";

import { AppDataSource } from "@/database/index.ts";
import router from "@/routes/v1/index.ts";

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

const init = async () => {
    try {
        await AppDataSource.initialize();

        app.listen(PORT, () => {
            console.log(`Server is started on port: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

init();

