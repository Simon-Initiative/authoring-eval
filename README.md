# expression-eval

A sandboxed expression evaluation engine and web service for template questions.

Accepts a set of variable names and their expressions in a POST request and returns
their evaluation.

Look in data directory for samples of the POST payload.

## Running via docker

Build the image:

```
docker build -t sandbox .
```

Then run it:

```
docker run -d -p 8000:8000 sandbox
```





