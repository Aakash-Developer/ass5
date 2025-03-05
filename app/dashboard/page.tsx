"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const getOrders = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/orders");
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

export interface ShoppingItem {
  item: string;
  quantity: number;
}

export interface Order {
  _id: string;
  name: string;
  email: string;
  password?: string; // Optional for security reasons
  shoppingItems: ShoppingItem[];
  createdAt: string;
  updatedAt: string;
  status: "In Progress" | "Dispatched" | "Delivered"; // Restrict to these statuses
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then((data) => {
      console.log(data);
      setOrders(data.data);
    });
  }, []);

  return (
    <div>
      <h1 className=" uppercase">Orders</h1>
      <Table>
        <TableCaption>A list of Orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Item </TableHead>
            <TableHead className="text-right">qty</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Send Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order?._id}>
              <TableCell className="font-medium">{order?._id}</TableCell>
              <TableCell>{order?.name}</TableCell>
              <TableCell>{order?.email}</TableCell>
              <TableCell className="text-right">{order?.shoppingItems[0].item}</TableCell>
              <TableCell className="text-right">{order?.shoppingItems[0].quantity}</TableCell>
              <TableCell className="text-center">
                <div
                  className={`
    px-3 py-1 rounded-md font-medium text-center 
    ${order?.status === "In Progress" ? "bg-yellow-200 text-yellow-800" : ""}
    ${order?.status === "Dispatched" ? "bg-blue-200 text-blue-800" : ""}
    ${order?.status === "Delivered" ? "bg-green-200 text-green-800" : ""}
  `}>
                  {order?.status}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => {
                    toast.success(`Email sent to ${order.email}`, {
                      description: "The email has been successfully delivered.",
                      position: "top-right",
                      style: {
                        backgroundColor: "green",
                        color: "#fff",
                        border: "none",
                      },
                    });
                  }}
                  className=" w-full">
                  Send
                  <Send />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
