import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyPlaying: false,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.togglePlayPreview = this.togglePlayPreview.bind(this);
    this.renderPreviewIcon = this.renderPreviewIcon.bind(this);
  }
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  renderAction() {
    if (this.props.isRemoval) {
      return <i   className="Track-action fa fa-minus-circle"
                  onClick={this.removeTrack}></i>
    }
    return <i   className="Track-action fa fa-plus-circle"
                onClick={this.addTrack}></i>
  }
  togglePlayPreview() {
    const audio = this.refs.audio;
    if (!this.state.currentlyPlaying) {
      audio.play();
      this.setState({
        currentlyPlaying: true,
      });
    } else {
        audio.pause();
        this.setState({
          currentlyPlaying: false,
        });
    }
  }
  renderPreviewIcon() {
    if(this.props.track.preview) {
      if (!this.state.currentlyPlaying) {
        return (
          <i  className="fa fa-play Track-preview-icon"
              aria-hidden="true"
              onClick={this.togglePlayPreview}></i>
        );
      } else {
        return (
          <i  className="fa fa-pause Track-preview-icon"
              aria-hidden="true"
              onClick={this.togglePlayPreview}></i>
        );
      }
    } else {
      return <p className="Track-preview-unavailable">No <br/> Preview <br />Available</p>
      }
  }
  render() {
    return(
      <div className="Track" key={this.props.track.id}>
        <div className="Track-cover-preview">
          <audio ref="audio" src={this.props.track.preview} onEnded={() => this.setState({ currentlyPlaying: false })}></audio>
          <div className="Track-preview-container">
            {this.renderPreviewIcon()}
          </div>
          <img className="Track-album-cover" src={this.props.track.cover} alt="album cover"/>
        </div>
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
