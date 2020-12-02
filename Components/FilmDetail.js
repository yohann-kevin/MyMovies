import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';

class FilmDetail extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        film: undefined,
        isLoading: true
      }
    }
  
    componentDidMount() {
      getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false
        })
      })
    }
  
    _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }

    _toggleFavorite() {
      const action = { type: 'TOGGLE_FAVORITE', value: this.state.film }
      this.props.dispatch(action)
    }

    componentDidUpdate() {
      console.log(this.props.favoritesFilm);
    }

    _displayFavoriteImage() {
      let sourceImage = require('../Images/notFavorite.png')
      if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
        sourceImage = require('../Images/favorite.png')
      }
      return (
        <Image source={sourceImage} style={styles.favoriteImage}/>
      )
    }
  
    _displayFilm() {
      const { film } = this.state
      if (film != undefined) {
        return (
          <ScrollView style={styles.scrollviewContainer}>
            <Image
              style={styles.image}
              source={{uri: getImageFromApi(film.backdrop_path)}}
            />
            <Text style={styles.titleText}>{film.title}</Text>
            <TouchableOpacity style={styles.favoriteContainer} onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            <Text style={styles.descriptionText}>{film.overview}</Text>
            <Text style={styles.defaultText}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
            <Text style={styles.defaultText}>Note : {film.vote_average} / 10</Text>
            <Text style={styles.defaultText}>Nombre de votes : {film.vote_count}</Text>
            <Text style={styles.defaultText}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
            <Text style={styles.defaultText}>Genre(s) : {film.genres.map(function(genre){
                return genre.name;
              }).join(" / ")}
            </Text>
            <Text style={styles.defaultText}>Companie(s) : {film.production_companies.map(function(company){
                return company.name;
              }).join(" / ")}
            </Text>
          </ScrollView>
        )
      }
    }
    
    render() {
      return (
        <View style={styles.mainContainer}>
          {this._displayLoading()}
          {this._displayFilm()}
        </View>
      )
    }
  }

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#36393f"
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollviewContainer: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#ffffff',
    textAlign: 'center'
  },
  descriptionText: {
    fontStyle: 'italic',
    color: '#efefef',
    margin: 5,
    marginBottom: 15
  },
  defaultText: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    color: '#efefef'
  },
  favoriteContainer: {
    alignItems: 'center'
  },
  favoriteImage: {
    width: 40,
    height: 40
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)