// Web Audio API drum synthesizer for parade ground marching cadence.
// Produces bass drum and snare drum taps at official military BPM without any external audio files.

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    audioCtx = new AudioContextClass()
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume()
  }
  return audioCtx
}

/** Bass drum punch on left foot ("DUM") */
export function playBassDrum(): void {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    const now = ctx.currentTime
    osc.frequency.setValueAtTime(140, now)
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.12)

    gain.gain.setValueAtTime(1.0, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.18)
  } catch {
    // Audio context may be blocked by browser autoplay policy before gesture
  }
}

/** Snare / side drum snap on right foot ("TAK") */
export function playSnareDrum(): void {
  try {
    const ctx = getAudioContext()
    const now = ctx.currentTime

    // White noise burst for the snare rattle
    const bufferSize = ctx.sampleRate * 0.1
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 1200

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.6, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noise.start(now)
    noise.stop(now + 0.1)
  } catch {
    // Ignore
  }
}
