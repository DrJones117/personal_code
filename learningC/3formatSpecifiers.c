#include <stdio.h>

int main() {
    // Format Specifiers control how data ins displayed andd interpreted.

    int age = 21;
    float price = 19.99;
    double pi = 3.1415926535;
    char currency = '$';
    char name[] = "Judah";

    printf("%d\n", age);
    printf("%f\n", price);
    printf("%lf\n", pi);
    printf("%c\n", currency);
    printf("%s\n\n", name);

    int num1 = 1; 
    int num2 = 10; 
    int num3 = 100; 


    // You can also use a plus to display whether the number is positive or negative.
    printf("%d\n", num1);
    printf("%4d\n", num2);
    printf("%-4d\n\n", num3);

    float price1 = 19.99;
    float price2 = 1.50;
    float price3 = -199;

    // ".2" can be used to display the specified number of digits after the decimal point.
    printf("%+8.2F\n", price1);
    printf("%+10.3f\n", price2);
    printf("%+12.4f\n", price3);

    return 0;
}