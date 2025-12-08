# Contributing to TrinityCore Studio

Thank you for your interest in contributing to TrinityCore Studio! This document provides guidelines and information for contributors.

## Code of Conduct

- Be respectful and inclusive
- Follow the TrinityCore community guidelines
- Help others learn and grow
- Report issues constructively

## How to Contribute

### Reporting Bugs

1. Check if the issue already exists in GitHub Issues
2. Create a new issue with a clear title and description
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - System information (OS, Node.js version)

### Suggesting Features

1. Open a GitHub Issue with the "enhancement" label
2. Describe the feature and its benefits
3. Explain how it fits into TrinityCore Studio's goals
4. Provide mockups or examples if possible

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/SpidermanTotro/AgentFoundry-TrinityCore-Studio.git
   cd AgentFoundry-TrinityCore-Studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development mode:
   ```bash
   npm run dev
   ```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Avoid `any` types - use proper typing
- Use interfaces for object shapes
- Document complex functions with JSDoc

### React

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component and variable names
- Avoid inline styles - use CSS modules
- Follow React best practices

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Max line length: 100 characters
- Run `npm run format` before committing

### File Organization

```
src/
├── main/              # Electron main process
│   ├── main.ts        # Entry point
│   └── preload.ts     # IPC bridge
├── renderer/          # React application
│   ├── components/    # React components
│   │   ├── ComponentName.tsx
│   │   └── ComponentName.css
│   ├── services/      # Business logic
│   ├── stores/        # State management
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   └── App.tsx        # Main app component
```

### Component Structure

```typescript
import React, { useState } from 'react';
import './ComponentName.css';

interface ComponentProps {
  // Props definition
  title: string;
  onAction: () => void;
}

const ComponentName: React.FC<ComponentProps> = ({ title, onAction }) => {
  const [state, setState] = useState<string>('');

  // Event handlers
  const handleClick = () => {
    // Logic here
  };

  return (
    <div className="component-name">
      {/* JSX here */}
    </div>
  );
};

export default ComponentName;
```

### CSS Guidelines

- Use BEM naming convention
- Organize styles by component
- Use CSS variables for colors and spacing
- Keep specificity low
- Mobile-first responsive design

### Git Commit Messages

Format: `<type>: <description>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

Examples:
```
feat: Add spell creator component
fix: Resolve server log filtering issue
docs: Update installation instructions
style: Format code with Prettier
refactor: Simplify database connection logic
```

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Test new features and bug fixes
- Use descriptive test names
- Test edge cases
- Mock external dependencies

### Manual Testing

Before submitting a PR:
1. Build the application: `npm run build`
2. Test in production mode: `npm start`
3. Test all affected features
4. Test on different platforms if possible

## Building

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Distribution

```bash
npm run build
# Package for distribution (future feature)
```

## Documentation

- Update README.md for new features
- Update QUICKSTART.md for user-facing changes
- Add JSDoc comments for complex functions
- Include code examples where helpful

## Project Goals

TrinityCore Studio aims to:
- Simplify TrinityCore development
- Provide intuitive GUI tools
- Support all major TrinityCore features
- Maintain high code quality
- Stay up-to-date with latest technologies

## Feature Guidelines

New features should:
- Solve a real problem for TrinityCore developers
- Integrate well with existing features
- Follow the established UI/UX patterns
- Be well-documented
- Include error handling
- Be performant

## Dependencies

### Adding Dependencies

1. Evaluate necessity - avoid bloat
2. Check license compatibility (GPL-3.0)
3. Verify maintenance status
4. Check bundle size impact
5. Document why it's needed

### Updating Dependencies

1. Review changelog
2. Test thoroughly
3. Update documentation if needed
4. Note breaking changes

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create release branch
4. Test thoroughly
5. Tag release: `git tag v1.x.x`
6. Push tag: `git push origin v1.x.x`
7. Create GitHub release with notes

## Getting Help

- GitHub Issues for bugs and features
- GitHub Discussions for questions
- TrinityCore Discord for general help
- Stack Overflow for programming questions

## Recognition

Contributors will be:
- Listed in release notes
- Credited in commit messages
- Recognized in the README (for significant contributions)

## License

By contributing, you agree that your contributions will be licensed under the GPL-3.0 License.

## Questions?

Feel free to ask questions by:
- Opening a GitHub Discussion
- Commenting on relevant issues
- Reaching out to maintainers

Thank you for contributing to TrinityCore Studio!
