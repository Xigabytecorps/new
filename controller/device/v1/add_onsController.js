/**
 * add_onsController.js
 * @description :: exports action methods for add_ons.
 */

const Add_ons = require('../../../model/add_ons');
const add_onsSchemaKey = require('../../../utils/validation/add_onsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Add_ons in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Add_ons. {status, message, data}
 */ 
const addAdd_ons = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      add_onsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAdd_ons = await dbService.createOne(Add_ons,dataToCreate);
    return  res.success({ data :createdAdd_ons });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Add_ons in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Add_onss. {status, message, data}
 */
const bulkInsertAdd_ons = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAdd_ons = await dbService.createMany(Add_ons,dataToCreate); 
      return  res.success({ data :{ count :createdAdd_ons.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Add_ons from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Add_ons(s). {status, message, data}
 */
const findAllAdd_ons = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdd_ons;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      add_onsSchemaKey.findFilterKeys,
      Add_ons.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdd_ons = await dbService.count(Add_ons, query);
      if (!foundAdd_ons) {
        return res.recordNotFound();
      } 
      foundAdd_ons = { totalRecords: foundAdd_ons };
      return res.success({ data :foundAdd_ons });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdd_ons = await dbService.paginate( Add_ons,query,options);
    if (!foundAdd_ons){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdd_ons }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Add_ons from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Add_ons. {status, message, data}
 */
const getAdd_ons = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdd_ons = await dbService.findOne(Add_ons,{ id :id });
    if (!foundAdd_ons){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdd_ons });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Add_ons.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdd_onsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      add_onsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdd_ons = await dbService.count(Add_ons,where);
    if (!countedAdd_ons){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdd_ons } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Add_ons with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Add_ons.
 * @return {Object} : updated Add_ons. {status, message, data}
 */
const updateAdd_ons = async (req, res) => {
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
      add_onsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdd_ons = await dbService.update(Add_ons,query,dataToUpdate);
    return  res.success({ data :updatedAdd_ons }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Add_ons with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Add_onss.
 * @return {Object} : updated Add_onss. {status, message, data}
 */
const bulkUpdateAdd_ons = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAdd_ons = await dbService.update(Add_ons,filter,dataToUpdate);
    if (!updatedAdd_ons){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdd_ons.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Add_ons with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Add_ons.
 * @return {Object} : updated Add_ons. {status, message, data}
 */
const partialUpdateAdd_ons = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      add_onsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdd_ons = await dbService.update(Add_ons, query, dataToUpdate);
    if (!updatedAdd_ons) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdd_ons });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Add_ons from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Add_ons.
 * @return {Object} : deactivated Add_ons. {status, message, data}
 */
const softDeleteAdd_ons = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Add_ons, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Add_ons from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Add_ons. {status, message, data}
 */
const deleteAdd_ons = async (req, res) => {
  const result = await dbService.deleteByPk(Add_ons, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Add_ons in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdd_ons = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAdd_ons = await dbService.destroy(Add_ons,query);
    return res.success({ data :{ count :deletedAdd_ons.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Add_ons from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Add_ons.
 * @return {Object} : number of deactivated documents of Add_ons. {status, message, data}
 */
const softDeleteManyAdd_ons = async (req, res) => {
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
    let updatedAdd_ons = await dbService.update(Add_ons,query,updateBody, options);
    if (!updatedAdd_ons) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAdd_ons.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdd_ons,
  bulkInsertAdd_ons,
  findAllAdd_ons,
  getAdd_ons,
  getAdd_onsCount,
  updateAdd_ons,
  bulkUpdateAdd_ons,
  partialUpdateAdd_ons,
  softDeleteAdd_ons,
  deleteAdd_ons,
  deleteManyAdd_ons,
  softDeleteManyAdd_ons,
};
