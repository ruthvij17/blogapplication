import React from "react";
import AdminLayout from "../Layouts/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";

const AdminHomePage = () => {
  const data = [
    { category: "Sports", likes: 15, views: 50 },
    { category: "Fashion", likes: 40, views: 60 },
    { category: "Food", likes: 10, views: 30 },
    { category: "Technology", likes: 15, views: 30 },
    { category: "Others", likes: 40, views: 70 },
  ];

  const cData = [
    { category: "Technology", posts: 120 },
    { category: "Health", posts: 80 },
    { category: "Finance", posts: 95 },
    { category: "Sports", posts: 60 },
    { category: "Travel", posts: 150 },
  ];
  return (
    <>
      <div className="w-[98%] mx-2  h-[85vh] flex justify-between items-center p-2 gap-1 rounded-lg">
        <div className="w-full bg-black/15 rounded-lg">
          <h1 className="text-2xl font-bold text-black/30 text-center capitalize mb-2">
            likes & views of blogs based on Categories
          </h1>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="likes" stroke="#8884d8" />
                <Line type="monotone" dataKey="views" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full bg-black/15 rounded-lg">
          <h1 className="text-2xl font-bold text-black/30 text-center capitalize mb-2">
            No. of posts based on categories
          </h1>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={cData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout(AdminHomePage);
