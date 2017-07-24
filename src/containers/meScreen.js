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


import RNFS from 'react-native-fs'; // 导入


import ReadAndWriteFileUtil from '../utils/readAndWriteFileUtil';

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
    constructor(props){
        super(props);
        this.writeFile = this.writeFile.bind(this);
        this.readFile = this.readFile.bind(this);
        this.appendFile = this.appendFile.bind(this);
        this.readDir = this.readDir.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.read = this.read.bind(this);
    }
    // 写内容到文件中
    writeFile() {
        ReadAndWriteFileUtil.writeFile('press','北京',0,0,'18611908428','北京','海淀区',55,'678909','wayne214');
    }
    // 向文件中添加内容
    appendFile() {
        ReadAndWriteFileUtil.appendFile('main','烟台',111,232,'山东','莱山',66);
    }
    readFileCallback(){

    }
    readFileSuccessCallback(result) {
        console.log('456789087654567',result, ReadAndWriteFileUtil.getPath());

    }
    // 读取文件
    readFile() {
        ReadAndWriteFileUtil.readFile(this.readFileSuccessCallback, this.readFileCallback);
    }
    // 读取文件
    read() {
        ReadAndWriteFileUtil.isFilePathExists((value) => {
            console.log('value9999', value);
        })
    }
    // 读取目录
    readDir() {
        // RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        //     .then((result) => {
        //         console.log('GOT RESULT', result);
        //         let index = result.length - 1;
        //         // stat the first file
        //         return Promise.all([RNFS.stat(result[index].path), result[index].path]);
        //     })
        //     .then((statResult) => {
        //     console.log('statResult',statResult,statResult[0].isFile());
        //         if (statResult[0].isFile()) {
        //             // if we have a file, read it
        //             return RNFS.readFile(statResult[1], 'utf8');
        //         }
        //
        //         return 'no file';
        //     })
        //     .then((contents) => {
        //         // log the file contents
        //         console.log(contents);
        //     })
        //     .catch((err) => {
        //         console.log(err.message, err.code);
        //     });
    }
    // 删除文件
    deleteFile() {
        ReadAndWriteFileUtil.deleteFile();
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button
                    // onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params
                    onPress={() => {this.writeFile()}} //Passing params
                    title="Write File"
                />
                <View style={{marginTop: 20}}>
                    <Button
                        // onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params
                        onPress={() => {this.appendFile()}} //Passing params
                        title="Append File"
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Button
                        // onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params
                        onPress={() => {this.readDir()}} //Passing params
                        title="Read Directory"
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Button
                        // onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params
                        onPress={() => {this.readFile()}} //Passing params
                        title="Read File"
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Button
                        // onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params
                        onPress={() => {this.read()}} //Passing params
                        title="Read"
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Button
                        // onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params
                        onPress={() => {this.deleteFile()}} //Passing params
                        title="Delete File"
                    />
                </View>
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

