import {
    NAVIGATION_ITEM_CLICKED
} from '../actions/navigation';

import _ from 'lodash';
import { ROLE_ADMIN, ROLE_DESIGNER, ROLE_INVESTOR } from '../../ReportingUIConstants';

const initialState = {
  initialState: true,
  navigationItems: [
      {
          name: 'Members',
          allowedRoles: [ ROLE_ADMIN ],
          navigationSubItems: [
              {
                  subItemName: 'Sign-ups',
                  subItemPath: '/members/signups',
                  selected: false,
              }
          ],
      },
      {
          name: 'Business Overview',
          allowedRoles: [ ROLE_ADMIN, ROLE_INVESTOR ],
          navigationSubItems: [
              /*
              {
                  subItemName: 'Cards Stream',
                  subItemPath: '/orders/card-stream',
                  selected: false,
              },*/
              {
                  subItemName: 'Sales Overview',
                  subItemPath: '/orders/sales',
                  selected: false,
              },
              {
                  subItemName: 'Funnel Analysis',
                  subItemPath: '/orders/funnel-analysis',
                  selected: false,
              },
              {
                  subItemName: 'Today\'s Orders',
                  subItemPath: '/orders/todays',
                  selected: false,
              },
              {
                  subItemName: '1-Day Breakdown',
                  subItemPath: '/orders/daily',
                  selected: false,
              },
              {
                  subItemName: '7-Day Breakdown',
                  subItemPath: '/orders/weekly',
                  selected: false,
              },
              {
                  subItemName: '30-Day Breakdown',
                  subItemPath: '/orders/monthly',
                  selected: false,
              },
              {
                  subItemName: 'All-time Breakdown',
                  subItemPath: '/orders/alltime',
                  selected: false,
              }
          ],
      },
      /*
      {
          name: 'Analytics',
          allowedRoles: [ ROLE_ADMIN ],
          navigationSubItems: [
              {
                  subItemName: 'Reports',
                  subItemPath: '/analytics/reports',
                  selected: false,
              }
          ]
      },*/
      {
          name: 'Card Designer',
          allowedRoles: [ ROLE_ADMIN, ROLE_DESIGNER ],
          navigationSubItems: [
              {
                  subItemName: 'My Cards',
                  subItemPath: '/card-designer/report',
                  selected: false,
              }
          ]
      },
      {
          name: 'Card Designs - Stats',
          allowedRoles: [ ROLE_ADMIN ],
          navigationSubItems: [
              {
                  subItemName: 'Card Sales',
                  subItemPath: '/cards/sales',
                  selected: false,
              },
              {
                  subItemName: 'Leaving - Weekly Top 10',
                  subItemPath: '/orders/top10/leaving',
                  selected: false,
              },
              {
                  subItemName: 'Birthday - Weekly Top 10',
                  subItemPath: '/orders/top10/birthday',
                  selected: false,
              },
              {
                  subItemName: 'Maternity - Weekly Top 10',
                  subItemPath: '/orders/top10/maternity',
                  selected: false,
              },
              {
                  subItemName: 'New Baby - Weekly Top 10',
                  subItemPath: '/orders/top10/new-baby',
                  selected: false,
              },
              {
                  subItemName: 'New Daddy - Weekly  10',
                  subItemPath: '/orders/top10/new-daddy',
                  selected: false,
              },
              {
                  subItemName: 'Welcome - Weekly Top 10',
                  subItemPath: '/orders/top10/welcome',
                  selected: false,
              },
              {
                  subItemName: 'Chistmas - Weekly Top 10',
                  subItemPath: '/orders/top10/christmas',
                  selected: false,
              },
          ]
      },
      {
          name: 'Card Tags',
          allowedRoles: [ ROLE_ADMIN ],
          navigationSubItems: [
              {
                  subItemName: 'Manage Card Tags',
                  subItemPath: '/cards/tags/manager',
                  selected: false,
              },
          ],
      },
  ],
};

const navigation = ( state = initialState, action ) => {
    switch ( action.type ) {
        case NAVIGATION_ITEM_CLICKED:
            const navigationItemsUpdated = state.navigationItems;
            navigationItemsUpdated.forEach(navigationItem => {
                navigationItem.navigationSubItems.forEach(navigationSubItem => {
                    if (navigationSubItem.subItemName === action.payload) {
                        navigationSubItem.selected = true;
                    } else {
                        navigationSubItem.selected = false;
                    }
                });
            });
            return {...state, initialState: false, navigationItems: _.cloneDeep(navigationItemsUpdated) };
        default: return state;
    }
};

export default navigation;