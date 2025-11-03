import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
from typing import Dict, Any, List
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))
from shared.utils import get_timestamp

class CraftImageClassifier:
    
    def __init__(self):
        print("Loading ResNet50 model (CPU mode)...")
        
        self.model = models.resnet50(pretrained=True)
        self.model.eval()  # Set to evaluation mode
        
        self.preprocess = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
        
        self.class_labels = self._load_imagenet_labels()
        
        self.craft_keywords = {
            'pottery': ['pot', 'vase', 'jar', 'pottery', 'ceramic', 'clay'],
            'textile': ['fabric', 'cloth', 'textile', 'weaving', 'loom', 'thread'],
            'woodwork': ['wood', 'carving', 'furniture', 'wooden'],
            'metalwork': ['metal', 'iron', 'bronze', 'brass', 'copper'],
            'basketry': ['basket', 'wicker', 'weave'],
            'jewelry': ['necklace', 'bracelet', 'jewelry', 'ornament'],
            'painting': ['painting', 'canvas', 'art'],
            'sculpture': ['sculpture', 'statue', 'carving']
        }
        
        print("✓ ResNet50 model loaded successfully")
    
    def _load_imagenet_labels(self) -> List[str]:
        return [
            'pottery', 'vase', 'jar', 'pot', 'basket', 'weaving', 
            'fabric', 'textile', 'wood', 'furniture', 'carving',
            'metal', 'jewelry', 'ornament', 'painting', 'sculpture'
        ] * 63  # Pad to 1000 classes (simplified for demo)
    
    def _map_to_craft_type(self, predictions: List[tuple]) -> str:
        for class_name, _ in predictions:
            class_lower = class_name.lower()
            for craft_type, keywords in self.craft_keywords.items():
                if any(keyword in class_lower for keyword in keywords):
                    return craft_type
        
        return "traditional_craft"
    
    def _detect_materials(self, predictions: List[tuple]) -> List[str]:
        materials = set()
        material_keywords = {
            'clay': ['pot', 'pottery', 'ceramic', 'clay'],
            'wood': ['wood', 'wooden', 'timber'],
            'metal': ['metal', 'iron', 'bronze', 'brass', 'copper', 'silver', 'gold'],
            'fabric': ['fabric', 'cloth', 'textile', 'cotton', 'silk', 'wool'],
            'natural_fiber': ['basket', 'wicker', 'bamboo', 'reed', 'straw']
        }
        
        for class_name, _ in predictions[:5]:
            class_lower = class_name.lower()
            for material, keywords in material_keywords.items():
                if any(keyword in class_lower for keyword in keywords):
                    materials.add(material)
        
        return list(materials) if materials else ['traditional_materials']
    
    def _estimate_region(self, craft_type: str) -> str:
        region_map = {
            'pottery': 'South Asia',
            'textile': 'South Asia',
            'woodwork': 'Southeast Asia',
            'metalwork': 'Middle East',
            'basketry': 'Southeast Asia',
            'jewelry': 'South Asia',
            'painting': 'East Asia',
            'sculpture': 'South Asia'
        }
        
        return region_map.get(craft_type, 'Unknown')
    
    def classify_image(self, image_path: str) -> Dict[str, Any]:
        image = Image.open(image_path).convert('RGB')
        input_tensor = self.preprocess(image)
        input_batch = input_tensor.unsqueeze(0)  # Add batch dimension
        
        with torch.no_grad():
            output = self.model(input_batch)
        
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        
        top5_prob, top5_indices = torch.topk(probabilities, 5)
        predictions = [
            (self.class_labels[idx], prob.item())
            for idx, prob in zip(top5_indices, top5_prob)
        ]
        
        craft_type = self._map_to_craft_type(predictions)
        materials = self._detect_materials(predictions)
        region = self._estimate_region(craft_type)
        confidence = predictions[0][1]  # Top prediction confidence
        
        return {
            "craft_type": craft_type,
            "materials_detected": materials,
            "possible_region": region,
            "confidence": round(confidence, 2),
            "meta": {
                "model": "resnet50",
                "generated_at": get_timestamp()
            }
        }

def classify_craft_image(image_path: str) -> Dict[str, Any]:
    classifier = CraftImageClassifier()
    return classifier.classify_image(image_path)

