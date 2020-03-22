import { Router } from "express";
import Config from "@/Inputs/HTTP/Config";
import Routes from "./Routes/api";

const router = Router();

router.use(Config.API_PREFIX, Routes);

export default () => router;
