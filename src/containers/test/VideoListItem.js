import React, {Component, PropTypes} from 'react';
import {
	View,
	StyleSheet,
		Image,
		Text,
		Dimensions,
		TouchableOpacity
} from 'react-native';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    image_bg: {
        height: 220,
        resizeMode: "cover",
    },
    title: {
        width: width,
        flex: 1,
        backgroundColor: "#0000008C",
        textAlignVertical: 'center',
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    }
});

class VideoListItem extends Component{
	constructor(props) {
		super(props);
      this.state = {
          videoModel: {
              title: '这里显示标题',
              playUrl: '',
              imgUrl: 'http://source.51yrz.com/1466071007.jpg?imageView2/1/w/600/h/300',
          },
      }
	}

	componentDidMount(){

	}

	render() {
		return (
			<TouchableOpacity activeOpacity={0.7} onPress={this.props.onItemClick}>
				<Image
					style={styles.image_bg}
					source={{uri: this.props.imgUrl}}>
					<Text style={styles.title}>{this.props.title}</Text>
				</Image>
			</TouchableOpacity>
		)
	}
}

export default VideoListItem;
