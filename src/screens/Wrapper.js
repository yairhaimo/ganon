import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

export default inject('store')(
  observer(
    class WrapperScreen extends Component {
      render() {
        return;
      }
    }
  )
);
