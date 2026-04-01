'use client'

import React, { use, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './product.module.scss'

type Product = {
  id: number
  name: string
  description: string | null
  price: number
  category: string
  imageUrl: string | null
}

export default function ProduitPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(true)
  const { id } = use(params)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Erreur API:', err)
          setLoading(false)
        })
  }, [id])

  if (loading) {
    return (
        <div className={styles.loadingWrapper}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonLine} style={{ width: '40%' }} />
            <div className={styles.skeletonLine} style={{ width: '70%' }} />
            <div className={styles.skeletonLine} style={{ width: '30%' }} />
          </div>
        </div>
    )
  }

  if (!product) {
    return (
        <div className={styles.notFound}>
          <p>Produit introuvable.</p>
          <Link href="/catalogue" className={styles.backLink}>← Retour au catalogue</Link>
        </div>
    )
  }

  return (
      <>
        <div className={styles.breadcrumb}>
          <Link href="/">Accueil</Link>
          <span>/</span>
          <Link href="/catalogue">Boutique</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <section className={styles.productSection}>

          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              {product.imageUrl ? (
                  <img src={`/${product.imageUrl}`} alt={product.name} className={styles.productImage} />
              ) : (
                  <div className={styles.imagePlaceholder} />
              )}
            </div>
          </div>

          <div className={styles.infoCol}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.divider} />

            {product.description && (
                <p className={styles.description}>{product.description}</p>
            )}

            <p className={styles.price}>{product.price} €</p>

            <div className={styles.actions}>
              <button className={styles.btnPrimary}>
                Ajouter au panier
              </button>
              <Link href="/catalogue" className={styles.btnOutline}>
                ← Retour
              </Link>
            </div>

            <div className={styles.guarantees}>
              {[
                { icon: '✦', label: 'Fait main' },
                { icon: '◈', label: 'Matières durables' },
                { icon: '❋', label: 'Livraison soignée' },
              ].map((g, i) => (
                  <div key={i} className={styles.guaranteeItem}>
                    <span className={styles.guaranteeIcon}>{g.icon}</span>
                    <span>{g.label}</span>
                  </div>
              ))}
            </div>
          </div>

        </section>
      </>
  )
}