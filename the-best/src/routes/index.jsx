import {BrowserRouter, Switch,  Route} from 'react-router-dom'
import Main from '../components/Main'
import Avaliations from '../components/Avaliations'
import BestMovies from '../components/BestMovies'
import Family from '../components/Family'
const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Main} exact/>
                <Route path='/app' component={Avaliations}/>
                <Route path='/best' component={BestMovies}/>
                <Route path='/family' component={Family}/>
            </Switch>
        </BrowserRouter>
    )}
export default Routes