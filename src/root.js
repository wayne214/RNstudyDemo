/**
 * Created by wayne on 2017/5/19.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import Home from '../src/containers/home'
import Mine from '../src/containers/mine'
import ChatScreen from '../src/containers/ChatScreen'
import ChatScreen2 from '../src/containers/ChatScreen2'
import MeScreen from '../src/containers/meScreen'
import RecentChatsScreen from '../src/containers/FirstScreen'
import CongratulationsScreen from '../src/containers/congratulations'
import { StackNavigator, TabNavigator } from 'react-navigation';


const MainScreenNavigator = TabNavigator({
    Recent: {
        screen: RecentChatsScreen,
    },
    Resource: {
        screen: Home,
    },
    Other: {
        screen: Mine,
    },
    All: {
        screen: MeScreen,
    },
}, {
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#19319c', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 12, // 文字大小
        },
    },
});

const SimpleApp = StackNavigator({
    Home: { screen: MainScreenNavigator },
    Chat: { screen: ChatScreen },
    Chat2: { screen: ChatScreen2 },
    Congratulations: { screen: CongratulationsScreen },
});

AppRegistry.registerComponent('studyDemo', () => SimpleApp);
