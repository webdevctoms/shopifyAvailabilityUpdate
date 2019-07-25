const request = require('request');

function SaveToShopify(productData,url,user_k,user_p){
	this.productData = productData;
	this.url = url;
	this.user_k = user_k;
	this.user_p = user_p;
}

SaveToShopify.prototype.saveData = function(productIndex,vendorMap) {
	let promise = new Promise((resolve,reject) => {
		const productID = this.productData[productIndex].product_id ? this.productData[productIndex].product_id:this.productData[productIndex].id;
		const newUrl = this.url + "products/" + productID + ".json";
		console.log(newUrl);
		//cosnt vendor = 
		//const published = vendorMap[]
		const authKey = Buffer.from(this.user_k + ":" + this.user_p).toString('base64');
		const options = {
			url:newUrl,
			method:"PUT",
			headers:{
				"Authorization":"Basic " + authKey
			},
			json:{
				"product":{
					"published_at": this.productData[productIndex].published_at		
				}
			}
		};

		request(options,function(error,response,body){
			if(body.errors){
				console.log(body);
			}
			//console.log(body);
			//let parsedBody = JSON.parse(body);
			console.log("===============PUT data: ",productIndex,this.productData.length,this.productData[productIndex].product_title);
			if(productIndex < this.productData.length - 1){
				resolve(this.saveData(productIndex + 1,vendorMap));
			}
			else{
				console.log("final product update");
				resolve(body);
			}
			

		}.bind(this));

	});

	return promise;
};

module.exports = {SaveToShopify};