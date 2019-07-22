const express = require("express");
const router = express.Router();
const {checkKey} = require("../tools/checkKey");
//const {SaveToShopify} = require("../classes/saveToShopify");
const {GetData} = require("../classes/getData");
const {Status} = require("../models/statusModel");
const {URLUS,USERK,USERP} = require('../config');

router.get("/old",checkKey,(req,res) =>{

	let getData = new GetData(URLUS,USERK,USERP);
	return getData.getData([],0)

	.then(productData => {
		console.log("Product data length: ",productData.length);
		return res.json({
			status:200,
			data:'Done'
		});
	})

	.catch(err=>{
		console.log("Error saving old data: ",err);
		return res.json({
			status:500,
			data:err
		});
	})
});

module.exports = {router};