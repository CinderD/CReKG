import pandas
dataset = pandas.read_table('./images/contract.txt',sep='\t',header=None,names = ['content'])

dataset['word_count'] = dataset['content'].apply(lambda x: len(str(x).split(" ")))
dataset[['content','word_count']].head()
dataset.word_count.describe()

freq = pandas.Series(' '.join(dataset['content']).split()).value_counts()[:]



kg_list_all = []

kg_entity = pandas.read_csv('./full_kg.csv')
kg_source = kg_entity.source
kg_edge = kg_entity.edge
kg_target = kg_entity.target
kg_source_list = kg_source.to_list()
kg_edge_list = kg_edge.to_list()
kg_target_list = kg_target.to_list()
kg_list = kg_source_list +kg_target_list
kg_list_all +=kg_list

import nltk
#nltk.download('stopwords')
from nltk.corpus import stopwords
stop_words = set(stopwords.words("english"))
freq_list = freq.index.tolist()
freq_clear_list = []
for i in range(0, len(freq_list)-1):
    if freq_list[i] not in stop_words:
        freq_clear_list.append(freq_list[i])
        
        
freq_clear_list
final = []
for i in range(len(freq_clear_list)):
    if freq_clear_list[i].title() in kg_list_all:
        final.append(freq_clear_list[i])
final
# len(freq_clear_list)
