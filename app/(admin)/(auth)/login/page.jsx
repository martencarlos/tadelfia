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
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
    setLoggingIn(false);
  }, [params]);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [router, session.status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { redirect:false,
      email,
      password,
    }).then((res) => {
      console.log(res);
      if (res.error) {
        setError(res.error);
        setLoggingIn(false);
      } else {
        router.push("/dashboard");
      }
    });
  };

  return session.status === "loading" ? (
    <Loading />
  ) : (
    session.status === "unauthenticated" && (
      <div className={styles.loginPage}>
        
        <h1 className={styles.title}>{ "Admin login"}</h1>
       
        <br />
        {success && <p className={styles.success}>{success}</p>}
        {error && <p className={styles.error}>{error}</p>}
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
          <button className={styles.loginButton}>
            {loggingIn ? "Logging in..." : "Login"}
          </button>
          
        </form>
      </div>
    )
  );
};

export default Login;
