const { json } = require("body-parser");

class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            },
        }:{}

        // console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryStrCopy = {...this.queryStr}
        //Removing some field for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryStrCopy[key]);

        // Filter for the Price & Rating because price is comes in the range
        let queryStrs = JSON.stringify(queryStrCopy);
        queryStrs = queryStrs.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);//gt and lt is not work in mongobd directly so we have to change with $gt and $lt
        
        this.query = this.query.find(JSON.parse(queryStrs));
        return this;
    }
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1; // 50 we have products - 10product per page so here is 5 pages
        
        const skip = resultPerPage*(currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;

    }

}


module.exports = ApiFeatures