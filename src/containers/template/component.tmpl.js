import React, {Component, PropTypes} from 'react';
import {
	View,
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
});

class ComponentTmpl extends Component{
	constructor(props) {
		super(props);
	}

	static propTypes = {
	  style: PropTypes.object,
	};
	componentDidMount(){

	}

	render() {
		return (
			<View style={styles.container}></View>
		)
	}
}

export default ComponentTmpl;
