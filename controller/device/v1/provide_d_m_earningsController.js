/**
 * provide_d_m_earningsController.js
 * @description :: exports action methods for provide_d_m_earnings.
 */

const Provide_d_m_earnings = require('../../../model/provide_d_m_earnings');
const provide_d_m_earningsSchemaKey = require('../../../utils/validation/provide_d_m_earningsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Provide_d_m_earnings in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Provide_d_m_earnings. {status, message, data}
 */ 
const addProvide_d_m_earnings = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      provide_d_m_earningsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdProvide_d_m_earnings = await dbService.createOne(Provide_d_m_earnings,dataToCreate);
    return  res.success({ data :createdProvide_d_m_earnings });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Provide_d_m_earnings in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Provide_d_m_earningss. {status, message, data}
 */
const bulkInsertProvide_d_m_earnings = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdProvide_d_m_earnings = await dbService.createMany(Provide_d_m_earnings,dataToCreate); 
      return  res.success({ data :{ count :createdProvide_d_m_earnings.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Provide_d_m_earnings from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Provide_d_m_earnings(s). {status, message, data}
 */
const findAllProvide_d_m_earnings = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundProvide_d_m_earnings;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      provide_d_m_earningsSchemaKey.findFilterKeys,
      Provide_d_m_earnings.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundProvide_d_m_earnings = await dbService.count(Provide_d_m_earnings, query);
      if (!foundProvide_d_m_earnings) {
        return res.recordNotFound();
      } 
      foundProvide_d_m_earnings = { totalRecords: foundProvide_d_m_earnings };
      return res.success({ data :foundProvide_d_m_earnings });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundProvide_d_m_earnings = await dbService.paginate( Provide_d_m_earnings,query,options);
    if (!foundProvide_d_m_earnings){
      return res.recordNotFound();
    }
    return res.success({ data:foundProvide_d_m_earnings }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Provide_d_m_earnings from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Provide_d_m_earnings. {status, message, data}
 */
const getProvide_d_m_earnings = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundProvide_d_m_earnings = await dbService.findOne(Provide_d_m_earnings,{ id :id });
    if (!foundProvide_d_m_earnings){
      return res.recordNotFound();
    }
    return  res.success({ data :foundProvide_d_m_earnings });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Provide_d_m_earnings.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getProvide_d_m_earningsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      provide_d_m_earningsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedProvide_d_m_earnings = await dbService.count(Provide_d_m_earnings,where);
    if (!countedProvide_d_m_earnings){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedProvide_d_m_earnings } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Provide_d_m_earnings with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Provide_d_m_earnings.
 * @return {Object} : updated Provide_d_m_earnings. {status, message, data}
 */
const updateProvide_d_m_earnings = async (req, res) => {
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
      provide_d_m_earningsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedProvide_d_m_earnings = await dbService.update(Provide_d_m_earnings,query,dataToUpdate);
    return  res.success({ data :updatedProvide_d_m_earnings }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Provide_d_m_earnings with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Provide_d_m_earningss.
 * @return {Object} : updated Provide_d_m_earningss. {status, message, data}
 */
const bulkUpdateProvide_d_m_earnings = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedProvide_d_m_earnings = await dbService.update(Provide_d_m_earnings,filter,dataToUpdate);
    if (!updatedProvide_d_m_earnings){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedProvide_d_m_earnings.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Provide_d_m_earnings with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Provide_d_m_earnings.
 * @return {Object} : updated Provide_d_m_earnings. {status, message, data}
 */
const partialUpdateProvide_d_m_earnings = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      provide_d_m_earningsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedProvide_d_m_earnings = await dbService.update(Provide_d_m_earnings, query, dataToUpdate);
    if (!updatedProvide_d_m_earnings) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedProvide_d_m_earnings });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Provide_d_m_earnings from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Provide_d_m_earnings.
 * @return {Object} : deactivated Provide_d_m_earnings. {status, message, data}
 */
const softDeleteProvide_d_m_earnings = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Provide_d_m_earnings, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Provide_d_m_earnings from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Provide_d_m_earnings. {status, message, data}
 */
const deleteProvide_d_m_earnings = async (req, res) => {
  const result = await dbService.deleteByPk(Provide_d_m_earnings, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Provide_d_m_earnings in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyProvide_d_m_earnings = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedProvide_d_m_earnings = await dbService.destroy(Provide_d_m_earnings,query);
    return res.success({ data :{ count :deletedProvide_d_m_earnings.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Provide_d_m_earnings from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Provide_d_m_earnings.
 * @return {Object} : number of deactivated documents of Provide_d_m_earnings. {status, message, data}
 */
const softDeleteManyProvide_d_m_earnings = async (req, res) => {
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
    let updatedProvide_d_m_earnings = await dbService.update(Provide_d_m_earnings,query,updateBody, options);
    if (!updatedProvide_d_m_earnings) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedProvide_d_m_earnings.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addProvide_d_m_earnings,
  bulkInsertProvide_d_m_earnings,
  findAllProvide_d_m_earnings,
  getProvide_d_m_earnings,
  getProvide_d_m_earningsCount,
  updateProvide_d_m_earnings,
  bulkUpdateProvide_d_m_earnings,
  partialUpdateProvide_d_m_earnings,
  softDeleteProvide_d_m_earnings,
  deleteProvide_d_m_earnings,
  deleteManyProvide_d_m_earnings,
  softDeleteManyProvide_d_m_earnings,
};
