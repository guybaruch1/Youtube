CXX = g++
CXXFLAGS = -std=c++17 -Wall

# Output executable
TARGET = server

# Source files
SRCS = main.cpp recommendations.cpp utilities.cpp

# Object files
OBJS = $(SRCS:.cpp=.o)

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)

clean:
	rm -f $(TARGET) $(OBJS)
