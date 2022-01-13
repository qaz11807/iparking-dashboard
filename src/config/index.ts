
const config = {
    serverUrl: process.env.REACT_APP_API_URL,
    dashboardPrefix: process.env.REACT_APP_API_PREFIX ? process.env.REACT_APP_API_PREFIX : '/',
    websocketUrl: process.env.REACT_APP_API_WEBSOCKET,
};
export default config;
