import React from 'react';
import { StyleSheet, ActivityIndicator, View, Button, FlatList, TextInput} from 'react-native';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import { connect } from 'react-redux';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.page = 0;
        this.totalPages = 0;
        this.searchedText = "";
        this.state = { 
            films: [],
            isLoading: false
        }
    }

    _loadFilms() {
        
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({ 
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
            }  
        )}
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

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: [],
        }, () => {
           this._loadFilms() 
        })
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render() {
        return (
            <View style={ styles.view }>
                <TextInput 
                    onSubmitEditing={() => this._searchFilms()} 
                    onChangeText={(text) => this._searchTextInputChanged(text)} 
                    placeholder="Titre du film" 
                    style={ styles.TextInput } 
                    placeholderTextColor={"#efefef"}
                />
                <Button 
                    title="Rechercher" 
                    onPress={() => this._searchFilms()} 
                    style={ styles.button } 
                />
                <FlatList
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                        <FilmItem
                        film={item}
                        isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        displayDetailForFilm={this._displayDetailForFilm}
                        />
                    }
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) { 
                            this._loadFilms()
                        }
                    }}
                    />
                {this._displayLoading()}
            </View>
        )
    };
}

const styles = StyleSheet.create ({
    view: {
        flex: 1,
        backgroundColor: '#36393f',
        color: '#ffffff'
    },  
    TextInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        border: 'none',
        borderWidth: 1,
        paddingLeft: 5,
        color: '#ffffff'
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

const mapStateToProps = state => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  
  export default connect(mapStateToProps)(Search)