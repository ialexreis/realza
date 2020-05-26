import * as React from 'react';
import {View, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import PaletteButton from '../components/PaletteButton';
import {Styles} from '../components/Styles';
import ModalPalette from '../components/ModalPalette';
import {getAllSwatches} from 'react-native-palette';
import {rgbaToHex, hexToName} from '../components/RgbaToHex';
import * as RNFS from 'react-native-fs';

class ColorScreen extends React.Component {

    constructor() {
        super();
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    state = {
        modalVisible: false,
        paletteInfo: {color: '#000'},
        image: '',
        mainHex: [
            'FF0000',
            '0000FF',
            '00FFOO',
            '800080',
            'FFA500',
            'FFC0CB',
            'A52A2A',
            'FFFF00',
            '000000',
            'FFFFFF',
            '808080',
        ],
    };

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };

    render() {
        const {paletteInfo, modalVisible, image} = this.state;
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
                <PaletteButton action={this.takePicture.bind(this)}/>
                <ModalPalette paletteInfo={paletteInfo} image={image} setModalVisible={this.setModalVisible}
                              modalVisible={modalVisible}/>
            </View>
        );
    };

    verifyColorParent = (hex) => {
        let hexVars = this.state.mainHex;
        let mainHex = '', percentage = 0;
        hexVars.forEach(color => {
            let r1 = parseInt(color.substring(0, 2), 16),
                g1 = parseInt(color.substring(2, 4), 16),
                b1 = parseInt(color.substring(4, 6), 16),
                r2 = parseInt(hex.substring(0, 2), 16),
                g2 = parseInt(hex.substring(2, 4), 16),
                b2 = parseInt(hex.substring(4, 6), 16);

            let red = 255 - Math.abs(r1 - r2), green = 255 - Math.abs(g1 - g2),
                blue = 255 - Math.abs(b1 - b2);

            red /= 255;
            green /= 255;
            blue /= 255;

            if (percentage < (red + green + blue) / 3) {
                percentage = (red + green + blue) / 3;
                mainHex = color;
            }
        });
        return mainHex;
    };


    getColors = (path) => {
        getAllSwatches({}, path, (error, swatches) => {
            if (error) {
                console.warn('error: ', error);
            } else {
                swatches.sort((a, b) => {
                    return b.population - a.population;
                });
                let dominant = 0;
                swatches.forEach(swatch => {
                    if (dominant < swatch.population) {
                        dominant = swatch.population;
                        let color = this.verifyColorParent(rgbaToHex(swatch.color));
                        console.log(color);
                        hexToName(color).then(resp => {
                            this.setState({
                                paletteInfo: {dominant: rgbaToHex(swatch.color), closestName: resp.value},
                            });
                        });
                    }
                });
            }
        });
    };

    saveColors = () => {
        let path = RNFS.DocumentDirectoryPath + '/palettes.json';
        RNFS.write(path, JSON.stringify(this.state.paletteInfo), -1, 'utf8')
            .then((success) => {
                console.log('saved');
            }).catch((err) => {
            console.log(err.message);
        });
    };

    takePicture = async () => {
        if (this.camera) {
            const options = {quality: 0.5, base64: true};
            const data = await this.camera.takePictureAsync(options);
            let uri = data.uri;
            this.setState({image: uri.replace('file:///', '')});
        }
        this.getColors(this.state.image);
        this.setModalVisible(true);
        this.saveColors();
    };
}

export default ColorScreen;
