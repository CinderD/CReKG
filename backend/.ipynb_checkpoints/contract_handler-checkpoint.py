import sys
import json
import os
import pandas as pd
import re
import numpy as np


## import the library spaCy

import bs4
import requests
import spacy
from spacy import displacy
nlp_spacy = spacy.load('en_core_web_md')

from spacy.matcher import Matcher 
from spacy.tokens import Span 

import networkx as nx

import matplotlib.pyplot as plt
from tqdm import tqdm


# function to read txt contract file
def get_txt(path):
    with open(path) as f:
        lines = f.readlines()
    return lines


# In[21]:


contract = get_txt('./images/contract.txt')


pattern_1 = re.compile("\(Page [0-9]*\)") # regular expression to handle the page note in the data
pattern_2 = re.compile("\. ") # handle the blank behind .
pattern_3 = re.compile("\s\s\s*") # handle the multiple blanks


# function to handle the sentences with patterns

def get_candidate_sentences(Series):
    candidate_sentences =[]
    for i in range(len(Series)):
        temp = str(Series[i])
        temp = temp.replace('\n', '')
        temp = temp.replace('\n\n', '')# handle the '\n' in sentences
        temp = pattern_1.sub("",temp)
        temp = pattern_2.sub(".",temp)
        temp = pattern_3.sub("",temp)
        sentences = [j for j in nlp_spacy(temp).sents]
        for k in range(len(sentences)):
            if str(sentences[k]) != ' ':
                if str(sentences[k]) != 'nan':
                    candidate_sentences.append(str(sentences[k]))
    return candidate_sentences





Contract_candidate_sentences = get_candidate_sentences(contract)





def get_entities(sent):
  ## chunk 1
  ent1 = ""
  ent2 = ""

  prv_tok_dep = ""    # dependency tag of previous token in the sentence
  prv_tok_text = ""   # previous token in the sentence

  prefix = ""
  modifier = ""

  #############################################################
  
  for tok in nlp_spacy(sent):
    ## chunk 2
    # if token is a punctuation mark then move on to the next token
    if tok.dep_ != "punct":
      # check: token is a compound word or not
      if tok.dep_ == "compound":
        prefix = tok.text
        # if the previous word was also a 'compound' then add the current word to it
        if prv_tok_dep == "compound":
          prefix = prv_tok_text + " "+ tok.text
      
      # check: token is a modifier or not
      if tok.dep_.endswith("mod") == True:
        modifier = tok.text
        # if the previous word was also a 'compound' then add the current word to it
        if prv_tok_dep == "compound":
          modifier = prv_tok_text + " "+ tok.text
      
      ## chunk 3
      if tok.dep_.find("subj") == True:
        ent1 = modifier +" "+ prefix + " "+ tok.text
        prefix = ""
        modifier = ""
        prv_tok_dep = ""
        prv_tok_text = ""      

      ## chunk 4
      if tok.dep_.find("obj") == True:
        ent2 = modifier +" "+ prefix +" "+ tok.text
        
      ## chunk 5  
      # update variables
      prv_tok_dep = tok.dep_
      prv_tok_text = tok.text
  #############################################################

  return [ent1.strip(), ent2.strip()]




# function to get entity pairs from candidate sentences

def get_entity_pairs(candidate_sentences):
    entity_pairs = []

    for i in tqdm(candidate_sentences):
      entity_pairs.append(get_entities(i))
    return entity_pairs



# def get_top20_entityPairs(entity_pairs):
#     return pd.Series(entity_pairs).value_counts()[:20]


Contract_entity_pairs = get_entity_pairs(Contract_candidate_sentences)

# Top20_entity_pairs = get_top20_entityPairs(Contract_entity_pairs)




def get_relation(sent):

  doc = nlp_spacy(sent)

  # Matcher class object 
  matcher = Matcher(nlp_spacy.vocab)

  #define the pattern 
  pattern = [{'DEP':'ROOT'}, 
            {'DEP':'prep','OP':"?"},
            {'DEP':'agent','OP':"?"},  
            {'POS':'ADJ','OP':"?"}] 

  matcher.add("matching_1", [pattern]) 

  matches = matcher(doc)
  k = len(matches) - 1

  span = doc[matches[k][1]:matches[k][2]] 

  return(span.text)


# In[37]:


def get_all_relation(candidate_sentences):
    relations = [get_relation(i) for i in tqdm(candidate_sentences)]
    return relations





def get_top50_relations(relations):
    return pd.Series(relations).value_counts()[:50]





Contract_relations= get_all_relation(Contract_candidate_sentences)





get_top50_relations(Contract_relations)





def get_KG_DF(entity_pairs,relations):
    # extract subject
    source = [i[0] for i in entity_pairs]

    # extract object
    target = [i[1] for i in entity_pairs]

    kg_df = pd.DataFrame({'source':source, 'target':target, 'edge':relations})
    
    # pre-process the kg_df, drop the empty list
    empty_list=[]
    for i in range(len(kg_df["source"])):
        if kg_df["source"][i] == "":
            if i not in empty_list:
                empty_list.append(i)
        if kg_df["target"][i] == "":
            if i not in empty_list:
                empty_list.append(i)
        if kg_df["edge"][i] == "":
            if i not in empty_list:
                empty_list.append(i)
    cleankg = kg_df.drop(empty_list)
    cleankg.reset_index(drop=True, inplace=True)
    
    return cleankg





clean_Contract_kg = get_KG_DF(Contract_entity_pairs,Contract_relations)
# print('interesting')

# def get_keywords(Top20_entity_pairs):
#       source = [i[0] for i in Top20_entity_pairs]
#       print('?')
#     # extract object
#       target = [i[1] for i in Top20_entity_pairs]
#       kg_df = pd.DataFrame({'source':source, 'target':target})

#           # pre-process the kg_df, drop the empty list
#       empty_list=[]
#       for i in range(len(kg_df["source"])):
#           if kg_df["source"][i] == "":
#               if i not in empty_list:
#                   empty_list.append(i)
#           if kg_df["target"][i] == "":
#               if i not in empty_list:
#                   empty_list.append(i)
#       cleankg = kg_df.drop(empty_list)
#       cleankg.reset_index(drop=True, inplace=True)
      
#       return cleankg

# clean_Contract_kg = get_keywords(Top20_entity_pairs)
# source = clean_Contract_kg['source'].to_numpy()
# print(source)

source = clean_Contract_kg['source'].to_numpy()
target = clean_Contract_kg['target'].to_numpy()
edge = clean_Contract_kg['edge'].to_numpy()
# console.log(source)
# print(type(source))
# console.log(source[1])

print(source)
print(target)
print(edge)




