import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { getFilmDetailFromApi } from '../API/TMDBApi';

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
  
    _displayFilm() {
      if (this.state.film != undefined) {
        return (
          <ScrollView style={styles.scrollviewContainer}>
            <Text>{this.state.film.title}</Text>
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
    ScrollViewContainer: {
        flex: 1,
        top:20
    }
})

export default FilmDetail;