# AutoCart

AutoCart is an AI-based web application that acts as a machine customer, providing users with the best shopping experience by searching and recommending products from various e-commerce websites.

## Features

- **AI-Powered Search**: Uses AI to optimize search queries and find the best products.
- **Voice Recognition**: Allows users to search for products using voice commands.
- **Product Recommendations**: Displays the latest deals and search results with detailed information.
- **User Authentication**: Supports user login and signup.
- **Search History**: Keeps track of users' search history for easy access and repeat searches.

## Project Structure
AutoCart/ ├── AI/ │ ├── AI.py │ ├── PM.py │ ├── Scrapping.py │ ├── tavily_search.py │ ├── voice recognition.py │ └── .gitignore ├── frontend/ │ ├── public/ │ ├── src/ │ │ ├── app/ │ │ ├── components/ │ │ ├── layouts/ │ │ ├── pages/ │ │ ├── assets/ │ │ ├── lib/ │ │ ├── global.css │ │ ├── index.css │ │ ├── main.tsx │ │ ├── AppRoutes.tsx │ │ └── vite-env.d.ts │ ├── .gitignore │ ├── components.json │ ├── eslint.config.js │ ├── index.html │ ├── package.json │ ├── postcss.config.js │ ├── tailwind.config.js │ ├── tsconfig.app.json │ ├── tsconfig.json │ ├── tsconfig.node.json │ └── vite.config.ts ├── performance_model.pkl └── README.md


## Installation

### Prerequisites

- Node.js
- Python
- TensorFlow
- Selenium
- OpenAI API Key
- Tavily API Key

### Backend (AI)

1. Navigate to the `AI` directory:
   ```sh
   cd AI

2. Install the required Python packages:
   pip install -r requirements.txt

3.Set up environment variables in a .env file:
    OPENAI_KEY=your_openai_api_key
    TRAVITY_KEY=your_tavily_api_key

Frontend
    1.Navigate to the frontend directory:
           cd frontend
    2.Install the required Node.js packages:
            npm install
    3.Start the development server:
            npm run dev
    

Usage
    1.Open your browser and navigate to http://localhost:3000.
    2.Use the search form to find products.
    3.View the latest deals and search results.
    4.Use voice commands to search for products.
    5.Sign up or log in to save your search history.

Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

