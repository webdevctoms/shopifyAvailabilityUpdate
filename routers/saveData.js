const express = require("express");
const router = express.Router();
const {checkKey} = require("../tools/checkKey");
//const {SaveToShopify} = require("../classes/saveToShopify");
const {Status} = require("../models/statusModel");
const {URLUS,USERK,USERP} = require('../config');

router.get("/old",checkKey,(req,res) =>{
	let productID = req.query.productid;
	return Status.create({
		product_id:'1234',
		product_title:'test',
		published_at:'5678'
	})

	.then(product => {
		return res.json({
			status:200,
			data:product
		});
	})

	.then(product => {
		//console.log(product.serialize());
		
	})
	.catch(err=>{
		console.log("Error getting single data: ",err);
	})
});

module.exports = {router};