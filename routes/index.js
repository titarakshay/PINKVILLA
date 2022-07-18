var express= require("express");
var axios = require("axios")
var router= express.Router();

const baseNewsFeedUrl="http://www.pinkvilla.com/photo-gallery-feed-page"
const homeUrl="https://www.pinkvilla.com"
const defaultImageUrl="https://www.pinkvilla.com/sites/all/themes/pinkvillablaze/assets/images/pv_more_article.jpg?r=1"
const newFeedUrl="http://www.pinkvilla.com/photo-gallery-feed-page/page/"
var pageCount=2  
router.get("/",async(req,res)=>{
    
    let baseFetchfeed = await axios.get(baseNewsFeedUrl)
    let {data} = await  baseFetchfeed
    data.nodes.map(({node})=>{
            
                    node.last_update= new Date(Number(node.last_update)).toLocaleString()+" IST"
                    node.field_photo_image_section=node.field_photo_image_section?homeUrl+node.field_photo_image_section : defaultImageUrl
                    return node
            })
    let baseFeed=data.nodes
    res.status(201).json(baseFeed)

})
router.get("/newfeed",async (req,res)=>{
    pageCount++
    console.log(pageCount,"no")
    let baseFetchfeed = await axios.get(newFeedUrl+pageCount)
    let {data} = await  baseFetchfeed
    console.log(data,"new")
    if(data){

        data.nodes.map(({node})=>{
            
            node.last_update= new Date(Number(node.last_update)).toLocaleString()
            node.field_photo_image_section=node.field_photo_image_section?homeUrl+node.field_photo_image_section : defaultImageUrl
            return node
        })
    let baseFeed=data.nodes
    res.status(201).json(baseFeed)
    }
    else{
        res.status(200).send("No data available")
    }
})
module.exports=router;

