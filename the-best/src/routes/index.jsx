import {BrowserRouter, Switch,  Route} from 'react-router-dom'
import Main from '../components/Main'
import Avaliations from '../components/Avaliations'
const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Main} exact/>
                <Route path='/app' component={Avaliations}/>
            </Switch>
        </BrowserRouter>
    )}
export default Routes