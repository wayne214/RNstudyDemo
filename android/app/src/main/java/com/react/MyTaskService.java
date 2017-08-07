package com.react;

import android.content.Intent;
import android.os.Bundle;


import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

/**
 * Created by wayne on 2017/7/18.
 */

public class MyTaskService extends HeadlessJsTaskService {
    @javax.annotation.Nullable
    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        if (isAppInForeground()) {
            AlarmLogger.log(getBaseContext(), "Task started while in foreground");
            stopSelf();
            return null;
        }
        Bundle extras = intent.getExtras();
        String timerKey = extras.getString("timerKey");
        String data = extras.getString("data");
        AlarmLogger.log(getBaseContext(), "Starting task: " + timerKey);

        WritableNativeMap outParams = new WritableNativeMap();
        outParams.putString("data", data);
        return new HeadlessJsTaskConfig(timerKey, outParams, 3000);
    }

    @Override
    public void onHeadlessJsTaskFinish(int taskId) {
        super.onHeadlessJsTaskFinish(taskId);
        AlarmLogger.log(getBaseContext(), String.format("Task %d finished", taskId));
    }

    @Override
    public void onDestroy() {
        AlarmLogger.log(getBaseContext(), "Service is stopping");
        super.onDestroy();
    }

    private boolean isAppInForeground() {
        final ReactInstanceManager reactInstanceManager =
                ((ReactApplication) getApplication())
                        .getReactNativeHost()
                        .getReactInstanceManager();
        ReactContext reactContext = reactInstanceManager.getCurrentReactContext();

        return(reactContext != null && reactContext.getLifecycleState() == LifecycleState.RESUMED);
    }
}
