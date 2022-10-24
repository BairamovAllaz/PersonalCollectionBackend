const HomeService = require("../Services/HomeService");
class HomeController{
    static async apiGetLargestCollections(req,res,next) { 
        const response = await HomeService.GetLargestCollections();
        res.send(response);
    }

    static async apiGetItemsByDate(req,res,next) { 
        const response = await HomeService.GetItemsByDate();
        res.send(response);
    }
}
module.exports = HomeController;