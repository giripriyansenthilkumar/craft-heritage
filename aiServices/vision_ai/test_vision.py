import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from vision_ai.image_classifier import classify_craft_image

def test_pottery_image():
    print("="*70)
    print("VISION AI - CRAFT IMAGE CLASSIFICATION TEST")
    print("="*70)
    
    image_path = Path(__file__).parent.parent / "images" / "Pottery.png"
    
    if not image_path.exists():
        print(f"\n✗ Image not found: {image_path}")
        print("\nPlease ensure Pottery.png is in the images/ folder")
        return
    
    print(f"\n📸 Testing with image: {image_path.name}")
    print(f"   Location: {image_path}")
    print("\nClassifying image...")
    
    try:
        result = classify_craft_image(str(image_path))
        
        print("\n" + "="*70)
        print("CLASSIFICATION RESULTS:")
        print("="*70)
        print(json.dumps(result, indent=2))
        
        print("\n" + "="*70)
        print("SUMMARY:")
        print("="*70)
        print(f"✓ Craft Type: {result['craft_type']}")
        print(f"✓ Materials Detected: {', '.join(result['materials_detected'])}")
        print(f"✓ Possible Region: {result['possible_region']}")
        print(f"✓ Confidence: {result['confidence']:.2%}")
        print(f"✓ Model: {result['meta']['model']}")
        print(f"✓ Generated At: {result['meta']['generated_at']}")
        
        print("\n" + "="*70)
        print("✓ Vision AI test completed successfully!")
        print("="*70)
        
    except Exception as e:
        print(f"\n✗ Error during classification: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_pottery_image()

