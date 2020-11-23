import { useState, useEffect, Dispatch, SetStateAction } from 'react'

interface IWindowSize {
    width: number | undefined,
    height: number | undefined
}

const useWindowSize = () => {
    const defaultValue: IWindowSize = {
        width: undefined,
        height: undefined,
    }
    const [windowSize, setWindowSize]: [IWindowSize, Dispatch<SetStateAction<IWindowSize>>] =
      useState(defaultValue)

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)

    }, [])

    return windowSize
}

export default useWindowSize