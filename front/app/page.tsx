'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './page.module.scss'

type Product = {
  id: number
  name: string
  description: string | null
  price: number
  category: string
  imageUrl: string | null
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 3)))
      .catch(err => console.error('Erreur API:', err))
  }, [])

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Créations artisanales</span>
          <h1 className={styles.heroTitle}>
            Des objets du <em>quotidien</em><br />
            illustrés à la main
          </h1>
          <p className={styles.heroSubtitle}>
            Tasses, t-shirts, tote bags — chaque pièce est unique,
            dessinée avec intention et faite pour durer.
          </p>
          <div className={styles.heroActions}>
            <Link href="/catalogue" className={styles.btnPrimary}>
              Voir la boutique
            </Link>
            <Link href="#apercu" className={styles.btnOutline}>
              Découvrir
            </Link>
          </div>
        </div>

        <div className={styles.heroDecor} aria-hidden="true">
          <div className={styles.blob} />
        </div>
      </section>

      <section className={styles.apercu} id="apercu">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Dernières créations</span>
            <h2>Un avant-goût de la boutique</h2>
            <div className={styles.divider} />
          </div>

          {products.length === 0 ? (
            <div className={styles.skeletonGrid}>
              {[1, 2, 3].map(i => (
                <div key={i} className={styles.skeleton} />
              ))}
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {products.map(product => (
                <Link
                  key={product.id}
                  href={`/catalogue/${product.id}`}
                  className={styles.card}
                >
                  <div className={styles.cardImage}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className={styles.cardImagePlaceholder} />
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardCategory}>{product.category}</span>
                    <h3 className={styles.cardName}>{product.name}</h3>
                    <p className={styles.cardPrice}>{product.price} €</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className={styles.seeMore}>
            <Link href="/catalogue" className={styles.btnPrimary}>
              Voir toutes les créations
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.container}>
          {[
            { icon: '✦', title: 'Fait main', desc: 'Chaque illustration est dessinée à la main, aucune pièce n\'est identique.' },
            { icon: '◈', title: 'Matières durables', desc: 'Coton bio, céramique recyclée — des choix pensés pour l\'environnement.' },
            { icon: '❋', title: 'Livraison soignée', desc: 'Chaque commande est emballée avec soin dans un packaging recyclable.' },
          ].map((v, i) => (
            <div key={i} className={styles.valueItem}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
