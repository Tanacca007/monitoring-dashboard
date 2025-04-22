# Monitoring Dashboard

A real-time system monitoring dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- Real-time system metrics monitoring
- Interactive charts and visualizations
- Alert system for critical events
- User authentication
- Responsive design
- Comprehensive test coverage

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Chart.js
- Jest & React Testing Library

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Tanacca007/monitoring-dashboard.git
cd monitoring-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run tests:
```bash
npm test
```

5. Build for production:
```bash
npm run build
```

## Environment Variables

Copy `.env.example` to a new file named `.env` in the root directory and configure the variables for your environment.

```bash
cp .env.example .env
# Edit the .env file with your specific configuration
```

Important variables include:
- `REACT_APP_API_URL`: Your API endpoint
- `REACT_APP_REFRESH_INTERVAL`: Metrics refresh interval in milliseconds
- `REACT_APP_ENABLE_ALERTS`: Enable/disable the alert system

## Deployment

### GitHub

1. Create a new repository on GitHub
2. Initialize Git in your local project (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```
3. Connect your local repository to GitHub:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### Netlify

1. Push your code to GitHub
2. Sign in to Netlify and click "New site from Git"
3. Select your GitHub repository
4. Configure build settings:
   - Build command: `npm run build:netlify`
   - Publish directory: `build`
5. Add environment variables in the Netlify dashboard
6. Deploy your site

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
