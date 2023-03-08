/**
 * email_verificationsController.js
 * @description :: exports action methods for email_verifications.
 */

const Email_verifications = require('../../model/email_verifications');
const email_verificationsSchemaKey = require('../../utils/validation/email_verificationsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Email_verifications in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Email_verifications. {status, message, data}
 */ 
const addEmail_verifications = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      email_verificationsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdEmail_verifications = await dbService.createOne(Email_verifications,dataToCreate);
    return  res.success({ data :createdEmail_verifications });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Email_verifications in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Email_verificationss. {status, message, data}
 */
const bulkInsertEmail_verifications = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdEmail_verifications = await dbService.createMany(Email_verifications,dataToCreate); 
      return  res.success({ data :{ count :createdEmail_verifications.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Email_verifications from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Email_verifications(s). {status, message, data}
 */
const findAllEmail_verifications = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundEmail_verifications;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      email_verificationsSchemaKey.findFilterKeys,
      Email_verifications.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundEmail_verifications = await dbService.count(Email_verifications, query);
      if (!foundEmail_verifications) {
        return res.recordNotFound();
      } 
      foundEmail_verifications = { totalRecords: foundEmail_verifications };
      return res.success({ data :foundEmail_verifications });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundEmail_verifications = await dbService.paginate( Email_verifications,query,options);
    if (!foundEmail_verifications){
      return res.recordNotFound();
    }
    return res.success({ data:foundEmail_verifications }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Email_verifications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Email_verifications. {status, message, data}
 */
const getEmail_verifications = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundEmail_verifications = await dbService.findOne(Email_verifications,{ id :id });
    if (!foundEmail_verifications){
      return res.recordNotFound();
    }
    return  res.success({ data :foundEmail_verifications });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Email_verifications.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getEmail_verificationsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      email_verificationsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedEmail_verifications = await dbService.count(Email_verifications,where);
    if (!countedEmail_verifications){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedEmail_verifications } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Email_verifications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Email_verifications.
 * @return {Object} : updated Email_verifications. {status, message, data}
 */
const updateEmail_verifications = async (req, res) => {
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
      email_verificationsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedEmail_verifications = await dbService.update(Email_verifications,query,dataToUpdate);
    return  res.success({ data :updatedEmail_verifications }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Email_verifications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Email_verificationss.
 * @return {Object} : updated Email_verificationss. {status, message, data}
 */
const bulkUpdateEmail_verifications = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedEmail_verifications = await dbService.update(Email_verifications,filter,dataToUpdate);
    if (!updatedEmail_verifications){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedEmail_verifications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Email_verifications with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Email_verifications.
 * @return {Object} : updated Email_verifications. {status, message, data}
 */
const partialUpdateEmail_verifications = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      email_verificationsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedEmail_verifications = await dbService.update(Email_verifications, query, dataToUpdate);
    if (!updatedEmail_verifications) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedEmail_verifications });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Email_verifications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Email_verifications.
 * @return {Object} : deactivated Email_verifications. {status, message, data}
 */
const softDeleteEmail_verifications = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Email_verifications, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Email_verifications from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Email_verifications. {status, message, data}
 */
const deleteEmail_verifications = async (req, res) => {
  const result = await dbService.deleteByPk(Email_verifications, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Email_verifications in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyEmail_verifications = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedEmail_verifications = await dbService.destroy(Email_verifications,query);
    return res.success({ data :{ count :deletedEmail_verifications.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Email_verifications from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Email_verifications.
 * @return {Object} : number of deactivated documents of Email_verifications. {status, message, data}
 */
const softDeleteManyEmail_verifications = async (req, res) => {
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
    let updatedEmail_verifications = await dbService.update(Email_verifications,query,updateBody, options);
    if (!updatedEmail_verifications) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedEmail_verifications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addEmail_verifications,
  bulkInsertEmail_verifications,
  findAllEmail_verifications,
  getEmail_verifications,
  getEmail_verificationsCount,
  updateEmail_verifications,
  bulkUpdateEmail_verifications,
  partialUpdateEmail_verifications,
  softDeleteEmail_verifications,
  deleteEmail_verifications,
  deleteManyEmail_verifications,
  softDeleteManyEmail_verifications,
};
