import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const News = db.define('newss',{
    Date:{
        type: DataTypes.STRING
    },
    head_kicker:{
        type: DataTypes.STRING
    },
    head:{
        type: DataTypes.STRING
    },
    head_deck:{
        type: DataTypes.STRING
    },
    byline:{
        type: DataTypes.STRING
    },
    dateline:{
        type: DataTypes.STRING
    },
    body:{
        type: DataTypes.STRING
    },
    Image:{
        type: DataTypes.STRING
    },
    cutline:{
        type: DataTypes.STRING
    },
    subhead:{
        type: DataTypes.STRING
    },




},{
    freezeTableName: true
});
 
export default News;