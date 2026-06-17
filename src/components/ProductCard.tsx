import type { Product } from '../types'
import styles from './ProductCard.module.css'

interface Props {
  product: Product
  selected: boolean
  disabled: boolean
  onToggle: (id: string) => void
}

export function ProductCard({ product, selected, disabled, onToggle }: Props) {
  const handleClick = () => {
    if (!disabled) onToggle(product.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={[
        styles.card,
        selected ? styles.selected : '',
        disabled ? styles.disabled : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {selected && (
        <span className={styles.check} aria-hidden="true"></span>
      )}
      <div className={styles.name}>{product.name}</div>
      <div className={styles.price}>${product.price.toLocaleString()}</div>
    </div>
  )
}
