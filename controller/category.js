const {Router} = require('express')
const router = Router()
const categoryModel = require('../model/category')

router.get('/category',(req,res) => {
    categoryModel.find().then(data => {
        res.json({
            code:200,
            data
        })
    })
})

router.get('/category/:id',(req,res) => {
    let {id} = req.params
    categoryModel.findById(id).then(data => {
        res.json({
            code:200,
            data
        })
    })
})

module.exports = router