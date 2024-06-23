"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { updateProfileAction } from "./actions";

const updateProfileFormSchema = z.object({
  fullName: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

export type updateProfileValues = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfileForm({ profileData }: any) {
  const profileFieldsLookup = profileData.data.reduce(
    (acc: Record<string, any>, item: Record<string, any>) => {
      const key = Object.keys(item)[0];
      acc[key] = item[key];
      return acc;
    },
    {}
  );

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<updateProfileValues>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      fullName: profileFieldsLookup["fullName"],
      phoneNumber: profileFieldsLookup["phoneNumber"],
      address: profileFieldsLookup["address"],
    },
  });

  const onSubmit = async (values: updateProfileValues) => {
    const updateProfileResponse = await updateProfileAction(values);

    if (!updateProfileResponse.success) {
      return toast.error(updateProfileResponse.error?.message);
    }

    toast.success("Profile Updated Successfully");
    router.push(`/profile`);
  };

  return (
    <>
      <h1>Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Full Name</label>
        <input
          {...register("fullName")}
          type='text'
          defaultValue={profileFieldsLookup["fullName"]}
        />
        {errors.fullName && (
          <p className='text-red-600'>{errors.fullName?.message}</p>
        )}

        <label>Phone Number</label>
        <input
          {...register("phoneNumber")}
          type='text'
          defaultValue={profileFieldsLookup["phoneNumber"]}
        />
        {errors.phoneNumber && (
          <p className='text-red-600'>{errors.phoneNumber?.message}</p>
        )}

        <label>Address</label>
        <input
          {...register("address")}
          type='text'
          defaultValue={profileFieldsLookup["address"]}
        />
        {errors.address && (
          <p className='text-red-600'>{errors.address?.message}</p>
        )}

        <button className='btn' type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
}
