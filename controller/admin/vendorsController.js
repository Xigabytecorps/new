/**
 * vendorsController.js
 * @description :: exports action methods for vendors.
 */

const Vendors = require('../../model/vendors');
const vendorsSchemaKey = require('../../utils/validation/vendorsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Vendors in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Vendors. {status, message, data}
 */ 
const addVendors = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      vendorsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdVendors = await dbService.createOne(Vendors,dataToCreate);
    return  res.success({ data :createdVendors });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Vendors in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Vendorss. {status, message, data}
 */
const bulkInsertVendors = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdVendors = await dbService.createMany(Vendors,dataToCreate); 
      return  res.success({ data :{ count :createdVendors.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Vendors from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Vendors(s). {status, message, data}
 */
const findAllVendors = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundVendors;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      vendorsSchemaKey.findFilterKeys,
      Vendors.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundVendors = await dbService.count(Vendors, query);
      if (!foundVendors) {
        return res.recordNotFound();
      } 
      foundVendors = { totalRecords: foundVendors };
      return res.success({ data :foundVendors });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundVendors = await dbService.paginate( Vendors,query,options);
    if (!foundVendors){
      return res.recordNotFound();
    }
    return res.success({ data:foundVendors }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Vendors from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Vendors. {status, message, data}
 */
const getVendors = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundVendors = await dbService.findOne(Vendors,{ id :id });
    if (!foundVendors){
      return res.recordNotFound();
    }
    return  res.success({ data :foundVendors });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Vendors.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getVendorsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      vendorsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedVendors = await dbService.count(Vendors,where);
    if (!countedVendors){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedVendors } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Vendors with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Vendors.
 * @return {Object} : updated Vendors. {status, message, data}
 */
const updateVendors = async (req, res) => {
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
      vendorsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedVendors = await dbService.update(Vendors,query,dataToUpdate);
    return  res.success({ data :updatedVendors }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Vendors with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Vendorss.
 * @return {Object} : updated Vendorss. {status, message, data}
 */
const bulkUpdateVendors = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedVendors = await dbService.update(Vendors,filter,dataToUpdate);
    if (!updatedVendors){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedVendors.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Vendors with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Vendors.
 * @return {Object} : updated Vendors. {status, message, data}
 */
const partialUpdateVendors = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      vendorsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedVendors = await dbService.update(Vendors, query, dataToUpdate);
    if (!updatedVendors) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedVendors });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Vendors from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Vendors.
 * @return {Object} : deactivated Vendors. {status, message, data}
 */
const softDeleteVendors = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Vendors, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Vendors from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Vendors. {status, message, data}
 */
const deleteVendors = async (req, res) => {
  const result = await dbService.deleteByPk(Vendors, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Vendors in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyVendors = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedVendors = await dbService.destroy(Vendors,query);
    return res.success({ data :{ count :deletedVendors.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Vendors from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Vendors.
 * @return {Object} : number of deactivated documents of Vendors. {status, message, data}
 */
const softDeleteManyVendors = async (req, res) => {
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
    let updatedVendors = await dbService.update(Vendors,query,updateBody, options);
    if (!updatedVendors) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedVendors.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addVendors,
  bulkInsertVendors,
  findAllVendors,
  getVendors,
  getVendorsCount,
  updateVendors,
  bulkUpdateVendors,
  partialUpdateVendors,
  softDeleteVendors,
  deleteVendors,
  deleteManyVendors,
  softDeleteManyVendors,
};
