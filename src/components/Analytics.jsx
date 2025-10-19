import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";

function Analytics() {
  const [seatTypeStats, setSeatTypeStats] = useState([]);
  const [flightTypeStats, setFlightTypeStats] = useState([]);
  const [bookingTrends, setBookingTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://skyaura-airways-backend.onrender.com/api/analytics");

        // Process seat type data
        const formattedSeatData = res.data.seatTypeStats.map(({ _id, count }) => ({
          name: _id || "Economy",
          value: count
        }));

        const seatTypes = ["Economy", "Business", "First Class"];
        const completeSeatData = seatTypes.map(type => {
          const existing = formattedSeatData.find(item => item.name === type);
          return existing || { name: type, value: 0 };
        });

        // Process flight type data
        const formattedFlightData = res.data.flightTypeStats.map(({ _id, count }) => ({
          name: _id || "Domestic",
          value: count
        }));

        const flightTypes = ["Domestic", "International"];
        const completeFlightData = flightTypes.map(type => {
          const existing = formattedFlightData.find(item => item.name === type);
          return existing || { name: type, value: 0 };
        });

        // Process booking trends
        const trendsFormatted = (res.data.bookingTrends || []).map(item => ({
          date: item._id,
          count: item.count,
        }));

        setSeatTypeStats(completeSeatData);
        setFlightTypeStats(completeFlightData);
        setBookingTrends(trendsFormatted);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load analytics:", err);
        setError("Failed to load analytics data");
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) return <div className="loading" style={{ textAlign: "center", padding: "2rem" }}>Loading analytics...</div>;
  if (error) return <div className="error" style={{ textAlign: "center", padding: "2rem", color: "red" }}>{error}</div>;

  return (
    <div className="analytics-container" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#2c3e50" }}>📊 Booking Analytics Dashboard</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
        {/* Seat Type Distribution */}
        <div className="chart-card" style={{ background: "white", borderRadius: "8px", padding: "1rem", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#34495e" }}>Seat Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={seatTypeStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {seatTypeStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} bookings`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            {seatTypeStats.map(({ name, value }) => (
              <div key={name} style={{
                margin: "0.5rem 0",
                color: value === 0 ? "#aaa" : "inherit",
                fontStyle: value === 0 ? "italic" : "normal"
              }}>
                <strong>{name}:</strong> {value} bookings
                {value === 0 && " (no bookings yet)"}
              </div>
            ))}
          </div>
        </div>

        {/* Flight Type Distribution */}
        <div className="chart-card" style={{ background: "white", borderRadius: "8px", padding: "1rem", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#34495e" }}>Flight Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={flightTypeStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} flights`]} labelFormatter={(label) => `Flight Type: ${label}`} />
              <Legend />
              <Bar dataKey="value" name="Number of Flights" fill="#8884d8">
                {flightTypeStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Booking Trends */}
      <div className="chart-card" style={{
        background: "white",
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        marginTop: "2rem"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#34495e" }}>📈 Booking Trends Over Time</h3>
        {bookingTrends.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={bookingTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: -10 }} />
              <YAxis label={{ value: 'Bookings', angle: -90, position: 'insideLeft' }} allowDecimals={false} />
              <Tooltip formatter={(value) => [`${value} bookings`]} labelFormatter={(label) => `Date: ${label}`} />
              <Legend />
              <Line type="monotone" dataKey="count" name="Number of Bookings" stroke="#003366" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ textAlign: "center" }}>No booking trends data available</p>
        )}
      </div>
    </div>
  );
}

export default Analytics;