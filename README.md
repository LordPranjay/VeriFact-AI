# Verifact AI



Verifact AI is an open-source, real-time fact-checking platform designed to detect and combat misinformation across the web.  Verifact AI helps users verify the authenticity of news articles and social media posts. It consists of two main components:

- A web application (verifact-web)
- A Chrome browser extension (verifact-extension)

---
## Demo

[![Watch the demo](https://img.youtube.com/vi/bQNepG3mrLM/0.jpg)](https://youtu.be/bQNepG3mrLM)

---

## Features

- Real-time content analysis using Google's Gemini AI
- Authenticity scoring and verification
- Cross-reference checking with reliable sources
- Author verification
- Source credibility assessment
- Integration with Supabase for data persistence



##  Tech Stack

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| **Frontend**   | Next.js 13, React                     |
| **Styling**    | Tailwind CSS, @next/font (Inter)      |
| **State**      | React Hooks (`useState`, `useEffect`) |
| **Backend**    | Supabase (PostgreSQL, Auth)           |
| **AI Models**  | Google AI (Gemini)                    |
| **Deployment** | Vercel                                |

---

## Using the Extension

1. Click on the VeriFact AI extension icon in your Chrome toolbar
2. Click "Analyze Page" to check the current webpage
3. View the analysis results, including:
   - Authenticity score
   - Verification status
   - Supporting evidence
   - Related credible sources
   - Author verification
   - Cross-referenced sources

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "feat: add new feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

##  Acknowledgments

- Google Gemini AI for content analysis
- Supabase for backend services
- Next.js team for the web framework
- Chrome Extensions team for documentation and APIs

