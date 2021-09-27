import {MdLocalMovies} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'
import {MdClose} from 'react-icons/md'
import { useEffect, useState } from "react"
import GetMovie from './Main'
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
                <p class="click-display" onclick=openOverview(this) id=${index}>Sinopse</p>
                <p class='popularity' id=${div.popularity}>${Math.floor(div.popularity)}</p>
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
      const {results} = data
      const {backdrop_path, overview, popularity, poster_path, release_date, title} = results[0]
      const date = release_date.split('-')
      const year = date[0]
      setResults({backdrop_path, overview, popularity, poster_path,year, title})
      BuildCard({backdrop_path, overview, popularity, poster_path,year, title})
      Keep({backdrop_path, overview, popularity, poster_path,year, title})  
      
    }
    function BuildCard({backdrop_path, overview, popularity, poster_path,year, title}){
        results = {backdrop_path, overview, popularity, poster_path,year, title}
        
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `            
        <p class="click-display" onclick='openOverview(this)' id=${index}>Sinopse</p>
        <p class='popularity' id=${results.popularity}>${Math.floor(results.popularity)}</p>
        <h1 class='movie-title'>${results.title}</h1>
        <img src=${`https://image.tmdb.org/t/p/w500${results.poster_path}`}    alt="Poster do Filme" class='poster' />
        <h2 class='year'>${results.year}</h2>
        
        `
        cards.appendChild(card)
        index ++
    }
    function Keep({backdrop_path, overview, popularity, poster_path,year, title}){
        infos = {title: title,  backdrop_path: backdrop_path, popularity: popularity, poster_path: poster_path,year: year, overview: overview}
        movieList.push(title)
        localStorage.setItem('movielist', movieList)
        localStorage.setItem(title, JSON.stringify(infos))
    }
    
    return(
    <div className="container">
        <header className='header'>
            <h1 className='principal-title'>The Best<MdLocalMovies className='movie-icon'/></h1>
            <div className="search-container"><input type="text" className='search-input' onKeyUp={(event)=>{setMovie(event.target.value)
            
            }} /><FaSearch className='search-icon' onClick={()=>{
                GetMovie(movie)
                
                }} /><input type="submit" className='submit' /></div>
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