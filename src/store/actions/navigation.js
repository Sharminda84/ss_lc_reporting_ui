export const NAVIGATION_ITEM_CLICKED = 'navigation/NAVIGATION_ITEM_CLICKED';

export const navigationItemClicked = (navigationItem) => ({
    type: NAVIGATION_ITEM_CLICKED,
    payload: navigationItem,
});