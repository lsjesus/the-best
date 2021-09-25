import {MdLocalMovies} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'
import { useEffect, useState } from "react"
import Main from '../components/Main.jsx'
function Header(){
    const [movie, setMovie] = useState('')
    const [results, setResults] = useState({})
    async function GetMovie(movie){
      const api_key = 'd18a4f16ec6506238fafbda0ee9d740d'
      const response= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movie}&language=pt-br`)
      const data = await response.json()
      const {results} = data
      const {backdrop_path, overview, popularity, poster_path, release_date, title} = results[0]
      const date = release_date.split('-')
      const year = date[0]
      setResults({backdrop_path, overview, popularity, poster_path,year, title})
      useEffect(()=>{
          const cards = document.createElement('div')
          cards.classList.add('cards')        
    }, [])
    }
    return(
    <div className="container">
        <header className='header'>
            <h1 className='principal-title'>The Best<MdLocalMovies className='movie-icon'/></h1>
            <div className="search-container"><input type="text" className='search-input' onKeyUp={(event)=>{setMovie(event.target.value)
            console.log(movie)
            }} /><FaSearch className='search-icon' onClick={()=>{GetMovie(movie)}} /><input type="submit" className='submit' /></div>
        </header>
            <div className='card'>
                <p className="click-display">Sinopse</p>
                <div className="card-header">
                    <canvas className="avaliation" height='60px'></canvas>
                </div>
                <h1 className='movie-title'>{results.title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500${results.poster_path}`}    alt="Poster do Filme" className='poster' />
                <h2 className='year'>{results.year}</h2>
                <p className='popularity' id={results.popularity}>{Math.floor(results.popularity)}</p>
            </div>
        
    </div>
    )
}
export default Header