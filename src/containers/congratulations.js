/**
 * Created by wayne on 2017/5/19.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
} from 'react-native';
import Password from 'react-native-password-pay';
import MyImage from '../common/MyImage';

export  default class congratulations extends Component {
    static navigationOptions = ({ navigation}) => ({
        title: '修改成功',
        headerLeft: null
    });
    constructor(props) {
        super(props);
        this.state = {
            headImageUri: null,
        }
    }
    async _clickImage() {
        this.setState({
            headImageUri: await NativeModules.HeadImageModule.callCarmera(),
        })
    }
    render() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        return (
            <View style={{alignItems: 'center'}}>
                <Text>
                    恭喜设置支付密码成功
                </Text>
                {/*<TouchableOpacity onPress={this._clickImage.bind(this)}>*/}
                    {/*<MyImage uri={this.state.headImageUri} imageStyle={{width: 100, height:100}}/>*/}
                {/*</TouchableOpacity>*/}
            </View>
        );
    }
}
