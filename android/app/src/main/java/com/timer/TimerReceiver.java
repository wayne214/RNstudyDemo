package com.timer;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/**
 * Created by wayne on 2017/7/19.
 */

public class TimerReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Intent i = new Intent(context, MyTimerService.class);
        context.startService(i);
    }
}
