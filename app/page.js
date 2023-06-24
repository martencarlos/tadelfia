
import styles from './page.module.css'
import LandingPage from '@/components/landing/landingPage/landingPage'
import Welcome from '@/components/landing/welcome/welcome'


export default function Home() {
  return (
    <div className={styles.homePage}>
      
      <LandingPage />

      <Welcome />
    
    </div>
  )
}
