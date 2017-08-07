package com.react;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.SystemClock;

import com.facebook.react.HeadlessJsTaskService;

public class AlarmReceiver extends BroadcastReceiver {
    private String action = null;
    @Override
    public void onReceive(Context context, Intent intent) {
        action = intent.getAction();
        Bundle bundle = new Bundle(intent.getExtras());
        String key = bundle.getString("timerKey");
        if (AlarmController.isBlocked(key)) {
            AlarmLogger.log(context, String.format("Task %s is blocked. Cancelling", key));
            return;
        }
        AlarmLogger.log(context, String.format("Waking up for task: %s", key));

        AlarmManager am = (AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context,
                0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        am.set(AlarmManager.ELAPSED_REALTIME,
                SystemClock.elapsedRealtime() + AlarmController.alarmInterval, pendingIntent);

        Intent serviceIntent = new Intent(context, MyTaskService.class);
        serviceIntent.putExtras(bundle);
        context.startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }
}
