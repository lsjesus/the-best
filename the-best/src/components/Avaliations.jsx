import { useEffect, useState } from "react"
import {MdLocalMovies, MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import {Link} from 'react-router-dom'
var index = 0
function Avaliations(){
    const cards = document.querySelector('#cards')
    cards.innerHTML = ''
    async function GetMovie(){
        const api_key = 'd18a4f16ec6506238fafbda0ee9d740d'
        const response= await fetch(`http://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=${api_key}&language=pt-br`)
        const data = await response.json()
        const {results} = data
        console.log(results)
        for(var i= 0;i<results.length;i++){
            var {backdrop_path, overview, vote_average, poster_path, release_date, title} = results[i]
            BuildCard({backdrop_path, overview, vote_average, poster_path, title})
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
        <p class="click-display" onclick='openOverview(this)' id=${index}><i id=${index} class="fas fa-trash" onclick=remove(this)></i>Sinopse</p>
        <p class='popularity' id=${results.vote_average}>${results.vote_average}</p>
        <h1 class='movie-title'>${results.title}</h1>
        <img src=${`https://image.tmdb.org/t/p/w500${results.poster_path}`}    alt="Poster do Filme" class='poster' />
       
        
        `
        cards.appendChild(card)
        index ++
    }
    useEffect(()=>{GetMovie()}, [])
    return(
        <header className='header' style={{marginBottom: 80}}>
            <h1 className='principal-title'>The Best<MdLocalMovies className='movie-icon'/></h1>
            <Link>
                <p className="back"> <MdKeyboardArrowLeft size={20} className='back-icon' />Voltar</p>
            </Link>
            <nav className='navigation'>
                <ul className='menu'>
                    <Link to='/app' className='link-menu' refresh='true'>
                        <li className='menu-item'>Melhores avaliações</li>
                    </Link>
                    <Link to='' className='link-menu'>
                        <li className='menu-item'>Drama</li>
                    </Link>
                    <Link to='' className='link-menu'>
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
    )
}
export default Avaliations