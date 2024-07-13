import styles from './header.module.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
export default function Header(){
    return(
        <header className={styles.container}>
            <Link to='/'>
            <img src={logo} alt="logo cripto app" />
            </Link>
        </header>
    )
}