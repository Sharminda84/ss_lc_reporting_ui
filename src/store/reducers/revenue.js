const initialState = {
  navigationItems: [
      {
          name: 'Members',
          navigationSubItems: [
              {
                  subItemName: 'Members',
                  subItemPath: '/members'
              }
          ],
      },
      {
          name: 'Orders',
          navigationSubItems: [
              {
                  subItemName: 'Today\'s Orders',
                  subItemPath: '/orders/todays'
              },
              {
                  subItemName: 'Orders History',
                  subItemPath: '/orders/history'
              }
          ],
      },
      {
          name: 'Revenue',
          navigationSubItems: [
              {
                  subItemName: 'Revenue Report',
                  subItemPath: '/revenue/report'
              }
          ]
      }
  ],
};

const navigation = ( state = initialState, action ) => {
    switch ( action.type ) {
        default: return state;
    }
};

export default navigation;