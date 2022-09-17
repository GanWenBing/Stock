import {Link} from 'react-router-dom'

const Navbar = () =>{
    return(
    <nav className='pageBar'>
        <div>
        <Link to='/'>Go to Homepage </Link>
        </div>
        <div>
        <Link to='stock'>Stock</Link>
        </div>
        <div>
        <Link to='Fav'>Favourite</Link>
        </div>
        {/* <div>
        <Link to='Input'>Search</Link>
        </div> */}
        {/* <div>
        <Link to='Trading'> Trading</Link>
        </div> */}
        
    </nav>
    )

}

export default Navbar