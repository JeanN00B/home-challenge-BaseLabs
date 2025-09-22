"use client";

import Button from "@mui/material/Button";
import LoginPage from "./login-form";
import RegisterPage from "./register-form";
import { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function MainAuthPage() {
  const [authForm, setAuthForm] = useState<"login" | "register">("login");

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-8 px-4">
      <div className="flex w-full max-w-md sm:max-w-lg flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">
            {authForm === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-gray-600">
            {authForm === "login"
              ? "Log in to manage your purchases and account settings."
              : "Register to start shopping and track your orders."}
          </p>
          <div className="pt-2">
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="auth toggle"
            >
              <Button
                size="large"
                sx={{
                  color: authForm === "login" ? "white" : "gray",
                  border:
                    authForm === "login"
                      ? "1px solid #16a34a"
                      : "1px solid #d1d5db",
                  backgroundColor: authForm === "login" ? "#16a34a" : "white",
                  "&:hover": {
                    backgroundColor:
                      authForm === "login" ? "#15803d" : "#f9fafb",
                  },
                }}
                onClick={() => setAuthForm("login")}
              >
                Login
              </Button>
              <Button
                size="large"
                sx={{
                  color: authForm === "register" ? "white" : "gray",
                  border:
                    authForm === "register"
                      ? "1px solid #16a34a"
                      : "1px solid #d1d5db",
                  backgroundColor:
                    authForm === "register" ? "#16a34a" : "white",
                  "&:hover": {
                    backgroundColor:
                      authForm === "register" ? "#15803d" : "#f9fafb",
                  },
                }}
                onClick={() => setAuthForm("register")}
              >
                Register
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {authForm === "login" ? <LoginPage /> : <RegisterPage />}
        </div>
      </div>
    </div>
  );
}
