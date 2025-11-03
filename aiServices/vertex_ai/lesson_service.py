import json
import re
from typing import Dict, Any
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from vertex_ai.model_gemini import get_gemini_model
from vertex_ai.prompt_templates import get_lesson_prompt
from shared.utils import add_metadata

def parse_lesson_response(response_text: str) -> Dict[str, Any]:
    json_text = re.sub(r'```json\s*', '', response_text)
    json_text = re.sub(r'```\s*$', '', json_text)
    json_text = json_text.strip()
    
    json_match = re.search(r'\{[\s\S]*\}', json_text)
    if json_match:
        json_text = json_match.group(0)
    
    try:
        lesson_data = json.loads(json_text)
        
        required_fields = [
            'lesson_title', 'introduction', 'materials_required',
            'steps', 'quiz', 'summary'
        ]
        
        for field in required_fields:
            if field not in lesson_data:
                raise ValueError(f"Missing required field: {field}")
        
        if len(lesson_data['quiz']) != 3:
            raise ValueError("Quiz must have exactly 3 questions")
        
        for i, question in enumerate(lesson_data['quiz']):
            if 'question' not in question or 'options' not in question or 'answer' not in question:
                raise ValueError(f"Quiz question {i+1} missing required fields")
            if len(question['options']) != 4:
                raise ValueError(f"Quiz question {i+1} must have 4 options")
        
        return lesson_data
        
    except (json.JSONDecodeError, ValueError) as e:
        print(f"Warning: Error parsing lesson response: {e}")
        return {
            "lesson_title": f"Introduction to Traditional Craft",
            "introduction": "This lesson will teach you the fundamentals of traditional craft-making, including materials, techniques, and cultural significance.",
            "materials_required": [
                "Primary material",
                "Tools",
                "Workspace",
                "Safety equipment",
                "Finishing materials"
            ],
            "steps": [
                "Step 1: Prepare your workspace and gather materials",
                "Step 2: Prepare the primary material",
                "Step 3: Begin the basic technique",
                "Step 4: Continue building the craft",
                "Step 5: Add details and refinements",
                "Step 6: Apply finishing touches",
                "Step 7: Allow to dry/set",
                "Step 8: Final inspection and corrections"
            ],
            "quiz": [
                {
                    "question": "What is the first step in the craft-making process?",
                    "options": [
                        "A) Prepare workspace and materials",
                        "B) Start crafting immediately",
                        "C) Apply finishing touches",
                        "D) Skip preparation"
                    ],
                    "answer": "A"
                },
                {
                    "question": "Why is traditional craft important?",
                    "options": [
                        "A) It's just a hobby",
                        "B) Cultural heritage and identity",
                        "C) No particular reason",
                        "D) Only for decoration"
                    ],
                    "answer": "B"
                },
                {
                    "question": "What should you do after completing the craft?",
                    "options": [
                        "A) Throw it away",
                        "B) Ignore it",
                        "C) Inspect and make corrections",
                        "D) Start a new one immediately"
                    ],
                    "answer": "C"
                }
            ],
            "summary": "You have learned the basic techniques and cultural significance of this traditional craft. Practice these skills to preserve this important cultural heritage."
        }

def generate_lesson(craft_name: str, category: str, region: str) -> Dict[str, Any]:
    gemini = get_gemini_model()
    
    prompt = get_lesson_prompt(craft_name, category, region)
    
    print(f"Generating lesson for {craft_name}...")
    response = gemini.generate_content(prompt)
    
    lesson_data = parse_lesson_response(response)
    
    lesson_data["craft_name"] = craft_name
    lesson_data["category"] = category
    lesson_data["region"] = region
    
    lesson_data = add_metadata(lesson_data, "gemini-pro")
    
    print("✓ Lesson generated successfully")
    return lesson_data

if __name__ == "__main__":
    result = generate_lesson(
        craft_name="Madhubani Painting",
        category="painting",
        region="Bihar, India"
    )
    
    print("\n" + "="*60)
    print("LESSON PLAN:")
    print("="*60)
    print(json.dumps(result, indent=2))

