import pandas
dataset = pandas.read_table('./images/contract.txt',sep='\t',header=None,names = ['content'])

dataset['word_count'] = dataset['content'].apply(lambda x: len(str(x).split(" ")))
dataset[['content','word_count']].head()
dataset.word_count.describe()

freq = pandas.Series(' '.join(dataset['content']).split()).value_counts()[:]



kg_list_all = []
# 这一部分获取我们kg中有的所有entity
kg_entity = pandas.read_csv('./full_kg.csv')
kg_source = kg_entity.source
kg_edge = kg_entity.edge
kg_target = kg_entity.target
kg_source_list = kg_source.to_list()
kg_edge_list = kg_edge.to_list()
kg_target_list = kg_target.to_list()
kg_list = kg_source_list +kg_target_list
kg_list_all +=kg_list

# 这一部分获取6类keywords的list
keywords = pandas.read_csv('./Categoried_keywords.csv')

ConfidentialTermsList = keywords['Confidential Terms'].to_list()
ConfidentialTermsList = [x for x in ConfidentialTermsList if str(x) != 'nan']

PaymentTermsList = keywords['Payment Terms'].to_list()
PaymentTermsList = [x for x in PaymentTermsList if str(x) != 'nan']

DisclaimersList = keywords['Disclaimers'].to_list()
DisclaimersList = [x for x in DisclaimersList if str(x) != 'nan']

WarrantiesList = keywords['Warranties'].to_list()
WarrantiesList = [x for x in WarrantiesList if str(x) != 'nan']

DisputeResolutionTermsList = keywords['Dispute Resolution Terms'].to_list()
DisputeResolutionTermsList = [x for x in DisputeResolutionTermsList if str(x) != 'nan']

ForceMajeureList = keywords['Force Majeure'].to_list()
ForceMajeureList = [x for x in ForceMajeureList if str(x) != 'nan']



import nltk
#nltk.download('stopwords')
from nltk.corpus import stopwords
stop_words = set(stopwords.words("english"))
freq_list = freq.index.tolist()
freq_clear_list = []
for i in range(0, len(freq_list)-1):
    if freq_list[i] not in stop_words:
        freq_clear_list.append(freq_list[i])

# 在每个keywords list里匹配keywords,最后有一列是otherKeywords
ConfidentialKeywords = []
PaymentTermsKeywords = []
DisclaimersKeywords = []
WarrantiesKeywords = []
DisputeResolutionTermsKeywords = []
ForceMajeureKeywords = []
OtherKeywords = []

# finally try to eliminate duplicated
import inflect
p = inflect.engine()

for i in range(len(freq_clear_list)):
    if( p.singular_noun(freq_clear_list[i]) != False):
        freq_clear_list[i] =  p.singular_noun(freq_clear_list[i])
    freq_clear_list[i] =  freq_clear_list[i].title()
freq_clear_list = list(set(freq_clear_list))

# final 里存着所有在kg中有的entity
# final = []
for i in range(len(freq_clear_list)):

    if freq_clear_list[i].title() in ConfidentialTermsList:
        ConfidentialKeywords.append(freq_clear_list[i])
    elif freq_clear_list[i].title() in PaymentTermsList:
        PaymentTermsKeywords.append(freq_clear_list[i])
    elif freq_clear_list[i].title() in DisclaimersList:
        DisclaimersKeywords.append(freq_clear_list[i])
    elif freq_clear_list[i].title() in WarrantiesList:
        WarrantiesKeywords.append(freq_clear_list[i])
    elif freq_clear_list[i].title() in DisputeResolutionTermsList:
        DisputeResolutionTermsKeywords.append(freq_clear_list[i])
    elif freq_clear_list[i].title() in ForceMajeureList:
        ForceMajeureKeywords.append(freq_clear_list[i])
    # 如果都不在上面的list里，再在整体kg里搜
    elif freq_clear_list[i].title() in kg_list_all:
        OtherKeywords.append(freq_clear_list[i])


print(ConfidentialKeywords)
print(PaymentTermsKeywords)
print(DisclaimersKeywords)
print(WarrantiesKeywords)
print(DisputeResolutionTermsKeywords)
print(ForceMajeureKeywords)
print(OtherKeywords)