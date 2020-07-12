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
                  subItemPath: '/orders/weekly'
              },
              {
                  subItemName: '30-Days Previous Orders',
                  subItemPath: '/orders/monthly'
              },
              {
                  subItemName: 'All-time Previous Orders',
                  subItemPath: '/orders/alltime'
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
          name: 'Top Card Designs by Sales',
          navigationSubItems: [
              {
                  subItemName: 'Leaving',
                  subItemPath: '/orders/top10/leaving'
              },
              {
                  subItemName: 'Birthday',
                  subItemPath: '/orders/top10/birthday'
              },
              {
                  subItemName: 'Maternity',
                  subItemPath: '/orders/top10/maternity'
              },
              {
                  subItemName: 'New Baby',
                  subItemPath: '/orders/top10/new-baby'
              },
              {
                  subItemName: 'New Daddy',
                  subItemPath: '/orders/top10/new-daddy'
              },
              {
                  subItemName: 'Welcome',
                  subItemPath: '/orders/top10/welcome'
              },
              {
                  subItemName: 'Chistmas',
                  subItemPath: '/orders/top10/christmas'
              },
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