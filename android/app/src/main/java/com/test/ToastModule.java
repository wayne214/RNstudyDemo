package com.test;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by wayne on 2017/6/20.
 * 1.创建一个类继承ReactContextBaseJavaModule
 * 2.实现getName()方法，该函数用于返回一个字符串名，这个名字在Js端标记这个模块。
 * 3.要导出一个方法给JavaScript使用，Java方法需要使用注解@ReactMethod。
 * 方法的返回类型必须为void。
 * React Native的跨语言访问是异步进行的，
 * 所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件（参见下文的描述）。
 */

public class ToastModule  extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @Override
    public String getName() {
        return "ToastAndroid2";
    }
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
}
