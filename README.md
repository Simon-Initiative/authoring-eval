# OLI Template Questions

OLI Expression Evaluator is a sandboxed expression evaluation engine and web service for template questions. It allows for the creation of questions that have variables that can change for each student, so that each student has a different question. For example, one student may see a question asking to find the derivative of 8x^2, while another student may see 11x^4. In this case, the coefficient and the exponent are variables that can be a random number so that every number can have a different number.

The expression evaluator accepts a set of variable names and their expressions in a POST request and returns the evaluations. A sample of the POST payload can be found in the data directory as sample.json.

## Getting Started
### Creating templated questions:

After going into the course, navigate to Assessments and click on “Question pool.” When you create a new question, there will be an “Add Variable” button, where a variable will be created. In the expression textbox, you would add a supported function that the variable would equal. For example, if you add em.randomInt(1, 10), the variable would hold a random value in between 1 and 10.

In order to add your variable into your question, you would put “@” symbols around your variable. For example @v1@.

### Overview of variables and functions:

- Variables are values that store data and can be changed throughout your program. In these templated questions, variables will change depending on your questions so that in the end students taking your courses will have different outputs and answers.

- A function is a section of a program that performs some sort of task. Some functions take in inputs and does some sort of task or calculation before giving an output. This can help making your questions.

## Supported Functions:

A templated question defines expressions that populate the values of variables.  These expressions must be valid JavaScript expressions.

The following table documents the set of pre-built helper functions exist that one can use to author variable expressions.

em.PI – Returns the value of PI (3.14159265…)
Example Usage:
```
> em.PI
3.141592653589793
```
em.abs(x) – Returns the absolute value of x.
Example Usage:
```
> em.abs(-5)
5
```
em.ceil(x) – Returns the smallest integer greater than or equal to x.
Example Usage:
```
> em.ceil(10.01)
11
```

em.cos(x) – Calculates the cosine of x, where x is in radians.
Example Usage:
```
> em.cos(em.PI)
-1
```
em.exp(x) – Calculates e^x.
Example Usage:
```
> em.exp(1)
2.718281828459045
```
em.factorial(n) – Calculates n!. em.factorial(0) evaluates to 1.
Example Usage:
```
> em.factorial(4)
24
```
em.floor(x) – Returns the greatest integer less than or equal to x.
Example Usage:
```
> em.floor(4.99)
4
```
em.frac2Tex(n, d) – Returns Latex representation of fraction n/d.
Example Usage:
```
> em.frac2Text(3, 4)
\frac{3}{4}
```
em.fracA2(n, d) – Returns comma separated representation of fraction n/d.
Example Usage:
```
> em.fracA2(3, 4)
3,4
```
em.gcd(a, b) – Calculates the greatest common divisor of a and b. Function throws an error if a or b is not a non-negative integer.
Example Usage:
```
> em.gcd(20,40)
20
```
em.getAV(a, n) – Select the nth element of collection a.
Example Usage:
```
> em.getAV(“1,2,3”, 1)
1
```
em.log(n, base = Math.E) – Returns the log of n. If base is not specified, then base is defaulted at e.
Example Usage:
```
> em.log(Math.E)
1
> em.log(10, 5)
1.4306765580733933
```
em.max(a, b) – Returns the larger value of a or b.
Example Usage:
```
> em.max(10, 12)
12
```
em.min(a, b) – Returns the smaller value of a or b.
Example Usage:
```
> em.min(10, 12)
10
```
em.mod(a, b) – Return the remainder when a is divided by b.
Example Usage:
```
> em.mod(10, 3)
1
```
em.pow(x, n) – Returns the number x raised to the n power.
Example Usage:
```
> em.pow(2, 3)
8
```
em.random() – Returns a random decimal value in between 0 and 1, not including 1 (i.e., (0, 1)))
Example Usage:
```
> em.random()
0.1391582373170438
```
em.random(a, b) – Returns a random integer between a and b, inclusive.
Example Usage:
```
> em.random(1, 3)
2
```
em.random(a, b, n) – Returns a random decimal value in between a and b (including a, excluding b) rounded to n decimal positions. Example: em.random(1,2,2) may return 1.24. Numbers such as 3.210 will return as 3.21.
Example Usage:
```
> em.random(1, 3, 2)
2.73
```
em.randomArray(arr) – Returns a random element in the array.
Example Usage:
```
> arr = [1, 2, 3, 4, 5]
[ 1, 2, 3, 4, 5 ]
> em.randomArray(arr)
4
```
em.randomInt(min, max) – Returns a random integer between min and max. Does not include max (i.e. [min, max)]
Example Usage:
```
> em.randomInt(4, 10)
8
```
em.randomBetween(l, u) – Returns a random floating point between l and u, excluding u.
Example Usage:
```
> em.randomBetween(20, 40)
37.80287023915099
```
em.randomS(lower, upper, e) – Returns a random integer between lower and upper, excluding any numbers found in the collection e. Returns null if there is no number in between lower and upper that is not in collection e.
Example Usage:
```
> em.randomS(0, 25, “1,2,3,4,5,6,7”)
21
```
em.round(x) – Rounds x to 1 decimal position. Example: em.round(3.26).
```
> em.round(3.26)
3.3
```
em.roundA(x, n) – Rounds x to n decimal positions. Numbers such as 3.210 will return as 3.21.
Example Usage:
```
> em.roundA(3.123123, 3)
3.123
```
em.sin(x) – Returns the sine of x, where x is the angle in radians.
Example Usage:
```
> em.sin(em.PI)
0
```
em.sizeStrs(arr) – Returns the length of the collection arr.
Example Usage:
```
> em.sizeStrs(“1,2,3”)
3
```
em.sqrt(x) – Calculates the square root of x.
Example Usage:
```
> em.sqrt(36)
6.0
```
em.tan(x) – Calculates the tangent of x.
Example Usage:
```
> em.tan(0)
0
```
em.toRadians(d) – Converts the degrees d into radians.
Example Usage:
```
> em.toRadians(360)
6.283185307179586
```
