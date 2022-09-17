import { Link } from 'react-router-dom'
import './header.css'


function Header(){
    return(
        <header>
            <Link to='/' className='logo'>Film Flix</Link>
            <Link to='/favoritos' className='favoritos'>My Films</Link>
        </header>
    )

}


export default Header