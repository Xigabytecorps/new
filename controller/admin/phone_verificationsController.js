/**
 * phone_verificationsController.js
 * @description :: exports action methods for phone_verifications.
 */

const Phone_verifications = require('../../model/phone_verifications');
const phone_verificationsSchemaKey = require('../../utils/validation/phone_verificationsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Phone_verifications in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Phone_verifications. {status, message, data}
 */ 
const addPhone_verifications = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      phone_verificationsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPhone_verifications = await dbService.createOne(Phone_verifications,dataToCreate);
    return  res.success({ data :createdPhone_verifications });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Phone_verifications in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Phone_verificationss. {status, message, data}
 */
const bulkInsertPhone_verifications = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPhone_verifications = await dbService.createMany(Phone_verifications,dataToCreate); 
      return  res.success({ data :{ count :createdPhone_verifications.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Phone_verifications from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Phone_verifications(s). {status, message, data}
 */
const findAllPhone_verifications = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPhone_verifications;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      phone_verificationsSchemaKey.findFilterKeys,
      Phone_verifications.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPhone_verifications = await dbService.count(Phone_verifications, query);
      if (!foundPhone_verifications) {
        return res.recordNotFound();
      } 
      foundPhone_verifications = { totalRecords: foundPhone_verifications };
      return res.success({ data :foundPhone_verifications });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPhone_verifications = await dbService.paginate( Phone_verifications,query,options);
    if (!foundPhone_verifications){
      return res.recordNotFound();
    }
    return res.success({ data:foundPhone_verifications }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Phone_verifications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Phone_verifications. {status, message, data}
 */
const getPhone_verifications = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPhone_verifications = await dbService.findOne(Phone_verifications,{ id :id });
    if (!foundPhone_verifications){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPhone_verifications });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Phone_verifications.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPhone_verificationsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      phone_verificationsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPhone_verifications = await dbService.count(Phone_verifications,where);
    if (!countedPhone_verifications){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPhone_verifications } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Phone_verifications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Phone_verifications.
 * @return {Object} : updated Phone_verifications. {status, message, data}
 */
const updatePhone_verifications = async (req, res) => {
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
      phone_verificationsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPhone_verifications = await dbService.update(Phone_verifications,query,dataToUpdate);
    return  res.success({ data :updatedPhone_verifications }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Phone_verifications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Phone_verificationss.
 * @return {Object} : updated Phone_verificationss. {status, message, data}
 */
const bulkUpdatePhone_verifications = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPhone_verifications = await dbService.update(Phone_verifications,filter,dataToUpdate);
    if (!updatedPhone_verifications){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPhone_verifications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Phone_verifications with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Phone_verifications.
 * @return {Object} : updated Phone_verifications. {status, message, data}
 */
const partialUpdatePhone_verifications = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      phone_verificationsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPhone_verifications = await dbService.update(Phone_verifications, query, dataToUpdate);
    if (!updatedPhone_verifications) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPhone_verifications });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Phone_verifications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Phone_verifications.
 * @return {Object} : deactivated Phone_verifications. {status, message, data}
 */
const softDeletePhone_verifications = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Phone_verifications, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Phone_verifications from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Phone_verifications. {status, message, data}
 */
const deletePhone_verifications = async (req, res) => {
  const result = await dbService.deleteByPk(Phone_verifications, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Phone_verifications in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPhone_verifications = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPhone_verifications = await dbService.destroy(Phone_verifications,query);
    return res.success({ data :{ count :deletedPhone_verifications.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Phone_verifications from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Phone_verifications.
 * @return {Object} : number of deactivated documents of Phone_verifications. {status, message, data}
 */
const softDeleteManyPhone_verifications = async (req, res) => {
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
    let updatedPhone_verifications = await dbService.update(Phone_verifications,query,updateBody, options);
    if (!updatedPhone_verifications) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPhone_verifications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPhone_verifications,
  bulkInsertPhone_verifications,
  findAllPhone_verifications,
  getPhone_verifications,
  getPhone_verificationsCount,
  updatePhone_verifications,
  bulkUpdatePhone_verifications,
  partialUpdatePhone_verifications,
  softDeletePhone_verifications,
  deletePhone_verifications,
  deleteManyPhone_verifications,
  softDeleteManyPhone_verifications,
};
