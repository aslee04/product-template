import type { Product, SpecKey } from '../types'
import { SPEC_LABELS } from '../types'
import styles from './ComparisonTable.module.css'

interface Props {
  products: Product[]
  onRemove: (id: string) => void
}

const SPEC_KEYS = Object.keys(SPEC_LABELS) as SpecKey[]

function isDifferent(products: Product[], key: SpecKey): boolean {
  if (products.length < 2) return false
  const first = products[0].specs[key]
  return products.some((p) => p.specs[key] !== first)
}

function renderValue(value: string): React.ReactNode {
  if (value === 'Yes') return <span className={styles.badgeYes}>Yes</span>
  if (value === 'No') return <span className={styles.badgeNo}>No</span>
  return value
}

export function ComparisonTable({ products, onRemove }: Props) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>⇄</span>
        Select products above to start comparing
      </div>
    )
  }

  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <colgroup>
          <col style={{ width: '18%' }} />
          {products.map((p) => (
            <col key={p.id} style={{ width: `${Math.floor(82 / products.length)}%` }} />
          ))}
        </colgroup>

        <thead>
          <tr className={styles.headerRow}>
            <th />
            {products.map((p) => (
              <th key={p.id} className={styles.productHeader}>
                <div className={styles.productHeaderInner}>
                  <div className={styles.productHeaderTop}>
                    <span className={styles.productName}>{p.name}</span>
                  </div>
                  <span className={styles.productPrice}>${p.price.toLocaleString()}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {SPEC_KEYS.map((key) => {
            const diff = isDifferent(products, key)
            return (
              <tr key={key} className={diff ? styles.diffRow : styles.row}>
                <td className={styles.specLabel}>{SPEC_LABELS[key]}</td>
                {products.map((p) => (
                  <td key={p.id} className={styles.specValue}>
                    {renderValue(p.specs[key])}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
