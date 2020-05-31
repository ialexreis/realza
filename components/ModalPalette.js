import React, {Component} from 'react';
import {
    Alert,
    Modal,
    Text,
    TouchableHighlight,
    View,
    StyleSheet
} from 'react-native';
import {Styles} from './Styles';

class ModalPalette extends Component {
    state = {
        colors: []
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.modalVisible}
                presentationStyle=""
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={Styles.centeredView}>
                    <View style={Styles.modalView}>
                        <View style={{...Styles.color, backgroundColor: `#${this.props.paletteInfo.dominant}`}}>
                        </View>
                        <TouchableHighlight
                            style={{...Styles.openButton, backgroundColor: '#FF0000'}}
                            onPress={() => {
                                this.props.setModalVisible(false);
                            }}>
                            <Text style={Styles.textStyle}>x</Text>
                        </TouchableHighlight>

                        <Text style={Styles.colorName}>{this.props.paletteInfo.closestName}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ModalPalette;
