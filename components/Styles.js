import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  button: {
    width: 60,
    position: 'absolute',
    bottom: 20,
    height: 32,
    borderRadius: 100,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  camicon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  loadingStyle: {
    margin: 10,
  },
  pickerStyle: {
    width: width,
  },
  colorPalette: {
    flexDirection: 'row',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  swatcheStyle: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  color: {
    width: 50,
    height: 50,
  }
});
