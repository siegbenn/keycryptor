var crypto = require('crypto');
var fs = require('fs');
var encryptor = require('file-encryptor');
var path = require('path');

function createKey() {

	var key = crypto.randomBytes(256).toString('hex');
	fs.writeFile('key.txt', key, function(err) {
    		if(err) {
        		console.log(err);
    		} else {
        		console.log('Keyfile was saved.');
    		}
	}); 	
}

function encryptFile(keyPath, filePath) {

	fs.readFile(keyPath, {encoding: 'utf-8'}, function (err,data) {
		if (err){
			console.log(err);
		} else {
			encryptor.encryptFile(
    				path.join(__dirname, filePath),
    				path.join(__dirname, filePath + '.data'),
    				data,
    				function(err) {
      					console.log(filePath + ': Encryption complete.');
				}
			 );	
		}
	});
}

function decryptFile(keyPath, filePath) {
	fs.readFile(keyPath, {encoding: 'utf-8'}, function(err, data) {
		if (err) {
			console.log(err);
		} else {
			encryptor.decryptFile(
				path.join(__dirname, filePath),
				path.join(__dirname, 'decrypted.' + filePath),
				data,
				function(err) {
					console.log(filePath + ': Decryption complete.');
				}
			);
		}
	});
}

//encryptFile("key.txt", "key.txt");
decryptFile("key.txt", "key.txt.data");
