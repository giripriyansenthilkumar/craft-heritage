import requests
import json
from pathlib import Path
import time

BASE_URL = "http://localhost:5000"
API_BASE = f"{BASE_URL}/ai"

def print_header(title):
    print("\n" + "="*80)
    print(f"  {title}")
    print("="*80)

def print_response(response):
    print(f"\n📊 Status Code: {response.status_code}")
    print(f"📄 Response:")
    print(json.dumps(response.json(), indent=2))

def test_health_check():
    print_header("TEST 1: HEALTH CHECK")
    
    try:
        response = requests.get(f"{API_BASE}/health")
        print_response(response)
        
        if response.status_code == 200:
            print("\n✅ Health check passed!")
            return True
        else:
            print("\n❌ Health check failed!")
            return False
            
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Cannot connect to API server")
        print("💡 Make sure to run: python3 app.py")
        return False
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return False

def test_classify_image():
    print_header("TEST 2: IMAGE CLASSIFICATION (Vision AI)")
    
    image_path = str(Path(__file__).parent / "images" / "Pottery.png")
    
    print(f"\n📸 Test Image: {image_path}")
    
    payload = {
        "image": image_path
    }
    
    try:
        print("\n🔄 Sending request to /ai/classify_image...")
        start_time = time.time()
        
        response = requests.post(
            f"{API_BASE}/classify_image",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        elapsed_time = time.time() - start_time
        
        print_response(response)
        
        if response.status_code == 200:
            data = response.json()['data']
            print(f"\n✅ Classification successful!")
            print(f"   ⏱️  Time: {elapsed_time:.2f}s")
            print(f"   🎨 Craft Type: {data['craft_type']}")
            print(f"   🧱 Materials: {', '.join(data['materials_detected'])}")
            print(f"   🌍 Region: {data['possible_region']}")
            print(f"   📊 Confidence: {data['confidence']:.2%}")
            return True
        else:
            print("\n❌ Classification failed!")
            return False
            
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return False

def test_generate_story():
    print_header("TEST 3: STORY GENERATION (Vertex AI)")
    
    payload = {
        "craft_name": "Pottery",
        "category": "pottery",
        "region": "India"
    }
    
    print(f"\n📝 Test Craft: {payload['craft_name']}")
    print(f"📦 Category: {payload['category']}")
    print(f"🌍 Region: {payload['region']}")
    
    try:
        print("\n🔄 Sending request to /ai/generate_story...")
        print("⏳ This may take 10-30 seconds...")
        start_time = time.time()
        
        response = requests.post(
            f"{API_BASE}/generate_story",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=60  # 60 second timeout
        )
        
        elapsed_time = time.time() - start_time
        
        print_response(response)
        
        if response.status_code == 200:
            data = response.json()['data']
            print(f"\n✅ Story generation successful!")
            print(f"   ⏱️  Time: {elapsed_time:.2f}s")
            print(f"\n📖 Story Preview:")
            print(f"   Title: {data['json']['story']['title']}")
            print(f"   Text Length: {len(data['text'])} characters")
            print(f"\n   First 200 chars:")
            print(f"   {data['text'][:200]}...")
            return True
        else:
            print("\n❌ Story generation failed!")
            return False
            
    except requests.exceptions.Timeout:
        print("\n❌ Error: Request timed out (>60s)")
        return False
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return False

def test_generate_lesson():
    print_header("TEST 4: LESSON GENERATION (Vertex AI)")
    
    payload = {
        "craft_name": "Pottery",
        "category": "pottery",
        "region": "India"
    }
    
    print(f"\n📝 Test Craft: {payload['craft_name']}")
    print(f"📦 Category: {payload['category']}")
    print(f"🌍 Region: {payload['region']}")
    
    try:
        print("\n🔄 Sending request to /ai/generate_lesson...")
        print("⏳ This may take 10-30 seconds...")
        start_time = time.time()
        
        response = requests.post(
            f"{API_BASE}/generate_lesson",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=60  # 60 second timeout
        )
        
        elapsed_time = time.time() - start_time
        
        print_response(response)
        
        if response.status_code == 200:
            data = response.json()['data']
            print(f"\n✅ Lesson generation successful!")
            print(f"   ⏱️  Time: {elapsed_time:.2f}s")
            print(f"\n🎓 Lesson Preview:")
            print(f"   Title: {data['lesson_title']}")
            print(f"   Materials: {len(data['materials_required'])} items")
            print(f"   Steps: {len(data['steps'])} steps")
            print(f"   Quiz Questions: {len(data['quiz'])}")
            print(f"\n   First Quiz Question:")
            print(f"   Q: {data['quiz'][0]['question']}")
            print(f"   Answer: {data['quiz'][0]['answer']}")
            return True
        else:
            print("\n❌ Lesson generation failed!")
            return False
            
    except requests.exceptions.Timeout:
        print("\n❌ Error: Request timed out (>60s)")
        return False
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return False

def run_all_tests():
    print("\n" + "="*80)
    print("  🧪 AI SERVICES API TEST SUITE")
    print("="*80)
    print("\n📍 Testing API at: http://localhost:5000")
    print("💡 Make sure the API server is running: python3 app.py")
    
    results = {
        "health_check": False,
        "classify_image": False,
        "generate_story": False,
        "generate_lesson": False
    }
    
    results["health_check"] = test_health_check()
    
    if not results["health_check"]:
        print("\n" + "="*80)
        print("❌ Cannot proceed: API server is not running")
        print("💡 Start the server with: python3 app.py")
        print("="*80 + "\n")
        return
    
    results["classify_image"] = test_classify_image()
    
    results["generate_story"] = test_generate_story()
    
    results["generate_lesson"] = test_generate_lesson()
    
    print_header("TEST SUMMARY")
    
    total_tests = len(results)
    passed_tests = sum(1 for result in results.values() if result)
    
    print(f"\n📊 Results: {passed_tests}/{total_tests} tests passed\n")
    
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"   {status} - {test_name.replace('_', ' ').title()}")
    
    print("\n" + "="*80)
    if passed_tests == total_tests:
        print("🎉 ALL TESTS PASSED! API is fully functional.")
    else:
        print(f"⚠️  {total_tests - passed_tests} test(s) failed. Check logs above.")
    print("="*80 + "\n")

if __name__ == "__main__":
    run_all_tests()

