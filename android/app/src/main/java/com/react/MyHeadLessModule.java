package com.react;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.SystemClock;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;

/**
 * Created by wayne on 2017/7/18.
 */

public class MyHeadLessModule extends ReactContextBaseJavaModule implements LifecycleEventListener{
    private AlarmManager alarmMgr;
    private HashMap<String, Intent> scheduledIntents;
    private boolean isInBackground;
    public MyHeadLessModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.alarmMgr = (AlarmManager)reactContext.getSystemService(Context.ALARM_SERVICE);
        this.scheduledIntents = new HashMap<>();
        this.isInBackground = false;
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "MyHeadLessModule";
    }
    @ReactMethod
    public void schedule(String timerKey, String data) {
        Intent serviceIntent = createIntent(timerKey, data);
        scheduledIntents.put(timerKey, serviceIntent);

        AlarmLogger.log(getReactApplicationContext(), "registering " + serviceIntent.getDataString());

        if (this.isInBackground) {
            setSingleAlarm((serviceIntent));
        }
    }
    @ReactMethod
    public void cancel(String timerKey) {
        AlarmLogger.log(getReactApplicationContext(), "Stopping " + timerKey);
        cancelTimer(timerKey);
    }
    @Override
    public void onHostResume() {
        AlarmLogger.log(getReactApplicationContext(), "Resuming");
        isInBackground = false;
        for (Intent intent : scheduledIntents.values()) {
            cancelTimer(intent);
        }
    }

    @Override
    public void onHostPause() {
        AlarmLogger.log(getReactApplicationContext(), "Paused");
        isInBackground = true;
        for (Intent intent : scheduledIntents.values()) {
            setSingleAlarm(intent);
        }
    }
    private void setSingleAlarm(Intent intent) {
        AlarmLogger.log(getReactApplicationContext(), "alarm set for: " + intent.getDataString());
        AlarmController.releaseKey(intent.getDataString());
        PendingIntent pendingIntent = PendingIntent.getBroadcast(getReactApplicationContext(),
                0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        alarmMgr.set(AlarmManager.ELAPSED_REALTIME,
                SystemClock.elapsedRealtime() + AlarmController.alarmInterval, pendingIntent);
    }

    private Intent createIntent(String timerKey, String data) {
        Intent intent = new Intent(getReactApplicationContext(), AlarmReceiver.class);
        intent.setData(Uri.parse(timerKey)); // Unique intent. See Intent.filterEquals
        if (data != null) {
            intent.putExtra("data", data);
        }
        intent.putExtra("timerKey", timerKey);
        return intent;
    }
    private void cancelTimer(String timerKey) {
        Intent removedIntent = scheduledIntents.remove(timerKey);
        if (removedIntent == null) {
            removedIntent = createIntent(timerKey, null);
        }
        cancelTimer(removedIntent);
    }

    private void cancelTimer(Intent intent) {
        AlarmController.blockKey(intent.getDataString());
        PendingIntent pendingIntent = PendingIntent.getBroadcast(getReactApplicationContext(), 0, intent, 0);
        alarmMgr.cancel(pendingIntent);
    }
    @Override
    public void onHostDestroy() {

    }
}
