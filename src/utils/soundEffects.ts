// Web Audio API Synthesizer & Dreamy Instrumental Background Music Engine
// Completely original, royalty-free, copyright-free soundscapes
// Sound is OFF by default, respects browser autoplay policies, and starts only on user interaction

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isMusicPlaying: boolean = false;
  
  // Ambient Music Nodes
  private masterMusicGain: GainNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private musicInterval: number | null = null;
  private currentChordIndex: number = 0;

  // Dreamy chord progressions (Amaj9 -> F#m9 -> Dmaj9 -> E6)
  // Frequencies in Hz: [Bass, Fifth, 7th/9th, High Note]
  private readonly chords: number[][] = [
    [110.00, 164.81, 207.65, 277.18], // Amaj9 / A2, E3, G#3, C#4
    [92.50, 138.59, 174.61, 220.00],  // F#m9 / F#2, C#3, F3, A3
    [146.83, 220.00, 277.18, 369.99], // Dmaj9 / D3, A3, C#4, F#4
    [164.81, 246.94, 329.63, 440.00], // E6 / E3, B3, E4, A4
  ];

  // Celestial sparkle / bell frequencies (Pentatonic Dream Scale)
  private readonly bellNotes: number[] = [
    554.37, // C#5
    659.25, // E5
    739.99, // F#5
    830.61, // G#5
    987.77, // B5
    1108.73, // C#6
    1318.51, // E6
  ];

  constructor() {
    this.isMuted = true;
    this.isMusicPlaying = false;
  }

  private initCtx(): boolean {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return !!this.ctx;
  }

  public toggleMute(): boolean {
    const initialized = this.initCtx();
    if (!initialized) return true;

    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBackgroundMusic();
    } else {
      this.playChime();
      this.startBackgroundMusic();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playHover() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio safety
    }
  }

  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1080, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio safety
    }
  }

  public playChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [554.37, 659.25, 830.61, 1108.73]; // C#5, E5, G#5, C#6
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.07);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.07 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.07);
        osc.stop(this.ctx.currentTime + i * 0.07 + 0.45);
      });
    } catch {
      // Audio safety
    }
  }

  public playWaterDispense() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(480, this.ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(380, this.ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Audio safety
    }
  }

  public playLaserScan() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(950, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(320, this.ctx.currentTime + 0.16);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch {
      // Audio safety
    }
  }

  // --- DREAMY INSTRUMENTAL BACKGROUND MUSIC ENGINE ---

  public startBackgroundMusic() {
    if (this.isMusicPlaying || !this.ctx) return;
    try {
      this.isMusicPlaying = true;
      const now = this.ctx.currentTime;

      // Master music volume with soft limiter/compressor
      this.masterMusicGain = this.ctx.createGain();
      this.masterMusicGain.gain.setValueAtTime(0.001, now);
      // Clearly audible, soothing volume (0.12)
      this.masterMusicGain.gain.linearRampToValueAtTime(0.12, now + 1.8);
      this.masterMusicGain.connect(this.ctx.destination);

      // Play initial pad chord
      this.playChord(this.chords[this.currentChordIndex]);

      // Cycle chords every 5.5 seconds & play gentle falling bell notes
      let tick = 0;
      this.musicInterval = window.setInterval(() => {
        if (!this.isMusicPlaying || !this.ctx) return;

        // Progress chord progression
        tick++;
        if (tick % 4 === 0) {
          this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
          this.playChord(this.chords[this.currentChordIndex]);
        }

        // Play gentle celestial starlight chime
        this.playMelodicBell();
      }, 1400);

    } catch (e) {
      console.warn('Background music initialization prevented:', e);
    }
  }

  private playChord(frequencies: number[]) {
    if (!this.ctx || !this.masterMusicGain || !this.isMusicPlaying) return;
    try {
      const now = this.ctx.currentTime;

      // Soft low-pass filter to give warm analog anime film quality
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 2.5);
      filter.frequency.exponentialRampToValueAtTime(800, now + 5.0);
      filter.connect(this.masterMusicGain);

      // Clean up previous chord oscillators
      this.activeOscillators.forEach((osc) => {
        try {
          osc.stop(now + 1.2);
        } catch {
          // Ignore
        }
      });
      this.activeOscillators = [];

      frequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Layer warm sine and soft triangle
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Gentle envelope with slow attack and release
        const voiceGain = idx === 0 ? 0.35 : 0.2;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(voiceGain, now + 1.5);
        gain.gain.setValueAtTime(voiceGain, now + 4.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 5.5);

        osc.connect(gain);
        gain.connect(filter);

        osc.start(now);
        osc.stop(now + 5.6);
        this.activeOscillators.push(osc);
      });
    } catch {
      // Audio safety
    }
  }

  private playMelodicBell() {
    if (!this.ctx || !this.masterMusicGain || !this.isMusicPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const randomNote = this.bellNotes[Math.floor(Math.random() * this.bellNotes.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomNote, now);

      // Soft celestial bell ping
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.masterMusicGain);

      osc.start(now);
      osc.stop(now + 1.85);
    } catch {
      // Audio safety
    }
  }

  public stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }

    if (this.masterMusicGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.masterMusicGain.gain.setValueAtTime(this.masterMusicGain.gain.value, now);
        this.masterMusicGain.gain.linearRampToValueAtTime(0.001, now + 0.8);
      } catch {
        // Ignore
      }
    }

    setTimeout(() => {
      this.activeOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore
        }
      });
      this.activeOscillators = [];
      if (this.masterMusicGain) {
        try {
          this.masterMusicGain.disconnect();
        } catch {
          // Ignore
        }
        this.masterMusicGain = null;
      }
    }, 850);
  }
}

export const soundManager = new SoundManager();
