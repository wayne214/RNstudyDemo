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
// import Password from '../utils/passwordInput';

export  default class ChatScreen extends Component {
    static navigationOptions = ({ navigation}) => ({
        title: `Chat with ${navigation.state.params.user}`
    });

    render() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        return (
            <View style={{alignItems: 'center'}}>
                <Text>
                    Chat with {params.user}
                </Text>
                <Text>
                    请输入支付密码
                </Text>
                <Password maxLength={6}
                          onChange={(text)=> {
                              console.log('输出是啥',text)
                              if (text && text.length == 6){
                                  navigate('Chat2', {password: text})
                              }
                          }}
                />
            </View>
        );
    }
}


