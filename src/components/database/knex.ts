import config from "../../../knexfile";
import knex from "knex";
import { Env } from "../../../environment";

const ENV = (process.env.ENVIRONMENT as Env) ?? Env.development;

export default knex(config[ENV]);
