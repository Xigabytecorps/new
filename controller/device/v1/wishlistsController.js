/**
 * wishlistsController.js
 * @description :: exports action methods for wishlists.
 */

const Wishlists = require('../../../model/wishlists');
const wishlistsSchemaKey = require('../../../utils/validation/wishlistsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Wishlists in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Wishlists. {status, message, data}
 */ 
const addWishlists = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      wishlistsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdWishlists = await dbService.createOne(Wishlists,dataToCreate);
    return  res.success({ data :createdWishlists });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Wishlists in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Wishlistss. {status, message, data}
 */
const bulkInsertWishlists = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdWishlists = await dbService.createMany(Wishlists,dataToCreate); 
      return  res.success({ data :{ count :createdWishlists.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Wishlists from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Wishlists(s). {status, message, data}
 */
const findAllWishlists = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundWishlists;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      wishlistsSchemaKey.findFilterKeys,
      Wishlists.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundWishlists = await dbService.count(Wishlists, query);
      if (!foundWishlists) {
        return res.recordNotFound();
      } 
      foundWishlists = { totalRecords: foundWishlists };
      return res.success({ data :foundWishlists });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundWishlists = await dbService.paginate( Wishlists,query,options);
    if (!foundWishlists){
      return res.recordNotFound();
    }
    return res.success({ data:foundWishlists }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Wishlists from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Wishlists. {status, message, data}
 */
const getWishlists = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundWishlists = await dbService.findOne(Wishlists,{ id :id });
    if (!foundWishlists){
      return res.recordNotFound();
    }
    return  res.success({ data :foundWishlists });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Wishlists.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getWishlistsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      wishlistsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedWishlists = await dbService.count(Wishlists,where);
    if (!countedWishlists){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedWishlists } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Wishlists with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Wishlists.
 * @return {Object} : updated Wishlists. {status, message, data}
 */
const updateWishlists = async (req, res) => {
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
      wishlistsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedWishlists = await dbService.update(Wishlists,query,dataToUpdate);
    return  res.success({ data :updatedWishlists }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Wishlists with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Wishlistss.
 * @return {Object} : updated Wishlistss. {status, message, data}
 */
const bulkUpdateWishlists = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedWishlists = await dbService.update(Wishlists,filter,dataToUpdate);
    if (!updatedWishlists){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedWishlists.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Wishlists with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Wishlists.
 * @return {Object} : updated Wishlists. {status, message, data}
 */
const partialUpdateWishlists = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      wishlistsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedWishlists = await dbService.update(Wishlists, query, dataToUpdate);
    if (!updatedWishlists) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedWishlists });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Wishlists from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Wishlists.
 * @return {Object} : deactivated Wishlists. {status, message, data}
 */
const softDeleteWishlists = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Wishlists, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Wishlists from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Wishlists. {status, message, data}
 */
const deleteWishlists = async (req, res) => {
  const result = await dbService.deleteByPk(Wishlists, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Wishlists in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyWishlists = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedWishlists = await dbService.destroy(Wishlists,query);
    return res.success({ data :{ count :deletedWishlists.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Wishlists from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Wishlists.
 * @return {Object} : number of deactivated documents of Wishlists. {status, message, data}
 */
const softDeleteManyWishlists = async (req, res) => {
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
    let updatedWishlists = await dbService.update(Wishlists,query,updateBody, options);
    if (!updatedWishlists) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedWishlists.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addWishlists,
  bulkInsertWishlists,
  findAllWishlists,
  getWishlists,
  getWishlistsCount,
  updateWishlists,
  bulkUpdateWishlists,
  partialUpdateWishlists,
  softDeleteWishlists,
  deleteWishlists,
  deleteManyWishlists,
  softDeleteManyWishlists,
};
