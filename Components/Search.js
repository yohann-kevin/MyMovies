import React from 'react';
import { StyleSheet, View, Button, TextInput} from 'react-native';

class Search extends React.Component {
    render() {
        return (
            <View style={ styles.view }>
                <TextInput placeholder="Titre du film" style={ styles.TextInput } />
                <Button title="Rechercher" onPress={() => {}} style={ styles.button } />
            </View>
        )
    };
}

const styles = StyleSheet.create ({
    view: {
        marginTop: 20,
        backgroundColor: "#36393f",
    },  
    TextInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: "white",
        borderWidth: 1,
        paddingLeft: 5
    },
    button: {
        height: 50,
    }
})

export default Search;