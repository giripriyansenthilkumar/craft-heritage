# Craft Heritage - AI Services

AI-powered services for craft image recognition, story generation, and lesson creation.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure API key
echo "GEMINI_API_KEY=your_key_here" > .env

# 3. Start API server
python3 app.py

# 4. Test (in new terminal)
python3 tests/test_api.py
```

**API runs on:** http://localhost:5000

---

## 📡 API Endpoints

| Endpoint | Method | Purpose | Time |
|----------|--------|---------|------|
| `/ai/health` | GET | Health check | Instant |
| `/ai/classify_image` | POST | Image classification | ~1-2s |
| `/ai/generate_story` | POST | Story generation | ~10-30s |
| `/ai/generate_lesson` | POST | Lesson generation | ~10-30s |

---

## 📦 Project Structure

```
aiServices/
├── app.py                    # Flask API server
├── routes_ai.py              # API endpoints
├── requirements.txt          # Dependencies
├── .env                      # API keys
│
├── vision_ai/                # Image classification (ResNet50)
├── vertex_ai/                # Story & lesson generation (Gemini)
├── shared/                   # Shared utilities
│
├── tests/                    # All test scripts
│   ├── test_api.py          # API integration tests
│   ├── test_all.py          # Comprehensive tests
│   └── ...
│
├── docs/                     # Documentation
│   ├── QUICKSTART.md        # Quick start guide
│   └── API_INTEGRATION_README.md  # Full API docs
│
├── sample_outputs/           # Example responses
└── images/                   # Test images
```

---

## 🎯 Services

### 1. Vision AI (ResNet50)
- **Model:** ResNet50 pretrained on ImageNet
- **Input:** Image path
- **Output:** Craft type, materials, region, confidence
- **Time:** ~1-2 seconds

**Example:**
```bash
curl -X POST http://localhost:5000/ai/classify_image \
  -H "Content-Type: application/json" \
  -d '{"image": "/path/to/image.jpg"}'
```

### 2. Story Generation (Gemini)
- **Model:** Gemini 2.5-flash
- **Input:** Craft name, category, region
- **Output:** 2-paragraph story + structured JSON
- **Time:** ~10-30 seconds

**Example:**
```bash
curl -X POST http://localhost:5000/ai/generate_story \
  -H "Content-Type: application/json" \
  -d '{"craft_name": "Pottery", "category": "pottery", "region": "India"}'
```

### 3. Lesson Generation (Gemini)
- **Model:** Gemini 2.5-flash
- **Input:** Craft name, category, region
- **Output:** Complete lesson plan with quiz
- **Time:** ~10-30 seconds

**Example:**
```bash
curl -X POST http://localhost:5000/ai/generate_lesson \
  -H "Content-Type: application/json" \
  -d '{"craft_name": "Pottery", "category": "pottery", "region": "India"}'
```

---

## 🌐 Frontend Integration

### JavaScript (Fetch)
```javascript
const response = await fetch('http://localhost:5000/ai/classify_image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ image: '/path/to/image.jpg' })
});
const data = await response.json();
console.log(data.data.craft_type);
```

### React (Axios)
```javascript
import axios from 'axios';

const classifyImage = async (imagePath) => {
  const { data } = await axios.post('http://localhost:5000/ai/classify_image', {
    image: imagePath
  });
  return data;
};
```

---

## 🧪 Testing

```bash
# Test all services
python3 tests/test_all.py

# Test API endpoints
python3 tests/test_api.py

# Test individual services
python3 tests/test_image.py
python3 tests/test_story.py
python3 tests/test_lesson.py
```

---

## 📚 Documentation

- **[Quick Start Guide](docs/QUICKSTART.md)** - Get started in 5 minutes
- **[API Documentation](docs/API_INTEGRATION_README.md)** - Complete API reference
- **[Sample Outputs](sample_outputs/)** - Example JSON responses

---

## 🔧 Configuration

Create `.env` file:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 📊 Performance

| Service | Model | Processing Time | Accuracy |
|---------|-------|----------------|----------|
| Vision AI | ResNet50 | ~1-2s | High |
| Story Gen | Gemini 2.5-flash | ~10-30s | High |
| Lesson Gen | Gemini 2.5-flash | ~10-30s | High |

---

## ✅ Status

- ✅ Vision AI - Production Ready
- ✅ Story Generation - Production Ready
- ✅ Lesson Generation - Production Ready
- ✅ API Integration - Production Ready

---

## 🆘 Troubleshooting

**Port already in use:**
```bash
lsof -i :5000
kill -9 <PID>
```

**Module not found:**
```bash
pip install -r requirements.txt
```

**API key error:**
Check `.env` file has valid Gemini API key

---

## 📞 Support

- Check [docs/](docs/) for detailed documentation
- Run tests to verify setup
- Review sample outputs for expected format

---

**Version:** 1.0.0  
**Status:** Production Ready ✅
