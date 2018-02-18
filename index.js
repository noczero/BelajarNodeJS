const SerialPort = require('serialport'); //import package
const portNumber = "COM31" || process.argv[2] ; // ambil argument ke 2 di command
console.log("Argument 2 :  " + portNumber); // nampilin port Number
const myPort = new SerialPort(portNumber, {
	baudRate : 57600
}); // buat object serial port

//parser biar ga nampilin buffer
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
	delimiter : '\r\n'
});

myPort.pipe(parser); // using parser 

// event yang dipanggil ketika serial port kebuka. pake 'open'
myPort.on('open', ()=> {
	console.log("Arduino Connected on" + portNumber);

	let timeOut = 3000; // 3detik
	setTimeout(()=> {
		// kirim command 1 ke arduino
		myPort.write('1', (err)=> {
			if(err)
				console.log(err); // munculin error
			else 
				console.log("success write 1"); // kalo ga error kasih notif
		});
	},timeOut);
});
// event yang munculin data dari arduino. pake 'data'
parser.on('data', (data)=> {
	console.log(data);
});
