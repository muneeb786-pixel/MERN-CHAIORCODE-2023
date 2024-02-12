import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/blog";
import appwriteStorage from "../../appwrite/storage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost,updatePost } from "../../store/postSlice";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "",
      },
    });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading]  = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    if (post) {
      setLoading(true)
      const file = data.image[0]
        ? appwriteStorage.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteStorage.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updateBlog(post.$id, {
        ...data,
        featureImage: file ? file.$id : undefined,
      });
      setLoading(false);
      if (dbPost) {
        dispatch(updatePost(dbPost))
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      setLoading(true)
      const file = data.image[0]
        ? await appwriteStorage.uploadFile(data.image[0])
        : null;

      if (file) {
        data.featuredImage = file.$id;
        data.userId = userData.$id;
        const dbpost = await appwriteService.createBlog({
          ...data
        });
        setLoading(false)
        if (dbpost) {
          dispatch(addPost(dbpost))
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  if(loading) return <div className='h-screen flex items-center justify-center text-5xl font-medium'>...loading</div>

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :" 
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value ), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteStorage.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
