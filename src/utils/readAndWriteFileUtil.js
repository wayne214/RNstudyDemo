/**
 * Created by wayne on 2017/7/21.
 */
import RNFS from 'react-native-fs'; // 导入
import moment from 'moment';

var currentData = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
var path = RNFS.ExternalDirectoryPath + '/text.txt'; // 文件路径

let userID = '';
let userNAME = '';
let userPhone = '';

class readAndWriteFileUtil {
    // 写内容到文件中
    /**
     * 参数说明：
     * action：动作名称
     * city: 城市，
     * gpsX: 维度
     * gpsY: 经度
     * phoneNum：电话号码
     * prov: 省
     * region：区
     * time：操作时间
     * useTime: 耗时
     * userId: 用户Id
     * userName: 用户名字
     * */
    writeFile(action, city, gpsX, gpsY, phoneNum, prov, region, useTime, userId, userName) {
        userID = userId;
        userNAME = userName;
        userPhone = phoneNum;
        var content={'action':action, 'city': city, 'gpsX': gpsX, 'gpsY': gpsY, 'phoneNum': phoneNum, 'prov': prov,
            'region': region, 'time': currentData, 'useTime': useTime, 'userId': userId, 'userName': userName};
        var jsonarr = JSON.stringify(content);
        RNFS.writeFile(path, jsonarr + '\n', 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    // 向文件中添加内容
    appendFile(action, city, gpsX, gpsY, prov, region, useTime) {
        var content={'action':action, 'city': city, 'gpsX': gpsX, 'gpsY': gpsY, 'phoneNum': userPhone, 'prov': prov,
            'region': region, 'time': currentData, 'useTime': useTime, 'userId': userID, 'userName': userNAME};
        var jsonarr = JSON.stringify(content);
        RNFS.appendFile(path, jsonarr, 'utf8')
            .then((success) => {
                console.log('FILE APPEND SUCCESS');
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    // 读取文件
    readFile(successCallback, failCallback) {
        RNFS.readFile(path,'utf8')
            .then((result) => {
                successCallback(result);
            })
            .catch((err) => {
                failCallback(err.message)
            });
    }
    // 读取目录
    readDir() {
        RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then((result) => {
                console.log('GOT RESULT', result);
                let index = result.length - 1;
                // stat the first file
                return Promise.all([RNFS.stat(result[index].path), result[index].path]);
            })
            .then((statResult) => {
                console.log('statResult',statResult,statResult[0].isFile());
                if (statResult[0].isFile()) {
                    // if we have a file, read it
                    return RNFS.readFile(statResult[1], 'utf8');
                }

                return 'no file';
            })
            .then((contents) => {
                // log the file contents
                console.log(contents);
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
    }
    // 删除文件
    deleteFile() {
        RNFS.unlink(path)
            .then(() => {
                console.log('FILE DELETED');
            })
            .catch((err) => {
                console.log(err.message);
            })
    }
    getPath() {
        return 'file://'.concat(path);
    }
    // 判断文件路径是否存在
    isFilePathExists(successCallback) {
         RNFS.exists(path)
            .then((value) => {
                successCallback(value);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}
const instance = new readAndWriteFileUtil();

export default instance;