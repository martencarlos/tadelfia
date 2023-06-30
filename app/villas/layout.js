
import styles from './layout.module.css';

export default function VillasLayout({children}) {

  return (
    <div className={styles.villasLayoutFullPage}>
      {children}
    </div>
  );
}