'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { profileSchema } from "../../../utils/validation";
import React from "react";

export default function EditProfilePage() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => axios.get("/api/profile").then(res => res.data)
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      bio: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => axios.put("/api/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      alert("✅ Profile updated successfully!");
    }
  });

  React.useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg p-8 shadow-xl bg-white rounded-2xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label className="block mb-1 text-gray-700">Name</Label>
            <Input {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label className="block mb-1 text-gray-700">Email</Label>
            <Input type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
  <Label className="block mb-1 text-gray-700">Phone</Label>
  <Input
    {...register("phone")}
    onInput={(e) => {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
    }}
  />
  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
</div>

          <div>
            <Label className="block mb-1 text-gray-700">Location</Label>
            <Input {...register("location")} />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>
          <div>
            <Label className="block mb-1 text-gray-700">Bio</Label>
            <Textarea {...register("bio")} rows={4} />
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
