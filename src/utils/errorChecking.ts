const { round } = Math
const negativeError = (name: string) => `${name} must not be negative.`
const decimalError = (name: string) => `${name} must not be a decimal.`
const passAttemptsError = (name: string) => `${name} cannot exceed pass attempts.`

const handlePassAttemptsErrors = (passAttempts: number, touchdowns: number, interceptions: number) => {
    const name: string = 'Pass attempts'
    if (passAttempts !== round(passAttempts)) return decimalError(name)
    if (passAttempts < 0) return negativeError(name)
    if (passAttempts < touchdowns + interceptions) {
        return `${name} cannot be less than the sum of touchdowns and interceptions.`
    }
    return ''
}

const handlePassCompletionsErrors = (passCompletions: number, passAttempts: number) => {
    const name: string = 'Pass completions'
    if (passCompletions !== round(passCompletions)) return decimalError(name)
    if (passCompletions < 0) return negativeError(name)
    if (passCompletions > passAttempts) return passAttemptsError(name)
    return ''
}

const handlePassYardsErrors = (passYards: number, passCompletions: number) => {
    if (passYards > 0 && passCompletions === 0) {
        return `Pass yards cannot be positive when completions is zero.`
    }
    if (passYards > passCompletions * 100) {
        return `Pass yards cannot exceed 100 yards per completion.`
    }
    if (passYards < -(passCompletions * 100)) {
        return `Pass yards cannot be less than -100 yards per completion.`
    }
    return ''
}

const handleTouchdownsErrors = (touchdowns: number, passAttempts: number, passCompletions: number) => {
    const name: string = 'Touchdowns'
    if (touchdowns !== round(touchdowns)) return decimalError(name)
    if (touchdowns < 0) return negativeError(name)
    if (touchdowns > passAttempts) {
        return `${name} cannot exceed pass attempts. Please include only passing touchdowns.`
    }
    if (touchdowns > passCompletions) {
        return `${name} cannot exceed pass completions. Please include only passing touchdowns.`
    }
    return ''
}

const handleInterceptionsErrors = (interceptions: number, passAttempts: number, passCompletions: number) => {
    const name: string = 'Interceptions'
    if (interceptions > passAttempts - passCompletions) return `Interceptions cannot exceed incompletions.`
    if (interceptions !== round(interceptions)) return decimalError(name)
    if (interceptions < 0) return negativeError(name)
    if (interceptions > passAttempts) return `${name} cannot exceed pass attempts.`
    return ``
}

export {
    handlePassAttemptsErrors,
    handlePassCompletionsErrors,
    handlePassYardsErrors,
    handleTouchdownsErrors,
    handleInterceptionsErrors,
}