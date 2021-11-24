export const REPORTING_SERVER_URL = 'http://lcreportingapplication-dev.eba-mtgham92.eu-west-2.elasticbeanstalk.com';
// export const REPORTING_SERVER_URL = 'http://localhost:5000';
export const URL_PREFIX = REPORTING_SERVER_URL + '/v1/lc/reporting';
export const LOGIN_URL = URL_PREFIX + '/user/login';
export const FETCH_ALL_MEMBERS_URL = URL_PREFIX + '/members/range';
export const FETCH_CARDS_FOR_MEMBERS_URL = URL_PREFIX + '/members/latest/cards';
export const FETCH_ALL_ORDERS = URL_PREFIX + '/orders/all';
export const FETCH_DAILY_ORDERS = URL_PREFIX + '/orders/daily';
export const FETCH_TODAYS_ORDERS = URL_PREFIX + '/orders/today';
export const FETCH_WEEKLY_ORDERS = URL_PREFIX + '/orders/week';
export const FETCH_MONTHLY_ORDERS = URL_PREFIX + '/orders/month';
export const FETCH_CARD_DESIGNS_SALES_IN_DATE_RANGE = URL_PREFIX + '/orders/cards/sales/date-range';
export const FETCH_SALES_REPORT = URL_PREFIX + '/orders/total-sales-report';
export const FETCH_SALES_FUNNELS = URL_PREFIX + '/orders/cards/sales/funnel';
export const FETCH_CARD_INFO = URL_PREFIX + '/cardinfo/all';
export const FETCH_AD_CAMPAIGNS_DATA = URL_PREFIX + '/google-ads/campaigns';
export const FETCH_CARD_DESIGNS_COUNT = URL_PREFIX + '/cardinfo/card-design-counts';
export const FETCH_CARD_VIEWS_IN_DATE_RANGE = URL_PREFIX + '/orders/cards/views/date-range';
export const FETCH_CARD_TAGS = URL_PREFIX + '/card-tagging/find-all-tags';
export const CREATE_TAG = URL_PREFIX + '/card-tagging/create-tag';
export const UPDATE_TAG = URL_PREFIX + '/card-tagging/update-tag';
export const DELETE_TAG = URL_PREFIX + '/card-tagging/delete-tag';
export const FETCH_AD_METRICS = URL_PREFIX + '/ads/fetch-metrics';
