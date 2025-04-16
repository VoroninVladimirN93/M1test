# Test Project

This project serves as a technical test assignment. It contains several bugs and missing behaviors that need to be identified and fixed. Your main objectives are to:
 
- Make the project run.
- Fix bugs related to functionality and rendering.
- Propose enhancements to the existing logic, code, and project (implementation optional, but a detailed description is required). 

> 👉 Clone the repository to your local machine, replace the remote URL, create a new repository on your preferred platform, and push your solution there. Share the link to your completed solution. All your work, findings, and suggestions must be documented in a Markdown file named SOLUTION_REPORT.md

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.

### Launching the Project

1. Clone the repository
2. `docker compose up`

## Features

### List of Items

- Display a list of items
- "Set Active" button in each card to mark an item as active
- Automatic data refresh every 10 seconds
- Loading indicator shown during initial load or when data is unavailable
- Items are sorted by ID
- Search by ID

### Detail View

- View detailed information about a selected item
- Navigation between list and item detail views
- Items with id % 3 === 0 will return a 403 error intentionally (edge case handling required)

## Notes

- The intentional 403 error is a known case and should not be considered a bug.
- Feel free to comment inline or in a separate markdown file with your suggestions and reasoning.

## Goals of the Assignment

- Problem-solving and debugging skills
- Code clarity and structure
- Understanding of React and frontend best practices
- Ability to propose architectural and UX improvements
