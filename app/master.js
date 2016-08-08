import AudioContext from './audio-context';

class Master {

  constructor({audioContext, numberOfChannels = 10} = {}) {
    if(!audioContext) {
      audioContext = new AudioContext();
    }
    const gain = audioContext.createGain();
    const patch = audioContext.createChannelMerger(numberOfChannels);
    gain.connect(audioContext.destination);
    patch.connect(gain);
    Object.assign(this, {audioContext, gain, patch, numberOfChannels});
  }

  set channels(channels = []) {
    for(let channel of channels) {
      channel.connect(this.patch);
    }
  }

}

export default Master;
