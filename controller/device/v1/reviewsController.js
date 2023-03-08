/**
 * reviewsController.js
 * @description :: exports action methods for reviews.
 */

const Reviews = require('../../../model/reviews');
const reviewsSchemaKey = require('../../../utils/validation/reviewsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Reviews in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Reviews. {status, message, data}
 */ 
const addReviews = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      reviewsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdReviews = await dbService.createOne(Reviews,dataToCreate);
    return  res.success({ data :createdReviews });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Reviews in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Reviewss. {status, message, data}
 */
const bulkInsertReviews = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdReviews = await dbService.createMany(Reviews,dataToCreate); 
      return  res.success({ data :{ count :createdReviews.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Reviews from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Reviews(s). {status, message, data}
 */
const findAllReviews = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundReviews;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      reviewsSchemaKey.findFilterKeys,
      Reviews.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundReviews = await dbService.count(Reviews, query);
      if (!foundReviews) {
        return res.recordNotFound();
      } 
      foundReviews = { totalRecords: foundReviews };
      return res.success({ data :foundReviews });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundReviews = await dbService.paginate( Reviews,query,options);
    if (!foundReviews){
      return res.recordNotFound();
    }
    return res.success({ data:foundReviews }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Reviews from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Reviews. {status, message, data}
 */
const getReviews = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundReviews = await dbService.findOne(Reviews,{ id :id });
    if (!foundReviews){
      return res.recordNotFound();
    }
    return  res.success({ data :foundReviews });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Reviews.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getReviewsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      reviewsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedReviews = await dbService.count(Reviews,where);
    if (!countedReviews){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedReviews } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Reviews with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Reviews.
 * @return {Object} : updated Reviews. {status, message, data}
 */
const updateReviews = async (req, res) => {
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
      reviewsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedReviews = await dbService.update(Reviews,query,dataToUpdate);
    return  res.success({ data :updatedReviews }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Reviews with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Reviewss.
 * @return {Object} : updated Reviewss. {status, message, data}
 */
const bulkUpdateReviews = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedReviews = await dbService.update(Reviews,filter,dataToUpdate);
    if (!updatedReviews){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedReviews.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Reviews with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Reviews.
 * @return {Object} : updated Reviews. {status, message, data}
 */
const partialUpdateReviews = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      reviewsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedReviews = await dbService.update(Reviews, query, dataToUpdate);
    if (!updatedReviews) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedReviews });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Reviews from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Reviews.
 * @return {Object} : deactivated Reviews. {status, message, data}
 */
const softDeleteReviews = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Reviews, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Reviews from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Reviews. {status, message, data}
 */
const deleteReviews = async (req, res) => {
  const result = await dbService.deleteByPk(Reviews, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Reviews in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyReviews = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedReviews = await dbService.destroy(Reviews,query);
    return res.success({ data :{ count :deletedReviews.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Reviews from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Reviews.
 * @return {Object} : number of deactivated documents of Reviews. {status, message, data}
 */
const softDeleteManyReviews = async (req, res) => {
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
    let updatedReviews = await dbService.update(Reviews,query,updateBody, options);
    if (!updatedReviews) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedReviews.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addReviews,
  bulkInsertReviews,
  findAllReviews,
  getReviews,
  getReviewsCount,
  updateReviews,
  bulkUpdateReviews,
  partialUpdateReviews,
  softDeleteReviews,
  deleteReviews,
  deleteManyReviews,
  softDeleteManyReviews,
};
