"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createServiceRequest } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const createServiceRequestSchema = z.object({
  serviceName: z.string(),
  image: z
    .unknown()
    .transform((value) => value as FileList)
    .refine((file) => file.length === 1 && file[0].type === "image/jpeg", {
      message: "Please upload an image",
    }),
});

type CreateServiceRequestFormValues = z.infer<
  typeof createServiceRequestSchema
>;

export default function CreateServiceRequestForm() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceRequestFormValues>({
    resolver: zodResolver(createServiceRequestSchema),
  });

  const onSubmit = async (data: CreateServiceRequestFormValues) => {
    const formData = new FormData();
    formData.append("serviceName", data.serviceName);
    formData.append("image", data.image[0]);
    const response = await createServiceRequest(formData);

    if (!response.success) {
      return toast.error(JSON.stringify(response));
    }

    toast.success("Service request created successfully");
    router.push("/requests");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white shadow-md rounded-lg p-8 w-full max-w-lg mx-auto flex flex-col gap-4'
    >
      <div className='mb-4'>
        <label className='block text-primary text-sm font-bold mb-2'>
          Service Name
        </label>
        <input
          type='text'
          placeholder='Service Name'
          {...register("serviceName")}
          className='border border-gray-300 p-2 rounded-lg w-full'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-primary text-sm font-bold mb-2'>
          Image
        </label>
        <div className='relative'>
          <input
            {...register("image")}
            type='file'
            accept='image/jpeg'
            className='absolute inset-0 opacity-0 cursor-pointer'
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setSelectedFile(file.name);
              } else {
                setSelectedFile(null);
              }
            }}
          />
          <div className='flex items-center justify-center border border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-100'>
            <span className='text-gray-600'>
              {selectedFile ? selectedFile : "Choose file"}
            </span>
          </div>
        </div>
        {errors.image && (
          <p className='text-red-600 text-xs italic mt-2'>
            {errors.image.message}
          </p>
        )}
      </div>
      <button
        className='btn flex justify-center mt-4'
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
