/**
 * Created by wayne on 2017/7/19.
 */
import backgroundTimer from './backgroundTimer';

const TIMER_KEY = 'badge';

export const start = (data) => {
    backgroundTimer.schedule(TIMER_KEY, data);
};

export const stop = () => backgroundTimer.cancel(TIMER_KEY);

export const register = (callback) => {
    backgroundTimer.register({timerKey: TIMER_KEY, callback});
};