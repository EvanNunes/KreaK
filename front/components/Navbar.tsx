import Link from 'next/link'
import styles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        KreaK
      </Link>
      <ul className={styles.links}>
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/catalogue">Boutique</Link></li>
      </ul>
    </nav>
  )
}
