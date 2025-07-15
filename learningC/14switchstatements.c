#include <stdio.h>

int main () {
    // SWITCH STATEMENTS

    int dayOfWeek = 0;

    printf("Enter a day of the week (1 - 7)\n");
    scanf("%d", &dayOfWeek);

    switch (dayOfWeek)
    {
    case 1:
        printf("It is Monday.");
        break;
    
    case 2:
        printf("It is Tuesday.");
        break;
    case 3:
        printf("It is Wednesday");
        break;
    case 4:
        printf("It is Thursday.");
        break;
    case 5:
        printf("It is Friday");
        break;
    case 6:
        printf("It is Saturday.");
        break;
    case 7:
        printf("It is Sunday");
        break;
    case 0:
        printf("The secret day! Day ZERO!!!!!");
        break;
    default:
        printf("Please Enter a Number (1 - 7)");
        break;
    }



    return 0;
}