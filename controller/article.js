const {Router} = require('express')
const router = Router()
const articleModel = require('../model/article')
const categoryModel = require('../model/category')

router.post('/article',async (req,res,next) => {
    try{
        if(req.session.user) {
            const {content, contentText, title, category} = req.body
            const data = await articleModel.create({
                content,
                contentText,
                title,
                category,
                author:req.session.user._id
            })
            res.json({
                code:200,
                msg:'文章发布成功',
                data
            })
        }else{
            res.json({
                code:403,
                msg:'未登录状态下不能发布笔记'
            })
        }
    }catch(err){
        next(err)
    }
})

router.get('/article', (req,res) => {
    let {pn=1, size=10} = req.query
    pn = parseInt(pn)
    size = parseInt(size)

    articleModel.find()
    .skip((pn-1)*size)
    .limit(size)
    .populate({
        path:'author',
        select:'-password -email'
    })
    .populate({
        path:'category'
    })
    .then(data => {
        res.json({
            code:200,
            data
        })
    })
})


router.get('/article/:id',async (req,res,next) => {
    try{
        let {id} = req.params
        await articleModel.updateOne({_id:id},{$inc: { readnumber: 1 }},{ multi: false })
        const data = await articleModel.findById(id)
        res.json({
            code:200,
            data
        })
    }catch(err){
        next(err)
    }
})

module.exports = router