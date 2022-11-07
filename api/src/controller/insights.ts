import pool from "../../config/db";

const getInsights = async(req: any, res: any) => {
    try {
        const insightData = await pool.query("select COUNT(*) as total,COUNT(*) FILTER (WHERE date_of_application = '2022-01-07') as today, COUNT(*) FILTER (WHERE completed = 'Match') as match_count, COUNT(*) FILTER (WHERE completed = 'Match' AND click_check.completed_on::date = '2022-01-12') as match_today from click_check;");
        res.json(insightData.rows);
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
        else{
            console.log("Unexpected error", err);
        }
    }
}

export {getInsights};