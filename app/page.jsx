
import Gallery from '@/components/landing/gallery/gallery'
import styles from './page.module.css'
import LandingPage from '@/components/landing/landingPage/landingPage'
import OurStory from '@/components/landing/ourStory/ourStory'
import Welcome from '@/components/landing/welcome/welcome'
import FullAvailability from '@/components/landing/fullAvailability/fullAvailability'


export default function Home() {
  return (
    <div className={styles.homePage}>
      
      <LandingPage />
      <Welcome />
      <FullAvailability />
      <Gallery />
      <OurStory />
    
    </div>
  )
}
