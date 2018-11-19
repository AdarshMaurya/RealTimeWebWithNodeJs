
//Creating Buffers -https://nodejs.org/api/buffer.html

/*

Prior to the introduction of TypedArray, the JavaScript language had
no mechanism for reading or manipulating streams of binary data.
The Buffer class was introduced as part of the Node.js API to enable interaction
with  octet streams in TCP streams, file system operations, and other contexts.
With TypedArray now available, the Buffer class implements the Uint8Array API
in a manner that is more optimized and suitable for Node.js.

Instances of the Buffer class are similar to arrays of integers but correspond to
fixed-sized, raw memory allocations outside the V8 heap.
The size of the Buffer is established when it is created and cannot be changed.

The Buffer class is within the global scope, making it unlikely that one would
need to ever use require('buffer').Buffer.

Node provides Buffer class which provides instances to store raw data similar to
an array of integers but corresponds to a raw memory allocation outside the V8 heap.
*/

//Buffer class is a global class that can be accessed in an application without importing the buffer module.


//Creates a zero-filled Buffer of length 10.
const buf1 = Buffer.alloc(10);
console.log(buf1);

//Creates a Buffer of 10, filled with 0x1
const buf2 = Buffer.alloc(10,1);
console.log(buf2);

// Creates an uninitialized buffer of length 10.
// This is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be
// overwritten using either fill() or write().
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);
console.log(buf3.toString());

// Creates a Buffer containing [0x1, 0x2, 0x3]
const buf4 = Buffer.from([1, 2, 3]);
console.log(buf4);
console.log(buf4.toString());

//Creates a Buffer containing UTF-8 bytes - <Buffer 74 65 73 74>
const buf5 = Buffer.from('test');
console.log(buf5);
console.log(buf5.toString());

//Creates a Buffer containing Latin-1 bytes
const buf6 = Buffer.from('test', 'latin1');
console.log(buf6);
console.log(buf6.toString());
console.log(buf6.toString('hex'));
console.log(buf6.toString('utf16le'));

//Buffers and Character Encodings
const buf = Buffer.from('hello world', 'ascii');
console.log(buf);
console.log(buf.toString());
console.log(buf.toString('hex'));
console.log(buf.toString('utf16le'));
console.log(buf.toString('base64'));
console.log(buf.toJSON());
