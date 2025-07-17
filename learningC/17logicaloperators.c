#include <stdio.h>
#include <stdbool.h>

int main () {
    // LOGICAL OPERATORS

    // && = AND
    // || = OR
    // ! = NOT

    int temp = 25;
    bool isSunny = false;

    // if (temp > 0 && temp < 30) {
    //     printf("The temperature is GOOD!");
    // }
    // else {
    //     printf("The temperature is BAD!");
    // }

    // if (temp <= 0 || temp >= 30) {
    //     printf("The temperature is BAD!");
    // }
    // else {
    //     printf("The temperature is GOOD!");
    // }


    // If it is NOT sunny
    // If "isSunny" is NOT equal to true.
    if (!isSunny) {
        printf("If is CLOUDY outside.");
    }
    else {
        printf("If is SUNNY outside.");
    }

    return 0;
}