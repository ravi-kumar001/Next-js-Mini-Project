"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export function DeletePostBtn({ id }: { id: number }) {
  const router = useRouter();
  const deletePost = () => {
    axios
      .delete(`/api/user/post/${id}`)
      .then((res) => {
        const response = res.data;
        if (response.status == 200) {
          toast({
            title: "Post Deleted",
            description: response.message,
            className: "bg-green-400",
          });
          router.refresh();
        } else if (response.status == 400) {
          toast({
            title: "Error..",
            description: response.message,
            className: "bg-green-400",
          });
        }
      })
      .catch((err) => {
        console.log("The error is : " + err);
      });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"destructive"}>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Post will not be recover
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={deletePost}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
