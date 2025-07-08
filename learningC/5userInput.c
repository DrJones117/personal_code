#include <stdio.h>
#include <string.h>

int main() {

    // Setting variables to a default prevents undefined behavior.
    int age = 0;
    float gpa = 0.0f;
    char grade = '\0';
    char name[30] = "";

    printf("Enter your age: ");
    // Accepts user input.
    scanf("%d", &age);

    printf("Enter your gpa: ");
    scanf("%f", &gpa);
    
    printf("Enter your grade: ");
    scanf(" %c", &grade);

    getchar();
    printf("Enter your Full Name: ");
    // "file get string" this will let us read white space.
    fgets(name, sizeof(name), stdin);
    name[strlen(name) - 1] = '\0';



    
    printf("%s\n", name);
    printf("%d\n", age);
    printf("%.2f\n", gpa);
    printf("%c\n", grade);


    return 0;
}