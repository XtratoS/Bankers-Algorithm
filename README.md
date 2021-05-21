# Banker's Algorithm Virtualization Project
## What is it?
This is a project that virtualizes the Banker's Algorithm studied in the Operating Systems course in Computer and Systems Engineering in Ain Shams University.
Our textbook is Operating System Concepts 10th edition.
This application was created using React framework.
## How to use it?
### Hosting the application
#### Using the live version from github pages
https://xtratos.github.io/Bankers-Algorithm/
#### Deploying on a Local Machine
##### Prerequisites
- I created this app while using node version 15.8.0 and npm version 7.5.1, other versions will most probably work but it's not guaranteed.
##### Deployment
1. clone the respository
2. install node dependancies using `npm install`
3. run the applicated using `npm run start`
### Using the application
#### State Management
On the first page there are 2 choices to start using the app
1. To start a brand new state by specifying the number of resources in the system.
2. By using a pre-saved state to restore it and use it.
#### Control Buttons
- Add Process:
  - Adds a new process to the existing system.
- Show Need Matrix:
  - Shows the need matrix below the process matrix.
- Check System Safety
  - Checks the system safety in the current state and provides a sequence of processes that creates a safe state.
- Check Request Safety
  - Checks whether the system will be in a safe state after requesting some resources for a specific process.
  - Note that you can also do the request manually by adding the requested resources to the allocated resources section and removing them from the available section.
- Save State:
  - Provides a string which represents the current state of the system, this string can be used later to restore the current system state.
- Reset:
  - Ditches the current state and resets the website to the initial state.
### Reading the output
The output is always shown in a modal, the possible outcomes  are
#### When checking system safety
- **Yes, Safe state** <seq>  
When the system is in a safe state
- **No**  
  When the system is not in safe state
#### When making a Request
- **Yes, the request can be granted with safe state, Safe state <seq>**  
   When the request can be granted
- **No**  
  When the request can't be granted
seq is a sequence of operations which guarantees system safety, example for a sequence: ``<P0, P3, P2, P4, P1>``
### Additional Features to the original specification
- Interactive UI.
- Ability to save and restore states using a state string.
