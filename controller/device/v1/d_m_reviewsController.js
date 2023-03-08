/**
 * d_m_reviewsController.js
 * @description :: exports action methods for d_m_reviews.
 */

const D_m_reviews = require('../../../model/d_m_reviews');
const d_m_reviewsSchemaKey = require('../../../utils/validation/d_m_reviewsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of D_m_reviews in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created D_m_reviews. {status, message, data}
 */ 
const addD_m_reviews = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      d_m_reviewsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdD_m_reviews = await dbService.createOne(D_m_reviews,dataToCreate);
    return  res.success({ data :createdD_m_reviews });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of D_m_reviews in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created D_m_reviewss. {status, message, data}
 */
const bulkInsertD_m_reviews = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdD_m_reviews = await dbService.createMany(D_m_reviews,dataToCreate); 
      return  res.success({ data :{ count :createdD_m_reviews.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of D_m_reviews from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found D_m_reviews(s). {status, message, data}
 */
const findAllD_m_reviews = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundD_m_reviews;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      d_m_reviewsSchemaKey.findFilterKeys,
      D_m_reviews.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundD_m_reviews = await dbService.count(D_m_reviews, query);
      if (!foundD_m_reviews) {
        return res.recordNotFound();
      } 
      foundD_m_reviews = { totalRecords: foundD_m_reviews };
      return res.success({ data :foundD_m_reviews });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundD_m_reviews = await dbService.paginate( D_m_reviews,query,options);
    if (!foundD_m_reviews){
      return res.recordNotFound();
    }
    return res.success({ data:foundD_m_reviews }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of D_m_reviews from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found D_m_reviews. {status, message, data}
 */
const getD_m_reviews = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundD_m_reviews = await dbService.findOne(D_m_reviews,{ id :id });
    if (!foundD_m_reviews){
      return res.recordNotFound();
    }
    return  res.success({ data :foundD_m_reviews });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of D_m_reviews.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getD_m_reviewsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      d_m_reviewsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedD_m_reviews = await dbService.count(D_m_reviews,where);
    if (!countedD_m_reviews){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedD_m_reviews } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of D_m_reviews with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated D_m_reviews.
 * @return {Object} : updated D_m_reviews. {status, message, data}
 */
const updateD_m_reviews = async (req, res) => {
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
      d_m_reviewsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedD_m_reviews = await dbService.update(D_m_reviews,query,dataToUpdate);
    return  res.success({ data :updatedD_m_reviews }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of D_m_reviews with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated D_m_reviewss.
 * @return {Object} : updated D_m_reviewss. {status, message, data}
 */
const bulkUpdateD_m_reviews = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedD_m_reviews = await dbService.update(D_m_reviews,filter,dataToUpdate);
    if (!updatedD_m_reviews){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedD_m_reviews.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of D_m_reviews with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated D_m_reviews.
 * @return {Object} : updated D_m_reviews. {status, message, data}
 */
const partialUpdateD_m_reviews = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      d_m_reviewsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedD_m_reviews = await dbService.update(D_m_reviews, query, dataToUpdate);
    if (!updatedD_m_reviews) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedD_m_reviews });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of D_m_reviews from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of D_m_reviews.
 * @return {Object} : deactivated D_m_reviews. {status, message, data}
 */
const softDeleteD_m_reviews = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(D_m_reviews, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of D_m_reviews from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted D_m_reviews. {status, message, data}
 */
const deleteD_m_reviews = async (req, res) => {
  const result = await dbService.deleteByPk(D_m_reviews, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of D_m_reviews in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyD_m_reviews = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedD_m_reviews = await dbService.destroy(D_m_reviews,query);
    return res.success({ data :{ count :deletedD_m_reviews.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of D_m_reviews from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of D_m_reviews.
 * @return {Object} : number of deactivated documents of D_m_reviews. {status, message, data}
 */
const softDeleteManyD_m_reviews = async (req, res) => {
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
    let updatedD_m_reviews = await dbService.update(D_m_reviews,query,updateBody, options);
    if (!updatedD_m_reviews) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedD_m_reviews.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addD_m_reviews,
  bulkInsertD_m_reviews,
  findAllD_m_reviews,
  getD_m_reviews,
  getD_m_reviewsCount,
  updateD_m_reviews,
  bulkUpdateD_m_reviews,
  partialUpdateD_m_reviews,
  softDeleteD_m_reviews,
  deleteD_m_reviews,
  deleteManyD_m_reviews,
  softDeleteManyD_m_reviews,
};
