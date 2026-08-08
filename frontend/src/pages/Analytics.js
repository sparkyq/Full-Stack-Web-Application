import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/analytics.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

function Analytics() {

  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("analytics/")
      .then(res => setData(res.data));
  }, []);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  const COLORS = [
    "#2563eb",
    "#38bdf8",
    "#60a5fa"
  ];

  return (
    <div className="analytics-page">

      <h1>Analytics Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Products</h3>
          <p>{data.total_products}</p>
        </div>

        <div className="stat-card">
          <h3>Orders</h3>
          <p>{data.total_orders}</p>
        </div>

        <div className="stat-card">
          <h3>Revenue</h3>
          <p>{data.total_revenue}₴</p>
        </div>

        <div className="stat-card">
          <h3>Top Product</h3>
          <p>{data.top_product}</p>
        </div>

      </div>

      <div className="chart-container">

        <h2>Sales Dynamics</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={data.sales_chart}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="sales"
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="chart-container">

        <h2>Products Distribution</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>

            <Pie
              data={data.products_chart}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.products_chart.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Analytics;