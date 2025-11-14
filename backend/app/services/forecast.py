from typing import List, Dict
from collections import Counter
import numpy as np

def predict_next_emotion(entries: List[Dict]) -> str:
    if not entries:
        return "joy"

    recent = [e["emotion_label"] for e in entries[-7:] if e["emotion_label"]]
    if not recent:
        return "joy"

    counter = Counter(recent)
    most_common = counter.most_common(1)[0][0]

    if len(recent) >= 3 and len(set(recent[-3:])) == 1:
        return recent[-1]

    return most_common