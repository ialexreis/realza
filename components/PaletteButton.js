import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {Styles} from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

class PaletteButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.action} style={Styles.button}>
        <Ionicons name="md-camera" size={30} color="#000" styles={Styles.camicon} />
      </TouchableOpacity>
    );
  }
}

export default PaletteButton;
