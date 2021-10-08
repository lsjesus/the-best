import {BrowserRouter, Switch,  Route} from 'react-router-dom'
import Main from '../components/Main'
import Avaliations from '../components/Avaliations'
import BestMovies from '../components/BestMovies'
const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Main} exact/>
                <Route path='/app' component={Avaliations}/>
                <Route path='/best' component={BestMovies}/>
            </Switch>
        </BrowserRouter>
    )}
export default Routes