# OLI Template Questions

OLI Expression Evaluator is a sandboxed expression evaluation engine and web service for template questions. It allows for the creation of questions that have variables that can change for each student, so that each student has a different question. For example, one student may see a question asking to find the derivative of 8x^2, while another student may see 11x^4. In this case, the coefficient and the exponent are variables that can be a random number so that every number can have a different number.

The expression evaluator accepts a set of variable names and their expressions in a POST request and returns the evaluations. A sample of the POST payload can be found in the data directory as sample.json.
