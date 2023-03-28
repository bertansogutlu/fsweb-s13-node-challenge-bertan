// "eylem" routerını buraya yazın
const express = require('express');
const router = express.Router();
const actionModel = require('./actions-model');
const middleware = require('./actions-middlware');

router.get('/',async (req,res,next)=>{
    try {
        const allActions = await actionModel.get();
        res.status(200).json(allActions);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', middleware.actionCheckById, async (req,res,next)=>{
    try {
        res.status(200).json(req.actionPayload)
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req,res,next)=>{
    try {
        if(!req.body.description || !req.body.notes){
            res.status(400).json({message:'eksik bilgiler var'})
        } else {
            const newAction = await actionModel.insert(req.body);
            res.status(200).json(newAction)
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', middleware.actionCheckById, async (req,res,next)=>{
    try {
        if(!req.body.description || !req.body.notes){
            res.status(400).json({message:'eksik bilgiler var'})
        } else {
            const updatedAction = await actionModel.update(req.params.id, req.body);
            res.status(200).json(updatedAction)
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', middleware.actionCheckById, async (req,res,next)=>{
    try {
        await actionModel.remove(req.params.id);
        res.status(200).json(req.payload);
    } catch (error) {
        next(error);
    }
});

module.exports = router;