import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Text,
    ScrollView,
    Button,
    Dimensions,
    Animated,
} from 'react-native';
/**
 * ItemSeparatorComponent：分割线组件，
 ListFooterComponent：结尾组件
 ListHeaderComponent：头组件
 data：列表数据
 horizontal：设置为true则变为水平列表。
 numColumns：列数 组件内元素必须是等高的,无法支持瀑布流布局
 columnWrapperStyle：numColumns大于1时，设置每行的样式
 getItemLayout：如果我们知道行高可以用此方法节省动态计算行高的开销。
 refreshing：是否正在加载数据
 onRefresh：设置此属性需要一个标准的 RefreshControl 控件，刷新数据
 renderItem：渲染每个组件
 onViewableItemsChanged：当一个新的Item渲染或者隐藏 的时候调用此方法。参数：info: {viewableItems: Array, changed: Array} viewableItems：当前可见的Item，changed：渲染或者隐藏的Item。
 scrollToEnd({params?: ?{animated?: ?boolean}})：滚动到末尾，如果不设置getItemLayout属性的话，可能会比较卡。
 scrollToIndexparams: {animated?: ?boolean, index: number, viewPosition?: number}：滚动到制定的位置
 scrollToOffset(params: {animated?: ?boolean, offset: number})：滚动到指定的偏移的位置。
 *
 *
 * */
import CheckUtil from '../../utils/checkObjIsEmpty';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    content: {
        fontSize: 15,
        color: 'black',
    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    }
});
const REQUEST_URL = 'https://api.github.com/search/repositories?q=javascript&sort=stars';
const { height, width } = Dimensions.get('window');
var ITEM_HEIGHT = 100;
class FlatlistDemo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            refreshing: false
        }
    }

    static propTypes = {
        style: PropTypes.object,
    };
    componentDidMount(){
        const ff1 = CheckUtil.isEmptyString('');
        const ff2 = CheckUtil.isEmpty(null);
        console.log('tiaoshi', ff1, ff2, typeof (null));
        this.fetchData();
    }
    //网络请求
    fetchData() {
        //这个是js的访问网络的方法
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                let data = responseData.items;
                let dataBlob = [];
                let i = 0;
                data.map(function (item) {
                    dataBlob.push({
                        key: i,
                        value: item,
                    })
                    i++;
                });
                this.setState({
                    //复制数据源
                    dataArray: dataBlob,
                    isLoading: false,
                });
                data = null;
                dataBlob = null;
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                })
            })
            .done();
    }
    _header = () => {
        return <Text style={[styles.txt, { backgroundColor: 'black' }]}>这是头部</Text>;
    };

    _footer = () => {
        return <Text style={[styles.txt, { backgroundColor: 'black' }]}>这是尾部</Text>;
    };
    _separator = () => {
        return <View style={{ height: 2, backgroundColor: 'yellow' }}/>;
    };
    _onRefresh() {
        alert('正在刷新中.... ');
    };
    //加载等待的view
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    style={[styles.gray, {height: 80}]}
                    color='red'
                    size="large"
                />
            </View>
        );
    }
    //加载失败view
    renderErrorView(error) {
        return (
            <View style={styles.container}>
                <Text>
                    Fail: {error}
                </Text>
            </View>
        );
    }
    //返回itemView
    renderItemView({item}) {
        return (
            <View>
                <Text style={styles.title}>name: {item.value.name} ({item.value.stargazers_count}
                    stars)</Text>
                <Text style={styles.content}>description: {item.value.description}</Text>
            </View>
        );
    }
    createEmptyView() {
        return (
            <Text style={{fontSize: 40, alignSelf: 'center'}}>还没有数据哦！</Text>
        );
    }

    renderData() {
        return (
            <View style={{flex: 1}} >
                <Button title='滚动到指定位置' onPress={() => {
                    //this._flatList.scrollToEnd();
                    //this._flatList.scrollToIndex({viewPosition:0,index:8});
                    this._flatList.scrollToOffset({ animated: true, offset: 2000 });
                } }/>
                <Text >
                    Data:
                </Text>
                <FlatList
                    ref={(flatList) => this._flatList = flatList}
                    data={this.state.dataArray}
                    renderItem={this.renderItemView}
                    ListHeaderComponent={this._header}
                    ListFooterComponent={this._footer}
                    ListEmptyComponent={this.createEmptyView}
                    ItemSeparatorComponent={this._separator}
                    numColumns ={2}
                    columnWrapperStyle={{ borderWidth: 2, borderColor: 'black' }}
                    refreshing={this.state.refreshing}
                    getItemLayout={(data, index) => (
                        { length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + 2) * index, index }
                    ) }
                    onRefresh={this._onRefresh}
                    onEndReachedThreshold={0.1}
                    onEndReached={(info) => {
                        alert("滑动到底部了");
                    } }

                    onViewableItemsChanged={(info) => {
                        //    alert("可见不可见触发");
                    } }
                    removeClippedSubviews={false}
                />
            </View>
        );
    }
    render() {
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView(this.state.errorInfo);
        }
        return this.renderData();
    }
}

export default FlatlistDemo;