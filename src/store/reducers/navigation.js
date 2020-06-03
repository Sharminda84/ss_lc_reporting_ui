const initialState = {
  memberNavigation: [
      {
          subItemName: 'Member 1',
          subItemPath: '/members/path1'
      },
      {
          subItemName: 'Member 2',
          subItemPath: '/members/path2'
      }
  ],

  ordersNavigation: [
      {
          subItemName: 'Order 1',
          subItemPath: '/orders/path1'
      },
      {
          subItemName: 'Order 2',
          subItemPath: '/orders/path2'
      }
  ]
};

const navigation = ( state = initialState, action ) => {
    switch ( action.type ) {
        default: return state;
    }
};

export default navigation;