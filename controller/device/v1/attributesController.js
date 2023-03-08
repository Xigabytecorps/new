/**
 * attributesController.js
 * @description :: exports action methods for attributes.
 */

const Attributes = require('../../../model/attributes');
const attributesSchemaKey = require('../../../utils/validation/attributesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Attributes in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Attributes. {status, message, data}
 */ 
const addAttributes = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      attributesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAttributes = await dbService.createOne(Attributes,dataToCreate);
    return  res.success({ data :createdAttributes });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Attributes in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Attributess. {status, message, data}
 */
const bulkInsertAttributes = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAttributes = await dbService.createMany(Attributes,dataToCreate); 
      return  res.success({ data :{ count :createdAttributes.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Attributes from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Attributes(s). {status, message, data}
 */
const findAllAttributes = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAttributes;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      attributesSchemaKey.findFilterKeys,
      Attributes.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAttributes = await dbService.count(Attributes, query);
      if (!foundAttributes) {
        return res.recordNotFound();
      } 
      foundAttributes = { totalRecords: foundAttributes };
      return res.success({ data :foundAttributes });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAttributes = await dbService.paginate( Attributes,query,options);
    if (!foundAttributes){
      return res.recordNotFound();
    }
    return res.success({ data:foundAttributes }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Attributes from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Attributes. {status, message, data}
 */
const getAttributes = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAttributes = await dbService.findOne(Attributes,{ id :id });
    if (!foundAttributes){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAttributes });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Attributes.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAttributesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      attributesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAttributes = await dbService.count(Attributes,where);
    if (!countedAttributes){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAttributes } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Attributes with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Attributes.
 * @return {Object} : updated Attributes. {status, message, data}
 */
const updateAttributes = async (req, res) => {
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
      attributesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAttributes = await dbService.update(Attributes,query,dataToUpdate);
    return  res.success({ data :updatedAttributes }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Attributes with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Attributess.
 * @return {Object} : updated Attributess. {status, message, data}
 */
const bulkUpdateAttributes = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAttributes = await dbService.update(Attributes,filter,dataToUpdate);
    if (!updatedAttributes){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAttributes.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Attributes with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Attributes.
 * @return {Object} : updated Attributes. {status, message, data}
 */
const partialUpdateAttributes = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      attributesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAttributes = await dbService.update(Attributes, query, dataToUpdate);
    if (!updatedAttributes) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAttributes });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Attributes from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Attributes.
 * @return {Object} : deactivated Attributes. {status, message, data}
 */
const softDeleteAttributes = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Attributes, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Attributes from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Attributes. {status, message, data}
 */
const deleteAttributes = async (req, res) => {
  const result = await dbService.deleteByPk(Attributes, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Attributes in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAttributes = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAttributes = await dbService.destroy(Attributes,query);
    return res.success({ data :{ count :deletedAttributes.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Attributes from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Attributes.
 * @return {Object} : number of deactivated documents of Attributes. {status, message, data}
 */
const softDeleteManyAttributes = async (req, res) => {
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
    let updatedAttributes = await dbService.update(Attributes,query,updateBody, options);
    if (!updatedAttributes) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAttributes.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAttributes,
  bulkInsertAttributes,
  findAllAttributes,
  getAttributes,
  getAttributesCount,
  updateAttributes,
  bulkUpdateAttributes,
  partialUpdateAttributes,
  softDeleteAttributes,
  deleteAttributes,
  deleteManyAttributes,
  softDeleteManyAttributes,
};
