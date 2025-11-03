# Docker Quick Start - AI Services

Get the AI microservice running in 2 minutes!

---

## 🚀 Quick Commands

### Start the Service
```bash
docker-compose up --build
```

### Stop the Service
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

---

## ✅ Verify It's Working

### 1. Check Health
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "service": "AI Services API"
}
```

### 2. Test Image Classification
```bash
curl -X POST http://localhost:5000/ai/classify_image \
  -H "Content-Type: application/json" \
  -d '{"image": "/app/aiServices/images/Pottery.png"}'
```

### 3. Open in Browser
Visit: http://localhost:5000

---

## 📡 Available Endpoints

```
GET  /health                  → Health check
GET  /ai/health               → AI services status
POST /ai/classify_image       → Image classification
POST /ai/generate_story       → Story generation
POST /ai/generate_lesson      → Lesson generation
```

---

## 🔧 Common Issues

**Port already in use?**
```bash
lsof -i :5000
kill -9 <PID>
```

**Need to rebuild?**
```bash
docker-compose down
docker-compose up --build --force-recreate
```

**Check logs?**
```bash
docker-compose logs -f
```

---

## 📚 Full Documentation

See [README_DOCKER.md](README_DOCKER.md) for complete documentation.

---

**That's it!** Your AI microservice is now running in Docker. 🐳✅
