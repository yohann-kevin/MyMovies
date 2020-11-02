import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput} from 'react-native';
// import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            films: [],
        }
        this.searchedText = "";
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => this.setState({ films: data.results }))
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text;
    }

    render() {
        return (
            <View style={ styles.view }>
                <TextInput onChangeText={(text) => this._searchTextInputChanged(text)} placeholder="Titre du film" style={ styles.TextInput } />
                <Button title="Rechercher" onPress={() => this._loadFilms()} style={ styles.button } />
                <FlatList data={this.state.films} keyExtractor={(item) => item.id.toString() } renderItem={({item}) => <FilmItem film={item}/>} />
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