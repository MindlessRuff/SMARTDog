#include <stdint.h>
#include <stdio.h>

long latitude = 0;
long longitude = 0;
static uint8_t myData[4];

int main()
{
    latitude = 11709123;
    longitude = 011;
    myData[0] = latitude >> 24;
    myData[1] = latitude >> 16;
    myData[2] = latitude >> 8;
    myData[3] = latitude;

    printf("Lat: %ld\n", latitude);
    for (int i = 0; i < 4; i++)
    {
        printf("%x\n", myData[i]);
    }

    long long_var = (myData[0] << 24) | (myData[1] << 16) | (myData[2] << 8) | myData[3];
    printf("long: %ld\n", long_var);

    return 0;
}
