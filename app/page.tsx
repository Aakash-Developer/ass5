"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { faker } from "@faker-js/faker";

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (!data.email || !data.password || !data.name) {
      toast.error("Please fill all fields", {
        duration: 3000,
        description: "Name, Email, Password is required fields.",
        style: {
          backgroundColor: "red",
          color: "white",
          border: "none",
        },
      });
    } else {
      addUser(data);
    }
  };

  const addUser = async (data: any) => {
    try {
      const orderDetails = [
        {
          item: faker.commerce.productName(), // Generates a random product name
          quantity: faker.number.int({ min: 1, max: 5 }), // Generates a random quantity between 1 and 5
        },
      ];

      const res = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, shoppingItems: orderDetails }),
      });

      const result = await res.json();

      if (res.status === 201) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message, {
          duration: 3000,
          style: {
            backgroundColor: "red",
            color: "white",
            border: "none",
          },
        });
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error in addUser:", error);
    }
  };

  return (
    <section className=" h-screen flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className=" p-4 max-w-sm space-y-3 mx-auto w-full  shadow-2xl  rounded-xl">
        <h1 className=" uppercase text-4xl font-bold text-center mb-4 border-b border-dashed  pb-4">Order Now</h1>
        <div className=" space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input {...register("name")} type="text" id="name" placeholder="Name" />
        </div>
        <div className=" space-y-1">
          <Label htmlFor="Email">Email</Label>
          <Input {...register("email")} type="email" id="email" placeholder="Email" />
        </div>
        <div className=" space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input {...register("password")} autoComplete="current-password" type="password" id="password" placeholder="Password" />
        </div>
        <Button onClick={() => {}}>Order Now</Button>
      </form>
    </section>
  );
};

export default Home;
