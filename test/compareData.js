const {Status} = require("../models/statusModel");

function compareProducts(shopifyProduct,product){
	if(shopifyProduct.id != product.product_id || shopifyProduct.title != product.product_title || shopifyProduct.published_at != product.published_at){
		console.log("=============================found error===============================: ",shopifyProduct.title);
		if(shopifyProduct.id != product.product_id){
			console.log("=============================id error===============================: ",shopifyProduct.id,product.product_id);
		}
		if(shopifyProduct.title != product.product_title){
			console.log("=============================title error===============================: ",shopifyProduct.title,product.product_title);
		}
		if(shopifyProduct.published_at != product.published_at){
			console.log("=============================Published error===============================: ",shopifyProduct.published_at,product.product_published_at);
		}

		return false;
	}

	return true;
}

function compareData(shopifyProducts,index,results){
	var promise = new Promise((resolve,reject) => {
		
		if(index < shopifyProducts.length){
			console.log("compare data test index & shopifyProducts.length: ",index,shopifyProducts.length,shopifyProducts[index].title);
			const productID = shopifyProducts[index].id;
			return Status.find({'product_id':productID})

			.then(product => {
				const productCompare = compareProducts(shopifyProducts[index],product[0]);
				if(!productCompare){
					results.push({
						shopifyProduct : shopifyProducts[index],
						prodcutDB : product
					});

					resolve(compareData(shopifyProducts,index + 1,results));
				}
				else{
					resolve(compareData(shopifyProducts,index + 1,results));
				}
			})

			.catch(err => {
				console.log("Error comparing data: ",err);
				resolve(err)
			});
		}
		else{
			resolve(results);
		}
	});

	return promise;
}

module.exports = {compareData};