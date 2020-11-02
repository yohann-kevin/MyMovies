import React from 'react';
import { StyleSheet, ActivityIndicator, View, Button, FlatList, TextInput} from 'react-native';
// import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            films: [],
            isLoading: false
        }
        this.searchedText = "";
    }

    _loadFilms() {
        this.setState({ isLoading: true })
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => 
                this.setState({ 
                    films: data.results,
                    isLoading: false
                })
            )
        }
    }

    _displayLoading() {
       if (this.state.isLoading) {
           return (
               <View style={styles.loadingContainer}>
                   <ActivityIndicator size="large" />
               </View>
           )
       }
    }
 
    _searchTextInputChanged(text) {
        this.searchedText = text;
    }

    render() {
        return (
            <View style={ styles.view }>
                <TextInput onSubmitEditing={() => this._loadFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} placeholder="Titre du film" style={ styles.TextInput } />
                <Button title="Rechercher" onPress={() => this._loadFilms()} style={ styles.button } />
                <FlatList data={this.state.films} keyExtractor={(item) => item.id.toString() } renderItem={({item}) => <FilmItem film={item}/>} />
                {this._displayLoading()}
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
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search;