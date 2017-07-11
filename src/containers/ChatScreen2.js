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

export  default class ChatScreen2 extends Component {
    static navigationOptions = ({ navigation}) => ({
        title: `Chat with ${navigation.state.params.user}`,
        headerLeft: null
    });

    render() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        return (
            <View style={{alignItems: 'center'}}>
                <Text>
                    请确认支付密码
                </Text>
                <Password maxLength={6}
                          onChange={(text)=> {
                              if (text && text.length == 6){
                                  if (text === params.password) {
                                      navigate('Congratulations');
                                  } else {
                                      alert('密码错误，请重新输入');
                                  }

                              }
                          }}
                />
            </View>
        );
    }
}


