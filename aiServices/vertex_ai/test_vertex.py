import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from vertex_ai.story_service import generate_story
from vertex_ai.lesson_service import generate_lesson

def test_story_generation():
    print("="*70)
    print("VERTEX AI - STORY GENERATION TEST")
    print("="*70)
    
    craft_name = "Pottery"
    category = "pottery"
    region = "India"
    
    print(f"\nGenerating story for:")
    print(f"  Craft: {craft_name}")
    print(f"  Category: {category}")
    print(f"  Region: {region}")
    print("\nThis may take 10-30 seconds...\n")
    
    try:
        result = generate_story(craft_name, category, region)
        
        print("="*70)
        print("STORY TEXT:")
        print("="*70)
        print(result["text"])
        
        print("\n" + "="*70)
        print("STORY JSON STRUCTURE:")
        print("="*70)
        print(f"✓ Craft: {result['json']['craft_name']}")
        print(f"✓ Region: {result['json']['region']}")
        print(f"✓ Category: {result['json']['category']}")
        print(f"\nStory Fields:")
        for key in result['json']['story'].keys():
            print(f"  ✓ {key}")
        
        print(f"\n✓ Story generation successful!")
        return True
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        return False

def test_lesson_generation():
    print("\n" + "="*70)
    print("VERTEX AI - LESSON GENERATION TEST")
    print("="*70)
    
    craft_name = "Pottery"
    category = "pottery"
    region = "India"
    
    print(f"\nGenerating lesson for:")
    print(f"  Craft: {craft_name}")
    print(f"  Category: {category}")
    print(f"  Region: {region}")
    print("\nThis may take 10-30 seconds...\n")
    
    try:
        result = generate_lesson(craft_name, category, region)
        
        print("="*70)
        print("LESSON PLAN:")
        print("="*70)
        print(f"Title: {result['lesson_title']}")
        print(f"\nIntroduction:")
        print(f"  {result['introduction']}")
        print(f"\nMaterials ({len(result['materials_required'])} items):")
        for i, material in enumerate(result['materials_required'][:3], 1):
            print(f"  {i}. {material}")
        if len(result['materials_required']) > 3:
            print(f"  ... and {len(result['materials_required']) - 3} more")
        
        print(f"\nSteps ({len(result['steps'])} steps):")
        for i, step in enumerate(result['steps'][:2], 1):
            print(f"  {i}. {step[:80]}...")
        if len(result['steps']) > 2:
            print(f"  ... and {len(result['steps']) - 2} more steps")
        
        print(f"\nQuiz ({len(result['quiz'])} questions):")
        print(f"  Q1: {result['quiz'][0]['question']}")
        print(f"      Answer: {result['quiz'][0]['answer']}")
        
        print(f"\n✓ Lesson generation successful!")
        return True
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        return False

if __name__ == "__main__":
    story_ok = test_story_generation()
    lesson_ok = test_lesson_generation()
    
    print("\n" + "="*70)
    if story_ok and lesson_ok:
        print("✓ ALL VERTEX AI TESTS PASSED!")
    else:
        print("✗ Some tests failed")
    print("="*70)

