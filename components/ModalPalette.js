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
        console.log(this.props.paletteInfo);
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={Styles.centeredView}>
                    <View style={Styles.modalView}>
                        <View style={{...Styles.color, backgroundColor: `#${this.props.paletteInfo.dominant}`}}>

                        </View>

                        <TouchableHighlight
                            style={{...Styles.openButton, backgroundColor: '#2196F3'}}
                            onPress={() => {
                                this.props.setModalVisible(false);
                            }}>
                            <Text style={Styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ModalPalette;
