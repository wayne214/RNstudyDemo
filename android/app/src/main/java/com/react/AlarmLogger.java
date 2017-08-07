package com.react;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

/**
 * Created by wayne on 2017/7/19.
 */

public class AlarmLogger {
    public static void log(Context context, String msg) {
        Log.d("headlessAlarm", msg);
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
    }
}
