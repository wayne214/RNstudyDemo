package com.react;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by wayne on 2017/7/19.
 */

public class AlarmController {
    private static Set<String> allowedKeys = new HashSet<>();

    public static Long alarmInterval = 3000L;

    public static void blockKey(String key) {
        allowedKeys.add(key);
    }

    public static void releaseKey(String key) {
        allowedKeys.remove(key);
    }

    public static boolean isBlocked(String key) {
        return allowedKeys.contains(key);
    }
}
