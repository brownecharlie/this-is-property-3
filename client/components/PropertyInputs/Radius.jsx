import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Select from 'antd/lib/select';
import 'antd/lib/select/style/css';

import { RADIUS_VALUES } from '../../constants/formValues';

import { updateRadius } from '../../actions/propertyInputs';

class Radius extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.onUpdateRadius(parseInt(value));
  }

  get selectOptions() {
    return RADIUS_VALUES.map(item => (
      <Select.Option key={item}>{item === 0 ? 'This area only' : `Within ${item} miles`}</Select.Option>
    ));
  }

  render() {
    const { radius } = this.props;

    return (
      <div className="PropertyInputs-radius">
        <span>Distance from location </span>
        <Select onChange={this.onChange} value={`${radius}`}>
          {this.selectOptions}
        </Select>
      </div>
    );
  }
}

Radius.propTypes = {
  radius: PropTypes.number,
};

const mapStateToProps = (state) => ({
  radius: state.propertyInputs.radius,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateRadius(amount) {
    dispatch(updateRadius(amount));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radius);
