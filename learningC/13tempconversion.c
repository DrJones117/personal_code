#include <stdio.h>

int main() {
    // Temperature Converter

    char choice = '\0';
    float Fahrenheit = 0.0f;
    float Celsius = 0.0f;

    printf("Temperature Conversion Program.");
    printf("C. Celsius to Fahrenheit\n");
    printf("Is the temp in Celsius\n");
    printf("Is the temp in Celsius (C) or in Fahrenheit (F)?: ");
    scanf("%c", &choice);

    if(choice == 'C') {
        // C to F
        printf("Enter the Temperature in Celsius: ");
        scanf("%f", &Celsius);
        Fahrenheit = (Celsius * 9 / 5) + 32;
        printf("%.1f Celsius is equal to %.1f Fahrenheit\n", Celsius, Fahrenheit);

    }
    else if (choice == 'F')
    {
        //F to C
        printf("Enter the Temperature in Fahrenheit: ");
        scanf("%f", &Fahrenheit);
        Celsius = (Fahrenheit - 32) * 5 / 9;
        printf("%.1f Fahrenheit is equal to %.1f Celsius\n", Fahrenheit, Celsius);


    }
    else {
        printf("Invalid choice! Please select C or F\n");
    }

    return 0;
}