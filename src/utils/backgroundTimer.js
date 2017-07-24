/**
 * Created by wayne on 2017/7/19.
 */
import {NativeModules, AppRegistry} from 'react-native';

const {MyHeadLessModule} = NativeModules;

const registeredTimers = {};

export default {
    register: ({timerKey, callback}) => {
        const existingTimer = registeredTimers[timerKey];

        if (!timerKey || !callback) {
            throw new Error('missing parameters: timerKey or callback');
        }

        if (existingTimer) {
            console.warn(`Skipping already registered timer ${timerKey}`); // eslint-disable-line no-console
            return;
        }

        const fn = async ({data}) => {
            try {
                const dataObj = data && JSON.parse(data);
                callback(dataObj);
            } catch (err) {
                console.error(err); // eslint-disable-line no-console
            }
        };

        AppRegistry.registerHeadlessTask(timerKey, () => fn);
        registeredTimers[timerKey] = true;
    },

    schedule: (timerKey, data) => {
        if (!timerKey) {
            throw new Error('Missing parameter: timerKey');
        }
        const existingTimer = registeredTimers[timerKey];

        if (!existingTimer) {
            throw new Error('Cannot schedule a timer before registering it');
        }
        const strData = data && JSON.stringify(data);
        MyHeadLessModule.schedule(timerKey, strData);
    },

    cancel: (timerKey) => {
        MyHeadLessModule.cancel(timerKey);
    }
};
