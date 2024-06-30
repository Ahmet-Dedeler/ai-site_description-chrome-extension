# URL Description Teller

![image](https://github.com/Ahmet-Dedeler/ai-site_description-chrome-extension/assets/105894172/12cdf0d8-f897-45a2-9776-139911fac9c8)



## What is it?

This Chrome extension tells you what a website is about before you visit it. It's like having a quick preview or a summary of the site's content.

## How does it work?

It uses AI to read the website's content and gives you a brief description. Here's how it's set up:

- Backend with FastAPI: This part talks to the AI service to get the website descriptions.
- Chrome Extension Frontend: This is what you interact with in your browser.

## Features

- Get quick summaries of websites with a click.
- Powered by AI for accurate descriptions.
- Simple and easy to use.

## How to start using it

1. Clone this repo to your computer
```bash
git clone https://github.com/Ahmet-Dedeler/ai-site_description-chrome-extension.git
```

2. Create a virtual environment
```bash
python -m venv openai-env

# Activate virtual environment (Linux/Mac)
source openai-env/bin/activate

# Activate virtual environment (Windows)
openai-env\Scripts\activate
```

3. Set up the backend by installing required packages
```bash
pip install -r requirements.txt
```

4. Create a .env file
   
5. Run the FastAPI server
```bash
uvicorn main:app --reload
```

6. Load the extension in Chrome by going to `chrome://extensions/`, turning on Developer mode, and loading the `frontend` folder.

## How to help out

If you have ideas for improvements or find a bug, feel free to contribute. Your input helps make this tool better for everyone.

## License

This project is open-source under the MIT License. You're free to use, change, and share it.
