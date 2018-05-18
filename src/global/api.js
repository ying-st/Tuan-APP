//接口配置
//把全体接口封装在的前端配置文件（序号与接口文档一一对应），多个环境配置时可快速切换整站式的全部接口，不用逐个页面去改。
const config = require('../../config');

let url = {
    //staticPath:config.dev.staticPath,       //开发环境静态资源路径  
    staticPath: process.env.NODE_ENV !== 'development' ?  config.build.staticPath: config.dev.staticPath
};

//----------------请注意：如果正式环境，不需要本地json数据模拟，请删除以上代码和api中的模拟接口。----------------

export const api = {

    //'login':'http://localhost:80/dataJson/login.json',//ngxin
    'itemlist':url.staticPath+'dataJson/itemlist.json',//获取头部轮播数据
    'itemlist2':url.staticPath+'dataJson/itemlist2.json',
    'i_middlelist':url.staticPath+'dataJson/i_middlelist.json',//获取精选热门电影数据
    "i_likelist":url.staticPath+"dataJson/i_likelist.json",  //获取猜你喜欢数据
    "jm_likelist":url.staticPath+"dataJson/jm_likelist.json",  //获取江门猜你喜欢数据  
    "q_exclusivelist":url.staticPath+"dataJson/q_exclusivelist.json",  //获取专属优惠数据，获取精选数据
    "third_options":url.staticPath+"dataJson/option.json",    //获取Cascader 级联选择器的数据
    "search":url.staticPath+"dataJson/search_results.json",    //获取查询的商品的数据
    "goodInfo":url.staticPath+"dataJson/goodInfo.json",    //获取商品详情数据
    "orders":url.staticPath+"dataJson/orders.json",    //获取购买商品数据
    "City":url.staticPath+"dataJson/City.json",    //获取城市数据
    "mainCity":url.staticPath+"dataJson/mainCity.json",    //获取热门城市数据
    "evaluate":url.staticPath+"dataJson/evaluate.json",    //获取评论数据
    "pie":url.staticPath+"dataJson/pie.json",    //获取饼图中国数据
    "pie2":url.staticPath+"dataJson/pie2.json",    //获取饼图全球数据
    "bar":url.staticPath+"dataJson/bar.json",    //获取2017柱状图数据
    "bar2":url.staticPath+"dataJson/bar2.json",    //获取2018柱状图数据
    "food":url.staticPath+"dataJson/food.json",    //获取美食列表数据
    "play":url.staticPath+"dataJson/play.json",    //获取休闲娱乐列表数据
    "map":url.staticPath+"dataJson/map.json",    //获取地图数据
    "chinaMap":url.staticPath+"dataJson/chinaMap.json",    //获取中国城市经纬度数据
}

