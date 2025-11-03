import json
import re
from typing import Dict, Any
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from vertex_ai.model_gemini import get_gemini_model
from vertex_ai.prompt_templates import get_story_prompt
from shared.utils import add_metadata, create_hybrid_response

def parse_story_response(response_text: str) -> tuple:
    parts = response_text.split('JSON:', 1)
    
    if len(parts) < 2:
        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            json_text = json_match.group(0)
            story_text = response_text[:json_match.start()].strip()
            story_text = story_text.replace('STORY:', '').strip()
        else:
            story_text = response_text.replace('STORY:', '').strip()
            json_text = '{}'
    else:
        story_text = parts[0].replace('STORY:', '').strip()
        json_text = parts[1].strip()
    
    try:
        json_text = re.sub(r'```json\s*', '', json_text)
        json_text = re.sub(r'```\s*$', '', json_text)
        json_text = json_text.strip()
        
        story_data = json.loads(json_text)
    except json.JSONDecodeError:
        story_data = {
            "title": "Traditional Craft Story",
            "historical_origin": "Ancient craft with rich heritage.",
            "artisan_background": "Skilled artisans pass down techniques through generations.",
            "cultural_significance": "Important part of cultural identity.",
            "symbolism": "Represents tradition and craftsmanship.",
            "traditional_usage": "Used in daily life and ceremonies.",
            "why_unique": "Unique techniques and cultural context."
        }
    
    return story_text, story_data

def generate_story(craft_name: str, category: str, region: str) -> Dict[str, Any]:
    gemini = get_gemini_model()
    
    prompt = get_story_prompt(craft_name, category, region)
    
    print(f"Generating story for {craft_name}...")
    response = gemini.generate_content(prompt)
    
    story_text, story_data = parse_story_response(response)
    
    complete_json = {
        "craft_name": craft_name,
        "region": region,
        "category": category,
        "story": story_data
    }
    
    complete_json = add_metadata(complete_json, "gemini-pro")
    
    result = create_hybrid_response(story_text, complete_json)
    
    print("✓ Story generated successfully")
    return result

if __name__ == "__main__":
    result = generate_story(
        craft_name="Madhubani Painting",
        category="painting",
        region="Bihar, India"
    )
    
    print("\n" + "="*60)
    print("STORY TEXT:")
    print("="*60)
    print(result["text"])
    
    print("\n" + "="*60)
    print("STORY JSON:")
    print("="*60)
    print(json.dumps(result["json"], indent=2))

