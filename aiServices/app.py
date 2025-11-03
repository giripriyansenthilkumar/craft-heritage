"""
Flask application entry point for AI Services API.
"""

from flask import Flask, jsonify
from flask_cors import CORS
from routes_ai import ai_routes

# Create Flask app
app = Flask(__name__)

# Enable CORS for frontend integration
CORS(app, resources={r"/ai/*": {"origins": "*"}})

# Register AI routes blueprint
app.register_blueprint(ai_routes)


@app.route('/')
def index():
    """Root endpoint."""
    return jsonify({
        "message": "Craft Heritage AI Services API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/ai/health",
            "classify_image": "/ai/classify_image",
            "generate_story": "/ai/generate_story",
            "generate_lesson": "/ai/generate_lesson"
        },
        "documentation": "See README.md for API usage"
    })


@app.route('/health')
def health():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "service": "AI Services API"
    })


if __name__ == '__main__':
    print("\n" + "="*70)
    print("🚀 Starting Craft Heritage AI Services API")
    print("="*70)
    print("\n📍 Available Endpoints:")
    print("   GET  /              - API information")
    print("   GET  /health        - Health check")
    print("   GET  /ai/health     - AI services health check")
    print("   POST /ai/classify_image   - Vision AI image classification")
    print("   POST /ai/generate_story   - Story generation")
    print("   POST /ai/generate_lesson  - Lesson generation")
    print("\n" + "="*70)
    print("🌐 Server running on http://localhost:5000")
    print("="*70 + "\n")
    
    # Use debug=False for production/Docker
    import os
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)
