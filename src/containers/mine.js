/**
 * Created by wayne on 2017/5/19.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    NetInfo,
    Platform,
    Alert,
    TouchableOpacity,
    Linking,
    Image,
} from 'react-native';

import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import _updateConfig from '../../update.json';
const {appKey} = _updateConfig[Platform.OS];

export default class Mine extends Component {
    static navigationOptions = {
        title: '网络',
        tabBarLabel: '网络',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../assets/img/order.png')}
                style={[{tintColor: tintColor},styles.icon]}
            />
        ),
    };
    constructor(props) {
        super(props);
        this.state = {
            isConnected: null,
            connectionInfo: null,
        };
        this._handleConnectivityChange = this._handleConnectivityChange.bind(this);
        this.crash = this.crash.bind(this);
    }
    componentWillMount(){
        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
                {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
                {text: '否', onPress: ()=>{markSuccess()}},
            ]);
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }
    }
    componentDidMount() {
        // 网络监听
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        );

        console.log('全局变量',global._LOGIN_);
    }

    componentWillUnmount(){
        // UMNative.onPageEnd('ajodfijao');
    }

    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                {text: '是', onPress: ()=>{switchVersion(hash);}},
                {text: '否',},
                {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
            ]);
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };
    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
                ]);
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.');
            } else {
                Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
                    {text: '是', onPress: ()=>{this.doUpdate(info)}},
                    {text: '否',},
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };

    crash(){
        const PI = 3.1415
        console.log(PI/0);
        new Error("Whoops!")
        alert('adfjdoi');

    }

    // 网络变化时的回调
    _handleConnectivityChange(isConnected) {
        console.log(isConnected ? 'online' : 'offline');
        // this.setState({isConnected})
        // 检测网络是否连接
        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({isConnected});
                console.log('isConnected', isConnected)
            }
        );
        // 检测网络连接信息
        NetInfo.fetch().done(
            (connectionInfo) => { this.setState({connectionInfo});
                console.log('connectionInfo',connectionInfo)
            }
        );
    }

    componentWillUnmount() {
        // 移除网络监听
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    当前的网络状态
                </Text>
                <Text style={styles.welcome}>
                    {this.state.isConnected ? '网络在线' : '离线'}
                </Text>
                <Text style={styles.welcome}>
                    当前网络连接类型
                </Text>
                <Text style={styles.welcome}>
                    {this.state.connectionInfo}
                </Text>
                <Text style={styles.welcome}>
                    当前连接网络是否计费
                </Text>
                <Text style={styles.welcome}>
                    {NetInfo.isConnectionExpensive === true ? '需要计费' : '不要'}
                </Text>
                <Text style={styles.welcome}>
                    终于迎来了第二版了，开心哦{'\n'}这是iOS版的呀，哈哈哈
                </Text>
                <Text style={styles.welcome}>
                    欢迎使用热更新服务
                </Text>
                <Text style={styles.instructions}>
                    这是版本一 {'\n'}
                    当前包版本号: {packageVersion}{'\n'}
                    当前版本Hash: {currentVersion||'(空)'}{'\n'}
                </Text>
                {/*<TouchableOpacity onPress={this.checkUpdate}>*/}
                    {/*<Text style={styles.instructions}>*/}
                        {/*点击这里检查更新*/}
                    {/*</Text>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity onPress={() => {this.crashTo()}}>
                    <Text style={styles.instructions}>
                        点击奔溃
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});