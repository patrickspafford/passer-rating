import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const StyledPaper = withStyles({
    root: {
      minWidth: '400px',
      margin: 'auto',
      backgroundColor: 'lightblue',
    }
})(Paper)

export default StyledPaper