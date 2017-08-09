/**
 * Created by wayne on 2017/5/19.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    DeviceEventEmitter,
    AppState
} from 'react-native';
import ToastAndroid2 from '../utils/toastAndroid2'
import HeadLessService from '../utils/headLessService'
import umengAnalysis from '../utils/umengAnalysis';
import Picker from 'react-native-picker';
import BackgroundService from '../utils/backgroundService';

BackgroundService.registerNewPostsListener();

export  default class meScreen extends Component {
    static navigationOptions = {
        title: '首页',
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../assets/img/me.png')}
                style={[{tintColor: tintColor},styles.icon]}
            />
        ),
    };
    componentWillMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        DeviceEventEmitter.addListener('willShow',(value) => {
            alert(value);
        })
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }
    handleAppStateChange(newState) {
        if (newState === 'active') {
            // BackgroundService.stopNewPostsListener();
            // BackgroundService.startNewPostsListener({key: '!!!!!!!'});
            // HeadLessService.schedule('大家哦二级');
        } else if (newState === 'background') {
            // BackgroundService.startNewPostsListener({key: '!!!!!!!'});
        }
    }
    createDateData() {
        const date = [];
        for (let i = 1950; i < 2050; i++) {
            const month = [];
            for (let j = 1; j < 13; j++) {
                const day = [];
                if (j === 2) {
                    for (let k = 1; k < 29; k++){
                        const dayNum = this.prefixInteger(k,2);
                        day.push(dayNum);
                    }
                    // Leap day for years that are divisible by 4, such as 2000, 2004
                    if (i % 4 === 0) {
                        day.push(29);
                    }
                } else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}){
                    for (let k = 1; k < 32;k++) {
                        const dayNum = this.prefixInteger(k,2);
                        day.push(dayNum);
                    }
                } else {
                    for (let k = 1; k < 31; k++){
                        const dayNum = this.prefixInteger(k,2);
                        day.push(dayNum);
                    }
                }
                const monthObj = {};
                const monNum = this.prefixInteger(j, 2);
                monthObj[monNum] = day;
                month.push(monthObj);
            }
            const dateObj = {};
            dateObj[i] = month;
            date.push(dateObj);
        }
        // 长期
        // let longMon = [];
        // let longDate = {' ':[' ']};
        // for(let j = 1; j < 13; j++) {
        //     longMon.push(longDate);
        // }
        // let secular = {};
        // secular['长期'] = longMon;
        // date.push(secular);
        return date;
    }

    // 数字前面自动补0
    prefixInteger(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }

    showDatePicker() {
        Picker.init({
            pickerData: this.createDateData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0 ,0, 1],
            pickerBg: [255, 255, 255, 1],
            selectedValue: ['2017', '06', '22'],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择日期',
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
        });
        Picker.show();
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button
                     onPress={() => navigate('Chat', {user: 'Jane',callback: (data) => {
                         console.log('接收的数据是: ',data)
                     }, isBack: true}
                     )} //Passing params
                    // onPress={() => ToastAndroid2.show('ceshiyixaiis',ToastAndroid2.SHORT)} //Passing params
                    // onPress={() => umengAnalysis.toast('umengAnalysis')} //Passing params
                    // onPress={() => this.showDatePicker()} //Passing params
                    title="Chat with Jane"
                />
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
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    }
});


