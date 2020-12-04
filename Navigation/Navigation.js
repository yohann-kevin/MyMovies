import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorite from '../Components/Favorite';

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher",
            headerStyle: {
                backgroundColor: "#2f3136"
            },
            headerTitleStyle: {
                color: '#ffffff'
            }
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#2f3136"
            },
            headerTitleStyle: {
                color: '#ffffff'
            }
        }
    }
});

const MoviesTabNavigator = createBottomTabNavigator;

// export default TabNavigator({
//     Home: { screen: HomeScreen },
//     Settings: { screen: SettingsScreen },
// })

export default createAppContainer(SearchStackNavigator);