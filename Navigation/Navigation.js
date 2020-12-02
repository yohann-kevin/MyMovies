import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';

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

export default createAppContainer(SearchStackNavigator);