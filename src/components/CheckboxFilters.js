import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  red,
  orange,
  yellow,
} from '@material-ui/core/colors';

const RedCheckbox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const OrangeCheckbox = withStyles({
  root: {
    color: orange[400],
    '&$checked': {
      color: orange[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const YellowCheckbox = withStyles({
  root: {
    color: yellow[400],
    '&$checked': {
      color: yellow[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CheckboxFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);

  const handleFilterChange = (type) => {
    let payload = {...filters};
    payload[type] = !payload[type];
    dispatch({
      type: 'SET_FILTERS',
      payload,
    });
  }
  return (
    <FormControl>
      <FormGroup>
        <FormControlLabel
          control={
            <RedCheckbox
              checked={filters.high}
              onChange={() => handleFilterChange('high')}
              name="high"
            />
          }
          label="High"
        />
        <FormControlLabel
          control={
            <OrangeCheckbox
              checked={filters.medium}
              onChange={() => handleFilterChange('medium')}
              name="medium"
            />
          }
          label="Medium"
        />
        <FormControlLabel
          control={
            <YellowCheckbox
              checked={filters.low}
              onChange={() => handleFilterChange('low')}
              name="low"
            />
          }
          label="Low"
        />
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxFilters;
