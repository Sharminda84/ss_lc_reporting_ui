import {
    NAVIGATION_ITEM_CLICKED
} from '../actions/navigation';

import _ from 'lodash';

const initialState = {
  initialState: true,
  navigationItems: [
      {
          name: 'Members',
          navigationSubItems: [
              {
                  subItemName: 'Sign-ups',
                  subItemPath: '/members/signups',
                  selected: false,
              }
          ],
      },
      {
          name: 'Orders',
          navigationSubItems: [
              {
                  subItemName: 'Cards Stream',
                  subItemPath: '/orders/card-stream',
                  selected: false,
              },
              {
                  subItemName: 'Today\'s Orders',
                  subItemPath: '/orders/daily',
                  selected: false,
              },
              {
                  subItemName: '7-Days Previous Orders',
                  subItemPath: '/orders/weekly',
                  selected: false,
              },
              {
                  subItemName: '30-Days Previous Orders',
                  subItemPath: '/orders/monthly',
                  selected: false,
              },
              {
                  subItemName: 'All-time Previous Orders',
                  subItemPath: '/orders/alltime',
                  selected: false,
              }
          ],
      },
      {
          name: 'Analytics',
          navigationSubItems: [
              {
                  subItemName: 'Reports',
                  subItemPath: '/analytics/reports',
                  selected: false,
              }
          ]
      },
      {
          name: 'Top Card Designs by Sales',
          navigationSubItems: [
              {
                  subItemName: 'Leaving',
                  subItemPath: '/orders/top10/leaving',
                  selected: false,
              },
              {
                  subItemName: 'Birthday',
                  subItemPath: '/orders/top10/birthday',
                  selected: false,
              },
              {
                  subItemName: 'Maternity',
                  subItemPath: '/orders/top10/maternity',
                  selected: false,
              },
              {
                  subItemName: 'New Baby',
                  subItemPath: '/orders/top10/new-baby',
                  selected: false,
              },
              {
                  subItemName: 'New Daddy',
                  subItemPath: '/orders/top10/new-daddy',
                  selected: false,
              },
              {
                  subItemName: 'Welcome',
                  subItemPath: '/orders/top10/welcome',
                  selected: false,
              },
              {
                  subItemName: 'Chistmas',
                  subItemPath: '/orders/top10/christmas',
                  selected: false,
              },
          ]
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