#include <stdio.h>

int main() {

    // The arithmetic operators are " = + - * / % ++ --"

    int x = 2;
    int y = 3;
    int z = 0;

    // addition
    z = x + y;
    printf("%d\n", z);

    //subtraction
    z = x - y;
    printf("%d\n", z);

    // mutiplication
    z = x * y;
    printf("%d\n", z);

    // division
    // We will get 0 in this case because integers can't store decimal points.
    // If we divide by an integer, we cannot retain the decimal portion.
    z = x / y;
    printf("%d\n", z);

    // Modulo
    // This gives you the remainder of any division.
    z = x % y;
    printf("%d\n", z);

    // increment
    x++;
    printf("%d\n", x);

    // decrement
    x--;
    printf("%d\n", x);

    // alternative increment
    x += 3;
    printf("%d\n", x);

    // alternative decrement
    x -= 3;
    printf("%d\n", x);

    // All of these can done this way "+=, -=, *= /="
    // These are called augmented assignment operators.

    return 0;
}