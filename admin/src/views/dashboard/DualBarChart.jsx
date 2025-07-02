import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts'

const DualBarChart = ({ data, height = 385 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="email" angle={-15} textAnchor="end" interval={0} height={60} />

        {/* Trục Y trái: Doanh thu */}
        <YAxis
          yAxisId="left"
          orientation="left"
          allowDecimals={false}
          tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}tr`}
        />

        {/* Trục Y phải: Số đơn */}
        <YAxis
          yAxisId="right"
          orientation="right"
          allowDecimals={false}
        />

        <Tooltip />
        <Legend />

        {/* Cột doanh thu */}
        <Bar yAxisId="left" dataKey="totalRevenue" fill="#20c997" name="Tổng doanh thu">
          <LabelList dataKey="totalRevenue" position="top" formatter={(v) => v.toLocaleString()} />
        </Bar>

        {/* Cột số đơn */}
        <Bar yAxisId="right" dataKey="totalBookings" fill="#6c757d" name="Số đơn đặt">
          <LabelList dataKey="totalBookings" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default DualBarChart