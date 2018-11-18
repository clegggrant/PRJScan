import sys
from nltk.tokenize import sent_tokenize
import wordninja
from nltk.corpus import stopwords
import os
import pickle
from datetime import datetime
import matplotlib.pyplot as plt
import urllib.request
import base64
import json
import numpy as np


# Separate input text into unformatted sentences
sentences = sent_tokenize(sys.argv[1])

# Tokenized words
tokens = []

# Format sentences
for i, sentence in enumerate(sentences):
    # Separate each unformatted sentence into words
    words = wordninja.split(sentence)

    # Erase sentence
    sentences[i] = ""

    # Construct a formatted sentence from the separated words
    for j, word in enumerate(words):
        tokens.append(word)
        if j != len(words) - 1:
            sentences[i] += word + " "
        else:
            sentences[i] += word

# Reload past frequency table
stop_words = set(stopwords.words("english"))
try:
    with open(os.getcwd() + "/server/python/kb/memory", "rb") as handle:
        freq_table = pickle.load(handle)
except FileNotFoundError:
    freq_table = dict()

# Assign value to words
for word in tokens:
    word = word.lower()
    if word in stop_words:
        continue
    if word in freq_table:
        freq_table[word] += 1
    else:
        freq_table[word] = 1

# Refresh frequency table if input is new
write = True
for filename in os.listdir(os.getcwd() + "/server/python/kb/pdf/"):
    with open(os.getcwd() + "/server/python/kb/pdf/" + filename) as f:
        if f.read() == sys.argv[1]:
            write = False
            break

if write:
    with open(os.getcwd() + "/server/python/kb/pdf/" + str(datetime.utcnow()) + ".txt", "w") as text_file:
        text_file.write(sys.argv[1])
        with open(os.getcwd() + "/server/python/kb/memory", "wb") as handle:
            pickle.dump(freq_table, handle, protocol=pickle.HIGHEST_PROTOCOL)

# Get total values of sentences
sentence_values = dict()
for sentence in sentences:
    for word_value in freq_table.items():
        if word_value[0] in sentence.lower():
            if sentence in sentence_values:
                sentence_values[sentence] += word_value[1]
            else:
                sentence_values[sentence] = word_value[1]

# Adjust sentence value by sentence length
for val in sentence_values:
    sentence_values[val] = sentence_values[val] / len(val.split())

# Sort sentence values
sorted_sentence_values = dict()
sentence_values = sorted(sentence_values.items(), key=lambda x: x[1])
for i, keys in enumerate(sentence_values):
    sorted_sentence_values[sentence_values[i][0]] = sentence_values[i][1]

# Print sorted sentence values (with outliers)
plt.bar(sorted_sentence_values.keys(), sorted_sentence_values.values(), 1, color="b")
plt.axis("off")
plt.savefig(os.getcwd() + "/server/python/kb/temp-fig_before.png")
plt.close()

with urllib.request.urlopen("file://" + os.getcwd() + "/server/python/kb/temp-fig_before.png") as url:
    img1 = url.read()

img1 = str(base64.encodebytes(img1).decode("utf-8")).replace("\n", "")

# Filter outliers from sentence values
mean_duration = np.mean(list(sorted_sentence_values.values()))
std_dev_one_test = np.std(list(sorted_sentence_values.values()))

filtered_sentence_values = dict()
poor_sentence_values = dict()
for i, sentence in enumerate(sorted_sentence_values):
    if abs(sorted_sentence_values[sentence] - mean_duration) <= std_dev_one_test:
        filtered_sentence_values[sentence] = sorted_sentence_values[sentence]
    else:
        poor_sentence_values[sentence] = sorted_sentence_values[sentence]

# Print filtered sentence values (without outliers)
plt.bar(filtered_sentence_values.keys(), filtered_sentence_values.values(), 1, color="g")
plt.axis("off")
plt.savefig(os.getcwd() + "/server/python/kb/temp-fig_after.png")
plt.close()

with urllib.request.urlopen("file://" + os.getcwd() + "/server/python/kb/temp-fig_after.png") as url:
    img2 = url.read()

img2 = str(base64.encodebytes(img2).decode("utf-8")).replace("\n", "")

packet = '{ "img1": "' + img1 + '", "img2": "' + img2 + '", "fil1": ' + json.dumps(filtered_sentence_values) + ', "fil2": ' + json.dumps(poor_sentence_values) + ' }'
print(packet)
