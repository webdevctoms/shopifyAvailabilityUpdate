const express = require("express");
const router = express.Router();
const {checkKey} = require("../tools/checkKey");
const {OldData} = require("../classes/saveDB");
const {GetData} = require("../classes/getData");
const {Status} = require("../models/statusModel");
const {SaveToShopify} = require('../classes/saveToShopify');
const {URLUS,USERK,USERP} = require('../config');

router.get("/old",checkKey,(req,res) =>{

	let getData = new GetData(URLUS,USERK,USERP);
	return getData.getData([],0)

	.then(productData => {
		let oldData = new OldData(productData,Status);

		return oldData.saveData(0)
	})

	.then(message => {
		return res.json({
			status:200,
			data:message
		});
	})

	.catch(err=>{
		console.log("Error saving old data: ",err);
		return res.json({
			status:501,
			data:err
		});
	});
});
//save backup
router.get("/shopifyBackup",checkKey,(req,res) =>{

	let getData = new GetData(URLUS,USERK,USERP);
	return getData.getData([],0)

	.then(productData => { 

		let saveToShopify = new SaveToShopify(productData,URLUS,USERK,USERP);

		return saveToShopify.saveData(0,{})
	})

	.then(message => {
		return res.json({
			status:200,
			data:message
		});
	})

	.catch(err=>{
		console.log("Error saving old data: ",err);
		return res.json({
			status:501,
			data:err
		});
	});
});

router.get("/shopifyUpdate",checkKey,(req,res) =>{

	return Status.find({})

	.then(productData => {
		let saveToShopify = new SaveToShopify(productData,URLUS,USERK,USERP);

		return saveToShopify.saveData(0,{})
	})

	.then(message => {
		return res.json({
			status:200,
			data:message
		});
	})

	.catch(err=>{
		console.log("Error saving old data: ",err);
		return res.json({
			status:501,
			data:err
		});
	});
});

module.exports = {router};