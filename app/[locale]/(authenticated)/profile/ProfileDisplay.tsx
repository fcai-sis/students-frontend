"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { updateProfileAction } from "./actions";
import { StudentType, studentLocalizedFields } from "@fcai-sis/shared-models";

const updateProfileFormSchema = z.object({
  fullName: z.string().min(1).optional(),
  phoneNumber: z
    .string()
    .length(11)
    .refine((value) => {
      return !isNaN(Number(value));
    }, "Phone number must be a numeric string")
    .optional(),
  address: z.string().min(1).optional(),
});

export type updateProfileValues = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfileForm({ profileData }: any) {
  const profileFieldsLookup = profileData.editableFields.reduce(
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
    <div className='max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md'>
      <h1 className='text-2xl font-bold mb-6'>Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5'>
          {profileData.editableFields.map((field: any) => {
            const key = Object.keys(field)[0];
            return (
              <div key={key} className='mb-4'>
                <label
                  htmlFor={key}
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  {key}
                </label>
                <input
                  {...register(key as keyof updateProfileValues)}
                  type='text'
                  id={key}
                  defaultValue={profileFieldsLookup[key]}
                  className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                {errors[key as keyof updateProfileValues] && (
                  <span className='text-red-500 text-sm'>
                    {errors[key as keyof updateProfileValues]?.message}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className='mb-5'>
          {profileData.viewableFields.map((field: any) => {
            const key = Object.keys(field)[0] as keyof StudentType;
            return (
              <div key={key} className='mb-4'>
                <label
                  htmlFor={key}
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  {key}
                </label>
                <input
                  type='text'
                  id={key}
                  defaultValue={field[key]}
                  disabled
                  className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100 sm:text-sm'
                />
              </div>
            );
          })}
        </div>
        <button
          className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
}
