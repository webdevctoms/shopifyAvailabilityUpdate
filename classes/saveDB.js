function OldData(productData,model){
	this.productData = productData;
	this.model = model;
}

OldData.prototype.saveData = function(productIndex) {
	//save one product
	let promise = new Promise((resolve,reject) => {
		
		if(productIndex !== this.productData.length){
			console.log("===========save product data: ",productIndex,this.productData.length,this.productData[productIndex].title);
			return this.model.create({
				product_id:this.productData[productIndex].id,
				product_title: this.productData[productIndex].title,
				published_at:this.productData[productIndex].published_at
			})

			.then(data => {
				resolve(this.saveData(productIndex + 1));
			})

			.catch(err => {
				console.log("===========Error saving products: ",productIndex,this.productData[productIndex].title);
				console.log(err);
				if(err.errmsg.includes("E11000")){
					resolve(this.saveData(productIndex + 1));
				}
				else{
					reject(err);
				}		
			});
		}
		else{
			resolve("Done");
		}
		
	});

	return promise;
};

module.exports = {OldData};