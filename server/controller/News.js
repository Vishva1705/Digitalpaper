const News = require ("../Models/newsModel");

export const getAllNews = async (req, res) => {
    try {
        const news = await News.findAll();
        res.json(news);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getNewsById = async (req, res) => {
    try {
        const news = await News.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(news[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createNews = async (req, res) => {
    try {
        await News.create(req.body);
        res.json({
            "message": "Product Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}




   
