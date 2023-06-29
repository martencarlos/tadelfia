
"use client"

import { useEffect } from 'react';
import styles from './layout.module.css';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Loading from '@/components/Loading/Loading';

export default function DashboardLayout({children}) {

  const session = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
   
  }, [router,session.status])

  return (
    session.status === "loading" ? 
    <Loading/>
    :
    session.status === "authenticated" &&
    <div className={styles.dashboard}>
      {children}
    </div>
  );
}