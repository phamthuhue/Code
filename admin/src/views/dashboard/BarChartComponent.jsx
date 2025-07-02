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

const BarChartComponent = ({
  data,
  dataKey = 'count',          // dùng cho tour: count, service: totalBooked
  nameKey = 'name',
  barColor = '#8884d8',
  height = 350,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={nameKey} angle={-15} textAnchor="end" interval={0} height={60} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={barColor} name="Số lượng đặt">
            <LabelList dataKey={dataKey} position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent