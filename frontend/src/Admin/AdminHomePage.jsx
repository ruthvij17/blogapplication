import React, { useEffect, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";
import axios from "axios";

const AdminHomePage = () => {
  const [analyticsData, setAnalyticsData] = useState();

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"];

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const response = await axios.get("/get/blogs/analytics");
        if (response.data) {
          console.log(response.data.data);
          setAnalyticsData(response.data.data);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getAnalyticsData();
  }, []);

  return (
    <>
      <div className="w-[98%] mx-2  h-[83vh] flex justify-between gap-1 rounded-lg">
        <div className="w-full bg-black/15 rounded-lg flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-black/30 text-center capitalize mb-2">
            likes & views of blogs based on Categories
          </h1>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalLikes" fill="#8884d8" />
                <Bar dataKey="totalViews" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full bg-black/15 rounded-lg flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-black/30 text-center capitalize mb-2">
            No. of posts based on Categories
          </h1>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={analyticsData}
                  dataKey="totalBlogs"
                  nameKey="category"
                  cx="50%" // Positioning of the center of the pie chart
                  cy="50%" // Positioning of the center of the pie chart
                  outerRadius={150} // Size of the pie chart
                  fill="#8884d8"
                  label
                >
                  {/* Loop through data and apply custom colors */}
                  {analyticsData &&
                    analyticsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout(AdminHomePage);
