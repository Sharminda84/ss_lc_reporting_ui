import axios from 'axios';
import _get from "lodash.get";
import { store } from '../index';

export const sendGetRequest = (url) => {
    const state = store.getState();
    const jwt = _get(state, 'security.jwt', '');

    const config = {
        headers: { Authorization: `Bearer ${jwt}` }
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

export const sendPostRequest = (url, requestPayload, responseType) => {
    const state = store.getState();
    const jwt = _get(state, 'security.jwt', '');

    const config = {
        headers: { Authorization: `Bearer ${jwt}` }
    };

    if (responseType) {
        config.responseType = responseType;
    }

    return axios
        .post(url, requestPayload, config)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Error running get request');
            }
            return response.data;
        });
};
