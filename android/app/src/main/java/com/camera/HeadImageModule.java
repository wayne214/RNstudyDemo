package com.camera;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;

import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created by wayne on 2017/7/11.
 */

public class HeadImageModule extends ReactContextBaseJavaModule {
    // 保存图片的sd卡路径
    private static final String HEAD_IMAGE_PATH = Environment.getExternalStorageDirectory().getAbsolutePath() + "/HeadImage/";
    // 保存图片的名称
    private static final String HEAD_IMAGE_NAME = "head_image.png";

    // startActivityForResult 的 requestCode
    private static final int REQUEST_CODE_CAMERA = 0; // 相机
    private static final int REQUEST_CODE_GALLERY = 1; // 相册
    private static final int REQUEST_CODE_CROP = 2; // 裁剪

    private Promise mPromise = null;
    private Uri mUri = null;
    private String mFullPath = null;
    public HeadImageModule(ReactApplicationContext reactContext) {
        super(reactContext);
        initActivityEventListener(reactContext);
    }

    private void initActivityEventListener(final ReactApplicationContext reactContext) {
        reactContext.addActivityEventListener(new BaseActivityEventListener(){
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (requestCode == REQUEST_CODE_CAMERA) { // 调用相机回调
                    if (resultCode == Activity.RESULT_OK) {//  1.拍照完成，将进入裁剪界面
                        activity.startActivityForResult(cropImage(mUri), REQUEST_CODE_CROP); // 启动裁剪界面
                    } else if (resultCode == Activity.RESULT_CANCELED) {
                        mPromise.resolve(null);
                        // mFullPath就是callCamera里面定义的临时图片路径
                        // 如果没有取消拍照，那么就不执行这里，临时图片的删除将在下次调用相机的时候，所以与recursionDeleteFile()不重复
                        new File(mFullPath).delete();
                    }
                } else if (requestCode == REQUEST_CODE_CROP) { // 2.裁剪完成
                    if (requestCode == Activity.RESULT_OK) {
                        // uri存放的是临时图片路径，返回给js代码， 这里有个问题， 稍后再说
                        mPromise.resolve(mUri.toString());
                        // 将临时图片复制一份， 保存为最终的头像图片
                        saveHeadImage();
                    } else if (requestCode == Activity.RESULT_CANCELED) {
                        mPromise.resolve(null);
                        new File(mFullPath).delete();
                    }
                } else if (requestCode == REQUEST_CODE_GALLERY) {
                    if (resultCode == Activity.RESULT_OK) {
                        activity.startActivityForResult(cropImage(data.getData()), REQUEST_CODE_GALLERY);
                    } else if (requestCode == Activity.RESULT_CANCELED) {
                        mPromise.resolve(null);
                        new File(mFullPath).delete();
                    }
                }
            }
        });
    }
    // 路径是否存在
    private boolean isPathExists() {
        File file = new File(HEAD_IMAGE_PATH);
        if (!file.exists()) {
            file.mkdirs();
        }
        return file.exists();
    }
    // 头像路径是否存在
    private boolean isHeadImageExits() {
        File file = new File(HEAD_IMAGE_PATH + HEAD_IMAGE_NAME);
        return file.exists();
    }

    private void saveHeadImage() {
        try {
            File file = new File(HEAD_IMAGE_PATH + HEAD_IMAGE_NAME);
            if (file.exists()) {
                file.delete();
            }
            InputStream from = new FileInputStream(mFullPath);
            OutputStream to = new FileOutputStream(HEAD_IMAGE_PATH + HEAD_IMAGE_NAME);
            byte bt[] = new byte[1024];
            int c;
            while ((c = from.read(bt)) > 0) {
                to.write(bt, 0, c);
            }
            from.close();
            to.close();
        }catch (Exception e) {
        }
    }

    private Intent cropImage(Uri uri) {
        Intent intent = new Intent("com.android.camera.action.CROP");
        intent.setDataAndType(uri, "image/*");
        intent.putExtra("crop", "true");
        intent.putExtra("aspectX", 1);
        intent.putExtra("aspectY", 1);
        intent.putExtra("outputX", 800);
        intent.putExtra("outputY", 800);
        intent.putExtra("return-data", false);
        intent.putExtra("scale", true);
        intent.putExtra("scaleUpIfNeeded", true);
        intent.putExtra(MediaStore.EXTRA_OUTPUT,
                Uri.fromFile(new File(mFullPath)));
        intent.putExtra("outputFormat", "png");
        return intent;
    }
    @Override
    public String getName() {
        return "HeadImageModule"; // 返回JavaScript端标记模块
    }
    @ReactMethod
    public void callCarmera(Promise promise) {
        // 导出给js调用的方法
        recursionDeleteFile(); // 删除目录下除了头像图片的其他临时图片
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE); // 启动相机的intent
        if (isPathExists()) {
            mFullPath = HEAD_IMAGE_PATH + System.currentTimeMillis() + ".png";
            mUri = Uri.fromFile(new File(mFullPath));
            intent.putExtra(MediaStore.EXTRA_OUTPUT, mUri);
            Activity activity = getCurrentActivity();
            if (activity != null) {
                mPromise = promise;
                activity.startActivityForResult(intent, REQUEST_CODE_CAMERA);
            }
        }
    }
    @ReactMethod
    public void callGallery(Promise promise) {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT, null);
        intent.setType("image/*");
        intent.putExtra("return-data", true);
        if (isPathExists()) {
            mFullPath = HEAD_IMAGE_PATH + System.currentTimeMillis() +  ".png";
            mUri = Uri.fromFile(new File(mFullPath));
            intent.putExtra(MediaStore.EXTRA_OUTPUT, mUri);
            Activity activity = getCurrentActivity();
            if (activity != null) {
                mPromise = promise;
                activity.startActivityForResult(intent, REQUEST_CODE_GALLERY);
            }
        }
    }
    @ReactMethod
    public void isImageExists(Promise promise) {
        boolean isExists = isHeadImageExits();
        promise.resolve(isExists);
    }
    @ReactMethod
    public void getImageUri(Promise promise) {
        Uri uri = Uri.fromFile(new File(HEAD_IMAGE_PATH + HEAD_IMAGE_NAME));
        promise.resolve(uri.toString());
    }
    private void recursionDeleteFile() {
        File file = new File(HEAD_IMAGE_PATH);
        File[] childFile = file.listFiles();
        if (childFile == null || childFile.length == 0) {
            return;
        }
        for (File f : childFile) {
            if (f.getName().contains(HEAD_IMAGE_NAME)) {
                continue;
            }
            f.delete();
        }
    }

}
