import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from image_classifier import classify_craft_image

def test_image_classifier():
    print("="*70)
    print("CRAFT IMAGE CLASSIFIER TEST")
    print("="*70)
    
    print("\nUsage Example:")
    print("-" * 70)
    print("from image_classifier import classify_craft_image")
    print("result = classify_craft_image('path/to/craft/image.jpg')")
    print("print(json.dumps(result, indent=2))")
    
    print("\n" + "="*70)
    print("EXPECTED OUTPUT FORMAT:")
    print("="*70)
    
    sample_output = {
        "craft_type": "pottery",
        "materials_detected": ["clay", "traditional_materials"],
        "possible_region": "South Asia",
        "confidence": 0.85,
        "meta": {
            "model": "resnet50",
            "generated_at": "2024-01-01T12:00:00Z"
        }
    }
    
    print(json.dumps(sample_output, indent=2))
    
    print("\n" + "="*70)
    print("TO TEST WITH YOUR OWN IMAGE:")
    print("="*70)
    print("1. Place an image file in the aiServices folder")
    print("2. Update the image_path variable below")
    print("3. Run: python aiServices/test_image.py")
    
    print("\n✓ Test script ready. Add your image path to run classification.")

if __name__ == "__main__":
    test_image_classifier()

