"""
Flask API routes for AI services integration.
Exposes Vision AI, Story Generation, and Lesson Generation as REST endpoints.
"""

from flask import Blueprint, request, jsonify
import sys
from pathlib import Path

# Add current directory to path
sys.path.insert(0, str(Path(__file__).parent))

from vision_ai.image_classifier import classify_craft_image
from vertex_ai.story_service import generate_story
from vertex_ai.lesson_service import generate_lesson

# Create Blueprint
ai_routes = Blueprint('ai_routes', __name__, url_prefix='/ai')


@ai_routes.route('/classify_image', methods=['POST'])
def classify_image():
    """
    Classify craft image using Vision AI.
    
    Request Body:
        {
            "image": "/path/to/image.jpg"
        }
    
    Response:
        {
            "status": "success",
            "data": {
                "craft_type": "pottery",
                "materials_detected": ["clay"],
                "possible_region": "South Asia",
                "confidence": 1.0,
                "meta": {...}
            }
        }
    """
    print("\n" + "="*70)
    print("🔍 VISION AI - Image Classification Request")
    print("="*70)
    
    try:
        # Get request data
        data = request.get_json()
        
        if not data or 'image' not in data:
            print("❌ Error: Missing 'image' field in request")
            return jsonify({
                "status": "error",
                "message": "Missing 'image' field in request body"
            }), 400
        
        image_path = data['image']
        print(f"📸 Image Path: {image_path}")
        
        # Classify image
        print("🔄 Processing image...")
        result = classify_craft_image(image_path)
        
        print(f"✅ Classification successful!")
        print(f"   Craft Type: {result['craft_type']}")
        print(f"   Confidence: {result['confidence']:.2%}")
        print("="*70 + "\n")
        
        return jsonify({
            "status": "success",
            "data": result
        }), 200
        
    except FileNotFoundError as e:
        print(f"❌ Error: Image file not found - {e}")
        print("="*70 + "\n")
        return jsonify({
            "status": "error",
            "message": f"Image file not found: {str(e)}"
        }), 404
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        print("="*70 + "\n")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@ai_routes.route('/generate_story', methods=['POST'])
def create_story():
    """
    Generate craft story using Vertex AI (Gemini).
    
    Request Body:
        {
            "craft_name": "Pottery",
            "category": "pottery",
            "region": "India"
        }
    
    Response:
        {
            "status": "success",
            "data": {
                "text": "Two paragraph story...",
                "json": {
                    "craft_name": "...",
                    "region": "...",
                    "category": "...",
                    "story": {...},
                    "meta": {...}
                }
            }
        }
    """
    print("\n" + "="*70)
    print("📖 VERTEX AI - Story Generation Request")
    print("="*70)
    
    try:
        # Get request data
        data = request.get_json()
        
        if not data:
            print("❌ Error: No JSON data provided")
            return jsonify({
                "status": "error",
                "message": "Request body must be JSON"
            }), 400
        
        # Validate required fields
        required_fields = ['craft_name', 'category', 'region']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            print(f"❌ Error: Missing fields: {', '.join(missing_fields)}")
            return jsonify({
                "status": "error",
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }), 400
        
        craft_name = data['craft_name']
        category = data['category']
        region = data['region']
        
        print(f"📝 Craft: {craft_name}")
        print(f"📦 Category: {category}")
        print(f"🌍 Region: {region}")
        print("🔄 Generating story (this may take 10-30 seconds)...")
        
        # Generate story
        result = generate_story(craft_name, category, region)
        
        print(f"✅ Story generated successfully!")
        print(f"   Title: {result['json']['story']['title']}")
        print("="*70 + "\n")
        
        return jsonify({
            "status": "success",
            "data": result
        }), 200
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        print("="*70 + "\n")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@ai_routes.route('/generate_lesson', methods=['POST'])
def create_lesson():
    """
    Generate craft lesson using Vertex AI (Gemini).
    
    Request Body:
        {
            "craft_name": "Pottery",
            "category": "pottery",
            "region": "India"
        }
    
    Response:
        {
            "status": "success",
            "data": {
                "lesson_title": "...",
                "introduction": "...",
                "materials_required": [...],
                "steps": [...],
                "quiz": [...],
                "summary": "...",
                "meta": {...}
            }
        }
    """
    print("\n" + "="*70)
    print("🎓 VERTEX AI - Lesson Generation Request")
    print("="*70)
    
    try:
        # Get request data
        data = request.get_json()
        
        if not data:
            print("❌ Error: No JSON data provided")
            return jsonify({
                "status": "error",
                "message": "Request body must be JSON"
            }), 400
        
        # Validate required fields
        required_fields = ['craft_name', 'category', 'region']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            print(f"❌ Error: Missing fields: {', '.join(missing_fields)}")
            return jsonify({
                "status": "error",
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }), 400
        
        craft_name = data['craft_name']
        category = data['category']
        region = data['region']
        
        print(f"📝 Craft: {craft_name}")
        print(f"📦 Category: {category}")
        print(f"🌍 Region: {region}")
        print("🔄 Generating lesson (this may take 10-30 seconds)...")
        
        # Generate lesson
        result = generate_lesson(craft_name, category, region)
        
        print(f"✅ Lesson generated successfully!")
        print(f"   Title: {result['lesson_title']}")
        print(f"   Steps: {len(result['steps'])}")
        print(f"   Quiz Questions: {len(result['quiz'])}")
        print("="*70 + "\n")
        
        return jsonify({
            "status": "success",
            "data": result
        }), 200
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        print("="*70 + "\n")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@ai_routes.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint for AI services.
    """
    return jsonify({
        "status": "success",
        "message": "AI Services are running",
        "services": {
            "vision_ai": "ready",
            "story_generation": "ready",
            "lesson_generation": "ready"
        }
    }), 200
