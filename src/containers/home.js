/**
 * Created by wayne on 2017/5/19.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class Home extends Component {
    static navigationOptions = {
        title: '测试',
        tabBarLabel: '测试',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../assets/img/goods.png')}
                style={[{tintColor: tintColor},styles.icon]}
            />
        ),
    };
    constructor(props){
        super(props);
        this.openPicker = this.openPicker.bind(this);
        this.pickMultiple = this.pickMultiple.bind(this);
    }
    openPicker(){

    }
    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false
        }).then(images => {
            this.setState({
                image: null,
                images: images.map(i => {
                    console.log('received image', i);
                    return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                })
            });
        }).catch(e => alert(e));
    }
    componentDidMount() {
        console.log('componentDidMount')
    }

    render() {
        console.log('renders')
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    资源
                </Text>
                <TouchableOpacity onPress={() => {
                    this.pickMultiple();
                }}>
                    <Text>选择照片</Text>
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
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});