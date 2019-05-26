import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Loading...</div>
    }

    const { title, description } = stream;
    return (
      <div>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
};

const mapDispatchToProps = { fetchStream };

export default connect(mapStateToProps, mapDispatchToProps)(StreamShow);