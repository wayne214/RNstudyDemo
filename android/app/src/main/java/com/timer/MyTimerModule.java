package com.timer;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.react.AlarmReceiver;

/**
 * Created by wayne on 2017/7/19.
 */

public class MyTimerModule extends ReactContextBaseJavaModule {
    String meg = "";
    public ServiceConnection connection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            MyTimerService.Binder binder = (MyTimerService.Binder)iBinder;
            MyTimerService myService = binder.getService();
            myService.setCallback(new MyTimerService.Callback() {
                @Override
                public void onDataChange(String data) {
                    Log.d("ceshidifhd", "onDataChange: "+ data);
                    meg = data;
                    WritableMap params = Arguments.createMap();
                    params.putString("key", data);
                    sendEvent(getReactApplicationContext(), "willShow", params);
                    Toast.makeText(getCurrentActivity(), data, Toast.LENGTH_SHORT).show();
                }
            });
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {

        }
    };

    public MyTimerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyTimerModule";
    }
    @ReactMethod
    public void schedule(String msg) {
        Intent iii = new Intent(getReactApplicationContext(), MyTimerService.class);
        getReactApplicationContext().bindService(iii,connection, Context.BIND_AUTO_CREATE);
        Intent intent = new Intent(getReactApplicationContext(),TimerReceiver.class);
        getReactApplicationContext().sendBroadcast(intent);
        Toast.makeText(getReactApplicationContext(),msg,Toast.LENGTH_SHORT).show();
    }
    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
