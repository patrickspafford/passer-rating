import React, { ChangeEvent, useState } from 'react'
import { v4 } from 'uuid'
import useStorage from './hooks/useStorage'
import PlayerType from './types/Player'
import { Chart, Stat, Switch, Header, Paper, Button, Name, Player } from './components'
import players from './utils/players'
import {
  handlePassAttemptsErrors,
  handleInterceptionsErrors,
  handlePassCompletionsErrors,
  handlePassYardsErrors,
  handleTouchdownsErrors
} from './utils/errorChecking'
import nfl from './assets/nfl.png'
import ncaa from './assets/ncaa.jpg'
import './App.scss';

const { floor, random } = Math

const App = () => {
  const [playerList, setPlayerList] = useStorage<string, PlayerType[]>('players', [])
  // Error hooks
  const [passAttemptsError, setPassAttemptsError] = useState<boolean>(false)
  const [passCompletionsError, setPassCompletionsError] = useState<boolean>(false)
  const [passYardsError, setPassYardsError] = useState<boolean>(false)
  const [touchdownsError, setTouchdownsError] = useState<boolean>(false)
  const [interceptionsError, setInterceptionsError] = useState<boolean>(false)
  // Storage hooks
  const [isNFL, setIsNFL] = useStorage<string, boolean>('isNFL', true)
  const [playerName, setPlayerName] =
    useStorage<string, string>('playerName',
      players[floor(random() * players.length)])
  const [passAttempts, setPassAttempts] =
    useStorage<string, number>('passAttempts', 0)
  const [passCompletions, setPassCompletions] =
    useStorage<string, number>('passCompletions', 0)
  const [passYards, setPassYards] =
    useStorage<string, number>('passYards', 0)
  const [touchdowns, setTouchdowns] =
    useStorage<string, number>('touchdowns', 0)
  const [interceptions, setInterceptions] =
    useStorage<string, number>('interceptions', 0)

  const clearAll = () => {
    setPlayerName('')
    setPassAttempts(0)
    setPassCompletions(0)
    setPassYards(0)
    setTouchdowns(0)
    setInterceptions(0)
  }

  const handleSave = () => {
    if (playerName &&
      !passAttemptsError &&
      !passCompletionsError &&
      !passYardsError &&
      !touchdownsError &&
      !interceptionsError
    ) {
      const newPlayer: PlayerType = {
        id: v4(),
        name: playerName,
        passAttempts: passAttempts,
        passCompletions: passCompletions,
        passYards: passYards,
        touchdowns: touchdowns,
        interceptions: interceptions,
        passerRating: isNFL ? passerRatingNFL() : passerRatingNCAA(),
        isNFL: isNFL
      }
      setPlayerList([
        ...playerList,
        newPlayer
      ])
      clearAll()
    }
  }

  const adjustNFLRatingComponent = (comp: number) => {
    if (comp > 2.375) {
      return 2.375
    }
    else if (comp < 0) {
      return 0
    }
    return comp
  }

  const passerRatingNFL = () => {
    let a: number = ((passCompletions / passAttempts) - 0.3) * 5
    let b: number = ((passYards / passAttempts) - 3) * 0.25
    let c: number = (touchdowns / passAttempts) * 20
    let d: number = 2.375 - ((interceptions / passAttempts) * 25)
    a = adjustNFLRatingComponent(a)
    b = adjustNFLRatingComponent(b)
    c = adjustNFLRatingComponent(c)
    d = adjustNFLRatingComponent(d)
    const tempResult = ((a + b + c + d) / 6) * 100
    return isNaN(tempResult) ? 0 : Number(tempResult.toFixed(2))
  }

  const passerRatingNCAA = () => {
    const a: number = 8.4 * passYards
    const b: number = 330 * touchdowns
    const c: number = 100 * passCompletions
    const d: number = 200 * interceptions
    const tempResult = (a + b + c - d) / passAttempts
    return isNaN(tempResult) ? 0 : Number(tempResult.toFixed(2))
  }

  return (
    <div className='app'>
      <Header />
      <div className='grid' style={playerList.length === 0 ? { display: 'block' } : {}}>
        <Paper style={playerList.length === 0 ? {
          width: '50%',
          marginTop: '2rem'

        } : {
          width: '100%',
          height: '100%',
          margin: 'inherit',
        }}>
          <Name
            value={playerName}
            updateName={(e: ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value)}
          />
          <div className='switchContainer'>
              <Switch
                isNFL={isNFL}
                toggle={() => setIsNFL(!isNFL)}
                leftLogo={nfl}
                leftLogoAltText='NFL'
                rightLogo={ncaa}
                rightLogoAltText='NCAA'
              />
          </div>
          <Stat
            value={passAttempts}
            onClear={() => setPassAttempts(0)}
            onUpdate={(e: ChangeEvent<HTMLInputElement>) => {
              setPassAttempts(Number(e.target.value))
            }}
            error={() => {
              const temp = handlePassAttemptsErrors(passAttempts, touchdowns, interceptions)
              temp ? setPassAttemptsError(true) : setPassAttemptsError(false)
              return temp
            }}
          >
            Pass Attempts
          </Stat>
          <Stat
            value={passCompletions}
            onClear={() => setPassCompletions(0)}
            onUpdate={(e: ChangeEvent<HTMLInputElement>) => {
              setPassCompletions(Number(e.target.value))
            }}
            error={() => {
              const temp = handlePassCompletionsErrors(passCompletions, passAttempts)
              temp ? setPassCompletionsError(true) : setPassCompletionsError(false)
              return temp
            }}
          >
            Pass Completions
          </Stat>
          <Stat
            value={passYards}
            onClear={() => setPassYards(0)}
            onUpdate={(e: ChangeEvent<HTMLInputElement>) => {
              setPassYards(Number(e.target.value))
            }}
            error={() => {
              const temp = handlePassYardsErrors(passYards, passCompletions)
              temp ? setPassYardsError(true) : setPassYardsError(false)
              return temp
            }}
          >
            Pass Yards
          </Stat>
          <Stat
            value={touchdowns}
            onClear={() => setTouchdowns(0)}
            onUpdate={(e: ChangeEvent<HTMLInputElement>) => {
              setTouchdowns(Number(e.target.value))
            }}
            error={() => {
              const temp = handleTouchdownsErrors(touchdowns, passAttempts, passCompletions)
              temp ? setTouchdownsError(true) : setTouchdownsError(false)
              return temp
            }}
          >
            Touchdowns
          </Stat>
          <Stat
            value={interceptions}
            onClear={() => setInterceptions(0)}
            onUpdate={(e: ChangeEvent<HTMLInputElement>) => {
              setInterceptions(Number(e.target.value))}}
              error={() => {
                const temp = handleInterceptionsErrors(interceptions, passAttempts, passCompletions)
                temp ? setInterceptionsError(true) : setInterceptionsError(false)
                return temp
              }}
          >
            Interceptions
          </Stat>
          <span className='rating'>
            {isNFL ? 'NFL Passer Rating: ' : 'NCAA Passer Rating: '}
            {isNFL ? passerRatingNFL() : passerRatingNCAA()}</span>
          {!passAttemptsError && 
          !passCompletionsError &&
          !passYardsError &&
          !touchdownsError &&
          !interceptionsError &&
          <Button
            variant='contained'
            color='primary'
            disabled={playerName.length === 0}
            onClick={() => handleSave()}
          >
            SAVE
          </Button>
          }
          <Button
            variant='contained'
            color='secondary'
            onClick={() => clearAll()}
          >
            CLEAR ALL
          </Button>
        </Paper>
        <div>
          {
            playerList.length > 0 &&
            <>
              <h1 style={{ backgroundColor: 'white' }}>Your Saved Players</h1>
              <p>Just click to edit! Then click save to reinsert the player into the list.</p>
            </>
          }
          <ul>
            {playerList.map((player: PlayerType) => {
              const {
                id,
                name,
                passerRating,
                passAttempts,
                passCompletions,
                passYards,
                touchdowns,
                interceptions,
                isNFL
              } = player
              return (
              <Player
                id={id}
                name={name}
                passerRating={passerRating}
                passAttempts={passAttempts}
                passCompletions={passCompletions}
                passYards={passYards}
                touchdowns={touchdowns}
                interceptions={interceptions}
                isNFL={isNFL}
                onSelect={(playerObject: PlayerType) => {
                  const {
                    id,
                    name,
                    passAttempts,
                    passCompletions,
                    passYards,
                    touchdowns,
                    interceptions,
                    isNFL
                  } = playerObject
                  setPlayerName(name)
                  setPassAttempts(passAttempts)
                  setPassCompletions(passCompletions)
                  setPassYards(passYards)
                  setTouchdowns(touchdowns)
                  setInterceptions(interceptions)
                  setIsNFL(isNFL)
                  setPlayerList(playerList.filter(listItem => {
                    return listItem.id !== id
                  }))
                }}
                onDelete={(id: string) => {
                  setPlayerList(playerList.filter(listItem => {
                    return listItem.id !== id
                  }))
                }}
                />)
              })}
            {
              playerList.length > 0 &&
            <Button
              variant='contained'
              color='primary'
              onClick={() => setPlayerList([])}
            >
              DELETE ALL
            </Button>
            }
          </ul>
          {
            playerList.length !== 0 &&
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {
              playerList.filter(item => item.isNFL).length > 0 &&
            <Chart
            isNFL
            color='#03244D'
            playerList={playerList.filter(item => item.isNFL)}
            />
          }
          {
            playerList.filter(item =>!item.isNFL).length > 0 &&
            <Chart
            isNFL={false}
            color='rgb(270,0,79)'
            playerList={playerList.filter(item => !item.isNFL)}
            />
          }
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App;
