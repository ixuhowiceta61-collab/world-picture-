// Generative Peaceful Ambient Audio using Web Audio API
// Self-contained soundscape mimicking calm ocean breeze and warm harmonic resonance

class AmbientSoundGenerator {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoGain: GainNode | null = null;
  private lfoOsc: OscillatorNode | null = null;
  private chimeTimer: number | null = null;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 2.5);
    this.masterGain.connect(this.ctx.destination);

    // Create 5 seconds buffer of pink/brownian noise for soft ocean swell
    const bufferSize = this.ctx.sampleRate * 5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brownian integration for deep soothing water/wind rumble
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    // Gentle low-pass filter
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);

    // LFO for slow tidal swell (waves rolling every 7 seconds)
    const swellGain = this.ctx.createGain();
    swellGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

    this.lfoOsc = this.ctx.createOscillator();
    this.lfoOsc.frequency.setValueAtTime(0.14, this.ctx.currentTime); // ~7s cycle

    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    this.lfoOsc.connect(this.lfoGain);
    this.lfoGain.connect(this.filterNode.frequency);

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.masterGain);

    this.noiseNode.start();
    this.lfoOsc.start();

    // Occasional subtle singing bowl chime
    this.scheduleChime();

    this.isPlaying = true;
  }

  private scheduleChime() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    
    // Play warm peaceful bell chime
    this.playSoftBell();

    // Schedule next chime between 12 and 22 seconds
    const nextInterval = 12000 + Math.random() * 10000;
    this.chimeTimer = window.setTimeout(() => {
      this.scheduleChime();
    }, nextInterval);
  }

  private playSoftBell() {
    if (!this.ctx || !this.masterGain) return;
    const freqs = [329.63, 440, 493.88, 587.33, 659.25]; // E major pentatonic
    const chosenFreq = freqs[Math.floor(Math.random() * freqs.length)];

    const osc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(chosenFreq, this.ctx.currentTime);

    bellGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    bellGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.1);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 5.0);

    osc.connect(bellGain);
    bellGain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 5.1);
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
      setTimeout(() => {
        try {
          this.noiseNode?.stop();
          this.lfoOsc?.stop();
          this.noiseNode?.disconnect();
          this.filterNode?.disconnect();
          if (this.chimeTimer) clearTimeout(this.chimeTimer);
        } catch {
          // ignore
        }
      }, 1000);
    }
    this.isPlaying = false;
  }
}

export const ambientSound = new AmbientSoundGenerator();
