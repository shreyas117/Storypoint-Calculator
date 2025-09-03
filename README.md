# Sprint Story Points Calculator

A modern, responsive web application built with Next.js and React to calculate story points for your development sprints across multiple platforms (Web, Android, iOS).

## Features

- **Multi-platform Support**: Calculate story points for Web, Android, and iOS teams
- **Flexible Configuration**: Adjustable business days per sprint (default: 10 days)
- **Leave Management**: Account for individual engineer leaves
- **Holiday Planning**: Factor in holidays that affect the entire team
- **Real-time Calculations**: Automatic updates as you modify inputs
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with intuitive icons

## How It Works

The calculator uses the following formula for each platform:

1. **Total Capacity** = Number of Engineers × Business Days
2. **Available Capacity** = Total Capacity - Leave Days - (Engineers × Holiday Days)
3. **Story Points** = (Available Capacity ÷ Business Days) × 8

Each engineer is expected to work on 8 story points per sprint under normal conditions.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Set Sprint Duration**: Adjust the total business days for your sprint (default: 10)

2. **Configure Each Platform**:
   - Enter the number of engineers for each platform
   - Add total leave days across all engineers for that platform
   - Specify holiday days that affect the entire platform team

3. **View Results**: The calculator automatically shows:
   - Individual platform story points
   - Total sprint story points
   - Capacity breakdown for each platform

## Example Scenarios

### Scenario 1: Normal Sprint
- Web: 3 engineers, 0 leaves, 0 holidays = 24 story points
- Android: 2 engineers, 0 leaves, 0 holidays = 16 story points  
- iOS: 2 engineers, 0 leaves, 0 holidays = 16 story points
- **Total: 56 story points**

### Scenario 2: With Leaves and Holidays
- Web: 3 engineers, 5 leave days, 1 holiday = 16 story points
- Android: 2 engineers, 2 leave days, 1 holiday = 11 story points
- iOS: 2 engineers, 0 leave days, 1 holiday = 14 story points  
- **Total: 41 story points**

## Technology Stack

- **Framework**: Next.js 14
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment Ready**: Optimized for Vercel, Netlify, or any hosting platform

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this tool for your team's sprint planning.
