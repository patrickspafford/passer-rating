import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts'
import PlayerType from '../../types/Player'
import useDimensions from '../../hooks/useDimensions'

interface IChart {
    playerList: PlayerType[]
    color: string
    isNFL: boolean
}
const Chart = ({ playerList, color, isNFL }: IChart) => {

    const dimensions = useDimensions()

    const handleChartWidth = () => {
        if (dimensions.width) {
            if (dimensions.width < 700) {
                return dimensions.width
            } else {
                return dimensions.width / 2
            }
        }
        return 350
    }

    return (
        <div>
            <h1 style={{ backgroundColor: 'white' }}>
                {isNFL ? 'NFL Passer Ratings' : 'NCAA Passer Ratings'}
            </h1>
            <BarChart height={handleChartWidth() - 100} width={handleChartWidth()} data={playerList}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar name='Passer Rating' dataKey='passerRating' fill={color}/>
            </BarChart>
        </div>
    )
}

export default Chart