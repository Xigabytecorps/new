/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

const dbConnection = require('../config/dbConnection');
const db = {};
db.sequelize = dbConnection;

db.withdraw_requests = require('./withdraw_requests');
db.wishlists = require('./wishlists');
db.vendor_employees = require('./vendor_employees');
db.vendors = require('./vendors');
db.user_notifications = require('./user_notifications');
db.users = require('./users');
db.translations = require('./translations');
db.track_deliverymen = require('./track_deliverymen');
db.soft_credentials = require('./soft_credentials');
db.reviews = require('./reviews');
db.restaurant_zone = require('./restaurant_zone');
db.restaurant_wallets = require('./restaurant_wallets');
db.restaurants = require('./restaurants');
db.provide_d_m_earnings = require('./provide_d_m_earnings');
db.phone_verifications = require('./phone_verifications');
db.password_resets = require('./password_resets');
db.order_transactions = require('./order_transactions');
db.order_details = require('./order_details');
db.order_delivery_histories = require('./order_delivery_histories');
db.orders = require('./orders');
db.oauth_refresh_tokens = require('./oauth_refresh_tokens');
db.oauth_personal_access_clients = require('./oauth_personal_access_clients');
db.oauth_clients = require('./oauth_clients');
db.oauth_auth_codes = require('./oauth_auth_codes');
db.oauth_access_tokens = require('./oauth_access_tokens');
db.notifications = require('./notifications');
db.migrations = require('./migrations');
db.mail_configs = require('./mail_configs');
db.item_campaigns = require('./item_campaigns');
db.food = require('./food');
db.failed_jobs = require('./failed_jobs');
db.employee_roles = require('./employee_roles');
db.email_verifications = require('./email_verifications');
db.d_m_reviews = require('./d_m_reviews');
db.discounts = require('./discounts');
db.delivery_men = require('./delivery_men');
db.delivery_man_wallets = require('./delivery_man_wallets');
db.delivery_histories = require('./delivery_histories');
db.customer_addresses = require('./customer_addresses');
db.currencies = require('./currencies');
db.coupons = require('./coupons');
db.conversations = require('./conversations');
db.categories = require('./categories');
db.campaign_restaurant = require('./campaign_restaurant');
db.campaigns = require('./campaigns');
db.business_settings = require('./business_settings');
db.banners = require('./banners');
db.attributes = require('./attributes');
db.admin_wallets = require('./admin_wallets');
db.admin_roles = require('./admin_roles');
db.admins = require('./admins');
db.add_ons = require('./add_ons');
db.account_transactions = require('./account_transactions');
db.user = require('./user');
db.userAuthSettings = require('./userAuthSettings');
db.userTokens = require('./userTokens');
db.role = require('./role');
db.projectRoute = require('./projectRoute');
db.routeRole = require('./routeRole');
db.userRole = require('./userRole');

db.withdraw_requests.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.withdraw_requests, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.withdraw_requests.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.withdraw_requests, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.wishlists.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.wishlists, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.wishlists.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.wishlists, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.vendor_employees.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.vendor_employees, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.vendor_employees.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.vendor_employees, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.vendors.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.vendors, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.vendors.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.vendors, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.user_notifications.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user_notifications, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.user_notifications.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user_notifications, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.users.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.users, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.users.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.users, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.translations.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.translations, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.translations.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.translations, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.track_deliverymen.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.track_deliverymen, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.track_deliverymen.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.track_deliverymen, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.soft_credentials.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.soft_credentials, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.soft_credentials.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.soft_credentials, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.reviews.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.reviews, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.reviews.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.reviews, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.restaurant_zone.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.restaurant_zone, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.restaurant_zone.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.restaurant_zone, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.restaurant_wallets.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.restaurant_wallets, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.restaurant_wallets.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.restaurant_wallets, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.restaurants.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.restaurants, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.restaurants.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.restaurants, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.provide_d_m_earnings.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.provide_d_m_earnings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.provide_d_m_earnings.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.provide_d_m_earnings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.phone_verifications.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.phone_verifications, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.phone_verifications.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.phone_verifications, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.password_resets.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.password_resets, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.password_resets.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.password_resets, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.order_transactions.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.order_transactions, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.order_transactions.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.order_transactions, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.order_details.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.order_details, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.order_details.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.order_details, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.order_delivery_histories.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.order_delivery_histories, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.order_delivery_histories.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.order_delivery_histories, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.orders.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.orders, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.orders.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.orders, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.oauth_refresh_tokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.oauth_refresh_tokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.oauth_refresh_tokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.oauth_refresh_tokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.oauth_personal_access_clients.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.oauth_personal_access_clients, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.oauth_personal_access_clients.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.oauth_personal_access_clients, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.oauth_clients.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.oauth_clients, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.oauth_clients.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.oauth_clients, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.oauth_auth_codes.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.oauth_auth_codes, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.oauth_auth_codes.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.oauth_auth_codes, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.oauth_access_tokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.oauth_access_tokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.oauth_access_tokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.oauth_access_tokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.notifications.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.notifications, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.notifications.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.notifications, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.migrations.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.migrations, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.migrations.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.migrations, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.mail_configs.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.mail_configs, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.mail_configs.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.mail_configs, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.item_campaigns.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.item_campaigns, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.item_campaigns.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.item_campaigns, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.food.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.food, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.food.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.food, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.failed_jobs.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.failed_jobs, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.failed_jobs.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.failed_jobs, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.employee_roles.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.employee_roles, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.employee_roles.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.employee_roles, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.email_verifications.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.email_verifications, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.email_verifications.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.email_verifications, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.d_m_reviews.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.d_m_reviews, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.d_m_reviews.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.d_m_reviews, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.discounts.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.discounts, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.discounts.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.discounts, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.delivery_men.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.delivery_men, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.delivery_men.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.delivery_men, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.delivery_man_wallets.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.delivery_man_wallets, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.delivery_man_wallets.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.delivery_man_wallets, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.delivery_histories.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.delivery_histories, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.delivery_histories.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.delivery_histories, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.customer_addresses.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.customer_addresses, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.customer_addresses.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.customer_addresses, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.currencies.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.currencies, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.currencies.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.currencies, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.coupons.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.coupons, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.coupons.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.coupons, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.conversations.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.conversations, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.conversations.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.conversations, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.categories.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.categories, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.categories.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.categories, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.campaign_restaurant.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.campaign_restaurant, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.campaign_restaurant.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.campaign_restaurant, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.campaigns.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.campaigns, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.campaigns.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.campaigns, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.business_settings.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.business_settings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.business_settings.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.business_settings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.banners.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.banners, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.banners.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.banners, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.attributes.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.attributes, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.attributes.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.attributes, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admin_wallets.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_wallets, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admin_wallets.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_wallets, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admin_roles.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_roles, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admin_roles.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_roles, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admins.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admins, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admins.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admins, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.add_ons.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.add_ons, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.add_ons.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.add_ons, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.account_transactions.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.account_transactions, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.account_transactions.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.account_transactions, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userRole, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.routeRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.userRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.projectRoute, {
  foreignKey: 'routeId',
  as: '_routeId',
  targetKey: 'id' 
});
db.projectRoute.hasMany(db.routeRole, {
  foreignKey: 'routeId',
  sourceKey: 'id' 
});

module.exports = db;