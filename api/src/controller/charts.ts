import {Request, Response} from "express";
import pool from "../../config/db";


const getPieChart = async(req: any, res: any) => {
    try {
        const chartData = await pool.query('SELECT source,COUNT(*) FROM click_check GROUP BY source;');
        res.json(chartData.rows);
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log('unexpected error', err);
        }
    }
}

const postPieChart = async(req: any, res:any) => {
    try {
        const { startDate, endDate } = req.body;
        console.log(req.body);
        const start = startDate.slice(0,10);
        const end = endDate.slice(0,10);
        console.log(start, end);
        const rangeData = await pool.query("SELECT source,COUNT(*) FROM click_check where date_of_application>= $1 and date_of_application <= $2 GROUP BY source;",
        [start, end]);
        console.log(rangeData.rows);
        res.json(rangeData.rows);
        
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log('Unexpeced error', err);
        }
    }
}

const getRadialChart = async(req: any, res: any) => {
    try {
        const chartData = await pool.query('SELECT COUNT(*) FILTER (WHERE kyc_avlb is TRUE) as true, COUNT(*) FILTER (where kyc_avlb is null OR kyc_avlb is false) AS false FROM click_check;');
        res.json(chartData.rows);
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log('unexpected error', err);
        }
    }
}

const postRadialChart = async(req: any, res:any) => {
    try {
        const { startDate, endDate } = req.body;
        console.log(req.body);
        const start = startDate.slice(0,10);
        const end = endDate.slice(0,10);
        console.log(start, end);
        const rangeData = await pool.query("SELECT COUNT(*) FILTER (WHERE kyc_avlb is TRUE) as true, COUNT(*) FILTER (where kyc_avlb is null OR kyc_avlb is false) AS false FROM click_check where date_of_application>= $1 and date_of_application <= $2;",
        [start, end]);
        console.log(rangeData.rows);
        res.json(rangeData.rows);
        
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log('Unexpeced error', err);
        }
    }
}

const getAreaChart = async(req: any, res: any) => {
    try {
        const chartData = await pool.query(' SELECT date_of_application, COUNT(*) FROM click_check GROUP BY date_of_application order by date_of_application asc;');
        res.json(chartData.rows);
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log('unexpected error', err);
        }
    }
}

const postAreaChart = async(req: any, res:any) =>{
    try {
        const { startDate, endDate } = req.body;
        console.log(req.body);
        const start = startDate.slice(0,10);
        const end = endDate.slice(0,10);
        console.log(start, end);
        const rangeData = await pool.query("SELECT date_of_application, COUNT(*) FROM click_check where date_of_application>= $1 and date_of_application <= $2 GROUP BY date_of_application order by date_of_application asc;",
        [start, end]);
        console.log(rangeData.rows);
        res.json(rangeData.rows);
        
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log('Unexpeced error', err);
        }
    }
}

const getBarChart = async(req: any, res: any) => {
    try {
        const chartData = await pool.query("SELECT completed,COUNT(*) FROM click_check where completed != 'Match' GROUP BY completed;");
        res.json(chartData.rows);
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log('unexpected error', err);
        }
    }
}

const postBarChart = async(req: any, res:any) => {
    try {
        const { startDate, endDate } = req.body;
        console.log(req.body);
        const start = startDate.slice(0,10);
        const end = endDate.slice(0,10);
        console.log(start, end);
        const rangeData = await pool.query("SELECT completed,COUNT(*) FROM click_check where completed != 'Match' and date_of_application>= $1 and date_of_application <= $2 GROUP BY completed;",
        [start, end]);
        console.log(rangeData.rows);
        res.json(rangeData.rows);
        
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log('Unexpeced error', err);
        }
    }
}

export {getPieChart, postPieChart, getRadialChart, postRadialChart, getAreaChart, postAreaChart, getBarChart, postBarChart};

