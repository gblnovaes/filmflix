import api from '../../services/api'
import { useState,useEffect } from 'react'
import  {useParams,useNavigate}  from 'react-router-dom'
 
import './filme.css'

function Filme(){
    const {id} = useParams()
    const [filme,setFilme] = useState('')
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function getFilme() {
            await api.get(`/movie/${id}`, {
                    params : {
                        api_key: process.env.REACT_APP_DEV_MODE,
                        language: 'pt-br'
                    }
                }).then((response) =>{
                    console.log(response.data)
                    setFilme(response.data)
                    setLoading(false)
                }).catch((err) => {
                    console.log("Film not found " + err)
                    navigate('/',{replace:true})
                    return
                })
            }
         
        getFilme()
        
        
    },[id, navigate]);
    
    
    if(loading){
        return(
            <div className='filme-info'><h2>Carregando..</h2></div>
        )
    }
    
    function salvarFilme(){ 
        const meusFilmes = localStorage.getItem("@filmFlix")
        
        let filmesSalvos = JSON.parse(meusFilmes) || []
        
        let hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id )
        
        console.log(hasFilme)
        
        if(hasFilme){
            // console.log("Filme Ja existe.")
            return
        }
        
        filmesSalvos.push(filme)
        
        localStorage.setItem("@filmFlix",JSON.stringify(filmesSalvos))
        
        alert("Salvo com sucesso.")
        
        
    }
    
    
    return(
         
            <div className='filme-info'>
                <h1>{ filme.title } </h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
                <h3>Sinopse</h3>
                <span>{filme.overview}</span>
                <strong>Avaliação</strong>
                <span>{filme.vote_average} / 10</span>
                <div className='area-buttons'>
                    <button onClick={ salvarFilme }>Salvar</button>
                    <button><a target="blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${filme.title}`} >Trailer</a></button>
                </div>
            </div>
         
    )

}


export default Filme