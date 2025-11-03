# Craft Heritage AI Services - Docker Deployment

Complete Docker setup for running AI services as a containerized microservice.

---

## 🐳 What This Is

A **self-contained AI microservice** that provides:
- 🔍 **Vision AI** - Image classification (ResNet50)
- 📖 **Story Generation** - AI-powered craft stories (Gemini)
- 🎓 **Lesson Generation** - AI-powered craft lessons (Gemini)

All services are exposed via REST API on port 5000.

---

## 🚀 Quick Start

### 1. Build and Run

```bash
docker-compose up --build
```

**That's it!** The API will be available at: **http://localhost:5000**

### 2. Stop the Service

```bash
docker-compose down
```

### 3. Rebuild After Changes

```bash
docker-compose up --build --force-recreate
```

---

## 📡 API Endpoints

Once running, the following endpoints are available:

| Endpoint | Method | Purpose | Response Time |
|----------|--------|---------|---------------|
| `GET /` | GET | API information | Instant |
| `GET /health` | GET | Health check | Instant |
| `GET /ai/health` | GET | AI services status | Instant |
| `POST /ai/classify_image` | POST | Image classification | ~1-2s |
| `POST /ai/generate_story` | POST | Story generation | ~10-30s |
| `POST /ai/generate_lesson` | POST | Lesson generation | ~10-30s |

---

## 🧪 Testing the API

### Option 1: Using cURL

#### Health Check
```bash
curl http://localhost:5000/health
```

#### Classify Image
```bash
curl -X POST http://localhost:5000/ai/classify_image \
  -H "Content-Type: application/json" \
  -d '{"image": "/app/aiServices/images/Pottery.png"}'
```

#### Generate Story
```bash
curl -X POST http://localhost:5000/ai/generate_story \
  -H "Content-Type: application/json" \
  -d '{
    "craft_name": "Pottery",
    "category": "pottery",
    "region": "India"
  }'
```

#### Generate Lesson
```bash
curl -X POST http://localhost:5000/ai/generate_lesson \
  -H "Content-Type: application/json" \
  -d '{
    "craft_name": "Pottery",
    "category": "pottery",
    "region": "India"
  }'
```

### Option 2: Using Python Test Script

```bash
# Make sure container is running first
docker-compose up -d

# Run tests from host machine
python3 aiServices/tests/test_api.py
```

### Option 3: Using Browser

Open in browser:
- http://localhost:5000 - API info
- http://localhost:5000/health - Health check
- http://localhost:5000/ai/health - AI services status

---

## 🌐 Frontend Integration

### JavaScript (Fetch)

```javascript
// Classify Image
const classifyImage = async (imagePath) => {
  const response = await fetch('http://localhost:5000/ai/classify_image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imagePath })
  });
  return await response.json();
};

// Generate Story
const generateStory = async (craftName, category, region) => {
  const response = await fetch('http://localhost:5000/ai/generate_story', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      craft_name: craftName,
      category: category,
      region: region
    })
  });
  return await response.json();
};

// Generate Lesson
const generateLesson = async (craftName, category, region) => {
  const response = await fetch('http://localhost:5000/ai/generate_lesson', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      craft_name: craftName,
      category: category,
      region: region
    })
  });
  return await response.json();
};
```

### React with Axios

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/ai';

export const aiService = {
  classifyImage: async (imagePath) => {
    const { data } = await axios.post(`${API_BASE}/classify_image`, {
      image: imagePath
    });
    return data;
  },

  generateStory: async (craftName, category, region) => {
    const { data } = await axios.post(`${API_BASE}/generate_story`, {
      craft_name: craftName,
      category: category,
      region: region
    });
    return data;
  },

  generateLesson: async (craftName, category, region) => {
    const { data } = await axios.post(`${API_BASE}/generate_lesson`, {
      craft_name: craftName,
      category: category,
      region: region
    });
    return data;
  }
};
```

---

## 🔌 Backend Integration

### Python (Flask/Django)

```python
import requests

API_BASE = "http://localhost:5000/ai"

def classify_craft_image(image_path):
    """Classify craft image."""
    response = requests.post(
        f"{API_BASE}/classify_image",
        json={"image": image_path}
    )
    return response.json()

def generate_craft_story(craft_name, category, region):
    """Generate craft story."""
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
    """Generate craft lesson."""
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

## 🔧 Configuration

### Environment Variables

