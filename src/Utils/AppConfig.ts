import config from "./config.json";

interface AppConfigIfc {
    "serverUrl": string
    "constraintUrl": string
    "constraintTypeUrl": string
    "shiftUrl": string
    "shiftTypeUrl": string
    "userUrl": string
    "userTypeUrl": string
    "weekUrl": string
    "weekTypeUrl": string
    "createUrl": string,
    "updateUrl": string
    "loginUrl": string
    "calculateUrl": string
    "maxMonthlyConstraints": number
}

const AppConfig: AppConfigIfc = config;

export default AppConfig;
