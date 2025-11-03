# AI Services API - Quick Start Guide

Get the AI Services API up and running in 5 minutes!

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
cd aiServices
pip install -r requirements.txt
```

### Step 2: Configure API Key

Create `.env` file:
```bash
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

### Step 3: Start the Server

```bash
python3 app.py
```

✅ **API is now running at http://localhost:5000**

---

## 🧪 Test It (1 Command)

Open a new terminal:

```bash
cd aiServices
python3 test_api.py
```

You should see:
```
🎉 ALL TESTS PASSED! API is fully functional.
```

---

## 📡 Use the API

### Example 1: Classify an Image

```bash
curl -X POST http://localhost:5000/ai/classify_image \
  -H "Content-Type: application/json" \
  -d '{"image": "/path/to/image.jpg"}'
```

### Example 2: Generate a Story

```bash
curl -X POST http://localhost:5000/ai/generate_story \
  -H "Content-Type: application/json" \
  -d '{
    "craft_name": "Pottery",
    "category": "pottery",
    "region": "India"
  }'
```

### Example 3: Generate a Lesson

```bash
curl -X POST http://localhost:5000/ai/generate_lesson \
  -H "Content-Type: application/json" \
  -d '{
    "craft_name": "Pottery",
    "category": "pottery",
    "region": "India"
  }'
```

---

## 🌐 Frontend Integration

### JavaScript (Fetch)

```javascript
// Classify Image
const result = await fetch('http://localhost:5000/ai/classify_image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ image: '/path/to/image.jpg' })
}).then(r => r.json());

console.log(result.data.craft_type); // "pottery"
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

## 📚 Available Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/ai/health` | GET | Check if API is running |
| `/ai/classify_image` | POST | Classify craft images |
| `/ai/generate_story` | POST | Generate craft stories |
| `/ai/generate_lesson` | POST | Generate craft lessons |

---

## 🔧 Troubleshooting

**Problem:** Port 5000 already in use  
**Solution:** Kill the process or use different port

```bash
lsof -i :5000
kill -9 <PID>
```

**Problem:** Module not found  
**Solution:** Install dependencies

```bash
pip install -r requirements.txt
```

**Problem:** API key error  
**Solution:** Check `.env` file has valid Gemini API key

---

## 📖 Full Documentation

See [API_INTEGRATION_README.md](./API_INTEGRATION_README.md) for complete documentation.

---

## ✅ That's It!

You now have a fully functional AI Services API running locally. 

**Next Steps:**
1. Integrate into your frontend
2. Connect to your backend
3. Deploy to production

Happy coding! 🎉
