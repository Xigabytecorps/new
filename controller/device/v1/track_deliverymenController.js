/**
 * track_deliverymenController.js
 * @description :: exports action methods for track_deliverymen.
 */

const Track_deliverymen = require('../../../model/track_deliverymen');
const track_deliverymenSchemaKey = require('../../../utils/validation/track_deliverymenValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Track_deliverymen in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Track_deliverymen. {status, message, data}
 */ 
const addTrack_deliverymen = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      track_deliverymenSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdTrack_deliverymen = await dbService.createOne(Track_deliverymen,dataToCreate);
    return  res.success({ data :createdTrack_deliverymen });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Track_deliverymen in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Track_deliverymens. {status, message, data}
 */
const bulkInsertTrack_deliverymen = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdTrack_deliverymen = await dbService.createMany(Track_deliverymen,dataToCreate); 
      return  res.success({ data :{ count :createdTrack_deliverymen.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Track_deliverymen from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Track_deliverymen(s). {status, message, data}
 */
const findAllTrack_deliverymen = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundTrack_deliverymen;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      track_deliverymenSchemaKey.findFilterKeys,
      Track_deliverymen.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundTrack_deliverymen = await dbService.count(Track_deliverymen, query);
      if (!foundTrack_deliverymen) {
        return res.recordNotFound();
      } 
      foundTrack_deliverymen = { totalRecords: foundTrack_deliverymen };
      return res.success({ data :foundTrack_deliverymen });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundTrack_deliverymen = await dbService.paginate( Track_deliverymen,query,options);
    if (!foundTrack_deliverymen){
      return res.recordNotFound();
    }
    return res.success({ data:foundTrack_deliverymen }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Track_deliverymen from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Track_deliverymen. {status, message, data}
 */
const getTrack_deliverymen = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundTrack_deliverymen = await dbService.findOne(Track_deliverymen,{ id :id });
    if (!foundTrack_deliverymen){
      return res.recordNotFound();
    }
    return  res.success({ data :foundTrack_deliverymen });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Track_deliverymen.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getTrack_deliverymenCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      track_deliverymenSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedTrack_deliverymen = await dbService.count(Track_deliverymen,where);
    if (!countedTrack_deliverymen){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedTrack_deliverymen } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Track_deliverymen with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Track_deliverymen.
 * @return {Object} : updated Track_deliverymen. {status, message, data}
 */
const updateTrack_deliverymen = async (req, res) => {
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
      track_deliverymenSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedTrack_deliverymen = await dbService.update(Track_deliverymen,query,dataToUpdate);
    return  res.success({ data :updatedTrack_deliverymen }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Track_deliverymen with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Track_deliverymens.
 * @return {Object} : updated Track_deliverymens. {status, message, data}
 */
const bulkUpdateTrack_deliverymen = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedTrack_deliverymen = await dbService.update(Track_deliverymen,filter,dataToUpdate);
    if (!updatedTrack_deliverymen){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedTrack_deliverymen.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Track_deliverymen with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Track_deliverymen.
 * @return {Object} : updated Track_deliverymen. {status, message, data}
 */
const partialUpdateTrack_deliverymen = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      track_deliverymenSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedTrack_deliverymen = await dbService.update(Track_deliverymen, query, dataToUpdate);
    if (!updatedTrack_deliverymen) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedTrack_deliverymen });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Track_deliverymen from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Track_deliverymen.
 * @return {Object} : deactivated Track_deliverymen. {status, message, data}
 */
const softDeleteTrack_deliverymen = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Track_deliverymen, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Track_deliverymen from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Track_deliverymen. {status, message, data}
 */
const deleteTrack_deliverymen = async (req, res) => {
  const result = await dbService.deleteByPk(Track_deliverymen, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Track_deliverymen in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyTrack_deliverymen = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedTrack_deliverymen = await dbService.destroy(Track_deliverymen,query);
    return res.success({ data :{ count :deletedTrack_deliverymen.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Track_deliverymen from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Track_deliverymen.
 * @return {Object} : number of deactivated documents of Track_deliverymen. {status, message, data}
 */
const softDeleteManyTrack_deliverymen = async (req, res) => {
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
    let updatedTrack_deliverymen = await dbService.update(Track_deliverymen,query,updateBody, options);
    if (!updatedTrack_deliverymen) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedTrack_deliverymen.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addTrack_deliverymen,
  bulkInsertTrack_deliverymen,
  findAllTrack_deliverymen,
  getTrack_deliverymen,
  getTrack_deliverymenCount,
  updateTrack_deliverymen,
  bulkUpdateTrack_deliverymen,
  partialUpdateTrack_deliverymen,
  softDeleteTrack_deliverymen,
  deleteTrack_deliverymen,
  deleteManyTrack_deliverymen,
  softDeleteManyTrack_deliverymen,
};
