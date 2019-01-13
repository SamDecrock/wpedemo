const fs = require('fs');
const os = require('os');
const lsbRelease = require('lsb-release');
const noble = require('noble');
const SerialPort = require('serialport');

function getOsInfo(callback) {
	var osInfo = {
		platform: os.platform(),
		arch: os.arch(),
		hostname: os.hostname(),
		memory: {
			free: os.freemem(),
			total: os.totalmem()
		},
		uptime: os.uptime()
	};


	lsbRelease(function (err, data) {
		if(!err) {
			osInfo.linux = data
		};

		fs.readFile('/proc/device-tree/model', 'utf8', (err, data) => {
			if(!err) {
				osInfo.model = data.trim().replace(/\u0000/, '');
			};

			callback(null, osInfo);
		});
	});
}

function getNetworkInterfaces(callback) {
	var networkInterfaces = os.networkInterfaces();
	callback(null, networkInterfaces);
}

function getBleDevices(callback) {
	var foundDevices = [];

	if(noble.state == 'poweredOn') {
		noble.startScanning();
	}else{
		noble.on('stateChange', (state) => {
			if(state == 'poweredOn') {
				noble.startScanning();
			}
		});
	}

	var stopScanningTimer = null;
	var callbackDone = false;

	function stopScanning() {
		noble.stopScanning();
		noble.removeAllListeners('stateChange');
		noble.removeAllListeners('discover');

		if(!callbackDone) callback(null, foundDevices);
		callbackDone = true;
	}

	noble.on('discover', (peripheral) => {
		if(peripheral.advertisement.localName) {
			foundDevices.push({
				address: peripheral.address,
				name: peripheral.advertisement.localName
			});
		}

		if(stopScanningTimer) {
			clearInterval(stopScanningTimer);
			stopScanningTimer = null;
		}
		stopScanningTimer = setTimeout(stopScanning, 1000);
	});
}

function getSerialPorts(callback) {
	SerialPort.list(callback);
}

function getCpuTemperature(callback) {
	fs.readFile('/sys/class/thermal/thermal_zone0/temp', 'utf8', (err, data) => {
		if(err) return callback(err);
		var temp = parseInt(data)/1000;
		callback(null, temp);
	});
}

exports.getOsInfo = getOsInfo;
exports.getBleDevices = getBleDevices;
exports.getSerialPorts = getSerialPorts;
exports.getCpuTemperature = getCpuTemperature;
