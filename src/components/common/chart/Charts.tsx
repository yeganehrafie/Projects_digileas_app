import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { day: 'شنبه', فروش: 4000 },
    { day: 'یکشنبه', فروش: 3000 },
    { day: 'دوشنبه', فروش: 2000 },
    { day: 'سه‌شنبه', فروش: 2780 },
    { day: 'چهارشنبه', فروش: 1890 },
    { day: 'پنجشنبه', فروش: 2390 },
    { day: 'جمعه', فروش: 3490 },
];

const SalesChart = () => (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="فروش" stroke="#10b981" strokeWidth={2} />
        </LineChart>
    </ResponsiveContainer>
);

export default SalesChart;