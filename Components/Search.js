import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput} from 'react-native';
import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';

class Search extends React.Component {
    render() {
        return (
            <View style={ styles.view }>
                <TextInput placeholder="Titre du film" style={ styles.TextInput } />
                <Button title="Rechercher" onPress={() => {}} style={ styles.button } />
                {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
                <FlatList data={films} keyExtractor={(item) => item.id.toString() } renderItem={({item}) => <FilmItem/>} />
            </View>
        )
    };
}

const styles = StyleSheet.create ({
    view: {
        marginTop: 20,
        flex: 1,
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