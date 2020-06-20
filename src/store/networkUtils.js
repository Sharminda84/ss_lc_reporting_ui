import axios from 'axios';
import _get from "lodash.get";
import { store } from '../index';

export const sendGetRequest = (url) => {
    const state = store.getState();
    const config = {
        auth: {
            username: _get(state, 'security.user'),
            password: _get(state, 'security.password'),
        },
    };

    return axios
        .get(url, config)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Error running get request');
            }
            return response.data;
        });
};