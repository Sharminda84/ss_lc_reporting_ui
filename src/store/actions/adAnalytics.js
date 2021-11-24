export const FETCH_AD_METRICS = "adAnalytics/FETCH_AD_METRICS";
export const LOAD_AD_METRICS = "adAnalytics/LOAD_AD_METRICS";

export const fetchAdMetrics = () => ({
    type: FETCH_AD_METRICS
});

export const loadAdMetrics = (adMetrics) => ({
    type: LOAD_AD_METRICS,
    payload: {
        adMetrics
    }
});
