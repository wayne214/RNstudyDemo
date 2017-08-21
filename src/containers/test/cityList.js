import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    ListView,
    TouchableOpacity,
    Text,
    DeviceEventEmitter,
} from 'react-native';
import CityList from '../../../assets/data/city.json';
import ProvinceListJson from '../../../assets/data/province.json';
import CheckboxList from '../../common/checkBoxList';
import Checkbox from '../../common/checkbox';

let provinceArray = [];
var toDeleteIds = [];
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    // listView: {
    //     backgroundColor: '#F5F5F5',
    //     // height: screenHeight - 64 - 49,
    // },
});

class cityList extends Component {
    constructor(props) {
        super(props);
        this.select;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const cityDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            cityDataSource: cityDs,
            checkBoxSource: [],
            maxSelect: 1,
            disable: false,
            isAllSelect:false,//是否全选,
        };

        this.renderSeparator = this.renderSeparator.bind(this);
        this.renderSeparator2 = this.renderSeparator2.bind(this);
        this.selectCityList = this.selectCityList.bind(this);
    }

    static propTypes = {
        style: PropTypes.object,
    };

    componentDidMount() {
        // const data = CityList.provinces[0].citys;
        // console.log('测试数据', data);
        this.bindData();
    }
    bindData() {
        const provinces = ProvinceListJson.provinces;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(provinces)
        })


    }
    selectCityList(data) {
        provinceArray = [];
        toDeleteIds = [];
        const cityDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            checkBoxSource: [],
            isAllSelect: false,
        });
        setTimeout(() => {
            const provinces = ProvinceListJson.provinces;
            for (let i = 0; i < provinces.length -1; i++) {
                if (data === provinces[i].code) {
                    // for (let j = 0; j< provinces[i].citys.length; j++) {
                    //     provinceArray.push(provinces[i].citys[j].area);
                    // }
                    // provinceArray = provinceArray.concat(provinces[i].citys);
                    this.setState({
                        cityDataSource: this.state.cityDataSource.cloneWithRows(provinces[i].citys),
                        // checkBoxSource: provinces[i].citys,
                        // maxSelect: provinces[i].citys.length,
                    });
                    break;
                }
            }
        }, 1);
    }
// listView的分割线
    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`{sectionID}-${rowID}`}
                style={{height: 1, backgroundColor: 'blue'}}
            />
        );
    }
    renderSeparator2(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`{sectionID}-${rowID}`}
                style={{height: 1, backgroundColor: 'blue'}}
            />
        );
    }

    renderRow(rowData) {
        return (
            <View style={{padding: 5, width: 100}}>
                <TouchableOpacity onPress={() => {
                    this.selectCityList(rowData.code);
                }}>
                    <Text>{rowData.address}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderRow2(rowData) {
        return (
            <View style={{padding: 5, flexDirection:'row'}}>
                <Checkbox
                    content={rowData.area}
                    id = {rowData.code}
                    style={{marginRight:12}}
                    isChecked={false}
                    onChange={(id,content,isChecked)=>{
                        if(isChecked){
                            toDeleteIds.push(content);
                            console.log('9999==xujoijioaeio',toDeleteIds)
                        }else {
                            var index = toDeleteIds.indexOf(content);
                            if(index >= 0){
                                toDeleteIds.splice(index,1);
                            }
                            console.log('xujoijioaeio===999',toDeleteIds)
                        }
                    }}
                />
            </View>
        )
    }

    render() {
        const {checkBoxSource} = this.state;
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: 100, backgroundColor:'#fbf'}}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            style={styles.listView}
                            renderSeparator={this.renderSeparator}
                            enableEmptySections={true}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={{backgroundColor:'#bfb', width: 100}}>
                        <ListView
                            dataSource={this.state.cityDataSource}
                            renderRow={this.renderRow2.bind(this)}
                            style={styles.listView}
                            renderSeparator={this.renderSeparator2}
                            enableEmptySections={true}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    {/*<View style={{backgroundColor:'#ffb', width: 150}}>*/}
                        {/*{*/}
                            {/*this.state.checkBoxSource.length > 0 ? <CheckboxList*/}
                                {/*options={*/}
                                    {/*checkBoxSource*/}
                                {/*}*/}
                                {/*// selectedOptions={[...checkBoxSource]}*/}
                                {/*maxSelectedOptions={5}*/}
                                {/*disabled={this.state.disable}*/}
                                {/*onSelection={(option) => {*/}
                                    {/*// this.select = option;*/}
                                    {/*console.log('选择了',option);*/}
                                    {/*this.select = option;*/}
                                {/*}}*/}
                                {/*optionStyle={{width: 150}}*/}
                            {/*/> : null*/}
                        {/*}*/}

                    {/*</View>*/}
                </View>
            </View>
        )
    }
}

export default cityList;
