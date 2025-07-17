#include <stdio.h>

void happyBirthdayFunction (char birthdayBoy[], int yearsOld) {
    printf("\nHappy birthday to you!\n");
    printf("\nHappy birthday to you!\n");
    printf("\nHappy birthday dear %s!\n", birthdayBoy);
    printf("\nHappy birthday to you!\n");
    printf("\nYou are %d year old!\n", yearsOld);
}

int main () {
    // FUNCTIONS
    // A reusable section of code that we can call it anytime we want.
    char name[] = "Judah";
    int age = 21;

    // Instead of this...
    // printf("\nHappy birthday to you!\n");
    // printf("\nHappy birthday to you!\n");
    // printf("\nHappy birthday dear [name]!\n");
    // printf("\nHappy birthday to you!\n");

    // printf("\nHappy birthday to you!\n");
    // printf("\nHappy birthday to you!\n");
    // printf("\nHappy birthday dear [name]!\n");
    // printf("\nHappy birthday to you!\n");

    // printf("\nHappy birthday to you!\n");
    // printf("\nHappy birthday to you!\n");
    // printf("\nHappy birthday dear [name]!\n");
    // printf("\nHappy birthday to you!\n");
    
// We can do this.
    happyBirthdayFunction(name, age);
    happyBirthdayFunction(name, age);
    happyBirthdayFunction(name, age);

    return 0;
}
