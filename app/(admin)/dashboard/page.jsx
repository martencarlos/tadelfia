
import Loading from '@/components/loading/loading'
import styles from './page.module.css'

// Static metadata
export const metadata = {
  title: "Dashboard", description: "Tadelfia Admin Dashboard" 
}

function Dashboard() {
  return (
    <div className={styles.dashboard} >
        <Loading />
    </div>
  )
}

export default Dashboard