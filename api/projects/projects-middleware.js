// projects ara yazılımları buraya
const projectModel = require('./projects-model');

async function checkProjectId(req,res,next) {
    try {
        const isExistProject = await projectModel.get(req.params.id);
        if(!isExistProject){
            res.status(404).json({message:'not found'});
        } else {
            req.project = isExistProject;
            next();
        }
    } catch (error) {
        next(error);
    }
}

async function checkPayload(req,res,next) {
    try {
        if(!req.body.name || !req.body.description || req.body.completed === undefined) {
            res.status(400).json({message:'eksik alanlari doldurunuz'});
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    checkProjectId,
    checkPayload
};