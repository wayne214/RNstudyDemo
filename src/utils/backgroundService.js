/**
 * Created by wayne on 2017/7/19.
 */
import backgroundTimer from './backgroundTimer';

const TIMER_KEY = 'badge';

const checkForNewPosts = (data) => {
    return new Promise((resolve) => {
        console.log(data);
        setTimeout(resolve, 10000);
    })
};

const startNewPostsListener = (data) => {
    backgroundTimer.schedule(TIMER_KEY, data);
};

const stopNewPostsListener = () => backgroundTimer.cancel(TIMER_KEY);
const registerNewPostsListener = () => backgroundTimer.register({timerKey: TIMER_KEY, callback: checkForNewPosts});

export default {
    startNewPostsListener,
    stopNewPostsListener,
    registerNewPostsListener,
};