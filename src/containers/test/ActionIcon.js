import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img_bottom_action: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 40,
    }
});

class ComponentTmpl extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <Image
                source={this.props.source}
                style={styles.img_bottom_action}
            />
        )
    }
}

export default ComponentTmpl;
