package com.timer;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.util.Log;

import com.react.MyTaskService;

import java.util.Timer;
import java.util.TimerTask;

public class MyTimerService extends Service {
    private final Timer timer = new Timer();
    private TimerTask task;
    private Callback callback;
    Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            // TODO Auto-generated method stub
            Log.d("ceshi", "handleMessage: " + msg.what);
//            Intent i = new Intent(MyTimerService.this,TimerReceiver.class);
//            sendBroadcast(i);
            callback.onDataChange(msg.what + "66666666");
            super.handleMessage(msg);
        }
    };

    public MyTimerService() {
    }

    @Override
    public void onCreate() {
        super.onCreate();
        task = new TimerTask() {
            @Override
            public void run() {
                // TODO Auto-generated method stub
                Message message = new Message();
                message.what = 1;
                handler.sendMessage(message);
            }
        };
    }

    public class Binder extends android.os.Binder {
        public MyTimerService getService() {
            return MyTimerService.this;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        return new Binder();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        timer.schedule(task, 10000, 10000);
        return super.onStartCommand(intent, flags, startId);
    }
    public static interface Callback {
        void onDataChange(String data);
    }
    public void setCallback(Callback callback) {
        this.callback = callback;
    }
}
