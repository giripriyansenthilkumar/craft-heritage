import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from story_service import generate_story

def test_story_generation():
    print("="*70)
    print("CRAFT STORY GENERATION TEST")
    print("="*70)
    
    craft_name = "Madhubani Painting"
    category = "painting"
    region = "Bihar, India"
    
    print(f"\nGenerating story for:")
    print(f"  Craft: {craft_name}")
    print(f"  Category: {category}")
    print(f"  Region: {region}")
    print("\nThis may take 10-30 seconds...\n")
    
    try:
        result = generate_story(craft_name, category, region)
        
        print("="*70)
        print("STORY TEXT (2 paragraphs):")
        print("="*70)
        print(result["text"])
        
        print("\n" + "="*70)
        print("STORY JSON (structured data):")
        print("="*70)
        print(json.dumps(result["json"], indent=2))
        
        print("\n" + "="*70)
        print("✓ Story generation test completed successfully!")
        print("="*70)
        
    except Exception as e:
        print(f"\n✗ Error during story generation: {e}")
        print("\nMake sure you have:")
        print("1. Created a .env file with your GEMINI_API_KEY")
        print("2. Installed required packages: pip install google-generativeai python-dotenv")
        sys.exit(1)

if __name__ == "__main__":
    test_story_generation()

