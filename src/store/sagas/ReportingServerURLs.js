export const REPORTING_SERVER_URL = 'http://lcreportingapplication-dev.eba-mtgham92.eu-west-2.elasticbeanstalk.com';
// export const REPORTING_SERVER_URL = 'http://localhost:5000';
export const PING_URL = REPORTING_SERVER_URL + '/reporting/admin/ping';
export const FETCH_ALL_MEMBERS_URL = REPORTING_SERVER_URL + '/reporting/members/range';
export const FETCH_CARDS_FOR_MEMBERS_URL = REPORTING_SERVER_URL + '/reporting/members/latest/cards';
export const FETCH_ALL_ORDERS = REPORTING_SERVER_URL + '/reporting/orders/all';
export const FETCH_TODAYS_ORDERS = REPORTING_SERVER_URL + '/reporting/orders/today';
export const FETCH_WEEKLY_ORDERS = REPORTING_SERVER_URL + '/reporting/orders/week';
export const FETCH_MONTHLY_ORDERS = REPORTING_SERVER_URL + '/reporting/orders/month';
export const FETCH_CARD_INFO = REPORTING_SERVER_URL + '/reporting/cardinfo';
export const FETCH_TOP_CARDS = REPORTING_SERVER_URL + '/reporting/cards/top';

