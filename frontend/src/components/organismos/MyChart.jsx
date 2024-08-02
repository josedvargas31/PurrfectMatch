// src/components/MyChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MyChart = ({ data, options }) => (
    <div className="w-full max-w-4xl mx-auto">
        <Bar data={data} options={options} style={{ height: '500px' }} />
    </div>
);

export default MyChart;
