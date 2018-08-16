# OLI Template Questions

## Variable Expressions

A templated question defines expressions that populate the values
of variables.  These expressions must be valid JavaScript expressions.

The following table documents the set of pre-built helper functions 
exist that one can use to author variable expressions.

|Function|Description|
|em.PI()            |Returns the value of PI (3.14159)|
|em.abs(x)           |Calculates the absolute value of x|
|em.ceil(x)          |Returns the smallest integer greater than or equal to x|
|em.cos(x)           |Calculates the cosine of x|
|em.exp(x)           |Calculates e^x|
|em.factorial(n)     |Calculates the factorial of n|
|em.floor(x)        |Returns the largest integer less than or equal to x|
|em.frac2Tex(n,d)     |Returns Latex representation of fraction n/d|
|em.fracA2(n,d)       |Returns comma separated representation of fraction n/d|
|em.gcd(a,b)          |Calculates the greatest common divisor of a and b|
|em.getAV(a,n)        |Select the nth element of collection a|
|em.log(n)           |Calculates the base 10 log of n|
|em.max(a,b)          |Returns the larger value of a or b|
|em.min(a,b)          |Returns the smaller value of a or b|
|em.mod(a,b)          |Return the remainder when a is divided by b |
|em.pow(x,n)           |Returns the number x raised to the n power|
|em.random()        |Returns a random decimal value between 0 and 1|
|em.random(a,b)       |Returns a random integer value between a and b, inclusive|
|em.random(a,b,n)       |Returns a random decimal value between a and b, inclusive, rounded to n decimal positions.  Example: em.random(1,2,2) = 1.24|
|em.randomArray   | |
|em.randomBetween | |
|em.randomInt     | |
|em.randomS(a,b,e)       |Returns a random integer beteen a and b, exluding any numbers found in the collection e|
|em.round(x,n)         |Rounds the decimal value x to n decimal positions|
|em.roundA        | |
|em.sin(x)           |Returns the sine of x|
|em.sizeStrs(c)      |Returns the length of the collection c|
|em.sqrt(x)          |Calculates the square root of x|
|em.tan(x)           |Calculates the tangent of x|
|em.toRadians(d)     |Converts the degrees d into radians|

