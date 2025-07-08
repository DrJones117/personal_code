#include <stdio.h>
#include <string.h>


int main() {

    // Shopping Cart Program

    char item[50] = "";
    float price = 0.0f;
    int quantity = 0;
    char currency = '$';
    float total = 0;

    printf("What Item would you like to buy?: ");
    fgets(item, sizeof(item), stdin);
    item[strlen(item) - 1] = '\0';

    printf("What is the price?: ");
    scanf("%f", &price);

    printf("How many would you like?: ");
    scanf("%d", &quantity);

    total = price * quantity;

    printf("\nYou have bought %d %s/s\n", quantity, item);
    printf("Your total is: %c%.2f",currency, total);

    return 0;
}