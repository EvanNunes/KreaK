'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../page.module.scss'

type Product = {
  id: number
  name: string
  description: string | null
  price: number
  category: string
  imageUrl: string | null
}

export default function CataloguePage() {
  const [products,setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<string>("tous");


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error('Erreur API:', err))
  }, [])


  const categorys = ['tous', ...new Set(products.map(x => x.category))]


  function SelectCategory(categ : string){
     setCategory(categ)
  }

  return (
    <>

      <section className={styles.apercu} id="apercu">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Toutes les créations</h2>
            <div className={styles.divider} />
          </div>


          {categorys.length !== 0 && (
              < div className={styles.filterBar}>
                {categorys.map(cat => (
                    <button
                        key={cat}
                        onClick={() => SelectCategory(cat)}
                        className={`${styles.filterChip} ${category === cat ? styles.active : ''}`}
                    >
                      {cat}
                    </button>
                ))}
              </div>
          )}

          {products.length === 0 ? (
              <div className={styles.skeletonGrid}>
                {[1, 2, 3].map(i => (
                    <div key={i} className={styles.skeleton}/>
                ))}
              </div>
          ) : (
              <div className={styles.productsGrid}>
                {products.filter(x => category === 'tous' || x.category === category).map(product => (
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
