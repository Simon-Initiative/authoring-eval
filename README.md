# authoring-eval

[![Open Learning Initiative](https://oli.cmu.edu/wp-content/uploads/2018/10/oli-logo-78px-high-1.svg)](http://oli.cmu.edu/)

OLI Authoring Evaluator is a sandboxed expression evaluation engine and web service for dynamic questions. It allows for the creation of questions that have variables that can change for each student, so that each student has a different question. For example, one student may see a question asking to find the derivative of 8x^2, while another student may see 11x^4. In this case, the coefficient and the exponent are variables that can be a random number so that every number can have a different number.

The expression evaluator accepts a set of variable names and their expressions in a POST request and returns the evaluations. A sample of the POST payload can be found in the data directory as sample.json.

## Dynamic Questions
Dynamic questions can be created within question pools using the [Course Author](https://echo.oli.cmu.edu).

![Dynamic Question Editor](https://docs.oli.cmu.edu/dynamic-questions/img/variable_editor_example.png)

For more information on how to create dynamic questions, see [OLI Dynamic Questions](https://docs.oli.cmu.edu/dynamic-questions/).

## Related repositories
* [authoring-dev](https://github.com/Simon-Initiative/authoring-dev) - Docker development environment for the course authoring platform
* [authoring-client](https://github.com/Simon-Initiative/authoring-client) - Typescript/React/Redux editing client
* [authoring-server](https://github.com/Simon-Initiative/authoring-server) - Java server, REST API, bridge to OLI
* [authoring-admin](https://github.com/Simon-Initiative/authoring-admin) - Elm admin client

## License
This software is licensed under the [MIT License](./LICENSE) © 2019 Carnegie Mellon University
