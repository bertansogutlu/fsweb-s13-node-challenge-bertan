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

router.get('/:id',async (req,res,next)=>{
    try {
        const action = await actionModel.get(req.params.id);
        if(action){
            res.status(200).json(action);
        } else {
            res.status(404).json({message:'aksiyon bulunamadi'});
        }
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;