import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,  // Extra
  Legend                // Extra
} from "recharts";

const AveExpChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Change Limit to Amount On View
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
                const data = await response.json();

                const DataPokemon = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return res.json();
                    })
                )

                // Grouping Pokemons by Types
                const typeMap = {};
                DataPokemon.forEach((p) => {
                    p.types.forEach((t) => {
                        const typePoke = t.type.name;
                        if (!typeMap[typePoke]) {
                            typeMap[typePoke] = {totalExp: 0, count: 0};
                        }
                        typeMap[typePoke].totalExp += p.base_experience;
                        typeMap[typePoke].count++;
                    })
                })

                // Formatting?
                const formattedData = Object.keys(typeMap).map((type) => ({
                    type,
                    AverageBaseExp: (typeMap[type].totalExp / typeMap[type].count).toFixed(2),
                }))

                setChartData(formattedData);
            } catch (error) {
                console.error("", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="chart-container">
            <h2>Average Base Experience —— Type</h2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="AverageBaseExp" stroke="#93c2eb" activeDot={{r:8}} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AveExpChart