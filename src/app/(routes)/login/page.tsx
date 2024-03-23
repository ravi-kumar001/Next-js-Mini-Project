"use client";
import AuthLogo from "@/components/AuthLogo";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";

function Login() {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState<inputField>();
  const params = useSearchParams();
  const login = () => {
    axios
      .post("/api/login", inputState)
      .then((res) => {
        const response = res.data;
        if (response.status == 200) {
          signIn("credentials", {
            email: inputState.email,
            password: inputState.password,
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response.status == 400) {
          setErrorState(response.errors);
        }
      })
      .catch((err) => {
        console.log("The err is " + err);
      });
  };
  return (
    <div>
      <AuthLogo />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Image
            src={"/images/design.svg"}
            height={100}
            width={100}
            alt={"login images"}
            className="h-screen w-full"
          />
        </div>
        <div className="flex flex-col justify-center p-32">
          {params.get("message") ? (
            <Alert className="bg-green-400">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{params.get("message")}</AlertDescription>
            </Alert>
          ) : (
            ""
          )}

          <div>
            <h1 className="text-3xl font-bold">DevUI</h1>
            <p>Welcome Back! explore the worlds best UI's</p>
          </div>
          <div className="space-y-5">
            <div>
              <Label htmlFor="" className="text-base font-medium text-gray-900">
                Email address
              </Label>
              <div className="mt-2">
                <Input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setInputState({ ...inputState, email: e.target.value })
                  }
                ></Input>
                <span className="text-red-500">{errorState?.email}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  Password
                </Label>
              </div>
              <div className="mt-2">
                <Input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={(e) =>
                    setInputState({ ...inputState, password: e.target.value })
                  }
                ></Input>
                <span className="text-red-500">{errorState?.password}</span>
              </div>
            </div>
            <div></div>
          </div>
          <Button type="submit" onClick={login} disabled={loading}>
            {loading ? "Processing..." : "Login"}
          </Button>
          <strong className="mt-3 text-center">
            Don't have an account?
            <Link href={"/register"} className=" pl-2 text-orange-400">
              Register
            </Link>
          </strong>
        </div>
      </div>
    </div>
  );
}

export default Login;
