import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.logo}>KreaK</p>
      <p className={styles.tagline}>Créations faites à la main, avec amour.</p>
      <p className={styles.copy}>© {new Date().getFullYear()} Karine — Tous droits réservés</p>
    </footer>
  )
}
