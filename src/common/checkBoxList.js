/**
 * Created by wayne on 2017/5/3.
 */

import React, {Component, PropTypes} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ListView,
    StyleSheet,
    DeviceEventEmitter,
} from 'react-native';

import checkActive from '../../assets/img/check-active.png';
import checkNormal from '../../assets/img/check-normal.png';

const propTypes = {
    options: React.PropTypes.array.isRequired,
    selectedOptions: React.PropTypes.array,
    maxSelectedOptions: React.PropTypes.number,
    onSelection: React.PropTypes.func,
    renderIndicator: React.PropTypes.func,
    renderSeparator: React.PropTypes.func,
    renderRow: React.PropTypes.func,
    renderText: React.PropTypes.func,
    style: View.propTypes.style,
    optionStyle: View.propTypes.style,
    disabled: PropTypes.bool,
};
const defaultProps = {
    options: [],
    selectedOptions: [],
    onSelection(option) {
    },
    style: {},
    optionStyle: {},
    disabled: false,
};

const styles = StyleSheet.create({
    list: {},

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        height: 44,
        justifyContent: 'center',
    },

    optionLabel: {
        flex: 1,
    },

    optionIndicator: {
        marginRight: 20,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    optionIndicatorIcon: {
        width: 20,
        height: 20,
    },

    separator: {
        marginLeft: 20,
        height: 1,
        backgroundColor: '#d9d9d9',
    },
    radio: {
        marginRight: 6,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        color: '#0066CC',
    },
    dot: {
        width: 15,
        height: 15,
    },
    itemText: {
        fontSize: 16,
        color: '#333333',
    },
});

class CheckboxList extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
        this.ds = ds;
        console.log('99999====',this.props.options);
        this.state = {
            dataSource: ds.cloneWithRows(this.props.options),
            selectedOptions: this.props.selectedOptions || [],
            disabled: this.props.disabled,
            clearSelected: false,
        };

        this.updateSelectedOptions = this.updateSelectedOptions.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.renderIndicator = this.renderIndicator.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.renderIndicator2 = this.renderIndicator2.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.updateSelectedOptions(nextProps.selectedOptions);
        this.setState({
            disabled: nextProps.disabled,
        });
    }
    componentWillUpdate() {
        // if (this.state.selectedOptions.length === this.props.maxSelectedOptions) {
        //     this.selectOption(this.state.selectedOptions);
        // }
        DeviceEventEmitter.addListener('clearSelect', () => {
            this.setState({
                clearSelected: true,
            });
            this.updateSelectedOptions([]);

            this.props.onSelection([]);
        });
    }
    updateSelectedOptions(selectedOptions) {
        this.setState({
            selectedOptions,
            dataSource: this.ds.cloneWithRows(this.props.options),
            clearSelected: false,
        });
    }

    validateMaxSelectedOptions() {
        const maxSelectedOptions = this.props.maxSelectedOptions;
        const selectedOptions = this.state.selectedOptions;

        if (maxSelectedOptions && selectedOptions.length > 0 &&
            selectedOptions.length >= maxSelectedOptions) {
            selectedOptions.splice(0, 1);
        }

        this.updateSelectedOptions(selectedOptions);
    }

    selectOption(selectedOption) {
        const selectedOptions = this.state.selectedOptions;
        console.log(selectedOption);
        console.log(selectedOptions);
        let index;
        if (typeof (selectedOption.value) !== 'undefined') {
            index = selectedOptions.indexOf(selectedOption.value);
        } else {
            index = selectedOptions.indexOf(selectedOption);
        }
        if (index === -1) {
            this.validateMaxSelectedOptions();
            if (typeof (selectedOption.value) !== 'undefined') {
                selectedOptions.push(selectedOption.value);
            } else {
                selectedOptions.push(selectedOption);
            }
        } else {
            selectedOptions.splice(index, 1);
        }

        this.updateSelectedOptions(selectedOptions);

        // run callback
        this.props.onSelection(selectedOptions);

    }

    isSelected(option) {
        if (typeof (option.value) !== 'undefined') {
            return this.state.selectedOptions.indexOf(option.value) !== -1;
        }
        return this.state.selectedOptions.indexOf(option) !== -1;
    }

    renderIndicator(option) {
        if (this.isSelected(option)) {
            if (typeof this.props.renderIndicator === 'function') {
                return this.props.renderIndicator(option);
            }
            if (typeof (option.value) !== 'undefined') {
                return (
                    <View style={[styles.radio, {borderColor: '#0066CC'}]}>
                        <Text style={styles.selected}>{option.value}</Text>
                    </View>
                );
            }
            return (
                <View style={[styles.radio]}>
                    <Image style={styles.dot} source={checkActive}/>
                </View>
            );
        }
        if (typeof (option.value) !== 'undefined') {
            return (<View style={styles.radio}><Text>{option.value}</Text></View>);
        }
        return (
            <View style={[styles.radio]}>
                <Image style={styles.dot} source={checkNormal}/>
            </View>
        );
    }

    renderIndicator2() {
        return (
            <View style={[styles.radio]}>
                <Image style={styles.dot} source={checkNormal}/>
            </View>
        );
    }

    renderSeparator(option) {
        if (typeof this.props.renderSeparator === 'function') {
            return this.props.renderSeparator(option);
        }
        return (<View style={styles.separator}/>);
    }

    renderText(option) {
        if (typeof this.props.renderText === 'function') {
            return this.props.renderText(option);
        }
        if (typeof (option.label) !== 'undefined') {
            return (<Text>{option.label}</Text>);
        }
        return (<Text style={styles.itemText}>{option.area}</Text>);
    }

    renderRow(option, sectionID, rowID) {
        if (typeof this.props.renderRow === 'function') {
            return this.props.renderRow(option);
        }

        const disabled = this.state.disabled;
        return (

            <View style={this.props.optionStyle}>
                <TouchableOpacity
                    activeOpacity={disabled ? 1 : 0.7}
                    onPress={!disabled ? () => {
                        this.selectOption(option,1);
                    } : null}
                >
                    <View>
                        <View
                            style={styles.row}
                        >
                            <View style={styles.optionLabel}>{this.renderText(option)}
                            </View>
                            <View style={styles.optionIndicator}>{this.state.clearSelected ? this.renderIndicator2() : this.renderIndicator(option)}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    rowID < this.props.options.length - 1 ? this.renderSeparator(option) : null
                }
            </View>
        );
    }

    render() {
        return (
            <ListView
                style={[styles.list, this.props.style]}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}
                removeClippedSubviews={false}
            />
        );
    }
}

CheckboxList.propTypes = propTypes;
CheckboxList.defaultProps = defaultProps;

module.exports = CheckboxList;
