import Posts from "@/components/posts/posts";
import styles from "./page.module.css";

export const revalidate = 10 // WORKS - need to be on page.jsx or Layout.jsxr evalidate this segment every 60 seconds

// Static metadata
export const metadata = {
  title: "CMS", description: "Blog - wordpress integration" 
}

export default async function Blog() {
  
  return (
    <div className={styles.blog}>
      <Posts />
    </div>
  );
}
