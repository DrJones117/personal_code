#include <stdio.h>
#include <stdbool.h>

int main () {
    // Nested If Statements

    float price = 10.00;
    bool isStudent = true;
    bool isSenior = false;

    if (isStudent) {
        if (isSenior) {
            printf("You get a student discount of 10%\n");
            printf("You get a senior discount of 20%\n");
            price *= 0.7;
        }
        else {
            printf("You get a student discount of 10%\n");
            price *= 0.9;
        }
    }
    else {
            printf("You get a senior discount of 20%\n");
    }

    printf("The price of a ticket is: %.2f\n", price);
    price *= 0.8;

    return 0;
}