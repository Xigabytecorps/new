/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Withdraw_requests = require('../model/withdraw_requests');
let Wishlists = require('../model/wishlists');
let Vendor_employees = require('../model/vendor_employees');
let Vendors = require('../model/vendors');
let User_notifications = require('../model/user_notifications');
let Users = require('../model/users');
let Translations = require('../model/translations');
let Track_deliverymen = require('../model/track_deliverymen');
let Soft_credentials = require('../model/soft_credentials');
let Reviews = require('../model/reviews');
let Restaurant_zone = require('../model/restaurant_zone');
let Restaurant_wallets = require('../model/restaurant_wallets');
let Restaurants = require('../model/restaurants');
let Provide_d_m_earnings = require('../model/provide_d_m_earnings');
let Phone_verifications = require('../model/phone_verifications');
let Password_resets = require('../model/password_resets');
let Order_transactions = require('../model/order_transactions');
let Order_details = require('../model/order_details');
let Order_delivery_histories = require('../model/order_delivery_histories');
let Orders = require('../model/orders');
let Oauth_refresh_tokens = require('../model/oauth_refresh_tokens');
let Oauth_personal_access_clients = require('../model/oauth_personal_access_clients');
let Oauth_clients = require('../model/oauth_clients');
let Oauth_auth_codes = require('../model/oauth_auth_codes');
let Oauth_access_tokens = require('../model/oauth_access_tokens');
let Notifications = require('../model/notifications');
let Migrations = require('../model/migrations');
let Mail_configs = require('../model/mail_configs');
let Item_campaigns = require('../model/item_campaigns');
let Food = require('../model/food');
let Failed_jobs = require('../model/failed_jobs');
let Employee_roles = require('../model/employee_roles');
let Email_verifications = require('../model/email_verifications');
let D_m_reviews = require('../model/d_m_reviews');
let Discounts = require('../model/discounts');
let Delivery_men = require('../model/delivery_men');
let Delivery_man_wallets = require('../model/delivery_man_wallets');
let Delivery_histories = require('../model/delivery_histories');
let Customer_addresses = require('../model/customer_addresses');
let Currencies = require('../model/currencies');
let Coupons = require('../model/coupons');
let Conversations = require('../model/conversations');
let Categories = require('../model/categories');
let Campaign_restaurant = require('../model/campaign_restaurant');
let Campaigns = require('../model/campaigns');
let Business_settings = require('../model/business_settings');
let Banners = require('../model/banners');
let Attributes = require('../model/attributes');
let Admin_wallets = require('../model/admin_wallets');
let Admin_roles = require('../model/admin_roles');
let Admins = require('../model/admins');
let Add_ons = require('../model/add_ons');
let Account_transactions = require('../model/account_transactions');
let User = require('../model/user');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteWithdraw_requests = async (filter) =>{
  try {
    let response  = await dbService.destroy(Withdraw_requests,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteWishlists = async (filter) =>{
  try {
    let response  = await dbService.destroy(Wishlists,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteVendor_employees = async (filter) =>{
  try {
    let response  = await dbService.destroy(Vendor_employees,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteVendors = async (filter) =>{
  try {
    let response  = await dbService.destroy(Vendors,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser_notifications = async (filter) =>{
  try {
    let response  = await dbService.destroy(User_notifications,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUsers = async (filter) =>{
  try {
    let response  = await dbService.destroy(Users,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTranslations = async (filter) =>{
  try {
    let response  = await dbService.destroy(Translations,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTrack_deliverymen = async (filter) =>{
  try {
    let response  = await dbService.destroy(Track_deliverymen,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSoft_credentials = async (filter) =>{
  try {
    let response  = await dbService.destroy(Soft_credentials,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteReviews = async (filter) =>{
  try {
    let response  = await dbService.destroy(Reviews,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRestaurant_zone = async (filter) =>{
  try {
    let response  = await dbService.destroy(Restaurant_zone,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRestaurant_wallets = async (filter) =>{
  try {
    let response  = await dbService.destroy(Restaurant_wallets,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRestaurants = async (filter) =>{
  try {
    let response  = await dbService.destroy(Restaurants,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProvide_d_m_earnings = async (filter) =>{
  try {
    let response  = await dbService.destroy(Provide_d_m_earnings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePhone_verifications = async (filter) =>{
  try {
    let response  = await dbService.destroy(Phone_verifications,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePassword_resets = async (filter) =>{
  try {
    let response  = await dbService.destroy(Password_resets,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrder_transactions = async (filter) =>{
  try {
    let response  = await dbService.destroy(Order_transactions,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrder_details = async (filter) =>{
  try {
    let response  = await dbService.destroy(Order_details,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrder_delivery_histories = async (filter) =>{
  try {
    let response  = await dbService.destroy(Order_delivery_histories,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrders = async (filter) =>{
  try {
    let response  = await dbService.destroy(Orders,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOauth_refresh_tokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(Oauth_refresh_tokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOauth_personal_access_clients = async (filter) =>{
  try {
    let response  = await dbService.destroy(Oauth_personal_access_clients,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOauth_clients = async (filter) =>{
  try {
    let response  = await dbService.destroy(Oauth_clients,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOauth_auth_codes = async (filter) =>{
  try {
    let response  = await dbService.destroy(Oauth_auth_codes,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOauth_access_tokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(Oauth_access_tokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteNotifications = async (filter) =>{
  try {
    let response  = await dbService.destroy(Notifications,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMigrations = async (filter) =>{
  try {
    let response  = await dbService.destroy(Migrations,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMail_configs = async (filter) =>{
  try {
    let response  = await dbService.destroy(Mail_configs,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItem_campaigns = async (filter) =>{
  try {
    let response  = await dbService.destroy(Item_campaigns,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteFood = async (filter) =>{
  try {
    let response  = await dbService.destroy(Food,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteFailed_jobs = async (filter) =>{
  try {
    let response  = await dbService.destroy(Failed_jobs,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEmployee_roles = async (filter) =>{
  try {
    let response  = await dbService.destroy(Employee_roles,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEmail_verifications = async (filter) =>{
  try {
    let response  = await dbService.destroy(Email_verifications,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteD_m_reviews = async (filter) =>{
  try {
    let response  = await dbService.destroy(D_m_reviews,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDiscounts = async (filter) =>{
  try {
    let response  = await dbService.destroy(Discounts,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDelivery_men = async (filter) =>{
  try {
    let response  = await dbService.destroy(Delivery_men,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDelivery_man_wallets = async (filter) =>{
  try {
    let response  = await dbService.destroy(Delivery_man_wallets,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDelivery_histories = async (filter) =>{
  try {
    let response  = await dbService.destroy(Delivery_histories,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCustomer_addresses = async (filter) =>{
  try {
    let response  = await dbService.destroy(Customer_addresses,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCurrencies = async (filter) =>{
  try {
    let response  = await dbService.destroy(Currencies,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCoupons = async (filter) =>{
  try {
    let response  = await dbService.destroy(Coupons,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteConversations = async (filter) =>{
  try {
    let response  = await dbService.destroy(Conversations,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCategories = async (filter) =>{
  try {
    let response  = await dbService.destroy(Categories,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCampaign_restaurant = async (filter) =>{
  try {
    let response  = await dbService.destroy(Campaign_restaurant,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCampaigns = async (filter) =>{
  try {
    let response  = await dbService.destroy(Campaigns,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBusiness_settings = async (filter) =>{
  try {
    let response  = await dbService.destroy(Business_settings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBanners = async (filter) =>{
  try {
    let response  = await dbService.destroy(Banners,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAttributes = async (filter) =>{
  try {
    let response  = await dbService.destroy(Attributes,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin_wallets = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admin_wallets,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin_roles = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admin_roles,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmins = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admins,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdd_ons = async (filter) =>{
  try {
    let response  = await dbService.destroy(Add_ons,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAccount_transactions = async (filter) =>{
  try {
    let response  = await dbService.destroy(Account_transactions,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const withdraw_requestsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const withdraw_requestsCnt = await dbService.destroy(Withdraw_requests,withdraw_requestsFilter);

      const wishlistsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const wishlistsCnt = await dbService.destroy(Wishlists,wishlistsFilter);

      const vendor_employeesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const vendor_employeesCnt = await dbService.destroy(Vendor_employees,vendor_employeesFilter);

      const vendorsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const vendorsCnt = await dbService.destroy(Vendors,vendorsFilter);

      const user_notificationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const user_notificationsCnt = await dbService.destroy(User_notifications,user_notificationsFilter);

      const usersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const usersCnt = await dbService.destroy(Users,usersFilter);

      const translationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const translationsCnt = await dbService.destroy(Translations,translationsFilter);

      const track_deliverymenFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const track_deliverymenCnt = await dbService.destroy(Track_deliverymen,track_deliverymenFilter);

      const soft_credentialsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const soft_credentialsCnt = await dbService.destroy(Soft_credentials,soft_credentialsFilter);

      const reviewsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const reviewsCnt = await dbService.destroy(Reviews,reviewsFilter);

      const restaurant_zoneFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const restaurant_zoneCnt = await dbService.destroy(Restaurant_zone,restaurant_zoneFilter);

      const restaurant_walletsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const restaurant_walletsCnt = await dbService.destroy(Restaurant_wallets,restaurant_walletsFilter);

      const restaurantsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const restaurantsCnt = await dbService.destroy(Restaurants,restaurantsFilter);

      const provide_d_m_earningsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const provide_d_m_earningsCnt = await dbService.destroy(Provide_d_m_earnings,provide_d_m_earningsFilter);

      const phone_verificationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const phone_verificationsCnt = await dbService.destroy(Phone_verifications,phone_verificationsFilter);

      const password_resetsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const password_resetsCnt = await dbService.destroy(Password_resets,password_resetsFilter);

      const order_transactionsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const order_transactionsCnt = await dbService.destroy(Order_transactions,order_transactionsFilter);

      const order_detailsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const order_detailsCnt = await dbService.destroy(Order_details,order_detailsFilter);

      const order_delivery_historiesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const order_delivery_historiesCnt = await dbService.destroy(Order_delivery_histories,order_delivery_historiesFilter);

      const ordersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ordersCnt = await dbService.destroy(Orders,ordersFilter);

      const oauth_refresh_tokensFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const oauth_refresh_tokensCnt = await dbService.destroy(Oauth_refresh_tokens,oauth_refresh_tokensFilter);

      const oauth_personal_access_clientsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const oauth_personal_access_clientsCnt = await dbService.destroy(Oauth_personal_access_clients,oauth_personal_access_clientsFilter);

      const oauth_clientsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const oauth_clientsCnt = await dbService.destroy(Oauth_clients,oauth_clientsFilter);

      const oauth_auth_codesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const oauth_auth_codesCnt = await dbService.destroy(Oauth_auth_codes,oauth_auth_codesFilter);

      const oauth_access_tokensFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const oauth_access_tokensCnt = await dbService.destroy(Oauth_access_tokens,oauth_access_tokensFilter);

      const notificationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const notificationsCnt = await dbService.destroy(Notifications,notificationsFilter);

      const migrationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const migrationsCnt = await dbService.destroy(Migrations,migrationsFilter);

      const mail_configsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const mail_configsCnt = await dbService.destroy(Mail_configs,mail_configsFilter);

      const item_campaignsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const item_campaignsCnt = await dbService.destroy(Item_campaigns,item_campaignsFilter);

      const foodFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const foodCnt = await dbService.destroy(Food,foodFilter);

      const failed_jobsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const failed_jobsCnt = await dbService.destroy(Failed_jobs,failed_jobsFilter);

      const employee_rolesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const employee_rolesCnt = await dbService.destroy(Employee_roles,employee_rolesFilter);

      const email_verificationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const email_verificationsCnt = await dbService.destroy(Email_verifications,email_verificationsFilter);

      const d_m_reviewsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const d_m_reviewsCnt = await dbService.destroy(D_m_reviews,d_m_reviewsFilter);

      const discountsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const discountsCnt = await dbService.destroy(Discounts,discountsFilter);

      const delivery_menFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const delivery_menCnt = await dbService.destroy(Delivery_men,delivery_menFilter);

      const delivery_man_walletsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const delivery_man_walletsCnt = await dbService.destroy(Delivery_man_wallets,delivery_man_walletsFilter);

      const delivery_historiesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const delivery_historiesCnt = await dbService.destroy(Delivery_histories,delivery_historiesFilter);

      const customer_addressesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const customer_addressesCnt = await dbService.destroy(Customer_addresses,customer_addressesFilter);

      const currenciesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const currenciesCnt = await dbService.destroy(Currencies,currenciesFilter);

      const couponsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const couponsCnt = await dbService.destroy(Coupons,couponsFilter);

      const conversationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const conversationsCnt = await dbService.destroy(Conversations,conversationsFilter);

      const categoriesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoriesCnt = await dbService.destroy(Categories,categoriesFilter);

      const campaign_restaurantFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const campaign_restaurantCnt = await dbService.destroy(Campaign_restaurant,campaign_restaurantFilter);

      const campaignsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const campaignsCnt = await dbService.destroy(Campaigns,campaignsFilter);

      const business_settingsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const business_settingsCnt = await dbService.destroy(Business_settings,business_settingsFilter);

      const bannersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const bannersCnt = await dbService.destroy(Banners,bannersFilter);

      const attributesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const attributesCnt = await dbService.destroy(Attributes,attributesFilter);

      const admin_walletsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_walletsCnt = await dbService.destroy(Admin_wallets,admin_walletsFilter);

      const admin_rolesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_rolesCnt = await dbService.destroy(Admin_roles,admin_rolesFilter);

      const adminsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const adminsCnt = await dbService.destroy(Admins,adminsFilter);

      const add_onsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const add_onsCnt = await dbService.destroy(Add_ons,add_onsFilter);

      const account_transactionsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const account_transactionsCnt = await dbService.destroy(Account_transactions,account_transactionsFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.destroy(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(User,filter);
      let response = {
        withdraw_requests :withdraw_requestsCnt.length,
        wishlists :wishlistsCnt.length,
        vendor_employees :vendor_employeesCnt.length,
        vendors :vendorsCnt.length,
        user_notifications :user_notificationsCnt.length,
        users :usersCnt.length,
        translations :translationsCnt.length,
        track_deliverymen :track_deliverymenCnt.length,
        soft_credentials :soft_credentialsCnt.length,
        reviews :reviewsCnt.length,
        restaurant_zone :restaurant_zoneCnt.length,
        restaurant_wallets :restaurant_walletsCnt.length,
        restaurants :restaurantsCnt.length,
        provide_d_m_earnings :provide_d_m_earningsCnt.length,
        phone_verifications :phone_verificationsCnt.length,
        password_resets :password_resetsCnt.length,
        order_transactions :order_transactionsCnt.length,
        order_details :order_detailsCnt.length,
        order_delivery_histories :order_delivery_historiesCnt.length,
        orders :ordersCnt.length,
        oauth_refresh_tokens :oauth_refresh_tokensCnt.length,
        oauth_personal_access_clients :oauth_personal_access_clientsCnt.length,
        oauth_clients :oauth_clientsCnt.length,
        oauth_auth_codes :oauth_auth_codesCnt.length,
        oauth_access_tokens :oauth_access_tokensCnt.length,
        notifications :notificationsCnt.length,
        migrations :migrationsCnt.length,
        mail_configs :mail_configsCnt.length,
        item_campaigns :item_campaignsCnt.length,
        food :foodCnt.length,
        failed_jobs :failed_jobsCnt.length,
        employee_roles :employee_rolesCnt.length,
        email_verifications :email_verificationsCnt.length,
        d_m_reviews :d_m_reviewsCnt.length,
        discounts :discountsCnt.length,
        delivery_men :delivery_menCnt.length,
        delivery_man_wallets :delivery_man_walletsCnt.length,
        delivery_histories :delivery_historiesCnt.length,
        customer_addresses :customer_addressesCnt.length,
        currencies :currenciesCnt.length,
        coupons :couponsCnt.length,
        conversations :conversationsCnt.length,
        categories :categoriesCnt.length,
        campaign_restaurant :campaign_restaurantCnt.length,
        campaigns :campaignsCnt.length,
        business_settings :business_settingsCnt.length,
        banners :bannersCnt.length,
        attributes :attributesCnt.length,
        admin_wallets :admin_walletsCnt.length,
        admin_roles :admin_rolesCnt.length,
        admins :adminsCnt.length,
        add_ons :add_onsCnt.length,
        account_transactions :account_transactionsCnt.length,
        user :userCnt.length + deleted.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countWithdraw_requests = async (filter) =>{
  try {
    const withdraw_requestsCnt =  await dbService.count(Withdraw_requests,filter);
    return { withdraw_requests : withdraw_requestsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countWishlists = async (filter) =>{
  try {
    const wishlistsCnt =  await dbService.count(Wishlists,filter);
    return { wishlists : wishlistsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countVendor_employees = async (filter) =>{
  try {
    const vendor_employeesCnt =  await dbService.count(Vendor_employees,filter);
    return { vendor_employees : vendor_employeesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countVendors = async (filter) =>{
  try {
    const vendorsCnt =  await dbService.count(Vendors,filter);
    return { vendors : vendorsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser_notifications = async (filter) =>{
  try {
    const user_notificationsCnt =  await dbService.count(User_notifications,filter);
    return { user_notifications : user_notificationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUsers = async (filter) =>{
  try {
    const usersCnt =  await dbService.count(Users,filter);
    return { users : usersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTranslations = async (filter) =>{
  try {
    const translationsCnt =  await dbService.count(Translations,filter);
    return { translations : translationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTrack_deliverymen = async (filter) =>{
  try {
    const track_deliverymenCnt =  await dbService.count(Track_deliverymen,filter);
    return { track_deliverymen : track_deliverymenCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countSoft_credentials = async (filter) =>{
  try {
    const soft_credentialsCnt =  await dbService.count(Soft_credentials,filter);
    return { soft_credentials : soft_credentialsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countReviews = async (filter) =>{
  try {
    const reviewsCnt =  await dbService.count(Reviews,filter);
    return { reviews : reviewsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRestaurant_zone = async (filter) =>{
  try {
    const restaurant_zoneCnt =  await dbService.count(Restaurant_zone,filter);
    return { restaurant_zone : restaurant_zoneCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRestaurant_wallets = async (filter) =>{
  try {
    const restaurant_walletsCnt =  await dbService.count(Restaurant_wallets,filter);
    return { restaurant_wallets : restaurant_walletsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRestaurants = async (filter) =>{
  try {
    const restaurantsCnt =  await dbService.count(Restaurants,filter);
    return { restaurants : restaurantsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countProvide_d_m_earnings = async (filter) =>{
  try {
    const provide_d_m_earningsCnt =  await dbService.count(Provide_d_m_earnings,filter);
    return { provide_d_m_earnings : provide_d_m_earningsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPhone_verifications = async (filter) =>{
  try {
    const phone_verificationsCnt =  await dbService.count(Phone_verifications,filter);
    return { phone_verifications : phone_verificationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPassword_resets = async (filter) =>{
  try {
    const password_resetsCnt =  await dbService.count(Password_resets,filter);
    return { password_resets : password_resetsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrder_transactions = async (filter) =>{
  try {
    const order_transactionsCnt =  await dbService.count(Order_transactions,filter);
    return { order_transactions : order_transactionsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrder_details = async (filter) =>{
  try {
    const order_detailsCnt =  await dbService.count(Order_details,filter);
    return { order_details : order_detailsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrder_delivery_histories = async (filter) =>{
  try {
    const order_delivery_historiesCnt =  await dbService.count(Order_delivery_histories,filter);
    return { order_delivery_histories : order_delivery_historiesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrders = async (filter) =>{
  try {
    const ordersCnt =  await dbService.count(Orders,filter);
    return { orders : ordersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOauth_refresh_tokens = async (filter) =>{
  try {
    const oauth_refresh_tokensCnt =  await dbService.count(Oauth_refresh_tokens,filter);
    return { oauth_refresh_tokens : oauth_refresh_tokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOauth_personal_access_clients = async (filter) =>{
  try {
    const oauth_personal_access_clientsCnt =  await dbService.count(Oauth_personal_access_clients,filter);
    return { oauth_personal_access_clients : oauth_personal_access_clientsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOauth_clients = async (filter) =>{
  try {
    const oauth_clientsCnt =  await dbService.count(Oauth_clients,filter);
    return { oauth_clients : oauth_clientsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOauth_auth_codes = async (filter) =>{
  try {
    const oauth_auth_codesCnt =  await dbService.count(Oauth_auth_codes,filter);
    return { oauth_auth_codes : oauth_auth_codesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOauth_access_tokens = async (filter) =>{
  try {
    const oauth_access_tokensCnt =  await dbService.count(Oauth_access_tokens,filter);
    return { oauth_access_tokens : oauth_access_tokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countNotifications = async (filter) =>{
  try {
    const notificationsCnt =  await dbService.count(Notifications,filter);
    return { notifications : notificationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMigrations = async (filter) =>{
  try {
    const migrationsCnt =  await dbService.count(Migrations,filter);
    return { migrations : migrationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMail_configs = async (filter) =>{
  try {
    const mail_configsCnt =  await dbService.count(Mail_configs,filter);
    return { mail_configs : mail_configsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countItem_campaigns = async (filter) =>{
  try {
    const item_campaignsCnt =  await dbService.count(Item_campaigns,filter);
    return { item_campaigns : item_campaignsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countFood = async (filter) =>{
  try {
    const foodCnt =  await dbService.count(Food,filter);
    return { food : foodCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countFailed_jobs = async (filter) =>{
  try {
    const failed_jobsCnt =  await dbService.count(Failed_jobs,filter);
    return { failed_jobs : failed_jobsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEmployee_roles = async (filter) =>{
  try {
    const employee_rolesCnt =  await dbService.count(Employee_roles,filter);
    return { employee_roles : employee_rolesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEmail_verifications = async (filter) =>{
  try {
    const email_verificationsCnt =  await dbService.count(Email_verifications,filter);
    return { email_verifications : email_verificationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countD_m_reviews = async (filter) =>{
  try {
    const d_m_reviewsCnt =  await dbService.count(D_m_reviews,filter);
    return { d_m_reviews : d_m_reviewsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countDiscounts = async (filter) =>{
  try {
    const discountsCnt =  await dbService.count(Discounts,filter);
    return { discounts : discountsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countDelivery_men = async (filter) =>{
  try {
    const delivery_menCnt =  await dbService.count(Delivery_men,filter);
    return { delivery_men : delivery_menCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countDelivery_man_wallets = async (filter) =>{
  try {
    const delivery_man_walletsCnt =  await dbService.count(Delivery_man_wallets,filter);
    return { delivery_man_wallets : delivery_man_walletsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countDelivery_histories = async (filter) =>{
  try {
    const delivery_historiesCnt =  await dbService.count(Delivery_histories,filter);
    return { delivery_histories : delivery_historiesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCustomer_addresses = async (filter) =>{
  try {
    const customer_addressesCnt =  await dbService.count(Customer_addresses,filter);
    return { customer_addresses : customer_addressesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCurrencies = async (filter) =>{
  try {
    const currenciesCnt =  await dbService.count(Currencies,filter);
    return { currencies : currenciesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCoupons = async (filter) =>{
  try {
    const couponsCnt =  await dbService.count(Coupons,filter);
    return { coupons : couponsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countConversations = async (filter) =>{
  try {
    const conversationsCnt =  await dbService.count(Conversations,filter);
    return { conversations : conversationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCategories = async (filter) =>{
  try {
    const categoriesCnt =  await dbService.count(Categories,filter);
    return { categories : categoriesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCampaign_restaurant = async (filter) =>{
  try {
    const campaign_restaurantCnt =  await dbService.count(Campaign_restaurant,filter);
    return { campaign_restaurant : campaign_restaurantCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCampaigns = async (filter) =>{
  try {
    const campaignsCnt =  await dbService.count(Campaigns,filter);
    return { campaigns : campaignsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBusiness_settings = async (filter) =>{
  try {
    const business_settingsCnt =  await dbService.count(Business_settings,filter);
    return { business_settings : business_settingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBanners = async (filter) =>{
  try {
    const bannersCnt =  await dbService.count(Banners,filter);
    return { banners : bannersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAttributes = async (filter) =>{
  try {
    const attributesCnt =  await dbService.count(Attributes,filter);
    return { attributes : attributesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin_wallets = async (filter) =>{
  try {
    const admin_walletsCnt =  await dbService.count(Admin_wallets,filter);
    return { admin_wallets : admin_walletsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin_roles = async (filter) =>{
  try {
    const admin_rolesCnt =  await dbService.count(Admin_roles,filter);
    return { admin_roles : admin_rolesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmins = async (filter) =>{
  try {
    const adminsCnt =  await dbService.count(Admins,filter);
    return { admins : adminsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdd_ons = async (filter) =>{
  try {
    const add_onsCnt =  await dbService.count(Add_ons,filter);
    return { add_ons : add_onsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAccount_transactions = async (filter) =>{
  try {
    const account_transactionsCnt =  await dbService.count(Account_transactions,filter);
    return { account_transactions : account_transactionsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const withdraw_requestsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const withdraw_requestsCnt =  await dbService.count(Withdraw_requests,withdraw_requestsFilter);

      const wishlistsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const wishlistsCnt =  await dbService.count(Wishlists,wishlistsFilter);

      const vendor_employeesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const vendor_employeesCnt =  await dbService.count(Vendor_employees,vendor_employeesFilter);

      const vendorsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const vendorsCnt =  await dbService.count(Vendors,vendorsFilter);

      const user_notificationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const user_notificationsCnt =  await dbService.count(User_notifications,user_notificationsFilter);

      const usersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const usersCnt =  await dbService.count(Users,usersFilter);

      const translationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const translationsCnt =  await dbService.count(Translations,translationsFilter);

      const track_deliverymenFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const track_deliverymenCnt =  await dbService.count(Track_deliverymen,track_deliverymenFilter);

      const soft_credentialsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const soft_credentialsCnt =  await dbService.count(Soft_credentials,soft_credentialsFilter);

      const reviewsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const reviewsCnt =  await dbService.count(Reviews,reviewsFilter);

      const restaurant_zoneFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const restaurant_zoneCnt =  await dbService.count(Restaurant_zone,restaurant_zoneFilter);

      const restaurant_walletsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const restaurant_walletsCnt =  await dbService.count(Restaurant_wallets,restaurant_walletsFilter);

      const restaurantsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const restaurantsCnt =  await dbService.count(Restaurants,restaurantsFilter);

      const provide_d_m_earningsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const provide_d_m_earningsCnt =  await dbService.count(Provide_d_m_earnings,provide_d_m_earningsFilter);

      const phone_verificationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const phone_verificationsCnt =  await dbService.count(Phone_verifications,phone_verificationsFilter);

      const password_resetsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const password_resetsCnt =  await dbService.count(Password_resets,password_resetsFilter);

      const order_transactionsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const order_transactionsCnt =  await dbService.count(Order_transactions,order_transactionsFilter);

      const order_detailsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const order_detailsCnt =  await dbService.count(Order_details,order_detailsFilter);

      const order_delivery_historiesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const order_delivery_historiesCnt =  await dbService.count(Order_delivery_histories,order_delivery_historiesFilter);

      const ordersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ordersCnt =  await dbService.count(Orders,ordersFilter);

      const oauth_refresh_tokensFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const oauth_refresh_tokensCnt =  await dbService.count(Oauth_refresh_tokens,oauth_refresh_tokensFilter);

      const oauth_personal_access_clientsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const oauth_personal_access_clientsCnt =  await dbService.count(Oauth_personal_access_clients,oauth_personal_access_clientsFilter);

      const oauth_clientsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const oauth_clientsCnt =  await dbService.count(Oauth_clients,oauth_clientsFilter);

      const oauth_auth_codesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const oauth_auth_codesCnt =  await dbService.count(Oauth_auth_codes,oauth_auth_codesFilter);

      const oauth_access_tokensFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const oauth_access_tokensCnt =  await dbService.count(Oauth_access_tokens,oauth_access_tokensFilter);

      const notificationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const notificationsCnt =  await dbService.count(Notifications,notificationsFilter);

      const migrationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const migrationsCnt =  await dbService.count(Migrations,migrationsFilter);

      const mail_configsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const mail_configsCnt =  await dbService.count(Mail_configs,mail_configsFilter);

      const item_campaignsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const item_campaignsCnt =  await dbService.count(Item_campaigns,item_campaignsFilter);

      const foodFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const foodCnt =  await dbService.count(Food,foodFilter);

      const failed_jobsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const failed_jobsCnt =  await dbService.count(Failed_jobs,failed_jobsFilter);

      const employee_rolesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const employee_rolesCnt =  await dbService.count(Employee_roles,employee_rolesFilter);

      const email_verificationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const email_verificationsCnt =  await dbService.count(Email_verifications,email_verificationsFilter);

      const d_m_reviewsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const d_m_reviewsCnt =  await dbService.count(D_m_reviews,d_m_reviewsFilter);

      const discountsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const discountsCnt =  await dbService.count(Discounts,discountsFilter);

      const delivery_menFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const delivery_menCnt =  await dbService.count(Delivery_men,delivery_menFilter);

      const delivery_man_walletsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const delivery_man_walletsCnt =  await dbService.count(Delivery_man_wallets,delivery_man_walletsFilter);

      const delivery_historiesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const delivery_historiesCnt =  await dbService.count(Delivery_histories,delivery_historiesFilter);

      const customer_addressesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const customer_addressesCnt =  await dbService.count(Customer_addresses,customer_addressesFilter);

      const currenciesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const currenciesCnt =  await dbService.count(Currencies,currenciesFilter);

      const couponsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const couponsCnt =  await dbService.count(Coupons,couponsFilter);

      const conversationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const conversationsCnt =  await dbService.count(Conversations,conversationsFilter);

      const categoriesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoriesCnt =  await dbService.count(Categories,categoriesFilter);

      const campaign_restaurantFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const campaign_restaurantCnt =  await dbService.count(Campaign_restaurant,campaign_restaurantFilter);

      const campaignsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const campaignsCnt =  await dbService.count(Campaigns,campaignsFilter);

      const business_settingsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const business_settingsCnt =  await dbService.count(Business_settings,business_settingsFilter);

      const bannersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const bannersCnt =  await dbService.count(Banners,bannersFilter);

      const attributesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const attributesCnt =  await dbService.count(Attributes,attributesFilter);

      const admin_walletsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_walletsCnt =  await dbService.count(Admin_wallets,admin_walletsFilter);

      const admin_rolesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_rolesCnt =  await dbService.count(Admin_roles,admin_rolesFilter);

      const adminsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const adminsCnt =  await dbService.count(Admins,adminsFilter);

      const add_onsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const add_onsCnt =  await dbService.count(Add_ons,add_onsFilter);

      const account_transactionsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const account_transactionsCnt =  await dbService.count(Account_transactions,account_transactionsFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        withdraw_requests : withdraw_requestsCnt,
        wishlists : wishlistsCnt,
        vendor_employees : vendor_employeesCnt,
        vendors : vendorsCnt,
        user_notifications : user_notificationsCnt,
        users : usersCnt,
        translations : translationsCnt,
        track_deliverymen : track_deliverymenCnt,
        soft_credentials : soft_credentialsCnt,
        reviews : reviewsCnt,
        restaurant_zone : restaurant_zoneCnt,
        restaurant_wallets : restaurant_walletsCnt,
        restaurants : restaurantsCnt,
        provide_d_m_earnings : provide_d_m_earningsCnt,
        phone_verifications : phone_verificationsCnt,
        password_resets : password_resetsCnt,
        order_transactions : order_transactionsCnt,
        order_details : order_detailsCnt,
        order_delivery_histories : order_delivery_historiesCnt,
        orders : ordersCnt,
        oauth_refresh_tokens : oauth_refresh_tokensCnt,
        oauth_personal_access_clients : oauth_personal_access_clientsCnt,
        oauth_clients : oauth_clientsCnt,
        oauth_auth_codes : oauth_auth_codesCnt,
        oauth_access_tokens : oauth_access_tokensCnt,
        notifications : notificationsCnt,
        migrations : migrationsCnt,
        mail_configs : mail_configsCnt,
        item_campaigns : item_campaignsCnt,
        food : foodCnt,
        failed_jobs : failed_jobsCnt,
        employee_roles : employee_rolesCnt,
        email_verifications : email_verificationsCnt,
        d_m_reviews : d_m_reviewsCnt,
        discounts : discountsCnt,
        delivery_men : delivery_menCnt,
        delivery_man_wallets : delivery_man_walletsCnt,
        delivery_histories : delivery_historiesCnt,
        customer_addresses : customer_addressesCnt,
        currencies : currenciesCnt,
        coupons : couponsCnt,
        conversations : conversationsCnt,
        categories : categoriesCnt,
        campaign_restaurant : campaign_restaurantCnt,
        campaigns : campaignsCnt,
        business_settings : business_settingsCnt,
        banners : bannersCnt,
        attributes : attributesCnt,
        admin_wallets : admin_walletsCnt,
        admin_roles : admin_rolesCnt,
        admins : adminsCnt,
        add_ons : add_onsCnt,
        account_transactions : account_transactionsCnt,
        user : userCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteWithdraw_requests = async (filter,updateBody) =>{  
  try {
    const withdraw_requestsCnt =  await dbService.update(Withdraw_requests,filter);
    return { withdraw_requests : withdraw_requestsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteWishlists = async (filter,updateBody) =>{  
  try {
    const wishlistsCnt =  await dbService.update(Wishlists,filter);
    return { wishlists : wishlistsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteVendor_employees = async (filter,updateBody) =>{  
  try {
    const vendor_employeesCnt =  await dbService.update(Vendor_employees,filter);
    return { vendor_employees : vendor_employeesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteVendors = async (filter,updateBody) =>{  
  try {
    const vendorsCnt =  await dbService.update(Vendors,filter);
    return { vendors : vendorsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser_notifications = async (filter,updateBody) =>{  
  try {
    const user_notificationsCnt =  await dbService.update(User_notifications,filter);
    return { user_notifications : user_notificationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUsers = async (filter,updateBody) =>{  
  try {
    const usersCnt =  await dbService.update(Users,filter);
    return { users : usersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTranslations = async (filter,updateBody) =>{  
  try {
    const translationsCnt =  await dbService.update(Translations,filter);
    return { translations : translationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTrack_deliverymen = async (filter,updateBody) =>{  
  try {
    const track_deliverymenCnt =  await dbService.update(Track_deliverymen,filter);
    return { track_deliverymen : track_deliverymenCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSoft_credentials = async (filter,updateBody) =>{  
  try {
    const soft_credentialsCnt =  await dbService.update(Soft_credentials,filter);
    return { soft_credentials : soft_credentialsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteReviews = async (filter,updateBody) =>{  
  try {
    const reviewsCnt =  await dbService.update(Reviews,filter);
    return { reviews : reviewsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRestaurant_zone = async (filter,updateBody) =>{  
  try {
    const restaurant_zoneCnt =  await dbService.update(Restaurant_zone,filter);
    return { restaurant_zone : restaurant_zoneCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRestaurant_wallets = async (filter,updateBody) =>{  
  try {
    const restaurant_walletsCnt =  await dbService.update(Restaurant_wallets,filter);
    return { restaurant_wallets : restaurant_walletsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRestaurants = async (filter,updateBody) =>{  
  try {
    const restaurantsCnt =  await dbService.update(Restaurants,filter);
    return { restaurants : restaurantsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProvide_d_m_earnings = async (filter,updateBody) =>{  
  try {
    const provide_d_m_earningsCnt =  await dbService.update(Provide_d_m_earnings,filter);
    return { provide_d_m_earnings : provide_d_m_earningsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePhone_verifications = async (filter,updateBody) =>{  
  try {
    const phone_verificationsCnt =  await dbService.update(Phone_verifications,filter);
    return { phone_verifications : phone_verificationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePassword_resets = async (filter,updateBody) =>{  
  try {
    const password_resetsCnt =  await dbService.update(Password_resets,filter);
    return { password_resets : password_resetsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrder_transactions = async (filter,updateBody) =>{  
  try {
    const order_transactionsCnt =  await dbService.update(Order_transactions,filter);
    return { order_transactions : order_transactionsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrder_details = async (filter,updateBody) =>{  
  try {
    const order_detailsCnt =  await dbService.update(Order_details,filter);
    return { order_details : order_detailsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrder_delivery_histories = async (filter,updateBody) =>{  
  try {
    const order_delivery_historiesCnt =  await dbService.update(Order_delivery_histories,filter);
    return { order_delivery_histories : order_delivery_historiesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrders = async (filter,updateBody) =>{  
  try {
    const ordersCnt =  await dbService.update(Orders,filter);
    return { orders : ordersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOauth_refresh_tokens = async (filter,updateBody) =>{  
  try {
    const oauth_refresh_tokensCnt =  await dbService.update(Oauth_refresh_tokens,filter);
    return { oauth_refresh_tokens : oauth_refresh_tokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOauth_personal_access_clients = async (filter,updateBody) =>{  
  try {
    const oauth_personal_access_clientsCnt =  await dbService.update(Oauth_personal_access_clients,filter);
    return { oauth_personal_access_clients : oauth_personal_access_clientsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOauth_clients = async (filter,updateBody) =>{  
  try {
    const oauth_clientsCnt =  await dbService.update(Oauth_clients,filter);
    return { oauth_clients : oauth_clientsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOauth_auth_codes = async (filter,updateBody) =>{  
  try {
    const oauth_auth_codesCnt =  await dbService.update(Oauth_auth_codes,filter);
    return { oauth_auth_codes : oauth_auth_codesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOauth_access_tokens = async (filter,updateBody) =>{  
  try {
    const oauth_access_tokensCnt =  await dbService.update(Oauth_access_tokens,filter);
    return { oauth_access_tokens : oauth_access_tokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteNotifications = async (filter,updateBody) =>{  
  try {
    const notificationsCnt =  await dbService.update(Notifications,filter);
    return { notifications : notificationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMigrations = async (filter,updateBody) =>{  
  try {
    const migrationsCnt =  await dbService.update(Migrations,filter);
    return { migrations : migrationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMail_configs = async (filter,updateBody) =>{  
  try {
    const mail_configsCnt =  await dbService.update(Mail_configs,filter);
    return { mail_configs : mail_configsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItem_campaigns = async (filter,updateBody) =>{  
  try {
    const item_campaignsCnt =  await dbService.update(Item_campaigns,filter);
    return { item_campaigns : item_campaignsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteFood = async (filter,updateBody) =>{  
  try {
    const foodCnt =  await dbService.update(Food,filter);
    return { food : foodCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteFailed_jobs = async (filter,updateBody) =>{  
  try {
    const failed_jobsCnt =  await dbService.update(Failed_jobs,filter);
    return { failed_jobs : failed_jobsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEmployee_roles = async (filter,updateBody) =>{  
  try {
    const employee_rolesCnt =  await dbService.update(Employee_roles,filter);
    return { employee_roles : employee_rolesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEmail_verifications = async (filter,updateBody) =>{  
  try {
    const email_verificationsCnt =  await dbService.update(Email_verifications,filter);
    return { email_verifications : email_verificationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteD_m_reviews = async (filter,updateBody) =>{  
  try {
    const d_m_reviewsCnt =  await dbService.update(D_m_reviews,filter);
    return { d_m_reviews : d_m_reviewsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDiscounts = async (filter,updateBody) =>{  
  try {
    const discountsCnt =  await dbService.update(Discounts,filter);
    return { discounts : discountsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDelivery_men = async (filter,updateBody) =>{  
  try {
    const delivery_menCnt =  await dbService.update(Delivery_men,filter);
    return { delivery_men : delivery_menCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDelivery_man_wallets = async (filter,updateBody) =>{  
  try {
    const delivery_man_walletsCnt =  await dbService.update(Delivery_man_wallets,filter);
    return { delivery_man_wallets : delivery_man_walletsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDelivery_histories = async (filter,updateBody) =>{  
  try {
    const delivery_historiesCnt =  await dbService.update(Delivery_histories,filter);
    return { delivery_histories : delivery_historiesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCustomer_addresses = async (filter,updateBody) =>{  
  try {
    const customer_addressesCnt =  await dbService.update(Customer_addresses,filter);
    return { customer_addresses : customer_addressesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCurrencies = async (filter,updateBody) =>{  
  try {
    const currenciesCnt =  await dbService.update(Currencies,filter);
    return { currencies : currenciesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCoupons = async (filter,updateBody) =>{  
  try {
    const couponsCnt =  await dbService.update(Coupons,filter);
    return { coupons : couponsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteConversations = async (filter,updateBody) =>{  
  try {
    const conversationsCnt =  await dbService.update(Conversations,filter);
    return { conversations : conversationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCategories = async (filter,updateBody) =>{  
  try {
    const categoriesCnt =  await dbService.update(Categories,filter);
    return { categories : categoriesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCampaign_restaurant = async (filter,updateBody) =>{  
  try {
    const campaign_restaurantCnt =  await dbService.update(Campaign_restaurant,filter);
    return { campaign_restaurant : campaign_restaurantCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCampaigns = async (filter,updateBody) =>{  
  try {
    const campaignsCnt =  await dbService.update(Campaigns,filter);
    return { campaigns : campaignsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBusiness_settings = async (filter,updateBody) =>{  
  try {
    const business_settingsCnt =  await dbService.update(Business_settings,filter);
    return { business_settings : business_settingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBanners = async (filter,updateBody) =>{  
  try {
    const bannersCnt =  await dbService.update(Banners,filter);
    return { banners : bannersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAttributes = async (filter,updateBody) =>{  
  try {
    const attributesCnt =  await dbService.update(Attributes,filter);
    return { attributes : attributesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin_wallets = async (filter,updateBody) =>{  
  try {
    const admin_walletsCnt =  await dbService.update(Admin_wallets,filter);
    return { admin_wallets : admin_walletsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin_roles = async (filter,updateBody) =>{  
  try {
    const admin_rolesCnt =  await dbService.update(Admin_roles,filter);
    return { admin_roles : admin_rolesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmins = async (filter,updateBody) =>{  
  try {
    const adminsCnt =  await dbService.update(Admins,filter);
    return { admins : adminsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdd_ons = async (filter,updateBody) =>{  
  try {
    const add_onsCnt =  await dbService.update(Add_ons,filter);
    return { add_ons : add_onsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAccount_transactions = async (filter,updateBody) =>{  
  try {
    const account_transactionsCnt =  await dbService.update(Account_transactions,filter);
    return { account_transactions : account_transactionsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findAll(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const withdraw_requestsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const withdraw_requestsCnt = await dbService.update(Withdraw_requests,withdraw_requestsFilter,updateBody);

      const wishlistsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const wishlistsCnt = await dbService.update(Wishlists,wishlistsFilter,updateBody);

      const vendor_employeesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const vendor_employeesCnt = await dbService.update(Vendor_employees,vendor_employeesFilter,updateBody);

      const vendorsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const vendorsCnt = await dbService.update(Vendors,vendorsFilter,updateBody);

      const user_notificationsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const user_notificationsCnt = await dbService.update(User_notifications,user_notificationsFilter,updateBody);

      const usersFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const usersCnt = await dbService.update(Users,usersFilter,updateBody);

      const translationsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const translationsCnt = await dbService.update(Translations,translationsFilter,updateBody);

      const track_deliverymenFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const track_deliverymenCnt = await dbService.update(Track_deliverymen,track_deliverymenFilter,updateBody);

      const soft_credentialsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const soft_credentialsCnt = await dbService.update(Soft_credentials,soft_credentialsFilter,updateBody);

      const reviewsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const reviewsCnt = await dbService.update(Reviews,reviewsFilter,updateBody);

      const restaurant_zoneFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const restaurant_zoneCnt = await dbService.update(Restaurant_zone,restaurant_zoneFilter,updateBody);

      const restaurant_walletsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const restaurant_walletsCnt = await dbService.update(Restaurant_wallets,restaurant_walletsFilter,updateBody);

      const restaurantsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const restaurantsCnt = await dbService.update(Restaurants,restaurantsFilter,updateBody);

      const provide_d_m_earningsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const provide_d_m_earningsCnt = await dbService.update(Provide_d_m_earnings,provide_d_m_earningsFilter,updateBody);

      const phone_verificationsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const phone_verificationsCnt = await dbService.update(Phone_verifications,phone_verificationsFilter,updateBody);

      const password_resetsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const password_resetsCnt = await dbService.update(Password_resets,password_resetsFilter,updateBody);

      const order_transactionsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const order_transactionsCnt = await dbService.update(Order_transactions,order_transactionsFilter,updateBody);

      const order_detailsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const order_detailsCnt = await dbService.update(Order_details,order_detailsFilter,updateBody);

      const order_delivery_historiesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const order_delivery_historiesCnt = await dbService.update(Order_delivery_histories,order_delivery_historiesFilter,updateBody);

      const ordersFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ordersCnt = await dbService.update(Orders,ordersFilter,updateBody);

      const oauth_refresh_tokensFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const oauth_refresh_tokensCnt = await dbService.update(Oauth_refresh_tokens,oauth_refresh_tokensFilter,updateBody);

      const oauth_personal_access_clientsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const oauth_personal_access_clientsCnt = await dbService.update(Oauth_personal_access_clients,oauth_personal_access_clientsFilter,updateBody);

      const oauth_clientsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const oauth_clientsCnt = await dbService.update(Oauth_clients,oauth_clientsFilter,updateBody);

      const oauth_auth_codesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const oauth_auth_codesCnt = await dbService.update(Oauth_auth_codes,oauth_auth_codesFilter,updateBody);

      const oauth_access_tokensFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const oauth_access_tokensCnt = await dbService.update(Oauth_access_tokens,oauth_access_tokensFilter,updateBody);

      const notificationsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const notificationsCnt = await dbService.update(Notifications,notificationsFilter,updateBody);

      const migrationsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const migrationsCnt = await dbService.update(Migrations,migrationsFilter,updateBody);

      const mail_configsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const mail_configsCnt = await dbService.update(Mail_configs,mail_configsFilter,updateBody);

      const item_campaignsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const item_campaignsCnt = await dbService.update(Item_campaigns,item_campaignsFilter,updateBody);

      const foodFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const foodCnt = await dbService.update(Food,foodFilter,updateBody);

      const failed_jobsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const failed_jobsCnt = await dbService.update(Failed_jobs,failed_jobsFilter,updateBody);

      const employee_rolesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const employee_rolesCnt = await dbService.update(Employee_roles,employee_rolesFilter,updateBody);

      const email_verificationsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const email_verificationsCnt = await dbService.update(Email_verifications,email_verificationsFilter,updateBody);

      const d_m_reviewsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const d_m_reviewsCnt = await dbService.update(D_m_reviews,d_m_reviewsFilter,updateBody);

      const discountsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const discountsCnt = await dbService.update(Discounts,discountsFilter,updateBody);

      const delivery_menFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const delivery_menCnt = await dbService.update(Delivery_men,delivery_menFilter,updateBody);

      const delivery_man_walletsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const delivery_man_walletsCnt = await dbService.update(Delivery_man_wallets,delivery_man_walletsFilter,updateBody);

      const delivery_historiesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const delivery_historiesCnt = await dbService.update(Delivery_histories,delivery_historiesFilter,updateBody);

      const customer_addressesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const customer_addressesCnt = await dbService.update(Customer_addresses,customer_addressesFilter,updateBody);

      const currenciesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const currenciesCnt = await dbService.update(Currencies,currenciesFilter,updateBody);

      const couponsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const couponsCnt = await dbService.update(Coupons,couponsFilter,updateBody);

      const conversationsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const conversationsCnt = await dbService.update(Conversations,conversationsFilter,updateBody);

      const categoriesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const categoriesCnt = await dbService.update(Categories,categoriesFilter,updateBody);

      const campaign_restaurantFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const campaign_restaurantCnt = await dbService.update(Campaign_restaurant,campaign_restaurantFilter,updateBody);

      const campaignsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const campaignsCnt = await dbService.update(Campaigns,campaignsFilter,updateBody);

      const business_settingsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const business_settingsCnt = await dbService.update(Business_settings,business_settingsFilter,updateBody);

      const bannersFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const bannersCnt = await dbService.update(Banners,bannersFilter,updateBody);

      const attributesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const attributesCnt = await dbService.update(Attributes,attributesFilter,updateBody);

      const admin_walletsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const admin_walletsCnt = await dbService.update(Admin_wallets,admin_walletsFilter,updateBody);

      const admin_rolesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const admin_rolesCnt = await dbService.update(Admin_roles,admin_rolesFilter,updateBody);

      const adminsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const adminsCnt = await dbService.update(Admins,adminsFilter,updateBody);

      const add_onsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const add_onsCnt = await dbService.update(Add_ons,add_onsFilter,updateBody);

      const account_transactionsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const account_transactionsCnt = await dbService.update(Account_transactions,account_transactionsFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.update(User,userFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(User,filter,updateBody);

      let response = {
        withdraw_requests :withdraw_requestsCnt.length,
        wishlists :wishlistsCnt.length,
        vendor_employees :vendor_employeesCnt.length,
        vendors :vendorsCnt.length,
        user_notifications :user_notificationsCnt.length,
        users :usersCnt.length,
        translations :translationsCnt.length,
        track_deliverymen :track_deliverymenCnt.length,
        soft_credentials :soft_credentialsCnt.length,
        reviews :reviewsCnt.length,
        restaurant_zone :restaurant_zoneCnt.length,
        restaurant_wallets :restaurant_walletsCnt.length,
        restaurants :restaurantsCnt.length,
        provide_d_m_earnings :provide_d_m_earningsCnt.length,
        phone_verifications :phone_verificationsCnt.length,
        password_resets :password_resetsCnt.length,
        order_transactions :order_transactionsCnt.length,
        order_details :order_detailsCnt.length,
        order_delivery_histories :order_delivery_historiesCnt.length,
        orders :ordersCnt.length,
        oauth_refresh_tokens :oauth_refresh_tokensCnt.length,
        oauth_personal_access_clients :oauth_personal_access_clientsCnt.length,
        oauth_clients :oauth_clientsCnt.length,
        oauth_auth_codes :oauth_auth_codesCnt.length,
        oauth_access_tokens :oauth_access_tokensCnt.length,
        notifications :notificationsCnt.length,
        migrations :migrationsCnt.length,
        mail_configs :mail_configsCnt.length,
        item_campaigns :item_campaignsCnt.length,
        food :foodCnt.length,
        failed_jobs :failed_jobsCnt.length,
        employee_roles :employee_rolesCnt.length,
        email_verifications :email_verificationsCnt.length,
        d_m_reviews :d_m_reviewsCnt.length,
        discounts :discountsCnt.length,
        delivery_men :delivery_menCnt.length,
        delivery_man_wallets :delivery_man_walletsCnt.length,
        delivery_histories :delivery_historiesCnt.length,
        customer_addresses :customer_addressesCnt.length,
        currencies :currenciesCnt.length,
        coupons :couponsCnt.length,
        conversations :conversationsCnt.length,
        categories :categoriesCnt.length,
        campaign_restaurant :campaign_restaurantCnt.length,
        campaigns :campaignsCnt.length,
        business_settings :business_settingsCnt.length,
        banners :bannersCnt.length,
        attributes :attributesCnt.length,
        admin_wallets :admin_walletsCnt.length,
        admin_roles :admin_rolesCnt.length,
        admins :adminsCnt.length,
        add_ons :add_onsCnt.length,
        account_transactions :account_transactionsCnt.length,
        user :userCnt.length + updated.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteWithdraw_requests,
  deleteWishlists,
  deleteVendor_employees,
  deleteVendors,
  deleteUser_notifications,
  deleteUsers,
  deleteTranslations,
  deleteTrack_deliverymen,
  deleteSoft_credentials,
  deleteReviews,
  deleteRestaurant_zone,
  deleteRestaurant_wallets,
  deleteRestaurants,
  deleteProvide_d_m_earnings,
  deletePhone_verifications,
  deletePassword_resets,
  deleteOrder_transactions,
  deleteOrder_details,
  deleteOrder_delivery_histories,
  deleteOrders,
  deleteOauth_refresh_tokens,
  deleteOauth_personal_access_clients,
  deleteOauth_clients,
  deleteOauth_auth_codes,
  deleteOauth_access_tokens,
  deleteNotifications,
  deleteMigrations,
  deleteMail_configs,
  deleteItem_campaigns,
  deleteFood,
  deleteFailed_jobs,
  deleteEmployee_roles,
  deleteEmail_verifications,
  deleteD_m_reviews,
  deleteDiscounts,
  deleteDelivery_men,
  deleteDelivery_man_wallets,
  deleteDelivery_histories,
  deleteCustomer_addresses,
  deleteCurrencies,
  deleteCoupons,
  deleteConversations,
  deleteCategories,
  deleteCampaign_restaurant,
  deleteCampaigns,
  deleteBusiness_settings,
  deleteBanners,
  deleteAttributes,
  deleteAdmin_wallets,
  deleteAdmin_roles,
  deleteAdmins,
  deleteAdd_ons,
  deleteAccount_transactions,
  deleteUser,
  deleteUserAuthSettings,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countWithdraw_requests,
  countWishlists,
  countVendor_employees,
  countVendors,
  countUser_notifications,
  countUsers,
  countTranslations,
  countTrack_deliverymen,
  countSoft_credentials,
  countReviews,
  countRestaurant_zone,
  countRestaurant_wallets,
  countRestaurants,
  countProvide_d_m_earnings,
  countPhone_verifications,
  countPassword_resets,
  countOrder_transactions,
  countOrder_details,
  countOrder_delivery_histories,
  countOrders,
  countOauth_refresh_tokens,
  countOauth_personal_access_clients,
  countOauth_clients,
  countOauth_auth_codes,
  countOauth_access_tokens,
  countNotifications,
  countMigrations,
  countMail_configs,
  countItem_campaigns,
  countFood,
  countFailed_jobs,
  countEmployee_roles,
  countEmail_verifications,
  countD_m_reviews,
  countDiscounts,
  countDelivery_men,
  countDelivery_man_wallets,
  countDelivery_histories,
  countCustomer_addresses,
  countCurrencies,
  countCoupons,
  countConversations,
  countCategories,
  countCampaign_restaurant,
  countCampaigns,
  countBusiness_settings,
  countBanners,
  countAttributes,
  countAdmin_wallets,
  countAdmin_roles,
  countAdmins,
  countAdd_ons,
  countAccount_transactions,
  countUser,
  countUserAuthSettings,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteWithdraw_requests,
  softDeleteWishlists,
  softDeleteVendor_employees,
  softDeleteVendors,
  softDeleteUser_notifications,
  softDeleteUsers,
  softDeleteTranslations,
  softDeleteTrack_deliverymen,
  softDeleteSoft_credentials,
  softDeleteReviews,
  softDeleteRestaurant_zone,
  softDeleteRestaurant_wallets,
  softDeleteRestaurants,
  softDeleteProvide_d_m_earnings,
  softDeletePhone_verifications,
  softDeletePassword_resets,
  softDeleteOrder_transactions,
  softDeleteOrder_details,
  softDeleteOrder_delivery_histories,
  softDeleteOrders,
  softDeleteOauth_refresh_tokens,
  softDeleteOauth_personal_access_clients,
  softDeleteOauth_clients,
  softDeleteOauth_auth_codes,
  softDeleteOauth_access_tokens,
  softDeleteNotifications,
  softDeleteMigrations,
  softDeleteMail_configs,
  softDeleteItem_campaigns,
  softDeleteFood,
  softDeleteFailed_jobs,
  softDeleteEmployee_roles,
  softDeleteEmail_verifications,
  softDeleteD_m_reviews,
  softDeleteDiscounts,
  softDeleteDelivery_men,
  softDeleteDelivery_man_wallets,
  softDeleteDelivery_histories,
  softDeleteCustomer_addresses,
  softDeleteCurrencies,
  softDeleteCoupons,
  softDeleteConversations,
  softDeleteCategories,
  softDeleteCampaign_restaurant,
  softDeleteCampaigns,
  softDeleteBusiness_settings,
  softDeleteBanners,
  softDeleteAttributes,
  softDeleteAdmin_wallets,
  softDeleteAdmin_roles,
  softDeleteAdmins,
  softDeleteAdd_ons,
  softDeleteAccount_transactions,
  softDeleteUser,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
