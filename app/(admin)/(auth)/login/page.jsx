"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Loading from "@/components/loading/loading";

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [router, session.status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return session.status === "loading" ? (
    <Loading />
  ) : (
    session.status === "unauthenticated" && (
      <div className={styles.loginPage}>
        
        <h1 className={styles.title}>{ "Admin login"}</h1>
       
        <br />
        {success && <p className={styles.title}>{success}</p>}
        {error && <p className={styles.title}>{error}</p>}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            required
            className={styles.input}
            type="text"
            placeholder="email"
          />
          <input
            required
            className={styles.input}
            type="password"
            placeholder="password"
          />
          <br />
          <button className={styles.loginButton}>Login</button>
          
        </form>
      </div>
    )
  );
};

export default Login;
