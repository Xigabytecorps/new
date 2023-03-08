/**
 * foodController.js
 * @description :: exports action methods for food.
 */

const Food = require('../../../model/food');
const foodSchemaKey = require('../../../utils/validation/foodValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Food in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Food. {status, message, data}
 */ 
const addFood = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      foodSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdFood = await dbService.createOne(Food,dataToCreate);
    return  res.success({ data :createdFood });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Food in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Foods. {status, message, data}
 */
const bulkInsertFood = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdFood = await dbService.createMany(Food,dataToCreate); 
      return  res.success({ data :{ count :createdFood.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Food from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Food(s). {status, message, data}
 */
const findAllFood = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundFood;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      foodSchemaKey.findFilterKeys,
      Food.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundFood = await dbService.count(Food, query);
      if (!foundFood) {
        return res.recordNotFound();
      } 
      foundFood = { totalRecords: foundFood };
      return res.success({ data :foundFood });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundFood = await dbService.paginate( Food,query,options);
    if (!foundFood){
      return res.recordNotFound();
    }
    return res.success({ data:foundFood }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Food from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Food. {status, message, data}
 */
const getFood = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundFood = await dbService.findOne(Food,{ id :id });
    if (!foundFood){
      return res.recordNotFound();
    }
    return  res.success({ data :foundFood });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Food.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getFoodCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      foodSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedFood = await dbService.count(Food,where);
    if (!countedFood){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedFood } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Food with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Food.
 * @return {Object} : updated Food. {status, message, data}
 */
const updateFood = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      foodSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedFood = await dbService.update(Food,query,dataToUpdate);
    return  res.success({ data :updatedFood }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Food with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Foods.
 * @return {Object} : updated Foods. {status, message, data}
 */
const bulkUpdateFood = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedFood = await dbService.update(Food,filter,dataToUpdate);
    if (!updatedFood){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedFood.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Food with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Food.
 * @return {Object} : updated Food. {status, message, data}
 */
const partialUpdateFood = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      foodSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedFood = await dbService.update(Food, query, dataToUpdate);
    if (!updatedFood) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedFood });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Food from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Food.
 * @return {Object} : deactivated Food. {status, message, data}
 */
const softDeleteFood = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Food, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Food from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Food. {status, message, data}
 */
const deleteFood = async (req, res) => {
  const result = await dbService.deleteByPk(Food, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Food in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyFood = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedFood = await dbService.destroy(Food,query);
    return res.success({ data :{ count :deletedFood.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Food from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Food.
 * @return {Object} : number of deactivated documents of Food. {status, message, data}
 */
const softDeleteManyFood = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedFood = await dbService.update(Food,query,updateBody, options);
    if (!updatedFood) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedFood.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addFood,
  bulkInsertFood,
  findAllFood,
  getFood,
  getFoodCount,
  updateFood,
  bulkUpdateFood,
  partialUpdateFood,
  softDeleteFood,
  deleteFood,
  deleteManyFood,
  softDeleteManyFood,
};
