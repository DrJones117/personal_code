#include <stdio.h>
// Variables that lie outside of any functions reside in global scope. 
int result = 0;

int add (int x, int y) {
    // All are named 'result', but reside in there own local spaces.
    int result = x + y;

    return result;
}

int subtract (int x, int y) {
    // All are named 'result', but reside in there own local spaces.
    int result = x - y;

    return result;
}

int main () {
    // VARIABLE SCOPE
    // It is where a variable is recognized and accessible. 
    // 2 variables in the same scope cannot have the same name.

    // All are named 'result', but reside in there own local spaces.
    int result = add(3, 4);
    int result = subtract(3, 4);

    printf("%d", result);


    return 0;
}