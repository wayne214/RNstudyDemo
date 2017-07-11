package com.umeng;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.umeng.analytics.MobclickAgent;
import com.umeng.analytics.game.UMGameAgent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Copyright © 2016 Umeng Inc. All rights reserved.
 * @Description: process files
 * @Version: 1.0
 * @Create: 16/11/17 15:53
 * @Author: sanbo
 */
public class UmengNativeModule extends ReactContextBaseJavaModule {
    public static final String NAME = "UmengNativeModule";
    private Context mContext;
    /**
     * 可以设置是否为游戏，如果是游戏会进行初始化
     */
    private boolean isGameInited = false;

    public UmengNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void toast(String msg) {
        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
    }


    @ReactMethod
    private void initGame() {
        UMGameAgent.init(mContext);
        UMGameAgent.setPlayerLevel(1);
        MobclickAgent.setScenarioType(mContext, MobclickAgent.EScenarioType.E_UM_GAME);
        isGameInited = true;
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void onEvent(String eventId) {
        MobclickAgent.onEvent(mContext, eventId);
    }


    @ReactMethod
    @SuppressWarnings("unused")
    public void onEventWithLabel(String eventId, String label) {
        MobclickAgent.onEvent(mContext, eventId, label);
    }


    @ReactMethod
    @SuppressWarnings("unused")
    public void onCCEvent(ReadableArray ck, int value, String label) {
        List<String> list = new ArrayList();
        for (int i = 0; i < ck.size(); i++) {
            if (ReadableType.Array == ck.getType(i)) {
                list.add(ck.getArray(i).toString());
            } else if (ReadableType.Boolean == ck.getType(i)) {
                list.add(String.valueOf(ck.getBoolean(i)));
            } else if (ReadableType.Number == ck.getType(i)) {
                list.add(String.valueOf(ck.getInt(i)));
            } else if (ReadableType.String == ck.getType(i)) {
                list.add(ck.getString(i));
            } else if (ReadableType.Map == ck.getType(i)) {
                list.add(ck.getMap(i).toString());
            }
        }
        MobclickAgent.onEvent(mContext, list, value, label);

    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void onEventWithParameters(String eventId, ReadableMap map) {
        Map<String, String> rMap = new HashMap<String, String>();
        ReadableMapKeySetIterator iterator = map.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            if (ReadableType.Array == map.getType(key)) {
                rMap.put(key, map.getArray(key).toString());
            } else if (ReadableType.Boolean == map.getType(key)) {
                rMap.put(key, String.valueOf(map.getBoolean(key)));
            } else if (ReadableType.Number == map.getType(key)) {
                rMap.put(key, String.valueOf(map.getInt(key)));
            } else if (ReadableType.String == map.getType(key)) {
                rMap.put(key, map.getString(key));
            } else if (ReadableType.Map == map.getType(key)) {
                rMap.put(key, map.getMap(key).toString());
            }
        }
        MobclickAgent.onEvent(mContext, eventId, rMap);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void onEventWithCounter(String eventId, ReadableMap map, int value) {
        Map<String, String> rMap = new HashMap();
        ReadableMapKeySetIterator iterator = map.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            if (ReadableType.Array == map.getType(key)) {
                rMap.put(key, map.getArray(key).toString());
            } else if (ReadableType.Boolean == map.getType(key)) {
                rMap.put(key, String.valueOf(map.getBoolean(key)));
            } else if (ReadableType.Number == map.getType(key)) {
                rMap.put(key, String.valueOf(map.getInt(key)));
            } else if (ReadableType.String == map.getType(key)) {
                rMap.put(key, map.getString(key));
            } else if (ReadableType.Map == map.getType(key)) {
                rMap.put(key, map.getMap(key).toString());
            }
        }
        MobclickAgent.onEventValue(mContext, eventId, rMap, value);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void onPageBegin(String pageName) {
        MobclickAgent.onPageStart(pageName);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void onPageEnd(String pageName) {
        MobclickAgent.onPageEnd(pageName);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void profileSignInWithPUID(String puid) {
        MobclickAgent.onProfileSignIn(puid);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void profileSignInWithPUIDWithProvider(String puid, String provider) {
        MobclickAgent.onProfileSignIn(puid, provider);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void profileSignOff() {
        MobclickAgent.onProfileSignOff();
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void setUserLevelId(int level) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.setPlayerLevel(level);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void startLevel(String level) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.startLevel(level);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void failLevel(String level) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.failLevel(level);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void finishLevel(String level) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.finishLevel(level);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void exchange(double currencyAmount, String currencyType, double virtualAmount, int channel, String orderId) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.exchange(currencyAmount, currencyType, virtualAmount, channel, orderId);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void pay(double money, double coin, int source) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.pay(money, coin, source);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void payWithItem(double money, String item, int number, double price, int source) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.pay(money, item, number, price, source);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void buy(String item, int number, double price) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.buy(item, number, price);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void use(String item, int number, double price) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.use(item, number, price);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void bonus(double coin, int source) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.bonus(coin, source);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void bonusWithItem(String item, int number, double price, int source) {
        if (!isGameInited) {
            initGame();
        }
        UMGameAgent.bonus(item, number, price, source);
    }

}
