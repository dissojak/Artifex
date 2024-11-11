Contributing to Artifex
We welcome contributions of all kinds to Artifex! Whether you are reporting bugs, suggesting features, or submitting code, we appreciate your help in improving the project. Below are the guidelines for contributing.

How to Contribute
Fork the Repository
Start by forking the Artifex repository to your GitHub account.

Create a Branch
Use a descriptive name for your branch. For example:

bash
Copier le code
git checkout -b feature/add-new-feature
git checkout -b bugfix/fix-issue-123
Make Your Changes

Ensure your code follows the existing style and conventions.
Write tests if applicable to cover your changes.
Run Tests
Before submitting your contribution, ensure all tests pass by running:

bash
Copier le code
npm test
or the appropriate command for the test suite being used.

Commit Your Changes
Write clear and concise commit messages:

sql
Copier le code
git commit -m "Add feature to support XYZ"
Push to Your Fork
Push the changes to your forked repository:

csharp
Copier le code
git push origin feature/add-new-feature
Submit a Pull Request (PR)
Open a pull request against the main Artifex repository:

Clearly describe your changes and link any related issues.
Make sure all CI checks pass before finalizing the PR.
Participate in the Review
Be responsive to feedback from the project maintainers. You may be asked to make changes before the PR can be merged.

Reporting Bugs
If you find a bug, please create an issue in the GitHub repository. Make sure to include:

A clear and descriptive title.
Steps to reproduce the issue.
Any error logs or screenshots, if available.
Suggesting Features
We welcome new ideas! When suggesting a feature:

Open a GitHub issue labeled as a "Feature Request".
Provide a detailed explanation of the feature, why it would be useful, and how it could be implemented.
Coding Guidelines
Follow the existing code style and linting rules.
Ensure your code is well-documented, including comments where necessary.
Write meaningful tests for new functionality.
License
By contributing to Artifex, you agree that your contributions will be licensed under the same license as the project.
