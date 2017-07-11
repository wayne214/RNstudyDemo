package com.studydemo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.beefe.picker.PickerViewPackage;
import cn.reactnative.modules.update.UpdatePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.tencent.bugly.crashreport.CrashReport;
import com.test.TestReactPackage;
import com.umeng.UmengReactPackage;

import cn.reactnative.modules.update.UpdateContext;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile() {
      return UpdateContext.getBundleUrl(MainApplication.this);
    }
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PickerPackage(),
            new PickerViewPackage(),
            new UpdatePackage(),
              new UmengReactPackage(),
              //在应用中注册这个包管理器
              new TestReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    // 最简单初始化，Bugly2.0及以上版本还支持通过"AndroidManifest.xml"来配置APP信息
    // CrashReport.initCrashReport(getApplicationContext(), "注册时申请的APPID", false);
    CrashReport.initCrashReport(getApplicationContext(), "def9b75e22", false);

    // 测试crash
//    CrashReport.testNativeCrash();

  }
}
