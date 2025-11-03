"""
Utility functions for AI services.
Provides helper functions for metadata generation and response formatting.
"""

from datetime import datetime
from typing import Dict, Any


def get_timestamp() -> str:
    """
    Get current timestamp in ISO format.
    
    Returns:
        str: ISO formatted timestamp
    """
    return datetime.utcnow().isoformat() + "Z"


def add_metadata(data: Dict[str, Any], model_name: str) -> Dict[str, Any]:
    """
    Add metadata to response data.
    
    Args:
        data: Dictionary containing response data
        model_name: Name of the model that generated the response
        
    Returns:
        Dict with added metadata
    """
    data["meta"] = {
        "generated_by": model_name,
        "generated_at": get_timestamp()
    }
    return data


def create_hybrid_response(text: str, json_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create hybrid response format with both text and JSON.
    
    Args:
        text: Plain text version of the response
        json_data: Structured JSON data
        
    Returns:
        Dict containing both text and json fields
    """
    return {
        "text": text,
        "json": json_data
    }
