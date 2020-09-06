const { populate } = require('../../models/Category')

// const { default: router } = require('../../../web/src/router')
module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Category = require('../../models/Category')
    const Article = require('../../models/Article')
    const Hero = require('../../models/Hero')
    // const router = express.Router({
    //     mergeParams: true
    // })
    

    // 新闻列表接口
    router.get('/news/list', async (req, res) => {
        // 查前多少条，不分类
        // const parent = await Category.findOne({
        //     name: '新闻资讯'
        // }).populate({
        //     path: 'children',
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean()

        // 查多少条， 分类
        // 聚合查询
        const parent = await Category.findOne({
            name: '新闻资讯'
        })
        const cats = await Category.aggregate([
            {$match: {parent: parent._id}},
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: {$slice: ['$newsList', 5]}
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: {$in: subCats}
            }).populate('categories').limit(5).lean()
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })

    // 英雄列表接口
    router.get('/heros/list', async (req, res) => {
        // 聚合查询
        const parent = await Category.findOne({
            name: '英雄'
        })
        const cats = await Category.aggregate([
            {$match: {parent: parent._id}},
            {
                $lookup: {
                    from: 'heros',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'heroList'
                }
            },
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            heroList: await Hero.find().where({
                categories: {$in: subCats}
            }).populate('categories').limit(10).lean()
        })

        cats.map(cat => {
            cat.heroList.map(heros => {
                heros.categoryName = cat.name === '热门' ? heros.categories[0].name : cat.name
                return heros
            })
            return cat
        })
        res.send(cats)
    })

    // 文章详情
    router.get('/article/:id', async (req, res) => {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
            categories: {$in: data.categories}
        }).limit(2)
        res.send(data)
    })

    // 英雄详情
    router.get('/heros/:id', async (req, res) => {
        const data = await Hero.findById(req.params.id).populate('categories').lean()
        res.send(data)
    })

    app.use('/web/api', router)
}