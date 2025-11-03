# AI Services API Integration Guide

Complete guide for integrating AI services (Vision AI, Story Generation, Lesson Generation) into the Craft Heritage platform.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setup & Installation](#setup--installation)
4. [Running the API](#running-the-api)
5. [API Endpoints](#api-endpoints)
6. [Testing](#testing)
7. [Frontend Integration](#frontend-integration)
8. [Backend Integration](#backend-integration)
9. [Sample Outputs](#sample-outputs)
10. [Error Handling](#error-handling)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The AI Services API exposes three powerful AI capabilities:

1. **Vision AI** - Image classification for craft recognition (ResNet50)
2. **Story Generation** - AI-generated craft stories (Gemini 2.5-flash)
3. **Lesson Generation** - AI-generated craft lessons (Gemini 2.5-flash)

**Tech Stack:**
- Flask (REST API)
- PyTorch + ResNet50 (Vision AI)
- Google Gemini API (Story & Lesson Generation)
- Flask-CORS (Cross-origin support)

---

## 🏗️ Architecture

```
aiServices/
├── app.py                    # Flask application entry point
├── routes_ai.py              # API route definitions
├── vision_ai/
│   └── image_classifier.py   # ResNet50 image classification
├── vertex_ai/
│   ├── story_service.py      # Story generation service
│   └── lesson_service.py     # Lesson generation service
├── test_api.py               # API testing script
└── sample_outputs/           # Sample response JSONs
```

**Request Flow:**
```
Frontend/Backend → Flask API → AI Service → Response
```

---

## 🔧 Setup & Installation

### 1. Install Dependencies

```bash
cd aiServices

# Install Python packages
pip install flask flask-cors requests
pip install torch torchvision pillow
pip install google-generativeai python-dotenv
```

### 2. Configure Environment

Create `.env` file in `aiServices/` folder:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Verify Installation

```bash
# Check if all dependencies are installed
python3 -c "import flask, torch, google.generativeai; print('✅ All dependencies installed')"
```

---

## 🚀 Running the API

### Start the API Server

```bash
cd aiServices
python3 app.py
```

**Output:**
```
======================================================================
🚀 Starting Craft Heritage AI Services API
======================================================================

📍 Available Endpoints:
   GET  /              - API information
   GET  /health        - Health check
   GET  /ai/health     - AI services health check
   POST /ai/classify_image   - Vision AI image classification
   POST /ai/generate_story   - Story generation
   POST /ai/generate_lesson  - Lesson generation

======================================================================
🌐 Server running on http://localhost:5000
======================================================================
```

The API will be available at: **http://localhost:5000**

---

## 📡 API Endpoints

### 1. Health Check

**Endpoint:** `GET /ai/health`

**Response:**
```json
{
  "status": "success",
  "message": "AI Services are running",
  "services": {
    "vision_ai": "ready",
    "story_generation": "ready",
    "lesson_generation": "ready"
  }
}
```

---

### 2. Classify Image (Vision AI)

**Endpoint:** `POST /ai/classify_image`

**Request Body:**
```json
{
  "image": "/path/to/image.jpg"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "craft_type": "pottery",
    "materials_detected": ["clay"],
    "possible_region": "South Asia",
    "confidence": 1.0,
    "meta": {
      "model": "resnet50",
      "generated_at": "2025-11-02T07:00:00.000000Z"
    }
  }
}
```

**Processing Time:** ~1-2 seconds

**Use Cases:**
- Auto-categorize uploaded craft images
- Suggest craft type during upload
- Enable visual search
- Quality control and verification

---

### 3. Generate Story

**Endpoint:** `POST /ai/generate_story`

**Request Body:**
```json
{
  "craft_name": "Pottery",
  "category": "pottery",
  "region": "India"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "text": "Two paragraph story about the craft...",
    "json": {
      "craft_name": "Pottery",
      "region": "India",
      "category": "pottery",
      "story": {
        "title": "The Timeless Art of Indian Pottery",
        "historical_origin": "Dating back to...",
        "artisan_background": "Traditional potters...",
        "cultural_significance": "Pottery holds...",
        "symbolism": "The potter's wheel...",
        "traditional_usage": "Traditional Indian pottery...",
        "why_unique": "Indian pottery is unique..."
      },
      "meta": {
        "generated_by": "gemini-2.5-flash",
        "generated_at": "2025-11-02T07:00:00.000000Z"
      }
    }
  }
}
```

**Processing Time:** ~10-30 seconds

**Use Cases:**
- Generate craft descriptions for listings
- Create educational content
- Enrich craft profiles
- Marketing and storytelling

---

### 4. Generate Lesson

**Endpoint:** `POST /ai/generate_lesson`

**Request Body:**
```json
{
  "craft_name": "Pottery",
  "category": "pottery",
  "region": "India"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "lesson_title": "Introduction to Traditional Indian Pottery",
    "introduction": "Welcome to the ancient art...",
    "materials_required": [
      "Clay (terracotta or earthenware clay)",
      "Pottery wheel",
      "..."
    ],
    "steps": [
      "Prepare your clay by kneading...",
      "Center the clay on the pottery wheel...",
      "..."
    ],
    "quiz": [
      {
        "question": "What is the traditional Indian name for potters?",
        "options": ["A) Kumhars", "B) Karigar", "C) Shilpi", "D) Kalakar"],
        "answer": "A"
      }
    ],
    "summary": "Congratulations on completing...",
    "meta": {
      "generated_by": "gemini-2.5-flash",
      "generated_at": "2025-11-02T07:00:00.000000Z"
    }
  }
}
```

**Processing Time:** ~10-30 seconds

**Use Cases:**
- Create interactive learning modules
- Generate workshop materials
- Educational platform content
- Skill development programs

---

## 🧪 Testing

### Run API Tests

```bash
# Make sure API server is running first
python3 app.py

# In another terminal, run tests
python3 test_api.py
```

**Test Output:**
```
================================================================================
  🧪 AI SERVICES API TEST SUITE
================================================================================

📍 Testing API at: http://localhost:5000

================================================================================
  TEST 1: HEALTH CHECK
================================================================================
✅ Health check passed!

================================================================================
  TEST 2: IMAGE CLASSIFICATION (Vision AI)
================================================================================
✅ Classification successful!
   ⏱️  Time: 1.85s
   🎨 Craft Type: pottery
   🧱 Materials: clay
   🌍 Region: South Asia
   📊 Confidence: 100.00%

================================================================================
  TEST 3: STORY GENERATION (Vertex AI)
================================================================================
✅ Story generation successful!
   ⏱️  Time: 12.34s

================================================================================
  TEST 4: LESSON GENERATION (Vertex AI)
================================================================================
✅ Lesson generation successful!
   ⏱️  Time: 15.67s

================================================================================
  TEST SUMMARY
================================================================================
📊 Results: 4/4 tests passed
🎉 ALL TESTS PASSED! API is fully functional.
```

---

## 🌐 Frontend Integration

### Using Fetch API (JavaScript)

#### 1. Classify Image

```javascript
async function classifyImage(imagePath) {
  try {
    const response = await fetch('http://localhost:5000/ai/classify_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imagePath
      })
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      console.log('Craft Type:', result.data.craft_type);
      console.log('Materials:', result.data.materials_detected);
      console.log('Region:', result.data.possible_region);
      console.log('Confidence:', result.data.confidence);
      return result.data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
classifyImage('/path/to/craft/image.jpg');
```

#### 2. Generate Story

```javascript
async function generateStory(craftName, category, region) {
  try {
    const response = await fetch('http://localhost:5000/ai/generate_story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        craft_name: craftName,
        category: category,
        region: region
      })
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      console.log('Story Text:', result.data.text);
      console.log('Story Title:', result.data.json.story.title);
      return result.data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
generateStory('Pottery', 'pottery', 'India');
```

#### 3. Generate Lesson

```javascript
async function generateLesson(craftName, category, region) {
  try {
    const response = await fetch('http://localhost:5000/ai/generate_lesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        craft_name: craftName,
        category: category,
        region: region
      })
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      console.log('Lesson Title:', result.data.lesson_title);
      console.log('Steps:', result.data.steps.length);
      console.log('Quiz Questions:', result.data.quiz.length);
      return result.data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
generateLesson('Pottery', 'pottery', 'India');
```

### Using Axios (React Example)

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/ai';

// Classify Image
export const classifyImage = async (imagePath) => {
  const response = await axios.post(`${API_BASE}/classify_image`, {
    image: imagePath
  });
  return response.data;
};

// Generate Story
export const generateStory = async (craftName, category, region) => {
  const response = await axios.post(`${API_BASE}/generate_story`, {
    craft_name: craftName,
    category: category,
    region: region
  });
  return response.data;
};

// Generate Lesson
export const generateLesson = async (craftName, category, region) => {
  const response = await axios.post(`${API_BASE}/generate_lesson`, {
    craft_name: craftName,
    category: category,
    region: region
  });
  return response.data;
};
```

---

## 🔌 Backend Integration

### Python (Flask/Django)

```python
import requests

API_BASE = "http://localhost:5000/ai"

def classify_craft_image(image_path):
    """Classify craft image using Vision AI."""
    response = requests.post(
        f"{API_BASE}/classify_image",
        json={"image": image_path}
    )
    return response.json()

def generate_craft_story(craft_name, category, region):
    """Generate craft story using Vertex AI."""
    response = requests.post(
        f"{API_BASE}/generate_story",
        json={
            "craft_name": craft_name,
            "category": category,
            "region": region
        }
    )
    return response.json()

def generate_craft_lesson(craft_name, category, region):
    """Generate craft lesson using Vertex AI."""
    response = requests.post(
        f"{API_BASE}/generate_lesson",
        json={
            "craft_name": craft_name,
            "category": category,
            "region": region
        }
    )
    return response.json()
```

### Node.js (Express)

```javascript
const axios = require('axios');

const API_BASE = 'http://localhost:5000/ai';

async function classifyImage(imagePath) {
  const response = await axios.post(`${API_BASE}/classify_image`, {
    image: imagePath
  });
  return response.data;
}

async function generateStory(craftName, category, region) {
  const response = await axios.post(`${API_BASE}/generate_story`, {
    craft_name: craftName,
    category: category,
    region: region
  });
  return response.data;
}

async function generateLesson(craftName, category, region) {
  const response = await axios.post(`${API_BASE}/generate_lesson`, {
    craft_name: craftName,
    category: category,
    region: region
  });
  return response.data;
}

module.exports = { classifyImage, generateStory, generateLesson };
```

---

## 📦 Sample Outputs

Sample response files are available in `sample_outputs/`:

- **story_sample.json** - Example story generation output
- **lesson_sample.json** - Example lesson generation output

Use these for:
- Frontend UI development
- Testing without API calls
- Understanding response structure
- Mock data for development

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "status": "error",
  "message": "Error description here"
}
```

### Common Errors

| Status Code | Error | Solution |
|-------------|-------|----------|
| 400 | Missing required fields | Check request body has all required fields |
| 404 | Image file not found | Verify image path is correct |
| 500 | Internal server error | Check API logs for details |
| 503 | Service unavailable | Ensure API server is running |

### Frontend Error Handling Example

```javascript
async function classifyImageSafe(imagePath) {
  try {
    const response = await fetch('http://localhost:5000/ai/classify_image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imagePath })
    });
    
    const result = await response.json();
    
    if (result.status === 'error') {
      console.error('API Error:', result.message);
      // Show user-friendly error message
      return null;
    }
    
    return result.data;
    
  } catch (error) {
    console.error('Network Error:', error);
    // Handle network errors
    return null;
  }
}
```

---

## 🔧 Troubleshooting

### Issue: API server won't start

**Solution:**
```bash
# Check if port 5000 is already in use
lsof -i :5000

# Kill existing process if needed
kill -9 <PID>

# Or use a different port
python3 app.py --port 5001
```

### Issue: "Cannot connect to API server"

**Solution:**
- Ensure API server is running: `python3 app.py`
- Check firewall settings
- Verify correct URL: `http://localhost:5000`

### Issue: Vision AI model loading slowly

**Solution:**
- First load downloads ResNet50 (~100MB)
- Subsequent loads are faster (cached)
- Model loads once when server starts

### Issue: Story/Lesson generation timeout

**Solution:**
- Increase timeout in requests: `timeout=60`
- Check Gemini API key is valid
- Verify internet connection

### Issue: CORS errors in browser

**Solution:**
- Flask-CORS is already configured
- Check browser console for specific error
- Verify API URL matches frontend config

---

## 📊 Performance Notes

| Service | First Load | Subsequent | Avg Response |
|---------|-----------|------------|--------------|
| Vision AI | ~3-5s | ~1-2s | 1.5s |
| Story Gen | ~10-30s | ~10-30s | 15s |
| Lesson Gen | ~10-30s | ~10-30s | 18s |

**Optimization Tips:**
- Keep API server running (avoid cold starts)
- Cache Vision AI model in memory
- Consider implementing response caching
- Use async/await for non-blocking calls

---

## 🎯 Best Practices

1. **Always validate input** before sending to API
2. **Handle errors gracefully** with user-friendly messages
3. **Show loading states** for long-running operations
4. **Cache responses** when appropriate
5. **Use environment variables** for API URLs
6. **Implement retry logic** for network failures
7. **Log errors** for debugging
8. **Test with sample data** before production

---

## 📞 Support

For issues or questions:
- Check this README first
- Review sample outputs in `sample_outputs/`
- Run `python3 test_api.py` to verify setup
- Check API logs for error details

---

## 🚀 Quick Start Checklist

- [ ] Install dependencies: `pip install flask flask-cors requests torch torchvision pillow google-generativeai python-dotenv`
- [ ] Configure `.env` with Gemini API key
- [ ] Start API server: `python3 app.py`
- [ ] Run tests: `python3 test_api.py`
- [ ] Integrate endpoints into frontend/backend
- [ ] Test with real data
- [ ] Deploy to production

---

**Version:** 1.0.0  
**Last Updated:** November 2, 2025  
**Status:** Production Ready ✅
