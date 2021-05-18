# Banker's Algorithm Virtualization Project
## What is it?
This is a project that virtualizes the Banker's Algorithm studied in the Operating Systems course in Computer and Systems Engineering in Ain Shams University.
Our textbook is Operating System Concepts 10th edition.
This application was created using React framework.
## How to use it?
### Hosting the application
This is a React Application, for a live version go here #TODO_LIVE_APP_LINK
Otherwise you can host this application on your own machine.
### Using the application
#### State Management:
On the first page there are 2 choices to start using the app
1. To start a brand new state by specifying the number of resources in the system.
2. By using a pre-saved state to restore it and use it.
#### Control Buttons
- Save State:
  - Provides a string which represents the current state of the system, this string can be used later to restore the current system state.
- Add Process:
  - Adds a new process to the existing system.
- Evaluate Need Matrix:
  - Shows the need matrix below the process matrix.
- Check System Safety
  - Checks the system safety in the current state and provides a sequence of processes that creates a safe state.
- Check Request Safety
  - Checks whether the system will be in a safe state after requesting some resources for a specific process.
  - Note that you can also do the request manually by adding the requested resources to the allocated resources section and removing them from the available section.
### Additional Features to the original specification
- Interactive UI.
- Ability to save and restore states using a state string.