import { useEffect, useState } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

const StatsChart = ({stats}) => {
    // Converting API Stats into Data Format
    const formattedData = stats.map((s) => ({
        statName: s.stat.name.toUpperCase(),
        value: s.base_stat,
    }))

    return (
        <div className="chart-container">

            <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={formattedData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="statName" />
                    <PolarRadiusAxis />
                    <Tooltip />
                    <Radar 
                        name="Base Stats"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StatsChart;