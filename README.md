# authoring-eval

OLI Authoring Evaluator is a sandboxed expression evaluation engine and web service for template questions. It allows for the creation of questions that have variables that can change for each student, so that each student has a different question. For example, one student may see a question asking to find the derivative of 8x^2, while another student may see 11x^4. In this case, the coefficient and the exponent are variables that can be a random number so that every number can have a different number.

The expression evaluator accepts a set of variable names and their expressions in a POST request and returns the evaluations. A sample of the POST payload can be found in the data directory as sample.json.

## Related repositories
* [authoring-client](https://github.com/Simon-Initiative/authoring-client) - Typescript/React/Redux editing client
* [authoring-server](https://github.com/Simon-Initiative/authoring-server) - Java server, REST API, bridge to OLI
* [authoring-dev](https://github.com/Simon-Initiative/authoring-dev) - Docker development environment for the course authoring platform
* [authoring-admin](https://github.com/Simon-Initiative/authoring-admin) - Elm admin client

## License
This software is licensed under the [MIT License](./LICENSE) © 2019 Carnegie Mellon University
