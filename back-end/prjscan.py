from NaiveBayes import Pool

# from bagofwords import BagOfWords

import os

DClasses = ["clinton",  "lawyer",  "math",  "medical",  "music",  "sex"]

base = "learn/"
p = Pool()
for i in DClasses:
    p.learn(base + i, i)

p.print()

#base = "test/"
#for i in DClasses:
#    dir = os.listdir(base + i)
#    for file in dir:
#        res = p.Probability(base + i + "/" + file)
#        print(i + ": " + file + ": " + str(res))
