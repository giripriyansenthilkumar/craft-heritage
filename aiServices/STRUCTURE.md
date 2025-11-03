# AI Services - Project Structure

Clean, organized structure for the AI Services module.

---

## 📁 Directory Tree

```
aiServices/
│
├── 📄 README.md                    # Main documentation
├── 📄 requirements.txt             # Python dependencies
├── 📄 .env                         # Environment variables (API keys)
├── 📄 .env.example                 # Example env file
│
├── 🚀 app.py                       # Flask API server (entry point)
├── 🛣️  routes_ai.py                # API route definitions
│
├── 📂 vision_ai/                   # Image Classification Service
│   ├── __init__.py
│   ├── image_classifier.py        # ResNet50 classifier
│   ├── test_vision.py
│   ├── test_vision_detailed.py
│   ├── demo_categorization.py
│   ├── README.md
│   └── VISION_AI_TEST_REPORT.md
│
├── 📂 vertex_ai/                   # Story & Lesson Generation
│   ├── __init__.py
│   ├── story_service.py           # Story generation (Gemini)
│   ├── lesson_service.py          # Lesson generation (Gemini)
│   ├── model_gemini.py            # Gemini API wrapper
│   ├── prompt_templates.py        # AI prompts
│   ├── test_vertex.py
│   └── README.md
│
├── 📂 shared/                      # Shared utilities
│   ├── __init__.py
│   └── utils.py                   # Common functions
│
├── 📂 tests/                       # All test scripts
│   ├── test_api.py                # API integration tests ⭐
│   ├── test_all.py                # Comprehensive tests
│   ├── test_image.py              # Vision AI tests
│   ├── test_story.py              # Story generation tests
│   ├── test_lesson.py             # Lesson generation tests
│   └── check_models.py            # Model verification
│
├── 📂 docs/                        # Documentation
│   ├── QUICKSTART.md              # Quick start guide
│   ├── API_INTEGRATION_README.md  # Complete API docs
│   ├── INTEGRATION_COMPLETE.md    # Task completion report
│   ├── INTEGRATION_SUMMARY.md     # Visual summary
│   ├── VISION_AI_TESTING_SUMMARY.md
│   └── TEST_RESULTS.md
│
├── 📂 sample_outputs/              # Example JSON responses
│   ├── story_sample.json
│   ├── lesson_sample.json
│   ├── sample_story.json
│   └── sample_lesson.json
│
└── 📂 images/                      # Test images
    └── Pottery.png
```

---

## 🎯 Core Files

### Entry Points
- **`app.py`** - Start the Flask API server
- **`routes_ai.py`** - API endpoint definitions

### Services
- **`vision_ai/image_classifier.py`** - Image classification
- **`vertex_ai/story_service.py`** - Story generation
- **`vertex_ai/lesson_service.py`** - Lesson generation

### Testing
- **`tests/test_api.py`** - Main API test suite ⭐
- **`tests/test_all.py`** - All services test

### Documentation
- **`README.md`** - Main documentation
- **`docs/QUICKSTART.md`** - Quick start
- **`docs/API_INTEGRATION_README.md`** - Full API docs

---

## 🚀 Quick Commands

```bash
# Start API server
python3 app.py

# Test API
python3 tests/test_api.py

# Test all services
python3 tests/test_all.py

# Test individual services
python3 tests/test_image.py
python3 tests/test_story.py
python3 tests/test_lesson.py
```

---

## 📦 What Each Folder Contains

### `/vision_ai/`
ResNet50-based image classification for craft recognition
- Identifies craft types (pottery, textile, etc.)
- Detects materials (clay, wood, metal, etc.)
- Classifies regions (South Asia, Southeast Asia, etc.)

### `/vertex_ai/`
Gemini-powered content generation
- Story generation with cultural context
- Lesson plans with materials, steps, and quizzes
- Structured JSON outputs

### `/tests/`
Comprehensive test suite
- API integration tests
- Individual service tests
- Model verification scripts

### `/docs/`
Complete documentation
- Quick start guides
- API reference
- Integration examples
- Test reports

### `/sample_outputs/`
Example responses for development
- Story generation examples
- Lesson generation examples
- Use for frontend development without API calls

---

## ✅ Clean Structure Benefits

✅ **Organized** - Clear separation of concerns  
✅ **Maintainable** - Easy to find and update files  
✅ **Scalable** - Simple to add new services  
✅ **Professional** - Industry-standard structure  
✅ **Documented** - Everything is well-documented  

---

**Status:** Clean & Organized ✅
