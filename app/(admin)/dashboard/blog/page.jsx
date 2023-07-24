import Posts from "@/components/posts/posts";
import styles from "./page.module.css";

export default async function Blog() {
  
  return (
    <div className={styles.blog}>
      <Posts />
    </div>
  );
}
// 