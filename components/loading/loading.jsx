
import styles from "./loading.module.css"


const Loading = ({fallback}) => {
  return (
      <div className={styles.loading}>
        <div className={styles.gifLoader}/>
        {fallback ? fallback : "Loading..."}
      </div>
  )
}

export default Loading
