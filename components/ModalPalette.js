import React, {Component} from 'react';
import {
    Alert,
    Modal,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import {Styles} from './Styles';
import {ColorExtractor, renderSwatches} from 'react-color-extractor';

class ModalPalette extends Component {
    state = {
        colors: []
    }
    renderSwatches = () => {
        const { colors } = this.state

        return colors.map((color, id) => {
            return (
                <div
                    key={id}
                    style={{
                        backgroundColor: color,
                        width: 50,
                        height: 50
                    }}
                />
            )
        })
    }

    getColors = colors =>
        this.setState(state => ({ colors: [...state.colors, ...colors] }))

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <View style={Styles.centeredView}>
                    <View style={Styles.modalView}>

                        <ColorExtractor src={this.props.image} getColors={this.getColors} />
                        <View style={Styles.swatcheStyle}>{this.renderSwatches("rgb", this.state.colors)}</View>
                        <Text style={Styles.modalText}>{this.props.paletteInfo.color}</Text>

                        <TouchableHighlight
                            style={{...Styles.openButton, backgroundColor: '#2196F3'}}
                            onPress={() => {
                                this.props.setModalVisible(false);
                            }}
                        >
                            <Text style={Styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ModalPalette;
