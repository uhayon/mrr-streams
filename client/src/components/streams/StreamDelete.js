import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  onDeleteClick = () => {
    const { deleteStream, stream } = this.props;
    deleteStream(stream.id);
  }

  renderActions() {
    return (
      <React.Fragment>
        <button onClick={this.onDeleteClick} className='ui button negative'>Delete</button>
        <Link to='/' className='ui button'>Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    const { stream } = this.props;
    if (!stream) {
      return <p>Are you sure you want to delete this stream?</p>;
    }

    return <p>Are you sure you want to delete the stream: <strong>{stream.title}</strong>?</p>;
  }

  render() {
    return (
      <Modal
        title='Delete Stream'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

const mapDispatchToProps = { fetchStream, deleteStream };

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);