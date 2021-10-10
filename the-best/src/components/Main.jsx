import {MdLocalMovies} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'
import {MdClose} from 'react-icons/md'
import {IoMdTrash} from 'react-icons/io'
import { useEffect, useState } from "react"
import GetMovie from './Main'
import {Link} from 'react-router-dom'
const cards = document.querySelector('#cards')
var movieList = []
var infos = []
var index = 0
function Main(){
    const [movie, setMovie] = useState('')
    var [results, setResults] = useState({})
    useEffect(()=>{getSheet()}, [])
    function getSheet(){
        var list = localStorage.getItem('movielist')  
        if (list!=null && list!=''){
            movieList = list.split(',')
            for(var i = 0; i < movieList.length; i++){
                const items = localStorage.getItem(movieList[i])
                var div = JSON.parse(items)
                
                const card = document.createElement('div')
                card.classList.add('card')
                card.innerHTML = `            
                <p class="click-display" onclick=openOverview(this) id=${index}><i id=${index} class="fas fa-trash" onclick=remove(this)></i>Sinopse</p>
                <p class='popularity' id=${div.vote_average}>${div.vote_average}</p>
                <h1 class='movie-title'>${div.title}</h1>
                <img src=${`https://image.tmdb.org/t/p/w500${div.poster_path}`}    alt="Poster do Filme" class='poster' />
                <h2 class='year'>${div.year}</h2>
                
                `
                cards.appendChild(card)
                index ++
            }
        }
        else{
            return
        }}
    async function GetMovie(movie){
      
      const api_key = 'd18a4f16ec6506238fafbda0ee9d740d'
      const response= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movie}&language=pt-br`)
      const data = await response.json()
      var {results} = data
      const {backdrop_path, overview, vote_average, poster_path, release_date, title, id} = results[0]
      console.log(id)
      const date = release_date.split('-')
      const year = date[0]
      const video_response = await fetch (`
      https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`)
      const video_data = await video_response.json()
      var {results} = video_data
      const {key} = results[0]
      setResults({backdrop_path, overview, vote_average, poster_path,year, title, id})
      BuildCard({backdrop_path, overview, vote_average, poster_path,year, title})
      Keep({backdrop_path, overview, vote_average, poster_path,year, title, key})  
      
    //   document.body.animate(setTimeout(window.scrollTo(0, document.body.scrollHeight), 1000), 500)
    }
    function BuildCard({backdrop_path, overview, vote_average, poster_path,year, title}){
        results = {backdrop_path, overview, vote_average, poster_path,year, title}
        
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `            
        <p class="click-display" onclick='openOverview(this)' id=${index}><i id=${index} class="fas fa-trash" onclick=remove(this)></i>Sinopse</p>
        <p class='popularity' id=${results.vote_average}>${results.vote_average}</p>
        <h1 class='movie-title'>${results.title}</h1>
        <img src=${`https://image.tmdb.org/t/p/w500${results.poster_path}`}    alt="Poster do Filme" class='poster' />
        <h2 class='year'>${results.year}</h2>
        
        `
        cards.appendChild(card)
        index ++
    }
    function Keep({backdrop_path, overview, vote_average, poster_path,year, title, key}){
        infos = {title: title,  backdrop_path: backdrop_path, vote_average: vote_average, poster_path: poster_path,year: year, overview: overview, key:key}
        movieList.push(title)
        localStorage.setItem('movielist', movieList)
        localStorage.setItem(title, JSON.stringify(infos))
    }
    function refreshPage(){ 
        setTimeout(()=>{document.location.reload(true)}, 1000); 
    }
    return(
    <div className="container">
        <header className='header'>
            <h1 className='principal-title'>The Best<MdLocalMovies className='movie-icon'/></h1>
            <nav className='navigation'>
                <ul className='menu'>
                    <Link to='/app' className='link-menu' onClick={refreshPage}>
                        <li className='menu-item'>Melhores avaliações</li>
                    </Link>
                    <Link to='' className='link-menu'>
                        <li className='menu-item'>Drama</li>
                    </Link>
                    <Link to='/' className='link-menu' onClick={refreshPage}>
                        <li className='menu-item'>Procure por um filme</li>
                    </Link>
                    <Link to='/family' className='link-menu' onClick={refreshPage}>
                        <li className='menu-item'>Para a família toda</li>
                    </Link>
                    <Link to='/best' className='link-menu' onClick={refreshPage}>
                        <li className='menu-item'>Meus best movies</li>
                    </Link>
                </ul>
            </nav>
            <form className="search-container" onSubmit={(event)=>{
                event.preventDefault()
                GetMovie(movie)
                }}><input type="text" placeholder='Digite aqui um filme legal' className='search-input' onKeyUp={(event)=>{setMovie(event.target.value)
            
            }} /><input type='submit'  className='submit-btn' value=''/><FaSearch className='search-icon' onClick={()=>{
                GetMovie(movie)
                }}></FaSearch></form>
        </header>
        <section className="container-overview">
            <div className="overview-content">
                <div className="header-overview">
                    <h1 className='overview-title'>{results.title}</h1>
                    <MdClose className='icon-close' onclick='closeOverview()'/>
                </div>
                <div className="overview-display">
                    <img src={`https://image.tmdb.org/t/p/w500${results.backdrop_path}`} alt="Movie Logo" className='overview-img'/>
                    <p className="overview">{results.overview}</p>
                </div>
            </div>
        </section>

    </div>
    )
}
export default Main
