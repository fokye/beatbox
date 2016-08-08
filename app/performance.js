import Master from './master';
import Sequencer from './sequencer';

class Performance {

  constructor({performers = [], audioContext, tempo = 120, timeSignature = 4} = {}) {
    const master = new Master({audioContext, numberOfChannels: performers.length});
    const sequencer = new Sequencer({tempo, timeSignature});
    master.channels = performers;
    for(let performer of performers) {
      sequencer.register(function(eventType, event) {
        switch(eventType) {
          case 'step':
            performer.perform(event.measure, event.beat);
            break;
          case 'start':
            performer.start();
            break;
          case 'stop':
            performer.stop();
            break;
        }
      });
    }
    Object.assign(this, {master, sequencer});
  }

  start() {
    this.sequencer.start();
  }

  stop() {
    this.sequencer.stop();
  }

}

export default Performance;
