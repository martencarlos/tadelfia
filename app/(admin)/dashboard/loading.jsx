
import Loading from '@/components/loading/loading'
import styles from './loading.module.css'

function loading() {
  return (
    <div className={styles.loadingDashboardPages}>
      <Loading fallback= "Loading..."/>
    </div>
  )
}

export default loading