#include <iostream>
#include <cstring>     // For memset
#include <sys/types.h> // For sockets
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>    // For close
#include <arpa/inet.h> // For htons
#include <cstdio>      // For perror
#include <thread>      // For std::thread

void handle_client(int client_sock);

int main()
{
    const int server_port = 5555;
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0)
    {
        perror("error creating socket");
        return 1;
    }

    struct sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(server_port);

    if (bind(sock, (struct sockaddr *)&sin, sizeof(sin)) < 0)
    {
        perror("error binding socket");
        close(sock);  // Don't forget to close the main socket on error
        return 1;
    }

    if (listen(sock, 5) < 0)
    {
        perror("error listening to a socket");
        close(sock);  // Close the main socket on error
        return 1;
    }

    struct sockaddr_in client_sin;
    unsigned int addr_len = sizeof(client_sin);

    while (true) // Loop to handle multiple clients
    {
        int client_sock = accept(sock, (struct sockaddr *)&client_sin, &addr_len);
        if (client_sock < 0)
        {
            perror("error accepting client");
            continue;  // Continue to the next iteration of the loop to accept new clients
        }

        // Create a new thread to handle communication with this client
        std::thread client_thread(handle_client, client_sock);
        client_thread.detach();  // Detach the thread to let it run independently
    }

    close(sock);  // Close the main server socket
    return 0;
}

void handle_client(int client_sock) {
    char buffer[4096];
    int expected_data_len = sizeof(buffer);
    
    while (true) {
        int read_bytes = recv(client_sock, buffer, expected_data_len, 0);
        if (read_bytes == 0) {
            std::cout << "Connection closed by client" << std::endl;
            break;
        } else if (read_bytes < 0) {
            perror("error receiving from client");
            break;
        } else {
            std::cout << "open request: " << buffer << std::endl;
            std::cout << "Message from client: " << buffer << std::endl;
        }

        // Echo back the same message to the client
        int sent_bytes = send(client_sock, buffer, read_bytes, 0);
        if (sent_bytes < 0) {
            perror("error sending to client");
            break;
        }
    }

    // Close the client socket after communication ends
    close(client_sock);
}
