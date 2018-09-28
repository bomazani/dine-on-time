import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import StepContent from './StepContent';
import AppMenuBar from '../AppMenuBar';
import { connect } from 'react-redux';
import AlertTimer from './AlertTimer';
import history from '../../history';
import { setActiveStepIndex, setPreviousStepIndex } from '../../redux/activeStepAction';
import { addAlertTimer } from '../../redux/alertTimersAction';

class StepLayout extends Component {
  componentDidMount() {
    this.props.setActiveStepIndex(this.props.activeStep);
  }

  render() {
    return (
      <Grid>
        <AppMenuBar />
        <Grid container style={{ height: '100%', width: '100%' }}>
          <Grid item xs={12}>
            <StepContent step={this.props.steps[this.props.activeStep]} />
          </Grid>
          <Grid item xs={12}>
            {this.props.alertTimers.map(timer => (
              <div key={timer.stepName}>
                <Typography variant="subheading"> {timer.stepName}: </Typography>
                <AlertTimer minutes={timer.alertTime / 60} />
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setActiveStepIndex: activeStep => dispatch(setActiveStepIndex(activeStep)),
    setPreviousStepIndex: activeStep => dispatch(setPreviousStepIndex(activeStep)),
  };
};

const mapStateToProps = state => {
  return {
    ...state,
    steps: state.recipe.steps,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepLayout);
