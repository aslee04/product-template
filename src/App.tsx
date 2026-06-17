import { PRODUCTS } from './data/products'
import { useComparison } from './hooks/useComparison'
import { ProductCard } from './components/ProductCard'
import { ComparisonTable } from './components/ComparisonTable'
import styles from './App.module.css'

const MAX = 3

export function App() {
  const { selected, toggle, remove, clear, isSelected, isFull } = useComparison(
    PRODUCTS.map((p) => p.id),
  )

  const selectedProducts = selected
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean as unknown as <T>(x: T | undefined) => x is T)

  const slotsLeft = MAX - selected.length

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Compare laptops</h1>
          <p className={styles.subtitle}>Select up to {MAX} models to compare side by side</p>
        </header>

        <section aria-label="Product catalog">
          <div className={styles.catalog}>
            {PRODUCTS.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                selected={isSelected(p.id)}
                disabled={isFull && !isSelected(p.id)}
                onToggle={toggle}
              />
            ))}
          </div>
          <p className={styles.hint} aria-live="polite">
            {selected.length === 0
              ? null
              : slotsLeft > 0
                ? `${slotsLeft} more slot${slotsLeft > 1 ? 's' : ''} available`
                : 'Maximum 3 products selected'}
          </p>
        </section>

        <section className={styles.compareSection} aria-label="Comparison table">
          <div className={styles.compareHeader}>
            <h2 className={styles.compareTitle}>Comparison</h2>
            {selected.length > 0 && (
              <button className={styles.clearBtn} onClick={clear}>
                Clear all
              </button>
            )}
          </div>
          <ComparisonTable products={selectedProducts} onRemove={remove} />
        </section>
      </div>
    </div>
  )
}
