import React, { ReactElement } from 'react'
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const options = ['Option 1', 'Option 2']

const Filters = (): ReactElement<any, any> | null => {
  const [value, setValue] = React.useState<string | null>(options[0])
  const [inputValue, setInputValue] = React.useState('')

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="flex-start"
      alignItems="center">

      <Autocomplete
        size="small"
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />

    </Grid>
  )
}

export default Filters
