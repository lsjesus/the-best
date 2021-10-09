import { useEffect, useState } from "react"
import {MdLocalMovies, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdClose} from 'react-icons/md'
import {BiArrowBack} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
var index = 0
var movieList = []
var infos = []
function BestMovies(){
    const cards = document.querySelector('#cards')
    const [refresh, setRefresh] = useState('')
    cards.innerHTML = ''
    useEffect(()=>{getSheet()}, [])
    function getSheet(){
        var list = localStorage.getItem('favlist')  
        console.log(list)
        if (list!=null && list!=''){
            movieList = list.split(',')
            for(var i = 0; i < movieList.length; i++){
                const items = localStorage.getItem(movieList[i])
                var div = JSON.parse(items)
               console.log(div)
                const card = document.createElement('div')
                card.classList.add('card')
                card.innerHTML = `            
                <p class="click-display" onclick=openOverview3(this) id=${index}>Sinopse</p>
                <p class='popularity' id=${div.vote_average}>${div.vote_average}</p>
                <h1 class='movie-title'>${div.title}</h1>
                <img src=${`https://image.tmdb.org/t/p/w500${div.poster_path}`}    alt="Poster do Filme" class='poster' />
                
                `
                cards.appendChild(card)
                index ++
            }
        }
        else{
            return
        }}
        function refreshPage(){ 
            setTimeout(()=>{document.location.reload(true)}, 1); 
        } 
        return(
            <div className='container'>
                <header className='header' style={{marginBottom: 80}}>
                    <h1 className='principal-title'>The Best<MdLocalMovies className='movie-icon'/></h1>
                    <Link  to='/'  onClick={refreshPage}>
                        <BiArrowBack size={50} className='back-icon' />
                    </Link>
                    
                    <nav className='navigation'>
                        <ul className='menu'>
                            <Link to='/app' className='link-menu' onClick={refreshPage} >
                                <li className='menu-item'>Melhores avaliações</li>
                            </Link>
                            <Link to='' className='link-menu'>
                                <li className='menu-item'>Drama</li>
                            </Link>
                            <Link to='/'  className='link-menu' onClick={refreshPage}>
                                <li className='menu-item'>Procure por um filme</li>
                            </Link>
                            <Link to='/family' className='link-menu' onClick={refreshPage}>
                                <li className='menu-item'>Para a família toda</li>
                            </Link>
                            <Link to='/best' className='link-menu'>
                                <li className='menu-item'>Meus best movies</li>
                            </Link>
                        </ul>
                    </nav>
                </header>
                <section className="container-overview">
                        <div className="overview-content">
                            <div className="header-overview">
                                
                                <h1 className='overview-title'></h1>
                                <MdClose className='icon-close' onclick='closeOverview()'/>
                            </div>
                            <div className="overview-display">
                                <img src={`https://image.tmdb.org/t/p/w500`} alt="Movie Logo" className='overview-img'/>
                                <p className="overview"></p>
                            </div>
                        </div>
                </section>
            </div>
    
        )
    }
export default BestMovies