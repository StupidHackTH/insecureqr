import React, {Component} from 'react'
import Instascan from 'instascan'
import QRCode from 'qrcode.react'

import Footer from '../Footer'

import 'bootstrap/dist/css/bootstrap.css'
import './Scanner.css'

const LogViewer = ({logs}) => (
  <div className="col">
    {logs.map((log, index) => (
      <div className="row rounded border border-success bg-w" key={index}>
        <div className="col-4">
          <QRCode value={log} key={index} />
        </div>
        <div class="col-8 text-center">
          <button class="btn btn-success w100p">
            ID: <span class="badge badge-primary">{log}</span>
          </button>
          <button class="btn btn-danger w100p">Print at PrintAt</button>
          <button class="btn btn-primary w100p">Download</button>
        </div>
      </div>
    ))}
  </div>
)

export default class Scanner extends Component {
  state = {qr: '', logs: []}

  async componentDidMount() {
    const scanner = new Instascan.Scanner({video: this.video})

    scanner.addListener('scan', qr => {
      this.setState({qr, logs: [qr, ...this.state.logs]})
    })

    try {
      const cameras = await Instascan.Camera.getCameras()

      if (cameras.length > 0) {
        scanner.start(cameras[0])
      } else {
        console.warn('No cameras found.')
      }
    } catch (e) {
      console.error(e)
    }
  }

  render = () => (
    <div>
      <div className="container">
        <h1 className="tx-w text-center">HOW SECURE YOUR QR ?</h1>
        <div className="row">
          <div className="col">
            <video ref={ref => (this.video = ref)} />
            <h1 className="btn-success">{this.state.logs[0]}</h1>
          </div>
          <LogViewer logs={this.state.logs} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
