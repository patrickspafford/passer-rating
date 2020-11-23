import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const StyledButton = withStyles({
    root: {
        margin: '1rem',
    },
    containedPrimary: {
        backgroundColor: '#03244D',
    },
})(Button)

export default StyledButton