import {MdClose} from 'react-icons/md'
function Overview(){
    return(
        <section className="container-overview">
            <div className="overview-content">
                <div className="header-overview">
                    <h1 className='overview-title'>Titanic</h1>
                    <MdClose className='icon-close'/>
                </div>
                <div className="overview-display">
                    <img src="https://image.tmdb.org/t/p/w500/6VmFqApQRyZZzmiGOQq2C92jyvH.jpg" alt="Movie Logo" className='overview-img'/>
                    <p className="overview">Jack Dawson é um aventureiro que ganha nas cartas bilhetes para a viagem inaugural do transatlântico Titanic, rumo a Nova Iorque. Tido por inafundável, era o maior e mais luxuoso navio do mundo, e a viagem reunia milhares de migrantes cheios de esperança e, também, a nata da sociedade da época. Ali, Jack conhece Rose DeWitt Bukater, uma jovem rica mas infeliz, noiva de um homem que não ama, e que vai apaixonar-se por ele. A situação fica ainda mais complicada quando o Titanic colide com um icebergue e começa a afundar-se.</p>
                </div>
            </div>
    </section>
    )
}
export default Overview