import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    ListView,
    RefreshControl,
    Image,
    Dimensions,
    Text,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import VideoListItem from './VideoListItem';

//视频地址，下一页链接会在json中一起返回
const videoUrl = 'http://baobab.wandoujia.com/api/v1/feed?num=1';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    parallaxHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 15,
    },
    avatar: {
        height: 150,
        width: 150,
    },
    img_header_background: {
        width: width,
        height: 210,
        resizeMode: 'cover'
    }
});

class videoList extends Component {
    constructor(props) {
        super(props);
        let defaultDS = new ListView.DataSource(
            //指定更新row数据的策略，一般都是判断前后两行不相等的时候进行更新
            {rowHasChanged: (prevRowData, nextRowData) => prevRowData !== nextRowData}
        );
        this.state = {
            dataSource: defaultDS,
            data: [],
            nextPageUrl: '',
            isRefreshing: false,
        }
    }

    componentDidMount() {
        this._fetchVideoList();
    }
    //发起网络请求，获取数据
    _fetchVideoList() {
        fetch(videoUrl)
            .then((response)=>response.json())
            .then(
                (responseJson)=> {
                    let videos = responseJson.dailyList[0].videoList;
                    let nextPage = responseJson.nextPageUrl;
                    console.log(videos);
                    console.log("下一页：" + nextPage)
                    this.setState({
                        data: videos,
                        nextPageUrl: nextPage,
                        isRefreshing: false,

                    })
                }
            )
            .catch((error)=> {
                console.error(error);
                this.setState({
                    isRefreshing: false,
                })
            })
    }

    //渲染列表项
    _renderRow(rowData, rowId) {
        return <VideoListItem
            onItemClick={()=>this._onItemClick(rowData, rowId)}
            imgUrl={rowData.coverForFeed}
            title={rowData.title}/>
    }
    //处理列表item的点击事件
    _onItemClick(rowData, rowId) {
        //ToastUtil.show("点击了" + rowId);
        const { navigate } = this.props.navigation;
        // const {navigator} = this.props;
        // if (navigator) {
        //     navigator.push({
        //         name: 'VideoDetailPage',
        //         //这里跳转到VideoDetailPage后，后自动向该页面属性中注入navigator对象
        //         //在VideoDetailPage就可以直接通过props获取，其他地方也一样
        //         component: VideoDetailPage,
        //         params: {
        //             rowData: rowData,
        //             rowId: rowId,
        //         }
        //     });
        // }

        navigate('VideoDetailPage', {rowData: rowData, rowId: rowId})
    }
    //渲染列表
    _renderList() {
        if (this.state.data) {
            //通过解构赋值
            const {
                onScroll = () => {
                }
            } = this.props;
            return (
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                    renderRow={(rowData, sectionId, rowId) => this._renderRow(rowData, rowId)}
                    enableEmptySections={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this._fetchVideoList()}
                        />}
                    renderScrollComponent={props => (
                        <ParallaxScrollView
                            onScroll={onScroll}
                            parallaxHeaderHeight={210}
                            backgroundSpeed={0}
                            fadeOutForeground={false}
                            renderBackground={() => (
                                <View key="background">
                                    <Image
                                        style={styles.img_header_background}
                                        source={require('../../../assets/img/home_page_header_cover.jpg')}>
                                        <View key="parallax-header" style={styles.parallaxHeader}>
                                            <Image style={styles.avatar}
                                                   source={require('../../../assets/img/home_page_header_cover.jpg')}/>
                                            <Text style={styles.sectionSpeakerText}>
                                                {new Date().getFullYear()}
                                            </Text>
                                        </View>

                                    </Image>
                                </View>
                            )}


                        />
                    )}

                />
            )
        } else {
            return (
                <Text style={{flex: 1, textAlignVertical: 'center', textAlign: 'center'}}>加载中...</Text>
            )
        }
    }

    render() {
        return (
            this._renderList()
        )
    }
}

export default videoList;
