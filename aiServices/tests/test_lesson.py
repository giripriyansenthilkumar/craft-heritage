import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from lesson_service import generate_lesson

def test_lesson_generation():
    print("="*70)
    print("CRAFT LESSON GENERATION TEST")
    print("="*70)
    
    craft_name = "Madhubani Painting"
    category = "painting"
    region = "Bihar, India"
    
    print(f"\nGenerating lesson for:")
    print(f"  Craft: {craft_name}")
    print(f"  Category: {category}")
    print(f"  Region: {region}")
    print("\nThis may take 10-30 seconds...\n")
    
    try:
        result = generate_lesson(craft_name, category, region)
        
        print("="*70)
        print("LESSON PLAN (complete JSON):")
        print("="*70)
        print(json.dumps(result, indent=2))
        
        print("\n" + "="*70)
        print("LESSON SUMMARY:")
        print("="*70)
        print(f"Title: {result.get('lesson_title', 'N/A')}")
        print(f"Materials: {len(result.get('materials_required', []))} items")
        print(f"Steps: {len(result.get('steps', []))} steps")
        print(f"Quiz Questions: {len(result.get('quiz', []))}")
        
        print("\n" + "="*70)
        print("✓ Lesson generation test completed successfully!")
        print("="*70)
        
    except Exception as e:
        print(f"\n✗ Error during lesson generation: {e}")
        print("\nMake sure you have:")
        print("1. Created a .env file with your GEMINI_API_KEY")
        print("2. Installed required packages: pip install google-generativeai python-dotenv")
        sys.exit(1)

if __name__ == "__main__":
    test_lesson_generation()

