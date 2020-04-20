import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacityBase } from 'react-native';
import Expo from "expo";
import ExpoTHREE, {THREE} from "expo-three";   
import ExpoGraphics from "expo-graphics"


export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  onContextCreate = async ({gl, scale, width, height, arSession}) => {
     // initialize render
     this.renderer = ExpoTHREE.createRenderer({gl});
     this.renderer.setPixelRatio(scale);
     this.renderer.setSize(width, height);

     //inititalize scene
     this.scene  = new THREE.Scene();
     this.scene.background = ExpoTHREE.createARBackgroundTexture(arSession, this.renderer);

     // initialize camera
     this.camera = ExpoTHREE.createARCamera(arSession, width/scale, height/scale, 0.01, 1000);
  }

  render(){
    return(
      <ExpoGraphics.View styles={{flex:1}} 
        onContextCreate={this.onContextCreate}
        onRender={this.onRender} 
        arEnabled={true}/> 
    );
  }
}

const styles = StyleSheet.create({

});
