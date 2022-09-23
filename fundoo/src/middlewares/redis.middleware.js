import {client} from "../config/redis";
import HttpStatus from 'http-status-codes';

export const redisCheck = async(req, res, next) => {
    const value = await client.get('getAllData');
    if(value!=null){
        res.status(200).json({
            code: 200,
            data: JSON.parse(value),
            message: "Successfully Fetched All Data from Redis"
        });
    }
    else{
        next();
    }
}
