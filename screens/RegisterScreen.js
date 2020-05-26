import * as React from 'react';
import {Text, View} from 'react-native';
import * as RNFS from 'react-native-fs';
//import { List, ListItem } from 'react-native-elements'

class RegisterScreen extends React.Component{
    constructor() {
        super();
        this.state.register = [ JSON.parse(this.getRegister()) ]
    }

    state = {
        register: []
    }

    getRegister = () => {
        let path = RNFS.DocumentDirectoryPath + '/palette.json';
        RNFS.readFile(path, 'utf8')
            .then((contents) => {
                console.log(contents);
                return contents;
            }).catch((err) => {
            console.log(err.message);
        });
    };

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Register Screen!</Text>
            </View>
        );
    }
}

export default RegisterScreen;
