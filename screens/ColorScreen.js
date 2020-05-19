import * as React from 'react';
import { View, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import PaletteButton from '../components/PaletteButton';
import {Styles} from '../components/Styles';
import ModalPalette from '../components/ModalPalette';
import { getAllSwatches } from 'react-native-palette';
import {rgbaToHex, hexToName } from '../components/RgbaToHex';

class ColorScreen extends React.Component {

  constructor() {
    super();
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  state = {
    modalVisible: false,
    paletteInfo : {color: "#000"},
    image: '',
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { paletteInfo, modalVisible, image } = this.state;
    return (
      <View style={Styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={Styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
        <PaletteButton action={this.takePicture.bind(this)} />
        <ModalPalette paletteInfo={paletteInfo} image={image} setModalVisible={this.setModalVisible} modalVisible={modalVisible}/>
      </View>
    );
  }

  getColors = (path) => {
    getAllSwatches({}, path, (error, swatches) => {
      if(error) console.warn("error: ", error);
      else{
        swatches.sort((a, b) => {
          return b.population - a.population;
        });
        let dominant = 0;
        swatches.forEach(swatch => {
          if(dominant < swatch.population){
            dominant = swatch.population;
            console.log(hexToName(rgbaToHex(swatch.color)));
            this.setState({ paletteInfo: { dominant: rgbaToHex(swatch.color) } });
          }
        });
      }
    });
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      let uri = data.uri;
      this.setState({ image :  uri.replace("file:///", "") });
    }
    this.getColors(this.state.image);
    this.setModalVisible(true);
  };
}

export default ColorScreen;
