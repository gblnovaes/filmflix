import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

import './favoritos.css';


function Favoritos(){
    const [filmes, setFilmes] = useState([])
    // const notify = () => toast("Wow so easy!");
    
    
  
    useEffect(() => {
        const minhaLista = localStorage.getItem("@filmFlix")
        
        setFilmes(JSON.parse(minhaLista) || [])
        // console.log(JSON.parse(minhaLista))
        
    }, []);
    
     function  excluirFilme(id) {
        let filtroFilme = filmes.filter((filme) => {
            return filme.id !== id
        })
        
        setFilmes(filtroFilme)
        
        localStorage.setItem("@filmFlix",JSON.stringify(filtroFilme))

         toast.success("Excluido com sucesso ")
       
     }
        return(
            <div className='meus-filmes'>
                <h1>Meus Filmes</h1>
                {filmes.length  > 0 ? <ul>
                    {filmes.map((filme) => {
                        return(
                            <li key={filme.id}>
                                <span>{filme.title}</span>
                                <div>
                                    <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                                    <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                                </div>
                            </li>
                        )
                    })}
                </ul> :  <div className='filme-not-found'><h1>Nenhum Filme Salvo nos Favoritos</h1></div> }  
                
               
            </div>
            
        )
       
          
    
}

export default Favoritos
