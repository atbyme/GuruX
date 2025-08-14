GuruX ■■
GuruX is an AI-powered knowledge assistant that connects users with expert-level insights via
natural conversations. It integrates cutting-edge AI models from DeepSeek and Mistral AI to deliver
precise and context-aware responses. The project includes both frontend and backend
components, providing a full-stack experience.
■ Live Demo → https://gurux-rho.vercel.app
■ Features
- ■ Real-time AI interaction using DeepSeek and Mistral AI APIs
- ■ Smart assistant designed to answer a wide variety of questions
- ■ Clean, responsive frontend built with React
- ■ Backend integration for API calls and logic separation
- ■ Scalable and modular folder structure
■ Tech Stack
Frontend:
- React
- Vite
- Tailwind CSS
Backend:
- Node.js
- Express
AI:
- DeepSeek AI
- Mistral AI
■ Project Structure
GuruX/
■■■ frontend/ # React frontend
■ ■■■ src/
■ ■■■ pages/
■ ■■■ components/
■ ■■■ App.jsx
■■■ server/ # Express backend
■ ■■■ index.js
■■■ README.md
■■ Installation
1. Clone the repository
$ git clone https://github.com/atbyme/GuruX.git
$ cd GuruX
2. Install Frontend Dependencies
$ cd frontend
$ npm install
3. Install Backend Dependencies
$ cd ../server
$ npm install
4. Environment Variables
Create a .env file in the server directory with your API keys:
DEEPSEEK_API_KEY=sk-deepseek-xxxxxxxxxxxx
MISTRAL_API_KEY=sk-mistral-xxxxxxxxxxxx
■■ Run the Project
Start Backend
$ cd server
$ node index.js
Start Frontend
$ cd frontend
$ npm run dev
Then go to http://localhost:5173 in your browser.
■ Sample Usage
- Ask: "Explain quantum physics in simple terms"
- Ask: "What is the latest trend in AI?"
- GuruX will respond using DeepSeek or Mistral AI models in real-time.
■ Contributing
1. Fork this repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit (`git commit -m 'Add new feature'`)
5. Push (`git push origin feature-name`)
6. Open a Pull Request
■ License
This project is licensed under the MIT License.
■ Author
GitHub: https://github.com/atbyme
■ Contact
■ Email: atbyme@gmail.com
■ Portfolio: https://gurux-rho.vercel.app
> Built with ■ passion and powered by AI.
