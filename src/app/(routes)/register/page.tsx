"use client";
import AuthLogo from "@/components/AuthLogo";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [errorState, setErrorState] = useState<inputField>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const login = () => {
    setLoading(true);
    axios
      .post("/api/register", inputState)
      .then((res) => {
        const response = res.data;
        setLoading(false);
        if (response.status == 200) {
          router.push(`/login?message=${response.message}`);
        } else if (response.status == 400) {
          setErrorState(response.errors);
        }
        console.log(response.errors)
      })
      .catch((err) => {
        console.log("The error is " + err);
        setLoading(false);
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
          <div>
            <h1 className="text-3xl font-bold">DevUI</h1>
            <p>Welcome Back! explore the worlds best UI's</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="" className="text-base font-medium text-gray-900">
                Name
              </Label>
              <div>
                <Input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Name"
                  onChange={(e) =>
                    setInputState({ ...inputState, name: e.target.value })
                  }
                ></Input>
                <span className="text-red-500">{errorState?.name}</span>
              </div>
            </div>{" "}
            <div>
              <Label htmlFor="" className="text-base font-medium text-gray-900">
                Email address
              </Label>
              <div>
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

              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </Label>
                </div>
                <div>
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
            </div>
            <div>
              <Label htmlFor="" className="text-base font-medium text-gray-900">
                Confirm Password
              </Label>
              <div>
                <Input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setInputState({
                      ...inputState,
                      password_confirmation: e.target.value,
                    })
                  }
                ></Input>
              </div>
            </div>
            <div></div>
          </div>
          <Button type="submit" onClick={login}>
            {loading ? "Loading..." : "Register"}
          </Button>
          <strong className="mt-3 text-center">
            Already have an account?
            <Link href={"/login"} className=" pl-2 text-orange-400">
              Login
            </Link>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Register;
