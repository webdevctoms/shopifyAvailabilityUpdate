const mongoose = require('mongoose');

//main shcema
const statusSchema = mongoose.Schema({
	product_id:{type:String,required:true,unique:true},
	product_title:{type:String},
	published_at:{type:String}
});

statusSchema.methods.serialize = function(){
	return{
		product_id:this.product_id,
		product_title:this.product_title,
		published_at:this.published_at
	}
};

const Status = mongoose.model("Status",statusSchema);
module.exports = {Status};