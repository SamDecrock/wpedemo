import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			osInfo: null,
			bleDevices: null,
			serialPorts: null,
			cpuTemperature: null
		};

		socket.on('osInfo', osInfo => {
			this.setState({osInfo: osInfo});
		});

		socket.on('bleDevices', bleDevices => {
			this.setState({bleDevices: bleDevices});
		});

		socket.on('serialPorts', serialPorts => {
			this.setState({serialPorts: serialPorts});
		});

		socket.on('cpuTemperature', cpuTemperature => {
			this.setState({cpuTemperature: cpuTemperature});
		});
	}



	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col col-sm-4 mb-4">{this.renderCpuTemperature()}</div>
					<div className="col col-sm-4 mb-4">{this.renderOsInfo()}</div>
					<div className="col col-sm-4 mb-4">{this.renderSerialPorts()}</div>
					<div className="col col-sm-4 mb-4">{this.renderBleDevices()}</div>
					<div className="col col-sm-4 mb-4">{this.renderVideo()}</div>
					<div className="col col-sm-4 mb-4">{this.renderCss3Animation()}</div>
				</div>
			</div>
		);
	}

	renderCpuTemperature() {
		if(!this.state.cpuTemperature) return '';

		return (
			<div className="card">
				<div className="card-img-top" style={{backgroundImage: 'url("/images/icons8-temperature-96.png")'}}/>
				<div className="card-body">
					<h5 className="card-title">CPU Temperature</h5>
					<p className="card-text">{this.state.cpuTemperature} °C</p>
				</div>
			</div>
		);
	}

	renderOsInfo() {
		if(!this.state.osInfo) return '';

		return (
			<div className="card" style={{width: '100%'}}>
				<div className="card-img-top" style={{backgroundImage: 'url("/images/icons8-raspberry-pi-zero-96.png")'}}/>
				<div className="card-body">
					<h5 className="card-title">Operating system</h5>
					<p className="card-text">
						<b>hostname: </b>{this.state.osInfo.hostname}<br />
						<b>memory: </b>{this.state.osInfo.memory.free} / {this.state.osInfo.memory.total}<br />
						<b>uptime: </b>{this.state.osInfo.uptime} seconds<br />
						<b>model: </b>{this.state.osInfo.model}<br />
					</p>
				</div>
			</div>
		);
	}

	renderSerialPorts() {
		if(!this.state.serialPorts) return '';


		var serialPortsHtml = this.state.serialPorts.map(serialPort => {
			return (
				<span key={serialPort.comName}><b>{serialPort.manufacturer?serialPort.manufacturer:'<unknown>'}: </b>{serialPort.comName}<br /></span>
			);
		});

		return (
			<div className="card" style={{width: '100%'}}>
				<div className="card-img-top" style={{backgroundImage: 'url("/images/icons8-rs-232-male-96.png")'}}/>
				<div className="card-body">
					<h5 className="card-title">Serial Ports</h5>
					<p className="card-text">
						{serialPortsHtml}
					</p>
				</div>
			</div>
		);
	}

	renderBleDevices() {
		if(!this.state.bleDevices) return '';


		var bleDevicesHtml = this.state.bleDevices.map(bleDevice => {
			return (
				<span key={bleDevice.address}><b>{bleDevice.name?bleDevice.name:'<unknown>'}: </b>{bleDevice.address}<br /></span>
			);
		});

		return (
			<div className="card" style={{width: '100%'}}>
				<div className="card-img-top" style={{backgroundImage: 'url("/images/icons8-bluetooth-96.png")'}}/>
				<div className="card-body">
					<h5 className="card-title">BLE Devices</h5>
					<p className="card-text">
						{bleDevicesHtml}
					</p>
				</div>
			</div>
		);
	}

	renderVideo() {
		return (
			<div className="card">
				<video autoPlay loop style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
					<source src="/video/trailer_iphone.m4v" type="video/mp4" />
				</video>
			</div>
		);
	}

	renderCss3Animation() {
		// https://tympanus.net/codrops/2012/05/22/creating-an-animated-3d-bouncing-ball-with-css3/
		return (
			<div className="card">
				<img className="css3image" src="/images/icons8-raspberry-pi-zero-96.png" />
			</div>
		);
	}



}

window.socket = io.connect(window.location.host);
ReactDOM.render(<App />, document.querySelector('#app'));