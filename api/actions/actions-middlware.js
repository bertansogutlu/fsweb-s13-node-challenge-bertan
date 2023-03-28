// eylemlerle ilgili ara katman yazılımları yazın
const actionModel = require('./actions-model');

async function actionCheckById(req,res,next) {
    try {
        const action = await actionModel.get(req.params.id);
        if(action){
            req.actionPayload = action;
            next();
        } else {
            res.status(404).json({message:'aksiyon bulunamadi'});
        }
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    actionCheckById
};