"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { UploadButton } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "@/app/assets/medial-purple-logo.png";

export default function Home() {
  const router = useRouter();
  const [imgUrl, setImgUrl] = React.useState<string>("");
  const [disable, setDisable] = React.useState<boolean>(false);

  const formSubmitHandler = async (formData: FormData) => {
    //  get the data to pass in url
    let title = formData.get("title")?.slice(0, 100) as string;
    if (title.length === 0) title = "New Post Title";
    let description = formData.get("description")?.slice(0, 100) as string;
    if (description.length === 0) description = "New Post Description";

    // Default image url
    let newImgUrl;
    if (imgUrl.length === 0) newImgUrl = "https://i.sstatic.net/l60Hf.png";

    router.push(
      `/newpost?title=${title}&description=${encodeURIComponent(
        description
      )}&imgUrl=${imgUrl.length ? encodeURIComponent(imgUrl) : newImgUrl}`
    );
  };
  return (
    <main className="m-8">
      <Image
        src={logo}
        alt="medial-logo"
        width={24}
        style={{ height: "24px", margin: "2rem" }}
      />
      <p className="text-3xl font-semibold text-center m-8">
        Post your content
      </p>
      <Card className="w-[650px] m-auto shadow-lg ">
        <CardHeader>
          <CardTitle>New Post</CardTitle>
          <CardDescription>Post your content in one-click.</CardDescription>
        </CardHeader>
        <form action={formSubmitHandler}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title of your project"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your post"
                  className="resize-none"
                />
              </div>
            </div>
            <UploadButton
              className="mt-8"
              endpoint="strictImageAttachment"
              onUploadBegin={(res) => {
                setDisable(true);
              }}
              onClientUploadComplete={(res) => {
                setImgUrl(res[0].url);
                setDisable(false);
                console.log("Upload complete");
              }}
              onUploadError={(error: Error) => {
                alert("An error occured while uploading image");
              }}
            />
            {imgUrl.length ? (
              <div>
                <Image
                  src={imgUrl}
                  alt="uploaded-image"
                  width={300}
                  height={300}
                  style={{ borderRadius: "10px" }}
                />
              </div>
            ) : null}
          </CardContent>
          <CardFooter>
            <Button size={"lg"} type="submit" disabled={disable}>
              Post
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
