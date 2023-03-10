/**
 * admin_walletsController.js
 * @description :: exports action methods for admin_wallets.
 */

const Admin_wallets = require('../../../model/admin_wallets');
const admin_walletsSchemaKey = require('../../../utils/validation/admin_walletsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Admin_wallets in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Admin_wallets. {status, message, data}
 */ 
const addAdmin_wallets = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      admin_walletsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAdmin_wallets = await dbService.createOne(Admin_wallets,dataToCreate);
    return  res.success({ data :createdAdmin_wallets });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Admin_wallets in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Admin_walletss. {status, message, data}
 */
const bulkInsertAdmin_wallets = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAdmin_wallets = await dbService.createMany(Admin_wallets,dataToCreate); 
      return  res.success({ data :{ count :createdAdmin_wallets.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Admin_wallets from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Admin_wallets(s). {status, message, data}
 */
const findAllAdmin_wallets = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdmin_wallets;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      admin_walletsSchemaKey.findFilterKeys,
      Admin_wallets.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdmin_wallets = await dbService.count(Admin_wallets, query);
      if (!foundAdmin_wallets) {
        return res.recordNotFound();
      } 
      foundAdmin_wallets = { totalRecords: foundAdmin_wallets };
      return res.success({ data :foundAdmin_wallets });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdmin_wallets = await dbService.paginate( Admin_wallets,query,options);
    if (!foundAdmin_wallets){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdmin_wallets }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Admin_wallets from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Admin_wallets. {status, message, data}
 */
const getAdmin_wallets = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdmin_wallets = await dbService.findOne(Admin_wallets,{ id :id });
    if (!foundAdmin_wallets){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdmin_wallets });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Admin_wallets.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdmin_walletsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      admin_walletsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdmin_wallets = await dbService.count(Admin_wallets,where);
    if (!countedAdmin_wallets){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdmin_wallets } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Admin_wallets with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_wallets.
 * @return {Object} : updated Admin_wallets. {status, message, data}
 */
const updateAdmin_wallets = async (req, res) => {
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
      admin_walletsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdmin_wallets = await dbService.update(Admin_wallets,query,dataToUpdate);
    return  res.success({ data :updatedAdmin_wallets }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Admin_wallets with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_walletss.
 * @return {Object} : updated Admin_walletss. {status, message, data}
 */
const bulkUpdateAdmin_wallets = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAdmin_wallets = await dbService.update(Admin_wallets,filter,dataToUpdate);
    if (!updatedAdmin_wallets){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdmin_wallets.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Admin_wallets with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_wallets.
 * @return {Object} : updated Admin_wallets. {status, message, data}
 */
const partialUpdateAdmin_wallets = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      admin_walletsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdmin_wallets = await dbService.update(Admin_wallets, query, dataToUpdate);
    if (!updatedAdmin_wallets) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdmin_wallets });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Admin_wallets from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Admin_wallets.
 * @return {Object} : deactivated Admin_wallets. {status, message, data}
 */
const softDeleteAdmin_wallets = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Admin_wallets, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Admin_wallets from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Admin_wallets. {status, message, data}
 */
const deleteAdmin_wallets = async (req, res) => {
  const result = await dbService.deleteByPk(Admin_wallets, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Admin_wallets in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdmin_wallets = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAdmin_wallets = await dbService.destroy(Admin_wallets,query);
    return res.success({ data :{ count :deletedAdmin_wallets.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Admin_wallets from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Admin_wallets.
 * @return {Object} : number of deactivated documents of Admin_wallets. {status, message, data}
 */
const softDeleteManyAdmin_wallets = async (req, res) => {
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
    let updatedAdmin_wallets = await dbService.update(Admin_wallets,query,updateBody, options);
    if (!updatedAdmin_wallets) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAdmin_wallets.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdmin_wallets,
  bulkInsertAdmin_wallets,
  findAllAdmin_wallets,
  getAdmin_wallets,
  getAdmin_walletsCount,
  updateAdmin_wallets,
  bulkUpdateAdmin_wallets,
  partialUpdateAdmin_wallets,
  softDeleteAdmin_wallets,
  deleteAdmin_wallets,
  deleteManyAdmin_wallets,
  softDeleteManyAdmin_wallets,
};
