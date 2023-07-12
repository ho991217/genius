import whisper
import sys
import json


def getValue(path: str):
    model = whisper.load_model("medium")
    result = model.transcribe(
        path, language="ko", fp16=False, word_timestamps=True)
    print(json.dumps(result["segments"]))
    sys.stdout.flush()
    # model = whisper.load_model("base")
    # result = model.transcribe("./uploads/audio.mp3")
    # print(result["text"])


if __name__ == "__main__":
    getValue(sys.argv[1])
