"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "./ui/use-toast";

import { useRouter } from "next/navigation";

export function AddPost({ user_id }: { user_id: string }) {
  const router = useRouter();
  const [sheetOpenHandler, setSheetOpenHandler] = useState<boolean>(false);
  const [inputState, setInputState] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<errorState>();

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file!);
  };

  const sumbitHandler = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", inputState.title);
    formData.append("description", inputState.description);
    formData.append("image", file!);
    formData.append("user_id", user_id);

    axios
      .post("/api/user/post", formData)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          toast({
            title: "Post Created",
            description: response.message,
            className: "bg-green-400",
          });
          setSheetOpenHandler(false);
          router.refresh();
        } else if (response.status == 400) {
          setErrorState(response.errors);
        }
      })
      .catch((error) => {
        console.log("The error is " + error);
        setLoading(false);
      });
  };
  return (
    <Sheet open={sheetOpenHandler}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setSheetOpenHandler(true)}>
          Add Post
        </Button>
      </SheetTrigger>
      <SheetContent showCloseBtn={false}>
        <SheetHeader>
          <SheetTitle>Add your Amazing work</SheetTitle>
          <SheetDescription>
            Display your Amazing UI/UX to the world
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter your UI/UX"
            onChange={(e) =>
              setInputState({ ...inputState, title: e.target.value })
            }
          />
          <span className="text-red-500">{errorState?.title}</span>
        </div>

        <div className="mt-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter your description"
            onChange={(e) =>
              setInputState({ ...inputState, description: e.target.value })
            }
          />
          <span className="text-red-500">{errorState?.description}</span>
        </div>

        <div className="mt-4">
          <Label htmlFor="file">Your File</Label>
          <Input
            id="file"
            type="file"
            onChange={fileHandler}
            accept="images/*"
          />
        </div>
        <span className="text-red-500">{errorState?.image}</span>

        <SheetFooter className="mt-2">
          <Button
            variant={"default"}
            onClick={sumbitHandler}
            disabled={loading}
          >
            {loading ? " Processing" : " Sumbit"}
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => setSheetOpenHandler(false)}
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
