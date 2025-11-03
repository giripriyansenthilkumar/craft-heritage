import os
from typing import Optional
import google.generativeai as genai
from dotenv import load_dotenv

class GeminiModel:
    
    _instance: Optional['GeminiModel'] = None
    _model = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        load_dotenv()
        
        api_key = os.getenv('GEMINI_API_KEY')
        
        if not api_key:
            raise ValueError(
                "GEMINI_API_KEY not found in environment variables. "
                "Please create a .env file with your API key. "
                "See .env.example for reference."
            )
        
        genai.configure(api_key=api_key)
        
        self._model = genai.GenerativeModel('gemini-2.5-flash')
        
        print("✓ Gemini Pro model initialized successfully")
    
    def get_model(self):
        return self._model
    
    def generate_content(self, prompt: str) -> str:
        response = self._model.generate_content(prompt)
        return response.text

def get_gemini_model() -> GeminiModel:
    return GeminiModel()

