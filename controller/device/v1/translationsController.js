/**
 * translationsController.js
 * @description :: exports action methods for translations.
 */

const Translations = require('../../../model/translations');
const translationsSchemaKey = require('../../../utils/validation/translationsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Translations in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Translations. {status, message, data}
 */ 
const addTranslations = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      translationsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdTranslations = await dbService.createOne(Translations,dataToCreate);
    return  res.success({ data :createdTranslations });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Translations in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Translationss. {status, message, data}
 */
const bulkInsertTranslations = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdTranslations = await dbService.createMany(Translations,dataToCreate); 
      return  res.success({ data :{ count :createdTranslations.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Translations from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Translations(s). {status, message, data}
 */
const findAllTranslations = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundTranslations;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      translationsSchemaKey.findFilterKeys,
      Translations.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundTranslations = await dbService.count(Translations, query);
      if (!foundTranslations) {
        return res.recordNotFound();
      } 
      foundTranslations = { totalRecords: foundTranslations };
      return res.success({ data :foundTranslations });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundTranslations = await dbService.paginate( Translations,query,options);
    if (!foundTranslations){
      return res.recordNotFound();
    }
    return res.success({ data:foundTranslations }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Translations from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Translations. {status, message, data}
 */
const getTranslations = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundTranslations = await dbService.findOne(Translations,{ id :id });
    if (!foundTranslations){
      return res.recordNotFound();
    }
    return  res.success({ data :foundTranslations });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Translations.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getTranslationsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      translationsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedTranslations = await dbService.count(Translations,where);
    if (!countedTranslations){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedTranslations } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Translations with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Translations.
 * @return {Object} : updated Translations. {status, message, data}
 */
const updateTranslations = async (req, res) => {
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
      translationsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedTranslations = await dbService.update(Translations,query,dataToUpdate);
    return  res.success({ data :updatedTranslations }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Translations with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Translationss.
 * @return {Object} : updated Translationss. {status, message, data}
 */
const bulkUpdateTranslations = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedTranslations = await dbService.update(Translations,filter,dataToUpdate);
    if (!updatedTranslations){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedTranslations.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Translations with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Translations.
 * @return {Object} : updated Translations. {status, message, data}
 */
const partialUpdateTranslations = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      translationsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedTranslations = await dbService.update(Translations, query, dataToUpdate);
    if (!updatedTranslations) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedTranslations });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Translations from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Translations.
 * @return {Object} : deactivated Translations. {status, message, data}
 */
const softDeleteTranslations = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Translations, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Translations from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Translations. {status, message, data}
 */
const deleteTranslations = async (req, res) => {
  const result = await dbService.deleteByPk(Translations, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Translations in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyTranslations = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedTranslations = await dbService.destroy(Translations,query);
    return res.success({ data :{ count :deletedTranslations.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Translations from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Translations.
 * @return {Object} : number of deactivated documents of Translations. {status, message, data}
 */
const softDeleteManyTranslations = async (req, res) => {
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
    let updatedTranslations = await dbService.update(Translations,query,updateBody, options);
    if (!updatedTranslations) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedTranslations.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addTranslations,
  bulkInsertTranslations,
  findAllTranslations,
  getTranslations,
  getTranslationsCount,
  updateTranslations,
  bulkUpdateTranslations,
  partialUpdateTranslations,
  softDeleteTranslations,
  deleteTranslations,
  deleteManyTranslations,
  softDeleteManyTranslations,
};
