// https://www.w3.org/TR/webcodecs-codec-registry/
import VideoProcessor from './VideoProcessor.js'
import Mp4Demuxer from './Mp4Demuxer.js'
import WebMWriter from '../deps/webm-writer2.js'
import CanvasRender from './CanvasRender.js'
import Service from './Service.js'

const qvgaConstraints = {
    width: 320,
    height: 240
} 
const vgaConstraints = {
    width: 640,
    height: 480
} 
const hdConstraints = {
    width: 1280,
    height: 720
} 

const encoderConfig = {
    ...qvgaConstraints,
    bitrate: 10e6,
    // webm
    codec: 'vp09.00.10.08',
    pt: 4,
    hardwareAcceleration: 'prefer-software',
    // // mp4
    // codec: 'avc1.42002A',
    // pt: 1,
    // hardwareAcceleration: 'prefer-hardware',
    // avc: { format: 'annexb' }
}

const service = new Service({ url: 'http://localhost:3000'})
const mp4Demuxer = new Mp4Demuxer()
const webMWriter = new WebMWriter({
    codec: 'VP9',
    width: encoderConfig.width,
    height: encoderConfig.height,
    bitrate: encoderConfig.bitrate,
})
const videoProcessor = new VideoProcessor({ mp4Demuxer, webMWriter, service })

onmessage = async ({ data: { file, canvas } }) => {
    const renderFrame = CanvasRender.getRender(canvas)

    await videoProcessor.start({ 
        file, 
        renderFrame,
        encoderConfig, 
        sendMessage: (message) => { 
            self.postMessage(message) 
        }
    })

    // self.postMessage({ status: 'done' })

    // while(true) {} // Nao trava a aplicacao no navegador
}