Create `aiServices/.env` file:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
FLASK_DEBUG=false
```

### Docker Compose Configuration

The `docker-compose.yml` includes:
- ✅ Port mapping: 5000:5000
- ✅ Volume mounting for live code updates
- ✅ Environment file loading
- ✅ Auto-restart policy
- ✅ Health check monitoring

---

## 📊 Container Details

### Image Information
- **Base Image:** python:3.10-slim
- **Size:** ~2-3 GB (includes PyTorch)
- **Mode:** CPU-only (no GPU required)

### Installed Services
- Flask API server
- ResNet50 model (Vision AI)
- Gemini API client (Story & Lesson)

### System Dependencies
- Python 3.10
- OpenCV dependencies (libgl1, libglib2.0-0)
- Git

---

## 🛠️ Docker Commands

### View Logs
```bash
docker-compose logs -f
```

### View Running Containers
```bash
docker ps
```

### Execute Commands Inside Container
```bash
docker exec -it craft-ai bash
```

### Restart Service
```bash
docker-compose restart
```

### Stop Service
```bash
docker-compose stop
```

### Remove Container and Images
```bash
docker-compose down --rmi all
```

---

## 🔍 Troubleshooting

### Issue: Container won't start

**Solution:**
```bash
# Check logs
docker-compose logs

# Rebuild from scratch
docker-compose down
docker-compose up --build --force-recreate
```

### Issue: Port 5000 already in use

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "5001:5000"
```

### Issue: API returns errors

**Solution:**
```bash
# Check if .env file exists
ls aiServices/.env

# Verify Gemini API key is set
cat aiServices/.env

# Check container logs
docker-compose logs -f
```

### Issue: Slow first request

**Explanation:** First request loads ResNet50 model (~2-3 seconds). Subsequent requests are faster.

---

## 📦 What's Inside the Container

```
/app/
├── aiServices/              # AI services code (mounted volume)
│   ├── app.py              # Flask API
│   ├── routes_ai.py        # API routes
│   ├── vision_ai/          # Image classification
│   ├── vertex_ai/          # Story & lesson generation
│   ├── tests/              # Test scripts
│   └── .env                # Environment variables
├── requirements.txt         # Python dependencies
└── entrypoint.sh           # Startup script
```

---

## 🎯 Microservice Architecture

```
┌─────────────────────────────────────────┐
│         Frontend / Backend              │
│     (React, Vue, Express, Django)       │
└──────────────┬──────────────────────────┘
               │ HTTP Requests
               ▼
┌─────────────────────────────────────────┐
│      Docker Container (craft-ai)        │
│  ┌───────────────────────────────────┐  │
│  │     Flask API (port 5000)         │  │
│  │  ┌─────────┬─────────┬─────────┐  │  │
│  │  │Vision AI│ Story   │ Lesson  │  │  │
│  │  │ResNet50 │ Gemini  │ Gemini  │  │  │
│  │  └─────────┴─────────┴─────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## ✅ Benefits of Docker Deployment

✅ **Isolated Environment** - No dependency conflicts  
✅ **Easy Deployment** - One command to run  
✅ **Consistent Setup** - Works on any machine  
✅ **Scalable** - Easy to replicate and scale  
✅ **Production Ready** - Ready for cloud deployment  
✅ **Self-Contained** - All dependencies included  

---

## 🚀 Production Deployment

### Deploy to Cloud (AWS, GCP, Azure)

1. **Push to Container Registry**
```bash
docker tag craft-ai:latest your-registry/craft-ai:latest
docker push your-registry/craft-ai:latest
```

2. **Deploy to Cloud Service**
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- Kubernetes

3. **Configure Environment**
- Set GEMINI_API_KEY
- Configure networking
- Set up load balancer
- Enable HTTPS

---

## 📚 Additional Resources

- **API Documentation:** `aiServices/docs/API_INTEGRATION_README.md`
- **Quick Start:** `aiServices/docs/QUICKSTART.md`
- **Project Structure:** `aiServices/STRUCTURE.md`
- **Sample Outputs:** `aiServices/sample_outputs/`

---

## 🎉 Summary

You now have a **fully containerized AI microservice** that:
- ✅ Runs with one command: `docker-compose up --build`
- ✅ Exposes REST API on port 5000
- ✅ Includes all 3 AI services
- ✅ Is production-ready
- ✅ Can be deployed to any cloud platform

**Start using it:**
```bash
docker-compose up --build
```

Then visit: http://localhost:5000

---

**Version:** 1.0.0  
**Status:** Production Ready 🐳✅
