function SetAvailable(productData){
	/*
	this.vendorMap = {
		V0811:'V0811',
		V0106:'V0106',
		V1391:'V1391',
		V0111:'V0111',
		V0814:'V0814',
		V0115:'V0115',
		V0112:'V0112',
		V0114:'V0114',
		V1100:'V1100',
		V0181:'V0181',
		V0125:'V0125',
		V0526:'V0526',
		V1063:'V1063',
		V0104:'V0104',
		V0116:'V0116',
		V0162:'V0162'
	};
	*/
	this.vendorMap = [
		'V0811',
		'V0106',
		'V1391',
		'V0111',
		'V0814',
		'V0115',
		'V0112',
		'V0114',
		'V1100',
		'V0181',
		'V0125',
		'V0526',
		'V1063',
		'V0104',
		'V0116',
		'V0162'
	];
	this.productData = productData;
}
//change published at data
SetAvailable.prototype.convertData = function() {
	for(let i = 0;i < this.productData.length;i++){
		for(let k = 0;k < this.vendorMap.length;k++){
			if(this.productData[i].vendor.includes(this.vendorMap[k])){
				this.productData[i].published_at = null;
				break;
			}
		}
	}

	return this.productData;
};

module.exports = {SetAvailable};