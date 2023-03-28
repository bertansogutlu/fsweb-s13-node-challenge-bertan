// "project" routerını buraya yazın!
const express = require('express');
const router = express.Router();
const projectModel = require('./projects-model');
const middleware = require('./projects-middleware');

router.get('/',async (req,res,next)=>{
    try {
        const allProject = await projectModel.get();
        res.status(200).json(allProject);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',middleware.checkProjectId, async (req,res,next)=>{
    try {
        res.status(200).json(req.project);
    } catch (error) {
        next(error);
    }
});

router.post('/',middleware.checkPayload, async (req,res,next)=>{
    try {
        let insertedProject = await projectModel.insert(req.body);
        res.status(200).json(insertedProject);
    } catch (error) {
        next(error);
    }
});

router.put('/:id',middleware.checkPayload,middleware.checkProjectId, async (req,res,next)=>{
    try {
            let upatedProject = await projectModel.update(req.params.id,req.body);
            res.status(200).json(upatedProject);
    } catch (error) {
        res.status(404).json({message: 'id bulunamadi'});
    }
});

router.delete('/:id',middleware.checkProjectId, async (req,res,next)=>{
    try {
        await projectModel.remove(req.params.id);
        res.status(200).json({message:'silme islemi basarili'});
    } catch (error) {
        next(error);
    }
});

router.get('/:id/actions',middleware.checkProjectId, async (req,res,next)=>{
    try {
        const result = await projectModel.getProjectActions(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;