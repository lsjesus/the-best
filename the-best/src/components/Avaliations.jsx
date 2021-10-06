import { useEffect, useState } from "react"
import {MdLocalMovies, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdClose} from 'react-icons/md'
import {BiArrowBack} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
var index = 0
var movieList = []
var infos = []
function Avaliations(){
    const cards = document.querySelector('#cards')
    const [refresh, setRefresh] = useState('')
    cards.innerHTML = ''
    useEffect(()=>{getSheet()}, [])
    function getSheet(){
        var list = localStorage.getItem('movielist-2')  
        if (list!=null && list!=''){
            movieList = list.split(',')
            for(var i = 0; i < movieList.length; i++){
                const items = localStorage.getItem(movieList[i])
                var div = JSON.parse(items)
               
                const card = document.createElement('div')
                card.classList.add('card')
                card.innerHTML = `            
                <p class="click-display" onclick=openOverview2(this) id=${index}>Sinopse</p>
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
    async function GetMovie(){
        const api_key = 'd18a4f16ec6506238fafbda0ee9d740d'
        const response= await fetch(`http://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=${api_key}`)
        const data = await response.json()
        const {results} = data
        console.log(results)
        for(var i= 0;i<results.length;i++){
            var {backdrop_path, overview, vote_average, poster_path, release_date, title} = results[i]
            if (title === '"And So, It Goes"'){
                continue
            }
            Keep({backdrop_path, overview, vote_average, poster_path, title})
            getSheet()
        }
        // const {backdrop_path, overview, vote_average, poster_path, release_date, title} = results[0]
        // const date = release_date.split('-')
        // const year = date[0]
        // setResults({backdrop_path, overview, vote_average, poster_path,year, title})
        // BuildCard({backdrop_path, overview, vote_average, poster_path,year, title})
    }
    function BuildCard({backdrop_path, overview, vote_average, poster_path,year, title}){
        var results = {backdrop_path, overview, vote_average, poster_path, title}
        
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `            
        <p class="click-display" onclick='openOverview(this)' id=${index}>Sinopse</p>
        <p class='popularity' id=${results.vote_average}>${results.vote_average}</p>
        <h1 class='movie-title'>${results.title}</h1>
        <img src=${`https://image.tmdb.org/t/p/w500${results.poster_path}`}    alt="Poster do Filme" class='poster' />
       
        
        `
        cards.appendChild(card)
        index ++
    }
    function Keep({backdrop_path, overview, vote_average, poster_path,year, title}){
        infos = {title: title,  backdrop_path: backdrop_path, vote_average: vote_average, poster_path: poster_path,year: year, overview: overview}
        movieList.push(title)
        localStorage.setItem('movielist-2', movieList)
        localStorage.setItem(title, JSON.stringify(infos))
    }
    useEffect(()=>{if (movieList.length === 0){
        GetMovie()
    }}, [])
    console.log(movieList)
    function refreshPage(){ 
        setTimeout(()=>{document.location.reload(true)}, 1); 
    }
    return(
        <div className='container'>
            <header className='header' style={{marginBottom: 80}}>
                <h1 className='principal-title'>The Best<MdLocalMovies className='movie-icon'/></h1>
                <Link onClick={ refreshPage } to='/'  >
                    <BiArrowBack size={50} className='back-icon' />
                </Link>
                
                <nav className='navigation'>
                    <ul className='menu'>
                        <Link to='/app' className='link-menu' >
                            <li className='menu-item'>Melhores avaliações</li>
                        </Link>
                        <Link to='' className='link-menu'>
                            <li className='menu-item'>Drama</li>
                        </Link>
                        <Link to='/' onClick={ refreshPage } className='link-menu'>
                            <li className='menu-item'>Procure por um filme</li>
                        </Link>
                        <Link to='' className='link-menu'>
                            <li className='menu-item'>Para a família toda</li>
                        </Link>
                        <Link to='' className='link-menu'>
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
export default Avaliations
