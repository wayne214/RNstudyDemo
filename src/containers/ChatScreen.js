/**
 * Created by wayne on 2017/5/19.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import Password from 'react-native-password-pay';
// import Password from '../utils/passwordInput';

export  default class ChatScreen extends Component {
    static navigationOptions = ({ navigation}) => {
        // title: `Chat with ${navigation.state.params.user}`,
        // headerStyle: {
        //     color: 'red',
        // },
        // headerLeft:
        if (self.key != 'publish') self = null;
        let {state, goBack} = navigation;
        let {title, isBack, callback } = navigation.state.params;
        return ({
            title: `Chat with ${navigation.state.params.user}`,
            headerStyle: {backgroundColor:'blue'},
            headerLeft: <View>
                <TouchableOpacity
                    style={{width: 44, height: 44, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                        if (isBack) {
                            Alert.alert('提示', '是否放弃输入信息',
                                [
                                    {text: '暂不'},
                                    {text: '确定', onPress: () => {callback('我回来啦'), goBack()}}
                                ]
                                )
                        } else {
                            goBack()
                        }
                    }
                    }
                >
                    <Image style={{width: 26, height: 26,}} source={require('../../assets/img/back.png')}/>
                </TouchableOpacity>
            </View>
                })
    };


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


