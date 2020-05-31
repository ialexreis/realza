import * as React from 'react';
import {ScrollView, View} from 'react-native';
import * as RNFS from 'react-native-fs';
import { ListItem } from 'react-native-elements';

class RegisterScreen extends React.Component{
    constructor() {
        super();
    }

    state = {
        colors: []
    }

    componentDidMount = async () => {
        this.props.navigation.addListener('willFocus', async (payload) => {
            const value = await this.getRegister();
            if (!this._unmounted) {
                let valueParse = "[" + value.substring(0, value.length - 1) + "]";
                let colors = JSON.parse(valueParse);
                colors = colors.filter(function(item){
                    return item.closestName !== "";
                });
                this.setState({ colors: colors });
            }
        })
    };

    componentWillUnmount() {
        this._unmounted = true;
    }

    getRegister = async () => {
        let path = RNFS.DocumentDirectoryPath + '/palette.json';
        return await RNFS.readFile(path, 'utf8');
    };


    render() {
        return(
            <View>
                <ScrollView>
                {
                    this.state.colors.map((l, i) => (
                        <ListItem key={i} title={l.closestName} bottomDivider />
                    ))
                }
                </ScrollView>
            </View>
        );
    }
}

export default RegisterScreen;
