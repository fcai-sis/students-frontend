"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createServiceRequest, dummyCreateServiceRequest } from "./actions";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateServiceRequestFormValues>({
    resolver: zodResolver(createServiceRequestSchema),
  });

  const onSubmit = async (data: CreateServiceRequestFormValues) => {
    const formData = new FormData();
    formData.append("serviceName", data.serviceName);
    formData.append("image", data.image[0]);
    const response = await dummyCreateServiceRequest(formData);

    if (!response.success) {
      return toast.error(JSON.stringify(response));
    }

    toast.success("Service request created successfully");
    router.push("/requests");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Service Name"
        {...register("serviceName")}
      />
      <input type="file" accept="image/jpeg" {...register("image")} />
      <button type="submit" disabled={isSubmitting} className="btn">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
