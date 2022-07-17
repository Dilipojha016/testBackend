
const itemModel = require("../models/item");
const util = require("../util")
module.exports = {
    addItem : async(body)=>{
        console.log(body)
        const result = await itemModel.create(body);
        return result;
    },
    uploadImage : async(req,res)=>{
        response.statusCode = routes.SUCCESSCODE;
        response.message = "User created Successfully!";
        response.data = req.file;
        return routes.SendResponse(res);
    },
    getItems : async(req,res)=>{
        const page = {
            pageNo: req.query.pageNo,
            limit: req.query.limit
        }
        const paginationData = util.paginationData(page);

        const itemList = await itemModel.aggregate([
            {
                '$facet': {
                    totalCount: [{ $count: 'count' }],
                    data: [{ $skip: paginationData.skip }, { $limit: paginationData.limit }]
                }
            }

        ])
        response.statusCode = routes.SUCCESSCODE;
        response.message = "Item list successfully.";
        response.data = itemList[0].data
        response.UserCount = itemList[0].totalCount[0] ? itemList[0].totalCount[0].count : 0;
        return routes.SendResponse(res);
    }

}
