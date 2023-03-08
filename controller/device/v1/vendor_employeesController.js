/**
 * vendor_employeesController.js
 * @description :: exports action methods for vendor_employees.
 */

const Vendor_employees = require('../../../model/vendor_employees');
const vendor_employeesSchemaKey = require('../../../utils/validation/vendor_employeesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Vendor_employees in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Vendor_employees. {status, message, data}
 */ 
const addVendor_employees = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      vendor_employeesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdVendor_employees = await dbService.createOne(Vendor_employees,dataToCreate);
    return  res.success({ data :createdVendor_employees });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Vendor_employees in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Vendor_employeess. {status, message, data}
 */
const bulkInsertVendor_employees = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdVendor_employees = await dbService.createMany(Vendor_employees,dataToCreate); 
      return  res.success({ data :{ count :createdVendor_employees.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Vendor_employees from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Vendor_employees(s). {status, message, data}
 */
const findAllVendor_employees = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundVendor_employees;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      vendor_employeesSchemaKey.findFilterKeys,
      Vendor_employees.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundVendor_employees = await dbService.count(Vendor_employees, query);
      if (!foundVendor_employees) {
        return res.recordNotFound();
      } 
      foundVendor_employees = { totalRecords: foundVendor_employees };
      return res.success({ data :foundVendor_employees });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundVendor_employees = await dbService.paginate( Vendor_employees,query,options);
    if (!foundVendor_employees){
      return res.recordNotFound();
    }
    return res.success({ data:foundVendor_employees }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Vendor_employees from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Vendor_employees. {status, message, data}
 */
const getVendor_employees = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundVendor_employees = await dbService.findOne(Vendor_employees,{ id :id });
    if (!foundVendor_employees){
      return res.recordNotFound();
    }
    return  res.success({ data :foundVendor_employees });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Vendor_employees.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getVendor_employeesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      vendor_employeesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedVendor_employees = await dbService.count(Vendor_employees,where);
    if (!countedVendor_employees){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedVendor_employees } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Vendor_employees with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Vendor_employees.
 * @return {Object} : updated Vendor_employees. {status, message, data}
 */
const updateVendor_employees = async (req, res) => {
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
      vendor_employeesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedVendor_employees = await dbService.update(Vendor_employees,query,dataToUpdate);
    return  res.success({ data :updatedVendor_employees }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Vendor_employees with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Vendor_employeess.
 * @return {Object} : updated Vendor_employeess. {status, message, data}
 */
const bulkUpdateVendor_employees = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedVendor_employees = await dbService.update(Vendor_employees,filter,dataToUpdate);
    if (!updatedVendor_employees){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedVendor_employees.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Vendor_employees with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Vendor_employees.
 * @return {Object} : updated Vendor_employees. {status, message, data}
 */
const partialUpdateVendor_employees = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      vendor_employeesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedVendor_employees = await dbService.update(Vendor_employees, query, dataToUpdate);
    if (!updatedVendor_employees) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedVendor_employees });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Vendor_employees from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Vendor_employees.
 * @return {Object} : deactivated Vendor_employees. {status, message, data}
 */
const softDeleteVendor_employees = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Vendor_employees, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Vendor_employees from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Vendor_employees. {status, message, data}
 */
const deleteVendor_employees = async (req, res) => {
  const result = await dbService.deleteByPk(Vendor_employees, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Vendor_employees in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyVendor_employees = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedVendor_employees = await dbService.destroy(Vendor_employees,query);
    return res.success({ data :{ count :deletedVendor_employees.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Vendor_employees from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Vendor_employees.
 * @return {Object} : number of deactivated documents of Vendor_employees. {status, message, data}
 */
const softDeleteManyVendor_employees = async (req, res) => {
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
    let updatedVendor_employees = await dbService.update(Vendor_employees,query,updateBody, options);
    if (!updatedVendor_employees) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedVendor_employees.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addVendor_employees,
  bulkInsertVendor_employees,
  findAllVendor_employees,
  getVendor_employees,
  getVendor_employeesCount,
  updateVendor_employees,
  bulkUpdateVendor_employees,
  partialUpdateVendor_employees,
  softDeleteVendor_employees,
  deleteVendor_employees,
  deleteManyVendor_employees,
  softDeleteManyVendor_employees,
};
