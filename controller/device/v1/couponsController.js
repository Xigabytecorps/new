/**
 * couponsController.js
 * @description :: exports action methods for coupons.
 */

const Coupons = require('../../../model/coupons');
const couponsSchemaKey = require('../../../utils/validation/couponsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Coupons in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Coupons. {status, message, data}
 */ 
const addCoupons = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      couponsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCoupons = await dbService.createOne(Coupons,dataToCreate);
    return  res.success({ data :createdCoupons });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Coupons in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Couponss. {status, message, data}
 */
const bulkInsertCoupons = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCoupons = await dbService.createMany(Coupons,dataToCreate); 
      return  res.success({ data :{ count :createdCoupons.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Coupons from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Coupons(s). {status, message, data}
 */
const findAllCoupons = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCoupons;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      couponsSchemaKey.findFilterKeys,
      Coupons.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCoupons = await dbService.count(Coupons, query);
      if (!foundCoupons) {
        return res.recordNotFound();
      } 
      foundCoupons = { totalRecords: foundCoupons };
      return res.success({ data :foundCoupons });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCoupons = await dbService.paginate( Coupons,query,options);
    if (!foundCoupons){
      return res.recordNotFound();
    }
    return res.success({ data:foundCoupons }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Coupons from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Coupons. {status, message, data}
 */
const getCoupons = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCoupons = await dbService.findOne(Coupons,{ id :id });
    if (!foundCoupons){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCoupons });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Coupons.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCouponsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      couponsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCoupons = await dbService.count(Coupons,where);
    if (!countedCoupons){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCoupons } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Coupons with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Coupons.
 * @return {Object} : updated Coupons. {status, message, data}
 */
const updateCoupons = async (req, res) => {
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
      couponsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCoupons = await dbService.update(Coupons,query,dataToUpdate);
    return  res.success({ data :updatedCoupons }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Coupons with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Couponss.
 * @return {Object} : updated Couponss. {status, message, data}
 */
const bulkUpdateCoupons = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCoupons = await dbService.update(Coupons,filter,dataToUpdate);
    if (!updatedCoupons){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCoupons.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Coupons with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Coupons.
 * @return {Object} : updated Coupons. {status, message, data}
 */
const partialUpdateCoupons = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      couponsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCoupons = await dbService.update(Coupons, query, dataToUpdate);
    if (!updatedCoupons) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCoupons });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Coupons from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Coupons.
 * @return {Object} : deactivated Coupons. {status, message, data}
 */
const softDeleteCoupons = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Coupons, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Coupons from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Coupons. {status, message, data}
 */
const deleteCoupons = async (req, res) => {
  const result = await dbService.deleteByPk(Coupons, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Coupons in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCoupons = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedCoupons = await dbService.destroy(Coupons,query);
    return res.success({ data :{ count :deletedCoupons.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Coupons from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Coupons.
 * @return {Object} : number of deactivated documents of Coupons. {status, message, data}
 */
const softDeleteManyCoupons = async (req, res) => {
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
    let updatedCoupons = await dbService.update(Coupons,query,updateBody, options);
    if (!updatedCoupons) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedCoupons.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCoupons,
  bulkInsertCoupons,
  findAllCoupons,
  getCoupons,
  getCouponsCount,
  updateCoupons,
  bulkUpdateCoupons,
  partialUpdateCoupons,
  softDeleteCoupons,
  deleteCoupons,
  deleteManyCoupons,
  softDeleteManyCoupons,
};
