/**
 * Created by wayne on 2017/5/19.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Password from 'react-native-password-pay';

export  default class congratulations extends Component {
    static navigationOptions = ({ navigation}) => ({
        title: '修改成功',
        headerLeft: null
    });

    render() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        return (
            <View style={{alignItems: 'center'}}>
                <Text>
                    恭喜设置支付密码成功
                </Text>
            </View>
        );
    }
}
