Run ```npm i``` in the testing directory to install the neccessary packages.

Then run the tests either with 
```
node loadTester.js
```
or
```
artillery run artillery.yml
```

Both files ```loadTester.js``` and ```artillery.yml``` have configuration options explained in the comments, so you can test production, local, or shattrath, and send 100, 1000, or n requests at a time.