/**
 * employee_rolesController.js
 * @description :: exports action methods for employee_roles.
 */

const Employee_roles = require('../../model/employee_roles');
const employee_rolesSchemaKey = require('../../utils/validation/employee_rolesValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Employee_roles in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Employee_roles. {status, message, data}
 */ 
const addEmployee_roles = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      employee_rolesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdEmployee_roles = await dbService.createOne(Employee_roles,dataToCreate);
    return  res.success({ data :createdEmployee_roles });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Employee_roles in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Employee_roless. {status, message, data}
 */
const bulkInsertEmployee_roles = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdEmployee_roles = await dbService.createMany(Employee_roles,dataToCreate); 
      return  res.success({ data :{ count :createdEmployee_roles.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Employee_roles from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Employee_roles(s). {status, message, data}
 */
const findAllEmployee_roles = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundEmployee_roles;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      employee_rolesSchemaKey.findFilterKeys,
      Employee_roles.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundEmployee_roles = await dbService.count(Employee_roles, query);
      if (!foundEmployee_roles) {
        return res.recordNotFound();
      } 
      foundEmployee_roles = { totalRecords: foundEmployee_roles };
      return res.success({ data :foundEmployee_roles });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundEmployee_roles = await dbService.paginate( Employee_roles,query,options);
    if (!foundEmployee_roles){
      return res.recordNotFound();
    }
    return res.success({ data:foundEmployee_roles }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Employee_roles from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Employee_roles. {status, message, data}
 */
const getEmployee_roles = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundEmployee_roles = await dbService.findOne(Employee_roles,{ id :id });
    if (!foundEmployee_roles){
      return res.recordNotFound();
    }
    return  res.success({ data :foundEmployee_roles });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Employee_roles.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getEmployee_rolesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      employee_rolesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedEmployee_roles = await dbService.count(Employee_roles,where);
    if (!countedEmployee_roles){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedEmployee_roles } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Employee_roles with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Employee_roles.
 * @return {Object} : updated Employee_roles. {status, message, data}
 */
const updateEmployee_roles = async (req, res) => {
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
      employee_rolesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedEmployee_roles = await dbService.update(Employee_roles,query,dataToUpdate);
    return  res.success({ data :updatedEmployee_roles }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Employee_roles with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Employee_roless.
 * @return {Object} : updated Employee_roless. {status, message, data}
 */
const bulkUpdateEmployee_roles = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedEmployee_roles = await dbService.update(Employee_roles,filter,dataToUpdate);
    if (!updatedEmployee_roles){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedEmployee_roles.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Employee_roles with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Employee_roles.
 * @return {Object} : updated Employee_roles. {status, message, data}
 */
const partialUpdateEmployee_roles = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      employee_rolesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedEmployee_roles = await dbService.update(Employee_roles, query, dataToUpdate);
    if (!updatedEmployee_roles) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedEmployee_roles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Employee_roles from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Employee_roles.
 * @return {Object} : deactivated Employee_roles. {status, message, data}
 */
const softDeleteEmployee_roles = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Employee_roles, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Employee_roles from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Employee_roles. {status, message, data}
 */
const deleteEmployee_roles = async (req, res) => {
  const result = await dbService.deleteByPk(Employee_roles, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Employee_roles in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyEmployee_roles = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedEmployee_roles = await dbService.destroy(Employee_roles,query);
    return res.success({ data :{ count :deletedEmployee_roles.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Employee_roles from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Employee_roles.
 * @return {Object} : number of deactivated documents of Employee_roles. {status, message, data}
 */
const softDeleteManyEmployee_roles = async (req, res) => {
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
    let updatedEmployee_roles = await dbService.update(Employee_roles,query,updateBody, options);
    if (!updatedEmployee_roles) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedEmployee_roles.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addEmployee_roles,
  bulkInsertEmployee_roles,
  findAllEmployee_roles,
  getEmployee_roles,
  getEmployee_rolesCount,
  updateEmployee_roles,
  bulkUpdateEmployee_roles,
  partialUpdateEmployee_roles,
  softDeleteEmployee_roles,
  deleteEmployee_roles,
  deleteManyEmployee_roles,
  softDeleteManyEmployee_roles,
};
