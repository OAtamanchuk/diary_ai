from typing import Tuple
import torch
import torch.nn as nn
import torch.nn.functional as F
from transformers import XLMRobertaModel, XLMRobertaTokenizer
from safetensors.torch import load_file 
from app.core.config import settings

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class RobertaBiLSTM(nn.Module):
    def __init__(self, model_name: str, hidden_size: int, num_labels: int):
        super().__init__()
        self.roberta = XLMRobertaModel.from_pretrained(model_name)
        self.lstm = nn.LSTM(
            input_size=self.roberta.config.hidden_size,
            hidden_size=hidden_size,
            num_layers=1,
            batch_first=True,
            bidirectional=True
        )
        self.dropout = nn.Dropout(0.3)
        self.fc = nn.Linear(hidden_size * 2, num_labels)

    def forward(self, input_ids, attention_mask):
        outputs = self.roberta(input_ids=input_ids, attention_mask=attention_mask)
        lstm_out, _ = self.lstm(outputs.last_hidden_state)
        pooled = torch.mean(lstm_out, dim=1)
        pooled = self.dropout(pooled)
        logits = self.fc(pooled)
        return logits


tokenizer_en = XLMRobertaTokenizer.from_pretrained("xlm-roberta-base")
tokenizer_uk = XLMRobertaTokenizer.from_pretrained("xlm-roberta-base")

NUM_LABELS = 6
HIDDEN_SIZE = 256

model_en = RobertaBiLSTM("xlm-roberta-base", HIDDEN_SIZE, NUM_LABELS)
device_str = "cuda" if torch.cuda.is_available() else "cpu"
state_dict_en = load_file(f"{settings.MODEL_EN_DIR}/model.safetensors", device=device_str)
model_en.load_state_dict(state_dict_en)
model_en.to(device).eval()

model_uk = RobertaBiLSTM("xlm-roberta-base", HIDDEN_SIZE, NUM_LABELS)
device_str = "cuda" if torch.cuda.is_available() else "cpu"
state_dict_uk = load_file(f"{settings.MODEL_UK_DIR}/model.safetensors", device=device_str)
model_uk.load_state_dict(state_dict_uk)
model_uk.to(device).eval()

EMOJI_MAP = {
    "sadness": "😢", "joy": "😀", "love": "❤️",
    "anger": "😡", "fear": "😨", "surprise": "😮"
}

ADVICE_EN = {
    "sadness": "Try going for a walk or talking to a friend.",
    "joy": "Great mood! Plan something fun for tomorrow.",
    "love": "Love is the best. Share your feelings.",
    "anger": "Take 10 deep breaths. Anger will pass.",
    "fear": "Fear is normal. Write down what scares you.",
    "surprise": "Surprises make life brighter!"
}

ADVICE_UK = {
    "sadness": "Спробуй прогулятися або поговорити з кимось близьким.",
    "joy": "Чудовий настрій! Заплануй щось приємне.",
    "love": "Любов — найкраще. Поділися почуттями.",
    "anger": "Зроби 10 глибоких вдихів. Гнів мине.",
    "fear": "Страх — це нормально. Запиши, чого боїшся.",
    "surprise": "Несподіванки роблять життя яскравішим!"
}


def predict_emotion(text: str, lang: str) -> Tuple[str, float, str, str]:
    tokenizer = tokenizer_en if lang == "en" else tokenizer_uk
    model = model_en if lang == "en" else model_uk
    advice_dict = ADVICE_EN if lang == "en" else ADVICE_UK

    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=128).to(device)

    with torch.no_grad():
        logits = model(**inputs)
        probs = F.softmax(logits, dim=-1)[0]
        pred_idx = torch.argmax(probs).item()
        score = probs[pred_idx].item()

    label_map = ["sadness", "joy", "love", "anger", "fear", "surprise"]
    label = label_map[pred_idx]
    return label, score, EMOJI_MAP[label], advice_dict[label]
