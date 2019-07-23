const chai = require('chai');
const mongoose = require('mongoose');
const expect = chai.expect;
const {app, runServer, closeServer} = require('../server');
const {GetData} = require("../classes/getData");
const {compareData} = require('./compareData');
const {DATABASE_URL,URLUS,USERK,USERP} = require('../config');

describe('Test Old data with Shopify data',function(){
	before(function(){
		return runServer(DATABASE_URL);
	});

	after(function() {
	    return closeServer();
	});

	it('should start server',function(done){
		expect(1+1).to.equal(2);
		done();
	});

	it('should get data',function(){
		this.timeout(20000);
		let getData = new GetData(URLUS,USERK,USERP);
		return getData.getData([],0)

		.then(productData => {
			expect(productData).to.have.lengthOf.at.least(1);
		})
		.catch(err => {
			console.log(err)
		})
	});

	it('all data should match',function(){
		this.timeout(90000);
		let getData = new GetData(URLUS,USERK,USERP);
		return getData.getData([],0)

		.then(productData => {
			return compareData(productData,0,[])
		})

		.then(results => {
			console.log("=========================results from compare data: ", results.length);
			expect(results).to.have.lengthOf(0);
		})

		.catch(err => {
			console.log("Error testing: ",err);
		});
	});

});