const initialState = {
  navigationItems: [
      {
          name: 'Members',
          navigationSubItems: [
              {
                  subItemName: 'Sign-up Report',
                  subItemPath: '/members/signups'
              },
          ],
      },
      {
          name: 'Orders',
          navigationSubItems: [
              {
                  subItemName: 'Daily Orders',
                  subItemPath: '/orders/daily'
              },
              {
                  subItemName: '7-Days Previous Orders',
                  subItemPath: '/orders/history/weekly'
              },
              {
                  subItemName: '30-Days Previous Orders',
                  subItemPath: '/orders/history/monthly'
              },
              {
                  subItemName: 'All-time Previous Orders',
                  subItemPath: '/orders/history/alltime'
              }
          ],
      },
      {
          name: 'Analytics',
          navigationSubItems: [
              {
                  subItemName: 'Customer Aq. Cost',
                  subItemPath: '/analytics/aquisition-cost'
              }
          ]
      },
      {
          name: 'Top 10 Card Designs by Sales',
          navigationSubItems: [
              {
                  subItemName: 'Birthday',
                  subItemPath: '/orders/history/top10/birthday'
              },
              {
                  subItemName: 'Leaving',
                  subItemPath: '/orders/history/top10/leaving'
              }
          ]
      },
      {
          name: 'Discount Codes',
          navigationSubItems: [
              {
                  subItemName: 'Amount Outstanding',
                  subItemPath: '/discount/outstanding'
              },
              {
                  subItemName: 'Amount Claimed',
                  subItemPath: '/discount/claimed'
              },
              {
                  subItemName: 'Avg time from sending discount to claiming it',
                  subItemPath: '/discount/claimed-times'
              }
          ]
      },
  ],
};

const navigation = ( state = initialState, action ) => {
    switch ( action.type ) {
        default: return state;
    }
};

export default navigation;