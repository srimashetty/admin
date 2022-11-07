import pool from "../../config/db";
import {Request, Response} from "express";

const getDetails = async(req: any, res: any) => {
    try {
        const detailsData = await pool.query('SELECT * FROM click_check');
        res.json(detailsData.rows);
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log("Unexpected error", err);
        }
    }
}

const getDownloadData = async(req: any, res: any) => {
    try{
        const currentDate = '2022-01-07';
        // console.log("today "+ currentDate);
        const todayData = await pool.query("select id, log_uuid as UUID, source, date_of_application as Application_Date, live_img_aqc as live_image,(case when completed != 'Match' then 'Not Match' else completed end) as result from click_check where date_of_application = $1;", [currentDate]);
        res.json(todayData.rows);
    }
    catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log("Unexpected error", err);
        }
    }
}

const rangeReport = async(req: any, res: any) => {
    try
    {   const { startDate, endDate } = req.body;
        // console.log(startDate, endDate);
        const start = startDate.slice(0,10);
        const end = endDate.slice(0,10);
        console.log(start, end);
        // console.log(start, end);
        const rangeData = await pool.query("select * from click_check where date_of_application>= $1 and date_of_application <= $2;",
        [start, end]);
        // console.log(rangeData.rows);
        res.json(rangeData.rows);
    }
    catch(err){
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log("Unexpected error", err);
        }
    }
}

export {getDetails, getDownloadData, rangeReport};