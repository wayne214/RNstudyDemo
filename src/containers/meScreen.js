/**
 * Created by wayne on 2017/5/19.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from 'react-native';

export  default class meScreen extends Component {
    static navigationOptions = {
        title: '我',
        tabBarLabel: '我',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../assets/img/me.png')}
                style={[{tintColor: tintColor},styles.icon]}
            />
        ),
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button
                    onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params
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

