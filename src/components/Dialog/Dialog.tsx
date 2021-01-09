
import React, { useState } from 'react';
import { CSVLink } from 'react-csv'
import { Button, List, ListItem, ListItemText, DialogTitle, Dialog } from '@material-ui/core'
import TocIcon from '@material-ui/icons/Toc'
import CSVPlayer from '../../types/CSVPlayer'
import CSVHeader from '../../types/CSVHeader'


export interface SimpleDialogProps {
  open: boolean
  onClose: (value: string) => void
  ncaaData: CSVPlayer[]
  nflData: CSVPlayer[]
  headers: CSVHeader[]
}

const SimpleDialog = ({ open, onClose, ncaaData, nflData, headers }: SimpleDialogProps) => (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle id="simple-dialog-title">Select Dataset</DialogTitle>
      <List>
      {nflData.length === 0 && ncaaData.length === 0 &&
          (<ListItem>
              <ListItemText>Save some players to download as CSV!</ListItemText>
          </ListItem>)
          }
        {ncaaData.length > 0 ?
            (<ListItem button>
                <CSVLink
                    data={ncaaData}
                    className='csvLink'
                    target='_blank'
                    filename='ncaa_passer_ratings.csv'
                    headers={headers}
                >
                    Download NCAA Passer Rating CSV
                </CSVLink>
            </ListItem>
            ) : (<div />)}
        {nflData.length > 0 ?
          (<ListItem button>
            <CSVLink
                data={nflData}
                target='_blank'
                className='csvLink'
                filename='nfl_passer_ratings.csv'
                headers={headers}
            >
                Download NFL Passer Ratings CSV
            </CSVLink>
          </ListItem>) : <div />}
          <ListItem>
          <a href="https://www.buymeacoffee.com/patrickspafford">
            <img
              style={{ width: 'unset', height: 'unset' }}
              alt='Sponsorship button'
              src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=patrickspafford&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"
            />
          </a>
          </ListItem>
      </List>
    </Dialog>
);

interface IDownloadDialog {
    ncaaData: CSVPlayer[]
    nflData: CSVPlayer[]
    headers: CSVHeader[]
  }

const DownloadDialog = ({ ncaaData, nflData, headers}: IDownloadDialog) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <TocIcon style={{ marginRight: '0.5rem' }}/> CSV
      </Button>
      <SimpleDialog
        ncaaData={ncaaData}
        nflData={nflData}
        headers={headers}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default DownloadDialog