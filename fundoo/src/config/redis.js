import { createClient } from "redis";
import logger from "./logger";

export const client = createClient();

const redisClient = async () => {
    try {
        await client.connect();
        logger.info('Connected to the redis database. ');
    }catch (error) {
        logger.error('Could not connect to the redis database.', error);
    }
}

export default redisClient
