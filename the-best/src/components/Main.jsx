import {MdLocalMovies} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'
import {MdClose} from 'react-icons/md'
import { useEffect, useState } from "react"
import GetMovie from './Main'
const cards = document.querySelector('#cards')

function Main(){
    const [movie, setMovie] = useState('')
    var [results, setResults] = useState({})
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
    
      
    }
    function BuildCard({backdrop_path, overview, popularity, poster_path,year, title}){
        results = {backdrop_path, overview, popularity, poster_path,year, title}
        console.log(results)
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `            
        <p class="click-display" onclick='openOverview()'>Sinopse</p>
        <p class='popularity' id=${results.popularity}>${Math.floor(results.popularity)}</p>
        <h1 class='movie-title'>${results.title}</h1>
        <img src=${`https://image.tmdb.org/t/p/w500${results.poster_path}`}    alt="Poster do Filme" class='poster' />
        <h2 class='year'>${results.year}</h2>
        
        `
        cards.appendChild(card)
    }
    
    return(
    <div className="container">
        <header className='header'>
            <h1 className='principal-title'>The Best<MdLocalMovies className='movie-icon'/></h1>
            <div className="search-container"><input type="text" className='search-input' onKeyUp={(event)=>{setMovie(event.target.value)
            console.log(movie)
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