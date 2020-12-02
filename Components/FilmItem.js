import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { color } from 'react-native-reanimated';
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {
  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      return (
        <Image
          style={styles.favoriteImage}
          source={require('../Images/favorite.png')}
        />
      )
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props;
    return (
      <TouchableOpacity onPress={() => displayDetailForFilm(film.id)} style={styles.mainContainer}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            {this._displayFavoriteImage()}
            <Text style={styles.titleText}>{film.title}</Text>
            <Text style={styles.voteText}>{film.vote_average}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Sortie le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  contentContainer: {
    flex: 1,
    margin: 5
  },
  headerContainer: {
    flex: 3,
    flexDirection: 'row'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    color: '#ffffff'
  },
  voteText: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#efefef'
  },
  descriptionContainer: {
    flex: 7
  },
  descriptionText: {
    fontStyle: 'italic',
    color: '#efefef'
  },
  dateContainer: {
    flex: 1
  },
  dateText: {
    textAlign: 'right',
    fontSize: 14,
    color: '#efefef'
  },
  favoriteImage: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default FilmItem