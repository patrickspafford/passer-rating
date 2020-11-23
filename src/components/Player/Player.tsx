import React from 'react'
import { Button, Tooltip, Avatar } from '@material-ui/core'
import PlayerType from '../../types/Player'
import Paper from "../Paper"
import nfl from '../../assets/nfl.png'
import ncaa from '../../assets/ncaa.jpg'
import './Player.scss'

interface IPlayer {
    id: string,
    name: string
    passerRating: number
    passAttempts: number
    passCompletions: number
    passYards: number
    touchdowns: number
    interceptions: number
    isNFL: boolean
    onDelete: any
    onSelect: any
}

const Player = ({
    id,
    name,
    passerRating,
    passAttempts,
    passCompletions,
    passYards,
    touchdowns,
    interceptions,
    isNFL,
    onDelete,
    onSelect,

} : IPlayer) => (
    <div style={{ marginBottom: '1rem', marginRight: '0.2rem', marginLeft: '0.2rem' }}>
        <Tooltip
            title={isNFL ?
                `${name} (NFL)`
                : `${name} (NCAA)`}
            placement='left'
        >
            <Paper onClick={() => {
                const playerType: PlayerType = {
                    id,
                    name,
                    passerRating,
                    passAttempts,
                    passCompletions,
                    passYards,
                    touchdowns,
                    interceptions,
                    isNFL
                }
                onSelect(playerType)
            }}>
                <div className='paperContent'>
                    <Avatar
                        style={{ margin: '0 1rem'}}
                        src={isNFL ? nfl : ncaa }
                    />
                    <label
                    className='statLabel'
                    style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                    >{name}</label>
                    <input
                    name={`Passer Rating of ${name}`}
                    value={passerRating}
                    className='statInput'
                    readOnly
                    type='text'
                    />
                    <Button
                      style={{ margin: '0 1rem'}}
                      variant='contained'
                      color='secondary'
                      onClick={() => onDelete(id)}
                    >
                        DELETE
                    </Button>
                </div>
            </Paper>
        </Tooltip>
    </div>
)

export default Player