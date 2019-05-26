import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  onSubmit = formValues => {
    const { editStream, match } = this.props;
    editStream(match.params.id, formValues);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm 
          onSubmit={this.onSubmit} 
          initialValues={_.pick(this.props.stream, 'title', 'description')}
        />
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

const mapDispatchToProps = { fetchStream, editStream };

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);