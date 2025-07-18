#include <stdio.h>
// Standard...

// return type "int".
// int square (int num) {
//     int result = num * num;

//     return result;
// }

// more concise version...

int square (int num) {
    return num * num;
}

int main () {
    // RETURN STATEMENTS
    int x = square(2);
    int y = square(3);
    int z = square(4);

    printf("%d\n", x);
    printf("%d\n", y);
    printf("%d\n", z);



    return 0;
}