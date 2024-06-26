# Learning Journey: Building the URL Description Teller

## Introduction

This document outlines the journey and technical details behind creating the URL Description Teller, a Chrome extension designed to provide quick summaries of websites before you visit them. The project leverages AI to analyze and describe web content, offering users a glimpse into the site's purpose and content without having to navigate to it first.

## The Idea

The concept for the URL Description Teller was born out of the need for a tool that could help users understand what a website is about before clicking on it. With the vast amount of information available online, it can be time-consuming and sometimes risky to explore unknown websites. This tool aims to mitigate that by providing concise, AI-generated summaries.

## Technologies Used

- **FastAPI**: Chosen for its simplicity and performance, FastAPI serves as the backend framework. It handles requests from the Chrome extension and communicates with the AI service to fetch website descriptions.
- **Azure's OpenAI Service**: This AI service is used to analyze website content and generate summaries. It was selected for its advanced natural language processing capabilities.
- **Chrome Extension API**: The frontend of the project is a Chrome extension, built using standard web technologies (HTML, CSS, JavaScript) and the Chrome Extension API for integration with the Chrome browser.

## Development Process

### Backend Setup

1. **FastAPI Application**: Started by setting up a basic FastAPI application to handle requests from the extension.
2. **Integration with Azure's OpenAI Service**: Implemented functionality to send website content to Azure's OpenAI service and receive a summarized description.

### Chrome Extension Development

1. **Popup UI**: Created a simple popup UI that users interact with to get website descriptions.
2. **Background Script**: Developed a background script to fetch the current tab's URL and send it to the FastAPI backend.
3. **Content Script**: Used to extract the main content from the current webpage, which is then sent to the backend for summarization.

## Challenges Faced

- **Content Extraction**: Determining the most relevant content from a webpage to send for summarization was challenging. Implemented a heuristic-based approach to extract the main article or text body from a page.
- **Performance Optimization**: Ensuring the extension responded quickly required optimizing both the backend API calls and the content extraction process.

## Lessons Learned

- The importance of clear communication between the frontend and backend components in a web application.
- Advanced techniques in natural language processing and how they can be applied to real-world applications.
- The intricacies of developing a Chrome extension, especially around user interaction and performance considerations.

## Conclusion

Building the URL Description Teller was a rewarding experience that not only provided practical insights into web development and AI but also resulted in a useful tool that enhances the browsing experience. This project demonstrates the power of combining modern web technologies with advanced AI services to create innovative solutions.