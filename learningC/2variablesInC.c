#include <stdio.h>
// We have to add this header in order to work with booleans
#include <stdbool.h>


int main() {
    // first variable

    // Whole Numbers
    int age = 21;
    int year = 2025;
    int quantity = 2;

    printf("You are %d years old\n", age);
    printf("The Year is %d\n", year);
    printf("You have ordered %d items\n", quantity);

    // Decimal Number
    float gpa = 4.0;
    float price = 9.99;
    float temperature = -10.1;

    // Use %f to display floats. 
    // %.2f trucates the number to 2 decimal points.
    printf("Your GPA is %.2f\n", gpa);
    printf("The price is $%.2f usd\n", price);
    printf("The temperature is %.1f°F\n", temperature);

    // floats can only store 6 to 7 digits
    // We use doubles for more precision.
    // Doubles store 15 to 16 digits.
    double pi = 3.14159265;
    double e = 2.718281828459045235360;

    // %lf is "Long Float"
    printf("The value of PI is %.8lf\n", pi);
    printf("The value of e is %.15lf\n", e);

    // Characters
    char grade = 'A';
    char symbol = '!';
    char currency = '$';

    // %c is used to display a character.
    printf("Your grade is %c\n", grade);
    printf("This symbol is %c\n", symbol);
    printf("This currency is %c\n", currency);

    // Curiously, C does not have strings
    // Instead we use an array of characters []
    char name[] = "Judah";
    char food[] = "Pizza";
    char email[] = "email123@email.com";

    // We use %s to display strings.
    printf("Hello %s\n", name);
    printf("%s is really good\n", food);
    printf("Your email is %s\n", email);

    // Booleans
    //You could also use 1 and 0 in place of true or false.
    bool isOnline = true;
    bool isStudent = true;
    bool forSale = false;

    printf("Online: %d\n", isOnline);
    printf("Student?: %d\n", isStudent);
    printf("For Sale?: %d\n", forSale);

    return 0;
}