var io = require('socket.io')();
var debug = require('debug')('wpedemo');
const pidata = require('./pidata');

io.on('connection', function (socket) {
	debug(`websocket connected`);

	getAllPiData();
});


function getAllPiData() {
	debug('getting pi data');

	pidata.getOsInfo((err, osInfo) => {
		io.sockets.emit('osInfo', osInfo);
	});

	pidata.getBleDevices((err, bleDevices) => {
		io.sockets.emit('bleDevices', bleDevices);
	});

	pidata.getSerialPorts((err, serialPorts) => {
		io.sockets.emit('serialPorts', serialPorts);
	});

	pidata.getCpuTemperature((err, cpuTemperature) => {
		io.sockets.emit('cpuTemperature', cpuTemperature);
	});
}

setInterval(getAllPiData, 2*1000);

module.exports = io;